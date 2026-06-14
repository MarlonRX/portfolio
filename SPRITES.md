# 👾 Guía de Creación y Configuración de Sprites 8-Bits

Esta guía explica cómo funcionan los sprites en tu portafolio, cómo puedes crear tus propios gráficos pixel art y cómo configurarlos en la aplicación para mantener una estética de 8 bits consistente y profesional.

---

## 📂 ¿Dónde están y cómo funcionan los Sprites?

Actualmente, el portafolio utiliza dos sistemas de renderizado para gráficos retro:

### 1. Sprites Vectoriales por Código (Canvas 2D)
* **Ubicación**: [ConstellationBackground.tsx](file:///Users/mramirez/Projects/portfolio/src/components/sections/ConstellationBackground.tsx)
* **Cómo funciona**: Son cuadrículas de píxeles (arreglos numéricos) dibujadas pixel por pixel directamente sobre un elemento Canvas de HTML5 mediante Javascript. Esto permite que los easter eggs del teclado se ejecuten en tiempo real y a máxima velocidad sin depender de archivos de imagen.
* **Ejemplo de Grid (`bug`)**:
  ```typescript
  const bugFrames = [
    [
      [1,0,1,0,1],
      [0,1,1,1,0],
      [1,1,1,1,1],
      [0,1,1,1,0],
      [1,0,1,0,1]
    ]
  ];
  ```

### 2. Hojas de Sprites Clásicas (Sprite Sheets PNG)
* **Ubicación de Componente**: [SpriteAnimator.tsx](file:///Users/mramirez/Projects/portfolio/src/components/ui/SpriteAnimator.tsx)
* **Cómo funciona**: Carga una tira horizontal de imágenes en formato `.png` transparente y la anima utilizando variables CSS con la función de temporización `steps()` (para lograr una animación cuadro por cuadro sin transiciones de desplazamiento).
* **Ubicación recomendada de imágenes**: `public/sprites/` (ej: `/public/sprites/mi-avatar.png`).

---

## 🎨 Guía de Diseño para mantener el estilo 8-Bits

Para que tus propios sprites luzcan premium y se integren orgánicamente con el diseño retro-tech oscuro de la web, sigue estas recomendaciones:

### 1. Paleta de Colores Limitada
* **Regla**: Los sistemas clásicos de 8 bits (NES, Game Boy Color) tenían paletas indexadas muy reducidas.
* **Consejo**: Diseña cada sprite usando entre **2 y 8 colores** como máximo.
* **Colores sugeridos**: Utiliza tonos vibrantes y neón sobre el fondo oscuro corporativo (verde arcade `#39ff14`, dorado `#d4af37`, azul eléctrico `#4f8cff`, rosa `#ff2a6d`, naranja `#ffb74d`).

### 2. Evita los Degradados Suaves
* **Regla**: No utilices sombreados suaves, difuminados ni filtros lineales.
* **Consejo**: Si quieres texturizar o dar volumen, utiliza **tramado** o *dithering* (patrones alternados de píxeles de dos colores diferentes).

### 3. Consistencia en el Tamaño del Píxel (Texel Size)
* **Regla**: Si un sprite dibuja píxeles grandes de 4x4 y otro de 1x1 en el mismo lienzo, se rompe la ilusión retro (efecto conocido como *"mixels"*).
* **Consejo**: Mantén la misma resolución relativa. Por ejemplo, define una cuadrícula base (16x16 o 32x32 píxeles) y dibuja sobre ella a resolución nativa. Al escalar, asegúrate de que el CSS contenga `image-rendering: pixelated;` para que el navegador no suavice los bordes.

---

## ⚙️ Cómo configurar tus propios Sprites en el código

### Opción A: Crear una hoja de sprites PNG para el componente `<SpriteAnimator />`

1. **Prepara el archivo**: Diseña tus cuadros en un solo archivo PNG transparente alineados horizontalmente.
   * *Ejemplo*: Si tienes 4 cuadros de `32x32`, tu imagen final debe medir exactamente `128` píxeles de ancho por `32` píxeles de alto.
2. **Guarda la imagen**: Coloca tu archivo en `public/sprites/mi-animacion.png`.
3. **Invoca el componente**:
   ```tsx
   import SpriteAnimator from "@/components/ui/SpriteAnimator";

   // En tu página o componente:
   <SpriteAnimator 
     src="/sprites/mi-animacion.png"
     frameCount={4}       // Número de cuadros horizontales
     frameWidth={32}      // Ancho de cada cuadro
     frameHeight={32}     // Alto de cada cuadro
     fps={8}              // Velocidad de reproducción (cuadros por segundo)
   />
   ```

### Opción B: Añadir un Easter Egg por código en el Canvas de Fondo

Si quieres agregar otra palabra clave por teclado y su correspondiente dibujo vectorial en [ConstellationBackground.tsx](file:///Users/mramirez/Projects/portfolio/src/components/sections/ConstellationBackground.tsx):

1. **Declara el tipo de sprite** en la interfaz `CustomSprite`:
   ```typescript
   type: "ufo" | "coin" | "bug" | "rocket" | "ghost" | "heart" | "star" | "dino" | "mi_nuevo_sprite";
   ```
2. **Define su disparador por teclado** en `handleKeyDown`:
   ```typescript
   else if (inputBufferRef.current.endsWith("secreto")) {
     spriteIdRef.current += 1;
     spritesRef.current.push({
       id: spriteIdRef.current,
       type: "mi_nuevo_sprite",
       x: Math.random() * window.innerWidth,
       y: window.innerHeight,
       vx: 0,
       vy: -2,
       width: 16,
       height: 16,
       color: "#ffffff",
       frame: 0,
       frameTimer: 0,
       frameCount: 2, // Cuadros de animación
     });
     inputBufferRef.current = "";
   }
   ```
3. **Crea la matriz de pixeles y dibújalo** en la sección `Render routine per type` dentro del loop de `draw()`:
   ```typescript
   else if (s.type === "mi_nuevo_sprite") {
     const pSize = 3; // Tamaño de cada pixel virtual
     const miGrid = [
       [0,1,1,0],
       [1,1,1,1],
       [0,1,1,0]
     ];
     // Dibuja la matriz en base a las coordenadas sx y sy del sprite
     for (let r = 0; r < miGrid.length; r++) {
       for (let c = 0; c < miGrid[r].length; c++) {
         if (miGrid[r][c] === 1) {
           ctx.fillStyle = s.color;
           ctx.fillRect(sx + c * pSize, sy + r * pSize, pSize, pSize);
         }
       }
     }
   }
   ```

---

## 🛠️ Herramientas recomendadas para crear tus propios Sprites

* **Aseprite** (Software de pago, el estándar de oro para animación pixel art).
* **LibreSprite** (Alternativa gratuita de código abierto basada en una versión anterior de Aseprite).
* **Piskel** (Herramienta web gratuita online muy intuitiva para crear spritesheets e iconos pixelados).
* **Lospec.com** (Base de datos y comunidad con cientos de paletas de colores clásicas preestablecidas (como la NES, Game Boy, Commodore 64) listas para usar).
