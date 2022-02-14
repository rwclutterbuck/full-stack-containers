function preview() {
  return `
    <div
      id="preview"
      class="main-blog max-w-2xl px-6 py-8 overflow-hidden bg-white rounded-md shadow-md dark:bg-gray-800 sm:rounded-t"
    >
      <img
        id="preview-gif"
        class="object-cover w-full h-full"
        src="https://media2.giphy.com/media/YBkTzzyNewWtUANTso/giphy.webp?cid=112e516bl0oqn9ji0z6vz2w6tzy1gds48ls1b19ybv5v0xlz&rid=giphy.webp&ct=g"
        alt="Article"
      />

      <div class="p-6">
        <div>
          <h1
            id="preview-title"
            class="block mt-2 text-2xl font-semibold text-gray-800 transition-colors duration-200 transform dark:text-white"
          ></h1>
          <span
            id="preview-date"
            class="mx-1 text-xs text-gray-600 dark:text-gray-300"
          >In progress...</span>
          <p
            id="preview-content"
            class="mt-2 text text-justify text-gray-600 dark:text-gray-400"
          ></p>
        </div>
      </div>
    </div>
  `;
}

module.exports = preview;
