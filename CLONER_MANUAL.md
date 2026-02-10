# Manual de Usuario: Clonador Web FastPage 2.0

Bienvenido al Clonador Web de FastPage 2.0, una herramienta diseñada para capturar, editar y publicar cualquier sitio web con facilidad.

## 1. Clonación de un Sitio
1. Accede a la sección **Clonador Web** desde el panel principal.
2. Ingresa la URL completa (incluyendo `https://`) del sitio que deseas clonar.
3. Haz clic en **"Clonar y Editar"**.
4. El sistema procesará el sitio, inyectará las herramientas de edición y te redirigirá al editor visual.

## 2. Editor Visual Pro
Una vez dentro del editor, puedes realizar las siguientes acciones:
- **Edición de Texto:** Haz clic en cualquier texto para modificar su contenido directamente.
- **Edición de Imágenes:** Haz clic en una imagen para abrir un diálogo que te permite cambiar su URL.
- **Estilos Rápidos:** Al seleccionar un elemento, aparecerá una barra flotante para cambiar el color, tamaño de fuente y fondo.
- **Vistas Responsivas:** Cambia entre vista de escritorio y móvil usando los iconos en la barra superior.
- **Guardado Automático:** El sistema guarda tus cambios automáticamente cada 15 segundos si detecta modificaciones.

## 3. Proceso de Publicación
Para poner tu página en línea:
1. Haz clic en el botón **"Publicar"** en la esquina superior derecha.
2. El sistema realizará una **Validación Pro** buscando:
   - Títulos y descripciones SEO faltantes.
   - Imágenes sin texto alternativo (alt).
   - Enlaces rotos o vacíos.
3. Se aplicará una **Optimización Automática**:
   - Minificación de HTML para carga rápida.
   - Inyección de etiquetas viewport para compatibilidad móvil.
   - Carga diferida (lazy loading) en imágenes.
   - Eliminación de scripts de edición innecesarios.
4. Al finalizar, recibirás una URL de previsualización y un reporte de optimización.

## 4. Configuración de Vercel (Producción)
Para habilitar el máximo rendimiento y el SDK Admin en producción (Vercel), debes configurar la cuenta de servicio de Firebase:

1. Ve al panel de tu proyecto en **Vercel**.
2. Entra en **Settings** > **Environment Variables**.
3. Añade una nueva variable:
   - **Key:** `FIREBASE_SERVICE_ACCOUNT_KEY`
   - **Value:** Pega aquí el contenido completo del archivo JSON de tu cuenta de servicio de Firebase (debe incluir `{ "type": "service_account", ... }`).
4. Haz clic en **Save**.
5. Realiza un nuevo despliegue (Redeploy) para que los cambios surtan efecto.

## 5. Solución de Problemas (FAQ)
- **Error de Credenciales:** Si ves un error de credenciales de Google Cloud, asegúrate de que el entorno tenga configuradas las llaves de Firebase Admin.
- **Sitio no se visualiza:** Algunos sitios bloquean la clonación mediante políticas de seguridad estrictas (CSP). El sistema intenta remover estas restricciones, pero en casos extremos, el sitio puede no verse igual al original.
- **Imágenes rotas:** Si las imágenes no cargan, verifica que la URL original sea accesible y no esté bloqueada por "hotlinking".

## 5. Herramientas Administrativas
El sistema incluye un endpoint de pruebas de rendimiento para desarrolladores:
- **Endpoint:** `/api/admin/performance`
- **Función:** Ejecuta una serie de pruebas automáticas contra sitios estáticos, dinámicos y complejos para verificar la velocidad de respuesta y la eficiencia de la optimización.

---
*FastPage 2.0 - Desarrollado con excelencia por Constructor Maestro.*
