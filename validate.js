const f = require('fs').readFileSync('C:/Users/shawn/Downloads/Green Bay Explorer.html','utf8');
const re = /\{id:(\d+)/g;
const ids = [];
let m;
while (m = re.exec(f)) ids.push(parseInt(m[1]));
console.log('Total entries:', ids.length);
console.log('Max ID:', Math.max(...ids));
const dupes = ids.filter((v,i) => ids.indexOf(v) !== i);
console.log('Duplicate IDs:', dupes.length > 0 ? dupes : 'NONE');

const cats = {};
const re2 = /cat:"([^"]+)"/g;
while (m = re2.exec(f)) cats[m[1]] = (cats[m[1]]||0) + 1;
console.log('\nCategories:');
Object.entries(cats).sort((a,b) => b[1]-a[1]).forEach(x => console.log('  ' + x[0] + ': ' + x[1]));

const subs = {};
const re3 = /sub:"([^"]+)"/g;
while (m = re3.exec(f)) subs[m[1]] = (subs[m[1]]||0) + 1;
console.log('\nNew Sub-Categories (added this round):');
Object.entries(subs).sort((a,b) => b[1]-a[1]).forEach(x => {
  if (x[0].includes('Senior') || x[0].includes('Faith') || x[0].includes('Christian') || x[0].includes('Thrift') || x[0].includes('Day Trip') || x[0].includes('Education'))
    console.log('  ' + x[0] + ': ' + x[1]);
});

// Check JS syntax by trying to parse the DATA array
const dataMatch = f.match(/const DATA = \[([\s\S]*?)\];/);
if (dataMatch) {
  try {
    eval('var test = [' + dataMatch[1] + ']');
    console.log('\nJS Syntax: VALID');
    console.log('Array length from eval:', test.length);
  } catch(e) {
    console.log('\nJS Syntax ERROR:', e.message);
    const pos = e.message.match(/position (\d+)/);
    if (pos) {
      const p = parseInt(pos[1]);
      console.log('Near:', dataMatch[1].substring(p-100, p+100));
    }
  }
}
