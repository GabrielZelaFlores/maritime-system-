# Sistema de Gestion de Embarcaciones

Proyecto del Laboratorio 04 de Ingenieria Web. El sitio fue construido con Hugo Framework sin tema externo y simula un sistema de gestion maritima para embarcaciones, posiciones, zonas, alertas e incidentes SAR del contexto peruano.

## Estructura de carpetas

```text
maritime-system/
|-- content/              # Paginas de seccion del sitio
|-- data/                 # Data Files YAML usados por los templates
|-- layouts/              # Layouts Hugo, parciales y shortcodes
|-- static/css/           # Estilos personalizados
|-- static/js/            # Busqueda cliente de embarcaciones
|-- Dockerfile            # Imagen para ejecutar Hugo en contenedor
|-- docker-compose.yml    # Servicio local para desarrollo
|-- hugo.toml             # Configuracion principal
`-- README.md
```

## Comandos para ejecutar

```bash
hugo server -D
hugo
```

El primer comando levanta el servidor local de desarrollo. El segundo genera el sitio estatico en `public/`.

## Ejecucion con Docker

Si no se tiene Hugo instalado en la maquina, se puede ejecutar el sitio con Docker:

```bash
docker compose up --build
```

Luego abrir:

```text
http://localhost:1313/
```

Para detener el contenedor:

```bash
docker compose down
```

Tambien se puede construir y ejecutar la imagen manualmente:

```bash
docker build -t maritime-system .
docker run --rm -p 1313:1313 -v "${PWD}:/src" maritime-system
```

## Caracteristicas implementadas

- Menu principal en espanol para Inicio, Embarcaciones, Alertas, Zonas, Incidentes SAR y Acerca de.
- Pagina de inicio con metricas generales del sistema.
- Listado de mas de 10 embarcaciones para demostrar paginacion.
- Posiciones actuales asociadas a cada embarcacion.
- Separacion de alertas activas y resueltas con badges por prioridad.
- Visualizacion de zonas maritimas y sus coordenadas.
- Separacion de incidentes SAR en curso y resueltos.
- Pagina Acerca de con objetivo, equipo y tecnologias.
- CSS propio y JavaScript simple del lado cliente.

## Archivos YAML

- `embarcaciones.yaml`: contiene identificador, nombre, tipo, bandera, estado, fecha y caracteristicas de cada nave.
- `posiciones.yaml`: contiene ubicacion, velocidad, rumbo y timestamp asociados a cada embarcacion.
- `zonas.yaml`: define zonas maritimas, tipo, descripcion y lista de coordenadas.
- `alertas.yaml`: registra alertas por embarcacion, tipo, descripcion, fecha, estado y prioridad.
- `incidentes_sar.yaml`: modela incidentes de busqueda y rescate con fechas, estado, coordenadas, recursos y personas rescatadas.

## Busqueda, paginacion y shortcode

La busqueda de embarcaciones se ejecuta en el navegador con `static/js/embarcaciones.js`, filtrando las tarjetas visibles por nombre o tipo. La paginacion se implementa con el paginador de Hugo en `layouts/embarcaciones/list.html`, mostrando 10 embarcaciones por pagina.

El shortcode personalizado `layouts/shortcodes/info-card.html` se usa en la pagina Acerca de para mostrar una tarjeta informativa reutilizable.

## Capturas para el informe

- Inicio funcionando.
- Pagina de embarcaciones.
- Busqueda por nombre o tipo.
- Paginacion.
- Alertas.
- Zonas.
- Incidentes SAR.
- Pagina Acerca de.
- Commits importantes.
