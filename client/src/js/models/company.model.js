export default class Company {
    constructor(companyName, companyNumber, postCode, addressLine1, addressLine2, postTown, county, country ) {
        this.companyName = companyName;
        this.companyNumber = companyNumber;
        this.postCode = postCode;
        this.addressLine1 = addressLine1;
        this.addressLine2 = addressLine2;
        this.postTown = postTown;
        this.county = county;
        this.country = country;
    }
}