let idMax=1082,htmlTag="#picsum-img";const getRandomID=function(){return Math.floor(Math.random()*idMax)+1};function setImage(t){let a=JSON.parse(t.responseText);$(htmlTag).attr("src",`https://picsum.photos/id/${a.id}/300/300`),$(`${htmlTag}-caption`).text(`Image by ${a.author}`)}function getRandomImage(){let t=new XMLHttpRequest;t.onreadystatechange=function(){4===t.readyState&&200===t.status&&setImage(this)},t.open("GET",`https://picsum.photos/id/${Math.floor(Math.random()*idMax)+1}/info`),t.send()}$((function(){getRandomImage()}));