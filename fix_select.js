import fs from 'fs';
import path from 'path';

const filesToFix = [
  path.join(process.cwd(), 'src', 'pages', 'GetStarted.tsx'),
  path.join(process.cwd(), 'src', 'pages', 'Contact.tsx'),
  path.join(process.cwd(), 'src', 'pages', 'Results.tsx'),
];

for (const file of filesToFix) {
    if (!fs.existsSync(file)) continue;
    let content = fs.readFileSync(file, 'utf-8');
    content = content.replace(/bg-\[#0a0f1c\] text-brand-black dark:text-white/g, "bg-white dark:bg-[#0a0f1c] text-brand-black dark:text-white");
    // Also, there's a card in Results that uses bg-[#0a0f1c] inside light mode?
    content = content.replace(/bg-\[#0a0f1c\]/g, "bg-white dark:bg-[#0a0f1c]");
    
    fs.writeFileSync(file, content);
}
