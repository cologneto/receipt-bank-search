import { serverURL } from "../config";

export default class Search {
    constructor(text, limitStart, limitEnd) {
        this.text = text;
        this.limitStart = limitStart;
        this.limitEnd = limitEnd;
    }
}