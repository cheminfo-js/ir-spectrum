import { readFileSync } from 'fs';
import { join } from 'path';

import { fromText } from '..';

import { IRSpectrum } from '../IRSpectrum';

test('Test load / save json', () => {
  let text = readFileSync(
    join(__dirname, '../../testFiles/simple.txt'),
    'utf8'
  );
  let irSpectrum = fromText(text);
  let json = irSpectrum.toJSON();
  expect(json).toStrictEqual({ kind: 2, wavelength: [1, 2, 3], y: [2, 3, 2] });
  let irSpectrum2 = new IRSpectrum(json);
  let json2 = irSpectrum2.toJSON();
  expect(json).toStrictEqual(json2);
});
