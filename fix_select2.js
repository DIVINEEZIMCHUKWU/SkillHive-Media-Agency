import fs from 'fs';
import path from 'path';

const filesToFix = [
  path.join(process.cwd(), 'src', 'pages', 'GetStarted.tsx'),
  path.join(process.cwd(), 'src', 'pages', 'Contact.tsx'),
];

for (const file of filesToFix) {
    if (!fs.existsSync(file)) continue;
    let content = fs.readFileSync(file, 'utf-8');
    content = content.replace(/bg-white dark:bg-white dark:bg-\[#0a0f1c\]/g, "bg-white dark:bg-[#0a0f1c]");
    
    // add classes to options so they appear well on native rendering
    content = content.replace(/<option>/g, '<option className="bg-white text-black dark:bg-[#0a0f1c] dark:text-white">');
    content = content.replace(/<option value="([^"]+)">/g, '<option value="$1" className="bg-white text-black dark:bg-[#0a0f1c] dark:text-white">');

    fs.writeFileSync(file, content);
}
