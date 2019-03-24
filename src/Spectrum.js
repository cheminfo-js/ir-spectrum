import min from 'ml-array-min';
import max from 'ml-array-max';

import { TRANSMITTANCE, ABSORBANCE, PERCENT_TRANSMITTANCE } from './constants';
import { toJSON } from './to/json';
import { getAnnotations } from './jsgraph/getAnnotations';
import { getData } from './jsgraph/getData';
import { addPeak } from './addPeak';

/**
 * Class allowing manipulate one IR spectrum
 * @class IRSpectrum
 * @param {object} [json={}] - object containing a spectrum
 * @param {Array} [json.wavelength=[]] - wavelength
 * @param {Array} [json.y=[]] - y values
 * @param {integer} [json.kind=IRSpectrum.TRANSMITTANCE] - either IRSpectrum.ABSORBANCE or IRSpectrum.TRANSMITTANCE
 */
export class Spectrum {
  constructor(json = {}) {
    this.wavelength = json.wavelength || [];
    this.absorbance = json.absorbance || [];
    this.transmittance = json.transmittance || [];
    this.mode = PERCENT_TRANSMITTANCE;
    this.peaks = [];
    check(this);
  }

  /**
   *
   * @param {Array} [peaks=[]] array of peaks. Peaks are composed of transmittance, wavelength, kind
   */
  setPeaks(peaks = []) {
    this.peaks = peaks;
  }

  setMode(mode) {
    if (mode < 1 || mode > 3) {
      throw new Error(
        'Mode should be either 1 (absorbance), 2 (transmittance) or 3 (percent transmittance)'
      );
    }
    this.mode = mode;
  }

  addPeak(targetWavelength, options = {}) {
    addPeak(this, targetWavelength, options);
  }

  getAbsorbance() {
    return { x: this.wavelength, y: this.absorbance };
  }

  getTransmittance() {
    return { x: this.wavelength, y: this.transmittance };
  }

  getPercentTransmittance() {
    let data = this.getTransmittance();
    return {
      x: data.x,
      y: data.y.map((transmittance) => transmittance * 100)
    };
  }

  getYLabel() {
    switch (this.mode) {
      case ABSORBANCE:
        return 'Absorbance';
      case TRANSMITTANCE:
        return 'Transmittance';
      case PERCENT_TRANSMITTANCE:
        return 'Transmittance [%]';
      default:
        return '';
    }
  }
}

Spectrum.prototype.toJSON = toJSON;
Spectrum.prototype.getAnnotations = function (options) {
  return getAnnotations(this, options);
};
Spectrum.prototype.getData = function (options) {
  return getData(this, options);
};

function check(irSpectrum) {
  if (
    irSpectrum.transmittance.length > 0 &&
    irSpectrum.absorbance.length === 0
  ) {
    irSpectrum.absorbance = irSpectrum.transmittance.map(
      (transmittance) => -Math.log10(transmittance)
    );
  }

  if (
    irSpectrum.absorbance.length > 0 &&
    irSpectrum.transmittance.length === 0
  ) {
    irSpectrum.transmittance = irSpectrum.absorbance.map(
      (absorbance) => 10 ** -absorbance
    );
  }

  if (irSpectrum.wavelength.length > 0) {
    irSpectrum.minWavelength = min(irSpectrum.wavelength);
  }
  if (irSpectrum.wavelength.length > 0) {
    irSpectrum.maxWavelength = max(irSpectrum.wavelength);
  }
  if (irSpectrum.absorbance.length > 0) {
    irSpectrum.minAbsorbance = min(irSpectrum.absorbance);
  }
  if (irSpectrum.absorbance.length > 0) {
    irSpectrum.maxAbsorbance = max(irSpectrum.absorbance);
  }
  if (irSpectrum.transmittance.length > 0) {
    irSpectrum.minTransmittance = min(irSpectrum.transmittance);
  }
  if (irSpectrum.transmittance.length > 0) {
    irSpectrum.maxTransmittance = max(irSpectrum.transmittance);
  }
}
