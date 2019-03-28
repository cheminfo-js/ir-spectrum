import { getNormalized } from './spectra/getNormalized';

export class Spectra {
  constructor(options = {}) {
    this.from = options.from === undefined ? 800 : options.from;
    this.to = options.to === undefined ? 4000 : options.to;
    this.numberOfPoints =
      options.numberOfPoints === undefined ? 1000 : options.numberOfPoints;
    this.applySNV = options.applySNV === undefined ? true : options.applySNV;
    this.spectra = {};
  }

  /**
   * Add a spectrum
   * @param {string} key
   * @param {Spectrum} spectrum
   */
  addSpectrum(key, spectrum) {
    this.spectra[key] = {
      key,
      normalized: getNormalized(spectrum, {
        from: this.from,
        to: this.to,
        numberOfPoints: this.numberOfPoints
      }),
      spectrum
    };
  }
}
