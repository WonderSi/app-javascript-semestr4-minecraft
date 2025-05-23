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

  sortItems(items, criteria) {
    this.logger.log("sortItems");
    const itemsToSort = items || this.items;

    if (criteria.includes("name")) {
      itemsToSort.sort((a, b) => {
        return criteria.includes("desc")
          ? b.name.localeCompare(a.name)
          : a.name.localeCompare(b.name);
      });
    }

    if (criteria.includes("stackSize")) {
      itemsToSort.sort((a, b) => {
        return criteria.includes("desc")
          ? b.stackSize - a.stackSize
          : a.stackSize - b.stackSize;
      });
    }

    return itemsToSort;
  }

  applyAllFilters(filterOptions) {
    this.logger.log("filterOptions");
    let filteredItems = [...this.items];

    if (filterOptions.search) {
      const searchQuery = filterOptions.search.toLowerCase();
      filteredItems = filteredItems.filter((item) =>
        item.name.toLowerCase().includes(searchQuery)
      );
    }

    if (filterOptions.sortBy) {
      filteredItems = this.sortItems(filteredItems, filterOptions.sortBy);
    }

    return filteredItems;
  }
}

export default ItemModel;
