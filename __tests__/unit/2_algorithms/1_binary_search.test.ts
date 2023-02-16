import { binarySearch } from '../../../2_algorithms/1_binary_search';

describe('binarySearch()', () => {
  let arr = [1, 4, 7, 9, 12, 17, 21, 35, 36, 37, 60, 77, 83, 99, 101];

  it('returns the correct answer for first element with odd based array', () => {
    expect(binarySearch(arr, 1)).toBe(0);
  });

  it('returns the correct answer for middle element with odd based array', () => {
    expect(binarySearch(arr, 35)).toBe(7);
  });

  it('returns the correct answer for last element with odd based array', () => {
    expect(binarySearch(arr, 101)).toBe(14);
  });

  it('returns -1 for an element that doesnt exist in array', () => {
    expect(binarySearch(arr, 8)).toBe(-1);
    expect(binarySearch(arr, 22)).toBe(-1);
    expect(binarySearch(arr, 38)).toBe(-1);
    expect(binarySearch(arr, 70)).toBe(-1);
  });
});