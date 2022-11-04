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
        //since mailto contains @, we will need to remove it
        let htmlId = element.mailTo.replace('@', '-').replace('.', '-');

        // add table row
        let rowHtml = `<tr id="row-${htmlId}">`
        // prepend, so that the information is oldest email to newest email added
        $(rowHtml).prependTo(tableBody);

        // email cell
        let emailHtml = `<td id="email-${htmlId}">${element.mailTo}</td>`
        $(emailHtml).appendTo($(`#row-${htmlId}`));

        // prepare image list
        let imageListHtml = `<td><ul id="images-${htmlId}"></ul></td>`
        $(imageListHtml).appendTo($(`#row-${htmlId}`));

        // add images
        element.idList.forEach(id => {
            // prepare list item element for image
            let html = `<img id="image-${id}"></li>`;
            $(html).prependTo($(`#images-${htmlId}`));

            // append image
            ajaxToImg(id, `#image-${id}`, 50, 50);
        });
    });
}

//FIX
function validateEmail(email) {
    // https://www.w3resource.com/javascript/form/email-validation.php
    let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    return regex.test(email);
}

//document ready
$(function () {
    randomImg();
    // hide error label
    $(`label[for="user-email"]`).hide();
});

// add button email and image to list
$('#add-email').on('click', function (e) {
    // prevent page refresh
    e.preventDefault();

    //email
    let email = $('#user-email').val();
    // sanitise function here

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
        console.log('Bad email:', $('#user-email').val());
        
        // show warning label
        // don't use fancy animations, they stutter bad
        $(`label[for="user-email"]`).show().delay(5000).hide();

        // focus email input
        $("#user-email").focus();
    }
});