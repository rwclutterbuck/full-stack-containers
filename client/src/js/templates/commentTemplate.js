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
