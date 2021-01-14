import {serverURL} from "../config";


export default class CompanyList {
    constructor(searchObj) {
        this.searchObj = searchObj;
    }

    async searchCompanies() {
        const response = await fetch(`${serverURL}search`, {
            method: "post",
            body: JSON.stringify(this.searchObj),
            headers: {
                "Content-Type": "application/json"
            }
        });

        return response.json();
    }
}