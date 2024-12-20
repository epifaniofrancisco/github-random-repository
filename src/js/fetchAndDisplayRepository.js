import { getRandomRepository } from "./getRandomRepository.js";

export const fetchAndDisplayRepository = async (
    selectedLanguage,
    repoResult,
    buttonResults,
) => {
    if (selectedLanguage === "selectalanguage") {
        repoResult.textContent = "Please select a language";
        return;
    }

    try {
        const repository = await getRandomRepository(selectedLanguage);
        repoResult.textContent = `Repository: ${repository.full_name}\nDescription: ${repository.description}\nURL: ${repository.html_url}`;

        repoResult.style.backgroundColor = "#e5e7eb";
        buttonResults.style.backgroundColor = "#000";
    } catch (error) {
        repoResult.textContent = "Error fetching repository";
        repoResult.style.backgroundColor = "#fecaca";
        buttonResults.style.backgroundColor = "#ef4444";
        console.error(error);
    }
};
