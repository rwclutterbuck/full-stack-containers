const helpers = require("./helpers");

// Fetch all blogs for the homepage
function getAllBlogs() {
  fetch("https://supercodersapi.herokuapp.com/blog")
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

  fetch("https://supercodersapi.herokuapp.com/blog", options)
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
  fetch(`https://supercodersapi.herokuapp.com/blog/${blogId}`, options)
    .then((r) => r.json())
    .catch(console.warn);
}

// Retrieve specific blog for blog.html -     SEARCH!!!
function getBlog(blogId) {
  fetch(`https://supercodersapi.herokuapp.com/blog/${blogId}`)
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
    `https://supercodersapi.herokuapp.com/blog/${blogId}/emoji/${emojiId}/plus`,
    options
  );
  helpers.highlightEmoji(emojiId);
}

function decrementEmoji(blogId, emojiId, options) {
  const thisEmoji = document.querySelector(`#card-emoji-${emojiId}`);
  thisEmoji.textContent = parseInt(thisEmoji.textContent) - 1;
  fetch(
    `https://supercodersapi.herokuapp.com/blog/${blogId}/emoji/${emojiId}/minus`,
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

  fetch(`https://supercodersapi.herokuapp.com/blog/${blogId}`, options).catch(
    console.warn
  );
  
}
*/

// search blog title and retrieve it
function searchBlog(e) {
  console.log(e.target.value);
  fetch(`https://supercodersapi.herokuapp.com/search?q=${e.target.value}`)
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
