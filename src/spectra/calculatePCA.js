import PCA from 'ml-pca';

export function calculatePCA(spectra) {
  if (spectra.cache.pca) return spectra.cache.pca;
  let matrix = spectra.spectra.map((entry) => entry.normalized);

  const pca = new PCA(matrix);
  pca.matrix = matrix;
  spectra.cache.pca = pca;
  return pca;
}
