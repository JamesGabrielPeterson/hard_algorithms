import { strongPasswordChecker } from "../../1_strong_password_checker";

describe('strongPasswordChecker', () => {

  it('checks for valid password', () => {
    expect(strongPasswordChecker("Aaab123")).toBe(0);
    expect(strongPasswordChecker("Heyy987654321")).toBe(0);
    expect(strongPasswordChecker("Ridiculous1")).toBe(0);
  });

  it('checks for valid length with incorrect unique characters and repeats', () => {
    expect(strongPasswordChecker("aaaab123")).toBe(1);
    expect(strongPasswordChecker("RIDICULOUS1")).toBe(1);
    expect(strongPasswordChecker("RIDICULOUSlower")).toBe(1);
    expect(strongPasswordChecker("238956381741")).toBe(2);
    expect(strongPasswordChecker("thisisalllowercase")).toBe(2);
    expect(strongPasswordChecker("THISISALLUPPERCASE")).toBe(2);
    expect(strongPasswordChecker("heyyyyyyyyyy98765432")).toBe(3);
    expect(strongPasswordChecker("aaaaaaaaaaaaaaaaaaaa")).toBe(6);
  });

  it('checks for length less than lower bound with incorrect characters and repeats', () => {
    expect(strongPasswordChecker("aaa")).toBe(3);
    expect(strongPasswordChecker("a")).toBe(5);
    expect(strongPasswordChecker("aaaaa")).toBe(2);
    expect(strongPasswordChecker("TTTTT")).toBe(2);
    expect(strongPasswordChecker("11111")).toBe(2);
    expect(strongPasswordChecker("2345")).toBe(2);
    expect(strongPasswordChecker("BB")).toBe(4);
  });

  it('checks for length greater than upper bound with incorrect unique characters and repeats', () => {
    expect(strongPasswordChecker("aaaaaaaaaaaaaaaaaaaaaaaaa")).toBe(7);
  });
});