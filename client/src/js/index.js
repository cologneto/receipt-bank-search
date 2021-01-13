import "core-js/stable";
import "regenerator-runtime/runtime";
import { renderSearchBar } from "./views/searchBarView";

document.addEventListener("DOMContentLoaded", async () => {
    renderSearchBar();
});