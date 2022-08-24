'use strict';

class MailImg {
    constructor(mailTo = "", url = "") {
        this._mailTo = mailTo;
        this._urlList = [];
        this.addUrl(url);
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

    // preload behaviour
    xhr.onreadystatechange = function () {
        /*  0   UNSENT	Client has been created. open() not called yet.
            1	OPENED	open() has been called.
            2	HEADERS_RECEIVED	send() has been called, and headers and status are available.
            3	LOADING	Downloading; responseText holds partial data.
            4	DONE	The operation is complete. */
        switch (xhr.readyState) {
            case 0:
                console.log(xhr.readyState, "UNSENT");
                break;
            case 1:
                console.log(xhr.readyState, "OPENED");
                break;
            case 2:
                console.log(xhr.readyState, "HEADERS_RECEIVED");
                break;
            case 3:
                console.log(xhr.readyState, "LOADING");
                break;
            case 4:
                console.log(xhr.readyState, "DONE");
                break;
            default:
                break;
        }

        // REQUEST DONE
        /* 1xx: Information
        2xx: Successful
        3xx: Redirection
        4xx: Client Error
        5xx: Server Error */
        if (xhr.readyState === 4) {
            if (xhr.status >= 500) {
                console.log(xhr.status, "Server error, please try again another time");
            }
            else if (xhr.status >= 400) {
                console.log(xhr.status, "Client error, please refresh the page");
            }
            else if (xhr.status >= 300) {
                console.log(xhr.status, "This request has been moved to another URL");
            }
            else if (xhr.status >= 200) {
                console.log(xhr.status, "Request successful");
                newImageToHTML(this);
            }
            else if (xhr.status >= 100) {
                console.log(xhr.status, "Request successful");
            }
            else {
                console.log(xhr.status, "Please check you have a stable internet connection before trying again");
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
            //unshift to list, so that new entry is first
            list.unshift(new MailImg($('#user-email').val(), $('#picsum-img').attr("src")));

            //display list in table
            displayTable();

            //new image
            getRandomImage();
        }
    });
});