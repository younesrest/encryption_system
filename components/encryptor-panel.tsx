'use client';

import { useState } from 'react';
import { Download, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { FileUploader } from './file-uploader';
import { PasswordInput } from './password-input';
import { formatFileSize, generateEncryptedFilename } from '@/lib/file-utils';
import { encryptFile } from '@/lib/encryption';

export function EncryptorPanel() {
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const [encryptedFile, setEncryptedFile] = useState<{ buffer: ArrayBuffer; name: string } | null>(null);

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
    setError('');
    setEncryptedFile(null);
  };

  const handleEncrypt = async () => {
    if (!file || !password) {
      setError('Por favor selecciona un archivo e ingresa una contraseña');
      return;
    }

    if (password.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres');
      return;
    }

    setIsProcessing(true);
    setError('');

    try {
      const fileBuffer = await file.arrayBuffer();
      const encrypted = await encryptFile(Buffer.from(fileBuffer), password);
      
      const encryptedFileName = generateEncryptedFilename(file.name);
      setEncryptedFile({
        buffer: encrypted.buffer,
        name: encryptedFileName,
      });
    } catch (err) {
      setError('Error al encriptar el archivo. Por favor intenta de nuevo.');
      console.error('Encryption error:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!encryptedFile) return;

    const blob = new Blob([encryptedFile.buffer]);
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = encryptedFile.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Encriptar Archivo</h2>
        <p className="text-muted-foreground">Encripta tus archivos con AES-256-GCM</p>
      </div>

      <FileUploader onFileSelect={handleFileSelect} mode="encrypt" isProcessing={isProcessing} />

      <div className="space-y-2">
        <label className="text-sm font-medium">Contraseña de Encriptación</label>
        <PasswordInput
          value={password}
          onChange={setPassword}
          placeholder="Ingresa una contraseña segura (mín. 8 caracteres)"
          disabled={isProcessing}
        />
      </div>

      {file && (
        <Card className="p-4 bg-card/50 border-border">
          <div className="text-sm space-y-2">
            <p className="text-muted-foreground">
              <span className="font-medium text-foreground">Archivo:</span> {file.name}
            </p>
            <p className="text-muted-foreground">
              <span className="font-medium text-foreground">Tamaño:</span> {formatFileSize(file.size)}
            </p>
          </div>
        </Card>
      )}

      {error && (
        <div className="p-4 bg-destructive/10 border border-destructive rounded">
          <p className="text-destructive text-sm">{error}</p>
        </div>
      )}

      {encryptedFile && (
        <Card className="p-4 bg-primary/10 border border-primary/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground mb-1">Archivo encriptado exitosamente</p>
              <p className="text-xs text-muted-foreground">{encryptedFile.name}</p>
            </div>
            <Button onClick={handleDownload} size="sm" className="gap-2">
              <Download className="w-4 h-4" />
              Descargar
            </Button>
          </div>
        </Card>
      )}

      <Button
        onClick={handleEncrypt}
        disabled={!file || !password || isProcessing}
        className="w-full"
        size="lg"
      >
        {isProcessing ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin mr-2" />
            Encriptando...
          </>
        ) : (
          'Encriptar Archivo'
        )}
      </Button>
    </div>
  );
}
