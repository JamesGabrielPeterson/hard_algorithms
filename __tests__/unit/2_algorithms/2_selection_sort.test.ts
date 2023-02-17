import { selectionSort, findSmallest } from '../../../2_algorithms/2_selection_sort';

describe('selectionSort()', () => {
  it('passes', () => {
    let unsorted = [9, 5, 4, 7, 8, 3, 6, 1, 10, 2, 0];
    let sorted = selectionSort(unsorted);
    expect(sorted[0]).toBe(0);
    expect(sorted[2]).toBe(2);
    expect(sorted[5]).toBe(5);
    expect(sorted[9]).toBe(9);
    expect(sorted[10]).toBe(10);
  });
});

describe('findSmallest()', () => {
  it('returns 10', () => {
    let arr = [9, 5, 4, 7, 8, 3, 6, 1, 10, 2, 0];
    expect(findSmallest(arr)).toBe(10);
  });
});