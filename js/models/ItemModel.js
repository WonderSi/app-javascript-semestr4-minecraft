import Logger from "../utils/Logger.js";

class ItemModel {
  constructor() {
    this.apiURL = "https://minecraft-api.vercel.app/api";
    this.items = [];

    this.logger = new Logger("ItemModel");
    this.logger.log("ItemModel инициализированный");
  }

  async fetchAllItems() {
    this.logger.log("fetchAllItems");
    const response = await fetch(`${this.apiURL}/items`);
    this.items = await response.json();
    return this.items;
  }

  filteredItems() {
    this.logger.log("filteredItems");
    return this.items;
  }
}

export default ItemModel;
