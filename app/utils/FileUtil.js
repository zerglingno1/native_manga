import axios from 'axios';
import StorageUtil from './StorageUtil';

export default {
  getMangaHTML: async (pages, chap, manga) => {

    let lis = '';
    pages.map((item) => {
        let img = item.image;
        lis += `<li><img src="${img}"/></li>`;
    });
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
    <script>
        /*function toDataUrl(url, callback) {
            var xhr = new XMLHttpRequest();
            xhr.onload = function() {
                var reader = new FileReader();
                reader.onloadend = function() {
                callback(reader.result);
                }
                reader.readAsDataURL(xhr.response);
            };
            xhr.open('GET', url);
            xhr.responseType = 'blob';
            xhr.send();
        }

        var images = document.getElementsByTagName('img'); 
        var srcList = [];
        for(var i = 0; i < images.length; i++) {
            srcList.push(images[i].src);
            toDataUrl(images[i].src, function(base64Img) {
                images[i].src = base64Img);
            });
        }*/
    </script>
</head>
<body>
	<ul>
      ${lis}
    </ul>
</body>
</html>`;
    await StorageUtil.saveManga(HTML, chap, manga);
  },
}