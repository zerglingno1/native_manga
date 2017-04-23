import cheerio from 'cheerio-without-node-native';

export default {
  getListManga: (html, type) => {
    let listManga = [];
    let listTypes = [];
    let total = 0;

    $ = cheerio.load(html, {
      normalizeWhitespace: true
    });
    switch (type) {
      case 'http://m.blogtruyen.com':
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
        break;
      case 'http://hamtruyen.vn':
        $('div.item_truyennendoc').each( function(index, element) {
          let manga = {};
          manga.image = $(element).find('img').attr('src');
          manga.title = $(element).find('h5.tentruyen_slide').text();
          manga.url = $(element).find('a').first().attr('href');
          manga.id =  manga.url.match(/-(.*).html/).pop();
          listManga.push(manga);
        });

        $('div#list_kw').find('a').each( function(index, element) {
          let url = $(element).attr('href');
          let title = $(element).text();
          listTypes.push({ url, title });
        });

        total = $('.pagination').find('a').length;
      break;
    }
    
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
  getDetailManga: (html) => {
    let listChap = [];
    $ = cheerio.load(html, {
      normalizeWhitespace: true
    });
    let introduce = $('div.wrapper_info').text();

    $('div.nano section.row_chap').each( function(index, element) {
      
      let chap = {};
      let a = $(element).find('a');
      chap.date = $(element).find('div.ngaydang').text();
      chap.title = a.text();
      chap.url = a.attr('href');
      listChap.push(chap);
    });
    
    return { introduce, listChap };
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
  getReadManga: (html, type) => {
    let listPages = [];
    let listChaps = [];
    $ = cheerio.load(html, {
      normalizeWhitespace: true
    });
    let count = 1;
    switch (type) {
      case 'http://m.blogtruyen.com':
        $('div.content img').each( function(index, element) { 
          let page = $(element).attr('src');
          listPages.push({page: count, image: page});
          count++;
        });
        $('select.form-control').first().find('option').each( function(index, element) { 
          let chap = {};
          chap.title = String($(element).text());
          chap.url = String($(element).attr('value'));
          listChaps.push(chap);
        });
        break;
      case 'http://hamtruyen.vn':
        $('div#content_chap img').each( function(index, element) { 
          let page = $(element).attr('src');
          listPages.push({page: count, image: page});
          count++;
        });
        $('select#ddl_listchap_bottom').first().find('option').each( function(index, element) { 
          let chap = {};
          chap.title = String($(element).text());
          chap.url = '/doc-truyen/' + String($(element).attr('value')) + '.html';
          listChaps.push(chap);
        });
      break;
    }
    return { listPages, listChaps };
  },

  getSearchManga: (html, host) => {
    let listManga = [];

    $ = cheerio.load(html, {
      normalizeWhitespace: true
    });

    switch(host) {
      case 'http://m.blogtruyen.com':
        $('div.list a').each( function(index, element) {
          let manga = {};
          manga.title = $(element).text();
          manga.url = $(element).attr('href');
          manga.id =  manga.url.match(/\/(.*)\//).pop();
          listManga.push(manga);
        });
      break;
      case 'http://hamtruyen.vn':
        $('div.item_truyennendoc').each( function(index, element) {
          let manga = {};
          manga.image = $(element).find('img').attr('src');
          manga.title = $(element).find('h5.tentruyen_slide').text();
          manga.url = $(element).find('a').first().attr('href');
          manga.id =  manga.url.match(/-(.*).html/).pop();
          listManga.push(manga);
        });
      break;
    }

    return listManga;
  },
  getAnimes: (html) => {
    let listAnimes = [];
    let total;
    $ = cheerio.load(html, {
      normalizeWhitespace: true
    });
    $('ul#movie-last-movie li').each( function(index, element) {
      let anime = {};
      anime.title = $(element).find('.movie-title-1').text();
      anime.image = $(element).find('.public-film-item-thumb').attr('style').replace(`background-image:url('`, '').replace(`')`, '');
      anime.url = $(element).find('a').attr('href');
      listAnimes.push(anime);
    });
    total = $('ul.pagination.pagination-lg li').last().find('a').attr('href');
    total = total.substring(total.indexOf('page='), total.length).replace('page=', '');
    return { listAnimes, total };
  },
  getStartButton: (html) => {
     $ = cheerio.load(html, {
      normalizeWhitespace: true
    });
    let button = $('a#btn-film-watch').attr('href');
    return button;
  },
  getVideoUrl: (html) => {
     $ = cheerio.load(html, {
      normalizeWhitespace: true
    });
    let url = $('video').attr('src');
    return url;
  }
}