import AppController from './controllers/AppController.js';

import ItemModel from "./models/ItemModel.js";
import UserModel from './models/UserModel.js';

import MainView from "./views/MainView.js";
import WelcomeView from "./views/WelcomeView.js";
import ItemListView from "./views/ItemListView.js";
import ItemDetailView from "./views/ItemDetailView.js";

import Logger from "./utils/Logger.js";

document.addEventListener("DOMContentLoaded", () => {
  const logger = new Logger("App");
  logger.log("Старт приложения");

  const welcomeView = new WelcomeView();
  const userModel = new UserModel();
  const mainView = new MainView();
  const itemModel = new ItemModel();
  const itemListView = new ItemListView();
  const itemDetailView = new ItemDetailView();

  const appController = new AppController(
    welcomeView,
    userModel,
    mainView,
    itemModel,
    itemListView,
    itemDetailView
  );

  logger.log("Инициализация контроллера приложения");
  appController.init();
});
