import fs from 'fs';
import path from 'path';

const pagesDir = path.join(process.cwd(), 'src', 'pages');
const pages = fs.readdirSync(pagesDir).filter(f => f.endsWith('.tsx'));

for (const page of pages) {
    let content = fs.readFileSync(path.join(pagesDir, page), 'utf-8');
    
    // For ServiceDetail.tsx:202 and GetStarted.tsx:257
    content = content.replace(/from-brand-blue to-blue-800 text-brand-black dark:text-white/g, "from-brand-blue to-blue-800 text-white");
    
    // For About.tsx:105
    if (page === 'About.tsx') {
        content = content.replace(/<h2 className="text-3xl md:text-4xl font-bold mb-6 text-brand-black dark:text-white">Ready to partner with us\?<\/h2>/, "<h2 className=\"text-3xl md:text-4xl font-bold mb-6 text-white\">Ready to partner with us?</h2>");
    }
    
    // For Results.tsx:82
    if (page === 'Results.tsx') {
        content = content.replace(/<h2 className="text-3xl font-bold text-brand-black dark:text-white mb-6">Want to be our next success story\?<\/h2>/, "<h2 className=\"text-3xl font-bold text-white mb-6\">Want to be our next success story?</h2>");
    }

    fs.writeFileSync(path.join(pagesDir, page), content);
}
