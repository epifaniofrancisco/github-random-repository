import { updateRepositoryCard } from "./updateRepositoryCard.js";
import { updateRepositoryStatus, updateButtonStyle } from "./utils.js";

const handleNoLanguageSelected = (elements) => {
    updateRepositoryStatus(
        elements.repositoryStatus,
        "Please select a language",
        "flex",
        "#e5e7eb",
    );
    updateButtonStyle(elements.fetchRepoButton, "flex", "#000");
};

const handleRepositoryFetchSuccess = (
    repository,
    selectedLanguage,
    elements,
) => {
    updateRepositoryStatus(elements.repositoryStatus, "", "none", "#e5e7eb");
    updateRepositoryCard(repository, selectedLanguage);
    updateButtonStyle(elements.fetchRepoButton, "inline-flex", "#000");
};

const handleRepositoryFetchError = (elements) => {
    updateRepositoryStatus(
        elements.repositoryStatus,
        "Error fetching repository",
        "flex",
        "#fecaca",
    );
    updateButtonStyle(elements.fetchRepoButton, "inline-flex", "#ef4444");
    document.querySelector(".display-repository").style.display = "none";
};

export const displayRepository = (repository, selectedLanguage, elements) => {
    if (!repository) {
        handleNoLanguageSelected(elements);
        return;
    }

    handleRepositoryFetchSuccess(repository, selectedLanguage, elements);
};

export const displayRepositoryError = (elements) => {
    handleRepositoryFetchError(elements);
};
