import fs from 'fs';
import path from 'path';

const pagesDir = path.join(process.cwd(), 'src', 'pages');
const pages = fs.readdirSync(pagesDir).filter(f => f.endsWith('.tsx'));

for (const page of pages) {
    let content = fs.readFileSync(path.join(pagesDir, page), 'utf-8');
    
    content = content.replace(/bg-brand-white text-brand-black dark:text-white/g, "bg-brand-black text-white");
    content = content.replace(/bg-brand-white text-brand-black dark:bg-brand-black dark:text-white/g, "bg-brand-black text-white");
    content = content.replace(/bg-white\/50 dark:bg-brand-black\/50/g, "bg-brand-black/50");
    content = content.replace(/text-brand-black dark:text-white/g, "text-white");
    content = content.replace(/text-gray-600 dark:text-gray-400/g, "text-gray-400");
    content = content.replace(/text-gray-600 dark:text-gray-300/g, "text-gray-300");
    content = content.replace(/bg-brand-white dark:bg-brand-black/g, "bg-brand-black");
    content = content.replace(/border-gray-200 dark:border-white\/5/g, "border-white/5");
    content = content.replace(/border-gray-200 dark:border-white\/10/g, "border-white/10");
    content = content.replace(/bg-gray-50 dark:bg-\[\#0a0f1c\]/g, "bg-[#0a0f1c]");
    content = content.replace(/bg-gray-50 dark:bg-white\/5/g, "bg-white/5");
    content = content.replace(/bg-brand-white/g, "bg-brand-black");
    content = content.replace(/text-brand-black/g, "text-white");
    content = content.replace(/dark:/g, "");

    fs.writeFileSync(path.join(pagesDir, page), content);
}
