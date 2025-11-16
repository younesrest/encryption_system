'use client';

import { useRef, useState } from 'react';
import { Upload, Lock, Unlock, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface FileUploaderProps {
  onFileSelect: (file: File) => void;
  mode: 'encrypt' | 'decrypt';
  isProcessing: boolean;
}

export function FileUploader({ onFileSelect, mode, isProcessing }: FileUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === 'dragenter' || e.type === 'dragover');
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setSelectedFile(file);
      onFileSelect(file);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      onFileSelect(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full">
      <Card
        className={`relative border-2 border-dashed transition-all cursor-pointer ${
          dragActive
            ? 'border-primary bg-primary/10'
            : 'border-border hover:border-primary/50'
        } ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
        onClick={handleClick}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div className="p-12 text-center">
          <div className="flex justify-center mb-4">
            {mode === 'encrypt' ? (
              <Lock className="w-12 h-12 text-primary" />
            ) : (
              <Unlock className="w-12 h-12 text-primary" />
            )}
          </div>

          <h3 className="text-lg font-semibold mb-2">
            {mode === 'encrypt' ? 'Selecciona archivo para encriptar' : 'Selecciona archivo para desencriptar'}
          </h3>
          <p className="text-muted-foreground mb-4">
            Arrastra el archivo aquí o haz clic para seleccionar
          </p>

          {selectedFile && (
            <div className="mt-4 p-3 bg-primary/10 rounded border border-primary/30">
              <p className="text-sm font-medium text-foreground">
                {selectedFile.name}
              </p>
              <p className="text-xs text-muted-foreground">
                {(selectedFile.size / 1024).toFixed(2)} KB
              </p>
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            onChange={handleChange}
            disabled={isProcessing}
          />
        </div>
      </Card>

      <div className="mt-4 flex gap-2 text-xs text-muted-foreground items-start">
        <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-accent" />
        <p>Los archivos se procesan localmente en tu navegador. Ningún archivo se sube a servidores.</p>
      </div>
    </div>
  );
}
