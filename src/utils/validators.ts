export const validateEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  const cleaned = phone.replace(/\D/g, '');
  return cleaned.length >= 10 && cleaned.length <= 15;
};

export const validateUrl = (url: string): boolean => {
  if (!url) return true; // Optional field
  try {
    // Add protocol if missing for validation
    const urlToTest = url.startsWith('http') ? url : `https://${url}`;
    new URL(urlToTest);
    return true;
  } catch {
    return false;
  }
};

export const validateDate = (dateString: string): boolean => {
  if (!dateString) return true;
  const date = new Date(dateString);
  return !isNaN(date.getTime());
};

export const validateRequired = (value: string): boolean => {
  return value.trim().length > 0;
};

export const validateMinLength = (value: string, minLength: number): boolean => {
  return value.trim().length >= minLength;
};

export const validateMaxLength = (value: string, maxLength: number): boolean => {
  return value.length <= maxLength;
};

export const validateFileSize = (file: File, maxSizeMB: number): boolean => {
  return file.size <= maxSizeMB * 1024 * 1024;
};

export const validateFileType = (file: File, allowedTypes: string[]): boolean => {
  return allowedTypes.includes(file.type);
};

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export const validateField = (
  value: string,
  rules: {
    required?: boolean;
    email?: boolean;
    phone?: boolean;
    url?: boolean;
    minLength?: number;
    maxLength?: number;
  }
): ValidationResult => {
  if (rules.required && !validateRequired(value)) {
    return { isValid: false, error: 'This field is required' };
  }

  if (rules.email && value && !validateEmail(value)) {
    return { isValid: false, error: 'Please enter a valid email address' };
  }

  if (rules.phone && value && !validatePhone(value)) {
    return { isValid: false, error: 'Please enter a valid phone number' };
  }

  if (rules.url && value && !validateUrl(value)) {
    return { isValid: false, error: 'Please enter a valid URL' };
  }

  if (rules.minLength && value && !validateMinLength(value, rules.minLength)) {
    return { isValid: false, error: `Minimum ${rules.minLength} characters required` };
  }

  if (rules.maxLength && !validateMaxLength(value, rules.maxLength)) {
    return { isValid: false, error: `Maximum ${rules.maxLength} characters allowed` };
  }

  return { isValid: true };
};
