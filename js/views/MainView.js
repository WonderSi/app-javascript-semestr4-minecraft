import Logger from "../utils/Logger.js";

class MainView {
  constructor() {
    this.app = document.getElementById("app");

    this.logger = new Logger("MainView");
    this.logger.log("MainView инициализированный");
  }

  render(username) {
    this.logger.log("render");
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

        <main id="main-content">
          <div id="main-sidebar">
            <div id="main-filter-section">
              <div>
                <div id="-main-filter-search">
                  <input type="text" id="main-search-input" placeholder="Введите название предмета">
                </div>
                <div id="main-filter-sort">
                  <select id="sort-select">
                    <option value="name-asc">По имени (А-Я)</option>
                    <option value="name-desc">По имени (Я-А)</option>
                    <option value="stackSize-asc">По размеру стака (возр.)</option>
                    <option value="stackSize-desc">По размеру стака (убыв.)</option>
                  </select>
                </div>
                <div id="main-filter-group">
                  <label>
                    <input type="checkbox" id="main-renewable-filter-input"> Возобновляемые
                  </label>
                  <label>
                    <input type="checkbox" id="main-favorites-filter-input"> Избранное
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div id="main-content-area">
            <div id="main-loading-indicator">

              <p>Загрузка данных...</p>
            </div>
            <div id="main-items-container"></div>
          </div>
        </main>
    </div>
    `;
  }

  showLoading() {
    this.logger.log("showLoading");
    document.getElementById("main-loading-indicator").style.display = "block";
    document.getElementById("main-items-container").style.display = "none";
  }

  hideLoading() {
    this.logger.log("hideLoading");
    document.getElementById("main-loading-indicator").style.display = "none";
    document.getElementById("main-items-container").style.display = "block";
  }

  bindLogout(handler) {
    this.logger.log("bindLogout");
    document
      .getElementById("main-logout-btn")
      .addEventListener("click", handler);
  }
}

export default MainView;
