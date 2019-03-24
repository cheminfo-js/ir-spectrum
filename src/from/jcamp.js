import { convert as converter } from 'jcampconverter';

import { IRSpectrum } from '../IRSpectrum';
import { getKind, TRANSMITTANCE } from '../constants';
/**
 * Creates a new Chromatogram element based in a JCAMP string
 * @param {string} jcamp - String containing the JCAMP data
 * @return {IRSpectrum} - New class element with the given data
 */
export function fromJcamp(jcamp) {
  const data = converter(jcamp, { xy: true });
  let spectrum = data.spectra[0].data[0];
  if (getKind(data.spectra[0].yUnit) === TRANSMITTANCE) {
    return new IRSpectrum({
      wavelength: spectrum.x,
      transmittance: spectrum.y,
      absorbance: []
    });
  } else {
    return new IRSpectrum({
      wavelength: spectrum.x,
      transmittance: [],
      absorbance: spectrum.y
    });
  }
}
