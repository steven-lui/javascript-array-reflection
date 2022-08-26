'use strict';

class MailImg {
    constructor(mailTo = "", id = "") {
        this._mailTo = mailTo;
        this._idList = [id];
    }

    //get
    get mailTo() {
        return this._mailTo;
    }

    get idList() {
        return this._idList;
    }

    //set
    set mailTo(email) {
        this._mailTo = email;
    }

    set idList(ids) {
        this._idList = ids;
    }

    //newest first
    addId = id => this._idList.push(id);

    removeiD = id => {
        // take the index of url
        // splice it out of list
        this._idList.splice(this.idList.indexOf(id), 1);
    }
}

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
function ajaxToImg(imgId, htmlId, width, height) {
    ajaxRequest('GET', `https://picsum.photos/id/${imgId}/info`)
        .then(data => {
            applyDataToImg(data, htmlId, width, height);
        })
        .catch(error => {
            console.log("Error:", error.responseText);
        });
};

// https://www.codingem.com/javascript-promises-in-for-loops/
async function randomImg() {
    let found = false;
    let exData; //holder for request data
    let maxAttempts = 5;

    // attempt
    for (let i = 0; i < maxAttempts; ++i) {
        console.log(`Attempt ${i + 1} for randomImg()`);

        let id = getRandomID();

        // request a random img
        await ajaxRequest('GET', `https://picsum.photos/id/${id}/info`)
            // success
            .then(data => {
                exData = data;
                console.log("Image found:", data.id);
                found = true;
            })
            //error
            .catch(data => {
                console.log(`Error for ID#${id}: ${data.responseText}`);
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

let mailList = []; //list of MailImg

function displayTable() {
    // get table body
    let tableBody = $('#mail-list .table-group-divider');
    // clear table content
    tableBody.empty();

    // iterate through the mail list
    mailList.forEach(element => {
        // add table row
        let rowHtml = `<tr id="row-${element.mailTo}">`
        // prepend, so that the information is oldest email to newest email added
        $(rowHtml).prependTo(tableBody);

        // email cell
        let emailHtml = `<td id="email-${element.mailTo}">${element.mailTo}</td>`
        $(emailHtml).appendTo($(`#row-${element.mailTo}`));

        // prepare image list
        let imageListHtml = `<td><ul id="images-${element.mailTo}"></ul></td>`
        $(imageListHtml).appendTo($(`#row-${element.mailTo}`));

        // add images
        element.idList.forEach(id => {
            // prepare list item element for image
            let html = `<img id="image-${id}"></li>`;
            $(html).prependTo($(`#images-${element.mailTo}`));

            // append image
            ajaxToImg(id, `#image-${id}`, 50, 50);
        });
    });
}

//FIX
function validateEmail(email) {
    return true;
}

//document ready
$(function () {
    randomImg();
});

// add button email and image to list
$('#add-email').on('click', function (e) {
    //prevent page refresh
    e.preventDefault();

    //email
    let email = $('#user-email').val();
    //sanitise function here

    // if email is valid
    if (validateEmail(email)) {
        // get the id of the image
        let id = $('#picsum-img').attr("src");
        // https://picsum.photos/id/x/1200/1200
        // we want x
        id = id.split('/')[4];

        // iter through list to check if email has been used before
        let found = false;
        for (let i = 0; i < mailList.length; ++i) {
            // email used before
            if (mailList[i].mailTo === email) {
                // add id to old entry
                mailList[i].addId(id);

                // stops new entry being added
                found = true;
                break;
            }
        }

        // not found, add a new entry
        if (!found) mailList.push(new MailImg(email, id));

        // display each entry in table
        displayTable();

        // new random image
        randomImg();
    }
    else {
        //throw a warning
    }
});