/**
 * @param {string} password
 * @return {number}
 */

interface SequenceContainer {
  first: number[][];
  second: number[][];
  third: number[][];
}

export const strongPasswordChecker = (password: string): number => {
  // Find length of password
  const N = password.length;
  // Create a variable to store the edits
  let totalEdits = 0;
  // If the string is the correct length, we only need to return the max of constraint B and C
  // If the string is SHORT, we need to add characters until we reach 6, then possibly make edits
  // if the string is LONG, we need to remove the characters exceeding 20, then possly make edits
  
  // In the case where the length of the password is less than the lower bound
  // Return the max of all three constraints, A, B, and C
  if (N < 6) {
    // In the case where the length is less than lower bound (6)
    // Figure out how many characters need to be added, then
    // Figure out how many edits are needed
    // Create variables for unique character edits and repeat edits
    // Find A, B, and C
    const A = 6 - N;
    const B = findCharacterEdits(password);
    const C = findRepeatEdits(password, N);
    // Return the greatest value between constraints A, B, and C
    totalEdits = Math.max(A, B, C);
  // In the case where the length is correct
  // Figure out how many edits are needed
  // Return the max of constraints B and C
  } else if (N <= 20) {
    // Create variables for unique character edits and repeat edits
    // Find B and C
    const B = findCharacterEdits(password);
    const C = findRepeatEdits(password, N);
    // Return the greatest value between constraints B and C
    totalEdits = Math.max(B, C);
  // In the case where the length of the password greater than the upper bound
  // Do this
  } else {
    // In the case where the length is greater than the upper bound (20)
    // Figure out who many characters need to be deleted, then
    // Figure out how many edits are needed
    // Find A, B, and C
    const A = Math.abs(N - 20);
    const B = findCharacterEdits(password);
    const C = findRepeatEdits(password, N, A);
    // Return the number of characters that need to be removed minus the max of constraints B and C
    totalEdits = A + Math.max(B, C);
  }

  return totalEdits;
};

export const findCharacterEdits = (password: string): number => {
  // Start with 3 edits needed
  // Because we have not found any uppercase letters, lowercase letters, or numbers yet
  let editsNeeded = 3;
  // If a number exists in our password, eliminate that need
  if (/[0-9]/.test(password)) editsNeeded--;
    // If a lowercase letter exists in our password, eliminate that need
  if (/[a-z]/.test(password)) editsNeeded--;
    // If an uppercase letter exists in our password, eliminate that need
  if (/[A-Z]/.test(password)) editsNeeded--;
  // Return the required unique characters we have not encountered
  return editsNeeded;
};

// Rebuild function below with switch statements flags:
// SHORT
// VALID
// LONG

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
    // Create three containers that must be processed in different order
    let { first, second, third } = sortSequences(password);
    // Remove repeating characters using toRemove as a decreasing count
    while (toRemove && toRemove > 0) {
      let current: number[] = [0, 0];
      // Process first array
      while (first.length > 0) {
        // Pop a value off from the first array
        current = first.pop() || [0, 0];
        // Remove the character that sits at this index from the password
        removeCharAt(password, current[1] - 1, 1);
        // Account for removed character in current
        current[1]--;
        // if the length of the sequence is greater than 3, add it to the third array
        if (current[1] - current[0] > 3) third.push(current);
        // Decrement toRemove by 1
        toRemove--;
        // Increase edit by 1
        edits++;
      }
      // Process second array
      while (second.length > 0) {
        // Pop a value off from the second array
        current = second.pop() || [0, 0];
        // Remove the character that sits at this index from the password
        removeCharAt(password, current[1] - 2, 2);
        // Account for removed character in current
        current[1] -= 2;
        // if the length of the sequence is greater than 3, add it back to the second array
        if (current[1] - current[0] > 3) second.push(current);
        // Decrement toRemove by 2
        toRemove -= 2;
        // Increase edits by 2
        edits += 2;
      }
      // Process third array
      while (third.length > 0) {
        // Pop a value off from the third array
        current = third.pop() || [0, 0];
        // Remove the character that sits at this index from the password
        removeCharAt(password, current[1] - 3, 3);
        // Account for removed characters in current
        current[1] -= 3;
        // if the length of the sequence is great than 3, add it back to the third array
        if (current[1] - current[0] > 3) third.push(current);
        // Decrement toRemove by 1
        toRemove -= 3;
        // Increase edits by 3
        edits += 3;
      }
      if (first.length === 0 && second.length === 0 && third.length === 0) break;
    }
    L = 1;
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

export const removeCharAt = (str: string, i: number, charsToRemove: number): string => {
  var tmp = str.split(''); // convert to an array
  tmp.splice(i - charsToRemove , charsToRemove); // remove 1 element from the array (adjusting for non-zero-indexed counts)
  return tmp.join(''); // reconstruct the string
}

export const sortSequences = (password: string): SequenceContainer => {
  // Save password length for easy access
  const PL = password.length;
  // Create three stacks
  // One from which to remove first (L - 2 % 3 === 1)
  // One from which to remove second (L - 2 % 3 === 2)
  // One from which to remove third (L - 2 % 3 === 3)
  let first: number[][] = [];
  let second: Array<Array<number>> = [];
  let third: Array<Array<number>> = [];
  // Initialize sequence length to 1
  let L = 1;
  // Fill the stacks with the sequences in the password
  // Those that should be process first (L - 2 % 3 === 1) FIRST
  // Those that should be processed second (L - 2 % 3 === 2) SECOND
  // Those that should be processed third (L - 2 % 3 === 0) LAST
  for (let i = 1; i < PL; i++) {
    if (password[i] === password[i - 1]) {
      L++;
    } else if (L >= 3) {
      // Find sequence
      let sequence = password.slice(i - L, i);
      // Store that sequence in the correct stack
      switch ((sequence.length - 2) % 3) {
        case 1:
          first.push([i - L, i])
          break;
        case 2:
          second.push([i - L, i]);
          break;
        case 0:
          third.push([i - L, i]);
          break;
        default:
          break;
      }
      // After storing sequence in correct bin
      // Reset sequence length to 1 and start from current element
      L = 1;
    } else {
      // If the current element doesn't match the previous element
      // And the length of the current sequence is not 3 or more
      // This is not a repeat sequence of 3 or more, so just reset the sequence variable
      L = 1;
    }
  }

  if (L >= 3) {
    // Find sequence
    let sequence = password.slice(PL - L, PL);
    // Store that sequence in the correct stack
    switch ((sequence.length - 2) % 3) {
      case 1:
        first.push([PL - L, PL - 1])
        break;
      case 2:
        second.push([PL - L, PL - 1]);
        break;
      case 0:
        third.push([PL - L, PL - 1]);
        break;
    }
  }

  return { first, second, third };
};