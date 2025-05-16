class AppController {
  constructor(welcomeView) {
    this.welcomeView = welcomeView;
  }

  init() {
    this.showWelcomeView();
  }

  showWelcomeView() {
    this.welcomeView.render();
    this.welcomeView.bindContinueBtn();
  }
}

export default AppController;
