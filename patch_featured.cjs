const fs = require('fs');
let code = fs.readFileSync('src/components/sections/FeaturedClients.tsx', 'utf8');

code = code.replace(
  'className="flex items-center w-max hover:[animation-play-state:paused]"',
  'className="flex items-center w-max min-w-max flex-shrink-0 hover:[animation-play-state:paused]"'
);

// also let's make sure the images don't shrink
code = code.replace(
  '<div key={idx} className="flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity duration-300">',
  '<div key={idx} className="flex items-center justify-center flex-shrink-0 opacity-70 hover:opacity-100 transition-opacity duration-300">'
);

// If the image is not showing anything because of multiply and grayscale, let's remove those filters just to be safe, or just keep them if they are not the problem. The problem was likely the flex shrink.
fs.writeFileSync('src/components/sections/FeaturedClients.tsx', code);
