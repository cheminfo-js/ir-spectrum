import { fromText } from '../..';

test('Parse a text', () => {
  const text = `
        1,2
        2,3
        3,4
    `;

  let irSpectrum = fromText(text);
  expect(irSpectrum.wavelength).toStrictEqual([1, 2, 3]);
  expect(irSpectrum.transmittance).toStrictEqual([2, 3, 4]);
  expect(irSpectrum.absorbance).toStrictEqual([]);
});

test('Parse a text with options', () => {
  const text = `
        1,2,3
        2,3,4
        3,4,5
    `;

  let irSpectrum = fromText(text, {
    xColumn: 1,
    yColumn: 2,
    kind: 'absorbance'
  });
  expect(irSpectrum.wavelength).toStrictEqual([2, 3, 4]);
  expect(irSpectrum.transmittance).toStrictEqual([]);
  expect(irSpectrum.absorbance).toStrictEqual([3, 4, 5]);
});
