const f = require('fs').readFileSync('C:/Users/shawn/Downloads/Green Bay Explorer.html','utf8');
const dataMatch = f.match(/const DATA = \[([\s\S]*?)\];/);
if (!dataMatch) { console.log('No DATA found'); process.exit(1); }
let items;
try { items = eval('[' + dataMatch[1] + ']'); } catch(e) { console.log('Parse error', e.message); process.exit(1); }

console.log('Total items:', items.length);

// Count items with/without dates
const withDate = items.filter(i => i.date && i.date.length > 0);
const withoutDate = items.filter(i => !i.date || i.date.length === 0);
console.log('With date:', withDate.length);
console.log('Without date:', withoutDate.length);

// Show categories of items WITH dates
const dateCats = {};
withDate.forEach(i => { dateCats[i.cat] = (dateCats[i.cat]||0)+1; });
console.log('\n=== Items WITH dates by category ===');
Object.entries(dateCats).sort((a,b)=>b[1]-a[1]).forEach(x => console.log('  '+x[0]+': '+x[1]));

// Show subcategories of items WITH dates
const dateSubs = {};
withDate.forEach(i => { dateSubs[i.sub] = (dateSubs[i.sub]||0)+1; });
console.log('\n=== Items WITH dates by sub-category (top 30) ===');
Object.entries(dateSubs).sort((a,b)=>b[1]-a[1]).slice(0,30).forEach(x => console.log('  '+x[0]+': '+x[1]));

// Show categories of items WITHOUT dates
const noCats = {};
withoutDate.forEach(i => { noCats[i.cat] = (noCats[i.cat]||0)+1; });
console.log('\n=== Items WITHOUT dates by category ===');
Object.entries(noCats).sort((a,b)=>b[1]-a[1]).forEach(x => console.log('  '+x[0]+': '+x[1]));

// Show subcategories of items WITHOUT dates (top 40)
const noSubs = {};
withoutDate.forEach(i => { noSubs[i.sub] = (noSubs[i.sub]||0)+1; });
console.log('\n=== Items WITHOUT dates by sub-category (top 40) ===');
Object.entries(noSubs).sort((a,b)=>b[1]-a[1]).slice(0,40).forEach(x => console.log('  '+x[0]+': '+x[1]));

// Show EVENT items without dates (these most need dates)
const eventNoDate = items.filter(i => i.cat === 'Event' && (!i.date || i.date.length === 0));
console.log('\n=== EVENT items missing dates: ' + eventNoDate.length + ' ===');
const eventNoDateSubs = {};
eventNoDate.forEach(i => { eventNoDateSubs[i.sub] = (eventNoDateSubs[i.sub]||0)+1; });
Object.entries(eventNoDateSubs).sort((a,b)=>b[1]-a[1]).forEach(x => console.log('  '+x[0]+': '+x[1]));

// Show sample EVENT items missing dates
console.log('\n=== Sample EVENT items missing dates (first 20) ===');
eventNoDate.slice(0,20).forEach(i => console.log('  ['+i.id+'] '+i.name+' ('+i.sub+') venue: '+i.venue));

// Show ACTIVITY items that are recurring events (might need seasonal dates)
const recurringAct = items.filter(i => i.cat === 'Activity' && i.recurring && (!i.date || i.date.length === 0));
console.log('\n=== Recurring ACTIVITY items without dates: ' + recurringAct.length + ' ===');
const recActSubs = {};
recurringAct.forEach(i => { recActSubs[i.sub] = (recActSubs[i.sub]||0)+1; });
Object.entries(recActSubs).sort((a,b)=>b[1]-a[1]).slice(0,20).forEach(x => console.log('  '+x[0]+': '+x[1]));

// Date range analysis for items that HAVE dates
console.log('\n=== Date range of items WITH dates ===');
const dates = withDate.map(i => i.date).filter(d => d.match(/^\d{4}-\d{2}/)).sort();
if (dates.length) {
  console.log('Earliest:', dates[0]);
  console.log('Latest:', dates[dates.length-1]);
  // How many are in 2025 vs 2026
  const y2025 = dates.filter(d => d.startsWith('2025'));
  const y2026 = dates.filter(d => d.startsWith('2026'));
  console.log('2025 dates:', y2025.length);
  console.log('2026 dates:', y2026.length);
  // By month
  const byMonth = {};
  dates.forEach(d => { const m = d.substring(0,7); byMonth[m] = (byMonth[m]||0)+1; });
  console.log('\nBy month:');
  Object.entries(byMonth).sort().forEach(x => console.log('  '+x[0]+': '+x[1]));
}

// Look at items with dates past August 2026
const pastAug = withDate.filter(i => i.date > '2026-08-31');
console.log('\nItems with dates after Aug 2026:', pastAug.length);
