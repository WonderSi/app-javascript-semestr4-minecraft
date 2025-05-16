class UserModel {
  constructor() {
    this.username = localStorage.getItem("username") || "";
  }

  setUsername(name) {
    this.username = name;
    localStorage.setItem('username', name);
  }

  getUsername() {
    return this.username;
  }


}

export default UserModel;
