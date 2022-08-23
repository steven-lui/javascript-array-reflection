class MailImg {
    constructor(sender = "", reciever = "", url = "") {
        // sender and reciever
        this.mailTo = sender;
        this.mailBy = reciever;

        // image url
        this.urlList = [];
        addUrl(url);
    }

    // get
    get mailTo() {
        return this.mailTo;
    }
    get mailBy() {
        return this.mailBy;
    }
    get imgUrl() {
        return this.imgUrl;
    }

    // set
    set mailTo(newEmail) {
        this.mailTo = newEmail;
    }
    set mailBy(newEmail) {
        this.mailBy = newEmail;
    }
    set urlList(newUrl) {
        this.urlList = newUrl;
    }

    // add
    addUrl = url => {
        this.urlList.append(url);
    }

    //remove
    removeUrl = url => {
        // take the index of url
        // splice it out of list
        this.urlList.splice(this.urlList.indexOf(url), 1);
    }
}