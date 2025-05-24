import Logger from "../utils/Logger.js";

class ItemListView {
  constructor() {
    this.logger = new Logger("ItemListView");
    this.logger.log("ItemListView инициализированный");
  }

  render(items, favorites) {
    this.container = document.getElementById("main-items-container");
    this.logger.log("render");
    this.container.innerHTML = "";

    if (items.length === 0) {
      this.container.innerHTML = `
            <div id="no-items-message">
                <p>Предметы не найдены</p>
                <p>Попробуйте изменить фильтры или добавить предметы в избранное</p>
            </div>
        `;
      return;
    }

    items.forEach((item) => {
      const itemCard = document.createElement("div");
      itemCard.className = "item-card";
      itemCard.dataset.id = item.namespacedId;

      const isFavorite = favorites.includes(item.namespacedId);

      itemCard.innerHTML = `
            <div id="item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div id="item-info">
                <h3>${item.name}</h3>
                <p id="item-stack-size">Стек: ${item.stackSize}</p>
                <p id="item-renewable">${
                  item.renewable ? "Возобновляемый" : "Невозобновляемый"
                }</p>
            </div>
            <div id="item-actions">
                <button id="item-detail-btn">Подробнее</button>
                <button id="item-favorite-btn" class="item-favorite-btn ${
                  isFavorite ? "favorited" : ""
                }" data-id="${item.namespacedId}"><img src="../../assets/svg/${
        isFavorite ? "star_full" : "star_empty"
      }.svg"></button>
            </div>  
        `;
      this.container.appendChild(itemCard);
    });
  }

  bindFavoriteToggle(handler) {
    this.logger.log("bindFavoriteToggle");
    this.container.addEventListener("click", (event) => {
      const favoriteBtn = event.target.closest(".item-favorite-btn");

      if (favoriteBtn) {
        const itemID = favoriteBtn.dataset.id;
        const isFavorite = favoriteBtn.classList.contains("favorited");

        this.updateFavoriteButton(favoriteBtn, !isFavorite);

        handler(itemID, !isFavorite);
      }
    });
  }

  updateFavoriteButton(button, isFavorite) {
    this.logger.log("updateFavoriteButton");
    const img = button.querySelector("img");

    if (isFavorite) {
      this.logger.log('StarFull')
      button.classList.add("favorited");
      img.src = "../../assets/svg/star_full.svg";
    } else {
      this.logger.log('StarEmpty')
      button.classList.remove("favorited");
      img.src = "../../assets/svg/star_empty.svg";
    }
  }
}

export default ItemListView;
