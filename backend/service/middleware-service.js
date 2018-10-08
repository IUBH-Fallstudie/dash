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
      tor: getTor($)
    };
  }
};

function splitWeightedOverall(str) {
  return str.split('Weighted average overall:')[1].replace('\n', '');
}

function getTor($) {
  $('thead').each((i, thead) => {
    $(thead).find('td').replaceWith((i, element) => {
      return $(`<th>${$(element).html()}</th>`);
    });
  });
  const tor = ttj.convert($.html(), {
    useFirstRowForHeadings: false,
    headings: ['ID', 'Modul', 'Status', 'Note', 'Bewertung', 'Credits', 'Prüfungsdatum', 'Kurstyp', 'Versuch', 'Kommentar']
  });
  // remove legend
  tor.pop();

  const sortedTor = [];
  for (let semester of tor) {
    let lastParentId;
    const sortedModules = [];
    for (let module of semester) {
      if (!module['ID'].includes(lastParentId) || !lastParentId) {
        lastParentId = module['ID'];
        module.courses = [];
        sortedModules.push(module);
      } else {
        sortedModules[sortedModules.length - 1].courses.push(module);
      }
    }
    sortedTor.push(sortedModules);
  }

  return sortedTor;
}
