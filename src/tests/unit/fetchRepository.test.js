import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { fetchRepository } from "../../js/fetchRepository.js";
import {
    createApiResponse,
    createMockRepository,
} from "../utils/testUtils.js";

describe("fetchRepository", () => {
    const selectedLanguage = "JavaScript";

    beforeEach(() => {
        global.fetch = vi.fn();
        fetch.mockReset();
    });

    afterEach(() => {
        fetch.mockRestore();
    });

    describe("input validation", () => {
        it('should throw error for "Select a Language"', async () => {
            await expect(fetchRepository("Select a Language")).rejects.toThrow(
                "Please select a language",
            );
        });

        it("should throw error for empty language", async () => {
            await expect(fetchRepository("")).rejects.toThrow(
                "Error fetching repository",
            );
        });
    });

    describe("successful fetches", () => {
        it("should return repository for valid language", async () => {
            const mockRepo = createMockRepository();
            
            fetch.mockResolvedValueOnce(createApiResponse(true, { items: [mockRepo] }));

            const repository = await fetchRepository(selectedLanguage);

            expect(repository).toEqual(mockRepo);
            expect(fetch).toHaveBeenCalledWith(
                expect.stringContaining(`language:${selectedLanguage}`),
            );
        });

        it("should handle empty repository list", async () => {
            fetch.mockResolvedValueOnce(createApiResponse(true, { items: [] }));

            await expect(fetchRepository(selectedLanguage)).rejects.toThrow(
                "No repositories found",
            );
        });
    });

    
    describe("error handling", () => {
        it("should handle HTTP errors", async () => {
            fetch.mockResolvedValueOnce(createApiResponse(false));

            await expect(fetchRepository(selectedLanguage)).rejects.toThrow(
                "Error fetching repository",
            );
        });

        it("should handle network errors", async () => {
            fetch.mockRejectedValueOnce(new Error("Network error"));

            await expect(fetchRepository(selectedLanguage)).rejects.toThrow(
                "Error fetching repository",
            );
        });

        it("should handle invalid JSON response", async () => {
            fetch.mockResolvedValueOnce({
                ok: true,
                json: async () => {
                    throw new Error("Invalid JSON");
                },
            });

            await expect(fetchRepository(selectedLanguage)).rejects.toThrow(
                "Error fetching repository",
            );
        });
    });
});

