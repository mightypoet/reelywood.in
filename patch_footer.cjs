const fs = require('fs');
let code = fs.readFileSync('src/components/layout/Footer.tsx', 'utf8');

code = code.replace(
  /hello@reelywood\.com/g,
  'reelywood@gmail.com'
);

code = code.replace(
  '<a href="mailto:reelywood@gmail.com" className="inline-flex items-center gap-4 bg-background text-foreground font-sans font-medium px-8 py-4 hover:bg-primary hover:text-primary-foreground transition-all rounded-sm">',
  '<a href="mailto:reelywood@gmail.com" className="inline-flex items-center gap-4 bg-background text-foreground font-sans font-medium px-8 py-4 hover:bg-primary hover:text-primary-foreground transition-all rounded-sm mb-4">'
);

if (!code.includes('+91 9123961368')) {
  code = code.replace(
    'reelywood@gmail.com <ArrowRight className="w-4 h-4" />\n            </a>',
    'reelywood@gmail.com <ArrowRight className="w-4 h-4" />\n            </a>\n            <br />\n            <a href="tel:+919123961368" className="inline-flex items-center gap-4 bg-transparent border border-background/20 text-background font-sans font-medium px-8 py-4 hover:bg-background/10 transition-all rounded-sm">\n              +91 9123961368 <ArrowRight className="w-4 h-4" />\n            </a>'
  );
}

fs.writeFileSync('src/components/layout/Footer.tsx', code);
