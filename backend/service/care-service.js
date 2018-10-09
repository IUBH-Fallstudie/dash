const request = require('request-promise');
const cheerio = require('cheerio');
const ttj = require('tabletojson');

module.exports = {
  basicStats: async (cookie) => {
    const torHtml = await request({
      url: 'https://care-fs.iubh.de/de/studium/notenuebersicht.php',
      headers: {
        Connection: 'keep-alive',
        'Cookie': cookie,
      },
    });
    const $ = cheerio.load(torHtml);
    return {
      weightedOverall: splitWeightedOverall($('h4:contains("Gewichteter Durchschnitt Gesamt:")').html()),
      tor: getTor($)
    };
  }
};

function splitWeightedOverall(str) {
  return str.split('Gewichteter Durchschnitt Gesamt:')[1].replace('\n', '');
}

function getTor($) {
  // fix invalid html of IUBH page
  $('thead').each((i, thead) => {
    $(thead).find('td').replaceWith((i, element) => {
      return $(`<th>${$(element).html()}</th>`);
    });
  });
  const tor = ttj.convert($.html(), {
    useFirstRowForHeadings: false,
    headings: ['id', 'name', 'status', 'grade', 'rating', 'credits', 'date', 'type', 'try', 'comment']
  });
  // remove legend
  tor.pop();

  const sortedTor = [];
  for (let semester of tor) {
    let lastParentId = '';
    const sortedModules = [];
    for (let module of semester) {
      if (!module.id.split('-')[0].includes(lastParentId.split('-')[0]) || !lastParentId) {
        lastParentId = module.id;
        // remove redundant information
        module.name = module.name.replace(' (ME)', '');
        module.name = module.name.replace(' (MP)', '');
        module.courses = [];
        sortedModules.push(module);
      } else {
        sortedModules[sortedModules.length - 1].courses.push(module);
      }
    }
    sortedTor.push(sortedModules);
  }

  $('.panel-heading').each((i, element) => {
    sortedTor[i] = {
      modules: sortedTor[i],
      name: $(element).text().split(' (')[0],
    };
  });

  return sortedTor;
}
