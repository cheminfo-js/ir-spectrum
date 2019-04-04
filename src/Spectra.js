import { calculatePCA } from './spectra/calculatePCA';

export class Spectra {
  constructor(options = {}) {
    this.from = options.from === undefined ? 800 : options.from;
    this.to = options.to === undefined ? 4000 : options.to;
    this.numberOfPoints =
      options.numberOfPoints === undefined ? 1000 : options.numberOfPoints;
    this.applySNV = options.applySNV === undefined ? true : options.applySNV;
    this.spectra = [];
    this.cache = {};
  }

  /**
   * Add a spectrum
   * @param {Spectrum} spectrum
   * @param {object} [meta={}]
   * @param {string} [meta.id] - spectrum id
   */
  addSpectrum(spectrum, id, meta = {}) {
    this.cache = {};
    let index = this.getSpectrumIndex(id);
    if (index === undefined) index = this.spectra.length;
    this.spectra[index] = {
      normalized: spectrum.getNormalized(spectrum, {
        from: this.from,
        to: this.to,
        numberOfPoints: this.numberOfPoints
      }),
      spectrum,
      id,
      meta
    };
  }

  getSpectrumIndex(id) {
    if (!id) return undefined;
    for (let i = 0; i < this.spectra.length; i++) {
      let spectrum = this.spectra[i];
      if (spectrum.id === id) return i;
    }
    return undefined;
  }

  getScorePlot() {
    let pca = calculatePCA();
    return pca.predict(pca.matrix, { nComponents: 2 });
  }
}
