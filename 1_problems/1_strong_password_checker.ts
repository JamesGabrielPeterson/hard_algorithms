/**
 * @param {string} password
 * @return {number}
 */

interface SequenceContainer {
  processFirst: string[];
  processSecond: string[];
  processThird: string[];
}

export const strongPasswordChecker = (password: string): number => {
  // There are three cases
  // The first is the passowrd being valid, between 6 and 20 characters VALID
  // The second is the password being shorter than 6 characters SHORT
  // The third is the password is longer than 20 characters, 21+ LONG

  // Define the separate password cases (short, valid, long)
  const passwordLength: number = password.length;
  let CASE: string = '';
  if (passwordLength < 6) CASE = 'SHORT';
  if (passwordLength >= 6 && passwordLength <= 20) CASE = 'VALID';
  if (passwordLength > 20) CASE = 'LONG';

  // Define the constraints
  let A: number; // Length
  let B: number; // Uppercase, Lowercase, and Number
  let C: number; // Repeat Sequences

  // Determine which case we have to handle
  let totalEdits: number = 0;
  switch (CASE) {
    case 'SHORT':
      A = 6 - passwordLength;
      B = findCharacterEdits(password);
      C = findRepeatEdits(password);
      totalEdits = Math.max(A, B, C);
      break;
    case 'VALID':
      A = 0;
      B = findCharacterEdits(password);
      C = findRepeatEdits(password);
      totalEdits = Math.max(B, C);
      break;
    case 'LONG':
      A = passwordLength - 20;
      B = findCharacterEdits(password);
      C = findRepeatEdits(password, A);
      totalEdits = A + Math.max(B, C);
  }

  return totalEdits;
};

export const findCharacterEdits = (password: string): number => {
  let requiredEdits = 3;

  if (/[0-9]/.test(password)) requiredEdits--;
  if (/[a-z]/.test(password)) requiredEdits--;
  if (/[A-Z]/.test(password)) requiredEdits--;

  return requiredEdits;
};

export const findRepeatEdits = (password: string, toRemove?: number): number => {
  let passwordLength = password.length;
  let edits = 0;

  if (passwordLength > 20) {
    let { processFirst, processSecond, processThird } = categorizeAndSortSequences(password);
    let modifiedPassword = removeCharacters(password, toRemove, processFirst, processSecond, processThird);
    edits += countEditedSequenceCharacters(modifiedPassword);
  } else {
    edits += countEditedSequenceCharacters(password);
  }

  return edits;
};

export const categorizeAndSortSequences = (password: string): SequenceContainer => {
  // Save password length for easy access
  const PL = password.length;
  // Create three stacks
  let processFirst: string[] = [];
  let processSecond: string[] = [];
  let processThird: string[] = [];
  // Fill the stacks with the START and END index of each sequence in the password
  // (L - 2 % 3 === 1) processFirst
  // (L - 2 % 3 === 2) processSecond
  // (L - 2 % 3 === 3) processThird
  let sequenceLength = 1;
  for (let i = 1; i < PL; i++) {
    if (password[i] === password[i - 1]) {
      sequenceLength++;
    } else if (sequenceLength >= 3) {
      // Store that sequence START and END indexes in the correct stack
      switch ((sequenceLength - 2) % 3) {
        case 1:
          processFirst.push(password.slice(i - sequenceLength, i));
          break;
        case 2:
          processSecond.push(password.slice(i - sequenceLength, i));
          break;
        case 0:
          processThird.push(password.slice(i - sequenceLength, i));
          break;
        default:
          break;
      }
      sequenceLength = 1;
    } else {
      sequenceLength = 1;
    }
  }

  if (sequenceLength >= 3) {
    // Store that sequence in the correct stack
    switch ((sequenceLength - 2) % 3) {
      case 1:
        processFirst.push(password.slice(PL - sequenceLength, PL));
        break;
      case 2:
        processSecond.push(password.slice(PL - sequenceLength, PL));
        break;
      case 0:
        processThird.push(password.slice(PL - sequenceLength, PL));
        break;
    }
  }

  return { processFirst, processSecond, processThird };
};

export const countEditedSequenceCharacters = (pw: string): number => {
  let L = 1;
  let edits = 0;
  let PL = pw.length;
  for (let i = 1; i < PL; i++) {
    if (pw[i] === pw[i - 1]) {
      L++;
      if (i + 1 === PL && L >= 3) {
        edits += Math.floor(L / 3);
      }
    } else if (L >= 3) {
      edits += Math.floor(L / 3);
      L = 1;
    } else {
      L = 1;
    }
  }

  return edits;
};

/**
 * 
 * @param password 
 * @param toRemove 
 * @param first 
 * @param second 
 * @param third 
 * @returns edits: number
 * 
 * This function takes the password and the number of characters that need to be removed from it
 * 
 * We pass in three containers, each with any number of arrays containing two digits
 * The two digits contained in the internal array mark the start and end of the repeat sequence
 * 
 * If the arrays are in the first container, they must be processed first, then updated
 * If the arrays are in the second container, they must be processed second, then updated
 * If the arrays are in the third container, they must be process third, then updated
 */

export const removeCharacters = (password: string, toRemove: number | undefined, first: string[], second: string[], third: string[]) => {
  // Declare current
  let current: string = "";
  // Remove repeating characters using toRemove as a decreasing count
  mainLoop: while (toRemove && toRemove > 0) {
    // Process first array
    while (first.length && toRemove > 0) {
      current = first.pop() || "";
      current = removeCharAt(current, current.length - 1, 1);
      toRemove--;
      if (current.length >= 3) third.push(current);
    }
    // Process second array
    while (second.length && toRemove > 0) {
      // Pop a value off from the second array
      current = second.pop() || "";
      // How many we remove is dependent on the toRemove variable
      switch (toRemove) {
        case 1:
          current = removeCharAt(current, current.length - 1, 1);
          toRemove--;
          if (current.length >= 3) first.push(current);
          break;
        default:
          current = removeCharAt(current, current.length - 2, 2);
          toRemove -= 2;
          if (current.length >= 3) third.push(current);
          break;
      }
      if (first.length) continue mainLoop;
    }
    // Process third array
    while (third.length && toRemove > 0) {
      // Pop a value off from the third array
      current = third.pop() || "";
      // How many we remove is dependent on the toRemove variable
      switch (toRemove) {
        case 1:
          current = removeCharAt(current, current.length - 1, 1);
          toRemove--;
          if (current.length >= 3) second.push(current);
          break;
        case 2:
          current = removeCharAt(current, current.length - 2, 2);
          toRemove -= 2;
          if (current.length >= 3) first.push(current);
          break;
        default:
          current = removeCharAt(current, current.length - 3, 3);
          toRemove -= 3;
          if (current.length >= 3) third.push(current);
          break;
      }
      if (first.length || second.length) continue mainLoop;
    }
    if (!first.length && !second.length && !third.length) break;
  }

  return first.join("^") + "*" + second.join("^") + "*" + third.join("^");
};

export const removeCharAt = (str: string, start: number, charsToRemove: number): string => {
  var tmp = str.split('');
  tmp.splice(start, charsToRemove);
  return tmp.join('');
}