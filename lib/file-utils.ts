export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

export function getFileExtension(filename: string): string {
  const parts = filename.split('.');
  return parts.length > 1 ? parts[parts.length - 1].toUpperCase() : 'FILE';
}

export function generateEncryptedFilename(originalName: string): string {
  return `${originalName.split('.')[0]}.encrypted`;
}

export function generateDecryptedFilename(encryptedName: string): string {
  if (encryptedName.endsWith('.encrypted')) {
    return encryptedName.replace('.encrypted', '');
  }
  return `decrypted_${encryptedName}`;
}
