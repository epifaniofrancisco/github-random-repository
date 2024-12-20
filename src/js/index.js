import { loadLanguages } from "./loadLanguages.js";
import { populateSelectElement } from "./populateSelectElement.js";

document.addEventListener("DOMContentLoaded", async () => {
    const selectElement = document.getElementById("languages");
    const repoResult = document.getElementById("repo-result");

    const languages = await loadLanguages();
    populateSelectElement(languages, selectElement);

    selectElement.addEventListener("change", () => {
        repoResult.textContent = "Loading, please wait";
    });
});
