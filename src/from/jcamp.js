import { convert as converter } from 'jcampconverter';

import { IRSpectrum } from '..';
/**
 * Creates a new Chromatogram element based in a JCAMP string
 * @param {string} jcamp - String containing the JCAMP data
 * @return {Chromatogram} - New class element with the given data
 */
export function fromJcamp(jcamp) {
  const data = converter(jcamp, { xy: true });
  let spectrum = data.spectra[0].data[0];

  return new IRSpectrum({
    wavelength: spectrum.x,
    y: spectrum.y,
    kind: data.spectra[0].yUnit
  });
}
