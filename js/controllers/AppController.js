import Logger from "../utils/Logger.js";

class AppController {
  constructor(welcomeView, userModel, mainView) {
    this.welcomeView = welcomeView;
    this.userModel = userModel;
    this.mainView = mainView;

    this.logger = new Logger('AppController');
    this.logger.log('AppController инициализированный')
  }

  init() {
    this.showWelcomeView();
    this.logger.log('Инициализация приложения')
  }

  showWelcomeView() {
    this.welcomeView.render();
    this.welcomeView.bindContinueBtn(this.handleLogin.bind(this));
    this.logger.log('showWelcomeView')
  }

  async showMainView() {
    const username = this.userModel.getUsername();
    this.mainView.render(username);
    this.mainView.bindLogout(this.handleLogout.bind(this))
    this.logger.log('showMainView')
  }

  handleLogin(username) {
    this.userModel.setUsername(username);
    this.showMainView();
    this.logger.log('handleLogin')
  }

  handleLogout() {
    this.userModel.logout();
    this.showWelcomeView();
    this.logger.log('handleLogout')
  }
}

export default AppController;
