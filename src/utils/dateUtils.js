export const formatDate = (dateValue) => {
  if (!dateValue || dateValue === '0' || dateValue === 0 || dateValue === '' || dateValue === null || dateValue === undefined) {
    return '';
  }
  
  let date;
  
  // Si c'est un timestamp (nombre)
  if (!isNaN(dateValue)) {
    const numericTimestamp = parseInt(dateValue);
    if (numericTimestamp === 0) return '';
    date = new Date(numericTimestamp);
  } else {
    // Si c'est une string ISO
    date = new Date(dateValue);
  }
  
  if (isNaN(date.getTime()) || date.getFullYear() === 1970) {
    return '';
  }
  
  return date.toLocaleDateString('fr-FR');
};