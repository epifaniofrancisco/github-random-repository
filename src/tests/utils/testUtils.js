export const createMockRepository = () => ({
    full_name: "openai/gpt",
    description: "A repository for GPT-related projects",
    language: "JavaScript",
    stargazers_count: 1234,
    forks_count: 567,
    open_issues_count: 8,
});

export const createApiResponse = (ok = true, data = null) => ({
    ok,
    status: ok ? 200 : 404,
    json: async () => data || { items: [createMockRepository()] },
});
