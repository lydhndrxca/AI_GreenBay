const fs = require('fs');
const path = 'C:/Users/shawn/Downloads/Green Bay Explorer.html';
let html = fs.readFileSync(path, 'utf8');

// === PART 1: Update existing undated EVENT entries ===
const updates = [
  {id:1928, date:"2026-06-01", dateTo:"2026-08-31", dateLabel:"Wednesdays 7pm, Jun-Aug (TBA)"},
  {id:1929, date:"2026-06-07", dateLabel:"Sun Jun 7, 3-10pm"},
  {id:2190, date:"2026-05-23", dateTo:"2026-10-31", dateLabel:"Saturdays 7am-Noon, May 23 - Oct 31"},
  {id:2191, date:"2026-06-04", dateTo:"2026-10-29", dateLabel:"Thursdays 2-7pm, Jun 4 - Oct 29"},
  {id:2131, date:"2026-03-27", dateTo:"2026-08-31", dateLabel:"Fri 7:30pm & Sat 6:30+8:30pm year-round"},
  {id:2334, date:"2026-11-20", dateLabel:"Late Nov - Late Dec (annually)"},
  {id:1876, date:"2026-06-11", dateTo:"2026-08-27", dateLabel:"Various summer dates — check greenbayfoodtrucks.com"},
  {id:2108, date:"2026-04-04", dateLabel:"Sat Apr 4, 8am-5pm"},
  {id:2302, date:"2026-06-01", dateTo:"2026-08-31", dateLabel:"Fridays 11am-1pm (summer)"},
  {id:2401, date:"2026-04-09", dateTo:"2026-04-26", dateLabel:"Apr 9-26 (Shopko) & Jul 23-Aug 9 (Dingaling)"},
  {id:2697, date:"2026-03-26", dateLabel:"Thu Mar 26, 5-9pm"},
  {id:1472, date:"2026-03-22", dateTo:"2026-08-31", dateLabel:"Weekly — check Lyric Room schedule"},
  {id:1770, date:"2026-11-20", dateLabel:"Late Nov - Late Dec (annually)"},
  {id:1771, date:"2026-11-20", dateLabel:"Late Nov - Late Dec (annually)"},
  {id:1807, date:"2026-01-03", dateTo:"2026-05-16", dateLabel:"1st & 3rd Saturdays, 9am-1pm (winter)"},
  {id:1912, date:"2026-03-04", dateTo:"2026-08-05", dateLabel:"1st Wed monthly, 9am-8pm (free day)"},
  {id:1914, date:"2026-03-09", dateTo:"2026-04-27", dateLabel:"Mondays 10am (spring sessions)"},
  {id:1921, date:"2026-06-01", dateTo:"2026-08-31", dateLabel:"Fridays 11am-1pm (summer)"},
  {id:2335, date:"2026-11-20", dateLabel:"Late Nov - Late Dec (annually)"},
  {id:2477, date:"2026-02-20", dateTo:"2026-04-03", dateLabel:"Lenten Fridays (Feb 20 - Apr 3)"},
];

let updatedCount = 0;
for (const u of updates) {
  const regex = new RegExp('(\\{id:' + u.id + ',.*?)date:"[^"]*",(\\s*dateTo:"[^"]*",)?\\s*dateLabel:"[^"]*"');
  const match = html.match(regex);
  if (match) {
    let replacement = match[1] + 'date:"' + u.date + '",';
    if (u.dateTo) replacement += 'dateTo:"' + u.dateTo + '",';
    else if (match[2]) replacement += match[2]; // preserve existing dateTo if we didn't set one
    replacement += 'dateLabel:"' + u.dateLabel + '"';
    html = html.replace(match[0], replacement);
    updatedCount++;
    console.log('Updated id:' + u.id);
  } else {
    // Try simpler pattern without dateTo
    const regex2 = new RegExp('(\\{id:' + u.id + ',.*?)date:"[^"]*",dateLabel:"[^"]*"');
    const match2 = html.match(regex2);
    if (match2) {
      let replacement = match2[1] + 'date:"' + u.date + '",';
      if (u.dateTo) replacement += 'dateTo:"' + u.dateTo + '",';
      replacement += 'dateLabel:"' + u.dateLabel + '"';
      html = html.replace(match2[0], replacement);
      updatedCount++;
      console.log('Updated id:' + u.id + ' (simple)');
    } else {
      console.log('NOT FOUND: id:' + u.id);
    }
  }
}
console.log('Updated ' + updatedCount + ' existing entries');

// === PART 2: Add new specifically-dated events through August 2026 ===
const newEntries = [
// MEYER THEATRE SHOWS
{id:3400,name:"Jake Owen — Dream to Dreams Tour",cat:"Event",sub:"Concert",date:"2026-03-26",dateLabel:"Thu Mar 26, 7:30pm",venue:"Meyer Theatre, 117 S Washington St",loc:"Downtown Green Bay",addr:"117 S Washington St, Green Bay, WI 54301",desc:"Country star Jake Owen with Kendall Marvel. Dreams to Dreams Tour at the intimate Meyer Theatre. 7:30pm.",url:"https://meyertheatre.org/",setting:"indoor",walking:"lowWalking",goodFor:["couples","seniors"],highlight:false,free:false,recurring:false},
{id:3401,name:"Glenn Miller Orchestra",cat:"Event",sub:"Concert",date:"2026-04-29",dateLabel:"Wed Apr 29, 7:30pm",venue:"Meyer Theatre, 117 S Washington St",loc:"Downtown Green Bay",addr:"117 S Washington St, Green Bay, WI 54301",desc:"The legendary Glenn Miller Orchestra — big band swing classics! Hotel California, Moonlight Serenade, In the Mood. Perfect for seniors who love the classics. 7:30pm.",url:"https://meyertheatre.org/",setting:"indoor",walking:"lowWalking",goodFor:["seniors","couples"],highlight:true,free:false,recurring:false},
{id:3402,name:"REO Speedwagon Tribute — Ridin' the Storm Out",cat:"Event",sub:"Concert",date:"2026-05-01",dateLabel:"Fri May 1, 7:30pm",venue:"Meyer Theatre",loc:"Downtown Green Bay",addr:"117 S Washington St, Green Bay, WI 54301",desc:"America's #1 REO Speedwagon tribute band. All the hits: Can't Fight This Feeling, Keep On Loving You, Take It on the Run. 7:30pm.",url:"https://meyertheatre.org/",setting:"indoor",walking:"lowWalking",goodFor:["seniors","couples"],highlight:false,free:false,recurring:false},
{id:3403,name:"The Lovin' Spoonful",cat:"Event",sub:"Concert",date:"2026-05-28",dateLabel:"Thu May 28, 7pm",venue:"Meyer Theatre",loc:"Downtown Green Bay",addr:"117 S Washington St, Green Bay, WI 54301",desc:"60s legends The Lovin' Spoonful live! Do You Believe in Magic, Summer in the City, Daydream. A nostalgia treat. 7pm.",url:"https://meyertheatre.org/",setting:"indoor",walking:"lowWalking",goodFor:["seniors","couples"],highlight:true,free:false,recurring:false},
{id:3404,name:"Liverpool Legends — Beatles Experience",cat:"Event",sub:"Concert",date:"2026-05-29",dateLabel:"Fri May 29, 7:30pm",venue:"Meyer Theatre",loc:"Downtown Green Bay",addr:"117 S Washington St, Green Bay, WI 54301",desc:"The complete Beatles experience — costumes, instruments, and note-perfect performances from early Cavern Club to Abbey Road. 7:30pm.",url:"https://meyertheatre.org/",setting:"indoor",walking:"lowWalking",goodFor:["seniors","couples"],highlight:true,free:false,recurring:false},
{id:3405,name:"BoDeans — 40 Years of Love & Hope & Dreams",cat:"Event",sub:"Concert",date:"2026-06-05",dateLabel:"Fri Jun 5, 7:30pm",venue:"Meyer Theatre",loc:"Downtown Green Bay",addr:"117 S Washington St, Green Bay, WI 54301",desc:"Wisconsin's own BoDeans celebrate 40 years! Fadeaway, Good Things, Closer to Free. An iconic Midwest rock act. 7:30pm.",url:"https://meyertheatre.org/",setting:"indoor",walking:"lowWalking",goodFor:["seniors","couples"],highlight:true,free:false,recurring:false},
{id:3406,name:"Jay and The Americans",cat:"Event",sub:"Concert",date:"2026-07-08",dateLabel:"Wed Jul 8, 7pm",venue:"Meyer Theatre",loc:"Downtown Green Bay",addr:"117 S Washington St, Green Bay, WI 54301",desc:"Classic 60s hits: Come a Little Bit Closer, This Magic Moment, Cara Mia. Great nostalgic concert for seniors. 7pm.",url:"https://meyertheatre.org/",setting:"indoor",walking:"lowWalking",goodFor:["seniors","couples"],highlight:true,free:false,recurring:false},
{id:3407,name:"Get The Led Out — Led Zeppelin Tribute",cat:"Event",sub:"Concert",date:"2026-07-15",dateLabel:"Wed Jul 15, 7:30pm",venue:"Meyer Theatre",loc:"Downtown Green Bay",addr:"117 S Washington St, Green Bay, WI 54301",desc:"The ultimate Led Zeppelin experience. Full orchestral arrangements of Stairway to Heaven, Kashmir, and more. 7:30pm.",url:"https://meyertheatre.org/",setting:"indoor",walking:"lowWalking",goodFor:["couples"],highlight:false,free:false,recurring:false},

// WEIDNER CENTER
{id:3410,name:"Mrs. Doubtfire (Broadway in Green Bay)",cat:"Event",sub:"Theater",date:"2026-03-23",dateLabel:"Mon Mar 23, 7:30pm",venue:"Weidner Center, UWGB",loc:"UWGB Campus",addr:"2420 Nicolet Dr, Green Bay, WI 54311",desc:"The hilarious Broadway musical based on the beloved Robin Williams film. Laugh-out-loud family fun at the Weidner Center! 7:30pm.",url:"https://www.weidnercenter.com/",setting:"indoor",walking:"lowWalking",goodFor:["family","seniors","couples"],highlight:true,free:false,recurring:false},
{id:3411,name:"Harry Potter — Prisoner of Azkaban in Concert",cat:"Event",sub:"Concert",date:"2026-04-18",dateLabel:"Sat Apr 18, 7:30pm",venue:"Weidner Center, UWGB",loc:"UWGB Campus",addr:"2420 Nicolet Dr, Green Bay, WI 54311",desc:"Watch the full Harry Potter film on the big screen while the Weidner Philharmonic performs John Williams' score live! A magical experience for grandkids. 7:30pm.",url:"https://www.weidnercenter.com/",setting:"indoor",walking:"lowWalking",goodFor:["family","couples"],highlight:true,free:false,recurring:false},
{id:3412,name:"Weidner Philharmonic — Beethoven's 9th",cat:"Event",sub:"Concert",date:"2026-05-02",dateLabel:"Sat May 2, 7pm",venue:"Weidner Center, UWGB",loc:"UWGB Campus",addr:"2420 Nicolet Dr, Green Bay, WI 54311",desc:"The triumphant Beethoven's 9th Symphony featuring Dudley Birder Chorale & UWGB Choirs. Ode to Joy finale! Season closer. 7pm.",url:"https://www.weidnercenter.com/",setting:"indoor",walking:"lowWalking",goodFor:["seniors","couples"],highlight:true,free:false,recurring:false},

// TITLETOWN BEATS / MAJOR FREE EVENTS
{id:3415,name:"Titletown Beats — Jesse McCartney (FREE)",cat:"Event",sub:"Concert",date:"2026-07-19",dateLabel:"Sun Jul 19, 5:30pm",venue:"Titletown, near Lambeau Field",loc:"Ashwaubenon",addr:"1065 Lombardi Ave, Green Bay, WI 54304",desc:"FREE summer concert at Titletown! Jesse McCartney headlines with opener 7000apart. Activities 5:30pm, opener 6:30pm, headliner 8pm. No tickets needed.",url:"https://www.titletown.com/events/titletown-beats",setting:"outdoor",walking:"lowWalking",goodFor:["family","seniors","couples"],highlight:true,free:true,recurring:false},
{id:3416,name:"Titletown Beats — Chase Rice (FREE)",cat:"Event",sub:"Concert",date:"2026-08-26",dateLabel:"Wed Aug 26, 5:30pm",venue:"Titletown, near Lambeau Field",loc:"Ashwaubenon",addr:"1065 Lombardi Ave, Green Bay, WI 54304",desc:"FREE summer concert! Chase Rice headlines with opener Outlaw'd. Activities 5:30pm, opener 6:30pm, headliner 8pm. Cornhole tournament same evening.",url:"https://www.titletown.com/events/titletown-beats",setting:"outdoor",walking:"lowWalking",goodFor:["family","seniors","couples"],highlight:true,free:true,recurring:false},

// BAY BEACH SPECIAL EVENTS
{id:3420,name:"Bay Beach — Season Opening Day!",cat:"Event",sub:"Family",date:"2026-05-02",dateLabel:"Sat May 2, 10am-6pm",venue:"Bay Beach Amusement Park",loc:"Green Bay",addr:"1313 Bay Beach Rd, Green Bay, WI 54302",desc:"Bay Beach opens for the 2026 season! Rides just 25 cents each. Free parking, free admission. Opening weekend hours 10am-6pm. One of America's most affordable amusement parks.",url:"https://www.greenbaywi.gov/Facilities/Facility/Details/Bay-Beach-Amusement-Park-1",setting:"outdoor",walking:"someWalking",goodFor:["family","seniors"],highlight:true,free:true,recurring:false},
{id:3421,name:"Bay Beach — Free Concert #1",cat:"Event",sub:"Concert",date:"2026-06-30",dateLabel:"Tue Jun 30, 6-8pm",venue:"Bay Beach Amusement Park",loc:"Green Bay",addr:"1313 Bay Beach Rd, Green Bay, WI 54302",desc:"Free evening concert at Bay Beach! Enjoy live music while the kids ride. Park open 10am-8pm. 25-cent rides.",url:"https://www.greenbaywi.gov/",setting:"outdoor",walking:"someWalking",goodFor:["family","seniors"],highlight:false,free:true,recurring:false},
{id:3422,name:"Bay Beach — Free Concert #2",cat:"Event",sub:"Concert",date:"2026-07-14",dateLabel:"Tue Jul 14, 6-8pm",venue:"Bay Beach Amusement Park",loc:"Green Bay",addr:"1313 Bay Beach Rd, Green Bay, WI 54302",desc:"Free evening concert at Bay Beach! Live music while the kids ride. Park open 10am-8pm.",url:"https://www.greenbaywi.gov/",setting:"outdoor",walking:"someWalking",goodFor:["family","seniors"],highlight:false,free:true,recurring:false},
{id:3423,name:"Bay Beach LEGO Event",cat:"Event",sub:"Family",date:"2026-07-18",dateLabel:"Sat-Sun Jul 18-19",venue:"Bay Beach Amusement Park",loc:"Green Bay",addr:"1313 Bay Beach Rd, Green Bay, WI 54302",desc:"Huge LEGO display and building contests! FoxLUG builders. Sat 10am-5pm (contests), Sun 10am-3pm (display). $1 admission, $5 contest entry. Great for grandkids!",url:"https://www.greenbaywi.gov/",setting:"outdoor",walking:"someWalking",goodFor:["family"],highlight:true,free:false,recurring:false},
{id:3424,name:"Bay Beach — Free Concert #3",cat:"Event",sub:"Concert",date:"2026-07-28",dateLabel:"Tue Jul 28, 6-8pm",venue:"Bay Beach Amusement Park",loc:"Green Bay",addr:"1313 Bay Beach Rd, Green Bay, WI 54302",desc:"Free evening concert at Bay Beach! Live music while the kids ride. Park open 10am-8pm.",url:"https://www.greenbaywi.gov/",setting:"outdoor",walking:"someWalking",goodFor:["family","seniors"],highlight:false,free:true,recurring:false},
{id:3425,name:"Bay Beach — Free Concert #4",cat:"Event",sub:"Concert",date:"2026-08-11",dateLabel:"Tue Aug 11, 6-8pm",venue:"Bay Beach Amusement Park",loc:"Green Bay",addr:"1313 Bay Beach Rd, Green Bay, WI 54302",desc:"Free evening concert at Bay Beach! Live music. Park open 10am-8pm.",url:"https://www.greenbaywi.gov/",setting:"outdoor",walking:"someWalking",goodFor:["family","seniors"],highlight:false,free:true,recurring:false},

// MAJOR FESTIVALS & COMMUNITY EVENTS
{id:3430,name:"Luke Combs at Lambeau Field (Night 1)",cat:"Event",sub:"Concert",date:"2026-05-15",dateLabel:"Fri May 15, 5:20pm",venue:"Lambeau Field",loc:"Ashwaubenon",addr:"1265 Lombardi Ave, Green Bay, WI 54304",desc:"Country superstar Luke Combs' stadium tour comes to Lambeau! With Dierks Bentley, Ty Myers, Jake Worthington, Thelma & James. Show 5:20pm.",url:"https://www.packers.com/lambeau-field/luke-combs",setting:"outdoor",walking:"someWalking",goodFor:["couples"],highlight:true,free:false,recurring:false},
{id:3431,name:"Luke Combs at Lambeau Field (Night 2)",cat:"Event",sub:"Concert",date:"2026-05-16",dateLabel:"Sat May 16, 5:20pm",venue:"Lambeau Field",loc:"Ashwaubenon",addr:"1265 Lombardi Ave, Green Bay, WI 54304",desc:"Night 2! Luke Combs stadium concert at Lambeau Field. Same incredible lineup. Show 5:20pm.",url:"https://www.packers.com/lambeau-field/luke-combs",setting:"outdoor",walking:"someWalking",goodFor:["couples"],highlight:true,free:false,recurring:false},
{id:3432,name:"Cellcom Green Bay Marathon Weekend",cat:"Event",sub:"Sports",date:"2026-05-19",dateLabel:"Sun May 19 (expo Sat May 18)",venue:"Lambeau Field / Stadium District",loc:"Ashwaubenon",addr:"1265 Lombardi Ave, Green Bay, WI 54304",desc:"Marathon, half marathon, 5K, and relay — all starting/finishing near Lambeau Field! Watch or run. Expo/packet pickup Sat May 18. Marathon 7am, Half 8am, 5K 8:15am.",url:"https://www.cellcomgreenbaymarathon.com/",setting:"outdoor",walking:"someWalking",goodFor:["family","seniors"],highlight:true,free:false,recurring:false},
{id:3433,name:"Walk to Mary Pilgrimage (De Pere to Champion)",cat:"Event",sub:"Faith / Pilgrimage",date:"2026-05-02",dateLabel:"Sat May 2, starting 7am",venue:"Old St. Joseph Church → Our Lady of Champion Shrine",loc:"De Pere to Champion",addr:"St. Norbert College, 100 Grant St, De Pere, WI 54115",desc:"22-mile walking pilgrimage from St. Norbert College to the National Shrine of Our Lady of Champion. Multiple join-in points with shuttles. A beautiful day of faith, prayer, and community.",url:"https://walktomary.com/",setting:"outdoor",walking:"longWalking",goodFor:["seniors"],highlight:true,free:true,recurring:false},
{id:3434,name:"Celebrate De Pere — Memorial Day Festival",cat:"Event",sub:"Festival",date:"2026-05-23",dateTo:"2026-05-25",dateLabel:"Sat-Mon May 23-25",venue:"Voyageur Park, Downtown De Pere",loc:"De Pere",addr:"100 William St, De Pere, WI 54115",desc:"Three-day Memorial Day weekend festival! Live music, marketplace vendors, carnival rides, fireworks, food. Monday FREE admission. A De Pere tradition.",url:"https://www.celebratedepere.com/",setting:"outdoor",walking:"someWalking",goodFor:["family","seniors","couples"],highlight:true,free:false,recurring:false},
{id:3435,name:"Bellin Run — 50th Annual (10K & 5K)",cat:"Event",sub:"Sports",date:"2026-06-13",dateLabel:"Sat Jun 13, 8am start",venue:"Bellin Hospital, Webster Ave, Green Bay",loc:"Downtown Green Bay",addr:"744 S Webster Ave, Green Bay, WI 54301",desc:"The 50th anniversary Bellin Run! Wisconsin's premier 10K. Watch or register. Children's runs Fri evening. National anthem 7:50am, race starts 8:00am. Registration $35-$55.",url:"https://www.bellinrun.com/",setting:"outdoor",walking:"someWalking",goodFor:["family","seniors"],highlight:true,free:false,recurring:false},
{id:3436,name:"Fire Over the Fox — July 4th Celebration",cat:"Event",sub:"Festival",date:"2026-07-04",dateLabel:"Sat Jul 4, 3pm-10:30pm",venue:"Downtown Green Bay Waterfront (CityDeck, Leicht Park)",loc:"Downtown Green Bay",addr:"CityDeck, 301 N Washington St, Green Bay, WI 54301",desc:"Green Bay's premier July 4th celebration! Live entertainment, food vendors, family activities along the Fox River. Spectacular fireworks over the water ~9:45pm. FREE admission.",url:"https://downtowngreenbay.com/",setting:"outdoor",walking:"someWalking",goodFor:["family","seniors","couples"],highlight:true,free:true,recurring:false},
{id:3437,name:"Pulaski Polka Days",cat:"Event",sub:"Festival",date:"2026-07-16",dateTo:"2026-07-19",dateLabel:"Thu-Sun Jul 16-19",venue:"Pulaski Community Park",loc:"Pulaski",addr:"429 E Pulaski St, Pulaski, WI 54162",desc:"Four-day polka festival with live bands, dancing, parade, pancake breakfast, arts & crafts fair. Thursday fireworks at dusk. Gate tickets only (no advance). A beloved Wisconsin tradition!",url:"",setting:"outdoor",walking:"someWalking",goodFor:["seniors","couples","family"],highlight:true,free:false,recurring:false},
{id:3438,name:"Brown County Fair",cat:"Event",sub:"Festival",date:"2026-08-19",dateTo:"2026-08-23",dateLabel:"Tue-Sat Aug 19-23",venue:"Brown County Fairgrounds",loc:"De Pere",addr:"1500 Fort Howard Ave, De Pere, WI 54115",desc:"Five-day county fair! Livestock, exhibits, carnival midway, grandstand entertainment, demolition derby, food. $15 gate ($12 presale Jul 1-Aug 22). Under 3 free. Sunday $10.",url:"https://browncountyfair.com/",setting:"outdoor",walking:"someWalking",goodFor:["family","seniors","couples"],highlight:true,free:false,recurring:false},
{id:3439,name:"ArtFest Green Bay",cat:"Event",sub:"Art",date:"2026-08-22",dateTo:"2026-08-23",dateLabel:"Sat-Sun Aug 22-23",venue:"Downtown Green Bay",loc:"Downtown Green Bay",addr:"Downtown Green Bay, WI",desc:"Major downtown fine art festival replacing the former Artstreet. Artists, live demos, interactive art, music, food. Sat 9am-7pm, Sun 10am-4pm.",url:"",setting:"outdoor",walking:"someWalking",goodFor:["seniors","couples","family"],highlight:true,free:true,recurring:false},

// HERITAGE HILL & MUSEUMS
{id:3440,name:"Heritage Hill — Maple Sugaring Day",cat:"Event",sub:"History",date:"2026-03-14",dateLabel:"Sat Mar 14, 9am-4pm",venue:"Heritage Hill State Historical Park",loc:"Allouez",addr:"2640 S Webster Ave, Green Bay, WI 54301",desc:"Living history fur trade event with maple sugaring demonstrations! Plus blacksmithing workshop (9am-1pm) and poetry workshop (2-4pm). Step back in time.",url:"https://heritagehillgb.org/",setting:"outdoor",walking:"someWalking",goodFor:["family","seniors"],highlight:true,free:false,recurring:false},
{id:3441,name:"Heritage Hill — Snap Dragon Tavern",cat:"Event",sub:"History",date:"2026-05-24",dateLabel:"Sat May 24, 5-9pm",venue:"Heritage Hill State Historical Park",loc:"Allouez",addr:"2640 S Webster Ave, Green Bay, WI 54301",desc:"Unique evening experience at Heritage Hill! Historic tavern atmosphere with food, drinks, and entertainment in the park's historic setting. 5-9pm.",url:"https://heritagehillgb.org/",setting:"outdoor",walking:"someWalking",goodFor:["couples","seniors"],highlight:false,free:false,recurring:false},
{id:3442,name:"Heritage Hill — Sunset Sips (Captain's Walk Wine)",cat:"Event",sub:"Food & Wine",date:"2026-06-10",dateLabel:"Jun 10, Jul 8, Aug 12 — 5-9pm",venue:"Heritage Hill State Historical Park",loc:"Allouez",addr:"2640 S Webster Ave, Green Bay, WI 54301",desc:"Wine tasting evenings at Heritage Hill with Captain's Walk Winery. Beautiful summer evening in the historic park. Three dates: Jun 10, Jul 8, Aug 12. 5-9pm.",url:"https://heritagehillgb.org/",setting:"outdoor",walking:"someWalking",goodFor:["couples","seniors"],highlight:true,free:false,recurring:false},
{id:3443,name:"Heritage Hill — War For Empire Encampment",cat:"Event",sub:"History",date:"2026-08-30",dateLabel:"Sun Aug 30, 9am-4pm",venue:"Heritage Hill State Historical Park",loc:"Allouez",addr:"2640 S Webster Ave, Green Bay, WI 54301",desc:"Military reenactment of French & Indian War era at Heritage Hill. Musket demonstrations, camp life, period crafts. Educational and fascinating!",url:"https://heritagehillgb.org/",setting:"outdoor",walking:"someWalking",goodFor:["family","seniors"],highlight:true,free:false,recurring:false},
{id:3444,name:"National Railroad Museum — Tales on the Rails",cat:"Event",sub:"Family",date:"2026-03-28",dateTo:"2026-03-29",dateLabel:"Sat-Sun Mar 28-29",venue:"National Railroad Museum",loc:"Ashwaubenon",addr:"2285 S Broadway, Green Bay, WI 54304",desc:"Special ticketed festival with train rides all day! Choose standard or premium ride times. Activities and exhibits. Great family outing during spring break.",url:"https://nationalrrmuseum.org/tales-on-the-rails/",setting:"indoor",walking:"someWalking",goodFor:["family","seniors"],highlight:true,free:false,recurring:false},
{id:3445,name:"National Railroad Museum — 70th Anniversary Day",cat:"Event",sub:"Family",date:"2026-05-02",dateLabel:"Sat May 2, 9am-5pm",venue:"National Railroad Museum",loc:"Ashwaubenon",addr:"2285 S Broadway, Green Bay, WI 54304",desc:"Free kids admission + free train rides with conditions! Celebrating 70 years of the museum. Great day trip for grandkids.",url:"https://nationalrrmuseum.org/70th/",setting:"indoor",walking:"someWalking",goodFor:["family","seniors"],highlight:true,free:false,recurring:false},
{id:3446,name:"National Railroad Museum — PAW Patrol Paw-Palooza",cat:"Event",sub:"Family",date:"2026-06-12",dateTo:"2026-06-14",dateLabel:"Fri-Sun Jun 12-14",venue:"National Railroad Museum",loc:"Ashwaubenon",addr:"2285 S Broadway, Green Bay, WI 54304",desc:"PAW Patrol characters visit the museum! Themed train rides, activities, photo ops. Special ticketed event — buy early! Perfect for grandkids.",url:"https://nationalrrmuseum.org/paw-patrol-paw-palooza/",setting:"indoor",walking:"someWalking",goodFor:["family"],highlight:true,free:false,recurring:false},

// NEW ZOO
{id:3450,name:"NEW Zoo — Sip 'n' Safari",cat:"Event",sub:"Food & Wine",date:"2026-06-16",dateLabel:"Tue Jun 16, 5-8pm",venue:"NEW Zoo & Adventure Park",loc:"Suamico",addr:"4378 Reforestation Rd, Suamico, WI 54173",desc:"Wine, fruit, and cheese pairings while viewing wildlife at dusk! Adults-only evening at the zoo. Tickets on sale May 1. Intimate and unique experience.",url:"https://newzoo.org/events/",setting:"outdoor",walking:"someWalking",goodFor:["couples","seniors"],highlight:true,free:false,recurring:false},
{id:3451,name:"NEW Zoo — Twilight Canopy Tour",cat:"Event",sub:"Nature",date:"2026-05-30",dateLabel:"May 30, Jun 27, Jul 25, Aug 29 — 6-8pm",venue:"NEW Zoo & Adventure Park",loc:"Suamico",addr:"4378 Reforestation Rd, Suamico, WI 54173",desc:"Evening zipline canopy tours through the treetops at dusk! Four dates in summer 2026. Adventurous outdoor experience. 6-8pm each date.",url:"https://newzoo.org/events/",setting:"outdoor",walking:"someWalking",goodFor:["couples","family"],highlight:false,free:false,recurring:false},

// GREEN BAY ROCKERS BASEBALL
{id:3455,name:"Green Bay Rockers — Home Opener",cat:"Event",sub:"Sports",date:"2026-05-27",dateLabel:"Wed May 27, 6:35pm",venue:"Capital Credit Union Park",loc:"Ashwaubenon",addr:"2231 Holmgren Way, Ashwaubenon, WI 54304",desc:"Opening night for the 2026 Green Bay Rockers! Affordable Northwoods League summer college baseball. Family-friendly with promotions, fireworks, and fun. Tickets from $8.",url:"https://northwoodsleague.com/green-bay-rockers/",setting:"outdoor",walking:"lowWalking",goodFor:["family","seniors","couples"],highlight:true,free:false,recurring:false},
{id:3456,name:"Green Bay Rockers — Summer Home Games",cat:"Event",sub:"Sports",date:"2026-05-27",dateTo:"2026-08-05",dateLabel:"36 home games May 27 - Aug 5",venue:"Capital Credit Union Park",loc:"Ashwaubenon",addr:"2231 Holmgren Way, Ashwaubenon, WI 54304",desc:"36 home games of fun, affordable baseball! Nightly promotions: dollar dog nights, fireworks Fridays, family Sundays. Games at 6:35pm (weeknights) or 1:05pm (weekends). Tickets from $8.",url:"https://northwoodsleague.com/green-bay-rockers/",setting:"outdoor",walking:"lowWalking",goodFor:["family","seniors","couples"],highlight:true,free:false,recurring:true},

// CHRISTIAN / FAITH EVENTS
{id:3460,name:"Absolutely Country, Definitely Gospel Show",cat:"Event",sub:"Concert",date:"2026-03-18",dateLabel:"Wed Mar 18, 5pm dinner / 7pm show",venue:"Riverside Ballroom, 1560 Main St",loc:"Downtown Green Bay",addr:"1560 Main St, Green Bay, WI 54302",desc:"Branson-style country & gospel dinner show! Faith's Journey presents inspiring country and gospel music. Dinner 6pm, show 7pm. Also matinee Mar 19 (lunch noon, show 1pm).",url:"",setting:"indoor",walking:"lowWalking",goodFor:["seniors","couples"],highlight:true,free:false,recurring:false},
{id:3461,name:"Josiah Queen — Mt. Zion Worship Tour",cat:"Event",sub:"Concert",date:"2026-05-01",dateLabel:"Fri May 1, 7pm",venue:"EPIC Event Center",loc:"Ashwaubenon",addr:"2351 Holmgren Way, Ashwaubenon, WI 54304",desc:"Contemporary Christian worship concert! Josiah Queen brings the Mt. Zion Tour to Green Bay. VIP doors 5:15pm, GA doors 6:15pm, show 7pm.",url:"",setting:"indoor",walking:"lowWalking",goodFor:["seniors","couples","family"],highlight:true,free:false,recurring:false},
{id:3462,name:"Marian Conference at Our Lady of Champion",cat:"Event",sub:"Faith / Pilgrimage",date:"2026-05-22",dateTo:"2026-05-23",dateLabel:"Fri-Sat May 22-23",venue:"National Shrine of Our Lady of Champion",loc:"Champion",addr:"4047 Chapel Dr, Champion, WI 54229",desc:"Fifth annual Marian Conference: 'Mary, Refuge of Sinners.' Friday dinner & talk at Rock Garden (add-on). Saturday full day: confessions 8am, talks, rosary procession, Mass. 4pm Mass fulfills Sunday obligation.",url:"https://www.shrineofourladyofchampion.org/",setting:"indoor",walking:"lowWalking",goodFor:["seniors"],highlight:true,free:false,recurring:false},

// DOOR COUNTY DAY TRIPS
{id:3465,name:"Door County Fyr Bal Festival (Ephraim)",cat:"Event",sub:"Festival",date:"2026-06-20",dateLabel:"Sat Jun 20 (all day + evening bonfire)",venue:"Ephraim Waterfront / Eagle Harbor",loc:"Door County (Day Trip)",addr:"Ephraim, WI 54211",desc:"61st annual Scandinavian heritage festival in beautiful Ephraim! Music, crafts, artisan food, parade. Spectacular bonfire at dusk followed by fireworks over Eagle Harbor. ~1 hr drive from Green Bay.",url:"https://ephraim-doorcounty.com/events/fyr-bal-festival/",setting:"outdoor",walking:"someWalking",goodFor:["seniors","couples","family"],highlight:true,free:true,recurring:false},
{id:3466,name:"Door County Beer Festival",cat:"Event",sub:"Festival",date:"2026-06-20",dateLabel:"Sat Jun 20, noon-4pm",venue:"About Thyme Farm, Baileys Harbor",loc:"Door County (Day Trip)",addr:"8425 County F, Baileys Harbor, WI 54202",desc:"Large craft beer festival at a scenic Door County farm. 40+ breweries. Early access 11am. Shuttle-only parking. 21+. ~1 hr from Green Bay.",url:"https://doorcountybeer.com/",setting:"outdoor",walking:"someWalking",goodFor:["couples"],highlight:false,free:false,recurring:false},
{id:3467,name:"Door County Wine Fest (10th Anniversary)",cat:"Event",sub:"Festival",date:"2026-06-27",dateLabel:"Sat Jun 27, noon-4pm",venue:"About Thyme Farm, Baileys Harbor",loc:"Door County (Day Trip)",addr:"8425 County F, Baileys Harbor, WI 54202",desc:"10th anniversary wine festival! VIP 11am, general tasting noon. Door County Wine Trail vineyards. Beautiful farm setting. Shuttle parking. 21+.",url:"https://www.doorcountywinefest.com/",setting:"outdoor",walking:"someWalking",goodFor:["couples","seniors"],highlight:true,free:false,recurring:false},
{id:3468,name:"Peninsula Music Festival — 74th Season",cat:"Event",sub:"Concert",date:"2026-08-04",dateTo:"2026-08-22",dateLabel:"9 concerts Aug 4-22 (Mon/Wed/Fri), 7:30pm",venue:"Door Community Auditorium, Fish Creek",loc:"Door County (Day Trip)",addr:"3926 WI-42, Fish Creek, WI 54212",desc:"World-class symphony orchestra in Door County! Nine concerts over three weeks: Mon, Wed, Fri at 7:30pm. Classical, pops, and guest soloists. A cultural gem. ~1 hr from Green Bay.",url:"https://www.musicfestival.com/",setting:"indoor",walking:"lowWalking",goodFor:["seniors","couples"],highlight:true,free:false,recurring:true},
{id:3469,name:"Northern Sky Theater — Outdoor Musicals",cat:"Event",sub:"Theater",date:"2026-06-24",dateTo:"2026-08-29",dateLabel:"Nightly (most) Jun 24 - Aug 29, 7:30pm",venue:"Peninsula State Park Amphitheater, Fish Creek",loc:"Door County (Day Trip)",addr:"10169 Shore Rd, Fish Creek, WI 54212",desc:"Beloved outdoor musical theater under the stars in Peninsula State Park! Three rotating original musicals all summer. 7:30pm most nights. Bring a blanket. ~1 hr from Green Bay.",url:"https://www.northernskytheater.com/",setting:"outdoor",walking:"someWalking",goodFor:["seniors","couples","family"],highlight:true,free:false,recurring:true},
{id:3470,name:"Door County Jacksonport Cherry Fest",cat:"Event",sub:"Festival",date:"2026-08-01",dateLabel:"Sat Aug 1, 9am-4pm",venue:"Lakeside Park, Jacksonport",loc:"Door County (Day Trip)",addr:"Lakeside Park, Jacksonport, WI 54235",desc:"Cherry-themed festival with arts & crafts, car show, live music, cherry pie, and food vendors on the Lake Michigan shore. Fun summer day trip! ~1 hr from Green Bay.",url:"",setting:"outdoor",walking:"someWalking",goodFor:["seniors","family","couples"],highlight:false,free:true,recurring:false},
{id:3471,name:"Door County Fair",cat:"Event",sub:"Festival",date:"2026-08-12",dateTo:"2026-08-16",dateLabel:"Wed-Sun Aug 12-16",venue:"John Miles County Park, Sturgeon Bay",loc:"Door County (Day Trip)",addr:"812 N 14th Ave, Sturgeon Bay, WI 54235",desc:"Classic county fair with midway, livestock, grandstand entertainment, demo derby, 4-H exhibits. Fun day trip to Door County! ~45 min from Green Bay.",url:"https://www.co.door.wi.gov/1007/Door-County-Fair-Website",setting:"outdoor",walking:"someWalking",goodFor:["family","seniors"],highlight:false,free:false,recurring:false},

// BREWERY/WINERY EVENTS
{id:3475,name:"Pour Another Round — Outdoor Beer Fest",cat:"Event",sub:"Festival",date:"2026-03-21",dateLabel:"Sat Mar 21, 1-4pm",venue:"Hinterland Brewery",loc:"Ashwaubenon",addr:"1001 Lombardi Ave, Green Bay, WI 54304",desc:"4th annual outdoor winter beer festival! 15+ breweries including Hinterland, Stillmank, Titletown, and more. Food, yard games, fan vote for best beer. 1-4pm.",url:"",setting:"outdoor",walking:"someWalking",goodFor:["couples"],highlight:false,free:false,recurring:false},
{id:3476,name:"Run for the Roses Wine Walk (Broadway)",cat:"Event",sub:"Food & Wine",date:"2026-05-02",dateLabel:"Sat May 2, 1-5pm",venue:"Broadway District, Downtown Green Bay",loc:"Downtown Green Bay",addr:"Broadway District, Green Bay, WI",desc:"Annual Derby-themed wine walk through downtown Broadway shops! Sample wines, wear your best hat. 1-5pm. Ticketed via Eventbrite.",url:"https://downtowngreenbay.com/",setting:"outdoor",walking:"someWalking",goodFor:["couples","seniors"],highlight:false,free:false,recurring:false},

// RUMMAGE SALES / CRAFT FAIRS
{id:3480,name:"Ashwaubenon Village-Wide Rummage Sale",cat:"Event",sub:"Flea Market",date:"2026-05-07",dateTo:"2026-05-09",dateLabel:"Thu-Sat May 7-9, 8am-3pm",venue:"Homes across Ashwaubenon",loc:"Ashwaubenon",addr:"Ashwaubenon, WI",desc:"Three days of community-wide rummage sales! Maps available from the village. Dozens of participating homes/businesses. Treasure hunting across Ashwaubenon. 8am-3pm each day.",url:"https://ashwaubenon.gov/",setting:"outdoor",walking:"someWalking",goodFor:["seniors"],highlight:true,free:true,recurring:false},
{id:3481,name:"MeatFest at Resch Expo",cat:"Event",sub:"Food",date:"2026-05-30",dateLabel:"Sat May 30, VIP 10am / GA 11am-4pm",venue:"Resch Expo, Capital Credit Union Hall A",loc:"Ashwaubenon",addr:"840 Armed Forces Dr, Ashwaubenon, WI 54304",desc:"Pelkin's Smokey Meat Market presents MeatFest! BBQ tastings, meat vendors, samples, competitions. Ticketed event. Parking $10.",url:"",setting:"indoor",walking:"someWalking",goodFor:["couples","family"],highlight:false,free:false,recurring:false},

// DE PERE FARMERS MARKET
{id:3485,name:"Downtown De Pere Farmers Market",cat:"Event",sub:"Farmers Market",date:"2026-06-04",dateTo:"2026-09-24",dateLabel:"Thursdays 3-8pm, Jun 4 - Sep 24",venue:"George Street Plaza, Downtown De Pere",loc:"De Pere",addr:"George St, De Pere, WI 54115",desc:"Weekly farmers market in beautiful downtown De Pere! Fresh produce, baked goods, crafts, and community. Thursdays 3-8pm (September 3-7pm). 17 market days through September.",url:"https://definitelydepere.org/downtown-de-pere-farmers-market/",setting:"outdoor",walking:"someWalking",goodFor:["seniors","family"],highlight:true,free:true,recurring:true},

// GARDENERS / SEASONAL
{id:3486,name:"Gardeners Club — Garden Walk",cat:"Event",sub:"Garden",date:"2026-07-18",dateLabel:"Sat Jul 18, 9am-3pm",venue:"Seven private gardens (Allouez, De Pere, Green Bay)",loc:"Allouez / De Pere / Green Bay",addr:"Multiple locations — tickets at McAllister, Plant People, Take 5",desc:"4th Annual Garden Walk! Tour seven beautiful private gardens in Allouez, East De Pere, and East Green Bay. Tickets available from April at local retailers. A wonderful summer morning outdoors.",url:"",setting:"outdoor",walking:"someWalking",goodFor:["seniors","couples"],highlight:true,free:false,recurring:false},

// BOTANICAL GARDEN HIGHLIGHTS
{id:3487,name:"Green Bay Botanical Garden — Sanimax Summer Concerts",cat:"Event",sub:"Concert",date:"2026-06-13",dateTo:"2026-08-29",dateLabel:"Select Thursdays 6-8pm, Jun-Aug",venue:"Green Bay Botanical Garden",loc:"Allouez",addr:"2600 Larsen Rd, Green Bay, WI 54311",desc:"Ticketed Thursday evening concert series in the beautiful Botanical Garden. Music among the flowers! 6-8pm on select Thursdays. Check gbbg.org for specific dates and performers.",url:"https://www.gbbg.org/",setting:"outdoor",walking:"someWalking",goodFor:["seniors","couples"],highlight:true,free:false,recurring:true},

// PACKERS HERITAGE TRAIL TROLLEY
{id:3488,name:"Packers Heritage Trail Trolley Tour",cat:"Event",sub:"History",date:"2026-07-25",dateLabel:"Sat Jul 25 — 4 departures (9:45am-12:15pm)",venue:"Lambeau Field (American Family Insurance Gate)",loc:"Ashwaubenon",addr:"1265 Lombardi Ave, Green Bay, WI 54304",desc:"Guided 90-minute trolley tour of Packers Heritage Trail landmarks around Green Bay! Four departures: 9:45am, 10:15am, 11:45am, 12:15pm. Arrive 20 min early. Waiver required.",url:"https://www.packershofandtours.com/explore/heritage-trail/trolley-tour",setting:"outdoor",walking:"lowWalking",goodFor:["seniors","family"],highlight:true,free:false,recurring:false},

// DE PERE FOOD & FUN
{id:3489,name:"De Pere Foodie Walk",cat:"Event",sub:"Food",date:"2026-05-09",dateLabel:"Sat May 9, 1-5pm",venue:"Downtown De Pere restaurants",loc:"De Pere",addr:"Downtown De Pere, WI",desc:"Walk downtown De Pere sampling dishes from local restaurants! 300 tickets, $25. A delicious afternoon exploring De Pere's food scene. 1-5pm.",url:"https://definitelydepere.org/",setting:"outdoor",walking:"someWalking",goodFor:["couples","seniors"],highlight:false,free:false,recurring:false},

// LEVITT AMP DETAILS
{id:3490,name:"Levitt AMP — Acoustic Lunch at Titletown",cat:"Event",sub:"Free Concert Series",date:"2026-05-29",dateTo:"2026-09-25",dateLabel:"Fridays 11:30am-1:30pm, May 29 - Sep 25",venue:"46 Below patio, Titletown",loc:"Ashwaubenon",addr:"1065 Lombardi Ave, Green Bay, WI 54304",desc:"FREE Friday lunchtime acoustic concerts at Titletown's 46 Below patio! Different artists each week all summer. Grab lunch and enjoy live music. 11:30am-1:30pm.",url:"https://www.titletown.com/events/acoustic-lunch",setting:"outdoor",walking:"lowWalking",goodFor:["seniors","couples"],highlight:true,free:true,recurring:true},

// MOVIES AT TITLETOWN
{id:3491,name:"Movies at Titletown (FREE)",cat:"Event",sub:"Family",date:"2026-06-14",dateLabel:"Jun 14 (Tangled 4pm / Twisters 6:30pm), Jul 25-26",venue:"Titletown, near Lambeau Field",loc:"Ashwaubenon",addr:"1065 Lombardi Ave, Green Bay, WI 54304",desc:"FREE outdoor movies at Titletown! Jun 14: Tangled (4pm) & Twisters (6:30pm). Jul 25: Cars (6:30pm). Jul 26: National Treasure (6:30pm). Activities start 1 hour before each film.",url:"https://www.titletown.com/events/movies-at-titletown",setting:"outdoor",walking:"lowWalking",goodFor:["family","seniors","couples"],highlight:true,free:true,recurring:false},

// BOAT CRUISES
{id:3492,name:"Foxy Paddler — Fox River Pedal Cruise",cat:"Activity",sub:"Boat Tour",date:"2026-05-01",dateTo:"2026-10-01",dateLabel:"Daily May-Oct, noon-10pm (2-hour tours)",venue:"Leicht Park, 128 Dousman St",loc:"Downtown Green Bay",addr:"128 Dousman St, Green Bay, WI 54303",desc:"Pedal-powered party pontoon on the Fox River! 2-hour tours with optional bar stops. BYO canned drinks. Mix & mingle seats $45-47/person (Sun-Thu/Fri-Sat). Private groups from $470. Fun group outing!",url:"https://www.foxypaddler.com/",setting:"outdoor",walking:"lowWalking",goodFor:["couples","family"],highlight:false,free:false,recurring:true},

// LIBRARY / ADRC HIGHLIGHTS
{id:3493,name:"Brown County Library — Summer Reading Program",cat:"Event",sub:"Education / Classes",date:"2026-06-01",dateTo:"2026-08-15",dateLabel:"Jun-Aug (all branches)",venue:"Brown County Library (all branches)",loc:"Multiple locations",addr:"515 Pine St, Green Bay, WI 54301 (Central)",desc:"Free summer reading program for all ages at all library branches! Prizes, author visits, storytimes, craft programs, tech help sessions, book clubs, and movie screenings. Check browncountylibrary.org for full calendar.",url:"https://browncounty.librarycalendar.com/events",setting:"indoor",walking:"lowWalking",goodFor:["family","seniors"],highlight:true,free:true,recurring:true},
];

// Build new entries string
let newStr = '';
for (const e of newEntries) {
  const descEsc = e.desc.replace(/"/g, '\\"');
  const nameEsc = e.name.replace(/"/g, '\\"');
  let entry = ',\n{id:' + e.id + ',name:"' + nameEsc + '",cat:"' + e.cat + '",sub:"' + e.sub + '",';
  if (e.neighborhood) entry += 'neighborhood:"' + e.neighborhood + '",';
  entry += 'price:"' + (e.free ? 'free' : (e.highlight ? '$$' : '$')) + '",priceNum:' + (e.free ? 0 : (e.highlight ? 2 : 1)) + ',';
  entry += 'date:"' + e.date + '",';
  if (e.dateTo) entry += 'dateTo:"' + e.dateTo + '",';
  entry += 'dateLabel:"' + e.dateLabel + '",';
  entry += 'venue:"' + e.venue + '",';
  entry += 'desc:"' + descEsc + '",';
  entry += 'url:"' + (e.url || '') + '",';
  entry += 'setting:"' + e.setting + '",walking:"' + e.walking + '",';
  entry += 'goodFor:' + JSON.stringify(e.goodFor) + ',';
  entry += 'highlight:' + e.highlight + ',';
  entry += 'cuisine:"' + (e.cuisine || '') + '",established:"' + (e.established || '') + '",';
  entry += 'free:' + e.free + ',recurring:' + e.recurring + '}';
  newStr += entry;
}

// Find the end of the DATA array to insert new entries
const insertPoint = html.lastIndexOf('}];');
if (insertPoint === -1) {
  console.log('ERROR: Could not find end of DATA array');
  process.exit(1);
}
html = html.substring(0, insertPoint + 1) + newStr + '\n' + html.substring(insertPoint + 1);

// Write the updated file
fs.writeFileSync(path, html, 'utf8');

// Stats
const finalSize = Buffer.byteLength(html, 'utf8');
console.log('\nNew entries added: ' + newEntries.length);
console.log('New entries ID range: ' + Math.min(...newEntries.map(e=>e.id)) + '-' + Math.max(...newEntries.map(e=>e.id)));
console.log('Final file size: ' + finalSize + ' bytes');
console.log('\nDone! Run validate.js to verify.');
