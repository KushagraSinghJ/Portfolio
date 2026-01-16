
import { useEffect } from "react";

const Cursor = () => {
//   const strokeColor = `rgba(0, 247, 255, ${point.alpha})`; // Electric Blue
// const glowColor = `rgba(255, 77, 232, 0.9)`;             
  useEffect(() => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    // Setup canvas styling
    canvas.style.position = "fixed";
    canvas.style.top = 0;
    canvas.style.left = 0;
    canvas.style.width = "100vw";
    canvas.style.height = "100vh";
    canvas.style.pointerEvents = "none";
    canvas.style.zIndex = "9999";
    canvas.style.backgroundColor = "transparent"; // ensures no background
    document.body.appendChild(canvas);

    // Match canvas size to screen
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const points = [];
    const maxPoints = 200;

    const handleMove = (e) => {
      points.push({
        x: e.clientX,
        y: e.clientY,
        alpha: 1,
        size: 8,
      });

      if (points.length > maxPoints) {
        points.shift(); // remove oldest point
      }
    };

    const draw = () => {
      // 🧼 Clear the canvas each frame (no background overlay)
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      points.forEach((point, i) => {
        const next = points[i + 1];
        if (!next) return;

        ctx.beginPath();
        ctx.moveTo(point.x, point.y);
        ctx.lineTo(next.x, next.y);

        // ctx.strokeStyle = `rgba(255, 100, 100, ${point.alpha})`;
        ctx.strokeStyle =`rgba(0, 247, 255, ${point.alpha})`;
        ctx.lineWidth = point.size;
        ctx.shadowBlur = 15;
        ctx.shadowColor = `rgba(255, 77, 232, 0.9)`;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";

        ctx.stroke();

        // Fade and shrink each segment
        point.alpha *= 0.94;
        point.size *= 0.96;
      });

      requestAnimationFrame(draw);
    };

    // Add mouse listener
    window.addEventListener("mousemove", handleMove);
    draw();

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", handleMove);
      canvas.remove();
    };
  }, []);

  return null; // nothing to render directly
};

export default Cursor;

// import { useEffect } from "react";

// const Cursor = () => {
//   useEffect(() => {
//     const canvas = document.createElement("canvas");
//     const ctx = canvas.getContext("2d");

//     // Canvas style
//     canvas.style.position = "fixed";
//     canvas.style.top = 0;
//     canvas.style.left = 0;
//     canvas.style.width = "100vw";
//     canvas.style.height = "100vh";
//     canvas.style.pointerEvents = "none";
//     canvas.style.zIndex = "9999";
//     canvas.style.backgroundColor = "transparent";
//     document.body.appendChild(canvas);

//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight;

//     let mouseX = canvas.width / 2;
//     let mouseY = canvas.height / 2;

//     // Track mouse position
//     const handleMove = (e) => {
//       mouseX = e.clientX;
//       mouseY = e.clientY;

//       // Optional trail
//       trailPoints.push({
//         x: e.clientX,
//         y: e.clientY,
//         alpha: 1,
//         size: 6,
//       });
//       if (trailPoints.length > 30) trailPoints.shift();
//     };

//     window.addEventListener("mousemove", handleMove);

//     // Glowing trail
//     const trailPoints = [];

//     // Orbiting particles
//     const orbits = Array.from({ length: 15 }).map((_, i) => ({
//       angle: Math.random() * Math.PI * 2,
//       radius: 8 + i * 3,
//       alpha: 1,
//       size: 2 + Math.random() * 2,
//       speed: 0.05 + Math.random() * 0.03,
//     }));

//     const draw = () => {
//       ctx.clearRect(0, 0, canvas.width, canvas.height);

//       // ---- Glow Trail ----
//       trailPoints.forEach((point, i) => {
//         const next = trailPoints[i + 1];
//         if (!next) return;

//         ctx.beginPath();
//         ctx.moveTo(point.x, point.y);
//         ctx.lineTo(next.x, next.y);
//         ctx.strokeStyle = `rgba(100, 200, 255, ${point.alpha})`;
//         ctx.lineWidth = point.size;
//         ctx.shadowBlur = 15;
//         ctx.shadowColor = "rgba(100, 200, 255, 0.6)";
//         ctx.lineCap = "round";
//         ctx.lineJoin = "round";
//         ctx.stroke();

//         point.alpha *= 0.94;
//         point.size *= 0.96;
//       });

//       // ---- Orbiting Spiral Particles ----
//       orbits.forEach((orb) => {
//         orb.angle += orb.speed;
//         orb.alpha *= 0.98;
//         orb.size *= 0.99;

//         const x = mouseX + Math.cos(orb.angle) * orb.radius;
//         const y = mouseY + Math.sin(orb.angle) * orb.radius;

//         ctx.beginPath();
//         ctx.arc(x, y, orb.size, 0, Math.PI * 2);
//         ctx.fillStyle = `rgba(150, 200, 255, ${orb.alpha})`;
//         ctx.shadowBlur = 25;
//         ctx.shadowColor = `rgba(150, 200, 255, 0.8)`;
//         ctx.fill();

//         // Reset faded particle
//         if (orb.alpha < 0.05 || orb.size < 0.5) {
//           orb.alpha = 1;
//           orb.size = 2 + Math.random() * 2;
//           orb.angle = Math.random() * Math.PI * 2;
//           orb.radius = 8 + Math.random() * 40;
//         }
//       });

//       requestAnimationFrame(draw);
//     };

//     draw();

//     return () => {
//       window.removeEventListener("mousemove", handleMove);
//       canvas.remove();
//     };
//   }, []);

//   return null;
// };

// export default Cursor;
