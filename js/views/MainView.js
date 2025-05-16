class MainView {
  constructor() {
    this.app = document.getElementById("app");
  }

  render(username) {
    this.app.innerHTML = `
    <div id="main-container">
        <header id="main-header">
            <div id="main-header-content">
                <h1>Minecraft | ItemVault</h1>
                <p id="main-user-greeting">Привет, ${username}</p>
            </div>
            <dev id="main-header-controls">
                <button id="main-logout-btn">Выйти</button>
            </dev>
        </header>
    </div>
    `;
    console.log("renderMain");
  }

  bindLogout(handler) {
    document.getElementById('main-logout-btn').addEventListener('click', handler)
  }
}

export default MainView;
