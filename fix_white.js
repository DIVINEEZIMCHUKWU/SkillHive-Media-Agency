import fs from 'fs';
import path from 'path';

const pagesDir = path.join(process.cwd(), 'src', 'pages');
const pages = fs.readdirSync(pagesDir).filter(f => f.endsWith('.tsx'));

for (const page of pages) {
    let content = fs.readFileSync(path.join(pagesDir, page), 'utf-8');
    
    content = content.replace(/bg-white text-white/g, "bg-white text-brand-black hover:bg-gray-100");

    fs.writeFileSync(path.join(pagesDir, page), content);
}
