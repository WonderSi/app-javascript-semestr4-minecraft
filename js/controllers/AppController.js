import Logger from "../utils/Logger.js";

class AppController {
  constructor(
    welcomeView,
    userModel,
    mainView,
    itemModel,
    itemListView,
    itemDetailView
  ) {
    this.welcomeView = welcomeView;
    this.userModel = userModel;
    this.mainView = mainView;
    this.itemModel = itemModel;
    this.itemListView = itemListView;
    this.itemDetailView = itemDetailView;
    this.filterOptions = {
      search: "",
      sortBy: "name-asc",
      onlyRenewable: false,
      onlyFavorites: false,
    };

    this.logger = new Logger("AppController");
    this.logger.log("AppController инициализированный");
  }

  init() {
    this.logger.log("Инициализация приложения");
    this.showWelcomeView();
  }

  resetFilterOptions() {
    this.filterOptions = {
      search: "",
      sortBy: "name-asc",
      onlyRenewable: false,
      onlyFavorites: false,
    };
  }

  showWelcomeView() {
    this.logger.log("showWelcomeView");
    this.welcomeView.render();
    this.welcomeView.bindContinueBtn((username) => this.handleLogin(username));
  }

  async showMainView() {
    this.logger.log("showMainView");
    const username = this.userModel.getUsername();
    this.resetFilterOptions();
    this.mainView.render(username);

    this.mainView.bindLogout(() => this.handleLogout());
    this.mainView.bindSearch((query) => this.handleSearch(query));
    this.mainView.bindSort((sortBy) => this.handleSort(sortBy));
    this.mainView.bindRenewableFilter((checked) => this.handleRenewableFilter(checked));
    this.mainView.bindFavoritesFilter((checked) => this.handleFavoritesFilter(checked));

    this.mainView.showLoading();
    try {
      await this.itemModel.fetchAllItems();
      this.applyFilters();

      this.itemListView.bindItemClick((itemID) => this.handleItemClick(itemID));
      this.itemListView.bindFavoriteToggle((itemID, shouldAdd) => 
        this.handleFavoriteToggle(itemID, shouldAdd)
      );

      this.mainView.hideLoading();

      this.bindModalClose();
    } catch (error) {
      this.logger.error("Failed to load items", error);
      alert("Не удалось загрузить данные. Пожалуйста попробуйте позже");
    }
  }

  handleLogin(username) {
    this.logger.log("handleLogin");
    this.userModel.setUsername(username);
    this.showMainView();
  }

  handleLogout() {
    this.logger.log("handleLogout");
    this.userModel.logout();
    this.showWelcomeView();
  }

  handleSearch(query) {
    this.logger.log("handleSearch");
    this.filterOptions.search = query;
    this.applyFilters();
  }

  handleSort(sortBy) {
    this.logger.log("handleSort");
    this.filterOptions.sortBy = sortBy;
    this.applyFilters();
  }

  handleRenewableFilter(checked) {
    this.logger.log("handleRenewableFilter");
    this.filterOptions.onlyRenewable = checked;
    this.applyFilters();
  }

  handleFavoritesFilter(checked) {
    this.logger.log("handleFavoritesFilter");
    this.filterOptions.onlyFavorites = checked;
    this.applyFilters();
  }

  applyFilters() {
    this.logger.log("applyFilters");
    const filteredItems = this.itemModel.applyAllFilters(this.filterOptions);
    this.itemListView.render(filteredItems, this.itemModel.favorites);
  }

  handleItemClick(itemID) {
    this.logger.log("handleItemClick");
    const item = this.itemModel.getItemById(itemID);
    if (item) {
      this.itemDetailView.show(item);
    }
  }

  handleFavoriteToggle(itemID, shouldAdd) {
    this.logger.log("handleFavoriteToggle");
    if (shouldAdd) {
      this.itemModel.addToFavorites(itemID);
    } else {
      this.itemModel.removeFromFavorites(itemID);
    }
  }

  bindModalClose() {
    document.addEventListener("click", (e) => {
      if (e.target.id === "main-close-modal") {
        this.itemDetailView.hide();
      }
    });

    document.addEventListener("click", (e) => {
      if (e.target.id === "main-item-detail-modal") {
        this.itemDetailView.hide();
      }
    });
  }
}

export default AppController;
