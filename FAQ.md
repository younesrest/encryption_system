# Preguntas Frecuentes (FAQ)

## Seguridad

### ¿Es realmente seguro este encriptador?

Sí. Usamos AES-256-GCM (estándar militar) y PBKDF2 con 100,000 iteraciones. Es el mismo nivel de seguridad que bancos y gobiernos usan. La única forma de descifrar es teniendo la contraseña correcta.

### ¿Qué tan segura debe ser mi contraseña?

Mínimo 12 caracteres. Ideal: 16+ caracteres con mayúsculas, minúsculas, números y símbolos. 

Ejemplos:
- ❌ Débil: "password123"
- ✓ Fuerte: "Gato#Azul@2024!Xp9"
- ✓ Óptima: "Mi*Perro#Bebe$Cafe-Todos-Los&Dias"

### ¿Puede alguien hackearme si envío el archivo?

No. El archivo encriptado es inútil sin la contraseña. Puedes enviarlo por cualquier medio (email, internet, USB) con total seguridad.

### ¿Se guardan mis archivos o contraseña en los servidores?

No. Todo sucede en tu navegador. No hay servidores almacenando nada. Tu privacidad es total.

### ¿Qué pasa si olvido la contraseña?

No hay forma de recuperarla. La encriptación es "irreversible" sin la contraseña correcta. Por eso es importante:
- Guardarla en un gestor de contraseñas
- Hacer copia de seguridad en lugar seguro
- Usar contraseña que recuerdes (o clave única)

### ¿Puede el navegador ser hackeado?

Es posible (aunque raro). Por eso:
- Mantén tu navegador actualizado
- Usa antivirus
- No uses computadoras públicas
- Usa VPN si es posible

## Técnico

### ¿Funciona sin conexión a internet?

Sí. Una vez cargada la página, funciona completamente offline. Incluso puedes desactivar Wi-Fi después de cargar.

### ¿Qué navegadores soporta?

Chrome, Firefox, Safari, Edge, Opera (versiones recientes). Necesitan soporte de Web Crypto API.

### ¿Hay límite de tamaño de archivo?

Técnicamente no, pero el navegador tiene límites de memoria. Típicamente puedes manejar archivos hasta 1-2GB dependiendo de tu RAM.

### ¿Por qué tarda tanto con archivos grandes?

AES-256-GCM es seguro pero intensivo en CPU. Es intencional para mayor seguridad. No te preocupes, el navegador no se congelará.

### ¿Puedo desencriptar en otro navegador o dispositivo?

Sí. El archivo encriptado tiene toda la información. Solo necesitas el navegador y la contraseña. Funciona en Windows, Mac, Linux, iOS, Android.

### ¿El archivo .encrypted se puede editar o corromper?

No debería. Si cambias un byte, fallará la verificación de autenticación. Cópialo sin editar.

## Funcionalidad

### ¿Puedo encriptar múltiples archivos a la vez?

Actualmente no. Próxima versión lo permitirá. Por ahora, hazlo uno a uno.

### ¿Puedo compresionar antes de encriptar?

No está integrado, pero puedes:
1. Comprimir con WinRAR/7-Zip
2. Luego encriptar el .zip o .rar

### ¿Se preservan las propiedades del archivo (fecha, permisos)?

No. El archivo resultante es binario puro. Los metadatos no se preservan.

### ¿Puedo renombrar el archivo .encrypted?

Sí, puedes ponerle cualquier nombre. La extensión .encrypted es solo una convención.

### ¿Qué pasa si un archivo es muy pequeño?

Funciona normalmente. Un archivo vacío se encripta perfectamente.

## Uso

### ¿Cómo desencripto si olvidé la extensión?

No importa. Simplemente cárgalo como "Desencriptar archivo". Detectamos por contenido.

### ¿Puedo usar la misma contraseña para múltiples archivos?

Sí, funciona. Pero recomendamos contraseñas únicas para máxima seguridad.

### ¿Qué hago con el archivo original después de encriptar?

Puedes:
- Guardarlo en lugar seguro como backup
- Eliminarlo (recomendado para máxima seguridad)
- Borrar de forma segura (no solo eliminar)

### ¿El navegador guarda el historial de archivos?

No automáticamente. Pero tu sistema operativo sí guarda:
- Historial de descargas
- Archivos temporales
- Caché del navegador

Para máxima privacidad, borra estos después de usar.

### ¿Puedo usar esto para crear un contenedor de archivo encriptado?

Sí, técnicamente. Aunque hay herramientas especializadas como VeraCrypt que son mejores para eso.

## Comparación

### ¿Cómo compara con VeraCrypt, BitLocker, etc.?

| Característica | CryptoVault | VeraCrypt | BitLocker |
|---|---|---|---|
| Encriptación | AES-256-GCM | AES-256-XTS | AES-256 |
| Plataforma | Web (cualquiera) | Desktop | Windows |
| Complejidad | Simple | Intermedia | Simple |
| Rendimiento | Navegador | Nativo | SO integrado |
| Tipo de uso | Archivos sueltos | Volúmenes | Disco completo |

**Resumen**: CryptoVault es más fácil para archivos individuales. VeraCrypt para contenedores. BitLocker para discos completos.

### ¿Por qué no usar GPG?

GPG es poderoso pero complejo. CryptoVault es más simple. Elige según tus necesidades.

## Problemas y Soluciones

### Mi archivo se corrompió después de desencriptar

Posibles causas:
1. Contraseña incorrecta (verifica mayúsculas)
2. Archivo corrupto durante descarga
3. Problema de navegador

Soluciones:
1. Intenta de nuevo con contraseña exacta
2. Intenta en otro navegador
3. Descarga archivos en otro lugar
4. Limpia caché del navegador

### El archivo no desencripta pero la contraseña es correcta

1. Verifica que sea archivo .encrypted válido
2. Asegúrate de que se descargó completamente
3. Intenta en otro navegador o dispositivo
4. Copia el archivo de forma segura (no emails con validación de contenido)

### El navegador se cuelga con archivos grandes

Normal. Déjalo procesando. Los navegadores modernos no se congelan completamente, solo se ponen lentos.

Consejos:
- Cierra otros tabs
- Reinicia navegador
- Intenta en dispositivo más potente
- Espera pacientemente

### No aparece la opción de descargar

1. Espera a que termina la encriptación
2. Verifica que tu navegador permita descargas
3. Comprueba espacio en disco
4. Intenta con archivo más pequeño primero

---

**¿Tienes más preguntas?** Abre un issue en GitHub o contacta en el sitio web.
