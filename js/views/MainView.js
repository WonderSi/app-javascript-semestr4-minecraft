import Logger from "../utils/Logger.js";

class MainView {
  constructor() {
    this.app = document.getElementById("app");

    this.logger = new Logger('MainView')
    this.logger.log("MainView инициализированный")
  }

  render(username) {
    this.logger.log('render')
    this.app.innerHTML = `
    <div id="main-container">
        <header id="main-header">
            <div id="main-header-content">
                <h1>Minecraft - ItemVault</h1>
                <p id="main-user-greeting">Привет, ${username}</p>
            </div>
            <dev id="main-header-controls">
                <button id="main-logout-btn">ВЫЙТИ</button>
            </dev>
        </header>
    </div>
    `;
  }

  bindLogout(handler) {
    this.logger.log('bindLogout')
    document.getElementById('main-logout-btn').addEventListener('click', handler)
  }
}

export default MainView;
