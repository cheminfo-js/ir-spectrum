import { exportAllDeclaration } from '@babel/types';

import { fromText } from '..';

test('Test addPeaks', () => {
  let text = `
1 0.7
2 0.6
3 0.5
4 0.6
5 0.7
6 0.2
7 0.4
  `;

  let irSpectrum = fromText(text);

  expect(irSpectrum.peaks).toStrictEqual([]);
  irSpectrum.addPeak(3);
  expect(irSpectrum.peaks).toStrictEqual([
    {
      absorbance: 0.6989700043360187,
      kind: 'S',
      transmittance: 0.2,
      wavelength: 6
    }
  ]);
  irSpectrum.addPeak(3, { range: 1 });
  expect(irSpectrum.peaks).toStrictEqual([
    {
      absorbance: 0.6989700043360187,
      kind: 'S',
      transmittance: 0.2,
      wavelength: 6
    },
    {
      absorbance: 0.3010299956639812,
      kind: 'm',
      transmittance: 0.5,
      wavelength: 3
    }
  ]);
  irSpectrum.addPeak(3, { range: 1 });
  expect(irSpectrum.peaks).toStrictEqual([
    {
      absorbance: 0.6989700043360187,
      kind: 'S',
      transmittance: 0.2,
      wavelength: 6
    },
    {
      absorbance: 0.3010299956639812,
      kind: 'm',
      transmittance: 0.5,
      wavelength: 3
    }
  ]);
});
