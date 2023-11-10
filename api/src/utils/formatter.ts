export function formatString(value: string) {
  // Convert the string to lowercase and replace hyphens with spaces
  const firstFormat = value.toLowerCase().replace(/-/g, ' ');
  
  // Split the string into an array of words
  let words = firstFormat.split(' ');

  // Capitalize the first letter of each word
  words = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));

  // Join the words back into a single string
  const lastFormat = words.join(' ');

  return lastFormat;
}
