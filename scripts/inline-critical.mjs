import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function inlineCritical() {
  const distPath = path.resolve(__dirname, '../dist');
  const htmlPath = path.join(distPath, 'index.html');
  
  let html = fs.readFileSync(htmlPath, 'utf-8');
  
  // Find the CSS link tag
  const cssMatch = html.match(/<link rel="stylesheet" crossorigin href="(\/assets\/index-[^"]+\.css)">/);
  
  if (!cssMatch) {
    console.log('No CSS link found in HTML');
    return;
  }
  
  const cssHref = cssMatch[1];
  const cssFileName = cssHref.replace('/assets/', '');
  const cssPath = path.join(distPath, 'assets', cssFileName);
  
  if (!fs.existsSync(cssPath)) {
    console.log('CSS file not found:', cssPath);
    return;
  }
  
  const cssContent = fs.readFileSync(cssPath, 'utf-8');
  const criticalCss = cssContent.slice(0, 40000);
  
  // Remove original CSS link
  html = html.replace(cssMatch[0], '');
  
  // Add inline critical CSS + async load for rest
  const inlineStyle = `<style>${criticalCss}</style>`;
  const asyncLoad = `<link rel="preload" href="${cssHref}" as="style" onload="this.onload=null;this.rel='stylesheet'"><noscript><link rel="stylesheet" href="${cssHref}"></noscript>`;
  
  html = html.replace('</head>', `  ${inlineStyle}\n  ${asyncLoad}\n</head>`);
  
  fs.writeFileSync(htmlPath, html);
  console.log('✅ Critical CSS inlined successfully');
}

inlineCritical().catch(console.error);