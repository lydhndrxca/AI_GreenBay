const fs = require('fs');
const path = 'C:/Users/shawn/Downloads/Green Bay Explorer.html';
let html = fs.readFileSync(path, 'utf8');

const updates = [
  {id:1928, newDate:"2026-06-01", newDateTo:"2026-08-31", newLabel:"Wednesdays 7pm, Jun-Aug (dates TBA on greenbaycityband.com)"},
  {id:1929, newDate:"2026-06-07", newLabel:"Sun Jun 7, 3-10pm"},
  {id:2190, newDate:"2026-05-23", newDateTo:"2026-10-31", newLabel:"Saturdays 7am-Noon, May 23 - Oct 31"},
  {id:2191, newDate:"2026-06-04", newDateTo:"2026-10-29", newLabel:"Thursdays 2-7pm, Jun 4 - Oct 29"},
  {id:2131, newDate:"2026-03-27", newDateTo:"2026-08-31", newLabel:"Fri 7:30pm & Sat 6:30+8:30pm year-round"},
  {id:1876, newDate:"2026-06-11", newDateTo:"2026-08-27", newLabel:"Various summer dates — check greenbayfoodtrucks.com"},
  {id:2108, newDate:"2026-04-04", newLabel:"Sat Apr 4, 8am-5pm ($8 admission)"},
  {id:2302, newDate:"2026-06-01", newDateTo:"2026-08-31", newLabel:"Fridays 11am-1pm (summer)"},
  {id:2401, newDate:"2026-04-09", newDateTo:"2026-08-09", newLabel:"Apr 9-26 (Shopko) & Jul 23-Aug 9 (Dingaling)"},
  {id:2697, newDate:"2026-03-26", newLabel:"Thu Mar 26, 5-9pm (pop-up dates vary)"},
  {id:1472, newDate:"2026-03-22", newDateTo:"2026-08-31", newLabel:"Weekly — check Lyric Room schedule"},
  {id:1807, newDate:"2026-01-03", newDateTo:"2026-05-16", newLabel:"1st & 3rd Sat 9am-1pm (winter indoor)"},
  {id:1912, newDate:"2026-03-04", newDateTo:"2026-08-05", newLabel:"1st Wed monthly 9am-8pm (free for Brown Co.)"},
  {id:1914, newDate:"2026-03-09", newDateTo:"2026-04-27", newLabel:"Mondays 10am (spring sessions)"},
  {id:1921, newDate:"2026-06-01", newDateTo:"2026-08-31", newLabel:"Fridays 11am-1pm (summer)"},
  {id:2477, newDate:"2026-02-20", newDateTo:"2026-04-03", newLabel:"Lenten Fridays (Feb 20 - Apr 3)"},
];

let count = 0;
for (const u of updates) {
  // Find the exact entry and replace date:"" with date:"YYYY-MM-DD"
  const idStr = '{id:' + u.id + ',';
  const idx = html.indexOf(idStr);
  if (idx === -1) { console.log('NOT FOUND: id:' + u.id); continue; }
  
  // Find the date:"..." field within this entry
  const entryEnd = html.indexOf('}', idx);
  let entryStr = html.substring(idx, entryEnd + 1);
  
  // Replace date field
  let updated = entryStr.replace(/date:"[^"]*"/, 'date:"' + u.newDate + '"');
  
  // Replace or add dateTo
  if (u.newDateTo) {
    if (updated.includes('dateTo:"')) {
      updated = updated.replace(/dateTo:"[^"]*"/, 'dateTo:"' + u.newDateTo + '"');
    } else {
      // Insert dateTo after date
      updated = updated.replace(/date:"[^"]*"/, 'date:"' + u.newDate + '",dateTo:"' + u.newDateTo + '"');
    }
  }
  
  // Replace dateLabel
  updated = updated.replace(/dateLabel:"[^"]*"/, 'dateLabel:"' + u.newLabel + '"');
  
  html = html.replace(entryStr, updated);
  count++;
  console.log('Fixed id:' + u.id + ' -> date:' + u.newDate);
}

fs.writeFileSync(path, html, 'utf8');
console.log('\nUpdated ' + count + ' entries. File size: ' + Buffer.byteLength(html, 'utf8'));
