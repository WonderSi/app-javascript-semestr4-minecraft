import Logger from "../utils/Logger.js";

class ItemDetailView {
  constructor() {
    this.modal = null;
    this.content = null;

    this.logger = new Logger("ItemDetailView");
    this.logger.log("ItemDetailView инициализированный");
  }

  show(item) {
    this.logger.log("show");

    if (!this.modal) {
      this.modal = document.getElementById("main-item-detail-modal");
    }
    if (!this.content) {
      this.content = document.getElementById("main-item-detail-content");
    }

    this.content.innerHTML = `
    <div id="item-detail">
          <div id="item-detail-header">
              <h1>${item.name}</h1>
              <p>${item.namespacedId}</p>
          </div>

          <div id="item-detail-image">
              <img src="${item.image}"> 
          </div>

        <div id="item-detail-info">
          <p id="item-description">${item.description}</p>

          <div id="item-properties">
            <div id="property">
              <p id="property-label">Размер стека</p>
              <p id="property-value">${item.stackSize}</p>
            </div>

            <div id="property">
              <p id="property-label">Возобновляемый:</p>
              <p id="property-value">${item.renewable ? "Да" : "Нет"}</p>
            </div>
          </div>
        </div>
    </div>
    `;

    this.modal.style.display = "block";
  }

  hide() {
    this.logger.log("hide");
    this.modal.style.display = "none";
  }
}

export default ItemDetailView;
