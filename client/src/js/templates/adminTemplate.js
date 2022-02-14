const { blogEmoji } = require("./emojiTemplate");
const emojiLinks = [
  "https://media3.giphy.com/media/YNDLZBTq8hGPDJkmYo/giphy.gif?cid=790b7611uzvk78j6bz8k7e747zafmwnem6howjhrau4oskyc&rid=giphy.gif&ct=g",
  "https://media4.giphy.com/media/S3nZ8V9uemShxiWX8g/giphy.gif?cid=790b761199k9mbqd8jig3lqabvjw6gcjraorrdxzbaydd5sq&rid=giphy.gif&ct=g",
  "https://media1.giphy.com/media/hp3dmEypS0FaoyzWLR/giphy.gif?cid=790b7611f64b1e50ed6ab0f626bab05a6b50b2dc5be38775&rid=giphy.gif&ct=g",
];

function adminPageTemplate() {
  return `<section
    class="flex flex-col justify-between w-2/5 max-w-2xl px-6 py-4 mx-20 m-4 bg-sky-200 dark:bg-slate-600"
  >
    <div class="bg-indigo-400 rounded-md shadow-md dark:bg-gray-800 px-20 py-6">
      <h2
        class="text-2xl font-semibold text-center text-gray-800 dark:text-white"
      >
        Register New Admin
      </h2>

      <form action="#" id="admin-register" class="mt-2">
        <div class="w-full mt-4">
          <div class="items-center -mx-2 md:flex">
            <div class="w-full mx-2">
              <label
                for="new-admin-username"
                class="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                >Username</label
              >

              <input
                id="new-admin-username"
                class="block w-full px-4 py-2 text-gray-700 bg-gray-100 border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                type="text"
                placeholder="Enter username"
                required
              />
            </div>
          </div>

          <div class="items-center -mx-2 md:flex mt-2">
            <div class="w-full mx-2">
              <label
                for="new-admin-password"
                class="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                >Password</label
              >

              <input
                id="new-admin-password"
                class="block w-full px-4 py-2 text-gray-700 bg-gray-100 border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                type="password"
                placeholder="Enter password"
                required
              />
            </div>
          </div>
        </div>

        <div class="flex justify-center mt-4">
          <input
            type="submit"
            class="px-4 py-2 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
            value="Register"
          />
        </div>
      </form>
    </div>
    <div class="bg-indigo-400 rounded-md shadow-md dark:bg-gray-800 pb-6">
    <h2
      class="text-2xl mt-4 font-semibold text-center text-gray-800 dark:text-white"
    >
      Remove Admin
    </h2>
    <form action="#" id="admin-removal" class="mt-2">
        <div class="w-full mt-4">
          <div class="items-center mx-16 md:flex">
            <div class="w-full mx-2">
              <label
                for="bad-admin-username"
                class="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                >Username</label
              >

              <input
                id="bad-admin-username"
                class="block w-full px-4 py-2 text-gray-700 bg-gray-100 border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                type="text"
                placeholder="Enter username"
                required
              />
            </div>
          </div>
        </div>

        <div id="remove-section" class="flex justify-center mt-4">
          <input
            type="submit"
            id="remove-btn"
            class="px-4 py-2 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
            value="Remove"
          />
        </div>
      </form>
    </div>
  </section>
  <section
  class="w-5/8 max-w-2xl px-6 py-4 mx-auto m-8 bg-indigo-400 rounded-md shadow-md dark:bg-gray-800"
  >
    <div
      class="main-blog max-w-2xl w-5/5 mx-auto overflow-hidden bg-white dark:bg-gray-800 sm:rounded-t"
    >
      <h2
        class="text-3xl mb-6 font-semibold text-center text-gray-800 dark:text-white"
      >
        Moderate Posts
      </h2>

      <img
        id="gif"
        class="object-cover w-full h-full"
        src="https://media4.giphy.com/media/pZ1xvJwopz6ko/giphy.webp"
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
    <div class="flex sm:-mb-10">
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
    <div id="comments" class="px-4 bg-gray-300 dark:bg-gray-700 dark:text-gray-100 sm:rounded-b">
      <h3 class="font-semibold text-xl">Comments</h3>
      <div id="comment-container"></div>
      <div class="h-16">
      </div>
    </div>
  </section>
  `;
}

module.exports = adminPageTemplate;
