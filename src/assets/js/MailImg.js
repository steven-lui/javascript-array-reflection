export class MailImg {
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
    addId = id => this._idList.unshift(id);

    removeiD = id => {
        // take the index of url
        // splice it out of list
        this._idList.splice(this.idList.indexOf(id), 1);
    }
}