import fs from 'fs';

function processFile(filePath: string) {
    let content = fs.readFileSync(filePath, 'utf-8');

    // Make metric cards bg-white instead of bg-slate-100
    content = content.replace(/className="bg-slate-100 border border-slate-200 rounded-xl p-4 relative overflow-hidden group"/g, 
        'className="bg-white border border-slate-200 shadow-sm rounded-xl p-5 relative overflow-hidden group"');
    
    // Fix general panel backgrounds (they might have become slate-100 or white incorrectly)
    content = content.replace(/className="bg-slate-100 border border-slate-200 rounded-xl p-4 md:p-6"/g, 
        'className="bg-white border border-slate-200 shadow-sm rounded-xl p-6 flex flex-col"');
    
    // Primary buttons
    content = content.replace(/hover:bg-blue-500/g, 'hover:bg-blue-700');
    
    // Header shadow
    content = content.replace(/shadow-lg shadow-blue-600\/10/g, 'shadow-sm');

    // Make header sticky white explicitly
    content = content.replace(/bg-white\/90 backdrop-blur-md/g, 'bg-white shadow-sm');
    
    // Any remaining slate-950 that leaked
    content = content.replace(/text-slate-950/g, 'text-slate-900');
    
    // Ensure "text-white" in buttons specifically where it says text-slate-900
    // "bg-blue-600 text-slate-900" -> "bg-blue-600 text-white"
    content = content.replace(/bg-blue-600 text-slate-900 font-semibold shadow-sm/g, 'bg-blue-600 text-white font-semibold shadow-md');

    fs.writeFileSync(filePath, content, 'utf-8');
}

processFile('./src/App.tsx');
console.log('Final tweaks applied');
