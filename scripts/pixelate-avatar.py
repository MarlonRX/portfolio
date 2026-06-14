import sys
import os
from PIL import Image

def pixelate(image_path, output_path):
    try:
        # Open image
        img = Image.open(image_path)
        img = img.convert("RGB")
        
        # 1. Crop to square (centered with a 200% zoom)
        width, height = img.size
        min_dim = min(width, height)
        cx, cy = width // 2, height // 2
        crop_size = min_dim // 2  # 200% zoom (half the bounding square size)
        
        left = cx - crop_size // 2
        top = cy - crop_size // 2
        right = cx + crop_size // 2
        bottom = cy + crop_size // 2
        img = img.crop((left, top, right, bottom))
        
        # 2. Resize to low-res target (128x128 pixels for retro dithered style)
        target_size = 128
        img_low = img.resize((target_size, target_size), Image.Resampling.BILINEAR)
        
        # 3. Create a custom retro CRT palette (RGB triplets)
        # Deep green, mid green, neon green, gold, white, black, dark gray
        palette = [
            10, 15, 10,     # Very dark green-gray (shadows)
            25, 45, 25,     # Dark forest green
            34, 120, 54,    # Classic green
            34, 197, 94,    # Neon green (accent/highlights)
            160, 240, 180,  # Pale green-white (brightest highlights)
            212, 175, 55,   # Gold
            20, 20, 25,     # Near black
            240, 240, 245,  # Pure light white-gray
        ]
        # Pad palette to 256 colors (768 integers total)
        palette += [0] * (768 - len(palette))
        
        palette_img = Image.new("P", (1, 1))
        palette_img.putpalette(palette)
        
        # 4. Quantize using our custom palette with Floyd-Steinberg dithering for retro texture
        img_indexed = img_low.quantize(palette=palette_img, dither=Image.Dither.FLOYDSTEINBERG)
        
        # 5. Scale back up to 512x512 using NEAREST to preserve crisp retro pixels
        img_final = img_indexed.convert("RGB").resize((512, 512), Image.Resampling.NEAREST)
        
        # Save image
        img_final.save(output_path, "PNG")
        print(f"✅ Success! Pixelated avatar saved to: {output_path}")
        
    except Exception as e:
        print(f"❌ Error processing image: {e}")
        sys.exit(1)

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python scripts/pixelate-avatar.py <path_to_raw_image> [output_path]")
        sys.exit(1)
    
    input_path = sys.argv[1]
    output_path = sys.argv[2] if len(sys.argv) > 2 else "public/sprites/avatar-pixelated.png"
    
    if not os.path.exists(input_path):
        print(f"Error: Input file '{input_path}' not found.")
        sys.exit(1)
        
    pixelate(input_path, output_path)
