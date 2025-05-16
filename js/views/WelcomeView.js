class WelcomeView {
  constructor() {
    this.app = document.getElementById("app");
  }

  render() {
    this.app.innerHTML = `
    <div class="welcome-container">
      <h1>Добро пожаловать!</h1>
      <div id="welcome-form">
        <input type="text" id="welcome-username-input" placeholder="Введите ваше имя">
        <button id="welcome-continue-btn">Далее</button>
      </div>
    </div>`;
    console.log('render')
  }

  bindContinueBtn() {
    document.getElementById('welcome-continue-btn').addEventListener('click', () => {
      const usernameInput = document.getElementById('welcome-username-input');
      const username = usernameInput.ariaValueMax.trim();

      if (username) {
        
      } else {
        alert("Введите ваше имя");
      }
    })
  }
}

export default WelcomeView;