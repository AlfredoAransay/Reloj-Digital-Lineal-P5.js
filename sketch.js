// -------------------------------------------------------------------//
// VARIABLES ---------------------------------------------------------//
// -------------------------------------------------------------------//
// Colores
let negro = [18, 20, 28];
let negro75 = [18, 20, 28, 75]; // Color negro 75%
let blanco = [240, 244, 248]
let cian = [0, 220, 255]; // Color cian
let cian30 = [0, 220, 255, 30]; // Color cian 30%
let cian75 = [0, 220, 255, 75]; // Color cian 75%
let rosaNeon = [255, 90, 140]; // Color rosa neón
let rosaNeon30 = [255, 90, 140, 30]; // Color rosa neón 30%
let naranjaClaro = [255, 150, 0]; // Calor naranja claro
let naranjaClaro40 = [255, 150, 0, 40]; // Calor naranja claro 40%

// Inicialización de las variables de tiempo
let s, m, h, d, mo, y;
let formato24h = false; // false = modo 12h (con AM/PM), true = modo 24h

// Elementos
let radioSegundos = 3; // Círculo interior (Segundos)

// UI
let esOscuro = true;
let btnTema, btnFormato;

// -------------------------------------------------------------------//
// SET UP ------------------------------------------------------------//
// -------------------------------------------------------------------//
async function setup() {
    let canvas = createCanvas(300, 150);
    canvas.parent('app-contenedor'); // Enlaza el canvas con el contenedor HTML
    // Cargamos la fuente que vamos a utilzar desde la api de google fonts
    fuente = await loadFont("https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&display=swap");
    textFont(fuente);

    // Recuperar preferencias guardadas con getItem()
    let temaGuardado = getItem('tema');
    if (temaGuardado !== null) {
        esOscuro = temaGuardado;
    }

    let formatoGuardado = getItem('formato');
    if (formatoGuardado !== null) {
        formato24h = formatoGuardado;
    }
    
    aplicarTemaDOM(); // Inyectar el tema en el HTML

    // Configurar eventos de los botones del DOM
    btnTema = document.getElementById('tema-toggle');
    btnFormato = document.getElementById('formato-toggle');

    // Captura del evento del botón del tema
    if (btnTema) {
        btnTema.addEventListener('click', () => {
            esOscuro = !esOscuro;
            storeItem('tema', esOscuro);
            aplicarTemaDOM();
        });
    }

    // Captura del evento del botón del formato horario
    if (btnFormato) {
        btnFormato.addEventListener('click', () => {
            formato24h = !formato24h; // Alternar entre 12h y 24h
            storeItem('formato', formato24h);
            actualizarBotonFormato();
        });
    }

    // Actualizar el formato en horas -> 24h o 12h (AM/PM)
    actualizarBotonFormato();
}

// Función encargada de inyectar los cambios en el HTML y CSS
function aplicarTemaDOM() {
    let body = document.body;
    if (esOscuro) {
        body.classList.remove('tema-light');
        body.classList.add('tema-dark');
        if (btnTema) {
            btnTema.innerHTML = "LIGHT";
            btnTema.classList.remove('btn-stilo-dark');
            btnTema.classList.add('btn-estilo-light');
            btnFormato.classList.remove('btn-stilo-dark');
            btnFormato.classList.add('btn-estilo-light');
        }
    } else {
        body.classList.remove('tema-dark');
        body.classList.add('tema-light');
        if (btnTema) {
            btnTema.innerHTML = "DARK";
            btnTema.classList.remove('btn-estilo-light');
            btnTema.classList.add('btn-estilo-dark');
            btnFormato.classList.remove('btn-estilo-light');
            btnFormato.classList.add('btn-estilo-dark');
        }
    }
}

// Función encargada de actualizar el formato horario
function actualizarBotonFormato() {
    if (btnFormato) {
        // Si estamos en 24h, el botón ofrece pasar a 12h. Si estamos en 12h, ofrece pasar a 24h.
        btnFormato.innerHTML = formato24h ? "24H" : "12H";
    }
}

// -------------------------------------------------------------------//
// DRAW --------------------------------------------------------------//
// -------------------------------------------------------------------//
function draw() {
    // Fondo para el tema
    let colorFondo = esOscuro ? color(negro) : color(blanco);
    background(colorFondo);

    // Dibujar reloj digital
    s = second();
    m = minute();
    h = hour();
    d = day();
    mo = month();
    y = year();
    let ampm = h >= 12 ? "PM" : "AM"; // Determinar si es AM o PM
    
    dibujarRelojDigital(ampm, h, m, s, d, mo, y);
    dibujarSegundos(radioSegundos, s);
    dibujarMinutos(m);
    dibujarHoras(h);
}

// Función encargada de dibujar el reloj digital
function dibujarRelojDigital(ampm, h, m, s, d, mo, y) {
    noStroke();
    textAlign(CENTER, CENTER);
    // Tema oscuro 'DARK'
    if (esOscuro) {
        fill(cian75); // Color azul cian 75%
        textSize(11);
        formato24h ? text(`${ampm}`, 56, 20) : text("24H", 56, 20);
        fill(255);
        textSize(16);
        textStyle(BOLD);
        formato24h ? text(`${nf(h % 12, 2)}:${nf(m, 2)}:${nf(s, 2)}`, 56, 36) : text(`${nf(h, 2)}:${nf(m, 2)}:${nf(s, 2)}`, 56, 36); // Mostrar la hora, minutos y segundos
        fill(cian75); // Color azul cian 75%
        textSize(11);
        textStyle(NORMAL);
        text(`${nf(d, 2)}·${nf(mo, 2)}·${nf(y, 4)}`, 56, 53); // Mostrar el día, el mes y el año
    // Tema claro 'LIGHT'
    } else {
        fill(negro75); // Color azul cian 75%
        textSize(11);
        formato24h ? text(`${ampm}`, 56, 20) : text("24H", 56, 20); // Mostrar si es AM o PM
        fill(cian);
        textSize(16);
        textStyle(BOLD);
        formato24h ? text(`${nf(h % 12, 2)}:${nf(m, 2)}:${nf(s, 2)}`, 56, 36) : text(`${nf(h, 2)}:${nf(m, 2)}:${nf(s, 2)}`, 56, 36); // Mostrar la hora, minutos y segundos
        fill(negro75); // Color azul cian 75%
        textSize(11);
        textStyle(NORMAL);
        text(`${nf(d, 2)}·${nf(mo, 2)}·${nf(y, 4)}`, 56, 53); // Mostrar el día, el mes y el año
    }
}

// Función encargada de dibujar los minutos, cada minuto representa una línea vertical
function dibujarMinutos(m) {
    noStroke();
    fill(rosaNeon); // Color rosa neon
    for (let i = 0; i < m; i++) {
        rect(20 + i * 4.45, 100, 0.1 + i*0.04, -5 - i*0.9);
    }
}

// Función encargada de dibujar los segundos, cada segundo representa un punto azul
function dibujarSegundos(radioSegundos, s) {
    noStroke();
    fill(cian); // Color azul cian
    for (let i = 0; i < s; i++) {
        ellipse(20 + i*4.45, 111, radioSegundos, radioSegundos);
    }
}

// Función encargada de dibujar la línea que representa la hora actual
function dibujarHoras(h) {
    noFill();
    strokeWeight(4);
    stroke(naranjaClaro40); // Calor naranja claro al 40%
    line(20, 125, 280, 125);
    strokeWeight(6);
    stroke(naranjaClaro); // Calor naranja claro
    // Si estamos en 24h, el ciclo completo es de 24 horas; si estamos en 12h, es de 12 horas.
    let lineaAnchoHoras = 280;
    let lineaParaHoras = formato24h ? ((h % 12) * 3600) + (m * 60) + s : (h * 3600) + (m * 60) + s;
    let maxSegundos = formato24h ? (12 * 3600) : (24 * 3600);
    let anchoProgreso = map(lineaParaHoras, 0, maxSegundos, 0, lineaAnchoHoras);
    line(20, 125, anchoProgreso, 125);

    /* for (let i = 0; i < h; i++) {
        line(20, 125, 20 + i*4.45, 125);
    } */
}
