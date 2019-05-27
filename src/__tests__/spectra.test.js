import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';

import { fromJcamp } from '..';

import { Spectra } from '../Spectra';

const testFilesDir = '../../testFiles/xtc';
test('Load set of data', () => {
  let files = readdirSync(join(__dirname, testFilesDir)).filter((file) =>
    file.match(/0140|0189|0235/)
  );
  let spectra = new Spectra({
    normalization: {
      from: 1000,
      to: 2600,
      numberOfPoints: 16,
      applySNV: true
    }
  });
  for (let file of files) {
    let jcamp = readFileSync(join(__dirname, testFilesDir, file), 'utf8');
    let spectrum = fromJcamp(jcamp);
    spectra.addSpectrum(spectrum, file.replace('.jdx', ''));
  }

  expect(spectra.data).toHaveLength(45);
  let normalized = spectra.getNormalizedData();
  expect(normalized.ids).toHaveLength(45);
  expect(normalized.matrix[0]).toHaveLength(16);
  expect(normalized).toMatchSnapshot();
});
