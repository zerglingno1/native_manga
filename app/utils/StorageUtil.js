import { AsyncStorage } from 'react-native';

export default {
  table: {
    bookmark: '@BOOKMARK',
    manga: '@MANGA',
    mangaList: '@MANGALIST',
    readHistory: '@HISTORY',
  },
  object: {
    bookmark: {title: '', url: '', id: ''},
    manga: {titile: '', url: '', chaps: []},
  },
  saveBookMark: async (object) => {
    const table = '@BOOKMARK';
    let bookmarkData = await AsyncStorage.getItem(table);
    bookmarkData = JSON.parse(bookmarkData);
    if (bookmarkData) {
      let temp = {};
      let update = false;
      bookmarkData = bookmarkData.map((item, index) => {
        if (item.id  == object.id) {
          item.url = object.url;
          item.title = object.title;
          update = true;
        }
        return item;
      });
      if (!update) {
        bookmarkData.push(object);
      }
    } else {
      bookmarkData = [];
      bookmarkData.push(object);
    }
    await AsyncStorage.setItem(table, JSON.stringify(bookmarkData));
  },
  getBookMark: async () => {
    const table = '@BOOKMARK';
    let bookmarkData = await AsyncStorage.getItem(table);
    if (!bookmarkData) {
      return [];
    }
    return JSON.parse(bookmarkData);
  },
  saveHistory: async (mangaId, object) => {
    const table = '@HISTORY';
    await AsyncStorage.setItem(table + mangaId, JSON.stringify(object));
  },
  getHistory: async (mangaId) => {
    const table = '@HISTORY';
    let historyData = await AsyncStorage.getItem(table + mangaId);
    if (!historyData) {
      return false;
    }
    return JSON.parse(historyData);
  },
  saveManga: async (html, chap, manga) => {
    const table = '@MANGA';
    const tableList = '@MANGALIST';
    let mangaData = await AsyncStorage.getItem(table + manga.id);
    let list = await AsyncStorage.getItem(tableList);
    if (!mangaData) {
      manga.chaps= {};
      manga.chaps[chap.url] = {url: chap.url, title: chap.title, pages: html};
      await AsyncStorage.setItem(table + manga.id, JSON.stringify(manga));
      if (list) {
        list = JSON.parse(list);
      } else {
        list = [];
      }
      list.push(table + manga.id);
      await AsyncStorage.setItem(tableList, JSON.stringify(list));
    } else {
      mangaData = JSON.parse(mangaData);
      mangaData.chaps[chap.url] = {url: chap.url, title: chap.title, pages: html};
      await AsyncStorage.setItem(table + manga.id, JSON.stringify(mangaData));
    }
  },
  saveMangaList: async (chap, manga, name) => {
    const table = '@MANGA';
    const tableList = '@MANGALIST';
    let mangaData = await AsyncStorage.getItem(table + manga.id);
    let list = await AsyncStorage.getItem(tableList);
    if (!mangaData) {
      manga.chaps= {};
      manga.chaps[chap.url] = {url: chap.url, title: chap.title, pages: name + '.html'};
      await AsyncStorage.setItem(table + manga.id, JSON.stringify(manga));
      if (list) {
        list = JSON.parse(list);
      } else {
        list = [];
      }
      list.push(table + manga.id);
      await AsyncStorage.setItem(tableList, JSON.stringify(list));
    } else {
      mangaData = JSON.parse(mangaData);
      mangaData.chaps[chap.url] = {url: chap.url, title: chap.title, pages: name + '.html'};
      await AsyncStorage.setItem(table + manga.id, JSON.stringify(mangaData));
    }
  },
  getSavedMangaList: async () => {
    const table = '@MANGALIST';
    let historyData = await AsyncStorage.getItem(table);
    if (!historyData) {
      return false;
    }
    return JSON.parse(historyData);
  },
  getSavedMultiManga: async (mangas, callback) => {
    const table = '@MANGALIST';
    if(mangas) {
      AsyncStorage.multiGet(mangas, (err, stores) => {
        let result = [];
        if (!err) {
          stores.map((store) => {
            result.push(JSON.parse(store[1]));
          });
          callback(result);
        }
      });
    }
  },
  removeMangaSaved: async (manga) => {
    try {
      const table = '@MANGA';
      const tableList = '@MANGALIST';
      await AsyncStorage.removeItem(table + manga.id);
      let list = await AsyncStorage.getItem(tableList);
      if (list) {
        
        list = JSON.parse(list);
        let temp = [];
        list.map((item) => {
          if(item != table + manga.id) {
            temp.push(item);
          }
        });
        await AsyncStorage.setItem(tableList, JSON.stringify(temp));
        return temp;
      }
    } catch (e) {
      return false;
    }
  },
  removeChapSaved: async (manga, current) => {
    try {
      const table = '@MANGA';

      let mangaData = await AsyncStorage.getItem(table + manga.id);
      if (mangaData) {
        mangaData = JSON.parse(mangaData);
        let temp = mangaData.chaps;
        delete temp[current];
        mangaData.chaps = temp;
        await AsyncStorage.setItem(table + manga.id, JSON.stringify(mangaData));
        return mangaData;
      }
    } catch (e) {
      return false;
    }
  }
}