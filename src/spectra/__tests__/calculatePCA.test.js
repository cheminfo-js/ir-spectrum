import { calculatePCA } from '../calculatePCA';

test('getPCA', () => {
  let spectra = {
    cache: {},
    spectra: [
      { normalized: [1, 1, 1, 1, 1, 1, 1, 1] },
      { normalized: [1, 0, 1, 1, 1, 1, 1, 1] },
      { normalized: [1, 1, 1, 1, 1, 1, 1, 1] },
      { normalized: [1, 0, 1, 1, 0, 1, 0, 1] },
      { normalized: [1, 1, 1, 1, 0, 1, 0, 1] },
      { normalized: [1, 0, 1, 1, 0, 1, 0, 1] }
    ]
  };

  let pca = calculatePCA(spectra);

  let result = pca.predict(pca.matrix, { nComponents: 2 });
  expect(result).toHaveLength(6);
  expect(result[0]).toHaveLength(2);
  expect(result).toMatchSnapshot();
});
