/**
 * @jest-environment jsdom
 */

const fs = require("fs");
const path = require("path");
const blog = require("../src/js/templates/blogTemplate.js");
const { blogEmoji } = require("../src/js/templates/emojiTemplate.js");
const html = fs.readFileSync(path.resolve(__dirname, "../blog.html"), "utf8");
const htmlCreateBlog = fs.readFileSync(
  path.resolve(__dirname, "../createBlog.html"),
  "utf8"
);

describe("handlers.js in index.html", () => {
  let helpers;
  beforeEach(() => {
    document.documentElement.innerHTML = html.toString();
    helpers = require("../src/js/helpers.js");
  });

  describe("GET helpers", () => {
    describe("appendBlogs", () => {
      test("renders a new card on the page with blog data", () => {
        let cardContainer = document.querySelector("#card-container");
        let testId = "test";
        let testBlog = {
          test: {
            blogtitle: "Test",
            blogcontent: "Testing...",
            timestamp: "29/01/2022 11:45:33",
            gif: "https://test.com",
            comment: {
              1: {
                blogcomment: "Hiiii",
                timestamp: "29/01/2022 11:48:37",
              },
              2: {
                blogcomment: "Yoooooo",
                timestamp: "29/01/2022 12:22:07",
              },
            },
            emoji: {
              1: { emojiCount: 231 },
              2: { emojiCount: 175 },
              3: { emojiCount: 98 },
            },
          },
        };
        const blogCount = cardContainer.querySelectorAll(".blog-card").length;
        helpers.appendBlogs(testBlog);
        const newBlogCount =
          cardContainer.querySelectorAll(".blog-card").length;
        expect(newBlogCount).toEqual(blogCount + 1);
        let newCard = cardContainer.querySelector(`#card-${testId}`);
        expect(newCard.textContent).toContain("Testing...");
      });
    });

    // ----------------------------- CAN'T TEST AS IT RELIES ON AN ID WITHIN A TEMPLATE -----------------------------------

    describe("appendComment", () => {
      test("it renders a new comment on the page", () => {
        // Manually import a comment container template
        const blogContainer = document.querySelector("#blog-container");
        blogContainer.innerHTML += blog();
        //
        const commentContainer = document.querySelector("#comment-container");
        let testKey = "test";
        let testComment = {
          blogcomment: "Nice test",
          timestamp: "Right now",
        };
        const commentCount =
          commentContainer.querySelectorAll(".blogComment").length;
        helpers.appendComment(testComment, testKey);
        const newComCount =
          commentContainer.querySelectorAll(".blogComment").length;
        expect(newComCount).toEqual(commentCount + 1);
        const newComment = commentContainer.querySelector(
          `#comment-${testKey}`
        );
        expect(newComment.textContent).toContain(testComment.blogcomment);
      });
    });

    describe("appendComments", () => {
      test("it returns a template containing all comments", () => {});
    });

    describe("appendBlogContent", () => {
      test("it renders a blog template in blog.html", () => {
        const blogContainer = document.querySelector("#blog-container");
        let testBlog = {
          blogtitle: "Test",
          blogcontent: "Testing...",
          timestamp: "29/01/2022 11:45:33",
          gif: "https://test.com",
          comment: {
            1: {
              blogcomment: "Hiiii",
              timestamp: "29/01/2022 11:48:37",
            },
            2: {
              blogcomment: "Yoooooo",
              timestamp: "29/01/2022 12:22:07",
            },
          },
          emoji: {
            1: { emojiCount: 231 },
            2: { emojiCount: 175 },
            3: { emojiCount: 98 },
          },
        };
        const mainBlogCount = document.querySelectorAll(".main-blog").length;
        expect(mainBlogCount).toBe(0);
        helpers.appendBlogContent(testBlog);
        const newBlogCount = document.querySelectorAll(".main-blog").length;
        expect(newBlogCount).toBe(1);
        let newBlog = blogContainer.querySelector(".main-blog");
        expect(newBlog.textContent).toContain("Testing...");
        expect(newBlog.textContent).toContain("29/01/2022");
      });
    });
  });

  describe("PATCH helpers", () => {
    describe("highlightEmoji", () => {
      test("it adds classes to the emoji", () => {
        // Manually add emoji to the page to test
        let testId = "test";
        let testLink = "";
        const main = document.querySelector("main");
        main.innerHTML += blogEmoji(testLink, testId);
        const emoji = main.querySelector(`#emoji-${testId}`);
        expect(emoji.classList).not.toContain("bg-cyan-600");
        expect(emoji.classList).not.toContain("dark:border-white");
        expect(emoji.classList).not.toContain("border-2");
        expect(emoji.classList).not.toContain("border-gray-800");
        helpers.highlightEmoji(testId);
        expect(emoji.classList).toContain("bg-cyan-600");
        expect(emoji.classList).toContain("dark:border-white");
        expect(emoji.classList).toContain("border-2");
        expect(emoji.classList).toContain("border-gray-800");
      });
    });

    // ------------------------------REQUIRES SIMULATING AN EVENT LISTENER--------------------------------------

    // describe("toggleEmoji", () => {
    //   test("", () => {});
    // });
  });

  describe("POST helpers", () => {
    describe("changeSection", () => {
      beforeEach(() => {
        document.documentElement.innerHTML = htmlCreateBlog.toString();
      });

      test("it produces a h1 tag", () => {
        helpers.changeSection();
        const section = document.querySelector("#form-section");
        const h1 = section.querySelector("h1");
        expect(h1).toBeTruthy();
        expect(h1.textContent).toContain("Thanks for your Submission");
      });

      describe("form", () => {
        test("it exists", () => {
          helpers.changeSection();
          const section = document.querySelector("#form-section");
          const form = section.querySelector("form");
          expect(form).toBeTruthy();
        });

        test("it contains a different button", () => {
          helpers.changeSection();
          const form = document.querySelector("form");
          expect(form.action).toBe("http://localhost/index.html");
          const btn = form.querySelector('[type="submit"]');
          expect(btn).toBeTruthy();
          expect(btn.value).toBe("Return Home");
        });
      });
    });
  });

  // ----------------------Requires simulating an event --------------------------------
  // describe("DOM helpers", () => {
  //   describe("linkCards", () => {
  //     test("it sets the session storage to the target value", () => {
  //       const fakeEvent = {};
  //     });
  //   });
  // });
});
