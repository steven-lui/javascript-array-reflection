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
            error: function (data) {
                reject(data);
            }
        })
    });
}

function applyDataToImg(data, htmlId, width, height) {
    $(htmlId).attr('src', `https://picsum.photos/id/${data.id}/${width}/${height}`);
    $(htmlId).text('alt', `Image by ${data.author}`);
}

// tested, it seems like max is 1082
let maxId = 1082;
const getRandomID = () => Math.floor(Math.random() * maxId) + 1;

/* creates ajax request to get an image from lorem picsum */
export function ajaxToImg(imgId, htmlId, width, height) {
    ajaxRequest('GET', `https://picsum.photos/id/${imgId}/info`)
        .then(data => {
            applyDataToImg(data, htmlId, width, height);
        })
        .catch(error => {
            console.log("Error:", error.responseText);
        });
};

// https://www.codingem.com/javascript-promises-in-for-loops/
export async function randomImg() {
    let found = false;
    let exData; //holder for request data
    let maxAttempts = 5;

    // attempt
    for (let i = 0; i < maxAttempts; ++i) {
        console.log(`Attempt ${i + 1} for randomImg()`);
        // request a random img
        await ajaxRequest('GET', `https://picsum.photos/id/${getRandomID()}/info`)
            // success
            .then(data => {
                exData = data;
                console.log("Image found:", data.id);
                found = true;
            })
            //error
            .catch(data => {
                console.log("Error:", data.responseText);
            });
        // stop loop on success
        if (found) {
            applyDataToImg(exData, "#picsum-img", 400, 400);
            break;
        }

    }

    // fail
    if (!found) {
        $("#picsum-img").attr('src', './assets/img/not-found.jpg');
        console.log("Too many attempts, please try again");
    }
}