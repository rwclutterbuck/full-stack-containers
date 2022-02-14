class navBar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <header>
        <nav class="bg-indigo-400 shadow dark:bg-gray-800">
          <div
            class="container px-6 py-4 mx-auto lg:flex lg:justify-between lg:items-center"
          >
            <div class="lg:flex lg:items-center">
              <div class="flex items-center justify-between">
                <div>
                  <a
                    class="text-2xl font-bold text-gray-800 transition-colors duration-200 transform dark:text-white lg:text-3xl hover:text-gray-700 dark:hover:text-gray-300"
                    href="/"
                    >Super-Blogs</a
                  >
                </div>

                <!-- Mobile menu button -->
                <div class="flex lg:hidden">
                  <button
                    type="button"
                    class="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400"
                    aria-label="toggle menu"
                  >
                    <svg viewBox="0 0 24 24" class="w-6 h-6 fill-current">
                      <path
                        fill-rule="evenodd"
                        d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
              <div id="dropdown-menu" class="hidden lg:block">
                <div
                  class="flex flex-col text-gray-600 capitalize dark:text-gray-300 lg:flex lg:px-16 lg:-mx-4 lg:flex-row lg:items-center"
                >

                  <a
                    href="./index.html"
                    class="mt-2 transition-colors duration-200 transform lg:mt-0 lg:mx-4 hover:text-gray-900 dark:hover:text-gray-200"
                    >Home</a
                  >
                  <a
                    href="./createBlog.html"
                    class="mt-2 transition-colors duration-200 transform lg:mt-0 lg:mx-4 hover:text-gray-900 dark:hover:text-gray-200"
                    >Create Blog</a
                  >

                  <a
                    href="./admin.html"
                    id="admin-btn"
                    class="mt-2 transition-colors duration-200 transform lg:mt-0 lg:mx-4 hover:text-gray-900 dark:hover:text-gray-200"
                    >Admin</a
                  >

                  <div class="relative mt-4 lg:mt-0 lg:mx-4">
                    <span
                      class="absolute inset-y-0 left-0 flex items-center pl-3"
                    >
                      <svg
                        class="w-4 h-4 text-gray-600 dark:text-gray-300"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>
                      </svg>
                    </span>

                    <input
                      id="searchbar"
                      type="search"
                      class="w-full py-1 pl-10 pr-4 text-gray-700 placeholder-gray-600 bg-indigo-400 border-b border-gray-600 dark:placeholder-gray-300 dark:focus:border-gray-300 lg:w-56 lg:border-transparent dark:bg-gray-800 dark:text-gray-300 focus:outline-none focus:border-gray-600"
                      placeholder="Search"
                    />
                  </div>

                  <div
                    class="flex justify-center mt-6 lg:flex lg:mt-0 lg:-mx-2"
                  >
                    <a
                      href="https://github.com/rwclutterbuck/super-coders"
                      class="mx-2 text-gray-600 transition-colors duration-200 transform dark:text-gray-300 hover:text-gray-500 dark:hover:text-gray-300"
                      aria-label="Github client"
                    >
                      <svg
                        class="w-5 h-5 fill-current"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12.026 2C7.13295 1.99937 2.96183 5.54799 2.17842 10.3779C1.395 15.2079 4.23061 19.893 8.87302 21.439C9.37302 21.529 9.55202 21.222 9.55202 20.958C9.55202 20.721 9.54402 20.093 9.54102 19.258C6.76602 19.858 6.18002 17.92 6.18002 17.92C5.99733 17.317 5.60459 16.7993 5.07302 16.461C4.17302 15.842 5.14202 15.856 5.14202 15.856C5.78269 15.9438 6.34657 16.3235 6.66902 16.884C6.94195 17.3803 7.40177 17.747 7.94632 17.9026C8.49087 18.0583 9.07503 17.99 9.56902 17.713C9.61544 17.207 9.84055 16.7341 10.204 16.379C7.99002 16.128 5.66202 15.272 5.66202 11.449C5.64973 10.4602 6.01691 9.5043 6.68802 8.778C6.38437 7.91731 6.42013 6.97325 6.78802 6.138C6.78802 6.138 7.62502 5.869 9.53002 7.159C11.1639 6.71101 12.8882 6.71101 14.522 7.159C16.428 5.868 17.264 6.138 17.264 6.138C17.6336 6.97286 17.6694 7.91757 17.364 8.778C18.0376 9.50423 18.4045 10.4626 18.388 11.453C18.388 15.286 16.058 16.128 13.836 16.375C14.3153 16.8651 14.5612 17.5373 14.511 18.221C14.511 19.555 14.499 20.631 14.499 20.958C14.499 21.225 14.677 21.535 15.186 21.437C19.8265 19.8884 22.6591 15.203 21.874 10.3743C21.089 5.54565 16.9181 1.99888 12.026 2Z"
                        ></path>
                      </svg>
                    </a>
                    <a
                      href="https://github.com/saminakhan999/supercodersapi"
                      class="mx-2 text-gray-600 transition-colors duration-200 transform dark:text-gray-300 hover:text-gray-500 dark:hover:text-gray-300"
                      aria-label="Github server"
                    >
                      <svg
                        class="w-5 h-5 fill-current"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12.026 2C7.13295 1.99937 2.96183 5.54799 2.17842 10.3779C1.395 15.2079 4.23061 19.893 8.87302 21.439C9.37302 21.529 9.55202 21.222 9.55202 20.958C9.55202 20.721 9.54402 20.093 9.54102 19.258C6.76602 19.858 6.18002 17.92 6.18002 17.92C5.99733 17.317 5.60459 16.7993 5.07302 16.461C4.17302 15.842 5.14202 15.856 5.14202 15.856C5.78269 15.9438 6.34657 16.3235 6.66902 16.884C6.94195 17.3803 7.40177 17.747 7.94632 17.9026C8.49087 18.0583 9.07503 17.99 9.56902 17.713C9.61544 17.207 9.84055 16.7341 10.204 16.379C7.99002 16.128 5.66202 15.272 5.66202 11.449C5.64973 10.4602 6.01691 9.5043 6.68802 8.778C6.38437 7.91731 6.42013 6.97325 6.78802 6.138C6.78802 6.138 7.62502 5.869 9.53002 7.159C11.1639 6.71101 12.8882 6.71101 14.522 7.159C16.428 5.868 17.264 6.138 17.264 6.138C17.6336 6.97286 17.6694 7.91757 17.364 8.778C18.0376 9.50423 18.4045 10.4626 18.388 11.453C18.388 15.286 16.058 16.128 13.836 16.375C14.3153 16.8651 14.5612 17.5373 14.511 18.221C14.511 19.555 14.499 20.631 14.499 20.958C14.499 21.225 14.677 21.535 15.186 21.437C19.8265 19.8884 22.6591 15.203 21.874 10.3743C21.089 5.54565 16.9181 1.99888 12.026 2Z"
                        ></path>
                      </svg>
                    </a>
                    <a
                      href="https://www.figma.com/file/irC9SOqgXFVlGknEMVmSn9/super-coders?node-id=2%3A3"
                      class="mx-2 text-gray-600 transition-colors duration-200 transform dark:text-gray-300 hover:text-gray-500 dark:hover:text-gray-300"
                      aria-label="Figma"
                    >
                      <svg
                        class="w-5 h-5"
                        viewBox="0 0 28 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                      <path d="M10.1428 14C10.1428 12.9391 10.5718 11.9217 11.3353 11.1716C12.0989 10.4214 13.1344 10 14.2143 10C15.2941 10 16.3296 10.4214 17.0932 11.1716C17.8567 11.9217 18.2857 12.9391 18.2857 14C18.2857 15.0609 17.8567 16.0783 17.0932 16.8284C16.3296 17.5786 15.2941 18 14.2143 18C13.1344 18 12.0989 17.5786 11.3353 16.8284C10.5718 16.0783 10.1428 15.0609 10.1428 14V14Z" stroke="#1E1E1E" stroke-width="2"/>
                      <path d="M2 22C2 20.9391 2.42895 19.9217 3.19249 19.1716C3.95603 18.4214 4.99162 18 6.07143 18H10.1429V22C10.1429 23.0609 9.7139 24.0783 8.95036 24.8284C8.18682 25.5786 7.15124 26 6.07143 26C4.99162 26 3.95603 25.5786 3.19249 24.8284C2.42895 24.0783 2 23.0609 2 22Z" stroke="#1E1E1E" stroke-width="2"/>
                      <path d="M10.1428 2V10H14.2143C15.2941 10 16.3296 9.57857 17.0932 8.82843C17.8567 8.07828 18.2857 7.06087 18.2857 6C18.2857 4.93913 17.8567 3.92172 17.0932 3.17157C16.3296 2.42143 15.2941 2 14.2143 2L10.1428 2Z" stroke="#1E1E1E" stroke-width="2"/>
                      <path d="M2 6C2 7.06087 2.42895 8.07828 3.19249 8.82843C3.95603 9.57857 4.99162 10 6.07143 10H10.1429V2H6.07143C4.99162 2 3.95603 2.42143 3.19249 3.17157C2.42895 3.92172 2 4.93913 2 6Z" stroke="#1E1E1E" stroke-width="2"/>
                      <path d="M2 14C2 15.0609 2.42895 16.0783 3.19249 16.8284C3.95603 17.5786 4.99162 18 6.07143 18H10.1429V10H6.07143C4.99162 10 3.95603 10.4214 3.19249 11.1716C2.42895 11.9217 2 12.9391 2 14Z" stroke="#1E1E1E" stroke-width="2"/>

                      </svg>
                    </a>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </nav>
      </header>
    `;
  }
}

customElements.define("nav-bar", navBar);
