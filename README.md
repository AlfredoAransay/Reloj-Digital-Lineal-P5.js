# Extensión para navegador web
**RELOJ DIGITAL LINEAL**
Esta extensión para el navegador web es una adaptación a una resolución de 300x150px de un reloj digital circular.

## Descripción del proyecto
Un reloj que mediante una **representación abstracta y visual** pretende mostrar **el paso del tiempo** de una forma diferente.

## Funcionalidades
Dos botones que otorgan de cierta funcionalidad al reloj:
1.	**Botón de 24 y 12 horas**. Mediante la pulsación de este botón se puede intercambiar el formato de hora, a 24 horas o a 12 horas con AM y PM.
2.	**Botón selector de tema**. Mediante su pulsación intercambiamos entre un tema oscuro 'DARK' y otro claro 'LIGHT'.
## Estructura del código
```
digitalLinealWatch/
├── imgs/
│   ├── icon16.png
│   ├── icon32.png
│   ├── icon48.png
│   └── icon128.png
├── LICENSE
├── manifest.json
├── p5.js
├── popup.html
├── sketch.js
├── style.css
└── README.md
```

## Instalación
1. Descarga o clona este repositorio.
2. Abre Firefox y escribe **about:debugging#/runtime/this-firefox** en la barra de búsqueda.
3. Pulsa **Cargar complemento temporal...** y **selecciona cualquier archivo**, por ejemplo popup.html.
4. Haz clic en el icono de Reloj en la barra de herramientas.

## Tecnologías utilizadas
* **HTML5 Canvas** Superficie de dibujo para elementos 2D
* **p5.js 2.3.4** Framework principal para gráficos y animación
* **p5.sound** Sistema de audio interactivo

## Licencia
Proyecto con fines educativos bajo licencia MIT.

**UOC Universitat Oberta de Catalunya**
Grado multimeda 2026-2027 | *Desarrollo de aplicaciones interactivas*
