'use strict';

class MailImg {
    constructor(mailTo = "", urlList = []) {
        this._mailTo = mailTo;
        this._urlList = urlList;
    }

    //get
    get mailTo() {
        return this._mailTo;
    }

    get urlList() {
        return this._urlList;
    }

    //set
    set mailTo(email) {
        this._mailTo = email;
    }

    set urlList(urls) {
        this._urlList = urls;
    }

    // add
    addUrl = url => {
        this._urlList.push(url);
    }

    //remove
    removeUrl = url => {
        // take the index of url
        // splice it out of list
        this._urlList.splice(this.urlList.indexOf(url), 1);
    }

    //return as a html column
    getHtml = () => {
        let html = `<tr>`;

        //add email
        html += `<td>${this.mailTo}</td><td>`;

        //add image urls 
        for (const e in this.urlList) {
            html += `<img class="img-fluid" src="${e}" style="width: 4em;">`;
        }

        return html;
    }
}

let idMax = 1082; //  check for higher IDs
let htmlTag = '#picsum-img'; //  for jQuery
let list = []; //list of MailImg

const getRandomID = () => Math.floor(Math.random() * idMax) + 1;

function newImageToHTML(xhr) {
    // parse
    let obj = JSON.parse(xhr.responseText);

    //image size
    // let width = $('.container').width();
    let width = 1200;

    // set HTML
    $(htmlTag).attr('src', `https://picsum.photos/id/${obj.id}/${width}/${width}`);
    $(htmlTag).text('alt', `Image by ${obj.author}`);
}

function getRandomImage() {
    // init
    let xhr = new XMLHttpRequest();

    // assign behaviour
    xhr.onreadystatechange = function () {
        // check status of current request
        console.log(xhr.readyState);

        // DONE
        if (xhr.readyState === 4) {
            switch (xhr.status) {
                case 200:
                    console.log("Image found, moving to HTML");
                    newImageToHTML(this);
                    break;
                case 404:
                    console.log("404, Image not found");
                    break;
                default:
                    break;
            }
        }
    };

    // open request for random image
    xhr.open('GET', `https://picsum.photos/id/${getRandomID()}/info`, true);
    // send request
    xhr.send();
};

function displayTable() {
    //clear table content
    $('.table-group-divider').empty();

    //iterate through the mail array
    list.forEach(element => {
        $(element.getHtml()).appendTo($("tbody"));
    });
}

//FIX
function validateEmail(email) {
    return true;
}

//document ready
$(function () {
    getRandomImage();
    // add button email and image to list
    $('#add').on('click', function (e) {
        //prevent page refresh
        e.preventDefault();

        //logic
        if (validateEmail($('#user-email').val())) {
            //add to list
            list.push(new MailImg($('#user-email').val(), [$('#picsum-img').attr("src")]));
            //display list in table
            displayTable();

            //new image
            getRandomImage();
        }
    });
});