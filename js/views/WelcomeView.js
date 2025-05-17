import Logger from "../utils/Logger.js";

class WelcomeView {
  constructor() {
    this.app = document.getElementById("app");

    this.logger = new Logger("WelcomeView");
    this.logger.log("WelcomeView инициализированный");
  }

  render() {
    this.logger.log("render");
    this.app.innerHTML = `
    <div id="welcome">
      <div class="welcome-container">
        <h1>Добро пожаловать!</h1>
        <hr/>
        <div id="welcome-form">
          <input type="text" id="welcome-username-input" placeholder="Введите ваше имя">
          <button id="welcome-continue-btn">ДАЛЕЕ</button>
        </div>
      </div>
    </div>`;
  }

  bindContinueBtn(handler) {
    this.logger.log("bindContinueBtn");
    document
      .getElementById("welcome-continue-btn")
      .addEventListener("click", () => {
        const usernameInput = document.getElementById("welcome-username-input");
        const username = usernameInput.value.trim();

        if (username) {
          this.logger.log('Успешная проверка')
          handler(username);
        } else {
          this.logger.warn('Пустое имя')
          alert("Введите ваше имя");
        }
      });
  }
}

export default WelcomeView;
