/**
 * @jest-environment jsdom
 */

//const { append } = require("express/lib/response");
const fs = require("fs");
const path = require("path");
const html = fs.readFileSync(path.resolve(__dirname, "../index.html"), "utf8");

global.fetch = require("jest-fetch-mock");
let api;

describe("handlers.js in index.html", () => {
  beforeEach(() => {
    document.documentElement.innerHTML = html.toString();
    api = require("../src/js/handlers.js");
  });

  afterEach(() => {
    fetch.resetMocks();
  });

  describe("getAllBlogs", () => {
    test("it should make get request to /blog", () => {
      api.getAllBlogs();
      expect(fetch.mock.calls[0][0]).toMatch(/blog$/);
    });
  });
});
