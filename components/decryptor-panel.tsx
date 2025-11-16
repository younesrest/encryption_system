'use client';

import { useState } from 'react';
import { Download, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { FileUploader } from './file-uploader';
import { PasswordInput } from './password-input';
import { formatFileSize, generateDecryptedFilename } from '@/lib/file-utils';
import { decryptFile } from '@/lib/encryption';

export function DecryptorPanel() {
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const [decryptedFile, setDecryptedFile] = useState<{ buffer: ArrayBuffer; name: string } | null>(null);

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
    setError('');
    setDecryptedFile(null);
  };

  const handleDecrypt = async () => {
    if (!file || !password) {
      setError('Por favor selecciona un archivo e ingresa la contraseña');
      return;
    }

    setIsProcessing(true);
    setError('');

    try {
      const fileBuffer = await file.arrayBuffer();
      const decrypted = await decryptFile(Buffer.from(fileBuffer), password);
      
      const decryptedFileName = generateDecryptedFilename(file.name);
      setDecryptedFile({
        buffer: decrypted.buffer,
        name: decryptedFileName,
      });
    } catch (err) {
      setError('Error al desencriptar. La contraseña puede ser incorrecta o el archivo está dañado.');
      console.error('Decryption error:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!decryptedFile) return;

    const blob = new Blob([decryptedFile.buffer]);
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = decryptedFile.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Desencriptar Archivo</h2>
        <p className="text-muted-foreground">Desencripta tus archivos protegidos</p>
      </div>

      <FileUploader onFileSelect={handleFileSelect} mode="decrypt" isProcessing={isProcessing} />

      <div className="space-y-2">
        <label className="text-sm font-medium">Contraseña de Desencriptación</label>
        <PasswordInput
          value={password}
          onChange={setPassword}
          placeholder="Ingresa la contraseña para desencriptar"
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

      {decryptedFile && (
        <Card className="p-4 bg-primary/10 border border-primary/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground mb-1">Archivo desencriptado exitosamente</p>
              <p className="text-xs text-muted-foreground">{decryptedFile.name}</p>
            </div>
            <Button onClick={handleDownload} size="sm" className="gap-2">
              <Download className="w-4 h-4" />
              Descargar
            </Button>
          </div>
        </Card>
      )}

      <Button
        onClick={handleDecrypt}
        disabled={!file || !password || isProcessing}
        className="w-full"
        size="lg"
      >
        {isProcessing ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin mr-2" />
            Desencriptando...
          </>
        ) : (
          'Desencriptar Archivo'
        )}
      </Button>
    </div>
  );
}
