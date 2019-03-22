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
    this.absorbance = json.absorbance || [];
    this.transmittance = json.transmittance || [];
  }

  getAbsorbance() {
    if (this.absorbance.length > 0) {
      return { x: this.wavelength, y: this.absorbance };
    } else {
      if (this.transmittance.length > 0) {
        return {
          x: this.wavelength,
          y: this.transmittance.map((transmittance) => -Math.log10(transmittance))
        };
      } else {
        return { x: [], y: [] };
      }
    }
  }

  getTransmittance() {
    if (this.transmittance.length > 0) {
      return { x: this.wavelength, y: this.transmittance };
    } else {
      if (this.absorbance.length > 0) {
        return {
          x: this.wavelength,
          y: this.absorbance.map((absorbance) => 10 ** -absorbance)
        };
      } else {
        return { x: [], y: [] };
      }
    }
  }

  getPercentTransmittance() {
    let data = this.getTransmittance();
    return {
      x: data.x,
      y: data.y.map((transmittance) => transmittance * 100)
    };
  }
}

export const ABSORBANCE = 1;
export const TRANSMITTANCE = 2;

export function getKind(kind = '') {
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
