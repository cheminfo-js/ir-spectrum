import equallySpaced from 'ml-array-xy-equally-spaced';
import Util from 'ml-array-utils';
import hash from 'hash-it';

export function getNormalized(spectrum, options = {}) {
  let optionsHash = hash(options);

  if (!spectrum.cache) spectrum.cache = {};
  if (!spectrum.cache.normalized) spectrum.cache.normalized = {};
  if (spectrum.cache.normalized.hash === optionsHash) {
    return spectrum.cache.normalized.value;
  }
  const {
    from = 800,
    to = 4000,
    numberOfPoints = 1024,
    applySNV = true,
    exclusions = []
  } = options;

  let y = applySNV ? Util.SNV(spectrum.absorbance) : spectrum.absorbance;
  let result = equallySpaced(
    { x: spectrum.wavelength, y },
    { from, to, numberOfPoints, exclusions }
  );
  spectrum.cache.normalized = {
    hash: optionsHash,
    value: result
  };

  return result;
}
