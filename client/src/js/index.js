import "core-js/stable";
import "regenerator-runtime/runtime";
import { renderSearchBar } from "./views/searchBarView";
import Search from "./models/search.model"
import CompanyList from "./models/companyList.model";
import { renderCompanyFromList } from "./views/companyListView";

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
            const searchObj = new Search(text, limitStart, limitEnd);
            const companiesList =  new CompanyList(searchObj);
            searchButton.disabled = true;

            try{
                const companiesData = await companiesList.searchCompanies();
                searchButton.disabled = false;
                state.companies = companiesData.data.companies;
                state.companiesCount = companiesData.data.count[0]['FOUND_ROWS()'];
                state.searchObj = searchObj;
                console.log(state.companiesCount);
                console.log(state.companies);

                state.companies.forEach(company => {
                    renderCompanyFromList(company);
                })
            } catch (e) {
               console.log(e);
            }
        }
    }
});