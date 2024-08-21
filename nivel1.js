const character1 = document.getElementById('character1');
const character2 = document.getElementById('character2');
const trees = document.querySelectorAll('.tree');
const bushes = document.querySelectorAll('.bush');
const puddles = document.querySelectorAll('.puddle'); // Añadido para charcos
const comet = document.getElementById('comet');

const moveDistance = 10; // Distancia de movimiento en píxeles por tecla

document.addEventListener('keydown', function(event) {
    switch(event.key) {
        case 'ArrowUp':
            moveCharacter(character1, 0, -moveDistance, 'tree');
            break;
        case 'ArrowDown':
            moveCharacter(character1, 0, moveDistance, 'tree');
            break;
        case 'ArrowLeft':
            moveCharacter(character1, -moveDistance, 0, 'tree');
            break;
        case 'ArrowRight':
            moveCharacter(character1, moveDistance, 0, 'tree');
            break;
        case 'w':
            moveCharacter(character2, 0, -moveDistance, 'bush');
            break;
        case 's':
            moveCharacter(character2, 0, moveDistance, 'bush');
            break;
        case 'a':
            moveCharacter(character2, -moveDistance, 0, 'bush');
            break;
        case 'd':
            moveCharacter(character2, moveDistance, 0, 'bush');
            break;
    }
});

function moveCharacter(character, dx, dy, blockedObstacle) {
    const rect = character.getBoundingClientRect();
    const newLeft = rect.left + dx;
    const newTop = rect.top + dy;
    const newRect = { left: newLeft, top: newTop, right: newLeft + rect.width, bottom: newTop + rect.height };

    if (newLeft >= 0 && newTop >= 0 && newLeft + rect.width <= window.innerWidth && newTop + rect.height <= window.innerHeight) {
        if (!isCollidingWithObstacles(newRect, blockedObstacle)) {
            character.style.left = `${newLeft}px`;
            character.style.top = `${newTop}px`;
            checkCollision();
        }
    }
}

function isCollidingWithObstacles(rect, blockedObstacle) {
    let isColliding = false;

    document.querySelectorAll('.tree, .bush, .agua').forEach(obstacle => {
        if (obstacle.classList.contains(blockedObstacle) || obstacle.classList.contains('agua')) {
            const obstacleRect = obstacle.getBoundingClientRect();
            if (!(rect.right < obstacleRect.left ||
                rect.left > obstacleRect.right ||
                rect.bottom < obstacleRect.top ||
                rect.top > obstacleRect.bottom)) {
                isColliding = true;
            }
        }
    });

    return isColliding;
}

function checkCollision() {
    if (isOverlapping(character1, character2)) {
        // Mostrar mini celebración
        celebrate();
        // Redirigir a la página de instrucciones del Nivel 2
        setTimeout(() => {
            window.location.href = 'instrucciones_nivel2.html'; // Redirige al instructivo del Nivel 2
        }, 3000); // Espera 3 segundos antes de redirigir
    }
}

function celebrate() {
    // Añadir animación de celebración aquí
    // Por ejemplo, puedes mostrar un mensaje de felicitaciones
    alert('Muy bien, hiciste que male y fran se encuentren, sigamos con el otro nivel');
}

function isOverlapping(el1, el2) {
    const rect1 = el1.getBoundingClientRect();
    const rect2 = el2.getBoundingClientRect();
    return !(rect1.right < rect2.left || 
             rect1.left > rect2.right || 
             rect1.bottom < rect2.top || 
             rect1.top > rect2.bottom);
}
