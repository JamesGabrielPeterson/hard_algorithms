import { ShortCodeContext } from "twilio/lib/rest/api/v2010/account/shortCode";

/**
 * @param {string} password
 * @return {number}
 */
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
    // Create three stacks
    // One from which to remove first (L - 2 % 3 === 1)
    // One from which to remove second (L - 2 % 3 === 2)
    // One from which to remove third (L - 2 % 3 === 3)
    
    // Remove repeating characters using toRemove as a decreasing count
    while (toRemove && toRemove > 0) {
      for (let i = 1; i < passwordLength; i++) {
        if (password[i] === password[i - 1] && password[i] === password[i + 1]) {
          removeCharAt(password, i, 1);
          toRemove--;
        }
      }
    }
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