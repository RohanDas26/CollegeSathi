const fs = require('fs');

const colleges = [
  { id: 'fms-delhi', title: 'Faculty of Management Studies, Delhi' },
  { id: 'iit-madras', title: 'IIT Madras' },
  { id: 'iim-ahmedabad', title: 'IIM Ahmedabad' },
  { id: 'isb-hyderabad', title: 'Indian School of Business' },
  { id: 'iisc-bangalore', title: 'Indian Institute of Science' },
  { id: 'aiims-delhi', title: 'All India Institute of Medical Sciences, New Delhi' },
  { id: 'iit-bombay', title: 'IIT Bombay' },
  { id: 'iim-bangalore', title: 'IIM Bangalore' },
  { id: 'iit-kanpur', title: 'IIT Kanpur' },
  { id: 'iit-kharagpur', title: 'IIT Kharagpur' },
  { id: 'bits-pilani', title: 'BITS Pilani' },
  { id: 'iiit-hyderabad', title: 'International Institute of Information Technology, Hyderabad' },
  { id: 'iim-lucknow', title: 'IIM Lucknow' },
  { id: 'iit-guwahati', title: 'IIT Guwahati' },
  { id: 'nit-trichy', title: 'National Institute of Technology, Tiruchirappalli' },
  { id: 'bhu-varanasi', title: 'Banaras Hindu University' },
  { id: 'nid-ahmedabad', title: 'National Institute of Design' },
  { id: 'jnu-delhi', title: 'Jawaharlal Nehru University' },
  { id: 'klh-university', title: 'KLE Technological University' },
  { id: 'amrita-vishwa', title: 'Amrita Vishwa Vidyapeetham' },
  { id: 'vit-vellore', title: 'Vellore Institute of Technology' },
  { id: 'anna-university', title: 'Anna University' }
];

const fallbackImages = [
  'https://images.unsplash.com/photo-1575688588571-966e9b61f0b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  'https://images.unsplash.com/photo-1632988663082-4bac2c1847a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  'https://images.unsplash.com/photo-1598463035674-3ded88d65be2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  'https://images.unsplash.com/photo-1734184489462-e8c123f2797b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  'https://images.unsplash.com/photo-1642552187855-388a77930fa8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  'https://images.unsplash.com/photo-1633987027569-a6599b632de7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  'https://images.unsplash.com/photo-1599043464895-0e273f94eed7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  'https://images.unsplash.com/photo-1664273891579-22f28332f3c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080'
];

async function run() {
  const imageMap = {};
  for (let i = 0; i < colleges.length; i++) {
    try {
      const res = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(colleges[i].title)}`);
      const data = await res.json();
      if (data.originalimage && data.originalimage.source && !data.originalimage.source.endsWith('.svg') && !data.originalimage.source.endsWith('.png')) {
         imageMap[colleges[i].id] = data.originalimage.source;
      } else {
         imageMap[colleges[i].id] = fallbackImages[i % fallbackImages.length];
      }
    } catch (e) {
      imageMap[colleges[i].id] = fallbackImages[i % fallbackImages.length];
    }
  }

  let dataTs = fs.readFileSync('src/app/data.ts', 'utf-8');
  for (const id of Object.keys(imageMap)) {
    const url = imageMap[id];
    // Find block for id
    const regex = new RegExp(`id:\\s*'${id}'[\\s\\S]*?image:\\s*'[^']*'`, 'g');
    dataTs = dataTs.replace(regex, (match) => {
      return match.replace(/image:\s*'[^']*'/, `image: '${url}'`);
    });
    const bannerRegex = new RegExp(`id:\\s*'${id}'[\\s\\S]*?bannerImage:\\s*'[^']*'`, 'g');
    dataTs = dataTs.replace(bannerRegex, (match) => {
      return match.replace(/bannerImage:\s*'[^']*'/, `bannerImage: '${url}'`);
    });
  }

  fs.writeFileSync('src/app/data.ts', dataTs);
  console.log('Successfully updated images in data.ts!');
}

run();
