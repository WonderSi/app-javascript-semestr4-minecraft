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
      itemCard.innerHTML = `
            <div class="item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="item-info">
                <h3>${item.name}</h3>
                <p class="item-stack-size">Стек: ${item.stackSize}</p>
                <p class="item-renewable">${
                  item.renewable ? "Возобновляемый" : "Невозобновляемый"
                }</p>
            </div>
            <div class="item-actions">

            </div>
        `;
      this.container.appendChild(itemCard);
    });
  }
}

export default ItemListView;
