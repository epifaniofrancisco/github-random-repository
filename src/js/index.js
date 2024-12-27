import { loadLanguages } from "./loadLanguages.js";
import { populateSelectElement } from "./populateSelectElement.js";
import { handleButtonClick, handleSelectChange } from "./handleEvents.js";

document.addEventListener("DOMContentLoaded", async () => {
    const elements = {
        selectElement: document.getElementById("languages"),
        repositoryStatus: document.getElementById("fetch-status"),
        fetchRepoButton: document.getElementById("fetch-repository"),
    };

    const languages = await loadLanguages();
    populateSelectElement(languages, elements.selectElement);

    elements.selectElement.addEventListener("change", () =>
        handleSelectChange(elements),
    );
    elements.fetchRepoButton.addEventListener("click", (event) =>
        handleButtonClick(event, elements),
    );
});
