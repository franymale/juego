// Elementos y variables
const male = document.getElementById('male');
const key = document.getElementById('key');
const obstacles = document.querySelectorAll('.obstacle');

let malePos = { x: 50, y: 50 };
const initialMalePos = { x: 50, y: 50 }; // Posición inicial de Male
let keyCollected = false;

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

    if (isInsideGameContainer(newPos, male)) {
        malePos = newPos;
        updatePosition(male, malePos);
    }

    if (isCollidingWithObstacle(male)) {
        resetMalePosition(); // Reinicia la posición de Male si colisiona con un obstáculo
    } else {
        checkKeyCollision();
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

// Verifica colisiones entre Male y los obstáculos
function isCollidingWithObstacle(male) {
    const maleRect = male.getBoundingClientRect();

    for (const obstacle of obstacles) {
        const obstacleRect = obstacle.getBoundingClientRect();

        if (!(maleRect.right < obstacleRect.left || 
              maleRect.left > obstacleRect.right || 
              maleRect.bottom < obstacleRect.top || 
              maleRect.top > obstacleRect.bottom)) {
            return true; // Hay colisión con un obstáculo
        }
    }
    return false; // No hay colisión
}

// Verifica si Male recoge la llave
function checkKeyCollision() {
    const maleRect = male.getBoundingClientRect();
    const keyRect = key.getBoundingClientRect();

    if (!keyCollected && maleRect.left < keyRect.right &&
        maleRect.right > keyRect.left &&
        maleRect.top < keyRect.bottom &&
        maleRect.bottom > keyRect.top) {
        
        keyCollected = true;
        key.style.display = 'none'; // Esconde la llave
        advanceToPartTwo();
    }
}

// Función para reiniciar la posición de Male al punto de inicio
function resetMalePosition() {
    malePos = { ...initialMalePos };
    updatePosition(male, malePos);
}

// Avanzar a la segunda parte del nivel
function advanceToPartTwo() {
    alert('Has recogido la llave. Ahora pasas a la segunda parte del nivel.');
    // Aquí iría la lógica para cargar la segunda parte del nivel
}
// Función para avanzar a la segunda parte del nivel
function advanceToPartTwo() {
    // Puedes redirigir a una nueva página
    window.location.href = "parte2.html";

    // O si prefieres mantener todo en la misma página, podrías cargar el nuevo contenido dinámicamente
    // Por ejemplo, podrías cambiar el contenido del contenedor de juego
    // loadPartTwo(); // Llama a una función que configures para cargar la segunda parte
}
