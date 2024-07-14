document.addEventListener("DOMContentLoaded", function() {
    const canvas = document.getElementById('snowflakeCanvas');
    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const numBranches = 6;
    const angle = Math.PI * 2 / numBranches;
    const branches = [];
    let branchColor = 'white';
    let branchWidth = 2;

    // UI elements
    const colorPicker = document.createElement('input');
    colorPicker.type = 'color';
    colorPicker.value = '#ffffff';
    colorPicker.addEventListener('change', function() {
        branchColor = this.value;
    });
    document.body.appendChild(colorPicker);

    const widthSlider = document.createElement('input');
    widthSlider.type = 'range';
    widthSlider.min = 1;
    widthSlider.max = 10;
    widthSlider.value = 2;
    widthSlider.addEventListener('input', function() {
        branchWidth = this.value;
    });
    document.body.appendChild(widthSlider);

    function drawLine(x1, y1, x2, y2, color, width) {
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = width;
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    }

    function drawBranches() {
        branches.forEach(branch => {
            for (let i = 0; i < numBranches; i++) {
                ctx.save();
                ctx.translate(centerX, centerY);
                ctx.rotate(i * angle);
                drawLine(0, 0, branch.xEnd, branch.yEnd, branch.color, branch.width);
                ctx.restore();
            }
        });
    }

    function drawSnowflake() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBranches();
    }

    function addBranch(x, y) {
        const dx = x - centerX;
        const dy = y - centerY;
        branches.push({xEnd: dx, yEnd: dy, color: branchColor, width: branchWidth});
        drawSnowflake();
    }

    canvas.addEventListener('click', function(e) {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        addBranch(x, y);
    });

    drawSnowflake();
});
