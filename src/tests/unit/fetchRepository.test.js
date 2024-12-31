import { expect, test, vi, beforeEach, afterEach } from "vitest";
import { fetchRepository } from "../../js/fetchRepository.js";

global.fetch = vi.fn();

beforeEach(() => {
    fetch.mockReset();
});

afterEach(() => {
    fetch.mockRestore();
});

test('fetchRepository throws an error if "Select a Language" is selected', async () => {
    await expect(fetchRepository("Select a Language")).rejects.toThrow(
        "Please select a language",
    );
});

test("fetchRepository returns a repository when a valid language is selected", async () => {
    fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
            items: [
                {
                    full_name: "repo/js",
                    description: "JS repo",
                    stargazers_count: 100,
                    forks_count: 50,
                    open_issues_count: 10,
                },
            ],
        }),
    });

    const repository = await fetchRepository("JavaScript");

    expect(repository).toEqual({
        full_name: "repo/js",
        description: "JS repo",
        stargazers_count: 100,
        forks_count: 50,
        open_issues_count: 10,
    });
});

test("fetchRepository handles errors correctly", async () => {
    fetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
        json: async () => ({}),
    });

    await expect(fetchRepository("InvalidLanguage")).rejects.toThrow(
        "Error fetching repository",
    );
});
