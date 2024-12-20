import { beforeEach, describe, it, expect, vi } from "vitest";
import { getRandomRepository } from '../../js/getRandomRepository';

describe('getRandomRepository', () => {
    beforeEach(() => {
        global.fetch = vi.fn();
    });

    it('should return a random repository when the API call is successful', async () => {
        const mockRepositories = [
            { id: 1, name: 'repo1' },
            { id: 2, name: 'repo2' },
            { id: 3, name: 'repo3' },
        ];
        const mockResponse = {
            ok: true,
            json: async () => ({ items: mockRepositories }),
        };

        global.fetch.mockResolvedValueOnce(mockResponse);

        const repository = await getRandomRepository('javascript');
        expect(mockRepositories).toContain(repository);
    });

    it('should throw an error when the API call fails', async () => {
        const mockResponse = {
            ok: false,
            status: 500,
        };

        global.fetch.mockResolvedValueOnce(mockResponse);

        await expect(getRandomRepository('javascript')).rejects.toThrow('HTTP error! status: 500');
    });

    it('should throw an error when no repositories are found', async () => {
        const mockResponse = {
            ok: true,
            json: async () => ({ items: [] }),
        };

        global.fetch.mockResolvedValueOnce(mockResponse);

        await expect(getRandomRepository('javascript')).rejects.toThrow('No repositories found');
    });

    it('should log an error and rethrow it when an exception occurs', async () => {
        const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
        const mockError = new Error('Network error');

        global.fetch.mockRejectedValueOnce(mockError);

        await expect(getRandomRepository('javascript')).rejects.toThrow('Network error');
        expect(consoleErrorSpy).toHaveBeenCalledWith('Error fetching repository:', mockError);

        consoleErrorSpy.mockRestore();
    });
});