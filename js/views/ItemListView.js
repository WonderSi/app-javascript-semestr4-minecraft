import Logger from "../utils/Logger.js";

class ItemListView {
  constructor() {
    this.logger = new Logger("ItemListView");
    this.logger.log("ItemListView инициализированный");
  }

  render(items) {
    this.container = document.getElementById("main-items-container");
    this.logger.log("render");
    this.container.innerHTML = "";
    if (this.container === 0) {
      this.container.innerHTML = `
        <div class="no-items-message">
            <p>Предметы не найдены</p>
        </div>
        `;
    }

    items.forEach((item) => {
      const itemCard = document.createElement("div");
      itemCard.className = "item-card";
      itemCard.dataset.id = item.namespacedId;
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
                <button id="item-favorite-btn"><img src="../../assets/svg/star_full.svg"></button>
            </div>
            
        `;
      this.container.appendChild(itemCard);
    });
  }
}

export default ItemListView;
