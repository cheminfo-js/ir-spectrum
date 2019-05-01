import { ABSORBANCE, TRANSMITTANCE, PERCENT_TRANSMITTANCE } from '../constants';

/**
 *
 * @param {*} spectrum
 * @param {object} [options={}]
 *
 */

export function getData(spectrum, options = {}) {
  let mode = options.mode || spectrum.mode;
  switch (mode) {
    case ABSORBANCE:
      return spectrum.getAbsorbance();
    case TRANSMITTANCE:
      return spectrum.getTransmittance();
    case PERCENT_TRANSMITTANCE:
      return spectrum.getPercentTransmittance();
    default:
      return {};
  }
}
