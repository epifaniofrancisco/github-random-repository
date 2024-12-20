import { loadLanguages } from "../../js/loadLanguages.js";
import { expect, test, vi } from "vitest";

global.fetch = vi.fn(() =>
    Promise.resolve({
        ok: true,
        json: () =>
            Promise.resolve([{ value: "javascript", title: "JavaScript" }]),
    }),
);

test("loadLanguages fetches and returns data", async () => {
    const data = await loadLanguages();
    expect(data).toEqual([{ value: "javascript", title: "JavaScript" }]);
});

test("loadLanguages handles fetch error", async () => {
    fetch.mockImplementationOnce(() => Promise.reject(new Error(("API is down"))));
    const data = await loadLanguages();
    expect(data).toEqual([]);
});
