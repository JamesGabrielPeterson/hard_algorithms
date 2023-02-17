import { strongPasswordChecker, sortSequences } from "../../../1_problems/1_strong_password_checker";

describe('strongPasswordChecker', () => {
  it('handles valid password', () => {
    expect(strongPasswordChecker("1337C0d3")).toBe(0);
    expect(strongPasswordChecker("77yY7742ayoo")).toBe(0);
    expect(strongPasswordChecker("pennycheckerR1")).toBe(0);
    expect(strongPasswordChecker("9YOOyooyoo99")).toBe(0);
    expect(strongPasswordChecker("telliMERE707")).toBe(0);
  });

  it('handles valid length with repeat sequences', () => {
    expect(strongPasswordChecker("SeeeSawww10")).toBe(2);
    expect(strongPasswordChecker("aaaaaaaaaaaaaL1")).toBe(4);
    expect(strongPasswordChecker("Rayyyyyy10yyyyyyy")).toBe(4);
  });

  it('handles valid length with missing unique characters', () => {
    expect(strongPasswordChecker("SeeSaww")).toBe(1); // needs number
    expect(strongPasswordChecker("abracadabra")).toBe(2); // needs number and uppercasse
    expect(strongPasswordChecker("RAYY10YY")).toBe(1); // needs lowercase
  });

  it('handles valid length with repeat sequences and missing unique characters', () => {
    expect(strongPasswordChecker("SeeeeeSaawwwwwwwww")).toBe(4); // needs number
    expect(strongPasswordChecker("hellohowwwareeeyouuu")).toBe(3); // needs number and uppercasse
    expect(strongPasswordChecker("1111111111222333")).toBe(5); 
  });

  it('handles short passwords', () => {
    expect(strongPasswordChecker("a")).toBe(5);
    expect(strongPasswordChecker("abCde")).toBe(1);
    expect(strongPasswordChecker("1Ab")).toBe(3);
  });

  // it('handles long passwords with missing unique characters and repeat sequences', () => {
  //   expect(strongPasswordChecker("aaaaaaaaaaaaaaaaaaaaaaaaa")).toBe(11);
  //   expect(strongPasswordChecker("bbaaaaaaaaaaaaaaacccccc")).toBe(8);
  // });
});

describe('sortSequences()', () => {
  // it('returns correct sequence container', () => {
  //   // let { first, second, third } = sortSequences("aaaaaaaaaaaaaaaaaaaaaaaaa");
  //   let {first, second, third} = sortSequences("bbaaaaaaaaaaaaaaacccccc");
  //   console.log(first, second, third);
  // });

  // it('returns correct sequence container', () => {
  //   let { first, second, third } = sortSequences("aaaaaaaaaaaaaaaaaaaaaaaaabbbccc");
  //   console.log(first, second, third);
  // });

  // it('returns correct sequence container', () => {
  //   let { first, second, third } = sortSequences("aaaaaaaaaaabbbbbbbbbbbccccccccccc");
  //   console.log(first, second, third);
  // });
});