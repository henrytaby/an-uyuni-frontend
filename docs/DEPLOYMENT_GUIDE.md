# 🚀 Guía de Despliegue en Producción (VPS / Ubuntu + Nginx)

Esta guía detalla los pasos para desplegar **UyuniAdmin** en un servidor Linux (Ubuntu/Debian) utilizando **Nginx** como servidor web de alto rendimiento.

---

## 📋 1. Requisitos Previos

Asegúrate de tener instalado en tu VPS:
*   **Node.js** (v20+ recomendado): Para construir la aplicación.
*   **Git**: Para clonar el código.
*   **Nginx**: Para servir los archivos estáticos.

```bash
# Actualizar sistema e instalar Nginx/Git
sudo apt update
sudo apt install nginx git -y

# Instalar Node.js (v20 LTS)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
```

---

## 🏗️ 2. Instalación y Construcción (Build)

Para generar la versión optimizada de producción, necesitamos las herramientas de desarrollo (Angular CLI).

> ⚠️ **Nota importante sobre `npm install --omit=dev`**:
> En proyectos Frontend como Angular, **NO** debemos usar `--omit=dev` para la fase de construcción, ya que el comando `ng build` reside en las `devDependencies`. Esa bandera es útil solo para backends (Node.js API).

### Pasos paso a paso:

1.  **Clonar el repositorio**:
    ```bash
    git clone https://github.com/tu-usuario/an-uyuni-frontend.git
    cd an-uyuni-frontend
    ```

2.  **Instalar dependencias completas**:
    ```bash
    npm install
    # Necesitamos instalar TODO para tener acceso al Angular CLI
    ```

3.  **Configurar entorno**:
    Crea tu archivo de configuración real.
    ```bash
    cp public/assets/config/config.example.json public/assets/config/config.json
    nano public/assets/config/config.json
    # Edita tus URLs de producción aquí
    ```

4.  **Ejecutar Build de Producción**:
    ```bash
    npm run build
    ```
    *   Este comando ejecuta `ng build`, que por defecto en Angular v17+:
        *   ✅ Minifica el código (Tree-shaking).
        *   ✅ Optimiza los assets.
        *   ✅ Genera nombres con hash para caché (Cache-busting).

    **Resultado**: Los archivos listos para producción estarán en `dist/ng-uyuniadmin/browser/`.

---

## 🌐 3. Configuración de Nginx (Con Compresión y SPA)

Nginx servirá los archivos estáticos y manejará la compresión Gzip para máxima velocidad.

1.  **Crear configuración del sitio**:
    ```bash
    sudo nano /etc/nginx/sites-available/uyuni-frontend
    ```

2.  **Pegar el siguiente contenido**:

    ```nginx
    server {
        listen 80;
        server_name tu-dominio.com www.tu-dominio.com; # 👈 Cambiar esto
        
        root /var/www/an-uyuni-frontend/dist/ng-uyuniadmin/browser; # 👈 Ruta a tu carpeta dist
        index index.html;

        # 🚀 Compresión Gzip (Optimización)
        gzip on;
        gzip_vary on;
        gzip_min_length 10240;
        gzip_proxied expired no-cache no-store private auth;
        gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml application/javascript;
        gzip_disable "MSIE [1-6]\.";

        location / {
            # 🔄 Redirección para SPA (Single Page Application)
            # Si no encuentra el archivo, sirve index.html para que Angular maneje la ruta
            try_files $uri $uri/ /index.html;
        }

        # Caché agresivo para assets estáticos (JS, CSS, Imágenes)
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
            expires 1y;
            add_header Cache-Control "public, no-transform";
        }

        # No cachear nunca index.html y config.json para recibir actualizaciones al instante
        location ~* (index\.html|config\.json)$ {
            add_header Cache-Control "no-cache, no-store, must-revalidate";
            expires 0;
        }
    }
    ```

3.  **Activar el sitio**:
    ```bash
    sudo ln -s /etc/nginx/sites-available/uyuni-frontend /etc/nginx/sites-enabled/
    sudo nginx -t # Verificar sintaxis
    sudo systemctl restart nginx
    ```

---

## 🔄 4. Actualización (Flujo de Deploy)

Cada vez que quieras subir cambios:

```bash
cd /ruta/a/tu/proyecto
git pull origin main
npm install # Por si cambiaron dependencias
npm run build
# No es necesario reiniciar Nginx, los archivos se sirven al instante
```
