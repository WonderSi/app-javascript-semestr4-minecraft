class AppController {
  constructor(welcomeView, userModel, mainView) {
    this.welcomeView = welcomeView;
    this.userModel = userModel;
    this.mainView = mainView;
  }

  init() {
    this.showWelcomeView();
  }

  showWelcomeView() {
    this.welcomeView.render();
    this.welcomeView.bindContinueBtn(this.handleLogin.bind(this));
  }

  async showMainView() {
    const username = this.userModel.getUsername();
    this.mainView.render(username);
    this.mainView.bindLogout(this.handleLogout.bind(this))
  }

  handleLogin(username) {
    this.userModel.setUsername(username);
    this.showMainView();
    console.log("handleLogin");
  }

  handleLogout() {
    this.userModel.logout();
    this.showWelcomeView();
  }
}

export default AppController;
