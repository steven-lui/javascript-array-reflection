let idMax=1082;function ajaxRequest(t,a,o={}){return new Promise(((n,e)=>{$.ajax({url:a,type:t,data:o,success:function(t){n(t)},error:function(t){e(t)}})}))}const getRandomID=()=>Math.floor(Math.random()*idMax)+1;function applyDataToImg(t,a,o,n){$(a).attr("src",`https://picsum.photos/id/${t.id}/${o}/${n}`),$(a).text("alt",`Image by ${t.author}`)}export function ajaxToImg(t=getRandomID(),a="#picsum-img",o=1200,n=1200){ajaxRequest("GET",`https://picsum.photos/id/${t}/info`).then((t=>{applyDataToImg(t,a,o,n)})).catch((t=>console.log(t)))}