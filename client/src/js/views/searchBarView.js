import { serverURL} from "../config";

const mainContainer = document.querySelector('.main-container');

export const renderSearchBar = () => {
    const markup = `
        <div class="search-container">
            <input type="text" placeholder="Search.." name="text">
            <input type="hidden" name="limitStart" value="0">
            <input type="hidden" name="limitEnd" value="10">
            <button type="submit">Submit</button>   
        </div>
    `;

    const func = (e) => {

    }

    mainContainer.insertAdjacentHTML('beforeend', markup);
};
