import "core-js/stable";
import "regenerator-runtime/runtime";
import { renderSearchBar } from "./views/searchBarView";
import Search from "./models/search.model"
import CompanyList from "./models/companyList.model";
import { renderCompanyForList, renderLoadMoreBtn, renderNoResultsText, renderResultsCounter } from "./views/companyListView";
import elements from './views/base'

const state = {};

document.addEventListener("DOMContentLoaded", async () => {
    renderSearchBar();
});

document.addEventListener("click", async e => {
    const targetTagName = e.target.tagName;
    const targetClList = e.target.classList;

    if (targetTagName === "BUTTON") {
        if (targetClList.contains("btn-search")) {
            const text = document.querySelector('input[name="text"]').value;
            const limitStart = document.querySelector('.limitStart').value;
            const limitEnd = document.querySelector('.limitEnd').value;
            const searchButton = e.target;
            const searchInput = document.querySelector('.search-input');
            const searchObj = new Search(text, limitStart, limitEnd);
            const companiesList =  new CompanyList(searchObj);
            const loadMoreBtn = document.querySelector(".load-more-btn");

            if(loadMoreBtn) {
                loadMoreBtn.parentNode.remove();
            }

            elements.listContainer.innerHTML = "";

            if(!text) {
                alert('Please enter text for search.');
                return;
            }

            searchButton.disabled = true;
            searchButton.innerHTML = "...Searching";
            searchInput.disabled = true;

            try{
                const companiesData = await companiesList.searchCompanies();
                searchButton.disabled = false;
                searchInput.disabled = false;
                searchButton.innerHTML = "Search";
                state.companies = companiesData.data.companies;
                state.companiesCount = companiesData.data.count[0]['FOUND_ROWS()'];
                state.searchObj = searchObj;


                state.companies.forEach(company => {
                    renderCompanyForList(company);
                });

                if(state.companiesCount === 0) {
                    renderNoResultsText();
                    return;
                } else {
                    renderResultsCounter(state.companiesCount);
                }

                renderLoadMoreBtn();

            } catch (e) {
               alert(e);
            }
        }
        if (targetClList.contains("load-more-btn")) {
            const loadMoreButton = e.target;
            state.searchObj.limitStart = parseInt(state.searchObj.limitStart) + 10;
            const searchObj = new Search(state.searchObj.text, state.searchObj.limitStart, state.searchObj.limitEnd);
            const companiesList =  new CompanyList(searchObj);

            loadMoreButton.disabled = true;

            try {
                const companiesData = await companiesList.searchCompanies();
                const companies = companiesData.data.companies;
                state.companies.concat(companies);
                loadMoreButton.disabled = false;

                if(companies.length === 0) {
                    loadMoreButton.disabled = true;
                    alert("No more entries to display");
                }

                companies.forEach(company => {
                    renderCompanyForList(company);
                });

            } catch (e) {
                alert('Something went wrong');
            }
        }
    }
});