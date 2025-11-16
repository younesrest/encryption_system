# Documentación Técnica

## Visión General

CryptoVault es una aplicación web de encriptación de archivos cliente-side con criptografía moderna implementada en TypeScript/Node.js.

## Arquitectura

### Componentes Principales

\`\`\`
┌─────────────────────────────────────────────────────┐
│                  React Frontend                      │
├─────────────────────────────────────────────────────┤
│                                                      │
│  ┌──────────────┐    ┌──────────────┐               │
│  │  Encryptor   │    │  Decryptor   │               │
│  │   Panel      │    │   Panel      │               │
│  └──────┬───────┘    └───────┬──────┘               │
│         │                    │                       │
│         └────────┬───────────┘                       │
│                  │                                   │
│         ┌────────▼──────────┐                       │
│         │  File Uploader    │                       │
│         │  & Validator      │                       │
│         └────────┬──────────┘                       │
│                  │                                   │
├─────────────────┼─────────────────────────────────┤
│                  │                                   │
│         ┌────────▼────────────┐                     │
│         │  Crypto Module      │                     │
│         │  (encryption.ts)    │                     │
│         └────────┬────────────┘                     │
│                  │                                   │
│         ┌────────▼────────────┐                     │
│         │  Node.js Crypto API │                     │
│         └─────────────────────┘                     │
│                                                      │
└─────────────────────────────────────────────────────┘
\`\`\`

## Módulos Clave

### 1. Módulo de Encriptación (`lib/encryption.ts`)

\`\`\`typescript
// Interfaz Pública
export async function encryptFile(
  fileBuffer: Buffer,
  password: string
): Promise<Buffer>

export async function decryptFile(
  encryptedBuffer: Buffer,
  password: string
): Promise<Buffer>

// Funciones Privadas (Internas)
async function deriveKey(
  password: string,
  salt: Buffer
): Promise<Buffer>
\`\`\`

#### Flujo de Encriptación

\`\`\`
Entrada: Buffer, Contraseña
   ↓
Salt = random(16 bytes)
   ↓
Key = PBKDF2(password, salt, 100k, SHA256)
   ↓
IV = random(12 bytes)
   ↓
Cipher = AES-256-GCM(key, iv)
   ↓
Encrypted = cipher.update(buffer) + cipher.final()
   ↓
AuthTag = cipher.getAuthTag()
   ↓
Salida: [Salt || IV || AuthTag || Encrypted]
\`\`\`

#### Flujo de Desencriptación

\`\`\`
Entrada: Buffer Encriptado, Contraseña
   ↓
Salt = buffer[0:16]
IV = buffer[16:28]
AuthTag = buffer[28:44]
Encrypted = buffer[44:]
   ↓
Key = PBKDF2(password, salt, 100k, SHA256)
   ↓
Decipher = AES-256-GCM(key, iv)
   ↓
decipher.setAuthTag(authTag)
   ↓
Decrypted = decipher.update(encrypted) + decipher.final()
   ↓
Salida: Buffer Original
\`\`\`

### 2. Módulo de Utilidades de Archivo (`lib/file-utils.ts`)

\`\`\`typescript
export function generateFilename(
  originalName: string,
  isEncrypted: boolean
): string

export function getFileExtension(filename: string): string

export function validateFileSize(size: number): boolean

export async function downloadFile(
  buffer: Buffer,
  filename: string
): Promise<void>
\`\`\`

### 3. Componentes React

#### EncryptorPanel.tsx
\`\`\`
Estado:
├─ file: File | null
├─ password: string
├─ isLoading: boolean
├─ error: string | null
└─ progress: number (0-100)

Métodos:
├─ handleFileSelect()
├─ handleEncrypt()
├─ handleReset()
└─ calculatePasswordStrength()
\`\`\`

#### DecryptorPanel.tsx
\`\`\`
Estado:
├─ file: File | null
├─ password: string
├─ isLoading: boolean
├─ error: string | null
└─ progress: number (0-100)

Métodos:
├─ handleFileSelect()
├─ handleDecrypt()
├─ validateEncryptedFile()
└─ handleReset()
\`\`\`

## Especificaciones de Seguridad

### Constantes Criptográficas

\`\`\`typescript
const ALGORITHM = 'aes-256-gcm'
const SALT_LENGTH = 16        // 128 bits
const TAG_LENGTH = 16         // 128 bits
const IV_LENGTH = 12          // 96 bits
const ITERATIONS = 100000     // PBKDF2
\`\`\`

### Matriz de Seguridad

| Componente | Estándar | Fuerza | Riesgo |
|-----------|----------|--------|--------|
| Encriptación | AES-256-GCM | 256-bit | Bajo |
| Derivación | PBKDF2-SHA256 | 100k iter | Bajo |
| Autenticación | GCM | 128-bit tag | Bajo |
| Random | crypto.randomBytes() | OS entropy | Bajo |

## Optimizaciones de Rendimiento

### Procesamiento de Archivos Grandes

\`\`\`typescript
// Para archivos > 100MB
// Implementar streaming en futuro

// Actualmente: Carga todo en memoria
const buffer = await file.arrayBuffer();

// Mejora: Procesar en chunks
async function encryptLargeFile(
  file: File,
  password: string,
  onProgress: (percent: number) => void
) {
  const CHUNK_SIZE = 1024 * 1024; // 1MB chunks
  // ... implementar lógica
}
\`\`\`

### Memoria

- Buffer de entrada: O(n) donde n = tamaño archivo
- Buffer de salida: O(n)
- Key derivation: O(1) + tiempo CPU
- Total: O(n) complejidad de espacio

### CPU

- PBKDF2: ~50-100ms (intencional, para seguridad)
- AES-256-GCM: ~0.5-1s por 100MB
- I/O de navegador: Variable

## Validaciones

### Entrada

\`\`\`typescript
// Archivo
✓ Debe ser File | Blob
✓ Tamaño máximo: 5GB (navegador limit)
✓ Tipo: Cualquiera (no validado)

// Contraseña
✓ Mínimo: 1 carácter (recomendación: 12+)
✓ Máximo: unlimited
✓ Caracteres: Cualquier UTF-8
\`\`\`

### Salida

\`\`\`typescript
// Archivo Encriptado
✓ Estructura: [Salt(16) | IV(12) | Tag(16) | Data]
✓ Tamaño mínimo: 44 bytes
✓ Validación: Auth tag en desencriptación

// Archivo Desencriptado
✓ Integridad: Validada por Auth tag
✓ Tamaño: Original (- 44 bytes header)
\`\`\`

## Manejo de Errores

### Categorías de Error

\`\`\`
Error de Entrada
├─ Archivo no cargado
├─ Contraseña no ingresada
├─ Archivo > límite
└─ Formato inválido

Error Criptográfico
├─ Contraseña incorrecta
├─ Archivo corrupto
├─ Auth tag inválido
└─ Derivación de clave fallida

Error de I/O
├─ Falla en lectura de archivo
├─ Falla en descarga
├─ Falta de memoria
└─ Timeout
\`\`\`

### Manejo Estratégico

\`\`\`typescript
try {
  const encryptedBuffer = await encryptFile(
    fileBuffer,
    password
  );
  await downloadFile(encryptedBuffer, filename);
} catch (error) {
  if (error instanceof Error) {
    if (error.message.includes('EINVAL')) {
      // Auth tag verification failed
      setError('Contraseña incorrecta');
    } else if (error.message.includes('ENOMEM')) {
      // Out of memory
      setError('Archivo demasiado grande');
    } else {
      // Generic error
      setError('Error al procesar: ' + error.message);
    }
  }
}
\`\`\`

## Pruebas

### Test Cases

\`\`\`javascript
// Test 1: Encriptación/Desencriptación Básica
const original = Buffer.from('Hello, World!');
const encrypted = await encryptFile(original, 'password123');
const decrypted = await decryptFile(encrypted, 'password123');
assert(original.equals(decrypted));

// Test 2: Contraseña Incorrecta
const encrypted = await encryptFile(original, 'password123');
try {
  await decryptFile(encrypted, 'wrongpassword');
  assert.fail('Should throw error');
} catch (error) {
  assert(error.message.includes('EEXCEP'));
}

// Test 3: Archivo Corrupto
const corrupted = Buffer.concat([
  crypto.randomBytes(44),
  corrupted data
]);
try {
  await decryptFile(corrupted, 'password123');
  assert.fail('Should throw error');
} catch (error) {
  assert(error.message.includes('EEXCEP'));
}

// Test 4: Archivos Grandes
const largeBuffer = Buffer.alloc(100 * 1024 * 1024);
const encrypted = await encryptFile(largeBuffer, 'password');
const decrypted = await decryptFile(encrypted, 'password');
assert(largeBuffer.equals(decrypted));
\`\`\`

## API Reference

### Función: `encryptFile()`

\`\`\`typescript
async function encryptFile(
  fileBuffer: Buffer,
  password: string
): Promise<Buffer>
\`\`\`

**Parámetros:**
- `fileBuffer` (Buffer): Contenido del archivo a encriptar
- `password` (string): Contraseña para encriptación

**Retorna:** Buffer con estructura [Salt|IV|AuthTag|EncryptedData]

**Lanza:** 
- Error si PBKDF2 falla
- Error si la encriptación falla

**Ejemplo:**
\`\`\`typescript
const file = await fs.readFile('document.pdf');
const encrypted = await encryptFile(file, 'miContraseña123!');
await fs.writeFile('document.pdf.encrypted', encrypted);
\`\`\`

### Función: `decryptFile()`

\`\`\`typescript
async function decryptFile(
  encryptedBuffer: Buffer,
  password: string
): Promise<Buffer>
\`\`\`

**Parámetros:**
- `encryptedBuffer` (Buffer): Archivo encriptado
- `password` (string): Contraseña de desencriptación

**Retorna:** Buffer con contenido original

**Lanza:**
- Error si auth tag es inválido (contraseña o archivo corrupto)
- Error si desencriptación falla
- Error si buffer está incompleto

**Ejemplo:**
\`\`\`typescript
const encrypted = await fs.readFile('document.pdf.encrypted');
try {
  const original = await decryptFile(encrypted, 'miContraseña123!');
  await fs.writeFile('document.pdf', original);
} catch (error) {
  console.error('Contraseña incorrecta o archivo corrupto');
}
\`\`\`

## Integración

### Con Backend (Futuro)

\`\`\`typescript
// API Endpoint para cloud sync
POST /api/encrypt
{
  file: File,
  password: string,
  userId: string
}

// Respuesta
{
  encryptedFileId: string,
  size: number,
  uploadedAt: ISO8601
}
\`\`\`

### Con CLI (Futuro)

\`\`\`bash
cryptovault encrypt document.pdf --password "myPassword123"
cryptovault decrypt document.pdf.encrypted --password "myPassword123"
\`\`\`

---

**Versión**: 1.0
**Última Actualización**: Noviembre 2024
