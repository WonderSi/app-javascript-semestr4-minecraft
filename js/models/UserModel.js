class UserModel {
  constructor() {
    this.username = localStorage.getItem("username") || "";
  }

  setUsername(name) {
    this.username = name;
    localStorage.setItem("username", name);
  }

  getUsername() {
    return this.username;
  }

  logout() {
    this.username = "";
    localStorage.removeItem("username");
  }
}

export default UserModel;
