class CustomError extends Error {
  constructor(input) {
    super(input.message)
    Object.assign(this, input)
  }

  get toJson() {
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
  err: CustomError
}
