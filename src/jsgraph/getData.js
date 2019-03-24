import { ABSORBANCE, TRANSMITTANCE, PERCENT_TRANSMITTANCE } from '../constants';

export function getData(irSpectrum) {
  switch (irSpectrum.mode) {
    case ABSORBANCE:
      return irSpectrum.getAbsorbance();
    case TRANSMITTANCE:
      return irSpectrum.getTransmittance();
    case PERCENT_TRANSMITTANCE:
      return irSpectrum.getPercentTransmittance();
    default:
      return {};
  }
}
