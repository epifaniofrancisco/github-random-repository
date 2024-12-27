import { getRandomRepository } from "./getRandomRepository.js";

export const fetchRepository = async (selectedLanguage) => {
    if (selectedLanguage === "Select a Language") {
        throw new Error("Please select a language");
    }

    try {
        const repository = await getRandomRepository(selectedLanguage);
        return repository;
    } catch (error) {
        if (error.message === "No repositories found") {
            throw new Error("No repositories found");
        }
        throw new Error("Error fetching repository");
    }
};
