import { fetchRepository } from "./fetchRepository.js";
import {
    displayRepository,
    displayRepositoryError,
} from "./displayRepository.js";
import { updateRepositoryStatus, hideRepositoryCard } from "./utils.js";

export const handleSelectChange = async (elements) => {
    updateRepositoryStatus(
        elements.repositoryStatus,
        "Loading, please wait",
        "flex",
        "#e5e7eb",
    );
    hideRepositoryCard();
    const selectedLanguage = elements.selectElement.value;

    try {
        const repository = await fetchRepository(selectedLanguage);
        displayRepository(repository, selectedLanguage, elements);
    } catch (error) {
        displayRepositoryError(elements);
    }
};

export const handleButtonClick = async (event, elements) => {
    event.preventDefault();
    updateRepositoryStatus(
        elements.repositoryStatus,
        "Loading, please wait",
        "flex",
        "#e5e7eb",
    );
    hideRepositoryCard();
    const selectedLanguage = elements.selectElement.value;

    try {
        const repository = await fetchRepository(selectedLanguage);
        displayRepository(repository, selectedLanguage, elements);
    } catch (error) {
        displayRepositoryError(elements);
    }
};
