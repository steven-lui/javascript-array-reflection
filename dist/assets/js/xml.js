let idMax=1082,htmlTag="#picsum-img",list=[];const getRandomID=function(){return Math.floor(Math.random()*idMax)+1};function newImageToHTML(t){let a=JSON.parse(t.responseText);$(htmlTag).attr("src",`https://picsum.photos/id/${a.id}/1200/1200`),$(htmlTag).text("alt",`Image by ${a.author}`)}function getRandomImage(){let t=new XMLHttpRequest;t.onreadystatechange=function(){4===t.readyState&&200===t.status&&newImageToHTML(this)},t.open("GET",`https://picsum.photos/id/${Math.floor(Math.random()*idMax)+1}/info`,!0),t.send()}$((function(){getRandomImage()}));