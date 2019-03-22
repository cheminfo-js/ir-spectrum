import { readFileSync } from 'fs';
import { join } from 'path';

import { fromText } from '..';

import { exportAllDeclaration } from '@babel/types';

test('Full test', () => {
  let text = readFileSync(
    join(__dirname, '../../testFiles/simple.txt'),
    'utf8'
  );
  let irSpectrum = fromText(text);
  let json = irSpectrum.toJSON();
  expect(json).toStrictEqual({ kind: 2, wavelength: [1, 2, 3], y: [2, 3, 2] });
});
