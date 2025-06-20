export function getUserInitials(name: string | null | undefined): string {
  if (!name || typeof name !== 'string') return '';
  
  const cleanName = name.trim();
  if (!cleanName) return '';

  const nameParts = cleanName.split(/\s+/).filter(Boolean);

  if (nameParts.length >= 2) {
    return (
      nameParts[0][0] + 
      nameParts[1][0]
    ).toLowerCase();
  }

  if (nameParts[0].length >= 2) {
    return nameParts[0].substring(0, 2).toLowerCase();
  }

  return nameParts[0].toLowerCase();
}