import { PERCENT_TRANSMITTANCE } from './constants';
import { getYLabel } from './util/getYLabel';

import { fromJcamp } from './index.js';

export class Spectra {
  constructor(options = {}) {
    this.normalizationOptions =
      options.normalization === undefined
        ? {
          from: 800,
          to: 4000,
          numberOfPoints: 1024,
          applySNV: true
        }
        : options.normalization;
    this.data = [];
    this.mode = PERCENT_TRANSMITTANCE;
  }

  /**
   * Add a spectrum
   * @param {Spectrum} spectrum
   * @param {string} id
   * @param {object} [meta={}]
   * @param {string} [meta.color]
   */
  addSpectrum(spectrum, id, meta = {}) {
    let index = this.getSpectrumIndex(id);
    if (index === undefined) index = this.data.length;
    this.data[index] = {
      normalized: spectrum.getNormalized(this.normalizationOptions),
      spectrum,
      id,
      meta
    };
  }

  /**
   * Add jcamp
   * @param {string} jcamp
   * @param {string} id
   * @param {boolean} [force=false]
   * @param {object} [meta={}]
   * @param {string} [meta.color]
   */
  addFromJcamp(jcamp, id, meta = {}, force = false) {
    if (force === false && this.contains(id)) return;
    let spectrum = fromJcamp(jcamp);
    this.addSpectrum(spectrum, id, meta);
  }

  removeSpectrum(id) {
    let index = this.getSpectrumIndex(id);
    if (index === undefined) return undefined;
    return this.data.splice(index, 1);
  }

  contains(id) {
    return !isNaN(this.getSpectrumIndex(id));
  }

  getSpectrumIndex(id) {
    if (!id) return undefined;
    for (let i = 0; i < this.data.length; i++) {
      let spectrum = this.data[i];
      if (spectrum.id === id) return i;
    }
    return undefined;
  }

  getNormalizedData() {
    if (!this.data || !this.data[0]) return {};
    let matrix = [];
    let meta = [];
    let ids = [];
    for (let datum of this.data) {
      ids.push(datum.id);
      matrix.push(datum.normalized.y);
      meta.push(datum.meta);
    }
    let x = this.data[0].normalized.x;
    return { ids, matrix, meta, x };
  }

  getChart(options = {}) {
    const { filter = {}, mode = this.mode } = options;
    let chart = {
      title: 'IR spectra superimposition',
      data: []
    };
    for (let datum of this.data) {
      if (!filter.ids || filter.ids.includes(datum.id)) {
        let data = datum.spectrum.getData({ mode });

        data.styles = {
          unselected: {
            lineColor: datum.meta.color || 'darkgrey',
            lineWidth: 1,
            lineStyle: 1
          },
          selected: {
            lineColor: datum.meta.color || 'darkgrey',
            lineWidth: 3,
            lineStyle: 1
          }
        };
        data.label = datum.meta.id || datum.id;
        chart.data.push(data);
      }
    }
    return chart;
  }
}

Spectra.getYLabel = getYLabel;
