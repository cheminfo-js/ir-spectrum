import { ABSORBANCE, TRANSMITTANCE, PERCENT_TRANSMITTANCE } from '../constants';

import filterX from 'ml-array-xy-filter-x';
/**
 *
 * @param {*} spectrum
 * @param {object} [options={}]
 *
 */

export function getData(spectrum, options = {}) {
  let mode = options.mode || spectrum.mode;
  const { filter } = options;
  let data = {};
  switch (mode) {
    case ABSORBANCE:
      data = spectrum.getAbsorbance();
    case TRANSMITTANCE:
      data = spectrum.getTransmittance();
    case PERCENT_TRANSMITTANCE:
      data = spectrum.getPercentTransmittance();
    default:
  }
  if (!filter) return DataCue;
  return filterX(data, filter);
}
