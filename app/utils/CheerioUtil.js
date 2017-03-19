import cheerio from 'cheerio-without-node-native';

export default {
  getListManga: (html) => {
    let listManga = [];
    let listTypes = [];
    let total = 0;

    $ = cheerio.load(html, {
      normalizeWhitespace: true
    });
    $('li.item').each( function(index, element) {
      let manga = {};
      manga.image = $(element).find('img').attr('src');
      manga.title = $(element).find('.title').text();
      manga.url = $(element).find('.title a').attr('href');
      manga.id =  manga.url.match(/\/(.*)\//).pop();
      listManga.push(manga);
    });

    $('ul.list-unstyled').first().find('a').each( function(index, element) {
      let url = $(element).attr('href');
      let title = $(element).text();
      listTypes.push({ url, title });
    });

    total = $('ul.pagination.list-unstyled li').last().find('a').attr('href');
    return { listManga, listTypes, total};
  },
  getDetailMangaIntroduce: (html) => {
    let listChap = [];
    $ = cheerio.load(html, {
      normalizeWhitespace: true
    });
    let introduce = $('article.introduce').text();
    return introduce;
  },
  getDetailMangaChaps: (html) => {
    let listChap = [];
    $ = cheerio.load(html, {
      normalizeWhitespace: true
    });
    $('div.row').each( function(index, element) {
      
      let chap = {};
      let a = $(element).find('a');
      chap.date = $(element).find('div.pdr10').text();
      chap.title = a.text();
      chap.url = a.attr('href');
      listChap.push(chap);
    });
    return listChap;
  },
  getFullDetailMangaIntroduce: (html) => {
    let listChap = [];
    $ = cheerio.load(html, {
      normalizeWhitespace: true
    });
    let introduce = $('section.manga-detail div.detail').text();
    $('#list-chapters > p').each( function(index, element) {
      let chap = {};
      let a = $(element).find('a');
      chap.date = $(element).find('.publishedDate').text();
      chap.title = a.text();
      chap.url = a.attr('href');
      listChap.push(chap);
    });
    return { introduce, listChap };
  },
  getReadManga: (html) => {
    let listPages = [];
    let listChaps = [];
    $ = cheerio.load(html, {
      normalizeWhitespace: true
    });

    $('div.content img').each( function(index, element) { 
      let page = $(element).attr('src');
      listPages.push(page);
    });
    $('select.form-control').first().find('option').each( function(index, element) { 
      let chap = {};
      chap.title = String($(element).text());
      chap.url = String($(element).attr('value'));
      listChaps.push(chap);
    });
    return { listPages, listChaps };
  },

  getSearchManga: (html) => {
    let listManga = [];

    $ = cheerio.load(html, {
      normalizeWhitespace: true
    });
    $('div.list a').each( function(index, element) {
      let manga = {};
      manga.image = '';
      manga.title = $(element).text();
      manga.url = $(element).attr('href');
      manga.id =  manga.url.match(/\/(.*)\//).pop();
      listManga.push(manga);
    });

    return listManga;
  },
}