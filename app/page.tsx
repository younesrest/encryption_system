'use client';

import { useState } from 'react';
import { Zap, Lock, Unlock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Header } from '@/components/header';
import { EncryptorPanel } from '@/components/encryptor-panel';
import { DecryptorPanel } from '@/components/decryptor-panel';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'encrypt' | 'decrypt'>('encrypt');

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Panel Principal */}
          <div className="lg:col-span-2">
            <div className="mb-8">
              <div className="flex gap-2 border border-border rounded-lg p-1 bg-card/50">
                <Button
                  variant={activeTab === 'encrypt' ? 'default' : 'ghost'}
                  onClick={() => setActiveTab('encrypt')}
                  className="flex-1 gap-2"
                >
                  <Lock className="w-4 h-4" />
                  Encriptar
                </Button>
                <Button
                  variant={activeTab === 'decrypt' ? 'default' : 'ghost'}
                  onClick={() => setActiveTab('decrypt')}
                  className="flex-1 gap-2"
                >
                  <Unlock className="w-4 h-4" />
                  Desencriptar
                </Button>
              </div>
            </div>

            <Card className="p-8 border-border">
              {activeTab === 'encrypt' ? <EncryptorPanel /> : <DecryptorPanel />}
            </Card>
          </div>

          {/* Panel de Información */}
          <div className="space-y-4">
            <Card className="p-6 border-border bg-card/50">
              <div className="flex gap-3 mb-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Zap className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Características</h3>
                </div>
              </div>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex gap-2">
                  <span className="text-primary font-bold">✓</span>
                  <span>Encriptación AES-256-GCM</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary font-bold">✓</span>
                  <span>Derivación PBKDF2 (100k iteraciones)</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary font-bold">✓</span>
                  <span>Procesamiento local</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary font-bold">✓</span>
                  <span>Sin límite de tamaño de archivo</span>
                </li>
              </ul>
            </Card>

            <Card className="p-6 border-border bg-accent/5">
              <h3 className="font-semibold text-foreground mb-3">Consejos de Seguridad</h3>
              <ul className="space-y-2 text-xs text-muted-foreground">
                <li>• Usa contraseñas fuertes y únicas</li>
                <li>• Guarda tus contraseñas en lugar seguro</li>
                <li>• Verifica que archivos sean correctos antes de encriptar</li>
                <li>• Copia de seguridad de archivos importantes</li>
              </ul>
            </Card>

            <Card className="p-6 border-border">
              <h3 className="font-semibold text-foreground mb-2">Privacidad</h3>
              <p className="text-xs text-muted-foreground">
                Todos los archivos se procesan completamente en tu navegador. No se envía datos a servidores.
              </p>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
