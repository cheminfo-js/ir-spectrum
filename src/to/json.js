/**
 * Create an object of Chromatogram
 * @return {object}
 */
export function toJSON() {
  return {
    wavelength: this.wavelength,
    y: this.y,
    kind: this.kind
  };
}
