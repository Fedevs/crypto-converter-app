const { Router } = require("express");
const router = Router();
const CoinGecko = require("coingecko-api");
const CoinGeckoClient = new CoinGecko();

router.get("/coins", async (req, res) => {
  try {
    let { success, data } = await CoinGeckoClient.coins.all();
    if (success) return res.status(200).json({ response: data });
  } catch (error) {
    return res.status(500).json({ error: "Something's wrong, try again" });
  }
});

router.get("/currencies", async (req, res) => {
  try {
    let { success, data } =
      await CoinGeckoClient.simple.supportedVsCurrencies();
    if (success) return res.status(200).json({ response: data });
  } catch (error) {
    return res.status(500).json({ error: "Something's wrong, try again" });
  }
});

router.get("/convert", async (req, res) => {
  const baseCurrency = req.query.ids;
  const quoteCurrency = req.query.vs_currencies;
  const amount = req.query.amount || 0;
  try {
    if (baseCurrency && quoteCurrency) {
      let { success, data } = await CoinGeckoClient.simple.price({
        ids: baseCurrency,
        vs_currencies: quoteCurrency,
      });
      if (success)
        return res
          .status(200)
          .json({ result: data[baseCurrency][quoteCurrency] * amount });
    } else {
      throw Error;
    }
  } catch (error) {
    return res.status(404).json({ error: "Mandatory parameter is missing" });
  }
});

module.exports = router;
