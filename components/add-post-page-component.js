import { renderHeaderComponent } from "./header-component.js";
import { renderUploadImageComponent } from "./upload-image-component.js";

export function renderAddPostPageComponent({ appEl, onAddPostClick }) {
  let imageUrl = "";

  const render = () => {
    const appHtml = `
      <div class="page-container">
        <div class="header-container"></div>
        <div class="form">
          <h3 class="form-title">Добавить пост</h3>
          <div class="upload-image-container"></div>
          <textarea
            id="description-input"
            class="input textarea"
            rows="4"
            placeholder="Описание..."
          ></textarea>
          <button class="button" id="add-button">Добавить</button>
        </div>
      </div>
    `;

    appEl.innerHTML = appHtml;

    renderHeaderComponent({
      element: document.querySelector(".header-container"),
    });

    renderUploadImageComponent({
      element: document.querySelector(".upload-image-container"),
      onImageUrlChange(newImageUrl) {
        imageUrl = newImageUrl;
      },
    });

    document.getElementById("add-button").addEventListener("click", () => {
      const description = document.getElementById("description-input").value;

      if (!description.trim()) {
        alert("Введите описание к посту");
        return;
      }

      if (!imageUrl) {
        alert("Загрузите фотографию");
        return;
      }

      onAddPostClick({
        description,
        imageUrl,
      });
    });
  };

  render();
}
