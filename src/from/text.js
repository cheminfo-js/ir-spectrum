import { parseXY } from 'xy-parser';

import { IRSpectrum } from '../IRSpectrum';
import { getKind, TRANSMITTANCE } from '../constants';

/**
 * Creates a new Chromatogram element based in a Txt string
 * @param {string} text - String containing the data as CSV or TSV
 * @param {object} [options] - Options object for the parser
 * @param {string} [options.kind] - Absorbance or Transmisstance
 * @return {IRSpectrum} - New class element with the given data
 */
export function fromText(text, options = {}) {
  options = Object.assign({}, options, { arrayType: 'xxyy' });
  const data = parseXY(text, options);
  if (getKind(options.kind) === TRANSMITTANCE) {
    return new IRSpectrum({
      wavelength: data[0],
      transmittance: data[1],
      absorbance: []
    });
  } else {
    return new IRSpectrum({
      wavelength: data[0],
      transmisttance: [],
      absorbance: data[1]
    });
  }
}
