import { fetchAndDisplayRepository } from "./fetchAndDisplayRepository.js";

export const handleSelectChange = async (selectElement, repoResult, buttonResults) => {
    repoResult.textContent = "Loading, please wait";
    const selectedLanguage = selectElement.value;
    await fetchAndDisplayRepository(
        selectedLanguage,
        repoResult,
        buttonResults,
    );
};

export const handleButtonClick = async (
    event,
    selectElement,
    repoResult,
    buttonResults,
) => {
    event.preventDefault();
    repoResult.textContent = "Loading, please wait";
    const selectedLanguage = selectElement.value;
    await fetchAndDisplayRepository(
        selectedLanguage,
        repoResult,
        buttonResults,
    );
};
