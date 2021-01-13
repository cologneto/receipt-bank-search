import "core-js/stable";
import "regenerator-runtime/runtime";
import { renderSearchBar } from "./views/searchBarView";
import Search from "./models/search.model"
import Item from "./models/search.model"
import CompanyList from "./models/companyList.model";

const state = {};

document.addEventListener("DOMContentLoaded", async () => {
    renderSearchBar();
});

document.addEventListener("click", async e => {
    const targetTagName = e.target.tagName;
    const targetClList = e.target.classList;

    if (targetTagName === "BUTTON") {
        if (targetClList.contains("btn-search")) {
            state.text = document.querySelector('input[name="text"]').value;
            state.limitStart = document.querySelector('.limitStart').value;
            state.limitEnd = document.querySelector('.limitEnd').value;

            const searchButton = e.target;
            const searchObj = new Search(state.text, state.limitStart, state.limitEnd);
            const companiesList =  new CompanyList(searchObj);
            searchButton.disabled = true;

            try{
                state.companies = await companiesList.searchCompanies();
                searchButton.disabled = false;
                state.companies = companies;
                console.log(searchObj);
            } catch (e) {
               console.log(e);
            }



        }
    }
});