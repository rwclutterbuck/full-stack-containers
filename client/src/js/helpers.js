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
