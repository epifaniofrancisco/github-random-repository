import { fetchRepository } from "./fetchRepository.js";
import {
    displayRepository,
    displayRepositoryError,
} from "./displayRepository.js";
import {
    updateButtonStyle,
    updateRepositoryStatus,
    hideRepositoryCard,
} from "./utils.js";
import { updateRepositoryCard } from "./updateRepositoryCard.js";

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
        displayRepositoryError(elements, error.message);
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
        displayRepositoryError(elements, error.message);
    }
};

export const handleNoLanguageSelected = (elements) => {
    updateRepositoryStatus(
        elements.repositoryStatus,
        "Please select a language",
        "flex",
        "#e5e7eb",
    );
    updateButtonStyle(elements.fetchRepoButton, "flex", "#000");
};

export const handleRepositoryFetchSuccess = (
    repository,
    selectedLanguage,
    elements,
) => {
    updateRepositoryStatus(elements.repositoryStatus, "", "none", "#e5e7eb");
    updateRepositoryCard(repository, selectedLanguage);
    updateButtonStyle(elements.fetchRepoButton, "inline-flex", "#000");
};

export const handleRepositoryFetchError = (elements, errorMessage) => {
    updateRepositoryStatus(
        elements.repositoryStatus,
        errorMessage,
        "flex",
        "#fecaca",
    );
    updateButtonStyle(elements.fetchRepoButton, "inline-flex", "#ef4444");
    document.querySelector(".display-repository").style.display = "none";
};
