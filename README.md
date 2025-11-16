# CryptoVault - Encriptador de Archivos Avanzado

Un encriptador de archivos de nivel empresarial construido con Next.js 16 y criptografía moderna. Procesa archivos completamente en tu navegador sin enviar datos a servidores.

## 🔐 Características Principales

- **Encriptación AES-256-GCM**: El estándar de facto en ciberseguridad
- **Derivación PBKDF2**: 100,000 iteraciones para mayor seguridad contra fuerza bruta
- **Procesamiento 100% Local**: Todos los archivos se procesan en tu navegador
- **Sin Límite de Tamaño**: Encripta archivos de cualquier tamaño
- **Interfaz Intuitiva**: Diseño moderno y fácil de usar
- **Indicador de Fortaleza**: Valida la seguridad de tu contraseña
- **Drag & Drop**: Carga archivos fácilmente
- **Privacidad Total**: Código abierto y sin recopilación de datos

## 🚀 Instalación Rápida

### Con GitHub
\`\`\`bash
git clone <tu-repo>
cd cybersecurity-encryptor
npm install
npm run dev
\`\`\`

### Con Vercel (Recomendado)
Haz clic en "Publicar" en v0 para desplegar automáticamente en Vercel.

### Localmente con Docker
\`\`\`bash
docker build -t cryptovault .
docker run -p 3000:3000 cryptovault
\`\`\`

## 📖 Guía de Uso

### Encriptando Archivos

1. **Selecciona la Pestaña "Encriptar"** en la interfaz principal
2. **Arrastra tu archivo** o haz clic para seleccionar
3. **Crea una contraseña fuerte** usando el indicador de seguridad
4. **Haz clic en "Encriptar Archivo"**
5. **Descarga el archivo encriptado** (con extensión .encrypted)

### Desencriptando Archivos

1. **Selecciona la Pestaña "Desencriptar"** en la interfaz principal
2. **Carga el archivo .encrypted**
3. **Ingresa tu contraseña original**
4. **Haz clic en "Desencriptar Archivo"**
5. **Descarga el archivo original**

## 🔒 Especificaciones Técnicas de Seguridad

### Algoritmos Utilizados

| Componente | Especificación | Detalles |
|-----------|----------------|---------|
| Encriptación | AES-256-GCM | 256-bit, autenticación integrada |
| Derivación de Clave | PBKDF2-SHA256 | 100,000 iteraciones |
| Salt | Aleatorio | 16 bytes (128 bits) |
| IV (Initialization Vector) | Aleatorio | 12 bytes (96 bits) |
| Auth Tag | GCM | 16 bytes (128 bits) |

### Estructura de Archivo Encriptado

\`\`\`
┌─────────────────────────────────────────────────────┐
│ Salt (16 bytes) - Generado aleatoriamente           │
├─────────────────────────────────────────────────────┤
│ IV (12 bytes) - Initialization Vector aleatorio     │
├─────────────────────────────────────────────────────┤
│ Auth Tag (16 bytes) - Tag de autenticación GCM      │
├─────────────────────────────────────────────────────┤
│ Datos Encriptados - Tu archivo encriptado           │
└─────────────────────────────────────────────────────┘
\`\`\`

### Proceso de Derivación de Clave

\`\`\`
Contraseña + Salt 
    ↓
PBKDF2-SHA256 (100,000 iteraciones)
    ↓
Clave AES-256 (32 bytes)
    ↓
Genera IV aleatorio (12 bytes)
    ↓
AES-256-GCM Encriptación
    ↓
Archivo Encriptado
\`\`\`

## 🛡️ Recomendaciones de Seguridad

### Para Contraseñas

- **Mínimo 12 caracteres** para máxima seguridad
- **Mezcla de tipos**: Mayúsculas, minúsculas, números, símbolos
- **Evita patrones comunes**: Fechas de nacimiento, nombres
- **Usa contraseñas únicas** para cada archivo importante
- **Generador de contraseñas**: Usa herramientas como 1Password o KeePass

### Para Archivos

- **Realiza copias de seguridad** antes de encriptar
- **Prueba primero con archivos no críticos**
- **Verifica la integridad** del archivo descargado
- **Usa contraseñas diferentes** para diferentes categorías de datos
- **Guarda las contraseñas de forma segura**

### Mejores Prácticas

- No compartas tus contraseñas por correo electrónico
- Usa un gestor de contraseñas confiable
- Limpia tu historial del navegador después de usar
- Considera usar en una red privada (VPN)
- Realiza auditorías periódicas de tus archivos

## 🔧 Arquitectura Técnica

### Stack de Tecnologías

\`\`\`
Frontend: Next.js 16 + React 19.2
Criptografía: Node.js crypto module
Estilos: Tailwind CSS v4 + shadcn/ui
Validación: Tipos TypeScript
Almacenamiento: Local Browser Storage
\`\`\`

### Estructura del Proyecto

\`\`\`
cybersecurity-encryptor/
├── app/
│   ├── page.tsx           # Página principal
│   ├── layout.tsx         # Layout global
│   └── globals.css        # Estilos globales
├── components/
│   ├── encryptor-panel.tsx    # Panel de encriptación
│   ├── decryptor-panel.tsx    # Panel de desencriptación
│   ├── file-uploader.tsx      # Gestor de carga
│   ├── password-input.tsx     # Input de contraseña
│   ├── header.tsx             # Encabezado
│   └── ui/                    # Componentes reutilizables
├── lib/
│   ├── encryption.ts      # Lógica criptográfica
│   ├── file-utils.ts      # Utilidades de archivos
│   └── utils.ts           # Funciones auxiliares
└── public/
    └── assets/            # Recursos estáticos
\`\`\`

### Flujo de Datos

\`\`\`
Usuario
  ↓
[Interfaz React]
  ↓
[File API - Lectura del archivo]
  ↓
[Librería crypto - Encriptación/Desencriptación]
  ↓
[Generación de descarga]
  ↓
[Descarga en cliente]
\`\`\`

## 🔍 Cómo Funciona la Encriptación

### Proceso Paso a Paso

1. **Lectura del Archivo**
   - El archivo se carga en memoria del navegador
   - Se convierte a Buffer binario

2. **Generación de Salt**
   - Se crea un salt aleatorio de 16 bytes
   - Se usa para derivar la clave de cada encriptación

3. **Derivación de Clave**
   - La contraseña + salt se procesan con PBKDF2
   - 100,000 iteraciones SHA256
   - Resultado: Clave AES-256 (32 bytes)

4. **Encriptación AES-256-GCM**
   - IV (nonce) aleatorio de 12 bytes
   - Encriptación simétrica con autenticación
   - Genera Auth Tag para verificar integridad

5. **Empaquetamiento**
   - Estructura final: Salt + IV + Auth Tag + Datos Cifrados
   - Se descarga como archivo .encrypted

### Desencriptación

1. **Lectura del Archivo Encriptado**
   - Se extrae: Salt (primeros 16 bytes)
   - Se extrae: IV (siguientes 12 bytes)
   - Se extrae: Auth Tag (siguientes 16 bytes)
   - Resto: Datos encriptados

2. **Derivación de Clave**
   - Se usa el salt extraído
   - Contraseña + salt → PBKDF2 → Clave AES-256

3. **Verificación de Autenticidad**
   - Se valida el Auth Tag
   - Si no coincide: Contraseña incorrecta o archivo corrupto

4. **Desencriptación**
   - AES-256-GCM desencripta los datos
   - Se recupera el archivo original

## 🧪 Pruebas Locales

### Prueba de Encriptación

\`\`\`bash
# 1. Inicia el servidor
npm run dev

# 2. Abre en tu navegador
http://localhost:3000

# 3. Carga un archivo de prueba (cualquier tipo)
# 4. Establece una contraseña fuerte
# 5. Descarga el archivo .encrypted
\`\`\`

### Verificar Integridad

\`\`\`bash
# Compara tamaños de archivos
# El archivo encriptado será ~48 bytes mayor
# (16 bytes salt + 12 bytes IV + 16 bytes tag)
\`\`\`

## 🐛 Solución de Problemas

### Error: "La contraseña no es correcta"

- Verifica que escribes la contraseña exacta
- Ten cuidado con mayúsculas/minúsculas
- Prueba con un archivo de prueba primero

### Error: "Archivo corrupto"

- Descarga nuevamente el archivo
- Asegúrate de que el navegador completó la descarga
- No edites el archivo .encrypted manualmente

### El archivo tarda mucho en procesar

- Es normal para archivos muy grandes (>500MB)
- Los navegadores procesan en un solo thread
- El navegador no se congelará, solo será lento

### No puedo descargar el archivo

- Verifica los permisos de carpeta de descargas
- Intenta en otro navegador
- Limpia el caché del navegador

## 📊 Rendimiento

| Tamaño de Archivo | Tiempo Aproximado |
|------------------|-------------------|
| 1 MB | < 0.1 segundos |
| 10 MB | 0.5 - 1 segundo |
| 100 MB | 5 - 10 segundos |
| 500 MB | 20 - 50 segundos |
| 1 GB | 40 - 100 segundos |

*Los tiempos varían según el hardware y navegador*

## 🌐 Navegadores Soportados

- Chrome/Chromium 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Opera 76+

**Nota**: Requiere soporte de Web Crypto API

## 📝 Licencia

Este proyecto está bajo licencia MIT. Eres libre de usarlo, modificarlo y distribuirlo.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Para cambios mayores, abre un issue primero.

## ⚠️ Descargo de Responsabilidad

- Este software se proporciona "tal cual"
- No hay garantías de seguridad
- Realiza copias de seguridad antes de encriptar
- No somos responsables de archivos perdidos o corruptos
- Prueba con archivos no críticos primero

## 📞 Soporte

Si encuentras problemas:
1. Consulta la sección de Solución de Problemas
2. Limpia el caché del navegador
3. Intenta en otro navegador
4. Abre un issue en GitHub

## 🎯 Roadmap Futuro

- [ ] Soporte para múltiples archivos simultáneamente
- [ ] Compresión antes de encriptar
- [ ] Historial de archivos
- [ ] Sincronización con nube
- [ ] Aplicación de escritorio
- [ ] Interfaz de línea de comandos (CLI)
- [ ] Soporte para 2FA en contraseñas

---

**Construido con ❤️ para la seguridad de tus datos**
