import { checkServerIdentity } from 'tls';

import min from 'ml-array-min';
import max from 'ml-array-max';

import { toJSON } from './to/json';
import { toAnnotations } from './to/annotations';

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

  addPeak(targetWavelength, options = {}) {
    const { range = 10 } = options;
    let transmittance = Number.MAX_VALUE;
    let absorbance = Number.MIN_VALUE;
    let bestWavelength;
    // we search the minimum based on wavelength +/- range
    for (let i = 0; i < this.wavelength.length; i++) {
      if (this.wavelength[i] - targetWavelength <= range) {
        if (this.transmittance[i] < transmittance) {
          transmittance = this.transmittance[i];
          absorbance = this.absorbance[i];
          bestWavelength = this.wavelength[i];
        }
      }
    }
    if (bestWavelength) {
      // check if it does not exists yet
      for (let peak of this.peaks) {
        if (peak.wavelength === bestWavelength) return;
      }
      this.peaks.push({
        wavelength: bestWavelength,
        transmittance,
        absorbance,
        kind: getPeakKind(
          transmittance,
          this.minTransmittance,
          this.maxTransmittance
        )
      });
    }
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
IRSpectrum.prototype.toAnnotations = toAnnotations;

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

function getPeakKind(transmittance, minTransmittance, maxTransmittance) {
  var position =
    (maxTransmittance - transmittance) / (maxTransmittance - minTransmittance);
  if (position < 0.33) {
    return 'w';
  } else if (position < 0.66) {
    return 'm';
  }
  return 'S';
}
