export const getRandomRepository = async (language) => {
    try {
        const response = await fetch(
            `https://api.github.com/search/repositories?q=language:${language}&sort=stars&order=desc`,
        );
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        const repositories = data.items;
        
        if (repositories.length === 0) {
            throw new Error("No repositories found");
        }
        
        const randomIndex = Math.floor(Math.random() * repositories.length);
        return repositories[randomIndex];
    } catch (error) {
        console.error("Error fetching repository:", error);
        throw error;
    }
};
