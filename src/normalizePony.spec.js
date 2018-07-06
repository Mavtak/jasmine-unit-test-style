// these comments are to explain the process, and would not usually be present in code

import normalizePony from './normalizePony.js';

// top-level describe block with the name of the thing being tested
describe('normalizePony', () => {

  // nested describe blocks to focus the test scenarios into meaningful chunks
  describe('when given a valid pony name', () => {

    it('returns the same value', () => {
      // to build these values, I specifically did not look at the source code or copy/paste from it.  instead, I referred to a source of truth (http://mlp.wikia.com) and transcribed the values from there.  this approach minimizes the possiblity that my feible human brain overlooks some detail.
      // for testing multiple inputs/outputs of functions, it's okay to combine multiple test cases in a single `it` block, for practicality
      expect(normalizePony('Applejack')).toBe('Applejack');
      expect(normalizePony('Fluttershy')).toBe('Fluttershy');
      expect(normalizePony('Pinkie Pie')).toBe('Pinkie Pie');
      expect(normalizePony('Rainbow Dash')).toBe('Rainbow Dash');
      expect(normalizePony('Rarity')).toBe('Rarity');
      expect(normalizePony('Twilight Sparkle')).toBe('Twilight Sparkle');
    });

  });

  describe('when given a non-value', () => {

    it('returns null', () => {
      // it's good to test these kinds of edge cases and give them defined values to
      expect(normalizePony('')).toBe(null);
      expect(normalizePony(null)).toBe(null);
      expect(normalizePony(undefined)).toBe(null);
    });

  });

  describe('when given a value with the wrong spacing', () => {

    it('returns the canonical value', () => {
      // at this point I knew that the assertions from the 1st describe block were correct, I copy/pasted and modified that one to make this one.  copying and pasting within test code is okay.
      expect(normalizePony('Apple Jack')).toBe('Applejack');
      expect(normalizePony('Flutter Shy')).toBe('Fluttershy');
      expect(normalizePony('Pinkiepie')).toBe('Pinkie Pie');
      expect(normalizePony('Rainbowdash')).toBe('Rainbow Dash');
      expect(normalizePony('Rar Ity')).toBe('Rarity');
      expect(normalizePony('Twilightsparkle')).toBe('Twilight Sparkle');
    });

  });

  describe('when given a value with the wrong casing', () => {

    it('returns the same value', () => {
      expect(normalizePony('applejack')).toBe('Applejack');
      expect(normalizePony('fluttershy')).toBe('Fluttershy');
      expect(normalizePony('pinkie pie')).toBe('Pinkie Pie');
      expect(normalizePony('rainbow dash')).toBe('Rainbow Dash');
      expect(normalizePony('rarity')).toBe('Rarity');
      expect(normalizePony('twilight sparkle')).toBe('Twilight Sparkle');

      expect(normalizePony('RARITY')).toBe('Rarity');

      // I decided not to test sUpEr WaCkY cAsInG, though if it came up in a code review I'd just add them.  when choosing test cases, you're going to have to make judgement calls about the extent that you are willing to test.
      // in considering this, though, I did decide to add an ALL CAPS test case, which seems to cover anything likely to happen.
    });

  });

  // there's an open question about if it's worth to test combinations of functionality at once.  for example, we could have another describe block focus on combinations of wrong casing and wrong spacing.  do what you want!

});
