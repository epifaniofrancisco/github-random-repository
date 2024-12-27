import {
    handleNoLanguageSelected,
    handleRepositoryFetchError,
    handleRepositoryFetchSuccess,
} from "./handleEvents.js";

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
