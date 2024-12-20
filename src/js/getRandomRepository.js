export const getRandomRepository = async () => {
    try {
        const response = await fetch("./");
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error loading languages:", error);
        return [];
    }
}