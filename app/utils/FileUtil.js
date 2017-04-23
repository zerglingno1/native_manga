import axios from 'axios';
import StorageUtil from './StorageUtil';
import { NativeModules } from 'react-native';

export default {
  getMangaHTML: async (pages, chap, manga) => {

    let lis = '';
    let leng = pages.length;
    for(let i = 0; i < leng; i++) {
        let item = pages[i];
        try {
            let img = await NativeModules.ImageBaseModule.imageToBase64(item.image);
            lis += `<li><img src="${img}"/></li>`;
        } catch (e) {
            lis += `<li><img src="${item.image}"/></li>`;
        }
    }
    let title = manga.title;
    let HTML = `
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>${title}</title>
	<style>
		html,body{
			height:100%;
			width:100%;
            overflow-x: hidden;
		}
		ul {
            list-style: none;
            padding: 0;
            margin: 0;
        }
        img {
            width: 100%;
            padding: 0;
            margin: 0;
        }
        li {
            padding: 0;
            margin: 0;
        }
	</style>
</head>
<body>
	<ul>
      ${lis}
    </ul>
</body>
</html>`;
    let name = await NativeModules.ImageBaseModule.saveToLocalFile(manga.id + "_" + chap.title, HTML);
    await StorageUtil.saveMangaList(chap, manga, name);
  },
  removeManga: async (data) => {
    for (let [key, item] of Object.entries(data.chaps)) {
        try {
            await NativeModules.ImageBaseModule.removeFile(item.pages);
        } catch (e) {
            return false;
        }
    }
    return true;
  },
  removeChap: async (link) => {
    try {
        await NativeModules.ImageBaseModule.removeFile(link);
    } catch (e) {
        return false;
    }
    return true;
  }
}