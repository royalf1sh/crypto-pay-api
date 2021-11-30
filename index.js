const { httpRequest, queryEncode } = require('./utils.js')

module.exports = class CryptoPayApi {
  constructor(init) {
    this.url = init.url
    this.path = `/app${init.token}`
  }

  #endpoints() {
    return {
      getMe: `${this.path}/getMe`,
      createInvoice: `${this.path}/createInvoice`,
      getInvoices: `${this.path}/getInvoices`,
      getPayments: `${this.path}/getPayments`,
      confirmPayment: `${this.path}/confirmPayment`,
      getBalance: `${this.path}/getBalance`,
      getExchangeRates: `${this.path}/getExchangeRates`,
      getCurrencies: `${this.path}/getCurrencies`
    }
  }

  async #apiRequest(req) {
    let encodedQuery
    if (req.query) {
      encodedQuery = queryEncode(req.query)
    }
    return await httpRequest({
      host: this.url,
      path: req.path,
      query: encodedQuery
    })
  }

  async getMe() {
    return await this.#apiRequest({
      path: this.#endpoints().getMe
    })
  }

  async createInvoice(query) {
    if (!query) throw new Error('No invoce query params')
    return await this.#apiRequest({
      query,
      path: this.#endpoints().createInvoice
    })
  }

  async confirmPayment(query) {
    return await this.#apiRequest({
      query,
      path: this.#endpoints().confirmPayment
    })
  }

  async getInvoices(query) {
    return await this.#apiRequest({
      query,
      path: this.#endpoints().getInvoices
    })
  }

  async getPayments(query) {
    return await this.#apiRequest({
      query,
      path: this.#endpoints().getPayments
    })
  }

  async getBalance() {
    return await this.#apiRequest({
      path: this.#endpoints().getBalance
    })
  }

  async getExchangeRates() {
    return await this.#apiRequest({
      path: this.#endpoints().getExchangeRates
    })
  }

  async getCurrencies() {
    return await this.#apiRequest({
      path: this.#endpoints().getCurrencies
    })
  }
}
