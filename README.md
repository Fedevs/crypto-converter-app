# Krypto ledgers test

## Description

This project allows you to get the exchange rate of any listed Coingecko coins vs another supported currency (Crypto or FIAT)

## Installation

**Clone it:**
    git clone https://github.com/Fedevs/krypto-ledgers-test.git

**You can test it with a front-end!**
    git clone https://github.com/Fedevs/krypto-ledgers-test-front.git

**Install dependencies:**
    npm install

**Run server:**
    npm run start

**Pssst! Check out test:**
    npm run test

## Usage

After running the server, you can make request to the following:

---

    GET /coins

No parameters needed
Response: An Array of Objects . e.g. [{id:'bitcoin', symbol:'btc', name:'bitcoin'}, {id:'ethereum', symbol:'eth', name:'ethereum'}, ...]

---

    GET /currencies

No parameters needed
Response: An Array of Strings. e.g. ['usd', 'clp', 'ars', ...]

---

    GET /convert

parameters: {ids: String, vs_currencies: String, amount: Number} - amount is optional but it is 0 by default
Response: A Number

---

## Development

- I used Coingecko API client (https://github.com/miscavage/CoinGecko-API)
- In src/app.js is the server configuration
- In src/routes.js you will find the API client requests
- Finally, there are some test in test/app.spec.js

## License

MIT
