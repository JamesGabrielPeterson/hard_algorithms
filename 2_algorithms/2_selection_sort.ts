export const selectionSort = (arr: number[]) => {
  let sorted: number[] = [];
  let len = arr.length;

  for (let i = 0; i < len; i++) {
    let smallest: number = findSmallest(arr);
    sorted.push(...arr.splice(smallest, 1));
  }

  return sorted;
};

export const findSmallest = (arr: number[]): number => {
  let smallest = arr[0];
  let smallest_index = 0;

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < smallest) {
      smallest = arr[i];
      smallest_index = i;
    }
  }
  
  return smallest_index;
};