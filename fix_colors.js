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
      
      content = content.replace(/(?<!dark:)text-blue-300/g, "text-brand-blue dark:text-blue-300");
      content = content.replace(/(?<!dark:)text-blue-400/g, "text-brand-blue dark:text-blue-400");
      content = content.replace(/group-hover:text-brand-blue dark:group-hover:text-blue-300/g, "group-hover:text-brand-blue dark:group-hover:text-blue-300"); // idempotency check
      content = content.replace(/group-hover:text-brand-blue dark:text-blue-300/g, "group-hover:text-brand-blue dark:group-hover:text-blue-300");
      content = content.replace(/text-gray-400/g, "text-gray-600 dark:text-gray-400");
      content = content.replace(/text-gray-300/g, "text-gray-700 dark:text-gray-300");
      
      // Fix potential duplicates resulting from the above or previous scripts
      content = content.replace(/text-gray-600 dark:text-gray-600 dark:text-gray-400/g, "text-gray-600 dark:text-gray-400");
      content = content.replace(/text-gray-700 dark:text-gray-700 dark:text-gray-300/g, "text-gray-700 dark:text-gray-300");
      
      // User says "Reduce the texts on the Navigation bar so that the navigation bar button links there can be on a straight line".
      // That refers to Layout.tsx. I will do that via sed or manual edit.
      
      fs.writeFileSync(path.join(dir, file), content);
  }
}
