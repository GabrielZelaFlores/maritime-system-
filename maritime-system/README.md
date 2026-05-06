# 🌊 Maritime System

Sistema web marítimo desarrollado con Hugo y ejecutado mediante Docker.

---

## Ejecución rápida

```bash
git clone https://github.com/GabrielZelaFlores/maritime-system-.git
cd maritime-system
docker compose up
```

Luego abrir en el navegador:

```
http://localhost:1313
```

---

## Requisitos

Antes de ejecutar el proyecto, asegúrate de tener instalado:

- Docker Desktop (obligatorio)

## Pasos detallados

### 1. Clonar el repositorio

````

---

### 2. Entrar a la carpeta del proyecto

```bash
cd maritime-system
````

---

### 3. Ejecutar el sistema

Este comando:

- Construye la imagen
- Inicia el contenedor
- Levanta el servidor web

---

### 4. Abrir en el navegador

Ir a:

```
http://localhost:1313
```

---

### 5. Detener el sistema

Presionar:

```
CTRL + C
```

o ejecutar en otra terminal:

```bash
docker compose down
```

---

## Problemas comunes

### Docker no está iniciado

Solución:

- Abrir Docker Desktop
- Esperar que esté en estado "Running"

---

### El puerto 1313 está en uso

Solución:
Editar el archivo `docker-compose.yml`:

```yaml
ports:
  - "1314:1313"
```

Luego abrir:

```
http://localhost:1314
```

---

## 🛠️ Tecnologías utilizadas

- Hugo (generador de sitios estáticos)
- Docker (contenedores)

---

## Estructura del proyecto

- `content/` → contenido del sitio
- `layouts/` → vistas
- `static/` → archivos CSS y JS
- `hugo.toml` → configuración

---

```bash
docker compose up
```

```bash
git clone https://github.com/GabrielZelaFlores/maritime-system-.git

```
