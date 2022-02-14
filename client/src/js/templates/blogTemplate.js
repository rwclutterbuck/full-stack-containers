const { blogEmoji } = require("./emojiTemplate");
const emojiLinks = [
  "https://media3.giphy.com/media/YNDLZBTq8hGPDJkmYo/giphy.gif?cid=790b7611uzvk78j6bz8k7e747zafmwnem6howjhrau4oskyc&rid=giphy.gif&ct=g",
  "https://media4.giphy.com/media/S3nZ8V9uemShxiWX8g/giphy.gif?cid=790b761199k9mbqd8jig3lqabvjw6gcjraorrdxzbaydd5sq&rid=giphy.gif&ct=g",
  "https://media1.giphy.com/media/hp3dmEypS0FaoyzWLR/giphy.gif?cid=790b7611f64b1e50ed6ab0f626bab05a6b50b2dc5be38775&rid=giphy.gif&ct=g",
];
function blog() {
  return `
    <div
      class="main-blog max-w-2xl w-screen mx-auto overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-t"
    >
      <img
        id="gif"
        class="object-cover w-full h-full"
        src=""
        alt="Article"
      />

      <div class="p-6">
        <div>
          <h1
            id="blog-title"
            class="block mt-2 text-2xl font-semibold text-gray-800 transition-colors duration-200 transform dark:text-white"
          ></h1>
          <span
            id="blog-date"
            class="mx-1 text-xs text-gray-600 dark:text-gray-300"
          ></span>
          <p
            id="blog-content"
            class="mt-2 text text-justify text-gray-600 dark:text-gray-400"
          ></p>
        </div>
      </div>
    </div>
    `;
}

function emojis() {
  return `<div class="flex sm:-mb-10">
      <div class="w-0 sm:w-1/2 bg-gray-300 dark:bg-gray-700"></div>
      <div
        id="emoji-container"
        class="flex justify-around sm:-mt-4 sm:px-3 w-full sm:w-1/2 overflow-hidden dark:border-gray-700 sm:rounded-bl-3xl align-middle bg-white dark:bg-gray-800"
      >
        ${blogEmoji(emojiLinks[0], `1`)}
        ${blogEmoji(emojiLinks[1], `2`)}
        ${blogEmoji(emojiLinks[2], `3`)}
      </div>
    </div>
    `;
}
function comments() {
  return `<div id="comments" class="px-4 bg-gray-300 dark:bg-gray-700 dark:text-gray-100 sm:rounded-b">
      <h3 class="pt-2 font-semibold text-xl">Comments</h3>
      <div id="comment-container"></div>
    <form id="create-comment" class="flex mt-4">
      <input
        class="py-2 w-full px-4 mb-4 text-gray-700 placeholder-gray-600 bg-gray-200 border-b border-gray-600 dark:placeholder-gray-400 dark:focus:border-gray-300 lg:border-transparent dark:bg-gray-800 dark:text-gray-300 focus:outline-none focus:border-gray-600"
        type="text"
        name=""
        id="comment"
        placeholder="write your own comment"
        maxlength="60"
        required
      />
        <div class="ml-2">
          <input
            type="submit"
            class="px-4 py-2 text-white transition-colors duration-200 transform bg-gray-800 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
            value="Submit Blog!"
          />
        </div>
      </form>
    </div>
  `;
}

module.exports = { blog, emojis, comments };
