import { readdir, readFile, writeFile } from 'node:fs/promises';
import { extname, join } from 'node:path';

const root = new URL('../', import.meta.url);
const editableExtensions = new Set(['.html', '.json']);
const editableRoots = ['index.html', '_payload.json', 'companies', 'privacy-policy'];

// These strings are shared by the prerendered HTML and Nuxt payloads. Keeping the
// payload in sync avoids hydration replacing the Chinese SSR copy with English.
const contentReplacements = [
  ['<html lang="en">', '<html lang="zh-CN">'],
  ['<html  lang="en">', '<html  lang="zh-CN">'],
  ['content="en_us"', 'content="zh_CN"'],
  ['FrigidCrow | Creative Technologist &amp; Digital Builder', 'FrigidCrow | 创意技术开发者与数字构建者'],
  ['FrigidCrow | Creative Technologist & Digital Builder', 'FrigidCrow | 创意技术开发者与数字构建者'],
  ['Independent creative technologist building expressive websites, interactive systems and real-time 3D experiences.', '独立创意技术开发者，专注于表现力网站、交互系统与实时 3D 体验。'],

  ['<p>Ideas become<br>digital experiences</p>', '<p>让想法成为<br>数字体验</p>'],
  ['Ideas become\\ndigital experiences', '让想法成为\\n数字体验'],
  ['Ideas become digital experiences', '让想法成为数字体验'],
  ['<p>Built with</p><p>intention</p>', '<p>用心</p><p>构建</p>'],
  ['"Built with"', '"用心"'],
  ['"intention"', '"构建"'],
  ['Built with intention', '用心构建'],
  ['<p>Design</p><p>code and</p><p>systems</p>', '<p>设计</p><p>代码与</p><p>系统</p>'],
  ['"Design"', '"设计"'],
  ['"code and"', '"代码与"'],
  ['"systems"', '"系统"'],
  ['Design code and systems', '设计、代码与系统'],
  ['<p>Experience</p><p>you can build on</p>', '<p>经验沉淀为</p><p>可持续体验</p>'],
  ['"Experience"', '"经验沉淀为"'],
  ['"you can build on"', '"可持续体验"'],
  ['Experience you can build on', '经验沉淀为可持续体验'],

  ['FrigidCrow is an independent creative technologist working across interaction design, frontend engineering, real-time 3D and emerging technology. I turn ambitious ideas into focused digital experiences — from first prototype to production.', 'FrigidCrow 是一名独立创意技术开发者，工作横跨交互设计、前端工程、实时 3D 与新兴技术。我把大胆的想法转化为聚焦的数字体验，从第一个原型一直做到正式上线。'],
  ['My work brings design, engineering and systems thinking into one process. The goal is not decoration alone: every interaction should clarify an idea, every technical choice should support the experience, and every prototype should be able to grow into a real product.', '我的工作把设计、工程与系统思维融为一个过程。每一次交互都应该让想法更清晰，每一个技术选择都应该服务于体验，每一个原型都应该能够成长为真正的产品。'],
  ['I like difficult briefs, unfamiliar tools and projects that need both taste and technical depth. My practice spans product thinking, creative development, Three.js, WebGL and rapid experimentation.', '我喜欢困难的命题、陌生的工具，以及同时需要审美与技术深度的项目。我的实践涵盖产品思维、创意开发、Three.js、WebGL与快速实验。'],
  ['The result is work that feels considered, performs well and gives people something worth remembering.', '最终的作品应该经过思考、性能可靠，并给人留下值得记住的体验。'],

  ['Open to ambitious ideas\\nand meaningful collaborations', '期待大胆的想法\\n与有意义的合作'],
  ['Open to ambitious ideas<br>and meaningful collaborations', '期待大胆的想法<br>与有意义的合作'],

  ['Creative Direction', '创意方向'],
  ['Strategy &amp; concept', '策略与概念'],
  ['Strategy & concept', '策略与概念'],
  ['Experience Design', '体验设计'],
  ['Interaction &amp; motion', '交互与动效'],
  ['Interaction & motion', '交互与动效'],
  ['Engineering', '工程开发'],
  ['Frontend systems', '前端系统'],
  ['Realtime 3D', '实时 3D'],
  ['Three.js &amp; shaders', 'Three.js 与着色器'],
  ['Three.js & shaders', 'Three.js 与着色器'],
  ['Prototyping', '原型设计'],
  ['Rapid experiments', '快速实验'],
  ['Research', '技术研究'],
  ['Emerging technology', '新兴技术'],
  ['Delivery', '项目交付'],
  ['From idea to launch', '从想法到上线'],

  ['A selection of digital products and interactive experiences, combining clear product thinking with expressive frontend craft.', '精选数字产品与交互体验，将清晰的产品思维与富有表现力的前端技术结合。'],
  ['Selected digital products and interactive experiences by FrigidCrow.', 'FrigidCrow 精选数字产品与交互体验。'],
  ['Selected Work | FrigidCrow', '精选作品 | FrigidCrow'],
  ['Selected Work', '精选作品'],
  ['Ongoing visual and technical experiments across generative systems, motion, WebGL and new interaction patterns.', '围绕生成系统、动态设计、WebGL 与新型交互方式展开的视觉和技术实验。'],
  ['Visual and technical experiments across motion, WebGL and generative systems.', '围绕动态设计、WebGL 与生成系统展开的视觉和技术实验。'],
  ['Experiments | FrigidCrow', '实验项目 | FrigidCrow'],
  ['Experiments', '实验项目'],
  ['Open-source tools, studies and reusable building blocks created while solving real product and creative-development problems.', '在解决真实产品与创意开发问题的过程中，沉淀的开源工具、技术研究与可复用组件。'],
  ['Open-source tools, studies and reusable creative-development building blocks.', '开源工具、技术研究与可复用的创意开发组件。'],
  ['Open Source | FrigidCrow', '开源项目 | FrigidCrow'],
  ['A closer look at the thinking, tools and interests behind the work — and the kind of collaborations I want to pursue next.', '进一步了解作品背后的思考、工具与兴趣，以及我希望参与的合作方向。'],
  ['The practice, tools and interests behind FrigidCrow.', '了解 FrigidCrow 的实践、工具与兴趣。'],
  ['About | FrigidCrow', '关于我 | FrigidCrow'],
  ['About', '关于我'],

  ['Scroll down to discover more', '向下滚动，探索更多'],
  ['Explore our portfolio', '探索作品'],
  ['Return to homepage', '返回首页'],
  ['Back to homepage', '返回首页'],
  ['Read more', '了解更多'],
  ['> Approach</div>', '> 方法</div>'],
  ['> Work</div>', '> 作品</div>'],
  ['> Capabilities</div>', '> 能力</div>'],
  ['"Approach"', '"方法"'],
  ['"Work"', '"作品"'],
  ['"Capabilities"', '"能力"'],
  ['>Contact</a>', '>联系</a>'],
  ['"Contact"', '"联系"'],
  ['>Archive</a>', '>项目</a>'],
  ['"Archive"', '"项目"'],
  ['Privacy Policy', '隐私政策'],
  ['Built by FrigidCrow', '由 FrigidCrow 制作'],

  ['aria-label="Hyperlink to home page"', 'aria-label="返回首页"'],
  ['aria-label="Enable sounds"', 'aria-label="开启声音"'],
  ['aria-label="Go to previous company page"', 'aria-label="前往上一个项目"'],
  ['aria-label="Go to next company page"', 'aria-label="前往下一个项目"'],
  ['aria-label="Show previous team member"', 'aria-label="查看上一项能力"'],
  ['aria-label="Show next team member"', 'aria-label="查看下一项能力"'],
  ['> SOUND </span>', '> 声音 </span>'],
  ['>OFF</span>', '>关</span>'],
  ['>ON</span>', '>开</span>'],

  ['Back to portfolio', '返回作品集'],
  ['Privacy information for the FrigidCrow personal portfolio.', 'FrigidCrow 个人作品集隐私说明。'],
  ['<h1>Privacy<br>Policy</h1>', '<h1>隐私<br>政策</h1>'],
  ['<h2>Overview</h2>', '<h2>概述</h2>'],
  ['This is a personal portfolio hosted as a static site on GitHub Pages. It does not provide user accounts, accept payments, or intentionally collect personal information through forms.', '这是一个托管在 GitHub Pages 上的个人作品集网站。本站不提供用户账户、不接受付款，也不会通过表单主动收集个人信息。'],
  ['<h2>Hosting data</h2>', '<h2>托管数据</h2>'],
  ["GitHub may process technical information such as IP addresses and request logs when serving this site. That processing is governed by GitHub's own privacy terms.", 'GitHub 在提供本站内容时，可能会处理 IP 地址、请求日志等技术信息。相关处理遵循 GitHub 自身的隐私条款。'],
  ['<h2>External links</h2>', '<h2>外部链接</h2>'],
  ['Links to GitHub and other external services take you to third-party sites with their own privacy practices.', '访问 GitHub 或其他外部服务的链接后，将适用对应第三方网站的隐私规则。'],
  ['<h2>Contact</h2>', '<h2>联系</h2>'],
  ['Questions can be sent through <a href="https://github.com/FrigidCrow">the FrigidCrow GitHub profile</a>.', '如有疑问，可通过 <a href="https://github.com/FrigidCrow">FrigidCrow 的 GitHub 主页</a>联系我。'],
  ['Last updated July 2026', '最后更新：2026 年 7 月']
];

const runtimeFiles = {
  '_nuxt/CEHeSSSx.js': [
    ["'Your device is<br /> not supported'", "'当前设备<br />不受支持'"],
    ["'This experience requires<br /> a modern browser'", "'此体验需要<br />现代浏览器'"],
    [" We've built this site using next-generation web technology that isn't supported on your current browser. Update to the latest version to view the experience as intended. ", ' 本站使用了新一代网页技术，当前浏览器暂不支持。请升级到最新版本，以获得完整体验。 '],
    ['label: "Update your browser"', 'label: "升级浏览器"'],
    ['createTextVNode(" Best viewed in the latest versions", -1)', 'createTextVNode(" 建议使用最新版本", -1)'],
    ['createTextVNode("of Chrome or Edge ", -1)', 'createTextVNode("Chrome 或 Edge 浏览器 ", -1)'],
    ['createBaseVNode("span", { class: "loader__btn-loader-label" }, " Loading ")', 'createBaseVNode("span", { class: "loader__btn-loader-label" }, " 加载中 ")'],
    ['label: "Enter with audio"', 'label: "开启声音进入"'],
    ['createBaseVNode("span", { class: "loader__btn-no-sound-label" }, " Enter without audio ")', 'createBaseVNode("span", { class: "loader__btn-no-sound-label" }, " 静音进入 ")'],
    ['createTextVNode(" This experience includes sound.")', 'createTextVNode(" 本体验包含声音。")'],
    ['createTextVNode("For the intended atmosphere, enable audio. ")', 'createTextVNode("建议开启声音，以获得完整氛围。 ")'],
    ["'Page not<br /> found'", "'页面<br />不存在'"],
    ["'Something<br /> went wrong'", "'页面出现<br />异常'"],
    ["'The page you\\'re looking for doesn\\'t exist or has been moved.'", "'你访问的页面不存在，或已被移动。'"],
    ["'An unexpected error occurred. Please try again later.'", "'发生了意外错误，请稍后再试。'"],
    ['label: "Go back home"', 'label: "返回首页"'],
    ["__props.error.statusMessage || 'An unexpected error occurred'", "__props.error.statusMessage || '发生了意外错误'"]
  ],
  '_nuxt/CMR927m8.js': [
    ["return isSoundMuted.value ? 'Enable sounds' : 'Mute sounds'", "return isSoundMuted.value ? '开启声音' : '关闭声音'"],
    ['{ class: "sound-toggle__label" }, " SOUND ", -1)', '{ class: "sound-toggle__label" }, " 声音 ", -1)'],
    ['}, "OFF", 8, _hoisted_4)', '}, "关", 8, _hoisted_4)'],
    ['}, "ON", 8, _hoisted_5)', '}, "开", 8, _hoisted_5)']
  ],
  '_nuxt/DfmE5oFY.js': [
    ['label: "Back to homepage"', 'label: "返回首页"'],
    ['label: "Read more"', 'label: "了解更多"'],
    ['"Show previous team member"', '"查看上一项能力"'],
    ['"Show next team member"', '"查看下一项能力"'],
    ["statusMessage: 'Page not found'", "statusMessage: '页面不存在'"]
  ],
  '_nuxt/DwgGGfV0.js': [
    ['label: "Built by FrigidCrow"', 'label: "由 FrigidCrow 制作"']
  ],
  '_nuxt/BoAlSyXz.js': [
    ['label: "Return to homepage"', 'label: "返回首页"']
  ],
  '_nuxt/-GFkwhdW.js': [
    ['"aria-label": "Hyperlink to home page"', '"aria-label": "返回首页"']
  ],
  '_nuxt/BpUVxTqq.js': [
    ['"prev-aria-label": "Go to previous company page"', '"prev-aria-label": "前往上一个项目"'],
    ['"next-aria-label": "Go to next company page"', '"next-aria-label": "前往下一个项目"']
  ]
};

async function collect(path) {
  const absolute = new URL(path, root);
  const { stat } = await import('node:fs/promises');
  const info = await stat(absolute);
  if (info.isFile()) return editableExtensions.has(extname(path)) ? [path] : [];
  const entries = await readdir(absolute, { withFileTypes: true });
  const nested = await Promise.all(entries.map((entry) => collect(join(path, entry.name))));
  return nested.flat();
}

async function apply(file, replacements) {
  const absolute = new URL(file, root);
  let source = await readFile(absolute, 'utf8');
  let changed = 0;
  for (const [from, to] of replacements) {
    const matches = source.split(from).length - 1;
    if (matches > 0) {
      source = source.replaceAll(from, to);
      changed += matches;
    }
  }
  if (changed > 0) await writeFile(absolute, source);
  return changed;
}

const contentFiles = (await Promise.all(editableRoots.map(collect))).flat();
let total = 0;
for (const file of contentFiles) {
  const changed = await apply(file, contentReplacements);
  if (changed > 0) console.log(`${file}: ${changed}`);
  total += changed;
}

for (const [file, replacements] of Object.entries(runtimeFiles)) {
  const changed = await apply(file, replacements);
  if (changed > 0) console.log(`${file}: ${changed}`);
  total += changed;
}

console.log(`Applied ${total} Chinese localization replacements.`);
