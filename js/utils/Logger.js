class Logger {
  constructor(moduleName) {
    this.moduleName = moduleName;
  }

  log(message) {
    console.log(
      `[${new Date().toISOString()}] [${this.moduleName}] [INFO] ${message}`
    );
  }

  error(message, error) {
    console.error(
      `[${new Date().toISOString()}] [${this.moduleName}] [ERROR] ${message}`,
      error
    );
  }

  warn(message) {
    console.warn(
      `[${new Date().toISOString()}] [${this.moduleName}] [WARN] ${message}`
    );
  }
}

export default Logger