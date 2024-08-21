// Elementos y variables
const male = document.getElementById('male');
const fran = document.getElementById('fran');
const door = document.getElementById('door');
const tower = document.getElementById('tower');
let doorOpened = false;
let malePos = { x: 90, y: 500 }; // Posición inicial de Male

// Captura de eventos de teclado
document.addEventListener('keydown', moveMale);

// Función para mover a Male
function moveMale(event) {
    const step = 5;
    const newPos = { ...malePos };

    switch (event.key) {
        case 'w':
            newPos.y -= step;
            break;
        case 's':
            newPos.y += step;
            break;
        case 'a':
            newPos.x -= step;
            break;
        case 'd':
            newPos.x += step;
            break;
    }

    // Actualiza la posición y verifica colisiones
    if (isInsideGameContainer(newPos, male)) {
        malePos = newPos;
        updatePosition(male, malePos);
        checkCollisions(); // Verifica colisiones después de mover a Male
    }
}

// Función para actualizar la posición en el DOM
function updatePosition(element, pos) {
    element.style.left = pos.x + 'px';
    element.style.top = pos.y + 'px';
}

// Verifica si una posición está dentro del contenedor de juego
function isInsideGameContainer(pos, element) {
    const containerRect = document.getElementById('game-container').getBoundingClientRect();
    const elementRect = {
        top: pos.y,
        left: pos.x,
        bottom: pos.y + element.offsetHeight,
        right: pos.x + element.offsetWidth
    };

    return !(elementRect.right > containerRect.width || 
             elementRect.left < 0 || 
             elementRect.bottom > containerRect.height || 
             elementRect.top < 0);
}

// Verifica colisión entre Male y la puerta
function isCollidingWithDoor(maleRect) {
    const doorRect = door.getBoundingClientRect();
    return !(maleRect.right < doorRect.left || 
             maleRect.left > doorRect.right || 
             maleRect.bottom < doorRect.top || 
             maleRect.top > doorRect.bottom);
}

// Verifica colisión entre Male y Fran
function isCollidingWithFran(maleRect) {
    const franRect = fran.getBoundingClientRect();
    return !(maleRect.right < franRect.left || 
             maleRect.left > franRect.right || 
             maleRect.bottom < franRect.top || 
             maleRect.top > franRect.bottom);
}

function checkCollisions() {
    const maleRect = male.getBoundingClientRect();
    if (isCollidingWithFran(maleRect)) {
        // Mostrar mini celebración
        celebrate();
    }
}

function celebrate() {
    // Añadir animación de celebración aquí
    // Por ejemplo, puedes mostrar un mensaje de felicitaciones
    alert('Male acaba de rescatar a Fran de pepis, felicitaciones. Si yo fuera Fran me casaria con Male.');
    setTimeout(() => {
        window.location.href = 'boda.html'; // Redirige al instructivo del Nivel 2
    }, 2000); // Espera 3 segundos antes de redirigir
}
