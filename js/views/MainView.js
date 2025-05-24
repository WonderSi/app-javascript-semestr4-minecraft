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
                <div id="main-filter-search">
                  <input type="text" id="main-search-input" placeholder="Введите название предмета">
                  <img src="../../assets/svg/search.svg">
                </div>
                <div id="main-filter-sort">
                  <select id="sort-select">
                    <option value="name-asc">По названию (А-Я)</option>
                    <option value="name-desc">По названию (Я-А)</option>
                    <option value="stackSize-asc">По размеру стака (возр.)</option>
                    <option value="stackSize-desc">По размеру стака (убыв.)</option>
                  </select>
                  <img src="../../assets/svg/arrow_down.svg">
                </div>
                <div id="main-filter-group">
                  <label>
                    <input type="checkbox" id="main-renewable-filter-input"> <span>Возобновляемые</span>
                  </label>
                  <label>
                    <input type="checkbox" id="main-favorites-filter-input"> <span>Избранное</span>
                  </label>
                </div>
            </div>
          </div>

          <div id="main-content-area">
            <div id="main-loading-indicator">
              <p>Загрузка данных...</p>
            </div>
            <div id="main-items-container"></div>
          </div>

          <div id="main-item-detail-modal">
            <div id="main-modal-content">
              <span id="main-close-modal"><img src="../../assets/svg/close.svg"></span>
              <div id="main-item-detail-content"></div>
            </div>
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

  bindSearch(handler) {
    this.logger.log("bindSearch");
    const searchInput = document.getElementById("main-search-input");
    searchInput.addEventListener("input", () => handler(searchInput.value));
  }

  bindSort(handler) {
    this.logger.log("bindSort");
    document
      .getElementById("sort-select")
      .addEventListener("change", (event) => {
        handler(event.target.value);
      });
  }

  bindRenewableFilter(handler) {
    this.logger.log("bindRenewableFilter");
    document
      .getElementById("main-renewable-filter-input")
      .addEventListener("change", (event) => {
        handler(event.target.checked);
      });
  }

  bindFavoritesFilter(handler) {
    this.logger.log("bindFavoriteFilter");
    document
      .getElementById("main-favorites-filter-input")
      .addEventListener("change", (event) => {
        handler(event.target.checked);
      });
  }
}

export default MainView;
