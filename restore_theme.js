import fs from 'fs';
import path from 'path';

const pagesDir = path.join(process.cwd(), 'src', 'pages');
const pages = fs.readdirSync(pagesDir).filter(f => f.endsWith('.tsx'));

for (const page of pages) {
    if (page === 'Admin.tsx') continue; // Skip Admin.tsx
    
    let content = fs.readFileSync(path.join(pagesDir, page), 'utf-8');
    
    // Convert dark classes back to responsive classes
    content = content.replace(/bg-brand-black/g, "bg-brand-white dark:bg-brand-black");
    content = content.replace(/text-white/g, "text-brand-black dark:text-white");
    
    // Fix specifics that got messed up by global replace
    content = content.replace(/text-brand-black dark:text-brand-black/g, "text-brand-black");
    content = content.replace(/bg-brand-white bg-brand-white/g, "bg-brand-white");
    
    // Specific text colors
    content = content.replace(/text-gray-400/g, "text-gray-600 dark:text-gray-400");
    content = content.replace(/text-gray-300/g, "text-gray-700 dark:text-gray-300");
    content = content.replace(/border-white\/10/g, "border-gray-200 dark:border-white/10");
    content = content.replace(/border-white\/5/g, "border-gray-200 dark:border-white/5");
    content = content.replace(/bg-white\/5/g, "bg-gray-100 dark:bg-white/5");
    content = content.replace(/bg-\[#050505\]/g, "bg-gray-50 dark:bg-[#050505]");
    
    // CTA and buttons containing white text
    content = content.replace(/text-brand-black dark:text-white px-8/g, "text-white px-8");
    content = content.replace(/text-brand-black dark:text-white px-10/g, "text-white px-10");
    
    fs.writeFileSync(path.join(pagesDir, page), content);
}

// Layout header update
const layoutPath = path.join(process.cwd(), 'src', 'components', 'Layout.tsx');
if (fs.existsSync(layoutPath)) {
    let layoutContent = fs.readFileSync(layoutPath, 'utf-8');
    layoutContent = layoutContent.replace(/bg-brand-black\/80/g, "bg-white/80 dark:bg-brand-black/80");
    layoutContent = layoutContent.replace(/border-white\/10/g, "border-gray-200 dark:border-white/10");
    layoutContent = layoutContent.replace(/text-white/g, "text-brand-black dark:text-white");
    layoutContent = layoutContent.replace(/bg-brand-black\/90/g, "bg-white/95 dark:bg-brand-black/90");
    layoutContent = layoutContent.replace(/text-gray-300/g, "text-gray-600 dark:text-gray-300");
    fs.writeFileSync(layoutPath, layoutContent);
}
