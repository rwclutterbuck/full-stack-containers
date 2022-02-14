function aYSTemplate() {
  return `
  <div class="w-3/5 flex flex-row justify-between">
    <p class="text-md py-2 font-semibold text-center text-gray-800 dark:text-white">Are you sure?</p>
    <input
      type="submit"
      id="yes-btn"
      class="box-border px-4 py-1 text-white transition-colors duration-200 transform bg-emerald-900 border-2 border-gray-700 rounded-md hover:bg-emerald-700 focus:outline-none focus:bg-emerald-800"
      value="Yes"
    />
    <input
      type="submit"
      id="no-btn"
      class="box-border px-4 py-1 text-white transition-colors duration-200 transform bg-amber-900 border-2 border-gray-600 rounded-md hover:bg-amber-700 focus:outline-none focus:bg-amber-700"
      value="No"
    />
  </div>
  `;
}

module.exports = aYSTemplate;
