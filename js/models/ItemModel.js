import Logger from "../utils/Logger.js";

class ItemModel {
  constructor() {
    this.apiURL = "https://minecraft-api.vercel.app/api";
    this.items = [];
    this.favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    this.logger = new Logger("ItemModel");
    this.logger.log("ItemModel инициализированный");
  }

  async fetchAllItems() {
    this.logger.log("fetchAllItems");
    const response = await fetch(`${this.apiURL}/items`);
    this.items = await response.json();
    return this.items;
  }

  getItemById(id) {
    this.logger.log('getItemById');
    const temp = this.items.find(item => item.namespacedId === id);
    console.log(temp)
    return temp;
  }

  addToFavorites(itemID) {
    if (!this.favorites.includes(itemID)) {
      this.logger.log("addToFavorites");
      this.favorites.push(itemID);
      this.saveFavorites();
    }
  }

  removeFromFavorites(itemID) {
    if (this.favorites.includes(itemID)) {
      this.logger.log("removeFromFavorites");
      this.favorites = this.favorites.filter((id) => id !== itemID);
      this.saveFavorites();
    }
  }

  saveFavorites() {
    this.logger.log("saveFavorites");
    localStorage.setItem("favorites", JSON.stringify(this.favorites));
    console.log(localStorage);
  }

  isFavorites(itemID) {
    return this.favorites.includes(itemID);
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

    if (filterOptions.onlyRenewable) {
      filteredItems = filteredItems.filter((item) => item.renewable);
    }

    if (filterOptions.onlyFavorites) {
      filteredItems = filteredItems.filter((item) => {
        return this.isFavorites(item.namespacedId);
      });
    }

    if (filterOptions.sortBy) {
      filteredItems = this.sortItems(filteredItems, filterOptions.sortBy);
    }

    return filteredItems;
  }
}

export default ItemModel;
