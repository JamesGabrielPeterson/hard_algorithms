import { binarySearch } from '../../../2_algorithms/1_binary_search';

describe('binarySearch()', () => {
  let arr = [1, 4, 7, 9, 12, 17, 21, 35, 36, 37, 60, 77, 83, 99];

  it('returns the correct answer', () => {
    expect(binarySearch(arr, 7)).toBe(2);
  })
});