'use strict';

import { MailImg } from './MailImg.js';
import { ajaxToImg, randomImg } from './xhr.js';

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