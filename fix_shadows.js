import fs from 'fs';
import path from 'path';

const dirs = [
  path.join(process.cwd(), 'src', 'pages'),
  path.join(process.cwd(), 'src', 'components')
];

for (const dir of dirs) {
  if (!fs.existsSync(dir)) continue;
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));
  
  for (const file of files) {
      let content = fs.readFileSync(path.join(dir, file), 'utf-8');
      
      content = content.replace(/shadow-brand-blue\/\d+/g, "");
      // clean double spaces
      content = content.replace(/  /g, " ");

      fs.writeFileSync(path.join(dir, file), content);
  }
}
