import AppController from "./controllers/AppController.js";
import WelcomeView from "./views/WelcomeView.js";
import UserModel from "./models/UserModel.js";
import MainView from "./views/MainView.js";
import Logger from "./utils/Logger.js";

document.addEventListener("DOMContentLoaded", () => {
  const logger = new Logger("App");
  logger.log("Старт приложения");

  const welcomeView = new WelcomeView();
  const userModel = new UserModel();
  const mainView = new MainView();

  const appController = new AppController(welcomeView, userModel, mainView);

  logger.log("Инициализация контроллера приложения");
  appController.init();
});
