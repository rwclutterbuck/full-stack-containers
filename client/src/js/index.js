// Templates
require("./templates/navBarTemplate");
require("./templates/footerTemplate");
const handlers = require("./handlers");
const { linkCards } = require("./helpers");
const previewTemplate = require("./templates/previewTemplate");
const auth = require("./auth.js");
const adminContent = require("./adminContent");

const hamburger = document.querySelector('[aria-label="toggle menu"]');
const menu = document.querySelector("#dropdown-menu");

// Add functionality to navbar
hamburger.addEventListener("click", (e) => {
  e.preventDefault();
  menu.classList.toggle("hidden");
});

let searchbar = document.getElementById("searchbar");

// unashamedly stolen from Waylon's Google-API
searchbar.addEventListener("keypress", (e) => {
  if (e.key === "Enter" && e.target.value) {
    handlers.searchBlog(e);
  }
});

// Identify the page in the browser
const location = window.location.pathname;

// let blogId;
// if (location === "/blog.html") {
//   let blog = window.localStorage.getItem("blogId");
//   blogId = window.localStorage.getItem(`blogId-${blog}`);
// }
// Call fcts depending on the browser page
switch (location) {
  // not a great fix for page not initially loading

  case "/":
  case "/index.html":
    blogID = window.sessionStorage.getItem("blogID");
    // Don't overwrite oldID on page refresh
    if (blogID) {
      window.sessionStorage.setItem("oldBlogID", blogID);
      window.sessionStorage.setItem("blogID", "");
    }
    handlers.getAllBlogs();
    linkCards();
    break;

  case "/createblog":
  case "/createBlog.html":
    // Submit form and update page without refresh
    const form = document.querySelector("#create-blog");
    form && form.addEventListener("submit", handlers.postBlog);
    // Create blog preview
    // const blogPreview = document.querySelector("#blog-preview");
    // blogPreview && (blogPreview.innerHTML = blogCard());
    // Getting the create blog preview to work
    const previewContainer = document.querySelector("#preview-container");
    previewContainer.innerHTML += previewTemplate();

    const title = document.querySelector("#create-title");
    const blog = document.querySelector("#create-content");
    // const gif = document.querySelector("#create-gif");

    const allowedChars =
      "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM!\"£$%^&*()_-+={}[]:;@'~#,.?/|\\ ".split(
        ""
      );

    title.addEventListener("keydown", (e) => {
      const previewTitle = document.querySelector("#preview-title");
      if (e.key === "Backspace") {
        previewTitle.textContent = previewTitle.textContent.slice(0, -1);
      } else if (allowedChars.includes(e.key)) {
        previewTitle.textContent += e.key;
      }
    });
    blog.addEventListener("keydown", (e) => {
      const previewContent = document.querySelector("#preview-content");
      if (e.key === "Backspace") {
        previewContent.textContent = previewContent.textContent.slice(0, -1);
      } else if (allowedChars.includes(e.key)) {
        previewContent.textContent += e.key;
      }
    });
    break;

  case "/blog.html":
    let id = 1;
    // preserve blog id across pages
    if (window.sessionStorage.getItem("blogID")) {
      id = window.sessionStorage.getItem("blogID");
    } else {
      id = window.sessionStorage.getItem("oldBlogID");
      window.sessionStorage.setItem("blogID", id);
    }
    handlers.getAllBlogs(id);
    handlers.getBlog(id);
    linkCards();
    break;

  case "/admin.html":
  case "/admin.html#login":
  case "/admin.html#adminPage":
    if (!auth.currentUser()) {
      window.location.hash = "#login";
    }
    if (!!auth.currentUser()) {
      window.location.hash = "#adminPage";
    }

    // --------------Testing----------------------
    const path = window.location.hash;
    console.log(!!auth.currentUser());
    console.log(auth.currentUser());
    console.log(path);

    if (window.location.hash == "#login") {
      const adminLogin = document.querySelector("#admin-login");
      adminLogin.addEventListener("submit", auth.requestLogin);
    }

    if (window.location.hash === "#adminPage" && !!auth.currentUser()) {
      adminContent.updateContent();
    }
    window.addEventListener("hashchange", adminContent.updateContent);

    // Admin logout
    const logoutBtn = document.querySelector(".logout-btn");
    logoutBtn &&
      logoutBtn.addEventListener("click", () => {
        localStorage.clear();
      });

    // Remove admin
    const removalForm = document.querySelector("#admin-removal");
    removalForm &&
      removalForm.addEventListener("submit", (e) => {
        e.preventDefault();
        areYouSure();

        const yesBtn = document.querySelector("#yes-btn");
        yesBtn &&
          yesBtn.addEventListener("click", (e) => {
            e.preventDefault();
            // Delete user
          });

        const noBtn = document.querySelector("#no-btn");
        noBtn &&
          noBtn.addEventListener("click", (e) => {
            e.preventDefault();
            const removeBox = document.querySelector("#bad-admin-username");
            removeBox.value = "";
            const removeSect = document.querySelector("#remove-section");
            removeSect.innerHTML = "";
            removeSect.innerHTML += `<input
          type="submit"
          id="remove-btn"
          class="px-4 py-2 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
          value="Remove"
        />`;
          });
      });

    const aYSTemplate = require("./templates/areYouSureTemplate");
    function areYouSure() {
      const removeSect = document.querySelector("#remove-section");
      removeSect.innerHTML = "";
      removeSect.innerHTML += aYSTemplate();
    }

    break;
}

// gif.addEventListener("keydown", (e) => {
//   if (e.key === "ArrowRight") {
//     const previewGif = document.querySelector("#preview-gif");
//     const gifId = previewGif.value;
//     const link = handlers.fetchGif(gifId);
//     previewGif.src = link;
//   }
// });
