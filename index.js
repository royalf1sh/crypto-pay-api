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

  #apiRequest(req) {
    let encodedQuery
    if (req.query) {
      encodedQuery = queryEncode(req.query)
    }
    return httpRequest({
      host: this.url,
      path: req.path,
      query: encodedQuery
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
