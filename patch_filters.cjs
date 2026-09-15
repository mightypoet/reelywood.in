const fs = require('fs');
let code = fs.readFileSync('src/components/sections/FeaturedClients.tsx', 'utf8');

code = code.replace(
  'mix-blend-multiply filter grayscale hover:grayscale-0 transition-all duration-300',
  'transition-all duration-300'
);

fs.writeFileSync('src/components/sections/FeaturedClients.tsx', code);
