import styled from '@emotion/styled/macro';
import { VFC } from 'react';

import { ReactComponent as AppLogo } from 'assets/common/reciper.svg';

import { FluidContainer } from 'components/common/Container';
import { ScreenHeader } from 'components/common/ScreenHeader';

import { PROVIDERS } from 'services/recipes/providers';

import { color } from 'utils/styles/theme';

const SettingsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const StyledLogo = styled(AppLogo)`
  width: 70px;
  height: 70px;
  margin-right: 20px;
`;

const AppName = styled.p`
  margin: 0;
  font-size: 30px;
  font-weight: 700;
  color: ${color('primary')};
  flex-direction: column;
  display: flex;
`;

const BrandContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
`;

const AppDesc = styled.p`
  margin: 0;
  margin-bottom: 40px;
  font-size: 18px;
  color: ${color('textalt')};
`;

const Version = styled.span`
  font-size: 15px;
  color: ${color('textalt')};
  margin-top: 5px;
`;

const ProviderIcon = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 5px;
  margin-right: 20px;
`;

const ProviderItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ProviderName = styled.a`
  color: unset;
  font-weight: 600;
  text-decoration: none;
`;

const Providers = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const AboutPage: VFC = () => (
  <FluidContainer>
    <ScreenHeader title="O aplikacji" />

    <BrandContainer>
      <StyledLogo />
      <AppName>
        Reciper
        <Version>Wersja: {process.env.REACT_APP_VERSION}</Version>
      </AppName>
    </BrandContainer>

    <AppDesc>
      Reciper to aplikacja internetowa przeznaczona do przechowywania przepisów z wielu witryn
      kulinarnych w jednym miejscu.
    </AppDesc>

    <SettingsContainer>
      <h3>Wspierane serwisy:</h3>

      <Providers>
        {PROVIDERS.map((provider) => (
          <ProviderItem>
            {provider.icon && <ProviderIcon src={provider.icon} />}
            <ProviderName target="_blank" href={provider.url}>{provider.name}</ProviderName>
          </ProviderItem>
        ))}
      </Providers>
    </SettingsContainer>

  </FluidContainer>
);
