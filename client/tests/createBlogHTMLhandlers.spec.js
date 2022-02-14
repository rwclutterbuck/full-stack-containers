/*

/**
 * @jest-environment jsdom
 */

const fs = require("fs");
const path = require("path");
const html = fs.readFileSync(
  path.resolve(__dirname, "../createBlog.html"),
  "utf8"
);

let helpers = require("../src/js/helpers.js");
let api = require("../src/js/handlers.js");

global.fetch = require("jest-fetch-mock");

jest.mock("../src/js/handlers.js");
jest.mock("../src/js/helpers.js");

describe("handlers.js in createBlog.html", () => {
  beforeEach(() => {
    document.documentElement.innerHTML = html.toString();
  });

  afterEach(() => {
    fetch.resetMocks();
  });

  // Target should be the id where you input the values

  // describe("postBlog", () => {
  //   test("it sends POST to /blog with data", () => {
  //     const fakeEvent = {
  //       preventDefault: jest.fn(),
  //       target: {
  //         title: { value: "Example Blog" },
  //         blog: { value: "Example Blog" },
  //       },
  //     };
  //     console.log(fetch.mock.calls);
  //     api.postBlog(fakeEvent);
  //     expect(helpers.changeSection).toHaveBeenCalled();
  //     expect(fetch.mock.calls[0][1]).toHaveProperty("method", "POST");
  //     expect(fetch.mock.calls[0][1]).toHaveProperty(
  //       "body",
  //       JSON.stringify({
  //         blogtitle: { value: "Example Blog" },
  //         blogcontent: { value: "Example Blog" },
  //       })
  //     );

  //     test(`it makes a fetch call to the given blogs api url`, () => {
  //       let blogId = 1;
  //       api.getBlog(blogId);
  //       expect(fetch).toHaveBeenCalledWith(
  //         `https://supercodersapi.herokuapp.com/blog/1`
  //       );
  //     });
  //   });

  //   test("it calls changeSection upon successful request", async () => {
  //     fetch.mockResponse(
  //       JSON.stringify({
  //         blogtitle: { value: "Example Blog" },
  //         blogcontent: { value: "Example Blog" },
  //         gif: { value: "http://example.com" },
  //       })
  //     );
  //     await api.postBlog();
  //     expect(helpers.changeSection).toHaveBeenCalledWith({
  //       blogtitle: { value: "Example Blog" },
  //       blogcontent: { value: "Example Blog" },
  //       gif: { value: "http://example.com" },
  //     });
  //   });
  // });
});
