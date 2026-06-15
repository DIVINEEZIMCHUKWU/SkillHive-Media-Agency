import fs from 'fs';
import path from 'path';

const dirsToScan = [
  path.join(process.cwd(), 'src', 'pages'),
  path.join(process.cwd(), 'src', 'components')
];

for (const dir of dirsToScan) {
  if (!fs.existsSync(dir)) continue;
  
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

  for (const file of files) {
      if (file === 'Admin.tsx') continue;
      
      let content = fs.readFileSync(path.join(dir, file), 'utf-8');
      
      // Fix bad text colors
      // Example: 'text-white' not prefixed with dark:
      content = content.replace(/(?<!dark:)text-white/g, "text-brand-black dark:text-white");
      // Except in cases where the background is strictly blue or another color without dark variants:
      // Oh wait, buttons like "bg-brand-blue text-brand-black dark:text-white" -> "text-white" on blue background is good!
      // Let's restore text-white for buttons with background blue or #25D366 (whatsapp)
      
      // We will do a generic replacement, then fix up specific buttons.
      content = content.replace(/text-brand-black dark:text-white/g, "text-brand-black dark:text-white"); // standard
      
      // Clean redundancies
      content = content.replace(/text-brand-black dark:text-brand-black dark:text-white/g, "text-brand-black dark:text-white");
      
      // Fix background for cards
      content = content.replace(/bg-gray-100 dark:bg-white\/5/g, "bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10");
      content = content.replace(/bg-brand-white dark:bg-brand-black\/50/g, "bg-gray-50 dark:bg-brand-black/50");
      content = content.replace(/bg-gray-50 dark:bg-brand-black\/50/g, "bg-gray-50 dark:bg-brand-black/50 border border-gray-200 dark:border-white/10");
      
      // Let's fix text-brand-black dark:text-white px-
      content = content.replace(/bg-brand-blue text-brand-black dark:text-white/g, "bg-brand-blue text-white");
      content = content.replace(/bg-\[\#25D366\] text-brand-black dark:text-white/g, "bg-[#25D366] text-white");
      content = content.replace(/bg-gradient-to-r from-brand-blue to-blue-600 text-brand-black dark:text-white/g, "bg-gradient-to-r from-brand-blue to-blue-600 text-white");
      
      fs.writeFileSync(path.join(dir, file), content);
  }
}
