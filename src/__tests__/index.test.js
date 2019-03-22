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

  expect(irSpectrum.getTransmittance()).toStrictEqual({
    x: [1, 2, 3],
    y: [2, 3, 2]
  });
  expect(irSpectrum.getPercentTransmittance()).toStrictEqual({
    x: [1, 2, 3],
    y: [200, 300, 200]
  });
  expect(irSpectrum.getAbsorbance()).toStrictEqual({
    x: [1, 2, 3],
    y: [-0.3010299956639812, -0.47712125471966244, -0.3010299956639812]
  });
  expect(json).toStrictEqual({
    wavelength: [1, 2, 3],
    transmittance: [2, 3, 2]
  });
  let irSpectrum2 = new IRSpectrum(json);
  let json2 = irSpectrum2.toJSON();
  expect(json).toStrictEqual(json2);
});
