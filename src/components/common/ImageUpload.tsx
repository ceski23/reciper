/* eslint-disable no-param-reassign */
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import imageCompression from 'browser-image-compression';
import {
  ChangeEvent, ComponentPropsWithRef, DragEventHandler,
  FC, forwardRef, useState,
} from 'react';

import { ReactComponent as DeleteIcon } from 'assets/common/delete.svg';

import { useImageCompression } from 'hooks/useImageCompression';

import { color } from 'utils/styles/theme';

interface ImageUploadProps extends Omit<ComponentPropsWithRef<'input'>, 'type' | 'accept' | 'onChange'> {
  compress?: boolean;
  onChange: (image?: string) => void;
  value?: string;
}

const Container = styled.div<{ isOver: boolean }>`
  background-color: ${color('backgroundAlt')};
  border: 2px dashed ${color('textalt')};
  height: 200px;
  position: relative;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;

  ${(props) => props.isOver && css`
    background-color: ${props.theme.colors.backgroundAltHover};
  `}
`;

const ProgressBar = styled.div<{ progress: number }>`
  background-color: ${color('primary')};
  height: 10px;
  position: absolute;
  bottom: 0;
  left: 0;
  width: ${(props) => props.progress}%;
`;

const ImagePreview = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 10px;
`;

const Input = styled.input`
  position: absolute;
  inset: 0;
  opacity: 0;
`;

const Text = styled.p`
  margin: 0;
`;

const DeleteButton = styled.button`
  border-radius: 0 10px 0 10px;
  border: 1px solid ${color('textalt')};
  padding: 8px 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${color('backgroundAltHover')};
  color: ${color('textalt')};
  cursor: pointer;
  position: absolute;
  top: 0;
  right: 0;

  &:hover {
    background-color: ${color('backgroundAlt')};
  }

  svg {
    width: 15px;
    height: 15px;
  }
`;

const PreviewContainer = styled.div`
  position: relative;
`;

export const ImageUpload: FC<ImageUploadProps> = forwardRef(({
  compress,
  onChange,
  value = '',
  ...props
}, ref) => {
  const { compressImage, progress } = useImageCompression({ maxSize: 1 });
  const [isOver, setIsOver] = useState(false);

  const handleDrag: DragEventHandler = (event) => {
    setIsOver(event.type === 'dragenter');
  };

  const processFile = async (file: File) => {
    if (!compress) {
      const dataUrl = await imageCompression.getDataUrlFromFile(file);
      return dataUrl;
    }

    const compressedImage = await compressImage(file);
    const dataUrl = await imageCompression.getDataUrlFromFile(compressedImage);
    return dataUrl;
  };

  const handleDrop: DragEventHandler = async (event) => {
    event.stopPropagation();
    event.preventDefault();

    const file = event.dataTransfer.items[0].getAsFile();
    if (file) {
      const dataUrl = await processFile(file);
      onChange(dataUrl);
    }
  };

  const handleDragOver: DragEventHandler = (event) => {
    event.preventDefault();
  };

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;

    if (!files) { onChange(); return; }

    const dataUrl = await processFile(files[0]);
    onChange(dataUrl);
  };

  const handleClear = () => {
    onChange('');
  };

  if (value) {
    return (
      <PreviewContainer>
        <ImagePreview src={value} alt="Podgląd zdjęcia" />

        <DeleteButton type="button" onClick={handleClear}>
          <DeleteIcon />
        </DeleteButton>
      </PreviewContainer>
    );
  }

  return (
    <Container
      isOver={isOver}
    >
      <Input
        ref={ref}
        type="file"
        accept="image/jpeg,image/png"
        onChange={handleFileChange}
        {...props}
        onDrop={handleDrop}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDragOver}
      />

      {isOver ? (
        <Text>Upuść zdjęcie</Text>
      ) : (
        <Text><strong>Kliknij</strong> lub <strong>upuść</strong> zdjęcie</Text>
      )}

      {value && <ProgressBar progress={progress} />}
    </Container>
  );
});
