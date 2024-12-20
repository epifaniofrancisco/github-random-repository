import { beforeEach, describe, it, expect, vi } from "vitest";
import { fetchAndDisplayRepository } from '../../js/fetchAndDisplayRepository';
import { getRandomRepository } from '../../js/getRandomRepository';

vi.mock('../../js/getRandomRepository');

describe('fetchAndDisplayRepository', () => {
    let repoResult;
    let buttonResults;

    beforeEach(() => {
        repoResult = { textContent: '', style: { backgroundColor: '' } };
        buttonResults = { style: { backgroundColor: '' } };
    });

    it('should display a message when no language is selected', async () => {
        await fetchAndDisplayRepository('selectalanguage', repoResult, buttonResults);
        expect(repoResult.textContent).toBe('Please select a language');
    });

    it('should display repository details when a language is selected', async () => {
        const mockRepository = {
            full_name: 'mock/repo',
            description: 'Mock repository description',
            html_url: 'https://github.com/mock/repo',
        };
        getRandomRepository.mockResolvedValue(mockRepository);

        await fetchAndDisplayRepository('javascript', repoResult, buttonResults);

        expect(repoResult.textContent).toBe(
            `Repository: ${mockRepository.full_name}\nDescription: ${mockRepository.description}\nURL: ${mockRepository.html_url}`
        );
        expect(repoResult.style.backgroundColor).toBe('#e5e7eb');
        expect(buttonResults.style.backgroundColor).toBe('#000');
    });

    it('should display an error message when fetching repository fails', async () => {
        getRandomRepository.mockRejectedValue(new Error('Network error'));

        await fetchAndDisplayRepository('javascript', repoResult, buttonResults);

        expect(repoResult.textContent).toBe('Error fetching repository');
        expect(repoResult.style.backgroundColor).toBe('#fecaca');
        expect(buttonResults.style.backgroundColor).toBe('#ef4444');
    });
});