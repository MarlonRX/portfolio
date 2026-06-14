const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

// Port definition, customizable via environment variable
const PORT = process.env.PORT || 3000;
const BASE_URL = `http://localhost:${PORT}`;

// Extract project slugs dynamically from projects.ts using regex
function getProjectSlugs() {
  try {
    const filePath = path.join(__dirname, '../src/data/projects.ts');
    if (!fs.existsSync(filePath)) {
      console.warn("⚠️ Warning: projects.ts not found. Defaulting to standard projects.");
      return ["cashpilot", "logis", "project-3"];
    }
    const content = fs.readFileSync(filePath, 'utf8');
    const matches = [...content.matchAll(/slug:\s*["']([^"']+)["']/g)];
    return matches.map(m => m[1]);
  } catch (error) {
    console.error("❌ Error parsing projects.ts:", error.message);
    return ["cashpilot", "logis", "project-3"];
  }
}

async function capture(slug) {
  const outputDir = path.join(__dirname, '../public/images/projects');
  const outputPath = path.join(outputDir, `${slug}-hero.webp`);

  // Ensure output directory exists
  fs.mkdirSync(outputDir, { recursive: true });

  if (slug === "cashpilot") {
    // CashPilot uses the Vercel dynamic image API (Satori/next/og)
    const url = `${BASE_URL}/api/promo/${slug}`;
    console.log(`\n🎨 [Satori/Vercel OG] Requesting promo banner for: "${slug}"`);
    console.log(`🔗 URL: ${url}`);

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Server returned status ${response.status}: ${response.statusText}`);
      }
      const arrayBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      fs.writeFileSync(outputPath, buffer);
      console.log(`✅ Success! Dynamic banner saved to: ${outputPath}`);
    } catch (error) {
      console.error(`❌ Error fetching banner for "${slug}":`, error.message);
      if (error.message.includes('ECONNREFUSED')) {
        console.error(`\n💡 Tip: Make sure your local Next.js development server is running on port ${PORT}.`);
        console.error(`   Run: npm run dev`);
      }
    }
  } else {
    // Other projects use Puppeteer to capture their retro terminal mockup screen
    const url = `${BASE_URL}/es/projects/${slug}/mockup`;
    console.log(`\n📸 [Puppeteer] Capturing retro mockup for: "${slug}"`);
    console.log(`🔗 URL: ${url}`);

    let browser;
    try {
      browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      });

      const page = await browser.newPage();
      await page.setViewport({
        width: 1200,
        height: 750,
        deviceScaleFactor: 2
      });

      await page.goto(url, { waitUntil: 'networkidle2' });
      await new Promise(resolve => setTimeout(resolve, 1500));

      await page.screenshot({
        path: outputPath,
        type: 'webp',
        quality: 90
      });

      console.log(`✅ Success! Screenshot saved to: ${outputPath}`);
    } catch (error) {
      console.error(`❌ Error capturing project "${slug}" with Puppeteer:`, error.message);
      if (error.message.includes('ECONNREFUSED')) {
        console.error(`\n💡 Tip: Make sure your local Next.js development server is running on port ${PORT}.`);
        console.error(`   Run: npm run dev`);
      }
    } finally {
      if (browser) {
        await browser.close();
      }
    }
  }
}

async function main() {
  // Check if a specific slug was passed in the arguments
  const args = process.argv.slice(2);
  const targetSlug = args[0];

  if (targetSlug) {
    await capture(targetSlug);
  } else {
    // Capture all projects
    const slugs = getProjectSlugs();
    console.log(`📂 Found ${slugs.length} projects to capture: ${slugs.join(', ')}`);
    for (const slug of slugs) {
      await capture(slug);
    }
  }
}

main().catch(console.error);
