import {getRandomRepository} from "./getRandomRepository.js"

export const fetchAndDisplayRepository = async (
    selectedLanguage,
    repoResult,
    buttonResults,
) => {
    if (selectedLanguage === "Select a Language") {
        repoResult.textContent = "Please select a language";
        return;
    }

    try {
        const repository = await getRandomRepository(selectedLanguage);
        repoResult.textContent = `Repository: ${repository.full_name}\nDescription: ${repository.description}\nURL: ${repository.html_url}`;
        buttonResults.style.backgroundColor = "";
        repoResult.style.backgroundColor = "";
    } catch (error) {
        repoResult.textContent = "Error fetching repository";
        buttonResults.style.backgroundColor = "red";
        repoResult.style.backgroundColor = "red";
    }
};
