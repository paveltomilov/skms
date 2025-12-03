export function doFirstLatterBig(word: string): string {
    if (!word || word.trim().length === 0) return '';
    const trimmedWord = word.trim();
    return trimmedWord.charAt(0).toUpperCase() + trimmedWord.slice(1).toLowerCase();
}
