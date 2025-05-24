import Logger from "../utils/Logger.js";

class AppController {
  constructor(welcomeView, userModel, mainView, itemModel, itemListView) {
    this.welcomeView = welcomeView;
    this.userModel = userModel;
    this.mainView = mainView;
    this.itemModel = itemModel;
    this.itemListView = itemListView;
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
    this.welcomeView.bindContinueBtn(this.handleLogin.bind(this));
  }

  async showMainView() {
    this.logger.log("showMainView");
    const username = this.userModel.getUsername();
    this.resetFilterOptions();
    this.mainView.render(username);

    this.mainView.bindLogout(this.handleLogout.bind(this));
    this.mainView.bindSearch(this.handleSearch.bind(this));
    this.mainView.bindSort(this.handleSort.bind(this));
    this.mainView.bindRenewableFilter(this.handleRenewableFilter.bind(this));
    this.mainView.bindFavoritesFilter(this.handleFavoritesFilter.bind(this));

    this.mainView.showLoading();
    try {
      await this.itemModel.fetchAllItems();
      this.applyFilters();

      this.itemListView.bindFavoriteToggle(
        this.handleFavoriteToggle.bind(this)
      );

      this.mainView.hideLoading();
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
    // button click
  }

  handleFavoriteToggle(itemID, shouldAdd) {
    this.logger.log("handleFavoriteToggle");
    if (shouldAdd) {
      this.itemModel.addToFavorites(itemID);
    } else {
      this.itemModel.removeFromFavorites(itemID);
    }
  }
}

export default AppController;
