document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('scratch-canvas');
    const ctx = canvas.getContext('2d');
    const container = document.querySelector('.scratch-container');

    // Set canvas size to match container
    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;

    // Fill with scratch color
    ctx.fillStyle = '#C0C0C0'; // Silver/Grey
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    let isDrawing = false;

    function getMousePos(canvas, evt) {
        const rect = canvas.getBoundingClientRect();
        return {
            x: (evt.clientX || evt.touches[0].clientX) - rect.left,
            y: (evt.clientY || evt.touches[0].clientY) - rect.top
        };
    }

    function scratch(e) {
        if (!isDrawing) return;
        e.preventDefault(); // Prevent scrolling on touch

        const pos = getMousePos(canvas, e);

        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, 20, 0, Math.PI * 2); // Brush size
        ctx.fill();
    }

    // Mouse Events
    canvas.addEventListener('mousedown', (e) => {
        isDrawing = true;
        scratch(e);
    });
    canvas.addEventListener('mousemove', scratch);
    canvas.addEventListener('mouseup', () => isDrawing = false);
    canvas.addEventListener('mouseleave', () => isDrawing = false);

    // Touch Events
    canvas.addEventListener('touchstart', (e) => {
        isDrawing = true;
        scratch(e);
    });
    canvas.addEventListener('touchmove', scratch);
    canvas.addEventListener('touchend', () => isDrawing = false);
});
