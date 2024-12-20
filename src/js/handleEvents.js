import { fetchAndDisplayRepository } from "./fetchAndDisplayRepository.js";

export const handleSelectChange = async (selectElement, repoResult) => {
    repoResult.textContent = "Loading, please wait";
    const selectedLanguage = selectElement.value;
    await fetchAndDisplayRepository(
        selectedLanguage,
        repoResult,
        selectElement,
    );
};

export const handleButtonClick = async (event, selectElement, repoResult) => {
    event.preventDefault();
    repoResult.textContent = "Loading, please wait";
    const selectedLanguage = selectElement.value;
    await fetchAndDisplayRepository(
        selectedLanguage,
        repoResult,
        selectElement,
    );
};
