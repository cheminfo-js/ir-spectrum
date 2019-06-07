import equallySpaced from 'ml-array-xy-equally-spaced';
import Util from 'ml-array-utils';
import hash from 'hash-it';
import Stat from 'ml-stat/array';

export function getNormalized(spectrum, options = {}) {
  let optionsHash = hash(options);

  if (!spectrum.cache) spectrum.cache = {};
  if (!spectrum.cache.normalized) spectrum.cache.normalized = {};
  if (spectrum.cache.normalized.hash === optionsHash) {
    return spectrum.cache.normalized.value;
  }
  let {
    from = 800,
    to = 4000,
    numberOfPoints = 1024,
    centerMean = true,
    scaleSD = true,
    exclusions = []
  } = options;

  let y = spectrum.absorbance.slice(0);
  if (centerMean) {
    var mean = Stat.mean(spectrum.absorbance);
    y = y.map((y) => y - mean);
  }
  if (scaleSD) {
    var std = Stat.standardDeviation(spectrum.absorbance);
    y = y.map((y) => y / std);
  }

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
