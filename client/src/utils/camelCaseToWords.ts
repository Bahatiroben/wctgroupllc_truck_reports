export const camelCaseToWords = (input: string): string => {
    // Split the input string by capital letters or underscores
    const words = input.split(/(?=[A-Z])|_|(?<=[a-z])(?=[A-Z])/);
  
    // Convert each word to title case
    const titleCasedWords = words.map(word => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    });
  
    return titleCasedWords.join(' ');
  }