export const validateLoginCharacters = (value: string): Promise<void> => {
  if (value !== value.replace(/[^A-Za-z0-9_-]/g, '')) {
    return Promise.reject()
  }
  return Promise.resolve()
}

export const validateNameCharacters = (value: string): Promise<void> => {
  if (value !== value.replace(/[^A-Za-zА-Яа-я-]/g, '')) {
    return Promise.reject()
  }
  return Promise.resolve()
}

export const validateFirstLetterIsCapital = (value: string): Promise<void> => {
  if (value.charAt(0) !== value.charAt(0).toUpperCase()) {
    return Promise.reject()
  }
  return Promise.resolve()
}

export const validateOnlyNumbers = (value: string): Promise<void> => {
  if (!/^\d+$/.test(value)) {
    return Promise.reject()
  }
  return Promise.resolve()
}

export const validateNotOnlyNumbers = (value: string): Promise<void> => {
  if (/^\d+$/.test(value)) {
    return Promise.reject()
  }
  return Promise.resolve()
}

export const validateContainsNumber = (value: string): Promise<void> => {
  if (value === value.replace(/[0-9]/g, '')) {
    return Promise.reject()
  }
  return Promise.resolve()
}

export const validateContainsCapitalLetter = (value: string): Promise<void> => {
  if (value === value.toLowerCase()) {
    return Promise.reject()
  }
  return Promise.resolve()
}
