# Política de Seguridad

## Investigación de Vulnerabilidades

Si descubres una vulnerabilidad de seguridad, por favor NO la publiques públicamente. En su lugar:

1. Envía un correo a: security@cryptovault.dev
2. Incluye detalles técnicos de la vulnerabilidad
3. Proporciona pasos para reproducirla
4. Permite un plazo de 90 días para corrección

## Auditoría de Seguridad

Este proyecto ha sido diseñado siguiendo estándares de ciberseguridad:

- **Criptografía**: NIST standards (AES-256, PBKDF2)
- **No hay backend**: Elimina vectores de ataque de servidor
- **Código abierto**: Permite auditoría independiente
- **Datos locales**: Los datos nunca abandonan tu navegador

## Análisis de Riesgos

### Riesgos Mitigados

✓ Transmisión de datos - **Mitigado**: Sin conexiones a servidores
✓ Ataques de servidor - **Mitigado**: No hay servidor
✓ Fuerza bruta - **Mitigado**: PBKDF2 con 100k iteraciones
✓ Integridad de datos - **Mitigado**: GCM authentication tag

### Riesgos Residuales

⚠ Contraseña débil - Usuario debe elegir contraseña fuerte
⚠ Malware en cliente - Antivirus en máquina usuario
⚠ MITM en conexión - Usa HTTPS/TLS (Vercel proporciona)
⚠ Corrupción de archivo - Usuario debe hacer backups

## Buenas Prácticas

### Selección de Contraseña

\`\`\`
❌ Débil:    password123, qwerty, 12345678
⚠ Medio:    MyPassword2024!, Abc123Def456
✓ Fuerte:   GhK9#mP2@xL7!qR5vN8$tW3&bF4*jS
✓ Óptima:   Use passphrase + special chars
\`\`\`

### Gestión de Archivos Encriptados

\`\`\`
Antes de Encriptar:
├─ Backup del original
├─ Verifica tamaño del archivo
├─ Cierra otros programas (libera RAM)
└─ Genera contraseña fuerte

Después de Encriptar:
├─ Verifica que descarga completó
├─ Guarda archivo .encrypted en lugar seguro
├─ Almacena contraseña en gestor de contraseñas
└─ Elimina original (de forma segura)
\`\`\`

## Validación Criptográfica

### AES-256-GCM

\`\`\`
Características:
- Algoritmo simétrico de 256 bits
- Modo GCM = autenticación integrada
- Previene tampering de datos
- Estándar NIST SP 800-38D

Robustez: 2^256 combinaciones posibles
Tiempo estimado de fuerza bruta: > millones de años
\`\`\`

### PBKDF2-SHA256

\`\`\`
Configuración:
- Función pseudo-aleatoria: SHA256
- Iteraciones: 100,000
- Longitud de salt: 128 bits
- Longitud de clave: 256 bits

Tiempo de derivación: ~50-100ms por contraseña
Protección contra rainbow tables: Salt único por archivo
\`\`\`

## Recomendaciones de Implementación

### Para Usuarios

1. **Contraseña Fuerte**
   - Mínimo 16 caracteres
   - Incluir: MAYÚS, minús, números, símbolos
   - Usar passphrase (ej: "Mi*Gato#Azul@2024")

2. **Almacenamiento Seguro**
   - Gestores: 1Password, Bitwarden, KeePass
   - Guardar en device encriptado
   - No usar notas o documentos sin encriptar

3. **Máquina Limpia**
   - Antivirus actualizado
   - Software del sistema al día
   - No usar en computadoras compartidas

4. **Verificación**
   - Prueba con archivo de prueba primero
   - Verifica que desencriptación funciona
   - Comprueba integridad de archivo

### Para Desarrolladores

\`\`\`javascript
// Nunca expongas credenciales
❌ const password = "hardcoded_password";
✓ const password = getUserInput();

// Valida entrada de usuario
❌ await encryptFile(file, password);
✓ if (password.length >= 12) {
    await encryptFile(file, password);
  }

// No guardes contraseñas
❌ localStorage.setItem('password', password);
✓ // Solo en memoria durante sesión

// Limpia datos sensibles
✓ password = null;
✓ fileBuffer = null; // Después de procesar
\`\`\`

## Cumplimiento Normativo

### GDPR (Protección de Datos)

✓ No recopila datos personales
✓ Procesamiento local = bajo riesgo
✓ Usuario controla completamente sus datos
✓ Sin transferencias internacionales

### NIST Cybersecurity Framework

✓ **Identificar**: Catálogo de activos (archivos)
✓ **Proteger**: AES-256-GCM + PBKDF2
✓ **Detectar**: Verificación de integridad (Auth Tag)
✓ **Responder**: Error handling robusto
✓ **Recuperar**: Siempre puedes desencriptar si tienes contraseña

## Actualizaciones de Seguridad

Este proyecto se mantiene actualizado con:
- Parches de Node.js crypto
- Actualizaciones de Next.js
- Mejoras en criptografía
- Correcciones de vulnerabilidades

Subscríbete a alertas de seguridad en GitHub.

## Testing de Seguridad

### Pruebas Realizadas

- [x] Fuerza bruta de contraseña (10 millones de intentos/segundo)
- [x] Integridad de datos (modificación de bytes)
- [x] Formato de archivo (deserialización)
- [x] Memory leaks (Tools de profiling)
- [x] Inyección XSS (Validación de input)

### Resultados

Todos los tests pasados ✓

---

**Versión de Documento**: 1.0
**Última Actualización**: Noviembre 2024
