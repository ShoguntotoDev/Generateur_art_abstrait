// Récupère le canvas et les boutons à partir de leur ID dans le HTML
const canvas = document.getElementById('canvas');
const generateButton = document.getElementById('generateButton');
const changeShapesButton = document.getElementById('changeShapesButton');
const changeBackgroundColor = document.getElementById('changeBackgroundColor');
const saveArt = document.getElementById('saveArt');
const ctx = canvas.getContext('2d'); // Obtenir le contexte 2D du canvas
const colors = ['#ff5733', '#33ff57', '#5733ff', '#f3ff33', '#33f3ff'];
let isCircles = false;

// Ajouter des écouteurs d'événements aux boutons
generateButton.addEventListener('click', generateArt);
changeShapesButton.addEventListener('click', changeShapes);
changeBackgroundColor.addEventListener('click', changeBackground);
saveArt.addEventListener('click', saveArtwork);

// Fonction pour générer de l'art abstrait
function generateArt() {
    // Efface le contenu actuel du canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Génère 100 formes aléatoires
    for (let i = 0; i < 100; i++) {
        const randomX = Math.random() * canvas.width;
        const randomY = Math.random() * canvas.height;
        const randomSize = Math.random() * 30 + 10;
        const randomColor = colors[Math.floor(Math.random() * colors.length)];

        // Dessine une forme (cercle ou carré) avec des propriétés aléatoires
        ctx.fillStyle = randomColor;
        ctx.beginPath();
        ctx.arc(randomX, randomY, randomSize / 2, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Fonction pour changer les formes (cercles <-> carrés)
function changeShapes() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < 100; i++) {
        const randomX = Math.random() * canvas.width;
        const randomY = Math.random() * canvas.height;
        const randomSize = Math.random() * 30 + 10;
        const randomColor = colors[Math.floor(Math.random() * colors.length)];

        // Dessine une forme (cercle ou carré) en fonction de l'état actuel (cercles ou carrés)
        ctx.fillStyle = randomColor;
        if (isCircles) {
            ctx.beginPath();
            ctx.arc(randomX, randomY, randomSize / 2, 0, Math.PI * 2);
            ctx.fill();
        } else {
            ctx.fillRect(randomX, randomY, randomSize, randomSize);
        }
    }

    // Inverser l'état des formes (cercles <-> carrés)
    isCircles = !isCircles;
}

// Fonction pour changer la couleur de fond du canvas
function changeBackground() {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    canvas.style.backgroundColor = randomColor;
}

// Fonction pour sauvegarder l'art généré en tant qu'image PNG
function saveArtwork() {
    // Obtient la couleur de fond actuelle du canvas principal
    const currentBackgroundColor = canvas.style.backgroundColor;

    // Crée un canvas temporaire avec la même taille que le canvas principal
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;
    const tempCtx = tempCanvas.getContext('2d');

    // Remplit le canvas temporaire avec la couleur de fond actuelle
    if (currentBackgroundColor) {
        tempCtx.fillStyle = currentBackgroundColor;
        tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
    } else {
        // Si la couleur de fond est transparente, définissez le canvas temporaire avec un fond transparent
        tempCanvas.style.backgroundColor = 'transparent';
    }

    // Dessine le contenu du canvas principal par-dessus
    tempCtx.drawImage(canvas, 0, 0);

    // Enregistre l'image du canvas temporaire
    const canvasImage = tempCanvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = canvasImage;
    a.download = 'artwork.png';
    a.click();
}


// Générer de l'art au chargement de la page
generateArt();