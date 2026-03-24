const fs = require('fs');
const path = 'C:/Users/shawn/Downloads/Green Bay Explorer.html';
let html = fs.readFileSync(path, 'utf8');

const entries = [
// === FAST FOOD / CHICKEN ===
{id:4900,name:"Chick-fil-A Green Bay (Closed Sunday!)",cat:"Restaurant",sub:"Fast Food",date:"",dateLabel:"Mon-Sat 6:30am-10pm (CLOSED SUNDAY!)",venue:"Chick-fil-A",loc:"Ashwaubenon",addr:"2455 S Oneida St, Ashwaubenon, WI 54304",desc:"Original chicken sandwich, nuggets, waffle fries, lemonade. Breakfast biscuits. Closed Sundays!",url:"https://www.chick-fil-a.com/",setting:"indoor",walking:"lowWalking",goodFor:["seniors","family"],highlight:false,free:false,recurring:true,cuisine:"Chicken"},
{id:4901,name:"Buffalo Wild Wings (2 Locations, Wings!)",cat:"Restaurant",sub:"Wings",date:"",dateLabel:"Daily 11am-late (2 locations!)",venue:"Buffalo Wild Wings",loc:"Multiple Locations",addr:"2101 S Oneida St Ste 100, Green Bay, WI 54304",desc:"Wings! Traditional & boneless, sauces/dry rubs, big screens. Also at 2394 Costco Way (Bellevue). Great for watching Packers games!",url:"",setting:"indoor",walking:"lowWalking",goodFor:["family"],highlight:false,free:false,recurring:true,cuisine:"Wings"},
// === NATURE TRAILS ===
{id:4903,name:"East River Trail (~10 Mi Paved, Easy Walking!)",cat:"Activity",sub:"Trail",date:"",dateLabel:"Dawn to dusk (FREE, paved, easy!)",venue:"East River Trail",loc:"Green Bay to De Pere",addr:"Linear trail through Green Bay",desc:"~10 miles of PAVED easy walking! Flat, gentle, through parks. Perfect for seniors. Multiple park access points with restrooms. Free!",url:"",setting:"outdoor",walking:"someWalking",goodFor:["seniors"],highlight:true,free:true,recurring:true},
{id:4904,name:"Fox River State Trail (25 Miles!)",cat:"Activity",sub:"Trail",date:"",dateLabel:"5am-9pm (FREE walking, paved north end!)",venue:"Fox River State Trail",loc:"Green Bay southward",addr:"North end near Mason St, Green Bay",desc:"25-mile trail along Fox River! North section is PAVED and easy. Walking is FREE (biking may need state trail pass). Fox River views, wetlands, river towns.",url:"",setting:"outdoor",walking:"someWalking",goodFor:["seniors"],highlight:true,free:true,recurring:true},
{id:4905,name:"Baird Creek Greenway (8-14 Mi of Trails!)",cat:"Activity",sub:"Trail",date:"",dateLabel:"Dawn to dusk (FREE, mixed difficulty)",venue:"Baird Creek Greenway",loc:"East Green Bay",addr:"500 Beverly Rd, Green Bay, WI 54311",desc:"8-14 miles of trails! Crayfish Crawl is paved + easier (~1.6 mi). Other routes moderate (natural surface). Creek, wetlands, forest, prairie. Free! Multiple parking lots.",url:"https://bairdcreek.org/",setting:"outdoor",walking:"someWalking",goodFor:["seniors","family"],highlight:true,free:true,recurring:true},
// === KAYAKING ===
{id:4907,name:"Hang Loose Rentals (Kayak/SUP Delivered!)",cat:"Activity",sub:"Water Sports",date:"",dateLabel:"Seasonal (~May-Sep, kayak $15/hr!)",venue:"Hang Loose Rentals",loc:"Green Bay area",addr:"Free delivery to Suamico, Howard, GB, De Pere launches",desc:"Kayaks & SUP boards DELIVERED to you! 1hr $15, 2hr $20, half day $40, full day $50. Green Bay based, free delivery to local launches. (920) call for booking.",url:"https://www.hanglooserentalsllc.com/",setting:"outdoor",walking:"lowWalking",goodFor:["seniors","couples"],highlight:true,free:false,recurring:true},
{id:4908,name:"Rent.fun Kayak Kiosk (App-Based, $12.50/hr!)",cat:"Activity",sub:"Water Sports",date:"",dateLabel:"Seasonal, sunup-sundown ($12.50/hr!)",venue:"Rent.fun",loc:"East Green Bay",addr:"517 St George St, Green Bay, WI 54302",desc:"Self-serve kayak rental kiosk! $12.50/hr, unlock with app. PFD & paddle included. On the East River — calmer than open bay.",url:"https://www.rent.fun/",setting:"outdoor",walking:"lowWalking",goodFor:["seniors","couples"],highlight:true,free:false,recurring:true},
// === CAR WASH / AUTO ===
{id:4910,name:"Kwik Trip Car Washes (7+ Locations!)",cat:"Service",sub:"Car Wash",date:"",dateLabel:"Multiple hours (7+ tunnel washes in GB!)",venue:"Kwik Trip",loc:"Multiple Locations",addr:"Various Green Bay / Howard locations",desc:"7+ Kwik Trip tunnel washes in the metro! Often cheapest gas too. Locations: E Mason, S Huron, University, Lineville, S Webster, Humboldt, Cardinal Ln.",url:"https://www.kwiktrip.com/carwash",setting:"outdoor",walking:"lowWalking",goodFor:["seniors"],highlight:false,free:false,recurring:true},
{id:4911,name:"Fleet Farm (2 Stores — Tires, Auto, Everything!)",cat:"Shop",sub:"Hardware",date:"",dateLabel:"Long hours daily (2 locations!)",venue:"Fleet Farm",loc:"Multiple Locations",addr:"213 N Taylor St, Green Bay, WI 54303",desc:"Wisconsin mega-store! Auto/tires, hardware, sporting goods, pet, clothing, farm. Also at 2460 Main St (East). A Wisconsin essential.",url:"https://www.fleetfarm.com/",setting:"indoor",walking:"someWalking",goodFor:["seniors","family"],highlight:false,free:false,recurring:true},
{id:4912,name:"AAA Office Green Bay (Roadside + Travel!)",cat:"Service",sub:"Auto",date:"",dateLabel:"Check hours",venue:"AAA",loc:"Ashwaubenon",addr:"2285 S Oneida St, Ste 1, Green Bay, WI 54304",desc:"AAA membership services, roadside assistance, travel planning, insurance. (920) 498-6120.",url:"https://www.aaa.com/",setting:"indoor",walking:"lowWalking",goodFor:["seniors"],highlight:false,free:false,recurring:true},
// === HAIR / SALON ===
{id:4914,name:"Great Clips (3 Locations — Senior $20 Haircut!)",cat:"Service",sub:"Salon",date:"",dateLabel:"Walk-ins welcome (65+ senior haircut $20!)",venue:"Great Clips",loc:"Multiple Locations",addr:"2360 Costco Way Ste 140, Bellevue, WI 54311",desc:"SENIOR HAIRCUT $20 (65+, year-round, no coupon)! Walk-ins welcome. Also at 1301 Lawrence Dr (De Pere) and 2015 Shawano Ave (Howard/Meijer).",url:"https://www.greatclips.com/",setting:"indoor",walking:"lowWalking",goodFor:["seniors"],highlight:true,free:false,recurring:true},
// === SEAFOOD / STEAK ===
{id:4916,name:"Red Lobster Green Bay",cat:"Restaurant",sub:"Seafood",date:"",dateLabel:"Daily 11-9/10",venue:"Red Lobster",loc:"Ashwaubenon",addr:"1251 Lombardi Access Rd, Green Bay, WI 54304",desc:"Cheddar Bay Biscuits! Lobster, shrimp, crab, Ultimate Feast combos. Good for family celebrations.",url:"",setting:"indoor",walking:"lowWalking",goodFor:["seniors","family"],highlight:false,free:false,recurring:true,cuisine:"Seafood"},
{id:4917,name:"Texas Roadhouse (Hand-Cut Steaks + Rolls!)",cat:"Restaurant",sub:"Steakhouse",date:"",dateLabel:"Mon-Sat dinner, Sat-Sun lunch",venue:"Texas Roadhouse",loc:"Ashwaubenon",addr:"2375 S Oneida St, Green Bay, WI 54304",desc:"Hand-cut steaks, fall-off-the-bone ribs, fresh-baked rolls with cinnamon butter. Lively atmosphere, good value steaks.",url:"",setting:"indoor",walking:"lowWalking",goodFor:["seniors","family"],highlight:false,free:false,recurring:true,cuisine:"Steakhouse"},
{id:4918,name:"Prime Quarter (Grill-Your-Own Steak!)",cat:"Restaurant",sub:"Steakhouse",date:"",dateLabel:"Tue-Sun dinner (closed Mon)",venue:"Prime Quarter Steak House",loc:"Ashwaubenon",addr:"2610 S Oneida St, Green Bay, WI 54304",desc:"GRILL YOUR OWN steak on charcoal! USDA Choice steaks, unlimited salad bar. Unique interactive dining experience. Fun date night!",url:"https://primequarter.com/",setting:"indoor",walking:"lowWalking",goodFor:["seniors","couples"],highlight:true,free:false,recurring:true,cuisine:"Steakhouse"},
// === PHARMACIES ===
{id:4920,name:"Walgreens (6 Locations — Some 24hr!)",cat:"Service",sub:"Pharmacy",date:"",dateLabel:"6 locations (116 N Military is 24hr!)",venue:"Walgreens",loc:"Multiple Locations",addr:"116 N Military Ave, Green Bay, WI 54303",desc:"6 Green Bay locations! 116 N Military Ave is 24-HOUR store & pharmacy. Also at E Mason, W Mason, University, Main St, Cardinal Ln.",url:"https://www.walgreens.com/",setting:"indoor",walking:"lowWalking",goodFor:["seniors"],highlight:false,free:false,recurring:true},
// === SENIOR LIVING INFO ===
{id:4922,name:"Oak Park Place (Assisted Living + Memory Care)",cat:"Service",sub:"Senior Living",date:"",dateLabel:"24/7 care",venue:"Oak Park Place",loc:"Bellevue",addr:"421 Erie Rd, Green Bay, WI 54311",desc:"Assisted living (The Grove) + memory care (Autumn Lane). 24/7 nurse access, meals, life enrichment, salon. (920) 301-4200.",url:"",setting:"indoor",walking:"lowWalking",goodFor:["seniors"],highlight:false,free:false,recurring:true},
];

let newStr = '';
for (const e of entries) {
  const descEsc = e.desc.replace(/"/g, '\\"');
  const nameEsc = e.name.replace(/"/g, '\\"');
  let s = ',\n{id:' + e.id + ',name:"' + nameEsc + '",cat:"' + e.cat + '",sub:"' + e.sub + '"';
  s += ',price:"' + (e.free ? 'free' : '$$') + '",priceNum:' + (e.free ? 0 : 2);
  s += ',date:"' + (e.date||'') + '"';
  if (e.dateTo) s += ',dateTo:"' + e.dateTo + '"';
  s += ',dateLabel:"' + (e.dateLabel || '') + '"';
  s += ',venue:"' + e.venue + '"';
  s += ',desc:"' + descEsc + '"';
  s += ',url:"' + (e.url || '') + '"';
  s += ',setting:"' + e.setting + '",walking:"' + e.walking + '"';
  s += ',goodFor:' + JSON.stringify(e.goodFor);
  s += ',highlight:' + e.highlight;
  s += ',cuisine:"' + (e.cuisine || '') + '",established:""';
  s += ',free:' + e.free + ',recurring:' + (e.recurring || false) + '}';
  newStr += s;
}

const lastEntry = 'free:true,recurring:true}';
const idx = html.lastIndexOf(lastEntry);
if (idx === -1) { console.log('ERROR: insertion point not found'); process.exit(1); }
html = html.substring(0, idx + lastEntry.length) + newStr + html.substring(idx + lastEntry.length);

fs.writeFileSync(path, html, 'utf8');
console.log('Added ' + entries.length + ' entries (IDs ' + Math.min(...entries.map(e=>e.id)) + '-' + Math.max(...entries.map(e=>e.id)) + ')');
console.log('File size: ' + Buffer.byteLength(html, 'utf8'));
