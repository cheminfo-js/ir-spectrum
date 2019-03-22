import { readFileSync } from 'fs';
import { join } from 'path';

import { TRANSMITTANCE, ABSORBANCE } from '../../IRSpectrum';
import { fromJcamp } from '../..';

test('fromJcamp absorbance', () => {
  const path = join(__dirname, '../../../testFiles/absorbance.jdx');
  const jcamp = readFileSync(path, 'utf8');
  const irSpectrum = fromJcamp(jcamp);
  expect(irSpectrum.wavelength).toHaveLength(1738);
  expect(irSpectrum.y).toHaveLength(1738);
  expect(irSpectrum.kind).toBe(ABSORBANCE);
});

test('fromJcamp transmittance', () => {
  const path = join(__dirname, '../../../testFiles/transmittance1.jdx');
  const jcamp = readFileSync(path, 'utf8');
  const irSpectrum = fromJcamp(jcamp);
  expect(irSpectrum.wavelength).toHaveLength(1991);
  expect(irSpectrum.y).toHaveLength(1991);
  expect(irSpectrum.kind).toBe(TRANSMITTANCE);
});
