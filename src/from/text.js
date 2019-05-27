import { parseXY } from 'xy-parser';
import sortX from 'ml-array-xy-sort-x';

import { Spectrum } from '../Spectrum';
import { getKind, TRANSMITTANCE } from '../constants';

/**
 * Creates a new Chromatogram element based in a Txt string
 * @param {string} text - String containing the data as CSV or TSV
 * @param {object} [options] - Options object for the parser
 * @param {string} [options.kind] - Absorbance or Transmisstance
 * @return {Spectrum} - New class element with the given data
 */
export function fromText(text, options = {}) {
  options = Object.assign({}, options, { arrayType: 'xxyy' });
  const data = parseXY(text, options);
  let spectrum = sortX({ x: data[0], y: data[1] });
  if (getKind(options.kind) === TRANSMITTANCE) {
    return new Spectrum({
      wavelength: spectrum.x,
      transmittance: spectrum.y,
      absorbance: []
    });
  } else {
    return new Spectrum({
      wavelength: spectrum.x,
      transmisttance: [],
      absorbance: spectrum.y
    });
  }
}
