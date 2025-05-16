import AppController from "./controllers/AppController.js";
import WelcomeView from "./views/WelcomeView.js";
import UserModel from "./models/UserModel.js";
import MainView from "./views/MainView.js";

document.addEventListener('DOMContentLoaded', () => {
    const welcomeView = new WelcomeView();
    const userModel = new UserModel();
    const mainView = new MainView();

    const appController = new AppController (welcomeView, userModel, mainView);

    appController.init();
})