// Utility function to create a mock repository object
export const createMockRepository = () => ({
    full_name: "openai/gpt",
    description: "A repository for GPT-related projects",
    language: "JavaScript",
    stargazers_count: 1234,
    forks_count: 567,
    open_issues_count: 8,
});

// Utility function to create a mock successful fetch response
export const createMockFetchResponse = (status = 200, data = {}) => {
    return {
        ok: status === 200,
        status,
        json: async () => data,
    };
};

// Utility function to mock a network failure (rejection)
export const createMockFetchFailure = (error = "Network error") => {
    return {
        ok: false,
        status: 500,
        json: async () => {
            throw new Error(error);
        },
    };
};

// Utility function for a mock fetch error with a specific status code (e.g., 404)
export const createMockFetchError = (
    status = 404,
    errorMessage = "Error fetching repository",
) => {
    return {
        ok: false,
        status,
        json: async () => ({ error: errorMessage }),
    };
};
