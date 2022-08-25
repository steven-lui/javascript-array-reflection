'use strict';

import { MailImg } from './MailImg.js';

let idMax = 1082; //  check for higher IDs
let list = []; //list of MailImg

const getRandomID = () => Math.floor(Math.random() * idMax) + 1;

function imageToHTML(data, htmlId, width, height) {
    $(htmlId).attr('src', `https://picsum.photos/id/${data.id}/${width}/${height}`);
    $(htmlId).text('alt', `Image by ${data.author}`);
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
            error: function (error) {
                reject(error);
            },
        })
    });
}

/* creates ajax request to get an image from lorem picsum */
function getImageToHTML(imgId = getRandomID(), htmlId = "#picsum-img", width = 1200, height = 1200) {
    ajaxRequest('GET', `https://picsum.photos/id/${imgId}/info`)
        .then((data) => {
            imageToHTML(data, htmlId, width, height);
        })
        .catch(e => console.log(e));
};
function displayTable() {
    // get table body
    let tableBody = $('#mail-list .table-group-divider');
    // clear table content
    tableBody.empty();

    // iterate through the mail list array
    list.forEach(element => {
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
            $(html).appendTo($(`#images-${element.mailTo}`));

            // append image
            getImageToHTML(id, `#image-${id}`, 200, 200);
        });
    });
}

//FIX
function validateEmail(email) {
    return true;
}

//document ready
$(function () {
    getImageToHTML();
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
        for (let i = 0; i < list.length; ++i) {
            // email used before
            if (list[i].mailTo === email) {
                // add id to old entry
                list[i].addId(id);

                // stops new entry being added
                found = true;
                break;
            }
        }

        // not found, add a new entry
        if (!found) list.push(new MailImg(email, id));

        // display each entry in table
        displayTable();

        // new random image
        getImageToHTML();
    }
    else {
        //throw a warning
    }
});