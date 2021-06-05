
const axios = require("axios");

async function getRates(value) {
  const postForm = {
    "classFrom": value,
    "classTo": "privatuah_auto",
    "amountFrom": 100,
    "activeDirection": "from"
  };

  const response = await axios.post("https://smartwm.biz/exchange/rate", postForm);
  const { error, form } = response.data;

  if (error) {
    return response.data.message ?? "Request error";
  }

  const { systemFromTitle, amountFrom, currFrom,
    systemToTitle, amountTo, currTo, 
    actualRate, rateFrom } = form;

  let inverse = amountFrom * rateFrom;
  //inverse = amountFrom / actualRate;

  const text = [
    `${systemFromTitle} - ${systemToTitle}`,
    `${amountFrom} ${currFrom} = ${amountTo} ${currTo}`,
    `${inverse} ${currFrom} = ${amountFrom} ${currTo}`
  ]

  // console.log(JSON.stringify(result));

  const result = text.join("\n");

  return result;
}

module.exports = getRates;