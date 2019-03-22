import { parseXY } from 'xy-parser';

import { IRSpectrum } from '../IRSpectrum';

/**
 * Creates a new Chromatogram element based in a Txt string
 * @param {string} text - String containing the data as CSV or TSV
 * @param {object} [options] - Options object for the parser
 * @return {IRSpectrum} - New class element with the given data
 */
export function fromText(text, options = {}) {
  options = Object.assign({}, options, { arrayType: 'xxyy' });
  const data = parseXY(text, options);
  return new IRSpectrum({
    wavelength: data[0],
    y: data[1]
  });
}
