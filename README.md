# Exposición - Hugo Framework: Sistema de Gestión de Embarcaciones

**Universidad La Salle**  
Facultad de Ingenierías y Arquitectura  
Departamento Académico de Ingeniería y Matemáticas  
Carrera Profesional de Ingeniería de Software  
Ingeniería Web

---

## Integrantes del Grupo

| Estudiantes                  | Correo                     |
| ---------------------------- | -------------------------- |
| Juan Jose Huamani Vásquez    | jhuamaniv@ulasalle.edu.pe  |
| Roger Nolly Chacalla Herrera | rchacallah@ulasalle.edu.pe |
| Melvin Yabar Carazas         | myabarc@ulasalle.edu.pe    |
| Gabriel Frank Zela Flores    | gzelaf@ulasalle.edu.pe     |

---

## Índice

1. [Equipos, materiales y temas](#1-equipos-materiales-y-temas)
2. [Directorio de trabajo](#2-directorio-de-trabajo)
3. [Marco teórico](#3-marco-teórico)
4. [Documentación](#4-documentación)
5. [Ejemplo de una Aplicación Web: Sistema de Gestión de Embarcaciones](#5-ejemplo-de-una-aplicación-web-sistema-de-gestión-de-embarcaciones)
6. [Referencias](#6-referencias)

---

## 1. Equipos, materiales y temas

- Sistema Operativo (GNU/Linux de preferencia)
- Editor de texto (VS Code, Vim, Sublime, etc.)
- Hugo Framework (versión 0.120.0 o superior)
- Git
- Cuenta en GitHub con el correo institucional
- Go (Golang) versión 1.21 o superior (opcional para desarrollo de shortcodes personalizados)

---

## 2. Directorio de trabajo

Cree su directorio de trabajo.

Luego, diríjase a este directorio, para clonar o sincronizar su repositorio y continuar sus prácticas.

```bash
# Creando directorio de trabajo local
$ mkdir -p $HOME/maritime-system/
```

```bash
# Dirigiéndonos al directorio de trabajo local
$ cd $HOME/maritime-system/
```

### Clonando

```bash
# Clonando repositorio GitHub
$ git clone https://github.com/GabrielZelaFlores/iw.git
```

### Sincronizando

```bash
# Sincronizando repositorio local con repositorio GitHub
$ cd $HOME/GabrielZelaFlores/iw
$ git pull
```

```bash
# Creando directorio para este laboratorio
$ mkdir -p $HOME/GabrielZelaFlores/iw/lab05/maritime-system/
```

Siempre evalúe utilizar el archivo `.gitignore` para no considerar algunos archivos innecesarios sobre todo para el repositorio GitHub.

```bash
# Creando .gitignore
$ vim $HOME/GabrielZelaFlores/iw/lab05/.gitignore
```

**Ejemplo de .gitignore para Hugo:**

```
# Hugo files
/public/
/resources/_gen/
.hugo_build.lock

# OS files
.DS_Store
Thumbs.db

# Editor files
.vscode/
.idea/
*.swp
*.swo
*~
```

---

## 3. Marco teórico

### 3.1. Hugo Framework

Hugo es un generador de sitios estáticos (Static Site Generator - SSG) escrito en Go. Es conocido por su velocidad excepcional y su facilidad de uso. A diferencia de sistemas de gestión de contenido tradicionales como WordPress o frameworks de aplicaciones web como Django, Hugo genera sitios web completamente estáticos que no requieren una base de datos en tiempo de ejecución.

**Características principales:**

- **Velocidad**: Hugo puede generar miles de páginas en segundos
- **Flexibilidad**: Soporte para múltiples formatos de contenido (Markdown, HTML, JSON, YAML)
- **Taxonomías**: Sistema flexible para categorizar contenido
- **Plantillas**: Sistema de plantillas potente basado en Go templates
- **Data Files**: Capacidad de usar archivos de datos externos (JSON, YAML, TOML)
- **Shortcodes**: Fragmentos de código reutilizables
- **Multilenguaje**: Soporte nativo para sitios multiidioma

### 3.2. Instalación de Hugo

#### 3.2.1. Instalación en GNU/Linux

Para instalar Hugo en sistemas basados en Debian/Ubuntu:

```bash
$ sudo apt-get update
$ sudo apt-get install hugo
```

Para instalación manual con la versión extendida (recomendada):

```bash
$ wget https://github.com/gohugoio/hugo/releases/download/v0.120.0/hugo_extended_0.120.0_linux-amd64.deb
$ sudo dpkg -i hugo_extended_0.120.0_linux-amd64.deb
```

#### 3.2.2. Instalación en MacOS

```bash
$ brew install hugo
```

#### 3.2.3. Instalación en Windows

```bash
C:\> choco install hugo-extended
```

#### 3.2.4. Verificar instalación

```bash
$ hugo version
```

### 3.3. Conceptos básicos de Hugo

#### 3.3.1. Estructura de directorios

Un proyecto Hugo tiene la siguiente estructura:

```
mi-sitio/
├── archetypes/     # Plantillas para nuevo contenido
├── assets/         # Archivos a procesar (SCSS, JS, etc.)
├── content/        # Archivos de contenido (Markdown)
├── data/           # Archivos de datos (JSON, YAML, TOML)
├── layouts/        # Plantillas HTML
├── static/         # Archivos estáticos (imágenes, CSS, JS)
├── themes/         # Temas
└── hugo.toml     # Configuración del sitio
```

#### 3.3.2. Front Matter

El Front Matter es metadata que se coloca al inicio de cada archivo de contenido:

```yaml
---
title: "Mi Primer Post"
date: 2025-10-01T10:00:00-05:00
draft: false
tags: ["hugo", "tutorial"]
---
```

#### 3.3.3. Data Files

Hugo permite usar archivos de datos en formato JSON, YAML o TOML almacenados en el directorio `data/`. Estos archivos pueden representar información estructurada similar a una base de datos.

---

## 4. Documentación

Siga la documentación oficial de Hugo para familiarizarse con los conceptos básicos:

- [https://gohugo.io/getting-started/quick-start/](https://gohugo.io/getting-started/quick-start/)
- [https://gohugo.io/templates/introduction/](https://gohugo.io/templates/introduction/)
- [https://gohugo.io/templates/data-templates/](https://gohugo.io/templates/data-templates/)

---

## 5. Ejemplo de una Aplicación Web: Sistema de Gestión de Embarcaciones

### 5.1. Hugo - Sistema Marítimo

El siguiente ejemplo implementa un sistema de información para la gestión de embarcaciones usando Hugo como generador de sitios estáticos. Utilizaremos **Data Files** para simular una base de datos.

### 5.2. Modelo de datos: Diagrama E-R

El modelo de datos de esta versión está conformado por 5 entidades:

```
┌─────────────────┐         ┌─────────────────┐
│   Embarcacion   │─────────│    Posicion     │
│─────────────────│    1:N  │─────────────────│
│ id              │         │ id              │
│ nombre          │         │ embarcacion_id  │
│ tipo            │         │ latitud         │
│ bandera         │         │ longitud        │
│ estado          │         │ velocidad       │
│ fecha_creacion  │         │ rumbo           │
└─────────────────┘         │ timestamp       │
        │                   └─────────────────┘
        │ 1:N
        │
        ▼
┌─────────────────┐         ┌─────────────────┐
│     Alerta      │         │      Zona       │
│─────────────────│         │─────────────────│
│ id              │         │ id              │
│ embarcacion_id  │         │ nombre          │
│ tipo            │         │ tipo            │
│ descripcion     │         │ descripcion     │
│ fecha           │         │ coordenadas     │
│ estado          │         └─────────────────┘
└─────────────────┘

┌─────────────────┐
│  IncidenteSAR   │
│─────────────────│
│ id              │
│ embarcacion_id  │
│ tipo_incidente  │
│ descripcion     │
│ fecha_inicio    │
│ fecha_fin       │
│ estado          │
│ coordenadas     │
└─────────────────┘
```

### 5.3. Diccionario de datos

#### Embarcacion

El archivo `embarcacion` almacena los datos de las embarcaciones registradas en el sistema.

| Campo          | Tipo     | Descripción                                     |
| -------------- | -------- | ----------------------------------------------- |
| id             | string   | Identificador único de la embarcación           |
| nombre         | string   | Nombre de la embarcación                        |
| tipo           | string   | Tipo (Pesquero, Carga, Pasajeros, Naval)        |
| bandera        | string   | País de registro                                |
| estado         | string   | Estado actual (Activo, Inactivo, Mantenimiento) |
| fecha_creacion | datetime | Fecha de registro en el sistema                 |

#### Posicion

El archivo `posicion` registra la ubicación geográfica de una embarcación.

| Campo          | Tipo     | Descripción                        |
| -------------- | -------- | ---------------------------------- |
| id             | string   | Identificador único de la posición |
| embarcacion_id | string   | Referencia a embarcación           |
| latitud        | float    | Latitud en grados decimales        |
| longitud       | float    | Longitud en grados decimales       |
| velocidad      | float    | Velocidad en nudos                 |
| rumbo          | int      | Rumbo en grados (0-360)            |
| timestamp      | datetime | Fecha y hora del registro          |

#### Zona

El archivo `zona` define áreas marítimas de interés.

| Campo       | Tipo   | Descripción                                    |
| ----------- | ------ | ---------------------------------------------- |
| id          | string | Identificador único de la zona                 |
| nombre      | string | Nombre de la zona marítima                     |
| tipo        | string | Tipo (Reserva, Pesca, Navegación, Restringida) |
| descripcion | string | Descripción detallada                          |
| coordenadas | array  | Coordenadas del polígono                       |

#### Alerta

El archivo `alerta` gestiona alertas asociadas a embarcaciones.

| Campo          | Tipo     | Descripción                                      |
| -------------- | -------- | ------------------------------------------------ |
| id             | string   | Identificador único de la alerta                 |
| embarcacion_id | string   | Referencia a embarcación                         |
| tipo           | string   | Tipo de alerta (Colisión, Clima, Zona, Mecánica) |
| descripcion    | string   | Descripción de la alerta                         |
| fecha          | datetime | Fecha y hora de la alerta                        |
| estado         | string   | Estado (Activa, Resuelta, Cancelada)             |

#### IncidenteSAR

El archivo `incidente_sar` registra incidentes de búsqueda y rescate (Search and Rescue).

| Campo          | Tipo     | Descripción                                  |
| -------------- | -------- | -------------------------------------------- |
| id             | string   | Identificador único del incidente            |
| embarcacion_id | string   | Referencia a embarcación (opcional)          |
| tipo_incidente | string   | Tipo (Hundimiento, Incendio, Colisión, etc.) |
| descripcion    | string   | Descripción detallada del incidente          |
| fecha_inicio   | datetime | Fecha y hora de inicio                       |
| fecha_fin      | datetime | Fecha y hora de finalización                 |
| estado         | string   | Estado (En curso, Resuelto, Cancelado)       |
| coordenadas    | object   | Latitud y longitud del incidente             |

### 5.4. Creando un sitio Hugo

Diríjase al directorio de trabajo:

```bash
# Ubicándose en el directorio de trabajo
$ cd $HOME/GabrielZelaFlores/iw/lab05/
```

Crear un nuevo sitio Hugo:

```bash
# Creando sitio Hugo
$ hugo new site maritime-system
$ cd maritime-system
```

### 5.5. Estructura del proyecto

Después de crear el sitio, la estructura será:

```
maritime-system/
├── archetypes/
├── assets/
├── content/
├── data/
├── layouts/
├── static/
├── themes/
└── hugo.toml
```

### 5.6. Configuración del sitio

Edite el archivo de configuración `hugo.toml`:

```bash
$ vim hugo.toml
```

**hugo.toml:**

```toml
baseURL = "http://localhost:1313/"
locale = "es-PE"
defaultContentLanguage = "es"
title = "Sistema de Gestión de Embarcaciones"
disableKinds = ["taxonomy", "term"]

[params]
  description = "Plataforma estática para monitoreo marítimo, alertas, zonas e incidentes SAR en el litoral peruano."

[pagination]
  pagerSize = 10

[[menus.main]]
  name = "Inicio"
  pageRef = "/"
  weight = 10

[[menus.main]]
  name = "Embarcaciones"
  pageRef = "/embarcaciones"
  weight = 20

[[menus.main]]
  name = "Alertas"
  pageRef = "/alertas"
  weight = 30

[[menus.main]]
  name = "Zonas"
  pageRef = "/zonas"
  weight = 40

[[menus.main]]
  name = "Incidentes SAR"
  pageRef = "/incidentes"
  weight = 50

[[menus.main]]
  name = "Acerca de"
  pageRef = "/acerca"
  weight = 60
```

### 5.7. Creando archivos de datos

Hugo utiliza archivos en el directorio `data/` para almacenar información estructurada.

#### 5.7.1. Archivo de Embarcaciones

```bash
# Creando archivo de datos para embarcaciones
$ mkdir -p data
$ vim data/embarcaciones.yaml
```

**data/embarcaciones.yaml:**

```yaml
- id: EMB-001
  nombre: BAP Rio Pisco
  tipo: Patrullera maritima
  bandera: Peru
  estado: Operativa
  fecha_creacion: 2024-01-12
  caracteristicas:
    tripulacion: 28
    eslora_m: 55
    capacidad_toneladas: 420
    puerto_base: Callao
- id: EMB-002
  nombre: Humboldt I
  tipo: Investigacion oceanografica
  bandera: Peru
  estado: En mision
  fecha_creacion: 2024-02-03
  caracteristicas:
    tripulacion: 34
    eslora_m: 76
    capacidad_toneladas: 980
    puerto_base: Callao
- id: EMB-003
  nombre: Virgen de Chapi
  tipo: Pesquera industrial
  bandera: Peru
  estado: Operativa
  fecha_creacion: 2024-02-18
  caracteristicas:
    tripulacion: 19
    eslora_m: 42
    capacidad_toneladas: 360
    puerto_base: Chimbote
- id: EMB-004
  nombre: Pacifico Norte
  tipo: Carguero costero
  bandera: Peru
  estado: En puerto
  fecha_creacion: 2024-03-05
  caracteristicas:
    tripulacion: 22
    eslora_m: 88
    capacidad_toneladas: 2100
    puerto_base: Paita
- id: EMB-005
  nombre: Santa Rosa de Lima
  tipo: Transporte logistico
  bandera: Peru
  estado: Mantenimiento
  fecha_creacion: 2024-03-19
  caracteristicas:
    tripulacion: 16
    eslora_m: 63
    capacidad_toneladas: 760
    puerto_base: Callao
- id: EMB-006
  nombre: Tumbes Explorer
  tipo: Turismo maritimo
  bandera: Peru
  estado: Operativa
  fecha_creacion: 2024-04-08
  caracteristicas:
    tripulacion: 8
    eslora_m: 24
    capacidad_toneladas: 55
    puerto_base: Zorritos
- id: EMB-007
  nombre: Chancay Trader
  tipo: Carguero portuario
  bandera: Peru
  estado: En transito
  fecha_creacion: 2024-04-22
  caracteristicas:
    tripulacion: 26
    eslora_m: 102
    capacidad_toneladas: 3400
    puerto_base: Chancay
- id: EMB-008
  nombre: Paracas Guard
  tipo: Patrullera ambiental
  bandera: Peru
  estado: En mision
  fecha_creacion: 2024-05-10
  caracteristicas:
    tripulacion: 12
    eslora_m: 32
    capacidad_toneladas: 120
    puerto_base: Pisco
- id: EMB-009
  nombre: Ilo Mar
  tipo: Remolcador
  bandera: Peru
  estado: Operativa
  fecha_creacion: 2024-06-02
  caracteristicas:
    tripulacion: 10
    eslora_m: 29
    capacidad_toneladas: 95
    puerto_base: Ilo
- id: EMB-010
  nombre: Nazca Azul
  tipo: Pesquera artesanal
  bandera: Peru
  estado: En faena
  fecha_creacion: 2024-06-17
  caracteristicas:
    tripulacion: 6
    eslora_m: 16
    capacidad_toneladas: 18
    puerto_base: San Andres
- id: EMB-011
  nombre: Sechura II
  tipo: Pesquera industrial
  bandera: Peru
  estado: Operativa
  fecha_creacion: 2024-07-04
  caracteristicas:
    tripulacion: 21
    eslora_m: 47
    capacidad_toneladas: 410
    puerto_base: Bayovar
- id: EMB-012
  nombre: Callao Rescue
  tipo: Unidad SAR
  bandera: Peru
  estado: En emergencia
  fecha_creacion: 2024-07-21
  caracteristicas:
    tripulacion: 14
    eslora_m: 35
    capacidad_toneladas: 140
    puerto_base: Callao
```

#### 5.7.2. Archivo de Posiciones

```bash
$ vim data/posiciones.yaml
```

**data/posiciones.yaml:**

```yaml
- id: POS-001
  embarcacion_id: EMB-001
  latitud: -12.0602
  longitud: -77.2134
  velocidad: 18.4
  rumbo: 285
  timestamp: 2026-05-05T08:20:00-05:00
- id: POS-002
  embarcacion_id: EMB-002
  latitud: -12.3721
  longitud: -77.5168
  velocidad: 11.2
  rumbo: 198
  timestamp: 2026-05-05T08:25:00-05:00
- id: POS-003
  embarcacion_id: EMB-003
  latitud: -9.0635
  longitud: -78.7594
  velocidad: 8.6
  rumbo: 242
  timestamp: 2026-05-05T08:18:00-05:00
- id: POS-004
  embarcacion_id: EMB-004
  latitud: -5.0820
  longitud: -81.1615
  velocidad: 0
  rumbo: 0
  timestamp: 2026-05-05T08:10:00-05:00
- id: POS-005
  embarcacion_id: EMB-005
  latitud: -12.0464
  longitud: -77.1469
  velocidad: 0
  rumbo: 0
  timestamp: 2026-05-05T08:05:00-05:00
- id: POS-006
  embarcacion_id: EMB-006
  latitud: -3.6698
  longitud: -80.7793
  velocidad: 12.1
  rumbo: 320
  timestamp: 2026-05-05T08:30:00-05:00
- id: POS-007
  embarcacion_id: EMB-007
  latitud: -11.5754
  longitud: -77.5242
  velocidad: 14.8
  rumbo: 176
  timestamp: 2026-05-05T08:24:00-05:00
- id: POS-008
  embarcacion_id: EMB-008
  latitud: -13.8379
  longitud: -76.4235
  velocidad: 16.3
  rumbo: 205
  timestamp: 2026-05-05T08:27:00-05:00
- id: POS-009
  embarcacion_id: EMB-009
  latitud: -17.6448
  longitud: -71.3708
  velocidad: 6.7
  rumbo: 91
  timestamp: 2026-05-05T08:22:00-05:00
- id: POS-010
  embarcacion_id: EMB-010
  latitud: -13.7434
  longitud: -76.5341
  velocidad: 7.4
  rumbo: 260
  timestamp: 2026-05-05T08:16:00-05:00
- id: POS-011
  embarcacion_id: EMB-011
  latitud: -5.7569
  longitud: -81.1662
  velocidad: 9.9
  rumbo: 230
  timestamp: 2026-05-05T08:21:00-05:00
- id: POS-012
  embarcacion_id: EMB-012
  latitud: -12.2032
  longitud: -77.3811
  velocidad: 22.5
  rumbo: 251
  timestamp: 2026-05-05T08:29:00-05:00
```

#### 5.7.3. Archivo de Zonas

```bash
$ vim data/zonas.yaml
```

**data/zonas.yaml:**

```yaml
- id: ZON-001
  nombre: Bahia del Callao
  tipo: Control portuario
  descripcion: Area de alta densidad de trafico para ingreso y salida del principal puerto peruano.
  coordenadas:
    - latitud: -12.0000
      longitud: -77.2500
    - latitud: -12.0900
      longitud: -77.2500
    - latitud: -12.0900
      longitud: -77.1200
    - latitud: -12.0000
      longitud: -77.1200
- id: ZON-002
  nombre: Reserva Nacional de Paracas
  tipo: Proteccion ambiental
  descripcion: Zona sensible para control de navegacion, pesca y turismo cerca de areas naturales protegidas.
  coordenadas:
    - latitud: -13.7100
      longitud: -76.5200
    - latitud: -13.9300
      longitud: -76.5200
    - latitud: -13.9300
      longitud: -76.2000
    - latitud: -13.7100
      longitud: -76.2000
- id: ZON-003
  nombre: Corredor Chimbote
  tipo: Pesca industrial
  descripcion: Franja de seguimiento para embarcaciones anchoveteras y apoyo logistico.
  coordenadas:
    - latitud: -8.9500
      longitud: -78.9500
    - latitud: -9.2800
      longitud: -78.9500
    - latitud: -9.2800
      longitud: -78.5200
    - latitud: -8.9500
      longitud: -78.5200
- id: ZON-004
  nombre: Aproximacion a Paita
  tipo: Navegacion comercial
  descripcion: Area de aproximacion para cargueros y naves de cabotaje del norte del Peru.
  coordenadas:
    - latitud: -4.9600
      longitud: -81.2500
    - latitud: -5.1800
      longitud: -81.2500
    - latitud: -5.1800
      longitud: -80.9800
    - latitud: -4.9600
      longitud: -80.9800
- id: ZON-005
  nombre: Sector SAR Centro
  tipo: Busqueda y rescate
  descripcion: Zona prioritaria de coordinacion SAR entre Callao, Chancay y Pisco.
  coordenadas:
    - latitud: -11.3000
      longitud: -77.9000
    - latitud: -13.0000
      longitud: -77.9000
    - latitud: -13.0000
      longitud: -76.7000
    - latitud: -11.3000
      longitud: -76.7000
```

#### 5.7.4. Archivo de Alertas

```bash
$ vim data/alertas.yaml
```

**data/alertas.yaml:**

```yaml
- id: ALT-001
  embarcacion_id: EMB-012
  tipo: Emergencia SAR
  descripcion: Respuesta a llamada de auxilio por falla de motor en embarcacion menor.
  fecha: 2026-05-05T07:55:00-05:00
  estado: Activa
  prioridad: Alta
- id: ALT-002
  embarcacion_id: EMB-008
  tipo: Ingreso a zona protegida
  descripcion: Nave aproximandose al limite operativo de la Reserva Nacional de Paracas.
  fecha: 2026-05-05T06:40:00-05:00
  estado: Activa
  prioridad: Media
- id: ALT-003
  embarcacion_id: EMB-005
  tipo: Mantenimiento
  descripcion: Revision preventiva de sistema de comunicaciones y generador auxiliar.
  fecha: 2026-05-04T16:10:00-05:00
  estado: Resuelta
  prioridad: Baja
- id: ALT-004
  embarcacion_id: EMB-007
  tipo: Desvio de ruta
  descripcion: Cambio de rumbo reportado por condiciones de oleaje frente a Chancay.
  fecha: 2026-05-05T05:25:00-05:00
  estado: Activa
  prioridad: Media
- id: ALT-005
  embarcacion_id: EMB-003
  tipo: Velocidad reducida
  descripcion: Nave pesquera reporta velocidad menor a la esperada por inspeccion de red.
  fecha: 2026-05-03T14:30:00-05:00
  estado: Resuelta
  prioridad: Baja
```

#### 5.7.5. Archivo de Incidentes SAR

```bash
$ vim data/incidentes_sar.yaml
```

**data/incidentes_sar.yaml:**

```yaml
- id: SAR-001
  embarcacion_id: EMB-012
  tipo_incidente: Auxilio mecanico
  descripcion: Embarcacion artesanal sin propulsion a 18 millas nauticas del Callao.
  fecha_inicio: 2026-05-05T07:35:00-05:00
  fecha_fin:
  estado: En curso
  coordenadas:
    latitud: -12.2032
    longitud: -77.3811
  recursos_desplegados:
    - Unidad SAR Callao Rescue
    - Patrullera BAP Rio Pisco
    - Comunicacion VHF canal 16
  personas_rescatadas: 0
- id: SAR-002
  embarcacion_id: EMB-010
  tipo_incidente: Evacuacion medica
  descripcion: Tripulante con lesion en faena frente a San Andres, derivado a puesto de salud.
  fecha_inicio: 2026-05-02T11:20:00-05:00
  fecha_fin: 2026-05-02T15:45:00-05:00
  estado: Resuelto
  coordenadas:
    latitud: -13.7434
    longitud: -76.5341
  recursos_desplegados:
    - Lancha de capitania
    - Ambulancia Pisco
    - Equipo medico de puerto
  personas_rescatadas: 1
- id: SAR-003
  embarcacion_id: EMB-006
  tipo_incidente: Persona al agua
  descripcion: Operativo de busqueda cerca de Zorritos tras reporte de caida accidental.
  fecha_inicio: 2026-05-04T17:10:00-05:00
  fecha_fin:
  estado: En curso
  coordenadas:
    latitud: -3.6698
    longitud: -80.7793
  recursos_desplegados:
    - Patrulla costera Tumbes
    - Equipo de buzos
    - Apoyo de turismo maritimo local
  personas_rescatadas: 0
```

### 5.8. Creando páginas de contenido

#### 5.8.1. Página principal

```bash
$ vim content/_index.md
```

**content/\_index.md:**

```markdown
---
title: "Sistema de Gestión de Embarcaciones"
date: 2025-10-01T08:00:00-05:00
draft: false
---

# Bienvenido al Sistema de Gestión Marítima

Este sistema permite monitorear y gestionar:

- **Embarcaciones** registradas en el sistema
- **Posiciones** en tiempo real de las embarcaciones
- **Zonas** marítimas definidas
- **Alertas** de seguridad y operacionales
- **Incidentes SAR** (Búsqueda y Rescate)

## Estadísticas del Sistema

El sistema muestra información actualizada de todas las operaciones marítimas.
```

#### 5.8.2. Página de listado de embarcaciones

```bash
$ mkdir -p content/embarcaciones
$ vim content/embarcaciones/_index.md
```

**content/embarcaciones/\_index.md:**

```markdown
---
title: "Embarcaciones Registradas"
date: 2025-10-01T08:00:00-05:00
draft: false
---

Listado de todas las embarcaciones registradas en el sistema.
```

### 5.9. Creando layouts (plantillas)

#### 5.9.1. Layout base

```bash
$ mkdir -p layouts/_default
$ vim layouts/_default/baseof.html
```

**layouts/\_default/baseof.html:**

```html
<!doctype html>
<html lang="{{ .Site.Language.Locale }}">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="{{ .Site.Params.description }}">
    <title>{{ if .IsHome }}{{ .Site.Title }}{{ else }}{{ .Title }} | {{ .Site.Title }}{{ end }}</title>
    <link rel="stylesheet" href="{{ "css/styles.css" | relURL }}">
  </head>
  <body>
    <header class="site-header">
      <nav class="nav container" aria-label="Menu principal">
        <a class="brand" href="{{ "/" | relURL }}">Maritime System</a>
        <button class="nav-toggle" type="button" aria-label="Abrir menu" data-nav-toggle>Menu</button>
        <ul class="nav-links" data-nav-links>
          {{ range .Site.Menus.main }}
            <li><a href="{{ .URL | relURL }}" {{ if $.IsMenuCurrent "main" . }}aria-current="page"{{ end }}>{{ .Name }}</a></li>
          {{ end }}
        </ul>
      </nav>
    </header>

    <main>
      {{ block "main" . }}{{ end }}
    </main>

    <footer class="site-footer">
      <div class="container footer-grid">
        <p>Ingenieria Web - Laboratorio 04</p>
        <p>Sistema estatico desarrollado con Hugo y Data Files YAML.</p>
      </div>
    </footer>

    <script>
      const toggle = document.querySelector("[data-nav-toggle]");
      const links = document.querySelector("[data-nav-links]");
      if (toggle && links) {
        toggle.addEventListener("click", () => links.classList.toggle("is-open"));
      }
    </script>
    {{ block "scripts" . }}{{ end }}
  </body>
</html>

```

#### 5.9.2. Página principal

```bash
$ vim layouts/index.html
```

**layouts/index.html:**

```html
{{ define "main" }}
  {{ $embarcaciones := hugo.Data.embarcaciones }}
  {{ $zonas := hugo.Data.zonas }}
  {{ $alertasActivas := where hugo.Data.alertas "estado" "Activa" }}
  {{ $incidentesCurso := where hugo.Data.incidentes_sar "estado" "En curso" }}

  <section class="hero">
    <div class="container hero-content">
      <p class="eyebrow">Monitoreo maritimo peruano</p>
      <h1>Sistema de Gestion de Embarcaciones</h1>
      <p>Panel academico para registrar embarcaciones, ubicar posiciones actuales, revisar alertas, zonas operativas e incidentes SAR usando Hugo sin base de datos.</p>
      <div class="hero-actions">
        <a class="button primary" href="{{ "/embarcaciones/" | relURL }}">Ver embarcaciones</a>
        <a class="button secondary" href="{{ "/incidentes/" | relURL }}">Incidentes SAR</a>
      </div>
    </div>
  </section>

  <section class="container section">
    <div class="stats-grid">
      <article class="stat-card">
        <span>Total de embarcaciones</span>
        <strong>{{ len $embarcaciones }}</strong>
      </article>
      <article class="stat-card">
        <span>Total de zonas</span>
        <strong>{{ len $zonas }}</strong>
      </article>
      <article class="stat-card">
        <span>Alertas activas</span>
        <strong>{{ len $alertasActivas }}</strong>
      </article>
      <article class="stat-card">
        <span>Incidentes SAR en curso</span>
        <strong>{{ len $incidentesCurso }}</strong>
      </article>
    </div>
  </section>

  <section class="section band">
    <div class="container two-column">
      <div>
        <h2>Resumen operativo</h2>
        <p>El sistema centraliza informacion simulada del litoral peruano para apoyar el seguimiento de naves, zonas protegidas, desviaciones de ruta y eventos de busqueda y rescate.</p>
      </div>
      <div class="status-list">
        {{ range first 3 $alertasActivas }}
          {{ $emb := index (where hugo.Data.embarcaciones "id" .embarcacion_id) 0 }}
          <article>
            <span class="badge priority-{{ lower .prioridad }}">{{ .prioridad }}</span>
            <h3>{{ .tipo }}</h3>
            <p>{{ with $emb }}{{ .nombre }}{{ end }} - {{ .descripcion }}</p>
          </article>
        {{ end }}
      </div>
    </div>
  </section>
{{ end }}

```

#### 5.9.3. Página de embarcaciones

```bash
$ mkdir -p layouts/embarcaciones
$ vim layouts/embarcaciones/list.html
```

**layouts/embarcaciones/list.html:**

```html
{{ define "main" }}
  {{ $paginator := .Paginate .RegularPages 10 }}
  <section class="page-heading container">
    <p class="eyebrow">Flota registrada</p>
    <h1>{{ .Title }}</h1>
    <p>{{ .Description }}</p>
  </section>

  <section class="container section">
    <div class="toolbar">
      <label for="busqueda">Buscar por nombre o tipo</label>
      <input id="busqueda" type="search" placeholder="Ejemplo: patrullera, Callao, pesquera" data-search-input>
    </div>

    <div class="vessel-grid" data-vessel-list>
      {{ range $paginator.Pages }}
        {{ $embarcacion := index (where hugo.Data.embarcaciones "id" .Params.embarcacion_id) 0 }}
        {{ $posicion := index (where hugo.Data.posiciones "embarcacion_id" .Params.embarcacion_id) 0 }}
        {{ with $embarcacion }}
        <article class="vessel-card" data-vessel-card data-search-text="{{ lower (printf "%s %s" .nombre .tipo) }}">
          <div class="card-head">
            <div>
              <h2>{{ .nombre }}</h2>
              <p>{{ .tipo }}</p>
            </div>
            <span class="badge state">{{ .estado }}</span>
          </div>
          <dl class="details">
            <div><dt>Bandera</dt><dd>{{ .bandera }}</dd></div>
            <div><dt>Tripulacion</dt><dd>{{ .caracteristicas.tripulacion }}</dd></div>
            <div><dt>Fecha</dt><dd>{{ .fecha_creacion }}</dd></div>
            <div><dt>Puerto base</dt><dd>{{ .caracteristicas.puerto_base }}</dd></div>
          </dl>
          {{ with $posicion }}
            <div class="position-box">
              <strong>Posicion actual</strong>
              <p>Lat. {{ .latitud }}, Long. {{ .longitud }}</p>
              <p>Velocidad {{ .velocidad }} nudos - Rumbo {{ .rumbo }} grados</p>
              <small>{{ .timestamp }}</small>
            </div>
          {{ end }}
        </article>
        {{ end }}
      {{ end }}
    </div>

    <p class="empty-state" data-empty-state hidden>No se encontraron embarcaciones con ese criterio.</p>

    {{ if gt $paginator.TotalPages 1 }}
      <nav class="pagination" aria-label="Paginacion de embarcaciones">
        {{ if $paginator.HasPrev }}<a href="{{ $paginator.Prev.URL }}">Anterior</a>{{ end }}
        <span>Pagina {{ $paginator.PageNumber }} de {{ $paginator.TotalPages }}</span>
        {{ if $paginator.HasNext }}<a href="{{ $paginator.Next.URL }}">Siguiente</a>{{ end }}
      </nav>
    {{ end }}
  </section>
{{ end }}

{{ define "scripts" }}
  <script src="{{ "js/embarcaciones.js" | relURL }}"></script>
{{ end }}

```

#### 5.9.4. Página de alertas

```bash
$ mkdir -p content/alertas
$ vim content/alertas/_index.md
```

**content/alertas/\_index.md:**

```markdown
---
title: "Alertas del Sistema"
date: 2025-10-01T08:00:00-05:00
draft: false
---

Monitoreo de alertas activas y resueltas.
```

```bash
$ mkdir -p layouts/alertas
$ vim layouts/alertas/list.html
```

**layouts/alertas/list.html:**

```html
{{ define "main" }} {{ $activas := where hugo.Data.alertas "estado" "Activa" }}
{{ $resueltas := where hugo.Data.alertas "estado" "Resuelta" }}
<section class="page-heading container">
  <p class="eyebrow">Gestion de riesgos</p>
  <h1>{{ .Title }}</h1>
  <p>{{ .Description }}</p>
</section>

<section class="container section">
  <h2>Alertas activas</h2>
  <div class="record-grid">
    {{ range $activas }} {{ partial "alerta-card.html" (dict "alerta" . "site"
    $.Site) }} {{ end }}
  </div>
</section>

<section class="container section">
  <h2>Alertas resueltas</h2>
  <div class="record-grid">
    {{ range $resueltas }} {{ partial "alerta-card.html" (dict "alerta" . "site"
    $.Site) }} {{ end }}
  </div>
</section>
{{ end }}
```

#### 5.9.5. Página de zonas

```bash
$ mkdir -p content/zonas
$ vim content/zonas/_index.md
```

**content/zonas/\_index.md:**

```markdown
---
title: "Zonas Marítimas"
date: 2025-10-01T08:00:00-05:00
draft: false
---

Definición de zonas marítimas monitoreadas.
```

```bash
$ mkdir -p layouts/zonas
$ vim layouts/zonas/list.html
```

**layouts/zonas/list.html:**

```html
{{ define "main" }}
<section class="page-heading container">
  <p class="eyebrow">Areas de monitoreo</p>
  <h1>{{ .Title }}</h1>
  <p>{{ .Description }}</p>
</section>

<section class="container section">
  <div class="zone-list">
    {{ range hugo.Data.zonas }}
    <article class="zone-item">
      <div>
        <span class="badge state">{{ .tipo }}</span>
        <h2>{{ .nombre }}</h2>
        <p>{{ .descripcion }}</p>
      </div>
      <div>
        <h3>Coordenadas</h3>
        <ol class="coordinate-list">
          {{ range .coordenadas }}
          <li>Lat. {{ .latitud }}, Long. {{ .longitud }}</li>
          {{ end }}
        </ol>
      </div>
    </article>
    {{ end }}
  </div>
</section>
{{ end }}
```

#### 5.9.6. Página de incidentes SAR

```bash
$ mkdir -p content/incidentes
$ vim content/incidentes/_index.md
```

**content/incidentes/\_index.md:**

```markdown
---
title: "Incidentes SAR"
date: 2025-10-01T08:00:00-05:00
draft: false
---

Registro de incidentes de Búsqueda y Rescate (SAR - Search and Rescue).
```

```bash
$ mkdir -p layouts/incidentes
$ vim layouts/incidentes/list.html
```

**layouts/incidentes/list.html:**

```html
{{ define "main" }} {{ $curso := where hugo.Data.incidentes_sar "estado" "En
curso" }} {{ $resueltos := where hugo.Data.incidentes_sar "estado" "Resuelto" }}
<section class="page-heading container">
  <p class="eyebrow">Busqueda y rescate</p>
  <h1>{{ .Title }}</h1>
  <p>{{ .Description }}</p>
</section>

<section class="container section">
  <h2>Incidentes en curso</h2>
  <div class="record-grid">
    {{ range $curso }} {{ partial "incidente-card.html" (dict "incidente" .
    "site" $.Site) }} {{ end }}
  </div>
</section>

<section class="container section">
  <h2>Incidentes resueltos</h2>
  <div class="record-grid">
    {{ range $resueltos }} {{ partial "incidente-card.html" (dict "incidente" .
    "site" $.Site) }} {{ end }}
  </div>
</section>
{{ end }}
```

### 5.10. Ejecutar el servidor de desarrollo

```bash
# Iniciando servidor Hugo
$ hugo server -D
```

Acceda desde un navegador web a la dirección: `http://localhost:1313/`

### 5.11. Generar sitio estático

Para generar los archivos HTML estáticos:

```bash
# Generar sitio estático
$ hugo
```

Los archivos generados estarán en el directorio `public/`

### 5.12. Estructura final del proyecto

```
maritime-system/
├── archetypes/
├── assets/
├── content/
│   ├── _index.md
│   ├── embarcaciones/
│   │   └── _index.md
│   ├── alertas/
│   │   └── _index.md
│   ├── zonas/
│   │   └── _index.md
│   └── incidentes/
│       └── _index.md
├── data/
│   ├── embarcaciones.yaml
│   ├── posiciones.yaml
│   ├── zonas.yaml
│   ├── alertas.yaml
│   └── incidentes_sar.yaml
├── layouts/
│   ├── _default/
│   │   └── baseof.html
│   ├── embarcaciones/
│   │   └── list.html
│   ├── alertas/
│   │   └── list.html
│   ├── zonas/
│   │   └── list.html
│   ├── incidentes/
│   │   └── list.html
│   └── index.html
├── static/
├── hugo.toml
└── .gitignore
```

---

## 6. Referencias

- [https://gohugo.io/documentation/](https://gohugo.io/documentation/)
- [https://gohugo.io/getting-started/quick-start/](https://gohugo.io/getting-started/quick-start/)
- [https://gohugo.io/templates/introduction/](https://gohugo.io/templates/introduction/)
- [https://gohugo.io/templates/data-templates/](https://gohugo.io/templates/data-templates/)
- [https://gohugo.io/content-management/front-matter/](https://gohugo.io/content-management/front-matter/)
- [https://gohugo.io/templates/lists/](https://gohugo.io/templates/lists/)
- [https://gohugo.io/functions/](https://gohugo.io/functions/)
- [https://github.com/gohugoio/hugo](https://github.com/gohugoio/hugo)

---

**© 2026 Universidad La Salle - Ingeniería de Software**
