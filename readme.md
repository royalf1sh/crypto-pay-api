# Crypto Pay API

### The most lightweight package without dependencies

Crypto Pay is a payment system based on <a target="_blank" href="http://t.me/CryptoBot">@CryptoBot</a>, which allows you to accept payments in cryptocurrency using the API.

---

#### Installation

First, you need to create your application and get an API token. Open <a target="_blank" href="http://t.me/CryptoBot">@CryptoBot</a> or <a target="_blank" href="http://t.me/CryptoTestnetBot">@CryptoTestnetBot</a> (for testnet), send a command `/pay` to create a new app and get API Token. Than install npm

```
npm i @royalf1sh/crypto-pay-api
```

---

## Usage

```javascript
const CryptoPayApi = require('@royalf1sh/crypto-pay-api')

const myCryptoApp = new CryptoPayApi({
  url: 'testnet-pay.crypt.bot',
  token: <YOUR-TOKEN>
})
```

<a target="_blank" href="http://t.me/CryptoTestnetBot">Testnet</a> url: `testnet-pay.crypt.bot`
<a target="_blank" href="http://t.me/CryptoBot">Mainnet</a> url (disabled now): `pay.crypt.bot`

---

## Methods

> The response is promise wich contains an object, which always has a Boolean field `ok`. If `ok` equals `true`, the request was successful, and the result of the query can be found in the `result` field. In case of an unsuccessful request, `ok` equals `false`, and the error is explained in the `error` field (e.g. PARAM_SHORT_NAME_REQUIRED).

[getMe](#getMe)
[createInvoice](#createinvoice)
[getInvoices](#getinvoices)
[getPayments](#getpayments)
[confirmPayment](#confirmpayment)
[getBalance](#getbalance)
[getExchangeRates](#getexchangeRates)
[getCurrencies](#getcurrencies)

### getMe

A simple method for testing your app's authentication token. Requires no parameters. Returns basic information about the app.

#### Example

```js
const me = await myCryptoPay.getMe()
console.log(me)
```

<details>
  <summary>success</summary>
  
```js
{
  ok: true,
  result: {
    app_id: xxxx,
    name: 'Name of App',
    payment_processing_bot_username: 'CryptoTestnetBot'
  }
}
```
  
</details>
<details>
  <summary>error</summary>
  
```js
{ ok: false, error: { code: 401, name: 'UNAUTHORIZED' } }
```
  
</details>

---

### createInvoice

Use this method to create a new invoice. Returns object of created invoice.
Requires object with invoice options as argument.

- **asset (String)** - Currency code. Supported assets: BTC, TON, ETH (only testnet), USDT, USDC, BUSD
- **amount (Float)**
  Amount of the invoice in float. For example: `125.50`
- **description (String)** _Optional_ - Description of the invoice. Up to 1024 symbols
- **paid_btn_name (String)** _Optional_ - Paid button name. This button will be shown when your invoice was paid. Default is `callback` if you use only `paid_btn_url`
  Supported names:
  - `viewItem` - View Item
  - `openChannel` - Open Channel
  - `openBot` - Open Bot
  - `callback` - Return
- **paid_btn_url (String)** _Optional but requried when you use_ `paid_btn_name` - Paid button URL. You can set any payment success link (for example link on your bot). Start with https or http
- **payload (String, up to 4kb)** _Optional_ - Some data. User ID, payment id, or any data you want to attach to the invoice
- **allow_comments (Boolean)** _Optional_ - Allow adding comments when paying an invoice. Default is `true`
- **allow_anonymous (Boolean)** _Optional_ - Allow pay invoice as anonymous. Default is `true`

#### Example

```js
const invoice = await myCryptoPay.createInvoice({
  asset: 'TON',
  amount: 0.05,
  description: 'Lorem ipsum dolor',
  paid_btn_name: 'viewItem',
  paid_btn_url: 'https://ton.org',
  payload: JSON.stringify(someData),
  allow_comments: true,
  allow_anonymous: true
})
console.log(invoice)
```

<details>
  <summary>success</summary>
  
```js
{
  ok: true,
  result: {
    invoice_id: 1422,
    status: 'active',
    hash: 'IVuWdeBit4d5',
    asset: 'TON',
    amount: '0.05',
    pay_url: 'https://t.me/CryptoTestnetBot?start=IVuWdeBit4d5',
    description: 'Lorem ipsum dolor',
    created_at: '2021-11-29T21:10:43.516Z',
    allow_comments: true,
    allow_anonymous: true,
    payload: '{"some":"text"}',
    paid_btn_name: 'viewItem',
    paid_btn_url: 'https://ton.org',
    is_confirmed: false
  }
}
```

</details>
<details>
  <summary>error</summary>
  
```js
{
  ok: false,
  error: {
    code: 400,
    name: 'ASSET_INVALID',
    supported_assets: [
      'BTC',  'ETH',
      'TON',  'BNB',
      'BUSD', 'USDC',
      'USDT'
    ]
  }
}
```
  
</details>

---

### getInvoices

Use this method to get invoices of your app. On success, the returns array of invoices. Optional object with options as argument

- **asset (String)** _Optional_ - Currency code separated by comma. Supported assets: BTC, TON, ETH (only testnet), USDT, USDC, BUSD. Default: all assets.
- **invoice_ids (String)** _Optional_ - Invoice IDs separated by comma.
- **status (String)** _Optional_ - Status of invoices. Available statusses: `active` or `paid`. Default: all statusses.
- **offset (Integer)** _Optional_ - Offset needed to return a specific subset of invoices. Default `0`.
- **count (Integer)** _Optional_ - Number of invoices to return. Default `100`, max `1000`.

#### Example

```js
const invoices = await myCryptoPay.getInvoices({
  status: 'paid'
})
console.log(invoices)
```

<details>
  <summary>success</summary>
  
```js
{ 
  ok: true,
  result: { count: 1, 
  items: [ 
    {
      invoice_id: 1407,
      status: 'paid',
      hash: 'IVZZ22QMSmdS',
      asset: 'TON',
      amount: '0.05',
      pay_url: 'https://t.me/CryptoTestnetBot?start=IVZZ22QMSmdS',
      description: 'Duis felis ligula, tincidunt vel bibendum vitae',
      created_at: '2021-11-29T18:30:15.527Z',
      paid_at: '2021-11-29T18:32:36.017Z',
      allow_comments: true,
      allow_anonymous: true,
      paid_anonymously: true,
      comment: 'User comment',
      is_confirmed: true,
      confirmed_at: '2021-11-29T18:34:04.019Z'
    }
  ]
 }
}
```

</details>
<details>
  <summary>error</summary>
  
```js
{
  ok: false,
  error: {
    code: 400,
    name: 'STATUS_INVALID',
    allowed_statuses: [ 'active', 'paid' ]
  }
}
```
</details>

---

### getPayments

Use this method to get paid and unconfirmed invoices of your app. On success, the returns array of paid and unconfirmed invoices. Optional object with options as argument

- **offset (Number)** _Optional_ - Offset needed to return a specific subset of invoices. Default `0`.
- **count (Number)** _Optional_ - Number of invoices to return. Default `100`, max `1000`.

#### Example

```js
const payments = await myCryptoPay.getPayments()
console.log(payments)
```

<details>
  <summary>success</summary>
  
```js
{ 
  ok: true,
  result: { count: 1, 
  items: [ 
   {
     invoice_id: 1419,
     status: 'paid',
     hash: 'IVlAyKPZDMoR',
     asset: 'TON',
     amount: '0.05',
     pay_url: 'https://t.me/CryptoTestnetBot?start=IVlAyKPZDMoR',
     description: 'Duis felis ligula, tincidunt vel bibendum vitae',
     created_at: '2021-11-29T20:54:13.507Z',
     paid_at: '2021-11-29T21:57:17.816Z',
     allow_comments: true,
     allow_anonymous: true,
     paid_anonymously: false,
     payload: 'Lorem ipsum dolor ',
     paid_btn_name: 'viewItem',
     paid_btn_url: 'https://ton.org',
     is_confirmed: false
    }
   ] 
 } 
}
```

</details>

---

### confirmPayment

Use this method to confirm paid invoice of your app. On success, the return confirmed invoice. Required object with Invoice ID as argument

- **invoice_id (Integer)** _Required_ - Invoice ID you want to confirm.

#### Example

```js
const confirmPayment = await myCryptoPay.confirmPayment({
  invoice_id: 1234
})
console.log(confirmPayment)
```

<details>
  <summary>success</summary>
  
```js
{
  ok: true,
  result: {
    invoice_id: 1419,
    status: 'paid',
    hash: 'IVlAyKPZDMoR',
    asset: 'TON',
    amount: '0.05',
    pay_url: 'https://t.me/CryptoTestnetBot?start=IVlAyKPZDMoR',
    description: 'Duis felis ligula, tincidunt vel bibendum vitae',
    created_at: '2021-11-29T20:54:13.507Z',
    paid_at: '2021-11-29T21:57:17.816Z',
    allow_comments: true,
    allow_anonymous: true,
    payload: 'Lorem ipsum dolor ',
    paid_btn_name: 'viewItem',
    paid_btn_url: 'https://ton.org',
    is_confirmed: true,
    confirmed_at: '2021-11-29T22:07:03.251Z'
  }
}
```

</details>
<details>
  <summary>error</summary>
  
```js
{ ok: false, error: { code: 400, name: 'INVOICE_NOT_FOUND' } }
```
</details>

---

### getBalance

Use this method to get balance of your app. Returns array of assets

#### Example

```js
const balance = await myCryptoPay.getBalance()
console.log(balance)
```

<details>
  <summary>success</summary>
  
```js
{
  ok: true,
  result: [
    { currency_code: 'BTC', available: '0' },
    { currency_code: 'ETH', available: '0' },
    { currency_code: 'TON', available: '100' },
    { currency_code: 'BNB', available: '0' },
    { currency_code: 'BUSD', available: '0' },
    { currency_code: 'USDC', available: '0' },
    { currency_code: 'USDT', available: '0' }
  ]
}
```

</details>

---

### getExchangeRates

Use this method to get exchange rates of supported currencies. Returns array of currencies

#### Example

```js
const exchangeRates = await myCryptoPay.getExchangeRates()
console.log(exchangeRates)
```

<details>
  <summary>success</summary>
  
```js
{
  ok: true,
  result: [
    {
      is_valid: true,
      source: 'BTC',
      target: 'RUB',
      rate: '4352500.00000000'
    },
    { 
      is_valid: true, 
      source: 'BTC', 
      target: 'USD', 
      rate: '58208.74' 
    },
    {
      is_valid: true,
      source: 'BTC',
      target: 'EUR',
      rate: '51608.27634518'
    },
    {
      is_valid: true,
      source: 'BTC',
      target: 'BYN',
      rate: '148607.32068118'
    },
    {
      is_valid: true,
      source: 'BTC',
      target: 'UAH',
      rate: '1584025.65210026'
    },
    {
      is_valid: true,
      source: 'BTC',
      target: 'KZT',
      rate: '25483546.66840868'
    },
    {
      is_valid: true,
      source: 'ETH',
      target: 'RUB',
      rate: '332729.10000000'
    },
    { 
      is_valid: true, 
      source: 'ETH', 
      target: 'USD', 
      rate: '4444.8' 
    },
    {
      is_valid: true,
      source: 'ETH',
      target: 'EUR',
      rate: '3940.7907936'
    },
    {
      is_valid: true,
      source: 'ETH',
      target: 'BYN',
      rate: '11347.6055136'
    },
    {
      is_valid: true,
      source: 'ETH',
      target: 'UAH',
      rate: '120955.6712352'
    },
    {
      is_valid: true,
      source: 'ETH',
      target: 'KZT',
      rate: '1945915.1363136'
    },
    {
      is_valid: true,
      source: 'TON',
      target: 'RUB',
      rate: '223.07911600'
    },
    {
      is_valid: true,
      source: 'TON',
      target: 'USD',
      rate: '2.99000000'
    },
    {
      is_valid: true,
      source: 'TON',
      target: 'EUR',
      rate: '2.65095493'
    },
    {
      is_valid: true,
      source: 'TON',
      target: 'BYN',
      rate: '7.63349093'
    },
    {
      is_valid: true,
      source: 'TON',
      target: 'UAH',
      rate: '81.36641851'
    },
    {
      is_valid: true,
      source: 'TON',
      target: 'KZT',
      rate: '1309.00968718'
    },
    {
      is_valid: true,
      source: 'BNB',
      target: 'RUB',
      rate: '46613.00000000'
    },
    { 
      is_valid: true, 
      source: 'BNB', 
      target: 'USD', 
      rate: '622.7' 
    },
    {
      is_valid: true,
      source: 'BNB',
      target: 'EUR',
      rate: '552.0901789'
    },
    {
      is_valid: true,
      source: 'BNB',
      target: 'BYN',
      rate: '1589.7574589'
    },
    {
      is_valid: true,
      source: 'BNB',
      target: 'UAH',
      rate: '16945.4410723'
    },
    {
      is_valid: true,
      source: 'BNB',
      target: 'KZT',
      rate: '272615.4957214'
    },
    {
      is_valid: true,
      source: 'BUSD',
      target: 'RUB',
      rate: '74.72000000'
    },
    {
      is_valid: true,
      source: 'BUSD',
      target: 'USD',
      rate: '1.00000000'
    },
    {
      is_valid: true,
      source: 'BUSD',
      target: 'EUR',
      rate: '0.88660700'
    },
    {
      is_valid: true,
      source: 'BUSD',
      target: 'BYN',
      rate: '2.55300700'
    },
    {
      is_valid: true,
      source: 'BUSD',
      target: 'UAH',
      rate: '27.21284900'
    },
    {
      is_valid: true,
      source: 'BUSD',
      target: 'KZT',
      rate: '437.79588200'
    },
    {
      is_valid: true,
      source: 'USDC',
      target: 'RUB',
      rate: '74.60840000'
    },
    {
      is_valid: true,
      source: 'USDC',
      target: 'USD',
      rate: '1.00000000'
    },
    {
      is_valid: true,
      source: 'USDC',
      target: 'EUR',
      rate: '0.88660700'
    },
    {
      is_valid: true,
      source: 'USDC',
      target: 'BYN',
      rate: '2.55300700'
    },
    {
      is_valid: true,
      source: 'USDC',
      target: 'UAH',
      rate: '27.21284900'
    },
    {
      is_valid: true,
      source: 'USDC',
      target: 'KZT',
      rate: '437.79588200'
    },
    {
      is_valid: true,
      source: 'USDT',
      target: 'RUB',
      rate: '74.73000000'
    },
    {
      is_valid: true,
      source: 'USDT',
      target: 'USD',
      rate: '1.00000000'
    },
    {
      is_valid: true,
      source: 'USDT',
      target: 'EUR',
      rate: '0.88660700'
    },
    {
      is_valid: true,
      source: 'USDT',
      target: 'BYN',
      rate: '2.55300700'
    },
    {
      is_valid: true,
      source: 'USDT',
      target: 'UAH',
      rate: '27.21284900'
    },
    {
      is_valid: true,
      source: 'USDT',
      target: 'KZT',
      rate: '437.79588200'
    }
  ]
}
```
</details>

---

### getCurrencies

Use this method to get supported currencies. Returns array of currencies

#### Example

```js
const currencies = await myCryptoPay.getCurrencies()
console.log(currencies)
```

<details>
  <summary>success</summary>
  
```js
{
  ok: true,
  result: [
    {
      is_blockchain: true,
      is_stablecoin: false,
      is_fiat: false,
      name: 'Bitcoin',
      code: 'BTC',
      url: 'https://bitcoin.org/',
      decimals: 8
    },
    {
      is_blockchain: true,
      is_stablecoin: false,
      is_fiat: false,
      name: 'Ethereum',
      code: 'ETH',
      url: 'https://ethereum.org/',
      decimals: 18
    },
    {
      is_blockchain: true,
      is_stablecoin: false,
      is_fiat: false,
      name: 'Toncoin',
      code: 'TON',
      url: 'https://ton.org/',
      decimals: 9
    },
    {
      is_blockchain: true,
      is_stablecoin: false,
      is_fiat: false,
      name: 'Binance Coin',
      code: 'BNB',
      url: 'https://binance.org/',
      decimals: 18
    },
    {
      is_blockchain: false,
      is_stablecoin: true,
      is_fiat: false,
      name: 'Binance USD',
      code: 'BUSD',
      url: 'https://www.binance.com/en/busd',
      decimals: 18
    },
    {
      is_blockchain: false,
      is_stablecoin: true,
      is_fiat: false,
      name: 'USD Coin',
      code: 'USDC',
      url: 'https://www.centre.io/usdc',
      decimals: 18
    },
    {
      is_blockchain: false,
      is_stablecoin: true,
      is_fiat: false,
      name: 'Tether',
      code: 'USDT',
      url: 'https://tether.to/',
      decimals: 18
    },
    {
      is_blockchain: false,
      is_stablecoin: false,
      is_fiat: true,
      name: 'Russian ruble',
      code: 'RUB',
      decimals: 8
    },
    {
      is_blockchain: false,
      is_stablecoin: false,
      is_fiat: true,
      name: 'United States dollar',
      code: 'USD',
      decimals: 8
    },
    {
      is_blockchain: false,
      is_stablecoin: false,
      is_fiat: true,
      name: 'Euro',
      code: 'EUR',
      decimals: 8
    },
    {
      is_blockchain: false,
      is_stablecoin: false,
      is_fiat: true,
      name: 'Belarusian ruble',
      code: 'BYN',
      decimals: 8
    },
    {
      is_blockchain: false,
      is_stablecoin: false,
      is_fiat: true,
      name: 'Ukrainian hryvnia',
      code: 'UAH',
      decimals: 8
    },
    {
      is_blockchain: false,
      is_stablecoin: false,
      is_fiat: true,
      name: 'Pound sterling',
      code: 'GBP',
      decimals: 8
    },
    {
      is_blockchain: false,
      is_stablecoin: false,
      is_fiat: true,
      name: 'Renminbi',
      code: 'CNY',
      decimals: 8
    },
    {
      is_blockchain: false,
      is_stablecoin: false,
      is_fiat: true,
      name: 'Kazakhstani tenge',
      code: 'KZT',
      decimals: 8
    }
  ]
}
```

</details>
