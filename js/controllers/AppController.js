import Logger from "../utils/Logger.js";

class AppController {
  constructor(welcomeView, userModel, mainView, itemModel, itemListView) {
    this.welcomeView = welcomeView;
    this.userModel = userModel;
    this.mainView = mainView;
    this.itemModel = itemModel;
    this.itemListView = itemListView;

    this.logger = new Logger("AppController");
    this.logger.log("AppController инициализированный");
  }

  init() {
    this.logger.log("Инициализация приложения");
    this.showWelcomeView();
  }

  showWelcomeView() {
    this.logger.log("showWelcomeView");
    this.welcomeView.render();
    this.welcomeView.bindContinueBtn(this.handleLogin.bind(this));
  }

  async showMainView() {
    this.logger.log("showMainView");
    const username = this.userModel.getUsername();
    this.mainView.render(username);
    this.mainView.bindLogout(this.handleLogout.bind(this));
    this.mainView.showLoading();
    try {
      await this.itemModel.fetchAllItems();
      this.applyFilters();
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

  applyFilters() {
    this.logger.log("applyFilters");
    let filteredItems = this.itemModel.filteredItems();
    this.itemListView.render(filteredItems);
  }
}

export default AppController;
