const fs = require('fs');
const path = 'C:/Users/shawn/Downloads/Green Bay Explorer.html';
let html = fs.readFileSync(path, 'utf8');

const fixes = [
  {id:2894, newDate:"2026-07-18", newLabel:"Sat Jul 18 (5K), Fri Jul 17 (Kids 1K) — confirm packers.com"},
  {id:2917, newDate:"2026-06-01", newDateTo:"2026-08-31", newLabel:"Wednesdays 7pm, Jun-Aug (dates TBA)"},
  {id:3127, newDate:"2026-03-14", newLabel:"Sat Mar 14, 9am-2pm"},
  {id:3131, newDate:"2026-09-15", newLabel:"Fall sessions (Sep-Oct, check BCHS)"},
  {id:2852, newDate:"2026-10-01", newDateTo:"2026-10-31", newLabel:"October (check terroronthefox.com)"},
  {id:2853, newDate:"2026-10-01", newDateTo:"2026-10-31", newLabel:"October (check greenbayfear.com)"},
  {id:1770, newDate:"2026-11-20", newDateTo:"2026-12-31", newLabel:"Late Nov - Late Dec (annually)"},
  {id:1771, newDate:"2026-11-20", newDateTo:"2026-12-31", newLabel:"Late Nov - Late Dec (annually)"},
  {id:2334, newDate:"2026-11-20", newDateTo:"2026-12-31", newLabel:"Late Nov - Late Dec (annually)"},
  {id:2335, newDate:"2026-11-20", newDateTo:"2026-12-31", newLabel:"Late Nov - Late Dec (annually)"},
  {id:2928, newDate:"2026-02-20", newDateTo:"2026-04-03", newLabel:"Lenten Fridays (Feb 20 - Apr 3)"},
  {id:2929, newDate:"2026-02-20", newDateTo:"2026-04-03", newLabel:"Lenten Fridays (Feb 20 - Apr 3)"},
  {id:2963, newDate:"2026-04-01", newLabel:"Check Prevea calendar for 2026 dates"},
  {id:2982, newDate:"2026-06-01", newLabel:"Monthly — check Kroc Center schedule"},
  {id:3008, newDate:"2026-06-01", newLabel:"Varies — check GBCC for 2026 dates"},
];

let count = 0;
for (const u of fixes) {
  const idStr = '{id:' + u.id + ',';
  const idx = html.indexOf(idStr);
  if (idx === -1) { console.log('NOT FOUND: id:' + u.id); continue; }
  
  const entryEnd = html.indexOf('}', idx);
  let entryStr = html.substring(idx, entryEnd + 1);
  let updated = entryStr;
  
  // Replace date
  if (updated.includes('date:"')) {
    updated = updated.replace(/date:"[^"]*"/, 'date:"' + u.newDate + '"');
  }
  
  // Replace or add dateTo
  if (u.newDateTo) {
    if (updated.includes('dateTo:"')) {
      updated = updated.replace(/dateTo:"[^"]*"/, 'dateTo:"' + u.newDateTo + '"');
    }
  }
  
  // Replace dateLabel
  if (updated.includes('dateLabel:"')) {
    updated = updated.replace(/dateLabel:"[^"]*"/, 'dateLabel:"' + u.newLabel + '"');
  }
  
  if (updated !== entryStr) {
    html = html.replace(entryStr, updated);
    count++;
    console.log('Fixed id:' + u.id);
  } else {
    console.log('NO CHANGE: id:' + u.id);
  }
}

fs.writeFileSync(path, html, 'utf8');
console.log('\nFixed ' + count + ' entries. File size: ' + Buffer.byteLength(html, 'utf8'));
