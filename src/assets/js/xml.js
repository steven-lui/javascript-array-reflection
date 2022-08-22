let idMax = 1082; //check for higher IDs

const getRandomID = function () { return Math.floor(Math.random() * idMax) + 1; }

function setImage(xml) {
    let listObject = JSON.parse(xml.responseText);
    $('#picsum-img').attr('src', `https://picsum.photos/id/${listObject.id}/300/300`);
}

function getRandomImage() {
    let xml = new XMLHttpRequest();

    xml.onreadystatechange = function () {
        //good to go
        if (xml.readyState === 4 && xml.status === 200) {
            setImage(this);
        }
    };

    xml.open('GET', `https://picsum.photos/id/${getRandomID()}/info`);
    xml.send();
};

//document ready
$(function () {
    getRandomImage();
});