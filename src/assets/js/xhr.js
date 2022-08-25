let idMax = 1082; //  check for higher IDs

// https://www.taniarascia.com/how-to-promisify-an-ajax-call/
function ajaxRequest(type, url, data = {}) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: url,
            type: type,
            data: data,
            success: function (data) {
                resolve(data);
            },
            error: function (error) {
                reject(error);
            },
        })
    });
}
const getRandomID = () => Math.floor(Math.random() * idMax) + 1;

function applyDataToImg(data, htmlId, width, height) {
    $(htmlId).attr('src', `https://picsum.photos/id/${data.id}/${width}/${height}`);
    $(htmlId).text('alt', `Image by ${data.author}`);
}

/* creates ajax request to get an image from lorem picsum */
export function ajaxToImg(imgId = getRandomID(), htmlId = "#picsum-img", width = 1200, height = 1200) {
    ajaxRequest('GET', `https://picsum.photos/id/${imgId}/info`)
        .then((data) => {
            applyDataToImg(data, htmlId, width, height);
        })
        .catch(e => console.log(e));
};