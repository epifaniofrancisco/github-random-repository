export const createApiResponse = (ok = true, data = null, status = 200) => ({
    ok,
    status,
    json: async () => data,
});

export const mockFetch = (vi) => {
    global.fetch = vi.fn();
    return fetch;
};
