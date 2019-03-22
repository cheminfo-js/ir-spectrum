import { toJSON } from './to/json';

/**
 * Class allowing manipulate one IR spectrum
 * @class IRSpectrum
 * @param {object} [json={}] - object containing a spectrum
 * @param {Array} [json.wavelength=[]] - wavelength
 * @param {Array} [json.y=[]] - y values
 * @param {integer} [json.kind=IRSpectrum.TRANSMITTANCE] - either IRSpectrum.ABSORBANCE or IRSpectrum.TRANSMITTANCE
 */
export class IRSpectrum {
  constructor(json = {}) {
    this.wavelength = json.wavelength || [];
    this.y = json.y || [];
    this.kind = getKind(json.kind);
  }
}

export const ABSORBANCE = 1;
export const TRANSMITTANCE = 2;

function getKind(kind = '') {
  if (typeof kind === 'number') {
    if (kind < 1 || kind > 2) {
      throw new Error('kind should either be 1 or 2');
    }
    return kind;
  }
  if (kind.match(/abs/i)) {
    return ABSORBANCE;
  }
  return TRANSMITTANCE;
}

IRSpectrum.prototype.toJSON = toJSON;
