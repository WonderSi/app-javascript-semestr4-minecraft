import AppController from "./controllers/AppController.js";
import WelcomeView from "./views/WelcomeView.js"

document.addEventListener('DOMContentLoaded', () => {
    const welcomeView = new WelcomeView();

    const appController = new AppController (welcomeView);

    appController.init();   
})