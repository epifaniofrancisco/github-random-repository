import { loadLanguages } from "./loadLanguages.js";
import { populateSelectElement } from "./populateSelectElement.js";
import { handleButtonClick, handleSelectChange } from "./handleEvents.js";

document.addEventListener("DOMContentLoaded", async () => {
    const selectElement = document.getElementById("languages");
    const repoResult = document.getElementById("repo-result");
    const buttonResults = document.getElementById("get-results");

    const languages = await loadLanguages();
    populateSelectElement(languages, selectElement);

    selectElement.addEventListener("change", () =>
        handleSelectChange(selectElement, repoResult, buttonResults),
    );
    buttonResults.addEventListener("click", (event) =>
        handleButtonClick(event, selectElement, repoResult, buttonResults),
    );
});

