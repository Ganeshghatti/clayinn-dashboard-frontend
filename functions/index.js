export const capitalizeFirstLetter = (text) => {
  if (!text) return ""; // Handle empty string
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};
