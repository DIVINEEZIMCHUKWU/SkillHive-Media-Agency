import fs from 'fs';
import path from 'path';

const pagesDir = path.join(process.cwd(), 'src', 'pages');
const pages = fs.readdirSync(pagesDir).filter(f => f.endsWith('.tsx'));

for (const page of pages) {
    let content = fs.readFileSync(path.join(pagesDir, page), 'utf-8');
    
    // Fix double darkness
    content = content.replace(/dark:bg-brand-white dark:bg-brand-black/g, "dark:bg-brand-black");
    content = content.replace(/dark:bg-brand-white/g, ""); // Not generally useful on dark backgrounds.
    content = content.replace(/dark:text-white dark:text-white/g, "dark:text-white");
    content = content.replace(/dark:text-brand-black dark:text-white/g, "dark:text-white");
    
    // Fix double text-brand-black
    content = content.replace(/text-brand-black text-brand-black/g, "text-brand-black");
    
    // Fix double bg-brand-white
    content = content.replace(/bg-brand-white bg-brand-white/g, "bg-brand-white");
    content = content.replace(/bg-gray-50 dark:bg-white\/50/g, "bg-white/50");

    fs.writeFileSync(path.join(pagesDir, page), content);
}
