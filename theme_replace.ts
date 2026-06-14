import fs from 'fs';
import path from 'path';

function processFile(filePath: string) {
    let content = fs.readFileSync(filePath, 'utf-8');

    // Make backups just in case
    // General background and layout
    content = content.replace(/bg-slate-950\/80/g, 'bg-white/90');
    content = content.replace(/bg-slate-950/g, 'bg-slate-50');
    content = content.replace(/bg-slate-900\/50/g, 'bg-slate-100');
    content = content.replace(/bg-slate-900/g, 'bg-white');
    content = content.replace(/bg-slate-800/g, 'bg-white'); // Sometimes slate-800 is used for cards or secondary bg, making it white
    content = content.replace(/bg-slate-700\/50/g, 'bg-slate-100');
    content = content.replace(/bg-slate-700/g, 'bg-slate-200');

    // Text colors
    content = content.replace(/text-slate-100/g, 'text-slate-900');
    // text-white -> text-slate-800 for headers etc.
    content = content.replace(/text-white/g, 'text-slate-900');
    content = content.replace(/text-slate-200/g, 'text-slate-800');
    content = content.replace(/text-slate-300/g, 'text-slate-600');
    content = content.replace(/text-slate-400/g, 'text-slate-500');
    content = content.replace(/text-slate-500/g, 'text-slate-500');

    // Borders
    content = content.replace(/border-slate-900/g, 'border-slate-200');
    content = content.replace(/border-slate-800/g, 'border-slate-200');
    content = content.replace(/border-slate-950\/20/g, 'border-slate-200');
    content = content.replace(/border-slate-700\/50/g, 'border-slate-300');
    content = content.replace(/border-slate-700/g, 'border-slate-300');

    // Emerald -> Blue
    content = content.replace(/bg-emerald-500\/10/g, 'bg-blue-50');
    content = content.replace(/bg-emerald-500\/20/g, 'bg-blue-100');
    content = content.replace(/border-emerald-500\/20/g, 'border-blue-100');
    content = content.replace(/shadow-emerald-500\/10/g, 'shadow-blue-600/10');
    content = content.replace(/text-emerald-500/g, 'text-blue-700');
    content = content.replace(/text-emerald-400/g, 'text-blue-700');
    content = content.replace(/text-emerald-300/g, 'text-blue-600');
    content = content.replace(/text-emerald-200/g, 'text-blue-500');
    content = content.replace(/bg-emerald-500/g, 'bg-blue-600');
    content = content.replace(/emerald-500/g, 'blue-600');
    content = content.replace(/emerald-400/g, 'blue-600');
    content = content.replace(/emerald-600/g, 'blue-700');

    // Indigo -> Blue
    content = content.replace(/indigo-600/g, 'blue-600');
    content = content.replace(/indigo-500/g, 'blue-500');
    content = content.replace(/teal-500/g, 'slate-200'); // Assuming teal was another accent, use slate
    content = content.replace(/amber-500/g, 'slate-200'); 

    // Specific button fixes to keep their text white
    content = content.replace(/bg-blue-600(.*?)text-slate-900/g, 'bg-blue-600$1text-white');
    content = content.replace(/text-slate-900(.*?)bg-blue-600/g, 'text-white$1bg-blue-600');
    content = content.replace(/text-slate-900 font-semibold shadow-md shadow-blue-600\/10/g, 'text-white font-semibold shadow-md'); 

    content = content.replace(/bg-red-500 text-slate-900/g, 'bg-red-500 text-white');

    // Restructure some shadows and borders to match the design
    content = content.replace(/shadow-lg shadow-slate-900\/5/g, 'shadow-sm');

    // Revert styling on explicitly "Success" or "Error" text/tags if needed
    // But honestly, the Professional Polish uses emerald-600 for positive, so let's put that back where it matters
    // Like in metric cards (if those exist, they used to be emerald maybe)
    // For now we'll stick to blue as primary action and let's see.

    // Fix the logo area inner background
    content = content.replace(/from-blue-600 to-teal-400/g, 'from-blue-600 to-blue-500');
    content = content.replace(/bg-white rounded-\[10px\] flex items-center justify-center/g, ''); // just remove the inner bg if it exists or fix it
    
    // Actually just specific fixes:
    content = content.replace(/<div className="w-full h-full bg-white rounded-\[10px\] flex items-center justify-center">/g, 
        '<div className="w-full h-full bg-blue-600 rounded-[10px] flex items-center justify-center">');

    // Replace the main outer class 
    content = content.replace(/min-h-screen bg-slate-50 text-slate-900/g, 'min-h-screen bg-slate-50 text-slate-900');
    content = content.replace(/text-slate-900 font-sans selection:bg-blue-600 selection:text-slate-50 flex flex-col justify-between/, 
        'text-slate-900 font-sans selection:bg-blue-200 selection:text-slate-900 flex flex-col justify-between');
    
    fs.writeFileSync(filePath, content, 'utf-8');
}

processFile('./src/App.tsx');
console.log('Theme replaced');
