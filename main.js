document.addEventListener('DOMContentLoaded', () => {
  const postsContainer = document.getElementById('posts-container');

  // Function to create and add a new post
  const createPost = (postText, postAuthor) => {
      const postId = `post-${Date.now()}`; // Generate unique post ID
      const postDiv = document.createElement('div');
      postDiv.classList.add('post', 'mt-3');
      postDiv.id = postId;

      
      postDiv.innerHTML = `
          <a href="#" class="remove-post text-danger">remove</a> 
          <a href="#" class="toggle-comments text-primary">comments</a>
          <p class="post-text">${postText}</p>
          <p><strong>Posted By:</strong> ${postAuthor}</p>

          <!-- Comments Section -->
          <div class="comments-section mt-3" style="display: none;">
              <ul class="list-group comments-list"></ul>
              <input type="text" class="form-control mt-2 comment-text" placeholder="Comment Text">
              <input type="text" class="form-control mt-2 comment-author" placeholder="Your Name">
              <button class="btn btn-primary mt-2 submit-comment">Submit Comment</button>
          </div>
      `;

      // Add toggle event for comments visibility
      postDiv.querySelector('.toggle-comments').addEventListener('click', (e) => {
          e.preventDefault();
          const commentsSection = postDiv.querySelector('.comments-section');
          commentsSection.style.display = commentsSection.style.display === 'none' ? 'block' : 'none';
      });

      // Add post removal functionality
      postDiv.querySelector('.remove-post').addEventListener('click', (e) => {
          e.preventDefault();
          postDiv.remove();
      });

      // Add comment submission functionality
      postDiv.querySelector('.submit-comment').addEventListener('click', () => {
          const commentText = postDiv.querySelector('.comment-text').value.trim();
          const commentAuthor = postDiv.querySelector('.comment-author').value.trim();
          const commentsList = postDiv.querySelector('.comments-list');

          if (commentText && commentAuthor) {
              const commentItem = document.createElement('li');
              commentItem.classList.add('list-group-item');
              commentItem.innerHTML = `${commentText} - Posted By: ${commentAuthor} <span class="comment-delete text-danger" style="cursor: pointer;">x</span>`;

              // Add comment delete functionality
              commentItem.querySelector('.comment-delete').addEventListener('click', () => {
                  commentItem.remove();
              });

              commentsList.appendChild(commentItem);

              // Clear input fields after submitting
              postDiv.querySelector('.comment-text').value = '';
              postDiv.querySelector('.comment-author').value = '';
          }
      });

      // Add the post to the container
      postsContainer.appendChild(postDiv);
  };

  // Event listener for creating a new post
  document.getElementById('submit-post').addEventListener('click', () => {
      const postText = document.getElementById('post-text').value.trim();
      const postAuthor = document.getElementById('post-author').value.trim();

      if (postText && postAuthor) {
          createPost(postText, postAuthor);

          // Clear input fields after posting
          document.getElementById('post-text').value = '';
          document.getElementById('post-author').value = '';
      }
  });
});