import { readdir, readFile, writeFile } from 'node:fs/promises';
import { extname, join } from 'node:path';

const root = new URL('../', import.meta.url);
const editableExtensions = new Set(['.html', '.json']);
const editableRoots = ['index.html', '_payload.json', 'companies', 'privacy-policy'];

const replacements = [
  ['Hashgraph Ventures | AI & Blockchain Venture Capital', 'FrigidCrow | Creative Technologist & Digital Builder'],
  ['FrigidCrow | AI &amp; Blockchain Venture Capital', 'FrigidCrow | Creative Technologist &amp; Digital Builder'],
  ['Venture capital firm investing in AI & blockchain startups from pre-seed to Series A, supporting founders with capital, expertise, and global reach.', 'Independent creative technologist building expressive websites, interactive systems and real-time 3D experiences.'],
  ['<p>The next wave<br>of venture capital</p>', '<p>Ideas become<br>digital experiences</p>'],
  ['The next wave\\nof venture capital', 'Ideas become\\ndigital experiences'],
  ['The next wave of venture capital', 'Ideas become digital experiences'],
  ['<p>Capital with</p><p>conviction</p>', '<p>Built with</p><p>intention</p>'],
  ['"Capital with"', '"Built with"'],
  ['"conviction"', '"intention"'],
  ['Capital with conviction', 'Built with intention'],
  ['<p>Early access</p><p>permanent</p><p>advantage</p>', '<p>Design</p><p>code and</p><p>systems</p>'],
  ['"Early access"', '"Design"'],
  ['"permanent"', '"code and"'],
  ['"advantage"', '"systems"'],
  ['Early access permanent advantage', 'Design code and systems'],
  ['Experience you can build on', 'Experience you can build on'],
  ["Hashgraph Ventures is an early-stage VC fund at the intersection of blockchain infrastructure and AI — pre-seed through Series A. We believe decentralised infrastructure and AI-native applications will rewire how value, data, and trust move across the world. We don't wait for consensus. We move with speed and clarity.", 'FrigidCrow is an independent creative technologist working across interaction design, frontend engineering, real-time 3D and emerging technology. I turn ambitious ideas into focused digital experiences — from first prototype to production.'],
  ['Hashgraph Ventures is an early-stage VC fund at the intersection of blockchain infrastructure and AI — pre-seed through Series A. We believe decentralised infrastructure and AI-native applications will rewire how value, data, and trust move across the world. We don&#39;t wait for consensus. We move with speed and clarity.', 'FrigidCrow is an independent creative technologist working across interaction design, frontend engineering, real-time 3D and emerging technology. I turn ambitious ideas into focused digital experiences — from first prototype to production.'],
  ['Hashgraph Ventures sits at the apex of a deliberate trifecta, bringing together The Hashgraph Group as the tech arm, The Hashgraph Association for enterprise integration and community, and Ventures as fast-moving capital. For select investors, this means one thing: your investment doesn’t rely on a fund alone. It’s backed by a proven adoption machine with sovereign partnerships, global tech teams, and enterprise-grade distribution. Infrastructure first. Returns follow.', 'My work brings design, engineering and systems thinking into one process. The goal is not decoration alone: every interaction should clarify an idea, every technical choice should support the experience, and every prototype should be able to grow into a real product.'],
  ["No career investors. No tourists. We've been the founder who couldn't sleep. The investor who got it wrong and came back smarter. The operator who scaled through chaos. Every person on this team carries real reps across VC, Blockchain, Web3, Investment Banking, Tech and Enterprise.", 'I like difficult briefs, unfamiliar tools and projects that need both taste and technical depth. My practice spans product thinking, creative development, Three.js, WebGL and rapid experimentation.'],
  ['No career investors. No tourists. We&#39;ve been the founder who couldn&#39;t sleep. The investor who got it wrong and came back smarter. The operator who scaled through chaos. Every person on this team carries real reps across VC, Blockchain, Web3, Investment Banking, Tech and Enterprise.', 'I like difficult briefs, unfamiliar tools and projects that need both taste and technical depth. My practice spans product thinking, creative development, Three.js, WebGL and rapid experimentation.'],
  ['50+ years of combined experience that only comes one way. The hard way. This team wasn’t assembled. It was forged.', 'The result is work that feels considered, performs well and gives people something worth remembering.'],
  ['50+ years of combined experience that only comes one way. The hard way. This team wasn&#39;t assembled. It was forged.', 'The result is work that feels considered, performs well and gives people something worth remembering.'],
  ["50+ years of combined experience that only comes one way. The hard way. This team wasn't assembled. It was forged.", 'The result is work that feels considered, performs well and gives people something worth remembering.'],
  ['We prioritize warm introductions\\nand ecosystem referrals', 'Open to ambitious ideas\\nand meaningful collaborations'],
  ['We prioritize warm introductions<br>and ecosystem referrals', 'Open to ambitious ideas<br>and meaningful collaborations'],
  ['> Manifesto</div>', '> Approach</div>'],
  ['> Investors</div>', '> Work</div>'],
  ['> Team</div>', '> Capabilities</div>'],
  ['"Manifesto"', '"Approach"'],
  ['"Investors"', '"Work"'],
  ['"Team"', '"Capabilities"'],
  ['Dara Campbell', 'Creative Direction'],
  ['Managing Partner', 'Strategy & concept'],
  ['Will Patterson', 'Experience Design'],
  ['William Patterson', 'Experience Design'],
  ['Head of Venture', 'Interaction & motion'],
  ['Arjun Chirumamilla', 'Engineering'],
  ['Principal', 'Frontend systems'],
  ['Jeff Sun', 'Realtime 3D'],
  ['Venture Capital Analyst', 'Three.js & shaders'],
  ['Tracie Hutchins', 'Prototyping'],
  ['Executive Operations Manager', 'Rapid experiments'],
  ['Kamal Youssefi', 'Delivery'],
  ['Co-Founder & Executive Chairman', 'From idea to launch'],
  ['Stefan Deiss', 'Research'],
  ['Co-Founder', 'Emerging technology'],
  ['Emerging technology & Executive Chairman', 'From idea to launch'],
  ['Debyt is building the infrastructure for the next generation of debit card accounts, unlocking stablecoin-powered banking globally. They are developing the stablecoin orchestration layer and card-issuing rails required for broad consumer adoption by retrofitting stablecoins directly into today’s card processors, sponsor banks and large-scale card issuing programs.', 'A selection of digital products and interactive experiences, combining clear product thinking with expressive frontend craft.'],
  ['Rava aims to be the clearing house and settlement engine for tokenized assets and RWAs by solving a critical market gap: the $30B+ in tokenized assets that sit idle due to a lack of guaranteed pricing and settlement infrastructure. Rava offers a transparent, VaR-informed settlement engine with open pricing and liquidation values fully verifiable on-chain.', 'Ongoing visual and technical experiments across generative systems, motion, WebGL and new interaction patterns.'],
  ["100s is the world's first unified exchange, clearinghouse and data standard for real-time event risk – supporting markets including financial derivatives, sports betting and any event market traditionally served by prediction markets. 100s combines institutional-grade derivatives technology with blockchain settlement to create transparent, competitive markets where users trade against each other, not against the house.", 'Open-source tools, studies and reusable building blocks created while solving real product and creative-development problems.'],
  ['100s is the world&#39;s first unified exchange, clearinghouse and data standard for real-time event risk – supporting markets including financial derivatives, sports betting and any event market traditionally served by prediction markets. 100s combines institutional-grade derivatives technology with blockchain settlement to create transparent, competitive markets where users trade against each other, not against the house.', 'Open-source tools, studies and reusable building blocks created while solving real product and creative-development problems.'],
  ['Developer of a decentralized and autonomous 5G network platform, offering a turnkey private 5G solution for enterprise use cases with improved security and latency. Partnered with a major 5G access point OEM with early pilot programs with a major warehouse network operator and large retailers. Founded by the inventors of the eSIM.', 'A closer look at the thinking, tools and interests behind the work — and the kind of collaborations I want to pursue next.'],
  ['Debyt | Stablecoin Card Infrastructure | Hashgraph Ventures', 'Selected Work | FrigidCrow'],
  ['Rava | Tokenized Asset Settlement | Hashgraph Ventures', 'Experiments | FrigidCrow'],
  ['100s | Event Risk Exchange | Hashgraph Ventures', 'Open Source | FrigidCrow'],
  ['Bloxtel | Decentralized 5G Network | Hashgraph Ventures', 'About | FrigidCrow'],
  ['Selected Work builds stablecoin-powered debit card infrastructure, enabling global banking through modern card issuing rails and payment systems.', 'Selected digital products and interactive experiences by FrigidCrow.'],
  ['Experiments builds a settlement engine for tokenized assets and RWAs, enabling transparent pricing and on-chain liquidation for scalable market infrastructure.', 'Visual and technical experiments across motion, WebGL and generative systems.'],
  ['100s is a real-time event risk exchange and clearinghouse, enabling transparent markets for derivatives, sports betting and prediction markets.', 'Open-source tools, studies and reusable creative-development building blocks.'],
  ['About builds decentralized 5G infrastructure, enabling secure, low-latency private networks for enterprise use cases.', 'The practice, tools and interests behind FrigidCrow.'],
  ['Debyt', 'Selected Work'],
  ['Rava', 'Experiments'],
  ['Open Source', '100s'],
  ['Bloxtel', 'About'],
  ['Email', 'GitHub'],
  ['X (Twitter)', 'Contact'],
  ['LinkedIn', 'Archive'],
  ['mailto:info@hashgraphvc.com', 'https://github.com/FrigidCrow'],
  ['info@hashgraphvc.com', 'https://github.com/FrigidCrow'],
  ['https:\\u002F\\u002Fx.com\\u002FHashgraphVC', 'https:\\u002F\\u002Fgithub.com\\u002FFrigidCrow'],
  ['https://x.com/HashgraphVC', 'https://github.com/FrigidCrow'],
  ['https:\\u002F\\u002Fwww.linkedin.com\\u002Fcompany\\u002Fhashgraph-ventures\\u002F', 'https:\\u002F\\u002Fgithub.com\\u002FFrigidCrow?tab=repositories'],
  ['https://www.linkedin.com/company/hashgraph-ventures/', 'https://github.com/FrigidCrow?tab=repositories'],
  ['https:\\u002F\\u002Fwww.debyt.xyz\\u002F', 'https:\\u002F\\u002Fgithub.com\\u002FFrigidCrow'],
  ['https:\\u002F\\u002Fwww.rava.money', 'https:\\u002F\\u002Fgithub.com\\u002FFrigidCrow'],
  ['https:\\u002F\\u002Fbloxtel.com\\u002F', 'https:\\u002F\\u002Fgithub.com\\u002FFrigidCrow'],
  ['https://www.debyt.xyz/', 'https://github.com/FrigidCrow'],
  ['https://www.rava.money', 'https://github.com/FrigidCrow'],
  ['https://bloxtel.com/', 'https://github.com/FrigidCrow'],
  ['>debyt.xyz</a>', '>github.com/FrigidCrow</a>'],
  ['>rava.money</a>', '>github.com/FrigidCrow</a>'],
  ['>bloxtel.com</a>', '>github.com/FrigidCrow</a>'],
  ['Made by rbxgc', 'Built by FrigidCrow'],
  ['https://rbxgc.co/', 'https://github.com/FrigidCrow'],
  ['Hashgraph Ventures', 'FrigidCrow'],
  ['https:\\u002F\\u002Fhashgraphvc.com\\u002F', 'https:\\u002F\\u002Ffrigidcrow.github.io\\u002F'],
  ['https://hashgraphvc.com//', 'https://frigidcrow.github.io/'],
  ['https://hashgraphvc.com/', 'https://frigidcrow.github.io/'],
  ['"\\u002Fprivacy-policy"', '"https:\\u002F\\u002Ffrigidcrow.github.io\\u002Fprivacy-policy\\u002F"'],
  ['href="/privacy-policy"', 'href="https://frigidcrow.github.io/privacy-policy/"'],
  ['"internal"', '"external"'],
  ['https:\\u002Fhttps:\\u002F\\u002Fcdn.sanity.io', 'https:\\u002F\\u002Fcdn.sanity.io'],
  ['https://https//cdn.sanity.io', 'https://cdn.sanity.io'],
  ['https:\\u002F\\u002Fcdn.sanity.io\\u002Fimages', '\\u002Fcdn.sanity.io\\u002Fimages'],
  ['https://cdn.sanity.io/images', '/cdn.sanity.io/images'],
  ['"\\u002Fcdn.sanity.io\\u002Ffiles', '"https:\\u002F\\u002Fcdn.sanity.io\\u002Ffiles'],
  ['"/cdn.sanity.io/files', '"https://cdn.sanity.io/files']
];

async function collect(path) {
  const absolute = new URL(path, root);
  const stat = await import('node:fs/promises').then(({ stat }) => stat(absolute));
  if (stat.isFile()) return editableExtensions.has(extname(path)) ? [path] : [];
  const entries = await readdir(absolute, { withFileTypes: true });
  const nested = await Promise.all(entries.map((entry) => collect(join(path, entry.name))));
  return nested.flat();
}

const files = (await Promise.all(editableRoots.map(collect))).flat();
let total = 0;

for (const file of files) {
  const absolute = new URL(file, root);
  let source = await readFile(absolute, 'utf8');
  let changed = 0;
  if (extname(file) === '.html' && !source.includes('href="/personal.css"')) {
    source = source.replace('</head>', '<link rel="stylesheet" href="/personal.css"></head>');
    changed += 1;
  }
  for (const [from, to] of replacements) {
    const matches = source.split(from).length - 1;
    if (matches > 0) {
      source = source.replaceAll(from, to);
      changed += matches;
    }
  }
  if (changed > 0) {
    await writeFile(absolute, source);
    total += changed;
    console.log(`${file}: ${changed}`);
  }
}

console.log(`Applied ${total} replacements across ${files.length} editable files.`);
