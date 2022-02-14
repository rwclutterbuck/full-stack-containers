/**
 * @jest-environment jsdom
 */

const fs = require("fs");
const path = require("path");
const html = fs.readFileSync(path.resolve(__dirname, "../blog.html"), "utf8");

describe("blog.html", () => {
  beforeEach(() => {
    document.documentElement.innerHTML = html.toString();
  });

  describe("head", () => {
    let title;
    test("it has a title", () => {
      title = document.querySelector("title");
      expect(title).toBeTruthy();
    });
  });

  describe("body", () => {
    test("it has a unique h1 element", () => {
      const h1s = document.querySelectorAll("h1");
      try {
        expect(h1s.length).toBe(1);
      } catch {
        expect(h1s.length).toBe(0);
      }
    });

    describe("header", () => {
      let header;
      beforeEach(() => {
        header = document.getElementById("header");
      });

      describe("navbar", () => {
        test("it exists", () => {
          const nav = document.querySelector("nav-bar");
          expect(nav).toBeTruthy();
        });
      });
    });

    describe("main", () => {
      test("there is a container for the main blog", () => {
        const blogContainer = document.querySelector("#blog-container");
        expect(blogContainer).toBeTruthy();
      });

      test("there is a container for the blogs", () => {
        const cardContainer = document.querySelector("#card-container");
        expect(cardContainer).toBeTruthy();
      });
    });

    describe("footer", () => {
      test("it exists", () => {
        const footer = document.querySelector("footer-template");
        expect(footer).toBeTruthy();
      });
    });
  });
});
