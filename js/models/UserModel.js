import Logger from "../utils/Logger.js";

class UserModel {
  constructor() {
    this.username = localStorage.getItem("username") || "";

    this.logger = new Logger("UserModel");
    this.logger.log("UserModel инициализированный");
  }

  setUsername(name) {
    this.logger.log("setUserame");
    this.username = name;
    localStorage.setItem("username", name);
  }

  getUsername() {
    this.logger.log("getUsername");
    return this.username;
  }

  logout() {
    this.logger.log("logout");
    this.username = "";
    localStorage.removeItem("username");
  }
}

export default UserModel;
