class MainView {
  constructor() {
    this.app = document.getElementById("app");
  }

  render(username) {
    this.app.innerHTML=`
    <div id="main-container">
        <header id="main-header-content">
            <h1>Minecraft</h1>
            <p id="main-user-greeting">Привет, ${username}</p>
        </header>
    </div>
    `
    console.log('renderMain')
  }
}

export default MainView;
