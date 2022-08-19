import { ThemeProvider } from '@emotion/react';
import styled from '@emotion/styled';
import { parseToHsl } from 'polished';
import {
  FC, useEffect, useMemo, useState, VFC,
} from 'react';

import { FluidContainer } from 'components/common/Container';
import { Input } from 'components/common/Input';

import { getBestColor, getColorPaletteFromImage } from 'services/recipes/providers/utils';

import { color, darkTheme, lightTheme } from 'utils/styles/theme';

const Container = styled(FluidContainer)`
  margin-top: 50px;
  margin-bottom: 50px;
  row-gap: 20px;
`;

const ColorsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
  padding: 20px;
  background-color: ${color('background')};
  color: ${color('text')};
`;

const Color = styled.div<{ color: string }>`
  width: 100%;
  height: 100px;
  background-color: ${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  border-radius: 10px;
  flex-direction: column;
`;

const ColorExtractContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 50px;
`;

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;

  img {
    width: 100%;
    margin-top: 20px;
  }
`;

const ColorsOutput = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: auto;
`;

const formatNum = (num: number) => {
  if (Number.isInteger(Number(num.toFixed(2)))) return num.toFixed();
  return num.toFixed(2);
};

const DescribedColor: FC<{ hexColor: string }> = ({ hexColor }) => {
  const hsl = useMemo(() => {
    const { hue, saturation, lightness } = parseToHsl(hexColor);

    return `hsl(${formatNum(hue)}, ${formatNum(saturation)}, ${formatNum(lightness)})`;
  }, [hexColor]);

  return (
    <Color color={hexColor}>
      <span>{hexColor}</span>
      <span>{hsl}</span>
    </Color>
  );
};

export const ColorDebug: VFC = () => {
  const [url, setUrl] = useState('');
  const [imageColors, setImageColors] = useState<string[]>([]);

  useEffect(() => {
    getColorPaletteFromImage(url).then((colors) => {
      setImageColors(colors);
    }).catch(() => {});
  }, [url]);

  const bestColor = useMemo(() => getBestColor(imageColors), [imageColors]);

  return (
    <Container>
      <h2>Test kolorów motywu</h2>
      <ColorsGrid>
        {Object.entries(lightTheme.colors).map(([name, colorValue]) => (
          <Color color={colorValue} key={name}>{name}</Color>
        ))}
      </ColorsGrid>

      <ThemeProvider theme={darkTheme}>
        <ColorsGrid>
          {Object.entries(darkTheme.colors).map(([name, colorValue]) => (
            <Color color={colorValue} key={name}>{name}</Color>
          ))}
        </ColorsGrid>
      </ThemeProvider>

      <h2>Test wyciągania kolorów</h2>
      <ColorExtractContainer>
        <ImageContainer>
          <Input type="url" value={url} onChange={(e) => setUrl(e.currentTarget.value)} />
          <img src={url} alt="" />
        </ImageContainer>
        <ColorsOutput>
          {imageColors.map((imageColor) => (
            <DescribedColor hexColor={imageColor} key={imageColor} />
          ))}
        </ColorsOutput>
        {bestColor && <DescribedColor hexColor={bestColor} />}
      </ColorExtractContainer>
    </Container>
  );
};
