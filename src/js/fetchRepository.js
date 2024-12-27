import { getRandomRepository } from "./getRandomRepository.js";

export const fetchRepository = async (selectedLanguage) => {
    if (selectedLanguage === "Select a Language") {
        throw new Error("Please select a language");
    }

    try {
        const repository = await getRandomRepository(selectedLanguage);
        return repository;
    } catch (error) {
        console.error("Error fetching repository:", error);
        throw error;
    }
};
