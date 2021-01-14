import { serverURL} from "../config";

const mainContainer = document.querySelector('.main-container');

export const renderSearchBar = () => {
    const markup = `
        <div class="search-container">
            <input type="text" class="search-input" placeholder="Search.." name="text">
            <input type="hidden" name="limitStart" class="limitStart" value="0">
            <input type="hidden" name="limitEnd" class="limitEnd" value="10">
            <button type="submit" class="btn-search">Search</button>   
        </div>
    `;

    mainContainer.insertAdjacentHTML('afterbegin', markup);
};
