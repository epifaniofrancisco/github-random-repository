import { loadLanguages } from "../../js/loadLanguages.js";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createApiResponse } from "../utils/apiHelpers.js";

describe("loadLanguages", () => {
    beforeEach(() => {
        global.fetch = vi.fn();
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    describe("successful cases", () => {
        it("should fetch and return languages data", async () => {
            const mockLanguages = [
                { value: "javascript", title: "JavaScript" },
                { value: "python", title: "Python" },
            ];

            fetch.mockResolvedValueOnce(createApiResponse(true, mockLanguages));

            const result = await loadLanguages();

            expect(result).toEqual(mockLanguages);
            expect(fetch).toHaveBeenCalledWith("./src/data/languages.json");
            expect(fetch).toHaveBeenCalledTimes(1);
        });

        it("should handle empty language list", async () => {
            fetch.mockResolvedValueOnce(createApiResponse(true, []));

            const result = await loadLanguages();

            expect(result).toEqual([]);
            expect(fetch).toHaveBeenCalledWith("./src/data/languages.json");
        });
    });

    describe("error cases", () => {
        it("should handle network errors", async () => {
            fetch.mockRejectedValueOnce(new Error("Network error"));

            const data = await loadLanguages();

            expect(data).toEqual([]);
        });

        it("should handle HTTP errors", async () => {
            fetch.mockResolvedValueOnce(createApiResponse(false, null, 404));

            const data = await loadLanguages();

            expect(data).toEqual([]);
        });

        it("should handle invalid JSON response", async () => {
            fetch.mockResolvedValueOnce({
                ok: true,
                json: () => Promise.reject(new Error("Invalid JSON")),
            });

            const data = await loadLanguages();

            expect(data).toEqual([]);
        });
    });
});
