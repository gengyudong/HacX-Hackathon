const axios = require('axios');
const cheerio = require('cheerio');
const { bodyTagExtractor } = require('./azure')

const scrapeBody = async (url) => {
  try {

    const response = await axios.get(url);

    const $ = cheerio.load(response.data);

    // const bodyElements = $('body').children();
    // bodyText.each((index, element) => {
    //   console.log($.html(element)); 
    // });

    const bodyText = $('body').text();
    const result = await bodyTagExtractor(bodyText);

    console.log(result);
    return result;

  } catch (error) {
    console.error('Error occurred:', error.message);
  }
};

module.exports = scrapeBody;