class MailImg {
    constructor(sender = "", reciever = "", url = "") {
        //sender and reciever
        this.mailTo = sender;
        this.mailBy = reciever;

        //image url
        this.imgUrl = url;
    }

    get mailTo() {
        return this.mailTo;
    }
    get mailBy() {
        return this.mailBy;
    }
    get imgUrl() {
        return this.imgUrl;
    }

    set mailTo(newEmail) {
        return this.newEmail;
    }
    set mailBy(newEmail) {
        return this.newEmail;
    }
    set imgUrl(newUrl) {
        this.imgUrl = newUrl;
    }
}