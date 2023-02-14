/**
 * @param {string} password
 * @return {number}
 */
export const strongPasswordChecker = (password: string): number | undefined => {
  // Find length of password
  const N = password.length;
  // In the case where the length is correct
  // Figure out how many edits are needed
  // Return the max of constraints B and C
  if (N >= 6 && N <= 20) {
    // Create variables for unique character edits and repeat edits
    // Find B and C
    const B = findCharacterEdits(password, N);
    const C = findRepeatEdits(password, N);
    // Return the greatest value between constraints B and C
    return Math.max(B, C);
  // In the case where the length of the password is less than the lower bound
  // Return the max of all three constraints, A, B, and C
  } else if (N < 6) {
    // In the case where the length is less than lower bound (6)
    // Figure out how many characters need to be added, then
    // Figure out how many edits are needed
    // Create variables for unique character edits and repeat edits
    // Find A, B, and C
    const A = 6 - N;
    const B = findCharacterEdits(password, N);
    const C = findRepeatEdits(password, N);
    // Return the greatest value between constraints A, B, and C
    return Math.max(A, B, C);
  // In the case where the length of the password greater than the upper bound
  // Do this
  } else if (N > 20) {
    // In the case where the length is greater than the upper bound (20)
    // Figure out who many characters need to be deleted, then
    // Figure out how many edits are needed
    // Find A, B, and C
    const A = Math.abs(N - 20);
    const B = findCharacterEdits(password, N);
    const C = findRepeatEdits(password, N, A);
    // Return the number of characters that need to be removed minus the max of constraints B and C
    return A + Math.max(B, C);
  }
};

export const findCharacterEdits = (password: string, passwordLength: number): number => {
  // Create array to track number of each unique character
  let trackerArray = [0, 0, 0];
  // Run algorithms to find unique character edits
  // Loop over password
  for (let i = 0; i < passwordLength; i++) {
    if (password.charCodeAt(i) >= 65 && password.charCodeAt(i) <= 90) {
      trackerArray[0]++;
    } else if (password.charCodeAt(i) >= 97 && password.charCodeAt(i) <= 122) {
      trackerArray[1]++;
    } else if (password.charCodeAt(i) >= 48 && password.charCodeAt(i) <= 57) {
      trackerArray[2]++;
    }
  }
  // Write logic for what's missing
  if (trackerArray[0] && trackerArray[1] && trackerArray[2]) return 0;
  if (trackerArray[0] && trackerArray[1]) return 1;
  if (trackerArray[1] && trackerArray[2]) return 1;
  if (trackerArray[0] && trackerArray[2]) return 1;
  if (trackerArray[0]) return 2;
  if (trackerArray[1]) return 2;
  if (trackerArray[2]) return 2;
  return 3;
};

export const findRepeatEdits = (password: string, passwordLength: number, toRemove?: number): number => {
  // Create variable to track edits and initialize it to 0
  let edits = 0;
  // Create variable to count how many length (L) of sequence
  let L = 1;
  // Run algorithm to find repeat characters
  // Loop over password tracking repeats depending on length of password
  if (passwordLength >= 6 && passwordLength <= 20) {
    for (let i = 1; i < passwordLength; i++) {
      if (password[i] === password[i - 1]) {
        L++;
      } else {
        if (L >= 3) edits += L / 3;
        L = 1;
      }
    }
    if (L >= 3) edits += L / 3;
  } else if (passwordLength > 20) {
    // Remove repeating characters using toRemove as a decreasing count
    while (toRemove) {
      for (let i = 1; i < passwordLength; i++) {
        if (password[i] === password[i - 1]) {
          L++;
        } else if (L - 2 % 3 === 1) {
          edits += 1;
          password = removeCharAt(password, i - 1, 1);
          toRemove = toRemove - 1;
        }
        if (toRemove <= 0) break;
      }
      for (let i = 1; i < passwordLength; i++) {
        if (password[i] === password[i - 1]) {
          L++;
        } else if (L - 2 % 3 === 2) {
          edits += 2;
          password = removeCharAt(password, i - 1, 2);
          toRemove = toRemove - 2;
        }
        if (toRemove <= 0) break;
      }
      for (let i = 1; i < passwordLength; i++) {
        if (password[i] === password[i - 1]) {
          L++;
        } else if (L - 2 % 3 === 0) {
          edits += 3;
          password = removeCharAt(password, i - 1, 3);
          toRemove = toRemove - 3;
        }
      }
    }
    // Edit any remaining characters after removing those needed to get to 20 or less
    for (let i = 1; i < passwordLength; i++) {
      if (password[i] === password[i - 1]) {
        L++;
      } else {
        if (L >= 3) edits += L / 3;
        L = 1;
      }
    }
    if (L >= 3) edits += L / 3;
  } else {
    for (let i = 1; i < passwordLength; i++) {
      if (password[i] === password[i - 1]) {
        L++;
      } else {
        if (L >= 3) edits += L / 2 - 1;
        L = 1;
      }
    }
    if (L >= 3) edits += L / 2 - 1;
  }
  // Return the number of repeat edits required
  return Math.floor(edits);
};

const removeCharAt = (str: string, i: number, toRemove: number): string => {
  var tmp = str.split(''); // convert to an array
  tmp.splice(i - toRemove , toRemove); // remove 1 element from the array (adjusting for non-zero-indexed counts)
  return tmp.join(''); // reconstruct the string
}