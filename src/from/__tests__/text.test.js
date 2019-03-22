import { fromText } from '../..';
import { ABSORBANCE, TRANSMITTANCE } from '../../IRSpectrum';

test('Parse a text', () => {
  const text = `
        1,2
        2,3
        3,4
    `;

  let irSpectrum = fromText(text);
  expect(irSpectrum.wavelength).toStrictEqual([1, 2, 3]);
  expect(irSpectrum.y).toStrictEqual([2, 3, 4]);
  expect(irSpectrum.kind).toBe(TRANSMITTANCE);
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
    kind: ABSORBANCE
  });
  expect(irSpectrum.wavelength).toStrictEqual([2, 3, 4]);
  expect(irSpectrum.y).toStrictEqual([3, 4, 5]);
});
