import Logger from "../utils/Logger.js";

class AppController {
  constructor(welcomeView, userModel, mainView) {
    this.welcomeView = welcomeView;
    this.userModel = userModel;
    this.mainView = mainView;

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
}

export default AppController;
