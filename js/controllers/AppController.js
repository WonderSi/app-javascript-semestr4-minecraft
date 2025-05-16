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
  }

  handleLogin(username) {
    this.userModel.setUsername(username);
    this.showMainView();
    console.log("handleLogin");
  }
}

export default AppController;
