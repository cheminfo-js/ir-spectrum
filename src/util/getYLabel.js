import { ABSORBANCE, TRANSMITTANCE, PERCENT_TRANSMITTANCE } from '../constants';

export function getYLabel(mode) {
  switch (mode) {
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
