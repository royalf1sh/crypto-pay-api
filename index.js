const { httpRequest, queryEncode } = require('./utils.js')

module.exports = class CryptoPayApi {
  constructor(init) {
    this.url = init.url
    this.token = init.token
  }

  #endpoints() {
    return {
      getMe: `/getMe`,
      createInvoice: `/createInvoice`,
      getInvoices: `/getInvoices`,
      getPayments: `/getPayments`,
      confirmPayment: `/confirmPayment`,
      getBalance: `/getBalance`,
      getExchangeRates: `/getExchangeRates`,
      getCurrencies: `/getCurrencies`
    }
  }

  #apiRequest(req) {
    let encodedQuery
    if (req.query) {
      encodedQuery = queryEncode(req.query)
    }
    return httpRequest({
      host: this.url,
      path: req.path,
      query: encodedQuery,
      token: this.token
    })
  }

  getMe() {
    return this.#apiRequest({
      path: this.#endpoints().getMe
    })
  }

  createInvoice(query) {
    if (!query) throw new Error('No invoce query params')
    return this.#apiRequest({
      query,
      path: this.#endpoints().createInvoice
    })
  }

  confirmPayment(query) {
    return this.#apiRequest({
      query,
      path: this.#endpoints().confirmPayment
    })
  }

  getInvoices(query) {
    return this.#apiRequest({
      query,
      path: this.#endpoints().getInvoices
    })
  }

  getPayments(query) {
    return this.#apiRequest({
      query,
      path: this.#endpoints().getPayments
    })
  }

  getBalance() {
    return this.#apiRequest({
      path: this.#endpoints().getBalance
    })
  }

  getExchangeRates() {
    return this.#apiRequest({
      path: this.#endpoints().getExchangeRates
    })
  }

  getCurrencies() {
    return this.#apiRequest({
      path: this.#endpoints().getCurrencies
    })
  }
}
