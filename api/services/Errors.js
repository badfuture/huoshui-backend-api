class CustomError extends Error {
  constructor(input) {
    super(input.message)
    Object.assign(this, input)
  }

  toJson() {
    return {
      error: {
        code: this.code,
        type: this.type,
        message: this.message,
      }
    }
  }
}

module.exports = {
  create: (errCode) => {
    return new CustomError(errCode)
  }

}
