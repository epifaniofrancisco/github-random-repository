import { afterEach, beforeEach, describe, it, expect, vi } from "vitest";
import { getRandomRepository } from "../../js/getRandomRepository";
import { createApiResponse, mockFetch } from "../utils/apiHelpers";
import { createMockRepositories } from "../utils/mockData";

describe("getRandomRepository", () => {
    let fetch;

    beforeEach(() => {
        fetch = mockFetch(vi);
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    describe("successful cases", () => {
        it("should return a random repository when API call succeeds", async () => {
            const mockRepositories = createMockRepositories();
            fetch.mockResolvedValueOnce(
                createApiResponse(true, { items: mockRepositories }),
            );

            const repository = await getRandomRepository("JavaScript");

            expect(mockRepositories).toContain(repository);
            expect(fetch).toHaveBeenCalledWith(
                "https://api.github.com/search/repositories?q=language:JavaScript&sort=stars&order=desc",
            );
        });

        it("should handle empty repository list", async () => {
            fetch.mockResolvedValueOnce(createApiResponse(true, { items: [] }));

            await expect(getRandomRepository("JavaScript")).rejects.toThrow(
                "No repositories found",
            );
        });
    });

    describe("error cases", () => {
        it("should handle API errors", async () => {
            fetch.mockResolvedValueOnce(createApiResponse(false, null, 404));

            await expect(getRandomRepository("JavaScript")).rejects.toThrow(
                "HTTP error! status: 404",
            );
        });

        it("should handle network errors", async () => {
            fetch.mockRejectedValueOnce(new Error("Network error"));

            await expect(getRandomRepository("JavaScript")).rejects.toThrow(
                "Network error",
            );
        });

        it("should handle invalid JSON", async () => {
            fetch.mockResolvedValueOnce({
                ok: true,
                json: async () => {
                    throw new Error("Invalid JSON");
                },
            });

            await expect(getRandomRepository("JavaScript")).rejects.toThrow(
                "Invalid JSON",
            );
        });
    });
});
