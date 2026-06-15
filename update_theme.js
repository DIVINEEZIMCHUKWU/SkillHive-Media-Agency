import fs from 'fs';
import path from 'path';

const pagesDir = path.join(process.cwd(), 'src', 'pages');
const pages = fs.readdirSync(pagesDir).filter(f => f.endsWith('.tsx'));

for (const page of pages) {
    let content = fs.readFileSync(path.join(pagesDir, page), 'utf-8');
    
    // Replace hardcoded dark theme with togglable dark theme
    content = content.replace(/bg-brand-black text-white/g, "bg-brand-white text-brand-black dark:bg-brand-black dark:text-white");
    content = content.replace(/bg-brand-black\/50/g, "bg-white/50 dark:bg-brand-black/50");
    content = content.replace(/text-white/g, "text-brand-black dark:text-white");
    content = content.replace(/text-gray-400/g, "text-gray-600 dark:text-gray-400");
    content = content.replace(/border-white\/5/g, "border-gray-200 dark:border-white/5");
    content = content.replace(/border-white\/10/g, "border-gray-200 dark:border-white/10");
    content = content.replace(/bg-\[\#0a0f1c\]/g, "bg-gray-50 dark:bg-[#0a0f1c]");
    content = content.replace(/bg-white\/5/g, "bg-gray-50 dark:bg-white/5");
    
    // Some pages just have bg-brand-black without text-white near it
    content = content.replace(/bg-brand-black /g, "bg-brand-white dark:bg-brand-black ");
    content = content.replace(/bg-brand-black"/g, "bg-brand-white dark:bg-brand-black\"");
    
    // Re-fix some accidental over-replacements
    content = content.replace(/dark:text-brand-black /g, "dark:text-white "); // Just in case
    
    fs.writeFileSync(path.join(pagesDir, page), content);
}

// Layout header update
const layoutPath = path.join(process.cwd(), 'src', 'components', 'Layout.tsx');
if (fs.existsSync(layoutPath)) {
    let layoutContent = fs.readFileSync(layoutPath, 'utf-8');
    layoutContent = layoutContent.replace(/bg-brand-white\/90/g, "bg-brand-white/90 dark:bg-brand-black/90 dark:border-white/10");
    layoutContent = layoutContent.replace(/border-gray-100/g, "border-gray-100 dark:border-white/10");
    layoutContent = layoutContent.replace(/text-brand-black/g, "text-brand-black dark:text-brand-white");
    layoutContent = layoutContent.replace(/text-gray-600/g, "text-gray-600 dark:text-gray-300");
    layoutContent = layoutContent.replace(/hover:text-brand-blue/g, "hover:text-brand-blue dark:hover:text-blue-400");
    layoutContent = layoutContent.replace(/bg-gray-50/g, "bg-gray-50 dark:bg-white/5");
    fs.writeFileSync(layoutPath, layoutContent);
}
