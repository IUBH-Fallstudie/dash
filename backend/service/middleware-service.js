const request = require('request-promise');
const cheerio = require('cheerio');
const ttj = require('tabletojson');

module.exports = {
  basicStats: async (cookie) => {
    const torHtml = await request({
      url: 'https://care-fs.iubh.de/en/study/transcript-of-records.php',
      headers: {
        Connection: 'keep-alive',
        'Cookie': cookie,
      },
    });
    const $ = cheerio.load(torHtml);
    return {
      weightedOverall: splitWeightedOverall($('h4:contains("Weighted average overall:")').html()),
      tor: getTor(torHtml)
    };
  }
};

function splitWeightedOverall(str) {
  return str.split('Weighted average overall:')[1].replace('\n', '');
}

function getTor(html) {
  const tor = ttj.convert(html);
  // remove legend
  tor.pop();
  return tor;
}
