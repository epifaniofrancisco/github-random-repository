export const createMockRepository = (overrides = {}) => ({
    full_name: "openai/gpt",
    description: "A repository for GPT-related projects",
    language: "JavaScript",
    stargazers_count: 1234,
    forks_count: 567,
    open_issues_count: 8,
    ...overrides,
});

export const createMockRepositories = (count = 3) =>
    Array.from({ length: count }, (_, i) =>
        createMockRepository({
            full_name: `repo${i}/name`,
            id: i,
        }),
    );
