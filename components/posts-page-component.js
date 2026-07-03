import { escapeHtml } from "../helpers.js";
import { toggleLike } from "../api.js";
import { USER_POSTS_PAGE } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";
import { posts, goToPage, user, getToken } from "../index.js";

export function renderPostsPageComponent({ appEl, isUserPostsPage }) {
  const postsHtml = posts
    .map((post) => {
      const likeImage = post.isLiked
        ? "./assets/images/like-active.svg"
        : "./assets/images/like-not-active.svg";

      return `
        <li class="post">
          <div class="post-header" data-user-id="${post.user.id}">
            <img src="${post.user.imageUrl}" class="post-header__user-image">
            <p class="post-header__user-name">${escapeHtml(post.user.name)}</p>
          </div>
          <div class="post-image-container">
            <img class="post-image" src="${post.imageUrl}">
          </div>
          <div class="post-likes">
            <button data-post-id="${post.id}" class="like-button">
              <img src="${likeImage}">
            </button>
            <p class="post-likes-text">
              Нравится: <strong>${post.likes.length}</strong>
            </p>
          </div>
          <p class="post-text">
            <span class="user-name">${escapeHtml(post.user.name)}</span>
            ${escapeHtml(post.description)}
          </p>
          <p class="post-date">
            ${new Date(post.createdAt).toLocaleString("ru-RU")}
          </p>
        </li>`;
    })
    .join("");

  const userNameHtml = isUserPostsPage
    ? `<h2 class="user-posts-header">Посты пользователя ${escapeHtml(posts[0].user.name)}</h2>`
    : "";

  const appHtml = `
    <div class="page-container">
      <div class="header-container"></div>
      ${userNameHtml}
      <ul class="posts">
        ${postsHtml}
      </ul>
    </div>`;

  appEl.innerHTML = appHtml;

  renderHeaderComponent({
    element: document.querySelector(".header-container"),
  });

  for (let userEl of document.querySelectorAll(".post-header")) {
    userEl.addEventListener("click", () => {
      goToPage(USER_POSTS_PAGE, {
        userId: userEl.dataset.userId,
      });
    });
  }

  for (let likeButton of document.querySelectorAll(".like-button")) {
    likeButton.addEventListener("click", () => {
      if (!user) {
        return;
      }

      const postId = likeButton.dataset.postId;
      const post = posts.find((post) => post.id === postId);

      toggleLike({ postId, isLiked: post.isLiked, token: getToken() }).then(
        () => {
          post.isLiked = !post.isLiked;

          if (post.isLiked) {
            post.likes.push({ id: user._id, name: user.name });
          } else {
            post.likes = post.likes.filter((like) => like.id !== user._id);
          }

          renderPostsPageComponent({ appEl, isUserPostsPage });
        },
      );
    });
  }
}
