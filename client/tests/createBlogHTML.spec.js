/**
 * @jest-environment jsdom
 */

const fs = require("fs");
const path = require("path");
const html = fs.readFileSync(
  path.resolve(__dirname, "../createBlog.html"),
  "utf8"
);

describe("index.html", () => {
  beforeEach(() => {
    document.documentElement.innerHTML = html.toString();
  });

  describe("head", () => {
    test("it has a title", () => {
      const title = document.querySelector("title");
      expect(title).toBeTruthy();
      expect(title.textContent.toLowerCase()).toContain("create");
      expect(title.textContent.toLowerCase()).toContain("blog");
    });
  });

  describe("body", () => {
    test("it has a unique h1 element", () => {
      const h1s = document.querySelectorAll("h1");
      expect(h1s.length).toBe(1);
    });

    describe("header", () => {
      describe("navbar", () => {
        test("it exists", () => {
          const nav = document.querySelector("nav-bar");
          expect(nav).toBeTruthy();
        });
      });
    });

    describe("main", () => {
      describe("form", () => {
        let form, titleInput, blogInput, submit;
        beforeEach(() => {
          form = document.querySelector("form");
        });

        test("it exists", () => {
          expect(form).toBeTruthy();
        });

        describe("title input", () => {
          beforeEach(() => {
            titleInput = form.querySelector("#create-title");
          });

          test("it exists", () => {
            expect(titleInput).toBeTruthy();
          });

          test("it has text input", () => {
            expect(titleInput.getAttribute("type")).toBe("text");
          });

          test("it has a label", () => {
            let label = form.querySelector('[for="create-title"]');
            expect(label).toBeTruthy();
          });
        });

        describe("main blog input", () => {
          beforeEach(() => {
            blogInput = form.querySelector("#create-content");
          });

          test("it exists", () => {
            expect(blogInput).toBeTruthy();
          });

          test("it is a text area", () => {
            expect(blogInput.nodeName.toLowerCase()).toBe("textarea");
          });

          test("it has a character limit of 500", () => {
            expect(blogInput.getAttribute("maxlength")).toBe("500");
          });

          test("it has a label", () => {
            let label = form.querySelector('[for="create-content"]');
            expect(label).toBeTruthy();
          });
        });

        describe("submit button", () => {
          beforeEach(() => {
            submit = form.querySelector('[type="submit"]');
          });

          test("it exists", () => {
            expect(submit).toBeTruthy();
          });

          test("it tells the user to submit", () => {
            expect(submit.getAttribute("value").toLowerCase()).toContain(
              "submit"
            );
          });
        });
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
