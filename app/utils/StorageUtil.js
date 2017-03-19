import { AsyncStorage } from 'react-native';

export default {
  table: {
    bookmark: '@BOOKMARK',
    manga: '@MANGA',
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
}