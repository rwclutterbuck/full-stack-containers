(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";function e(e){this.message=e}e.prototype=new Error,e.prototype.name="InvalidCharacterError";var r="undefined"!=typeof window&&window.atob&&window.atob.bind(window)||function(r){var t=String(r).replace(/=+$/,"");if(t.length%4==1)throw new e("'atob' failed: The string to be decoded is not correctly encoded.");for(var n,o,a=0,i=0,c="";o=t.charAt(i++);~o&&(n=a%4?64*n+o:o,a++%4)?c+=String.fromCharCode(255&n>>(-2*a&6)):0)o="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(o);return c};function t(e){var t=e.replace(/-/g,"+").replace(/_/g,"/");switch(t.length%4){case 0:break;case 2:t+="==";break;case 3:t+="=";break;default:throw"Illegal base64url string!"}try{return function(e){return decodeURIComponent(r(e).replace(/(.)/g,(function(e,r){var t=r.charCodeAt(0).toString(16).toUpperCase();return t.length<2&&(t="0"+t),"%"+t})))}(t)}catch(e){return r(t)}}function n(e){this.message=e}function o(e,r){if("string"!=typeof e)throw new n("Invalid token specified");var o=!0===(r=r||{}).header?0:1;try{return JSON.parse(t(e.split(".")[o]))}catch(e){throw new n("Invalid token specified: "+e.message)}}n.prototype=new Error,n.prototype.name="InvalidTokenError";const a=o;a.default=o,a.InvalidTokenError=n,module.exports=a;


},{}],2:[function(require,module,exports){
const auth = require("./auth.js");

const adminPage = document.querySelector("#admin-section");

const publicRoutes = ["#", "#login"];
const privateRoutes = ["#adminPage"];

// window.addEventListener("hashchange", updateContent);

function updateContent() {
  const path = window.location.hash;
  if (privateRoutes.includes(path) && !auth.currentUser()) {
    window.location.hash = "#";
  } else if (!!auth.currentUser()) {
    updateAdminPage("#adminPage");
  } else {
    updateAdminPage(path);
  }
}

function updateAdminPage(path) {
  adminPage.innerHTML = "";
  if (path) {
    switch (path) {
      case "#adminPage":
        renderAdminPage();
        break;
      case "#login":
        renderLoginPage();
        break;
      default:
        window.location.href = "/index.html";
    }
  } else {
    window.location.hash = "#login";
    renderLoginPage();
  }
}

const adminTemplate = require("./templates/adminTemplate");
const loginTemplate = require("./templates/loginTemplate");

function renderAdminPage() {
  const logoutBtn = document.querySelector("#admin-btn");
  logoutBtn.innerText = "Logout";
  logoutBtn.href = "./index.html";
  logoutBtn.classList.add("logout-btn");

  const adminPage = document.querySelector("#admin-section");
  adminPage.innerHTML += adminTemplate();
}

function renderLoginPage() {
  const adminPage = document.querySelector("#admin-section");
  adminPage.innerHTML += loginTemplate();
}

module.exports = {
  updateContent,
};

},{"./auth.js":3,"./templates/adminTemplate":7,"./templates/loginTemplate":14}],3:[function(require,module,exports){
const jwt_decode = require("jwt-decode");

async function requestLogin(e) {
  e.preventDefault();

  try {
    options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: e.target["admin-username"].value,
        password: e.target["admin-password"].value,
      }),
    };

    const data = await (
      await fetch("http://localhost:3000/admin/login", options)
    ).json();
    if (!data.success) {
      throw new Error("Login not authorized");
    }
    login(data.token);
  } catch (err) {
    alert(err);
    console.warn(err);
  }
}

async function requestRegistration(e) {
  e.preventDefault();

  try {
    options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: e.target["admin-username"].value,
        password: e.target["admin-password"].value,
      }),
    };

    const data = await (
      await fetch("http://localhost:3000/admin/register", options)
    ).json();
    if (data.err) {
      throw new Error(data.err);
    }
    requestLogin(e);
  } catch (err) {
    console.warn(err);
  }
}

function login(token) {
  const admin = jwt_decode(token);
  localStorage.setItem("token", token);
  localStorage.setItem("username", admin.username);
  window.location.hash = "#adminPage";
}

// function logout() {
//   localStorage.clear();
//   location.hash = "#login";
// }

function currentUser() {
  const username = localStorage.getItem("username");
  return username;
}

module.exports = {
  requestLogin,
  requestRegistration,
  currentUser,
};

},{"jwt-decode":1}],4:[function(require,module,exports){
const helpers = require("./helpers");
const api = "http://localhost:3000"
// const api = "https://supercodersapi.herokuapp.com"

// Fetch all blogs for the homepage
function getAllBlogs() {
  fetch(`${api}/blog`)
    .then((r) => r.json())
    .then(helpers.appendBlogs)
    .catch(console.warn);
}

// Post to the server upon creation of new blog
const postBlog = async (e) => {
  e.preventDefault();
  let gifID = e.target["create-gif"].value;

  // Fetch gif according to requested id
  let result = await (
    await fetch(
      `https://api.giphy.com/v1/gifs/search?api_key=rZze5Ana60111aVYD7ZlwgzZnD5Zzu0b&limit=1&q=${gifID}`
    )
  ).json();

  const data = {
    blogtitle: helpers.profanityFilter(e.target["create-title"].value),
    blogcontent: helpers.profanityFilter(e.target["create-content"].value),
    gif: result.data["0"].images.original.webp,
  };

  const options = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  };

  // Update page after form submission
  helpers.changeSection();

  fetch(`${api}/blog`, options)
    .then((r) => r.json())
    .catch(console.warn);
};

// async function fetchGif(gifID) {
//   const gifLink = await fetch(
//     `https://api.giphy.com/v1/gifs/search?api_key=rZze5Ana60111aVYD7ZlwgzZnD5Zzu0b&limit=1&q=${gifID}`
//   )
//     .then((r) => r.json())
//     .then((promise) => {
//       return promise.data["0"].images.original.webp;
//     });
//   console.log(gifLink);
// }

// Post to the server upon creation of new comment
function newComment(e) {
  e.preventDefault();
  const comment = helpers.profanityFilter(e.target.comment.value);
  console.log(comment);
  const obj = {
    timestamp: "now",
    blogcomment: comment,
  };

  // Dynamically set ID for new comments
  const numComments = document.querySelectorAll(".blogComment").length;
  const ID = numComments + 1;
  helpers.appendComment(obj, ID);

  // Reset text area after form submission
  const textArea = document.querySelector("#comment");
  textArea.value = "";

  const data = {
    blogcomment: comment,
  };

  const options = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  };

  const blogId = window.sessionStorage.getItem("blogID");
  fetch(`${api}/blog/${blogId}`, options)
    .then((r) => r.json())
    .catch(console.warn);
}

// Retrieve specific blog for blog.html -     SEARCH!!!
function getBlog(blogId) {
  fetch(`${api}/blog/${blogId}`)
    .then((r) => r.json())
    .then(helpers.appendBlogContent)
    .catch(console.warn);
}

// Update server after reaction with an emoji
function updateEmojis(e) {
  e.preventDefault();
  const emoji = e.target.closest("btn");
  let emojiId = emoji.id.split("-")[1];
  let blogId = window.sessionStorage.getItem("blogID");

  // check if user has already clicked on an emoji replace vote
  const storedEmojiId = window.sessionStorage.getItem(`${blogId}-emoji`);

  const options = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (!storedEmojiId) {
    incrementEmoji(blogId, emojiId, options);
  } else if (storedEmojiId == emojiId) {
    decrementEmoji(blogId, emojiId, options);
    emojiId = "";
  } else {
    decrementEmoji(blogId, storedEmojiId, options);
    incrementEmoji(blogId, emojiId, options);
  }
  window.sessionStorage.setItem(`${blogId}-emoji`, emojiId);
}

function incrementEmoji(blogId, emojiId, options) {
  const thisEmoji = document.querySelector(`#card-emoji-${emojiId}`);
  thisEmoji.textContent = parseInt(thisEmoji.textContent) + 1;
  fetch(
    `${api}/blog/${blogId}/emoji/${emojiId}/plus`,
    options
  );
  helpers.highlightEmoji(emojiId);
}

function decrementEmoji(blogId, emojiId, options) {
  const thisEmoji = document.querySelector(`#card-emoji-${emojiId}`);
  thisEmoji.textContent = parseInt(thisEmoji.textContent) - 1;
  fetch(
    `${api}/blog/${blogId}/emoji/${emojiId}/minus`,
    options
  );
  helpers.highlightEmoji(emojiId);
}

// Delete a blog

/*
function deleteBlog() {
  // let blogId;

  const options = {
    method: "DELETE",
  };

  fetch(`${api}/blog/${blogId}`, options).catch(
    console.warn
  );
  
}
*/

// search blog title and retrieve it
function searchBlog(e) {
  console.log(e.target.value);
  fetch(`${api}/search?q=${e.target.value}`)
    .then((r) => r.json())
    .then((data) => {
      console.log(data);
      const id = data.refIndex;
      window.sessionStorage.setItem("blogID", `${id + 1}`);
      window.location.href = "/blog.html";
    })
    .catch((err) => {
      alert(`${e.target.value} returned no results`);
    });
}

module.exports = {
  getAllBlogs,
  postBlog,
  newComment,
  getBlog,
  searchBlog,
  updateEmojis,
  // fetchGif,
};

},{"./helpers":5}],5:[function(require,module,exports){
const cardTemplate = require("./templates/cardTemplate");
const blogTemplate = require("./templates/blogTemplate");
const commentTemplate = require("./templates/commentTemplate");

function changeSection() {
  const section = document.querySelector("#form-section");
  section.innerHTML = `
    <h1 class="text-3xl font-semibold text-center text-gray-800 dark:text-white">Thanks for your Submission!</h1>

    <form action='./index.html' class="mt-6 ">

      <div class="flex justify-center mt-6">
        <input type="submit" class="px-4 py-2 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600" value="Return Home"/>
      </div>

    </form>`;

  document.querySelector("aside").remove();
}

function linkCards() {
  const numCards = document.querySelector("#card-container");
  numCards.addEventListener("click", (numCards) => {
    const id = numCards.target.closest("a").id.split("-")[2];
    window.sessionStorage.setItem("blogID", `${id}`);
  });
}

// Add all blogs to index.html/blog.html on page load
function appendBlogs(blogs) {
  const cardContainer = document.querySelector("#card-container");
  const id = window.sessionStorage.getItem("blogID");
  // console.log(blogs);
  for (key in blogs) {
    if (key == id) {
      continue;
    }
    cardContainer.innerHTML += cardTemplate(key);
    const gif = document.getElementById(`card-gif-${key}`);
    gif.src = blogs[key].gif;

    const title = document.getElementById(`card-title-${key}`);
    title.textContent = blogs[key].blogtitle;

    const content = document.getElementById(`card-content-${key}`);
    content.textContent = blogs[key].blogcontent;

    const date = document.getElementById(`card-date-${key}`);
    const cardDate = blogs[key].timestamp.split(" ")[0];
    date.textContent = cardDate;

    const comment = document.getElementById(`comments-${key}`);
    comment.textContent = Object.keys(blogs[key].comment).length;

    for (let i of [1, 2, 3]) {
      const emoji = document.getElementById(`card-emoji-${key}-${i}`);
      emoji.textContent = blogs[key].emoji[i].emojiCount;
    }
  }
}

function appendComment(comment, key) {
  const container = document.getElementById("comment-container");
  container.innerHTML += commentTemplate(key);

  const commentTimestamp = document.getElementById(`comment-timestamp-${key}`);
  commentDate = comment.timestamp.split(" ")[0];
  commentTimestamp.textContent = commentDate;

  const blogComment = document.getElementById(`comment-content-${key}`);
  blogComment.textContent = comment.blogcomment;
}

// Deal with comment separately - append to bottom of specific blog post in blog.html
function appendComments(comments) {
  const commentContainer = document.getElementById("comment-container");
  for (key in comments) {
    appendComment(comments[key], key, commentContainer);
  }
}

// Render specific blog post in blog.html
function appendBlogContent(blog) {
  const blogContainer = document.querySelector("#blog-container");
  blogContainer.innerHTML =
    blogTemplate.blog() + blogTemplate.emojis() + blogTemplate.comments();

  const gif = document.getElementById("gif");
  gif.src = blog.gif;

  const blogDate = document.getElementById("blog-date");
  blogDate.textContent = blog.timestamp.split(" ")[0];

  const blogTitle = document.getElementById("blog-title");
  blogTitle.textContent = blog.blogtitle;

  const blogContent = document.getElementById("blog-content");
  blogContent.textContent = blog.blogcontent;

  for (let i of [1, 2, 3]) {
    const emoji = document.getElementById(`card-emoji-${i}`);
    emoji.textContent = blog.emoji[i].emojiCount;
  }

  const blogId = window.sessionStorage.getItem("blogID");
  const emojiId = window.sessionStorage.getItem(`${blogId}-emoji`);
  emojiId && highlightEmoji(emojiId);

  appendComments(blog.comment);

  const handlers = require("./handlers");

  const commentForm = document.querySelector("#create-comment");
  commentForm && commentForm.addEventListener("submit", handlers.newComment);

  const emojiClicked = document.querySelector("#emoji-container");
  emojiClicked && emojiClicked.addEventListener("click", handlers.updateEmojis);
}

function highlightEmoji(emojiId) {
  const selectEmoji = document.querySelector(`#emoji-${emojiId}`);
  const highlight = [
    "bg-cyan-600",
    "border-2",
    "dark:border-white",
    "border-gray-800",
  ];
  for (let thisClass of highlight) {
    selectEmoji.classList.toggle(thisClass);
  }
}

function toggleEmoji(emojiId) {
  const emojiCard = document.querySelector(`#emoji-${emojiId}`);
  emojiCard.addEventListener("click", () => {
    emojiCard.classList.toggle("clicked-emoji");
  });
}

// Profanity filter --- need to modify to filter for phrases e.g "warm milk"
function profanityFilter(phrase, replacer = "*", type = "inner") {
  const bannedWords = ["linux", "yoshi"];
  const replacerOpts = ["*", "x", "_", "o", "#", "?", "$", "-"];
  if (!replacerOpts.includes(replacer)) {
    throw new Error(
      `Invalid Argument: Available options for replacer are ${replacerOpts}`
    );
  }
  if (type !== "inner" && type !== "outer" && type !== "vowel") {
    throw new Error(
      "Invalid Argument: Available options for type are 'inner', 'outer', and 'vowel'"
    );
  }
  if (type == "inner") {
    return phrase
      .split(" ")
      .map((word) =>
        bannedWords.includes(word.slice(0, -1).toLowerCase()) &&
        word.match(/[\W_]$/)
          ? word
              .slice(0, -1)
              .replace(
                /(?<=^.{1})[\w]*(?=.{1}$)/g,
                replacer.repeat(word.length - 3)
              ) + punctuationMatcher(word)
          : bannedWords.includes(word.toLowerCase())
          ? word.replace(
              /(?<=^.{1})[\w]*(?=.{1}$)/g,
              replacer.repeat(word.length - 2)
            )
          : word
      )
      .join(" ");
  } else if (type == "outer") {
    return phrase
      .split(" ")
      .map((word) =>
        (bannedWords.includes(word.slice(0, -1).toLowerCase()) &&
          word.match(/[\W_]$/)) ||
        bannedWords.includes(word.toLowerCase())
          ? word.replace(/\w/g, replacer)
          : word
      )
      .join(" ");
  } else {
    return phrase
      .split(" ")
      .map((word) =>
        (bannedWords.includes(word.slice(0, -1).toLowerCase()) &&
          word.match(/[\W_]$/)) ||
        bannedWords.includes(word.toLowerCase())
          ? word.replace(/[aeiouAEIOU]/g, replacer)
          : word
      )
      .join(" ");
  }
}

function punctuationMatcher(word) {
  return word.match(/[\W_]$/)[0];
}

module.exports = {
  changeSection,
  appendBlogs,
  appendComment,
  appendComments,
  appendBlogContent,
  toggleEmoji,
  linkCards,
  highlightEmoji,
  profanityFilter,
};

},{"./handlers":4,"./templates/blogTemplate":9,"./templates/cardTemplate":10,"./templates/commentTemplate":11}],6:[function(require,module,exports){
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

},{"./adminContent":2,"./auth.js":3,"./handlers":4,"./helpers":5,"./templates/areYouSureTemplate":8,"./templates/footerTemplate":13,"./templates/navBarTemplate":15,"./templates/previewTemplate":16}],7:[function(require,module,exports){
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

},{"./emojiTemplate":12}],8:[function(require,module,exports){
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

},{}],9:[function(require,module,exports){
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

},{"./emojiTemplate":12}],10:[function(require,module,exports){
const { emojiTemplate } = require("./emojiTemplate");
const emojiLinks = [
  "https://media3.giphy.com/media/YNDLZBTq8hGPDJkmYo/giphy.gif?cid=790b7611uzvk78j6bz8k7e747zafmwnem6howjhrau4oskyc&rid=giphy.gif&ct=g",
  "https://media4.giphy.com/media/S3nZ8V9uemShxiWX8g/giphy.gif?cid=790b761199k9mbqd8jig3lqabvjw6gcjraorrdxzbaydd5sq&rid=giphy.gif&ct=g",
  "https://media1.giphy.com/media/hp3dmEypS0FaoyzWLR/giphy.gif?cid=790b7611f64b1e50ed6ab0f626bab05a6b50b2dc5be38775&rid=giphy.gif&ct=g",
];
function blogCard(id) {
  return `
    <a
      id="card-link-${id}"
      href="./blog.html"
      class="blog-card hover:text-gray-600"
    >
      <div
        id="card-${id}"
        class="card my-1 w-screen max-w-xl overflow-hidden bg-white shadow-md dark:bg-gray-700 dark:shadow-gray-700 sm:flex sm:h-auto sm:w-full sm:m-5 sm:rounded-lg sm:dark:hover:bg-gray-600 
        sm:hover:bg-gray-200 sm:hover:scale-105 hover:shadow-2xl hover:dark:shadow-gray-700 transition duration-150 ease-in-out"
      >
        <img
          id="card-gif-${id}"
          class="object-cover w-full h-auto sm:w-1/3"
          src=""
          alt="Article"
        />
        <div class="flex flex-col justify-between w-full sm:w-2/3">
          <div class="px-6 py-2 w-full">
            <div>
              <h3
                id="card-title-${id}"
                class="block text-2xl font-semibold text-gray-800 transition-colors duration-200 transform dark:text-white "
              ></h3>
              <span
                id="card-date-${id}"
                class="mx-1 text-xs text-gray-600 dark:text-gray-300"
              ></span>
              <p
                id="card-content-${id}"
                class="mt-2 text-sm text-gray-600 dark:text-gray-400 h-20 overflow-hidden"
              ></p>
            </div>
          </div>

          <div class="flex justify-between align-middle bg-gray-300 dark:bg-gray-800">
            <div class="flex justify-between  dark:border-gray-700 sm:px-3">
            <div class="flex items-center justify-center w-full m-4 px-2 py-1 text-white transition-colors duration-200 transform bg-cyan-900 rounded-full focus:outline-none sm:w-auto sm:mx-1 ">
              <svg 
                xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 m-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <span id="comments-${id}" class="m-1"></span>
            </div>
            </div>
            <div
              id="emoji-container-${id}"
              class="flex justify-between sm:px-3 overflow-hidden   dark:border-gray-700"
            >
              ${emojiTemplate(emojiLinks[0], `${id}-1`)}
              ${emojiTemplate(emojiLinks[1], `${id}-2`)}
              ${emojiTemplate(emojiLinks[2], `${id}-3`)}
            </div>
          </div>
        </div>
      </div>
    </a>
  `;
}
module.exports = blogCard;

},{"./emojiTemplate":12}],11:[function(require,module,exports){
function commentTemplate(key) {
  return `
        <div id="comment-${key}"
        class="blogComment p-2">
            <h4 
                id="comment-timestamp-${key}"
                class="dark:text-gray-400"></h4>
            <p id="comment-content-${key}"></p>
        </div>
    `;
}

module.exports = commentTemplate;

},{}],12:[function(require,module,exports){
function emojiTemplate(link, id) {
  return `
    <div
      class="flex items-center justify-center w-full m-4 px-2 py-1 text-white transition-colors duration-200 transform bg-cyan-900 rounded-full focus:outline-none sm:w-auto sm:mx-1 "
    >
      <img class="" src=${link} height="30px" width="30px" />
      <span 
        id="card-emoji-${id}"
        class="mx-1">
        0
      </span>
    </div>
  `;
}

function blogEmoji(link, id) {
  return `
  <btn
    class="emoji-cards flex items-center justify-center w-full m-4 px-2 py-1 h-10 text-white  duration-200 transform bg-cyan-900 rounded-full focus:outline-none sm:w-auto sm:mx-1 box-border  hover:bg-cyan-600 hover:scale-125 transition-all cursor-pointer"
    id="emoji-${id}"
  >
    <img class="" src=${link} height="30px" width="30px" />
    <span 
      id="card-emoji-${id}"
      class="mx-1">
      0
    </span>
  </btn>
`;
}

module.exports = { emojiTemplate, blogEmoji };

},{}],13:[function(require,module,exports){
class footerTemplate extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <footer
        class="flex justify-center px-4 text-gray-800 bg-indigo-400 dark:text-white dark:bg-gray-800"
      >
        <div class="container py-6">
          <h2 class="text-lg font-bold text-center lg:text-2xl">
            Join our mailing list to get<br />
            updated on the most recent blogs.
          </h2>

          <div class="flex justify-center mt-6">
            <div
              class="bg-gray-100 border rounded-md focus-within:ring dark:bg-gray-800 dark:border-gray-600 focus-within:border-blue-400 focus-within:ring-blue-300 focus-within:ring-opacity-40 dark:focus-within:border-blue-300"
            >
              <div class="flex flex-wrap justify-between md:flex-row">
                <input
                  id="email-box"
                  type="email"
                  class="p-2 m-1 text-sm text-gray-700 bg-transparent appearance-none focus:outline-none focus:placeholder-transparent"
                  placeholder="Enter your email"
                  aria-label="Enter your email"
                />
                <button
                  id="mailing-btn"
                  class="w-full px-3 py-2 m-1 text-sm font-medium tracking-wider text-white uppercase transition-colors duration-200 transform bg-gray-800 rounded-md dark:hover:bg-gray-600 dark:bg-gray-700 lg:w-auto hover:bg-gray-700"
                >
                  subscribe
                </button>
              </div>
            </div>
          </div>

          <hr class="h-px mt-6 border-gray-300 border-none dark:bg-gray-700" />

          <div
            class="flex flex-col items-center justify-between mt-6 md:flex-row"
          >
            <div>
              <a
                href="/"
                class="text-xl font-bold text-gray-800 dark:text-white hover:text-gray-700 dark:hover:text-gray-300"
                >Super-Blogs</a
              >
            </div>

            <div class="flex mt-4 md:m-0">
              <div class="-mx-4">
                <a
                  href="/index.html"
                  class="px-4 text-sm font-medium text-gray-800 dark:text-gray-200 hover:text-gray-700 dark:hover:text-gray-400 hover:underline"
                  >Home</a
                >
                <a
                  href="/createBlog.html"
                  class="px-4 text-sm font-medium text-gray-800 dark:text-gray-200 hover:text-gray-700 dark:hover:text-gray-400 hover:underline"
                  >Create Blog</a
                >
              
              </div>
            </div>
          </div>
        </div>
      </footer>
    `;
  }
}

customElements.define("footer-template", footerTemplate);

},{}],14:[function(require,module,exports){
function loginTemplate() {
  return `<section
      class="w-5/5 max-w-2xl px-6 py-4 mx-auto m-8 bg-indigo-400 rounded-md shadow-md dark:bg-gray-800"
    >
    <h1
      class="text-3xl font-semibold text-center text-gray-800 dark:text-white"
    >
      Admin Login
    </h1>

    <div
      class="grid grid-cols-1 gap-6 mt-6 sm:grid-cols-2 md:grid-cols-3"
    ></div>

    <form action="#" id="admin-login" class="mt-6">
      <div class="w-full mt-4">
        <div class="items-center -mx-2 md:flex">
          <div class="w-full mx-2">
            <label
              for="admin-username"
              class="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
              >Username</label
            >

            <input
              id="admin-username"
              class="block w-full px-4 py-2 text-gray-700 bg-gray-100 border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              type="text"
              placeholder="Enter username here"
              required
            />
          </div>
        </div>

        <div class="items-center -mx-2 md:flex">
          <div class="w-full mx-2">
            <label
              for="admin-password"
              class="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
              >Password</label
            >

            <input
              id="admin-password"
              class="block w-full px-4 py-2 text-gray-700 bg-gray-100 border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              type="password"
              placeholder="Enter password here"
              required
            />
          </div>
        </div>
      </div>

      <div class="flex justify-center mt-6">
        <input
          type="submit"
          class="px-4 py-2 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
          value="Login"
        />
      </div>
    </form>
    </section>
    `;
}

module.exports = loginTemplate;

},{}],15:[function(require,module,exports){
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

},{}],16:[function(require,module,exports){
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

},{}]},{},[6]);
