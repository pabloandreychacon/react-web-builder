export const sanitizeInput = (input: string): string => {
  return input
    .replace(/[<>]/g, '')
    .trim()
    .slice(0, 5000);
};

export const sanitizeEmail = (email: string): string => {
  return email.toLowerCase().trim().slice(0, 254);
};
