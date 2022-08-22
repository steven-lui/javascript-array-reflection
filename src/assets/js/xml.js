let idMax = 1082; //  check for higher IDs
let htmlTag = '#picsum-img'; //  for jQuery

const getRandomID = function () { return Math.floor(Math.random() * idMax) + 1; }

function setImage(xml) {
    // parse
    let listObject = JSON.parse(xml.responseText);

    // set HTML
    $(htmlTag).attr('src', `https://picsum.photos/id/${listObject.id}/300/300`);
    $(`${htmlTag}-caption`).text(`Image by ${listObject.author}`);
}

function getRandomImage() {
    // init
    let xml = new XMLHttpRequest();

    // assign
    xml.onreadystatechange = function () {
        //good to go
        if (xml.readyState === 4 && xml.status === 200) {
            setImage(this);
        }
        //on a bad call, call itself
    };

    // call
    xml.open('GET', `https://picsum.photos/id/${getRandomID()}/info`);
    xml.send();
};

//document ready
$(function () {
    getRandomImage();
});