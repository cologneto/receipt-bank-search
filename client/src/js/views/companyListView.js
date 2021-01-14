import elements from './base'

export const renderCompanyForList = company => {
    const markup = `
        <div class="company-container">
            <div class="name-container">
                ${company.companyName}
            </div>
            <div class="number-container">${company.companyNumber}</div>
            <div class="address-container">
                <span style="display: ${company.addressLine1 ? 'inline' : 'none'};">${company.addressLine1},</span>
                <span style="display: ${company.addressLine2 ? 'inline' : 'none'};">${company.addressLine2},</span>
                <span style="display: ${company.postTown ? 'inline' : 'none'};">${company.postTown},</span>
                <span style="display: ${company.county ? 'inline' : 'none'};">${company.county},</span>
                <span style="display: ${company.country ? 'inline' : 'none'};">${company.country},</span>
                <span style="display: ${company.postCode ? 'inline' : 'none'};">${company.postCode}</span>
            </div>
        </div>
    `;
    elements.listContainer.insertAdjacentHTML("beforeend", markup);
};

export const renderLoadMoreBtn = () => {
    const markup = `
        <div class="load-more-btn-container">
            <button type="button" class="load-more-btn">Load More</button>
        </div>
    `;
    elements.listContainer.insertAdjacentHTML("afterend", markup);
}

export const renderNoResultsText = () => {
    const markup = `
        <div class="no-results-container">
            <h5>No result found</h5>
        </div>
    `;
    elements.listContainer.insertAdjacentHTML("beforeend", markup);
};

export const renderResultsCounter = (count) => {
    const markup = `
        <div class="results-count-container">
            <h5>Found ${count} results</h5>
        </div>
    `;
    elements.listContainer.insertAdjacentHTML("afterbegin", markup);
};

