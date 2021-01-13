import { serverURL } from "../config";

export default class Company {
    constructor(companyName, companyNumber, pOBox, addressLine1, addressLine2, postTown, county, country ) {
        this.companyName = companyName;
        this.companyNumber = companyNumber;
        this.pOBox = pOBox;
        this.addressLine1 = addressLine1;
        this.addressLine2 = addressLine2;
        this.postTown = postTown;
        this.county = county;
        this.country = country;
    }

    async searchCompaniesByName() {
        const response = await fetch(`${serverURL}item/${this.id}`);
        const data = await response.json();
        this.imageURL = data.imageURL;
        this.model = data.model;
        this.prodCode = data.prodCode;
    }
}