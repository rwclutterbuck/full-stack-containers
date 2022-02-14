const { profanityFilter } = require("../src/js/helpers");

describe("changing the replacer", () => {
  test("it replaces banned words with stars", () => {
    const word = "linux";
    expect(profanityFilter(word)).toBe("l***x");
  });
  test("it replaces with the specified replacer", () => {
    const word = "linux";
    expect(profanityFilter(word, (replacer = "#"))).toBe("l###x");
  });
  test("it throws an error for invalid replacer", () => {
    const word = "linux";
    const replacerOpts = ["*", "x", "_", "o", "#", "?", "$", "-"];
    expect(() => profanityFilter(word, (replacer = "%"))).toThrow(
      `Invalid Argument: Available options for replacer are ${replacerOpts}`
    );
  });
});

describe("changing the type", () => {
  test("it throws an error for invalid type", () => {
    const word = "linux";
    expect(() =>
      profanityFilter(word, (replacer = "*"), (type = "random"))
    ).toThrow(
      `Invalid Argument: Available options for type are 'inner', 'outer', and 'vowel'`
    );
  });

  describe('type="inner"', () => {
    test("it replaces internal letters in a banned sting with stars", () => {
      const word = "linux";
      expect(profanityFilter(word)).toBe("l***x");
    });

    test("it replaces internal letters in all banned words in a phrase", () => {
      const phrase = "yoshi loves linux";
      expect(profanityFilter(phrase)).toBe("y***i loves l***x");
    });

    test("it is case insensitive", () => {
      const phrase = "Yoshi loves Linux";
      expect(profanityFilter(phrase)).toBe("Y***i loves L***x");
    });

    test("it account for punctuation", () => {
      const phrase = "Yoshi, Luigi, and Mario love Linux";
      expect(profanityFilter(phrase)).toBe(
        "Y***i, Luigi, and Mario love L***x"
      );
    });
  });

  describe('type="outer"', () => {
    test("it replaces all letters in a banned sting with stars", () => {
      const word = "linux";
      expect(profanityFilter(word, (replacer = "*"), (type = "outer"))).toBe(
        "*****"
      );
    });

    test("it replaces all letters in all banned words in a phrase", () => {
      const phrase = "yoshi loves linux";
      expect(profanityFilter(phrase, (replacer = "*"), (type = "outer"))).toBe(
        "***** loves *****"
      );
    });

    test("it is case insensitive", () => {
      const phrase = "Yoshi loves Linux";
      expect(profanityFilter(phrase, (replacer = "*"), (type = "outer"))).toBe(
        "***** loves *****"
      );
    });

    test("it account for punctuation", () => {
      const phrase = "Yoshi, Luigi, and Mario love Linux";
      expect(profanityFilter(phrase, (replacer = "*"), (type = "outer"))).toBe(
        "*****, Luigi, and Mario love *****"
      );
    });
  });

  describe('type="vowel"', () => {
    test("it replaces all letters in a banned sting with stars", () => {
      const word = "linux";
      expect(profanityFilter(word, (replacer = "*"), (type = "vowel"))).toBe(
        "l*n*x"
      );
    });

    test("it replaces all letters in all banned words in a phrase", () => {
      const phrase = "yoshi loves linux";
      expect(profanityFilter(phrase, (replacer = "*"), (type = "vowel"))).toBe(
        "y*sh* loves l*n*x"
      );
    });

    test("it is case insensitive", () => {
      const phrase = "Yoshi loves Linux";
      expect(profanityFilter(phrase, (replacer = "*"), (type = "vowel"))).toBe(
        "Y*sh* loves L*n*x"
      );
    });

    test("it account for punctuation", () => {
      const phrase = "Yoshi, Luigi, and Mario love Linux";
      expect(profanityFilter(phrase, (replacer = "*"), (type = "vowel"))).toBe(
        "Y*sh*, Luigi, and Mario love L*n*x"
      );
    });
  });
});
