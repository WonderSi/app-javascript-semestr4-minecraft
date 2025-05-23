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

  filterItems(query) {
    this.logger.log("filteredItems");
    if (!query) return this.items;
    query = query.toLowerCase();
    return this.items.filter(
      (item) =>
        item.name.toLowerCase().includes(query)
    );
  }
}

export default ItemModel;
