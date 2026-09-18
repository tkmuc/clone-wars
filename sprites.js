(function () {
  function drawBackground(ctx, width, height, time) {
    ctx.save();

    const sky = ctx.createLinearGradient(0, 0, 0, height);
    sky.addColorStop(0, '#45205f');
    sky.addColorStop(0.48, '#d25568');
    sky.addColorStop(0.78, '#f59b62');
    sky.addColorStop(1, '#f8c978');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, width, height);

    const sunX = width * 0.72;
    const sunY = height * 0.34 + Math.sin(time * 0.35) * 2;
    ctx.fillStyle = '#ffd98a';
    ctx.beginPath();
    ctx.arc(sunX, sunY, Math.min(width, height) * 0.105, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = 'rgba(255, 214, 142, 0.28)';
    ctx.beginPath();
    ctx.moveTo(0, height * 0.64);
    ctx.lineTo(width * 0.2, height * 0.52);
    ctx.lineTo(width * 0.4, height * 0.64);
    ctx.lineTo(width * 0.62, height * 0.49);
    ctx.lineTo(width, height * 0.61);
    ctx.lineTo(width, height * 0.78);
    ctx.lineTo(0, height * 0.78);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = '#55304e';
    ctx.beginPath();
    ctx.moveTo(0, height * 0.73);
    ctx.lineTo(width * 0.18, height * 0.61);
    ctx.lineTo(width * 0.36, height * 0.72);
    ctx.lineTo(width * 0.56, height * 0.59);
    ctx.lineTo(width * 0.78, height * 0.7);
    ctx.lineTo(width, height * 0.58);
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fill();

    ctx.restore();
  }

  function drawGround(ctx, width, height, groundHeight, offset) {
    ctx.save();
    const top = height - groundHeight;
    ctx.fillStyle = '#263b3a';
    ctx.fillRect(0, top, width, groundHeight);
    ctx.fillStyle = '#e7a65d';
    ctx.fillRect(0, top, width, 7);
    ctx.strokeStyle = '#172528';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(0, top + 7);
    ctx.lineTo(width, top + 7);
    ctx.stroke();

    const tile = 42;
    const slide = ((offset % tile) + tile) % tile;
    ctx.fillStyle = '#36504a';
    for (let x = -slide - tile; x < width + tile; x += tile) {
      ctx.fillRect(x, top + 18, tile - 4, 8);
      ctx.fillRect(x + 16, top + 38, tile - 10, 7);
    }
    ctx.restore();
  }

  function drawBird(ctx, x, y, size, velocity) {
    ctx.save();
    const tilt = Math.max(-0.28, Math.min(0.42, velocity / 900));
    ctx.translate(x, y);
    ctx.rotate(tilt);
    const s = size / 34;
    ctx.scale(s, s);
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#241b29';
    ctx.lineWidth = 3;

    ctx.fillStyle = '#b66a3c';
    ctx.beginPath();
    ctx.moveTo(-14, 5);
    ctx.lineTo(-12, 14);
    ctx.lineTo(-8, 14);
    ctx.lineTo(-7, 7);
    ctx.quadraticCurveTo(-1, 11, 6, 8);
    ctx.lineTo(8, 14);
    ctx.lineTo(12, 14);
    ctx.lineTo(11, 5);
    ctx.quadraticCurveTo(16, 1, 12, -5);
    ctx.quadraticCurveTo(7, -10, 1, -8);
    ctx.lineTo(-3, -12);
    ctx.lineTo(-7, -8);
    ctx.quadraticCurveTo(-14, -5, -14, 5);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#d99050';
    ctx.beginPath();
    ctx.moveTo(-9, -7);
    ctx.lineTo(-5, -16);
    ctx.lineTo(-1, -12);
    ctx.lineTo(2, -15);
    ctx.lineTo(4, -8);
    ctx.quadraticCurveTo(-1, -6, -3, -3);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#f6d29c';
    ctx.beginPath();
    ctx.ellipse(8, -1, 7, 4.5, -0.15, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = '#241b29';
    ctx.beginPath();
    ctx.arc(9, -3, 1.7, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  function drawPipe(ctx, x, gapTop, gapBottom, pipeWidth, height) {
    ctx.save();
    const drawPalm = (top, bottom) => {
      const trunkWidth = Math.max(12, pipeWidth * 0.36);
      const trunkX = x + (pipeWidth - trunkWidth) / 2;
      // Keep the visible obstacle inside the exact collision rectangle.
      ctx.fillStyle = '#286052';
      ctx.fillRect(x, top, pipeWidth, bottom - top);
      ctx.fillStyle = '#286052';
      ctx.strokeStyle = '#172b35';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(trunkX, top);
      ctx.lineTo(trunkX + trunkWidth, top);
      ctx.lineTo(trunkX + trunkWidth * 0.9, bottom);
      ctx.lineTo(trunkX + trunkWidth * 0.1, bottom);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      const crownY = top + 12;
      const centerX = x + pipeWidth / 2;
      ctx.fillStyle = '#3f8b58';
      ctx.strokeStyle = '#172b35';
      ctx.lineWidth = 3;
      for (const angle of [-2.7, -2.05, -1.55, -1.05, -0.45, 0.1]) {
        ctx.beginPath();
        ctx.moveTo(centerX, crownY);
        ctx.quadraticCurveTo(
          centerX + Math.cos(angle) * pipeWidth * 0.35,
          crownY + Math.sin(angle) * pipeWidth * 0.35,
          centerX + Math.cos(angle) * pipeWidth * 0.72,
          crownY + Math.sin(angle) * pipeWidth * 0.72
        );
        ctx.quadraticCurveTo(centerX, crownY + 4, centerX, crownY);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      }
    };

    drawPalm(0, gapTop);
    drawPalm(gapBottom, height);
    ctx.restore();
  }

  window.SPRITES = { drawBackground, drawGround, drawBird, drawPipe };
})();
