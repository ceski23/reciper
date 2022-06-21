import styled from '@emotion/styled';
import { FC, useState } from 'react';

import { ReactComponent as SuccessIcon } from 'assets/common/success.svg';
import { ReactComponent as WarningIcon } from 'assets/common/warning.svg';

import { Modal, ModalProps } from 'components/common/modal/Modal';

import { useAppDispatch } from 'hooks/store';

import { scrapeRecipe } from 'services/recipes/providers';

import { addMultipleRecipes, syncRecipes } from 'store/recipes';

import { color } from 'utils/styles/theme';

type ImportRecipesModalProps = ModalProps;

const Textarea = styled.textarea`
  padding: 10px 15px;
  border-radius: 10px;
  border: 1px solid ${color('textalt')};
  background-color: ${color('backgroundInput')};
  color: ${color('textalt')};
  font-family: inherit;
  font-size: 14px;
  font-weight: 500;
  width: 100%;
  resize: vertical;
  min-height: 150px;
  line-height: 1.5;
`;

const FailedImport = styled.a`
  margin: 0;
  font-size: 12px;
  color: unset;
`;

const FailedImportsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  max-height: 200px;
  overflow: auto;
  margin-top: 10px;
`;

const Text = styled.p`
  margin: 0;
  flex: 1;
`;

const StatusWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 10px;
`;

const ImportSuccessIcon = styled(SuccessIcon)`
  width: 50px;
  height: 50px;
  fill: #3ce212;
`;

const ImportFailureIcon = styled(WarningIcon)`
  width: 50px;
  height: 50px;
  fill: #e2cd12;
`;

const isFulfilled = <T extends object>(
  results: PromiseSettledResult<T>,
): results is PromiseFulfilledResult<T> => results.status === 'fulfilled';

type Status = 'initial' | 'loading' | 'success' | 'failure';

export const ImportRecipesModal: FC<ImportRecipesModalProps> = ({
  onClose, ...props
}) => {
  const [importUrls, setImportUrls] = useState('');
  const [failedImports, setFailedImports] = useState<string[]>([]);
  const [importStatus, setImportStatus] = useState<Status>('initial');
  const dispatch = useAppDispatch();

  const handleImport = async () => {
    if (importUrls.length === 0) return;

    setImportStatus('loading');

    const parsed = importUrls.split('\n');

    const imports = parsed.map(scrapeRecipe);
    const data = await Promise.allSettled(imports);

    const failed = data
      .map((val, idx) => ({ ...val, url: parsed[idx] }))
      .filter(({ status }) => status === 'rejected')
      .map((val) => val.url);

    setFailedImports(failed);

    const recipes = data.filter(isFulfilled).map((s) => s.value);

    dispatch(addMultipleRecipes(recipes));

    setImportStatus(failed.length === 0 ? 'success' : 'failure');

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    dispatch(syncRecipes());
  };

  const handleClose = () => {
    setFailedImports([]);
    setImportUrls('');
    setImportStatus('initial');
    onClose();
  };

  const importText = () => {
    if (importStatus === 'initial') return 'Importuj';
    if (importStatus === 'loading') return 'Importowanie...';
    return undefined;
  };

  return (
    <Modal {...props} onClose={handleClose} onAccept={handleImport} loading={importStatus === 'loading'}>
      <Modal.Header title="Importowanie przepisów" />
      <Modal.Body>
        {(importStatus === 'initial' || importStatus === 'loading') && (
          <Textarea
            disabled={importStatus === 'loading'}
            value={importUrls}
            onChange={(e) => setImportUrls(e.currentTarget.value)}
          />
        )}

        {importStatus === 'success' && (
          <StatusWrapper>
            <ImportSuccessIcon />
            <Text>
              Zaimportowano wszystkie przepisy.
            </Text>
          </StatusWrapper>
        )}

        {importStatus === 'failure' && (
          <StatusWrapper>
            <ImportFailureIcon />
            <Text>
              Import zakończony.
              Nie udało się zaimportować <strong>{failedImports.length} przepisów</strong>.
              Poniżej znajduje się ich lista.
            </Text>

            <div style={{ width: '100%' }}>
              <Text>Nieudane importy:</Text>
              <FailedImportsList>
                {failedImports.map((imp) => (
                  <FailedImport target="_blank" key={imp} href={imp}>{imp}</FailedImport>
                ))}
              </FailedImportsList>
            </div>
          </StatusWrapper>
        )}
      </Modal.Body>
      <Modal.Footer acceptText={importText()} cancelText="Zamknij" />
    </Modal>
  );
};
