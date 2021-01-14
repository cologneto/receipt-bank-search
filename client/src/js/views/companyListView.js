import elements from './base'

export const renderCompanyFromList = company => {
    const markup = `
        <div class="company-container">
            <div class="name-container">
                ${company.companyName}
            </div>
            <div class="number-container">${company.companyNumber}</div>
            <div class="address-container">
                <span>${company.addressLine1}</span>
                <span>${company.addressLine2}</span>
                <span>${company.postTown}</span>
                <span>${company.county}</span>
                <span>${company.country}</span>
                <span>${company.postCode}</span>
            </div>
        </div>
    `;
    elements.mainContainer.insertAdjacentHTML("beforeend", markup);
};