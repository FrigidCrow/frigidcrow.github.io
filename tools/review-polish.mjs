import { readdir, readFile, writeFile } from 'node:fs/promises';
import { extname, join } from 'node:path';

const root = new URL('../', import.meta.url);
const editableExtensions = new Set(['.html', '.json']);
const editableRoots = ['index.html', '_payload.json', 'companies', 'privacy-policy'];

const siteCopy = {
  title: 'FrigidCrow | 全栈与 AI 产品开发者',
  description: '独立全栈与 AI 产品开发者，构建模型应用、后端服务、数据系统与交互界面的完整产品。',
  heroTitle: '把 AI 做成\n可用产品',
  profileTitle: ['全栈构建'],
  profileCopy: 'FrigidCrow，独立全栈与AI产品开发者。工作覆盖模型接入、后端服务、数据处理和前端交互。从原型到部署，再到后续迭代，我会独立完成。',
  profileLabel: '全栈与 AI',
  portfolioTitle: ['AI 产品', '与开源项目'],
  portfolioCopy: '这里收录我公开维护的AI产品与开源项目，包括智能体工作流、开发者工具、数据服务和个人效率系统。',
  portfolioLabel: '公开项目',
  teamTitle: ['从模型能力', '到生产系统'],
  teamCopy: [
    '我会同时处理界面、API、数据库、任务编排、部署和AI工作流。面对不确定需求，先做能验证的版本，再把关键链路补到可维护、可观测、能长期运行。',
    '模型适合处理模糊问题，代码适合守住确定性。两者都要在真实环境里稳定工作。'
  ],
  footerTitle: '有 AI 产品要落地\n可以直接联系我'
};

const capabilities = [
  { fromName: '创意方向', fromPosition: '策略与概念', name: 'AI 产品设计', position: '需求与方案' },
  { fromName: '体验设计', fromPosition: '交互与动效', name: '模型应用', position: 'RAG 与智能体' },
  { fromName: '工程开发', fromPosition: '前端系统', name: '全栈开发', position: '前端与后端' },
  { fromName: '实时 3D', fromPosition: 'Three.js 与着色器', name: '后端服务', position: 'API 与数据库' },
  { fromName: '原型设计', fromPosition: '快速实验', name: '工程交付', position: '测试与部署' },
  { fromName: '技术研究', fromPosition: '新兴技术', name: '实时 3D', position: 'Three.js 与 WebGL' },
  { fromName: '项目交付', fromPosition: '从想法到上线', name: '技术研究', position: '新模型与工具' }
];

const projects = {
  debyt: {
    name: 'Zhulong（烛龙）',
    url: 'https://github.com/FrigidCrow/Zhulong-Project-Intelligence-Kit',
    description: '本地优先的 AI 工程情报框架，解析代码、项目状态与验证证据，为智能体提供可审查的开发上下文。',
    seoDescription: '面向 AI 编程智能体的本地项目情报与验证门禁工具包。'
  },
  rava: {
    name: 'OpenDevBridge',
    url: 'https://github.com/FrigidCrow/OpenDevBridge',
    description: '把聊天入口、Codex 执行器和任务状态连成一套可观测的智能体工作流，支持任务拆分、安全门禁与失败恢复。',
    seoDescription: '连接聊天入口与 Codex 的智能体任务编排、门禁和观测服务。'
  },
  '100s': {
    name: 'Personal OS',
    url: 'https://github.com/FrigidCrow/personal-os',
    description: '用一个本地优先的全栈应用管理项目、任务、机会与 AI 执行记录，前后端数据保持在同一套可审查工作流中。',
    seoDescription: '管理项目数据与 AI 执行记录的本地优先全栈工作台。'
  },
  bloxtel: {
    name: 'FrigidCrow 作品集',
    url: 'https://github.com/FrigidCrow/frigidcrow.github.io',
    description: '使用 Three.js、WebGL 和自动化内容管线构建的个人作品集，可直接部署到 GitHub Pages。',
    seoDescription: '结合 Three.js、自动化内容管线与 GitHub Pages 部署的个人作品集。'
  }
};

const globalReplacements = [
  [
    'FrigidCrow 是一名独立创意技术开发者，工作横跨交互设计、前端工程、实时 3D 与新兴技术。我把大胆的想法转化为聚焦的数字体验，从第一个原型一直做到正式上线。',
    'FrigidCrow 是一名独立创意技术开发者，专注交互设计、前端工程与实时 3D。我把想法做成可用、可维护、可上线的数字产品。'
  ],
  [
    '我的工作把设计、工程与系统思维融为一个过程。每一次交互都应该让想法更清晰，每一个技术选择都应该服务于体验，每一个原型都应该能够成长为真正的产品。',
    '这里收录我公开维护的产品与开源项目，涵盖 AI 辅助开发、工程工具、个人系统与交互式 Web 体验。'
  ],
  [
    'FrigidCrow 是一名独立创意技术开发者，专注交互设计、前端工程与实时 3D。我把想法做成可用、可维护、可上线的数字产品。',
    siteCopy.profileCopy
  ],
  [
    '这里收录我公开维护的产品与开源项目，涵盖 AI 辅助开发、工程工具、个人系统与交互式 Web 体验。',
    siteCopy.portfolioCopy
  ],
  [
    '我喜欢困难的命题、陌生的工具，以及同时需要审美与技术深度的项目。我的实践涵盖产品思维、创意开发、Three.js、WebGL与快速实验。',
    siteCopy.teamCopy[0]
  ],
  [
    '最终的作品应该经过思考、性能可靠，并给人留下值得记住的体验。',
    siteCopy.teamCopy[1]
  ],
  [
    'FrigidCrow 是一名全栈与 AI 产品开发者，工作覆盖模型接入、后端服务、数据处理和前端交互。我独立完成原型、部署与后续迭代。',
    siteCopy.profileCopy
  ],
  [
    'FrigidCrow 是一名全栈与AI产品开发者，工作覆盖模型接入、后端服务、数据处理和前端交互。我独立完成原型、部署与后续迭代。',
    siteCopy.profileCopy
  ],
  [
    '这里收录我公开维护的 AI 产品与开源项目，包括智能体工作流、开发者工具、数据服务和个人效率系统。',
    siteCopy.portfolioCopy
  ],
  [
    '我会同时处理界面、API、数据库、任务编排、部署和 AI 工作流。面对不确定需求，先做能验证的版本，再把关键链路补到可维护、可观测、能长期运行。',
    siteCopy.teamCopy[0]
  ],
  ['FrigidCrow | 创意技术开发者与数字构建者', siteCopy.title],
  ['独立创意技术开发者，专注于表现力网站、交互系统与实时 3D 体验。', siteCopy.description],
  ['<p>让想法成为<br>数字体验</p>', '<p>把 AI 做成<br>可用产品</p>'],
  ['<p>用心构建</p>', '<p>全栈构建</p>'],
  ['<p>公开产品</p><p>与开源实践</p>', '<p>AI 产品</p><p>与开源项目</p>'],
  ['<p>经验沉淀为</p><p>可持续体验</p>', '<p>从模型能力</p><p>到生产系统</p>'],
  ['<p>期待大胆的想法<br>与有意义的合作</p>', '<p>有 AI 产品要落地<br>可以直接联系我</p>'],
  ['> 方法</div>', '> 全栈与 AI</div>'],
  ['> 公开产品</div>', '> 公开项目</div>'],
  ['通用的本地 AI 工程情报框架，为项目状态、代码影响面、工作流门禁和验证证据建立一套可审查的闭环。', projects.debyt.description],
  ['面向 AI 辅助软件工程的本地优先项目智能与证据门禁工具包。', projects.debyt.seoDescription],
  ['连接聊天入口与 Codex 的开源任务编排层，提供任务拆分、安全门禁、执行观测和可恢复的状态管理。', projects.rava.description],
  ['面向 Codex 编程智能体的任务编排、安全门禁与全链路观测工具。', projects.rava.seoDescription],
  ['本地优先的个人技术经营控制台，把项目、任务、机会、实验、资产和 Codex 执行记录放进同一套可审查工作流。', projects['100s'].description],
  ['本地优先的个人技术经营控制台与 Codex 协作工作流。', projects['100s'].seoDescription],
  ['沉浸式 Three.js 个人作品集，保留实时 3D、页面转场与响应式交互，并可直接部署到 GitHub Pages。', projects.bloxtel.description],
  ['FrigidCrow 的沉浸式 Three.js 个人作品集与 GitHub Pages 静态站点。', projects.bloxtel.seoDescription],
  ['WebGL 与快速实验。', 'WebGL与快速实验。'],
  ['WebGL\u00a0与快速实验。', 'WebGL与快速实验。'],
  ['<p>用心</p><p>构建</p>', '<p>全栈构建</p>'],
  ['<p>公开</p><p>产品与</p><p>开源实践</p>', '<p>AI 产品</p><p>与开源项目</p>'],
  ['<p>设计</p><p>代码与</p><p>系统</p>', '<p>AI 产品</p><p>与开源项目</p>'],
  ['"设计"', '"AI 产品"'],
  ['"代码与"', '"与开源项目"'],
  ['"系统"', '"与开源项目"'],
  ['> 作品</div>', '> 公开项目</div>'],
  ['"作品"', '"公开项目"'],
  ['探索作品', '浏览公开项目'],
  ['> 声音 </span>', '>声音</span>'],
  ['>项目</a>', '>项目（GitHub）</a>'],
  ['"项目"', '"项目（GitHub）"'],
  [
    '如有疑问，可通过 <a href="https://github.com/FrigidCrow">FrigidCrow 的 GitHub 主页</a>联系我。',
    '如有疑问，可发送邮件至 <a href="mailto:172187433@qq.com">172187433@qq.com</a>。'
  ],
  ['精选作品 | FrigidCrow', `${projects.debyt.name} | FrigidCrow`],
  ['FrigidCrow 精选数字产品与交互体验。', projects.debyt.seoDescription],
  ['精选数字产品与交互体验，将清晰的产品思维与富有表现力的前端技术结合。', projects.debyt.description],
  ['精选作品', projects.debyt.name],
  ['实验项目 | FrigidCrow', `${projects.rava.name} | FrigidCrow`],
  ['围绕动态设计、WebGL 与生成系统展开的视觉和技术实验。', projects.rava.seoDescription],
  ['围绕生成系统、动态设计、WebGL 与新型交互方式展开的视觉和技术实验。', projects.rava.description],
  ['实验项目', projects.rava.name],
  ['100s | FrigidCrow', `${projects['100s'].name} | FrigidCrow`],
  ['开源工具、技术研究与可复用的创意开发组件。', projects['100s'].seoDescription],
  ['在解决真实产品与创意开发问题的过程中，沉淀的开源工具、技术研究与可复用组件。', projects['100s'].description],
  ['关于我 | FrigidCrow', `${projects.bloxtel.name} | FrigidCrow`],
  ['了解 FrigidCrow 的实践、工具与兴趣。', projects.bloxtel.seoDescription],
  ['进一步了解作品背后的思考、工具与兴趣，以及我希望参与的合作方向。', projects.bloxtel.description],
  ['关于我', projects.bloxtel.name]
];

const footerMarkup = '<ul class="footer__list footer__list--socials"><!--[--><li><a href="mailto:172187433@qq.com" rel="noopener noreferrer" target="_self" class="link" type="email">联系</a></li><li><a href="https://github.com/FrigidCrow?tab=repositories" rel="noopener noreferrer" target="_blank" class="link" type="external">项目（GitHub）</a></li><!--]--></ul>';

async function collect(path) {
  const absolute = new URL(path, root);
  const { stat } = await import('node:fs/promises');
  const info = await stat(absolute);
  if (info.isFile()) return editableExtensions.has(extname(path)) ? [path] : [];
  const entries = await readdir(absolute, { withFileTypes: true });
  const nested = await Promise.all(entries.map((entry) => collect(join(path, entry.name))));
  return nested.flat();
}

function applyReplacements(source, replacements) {
  let changed = 0;
  for (const [from, to] of replacements) {
    const matches = source.split(from).length - 1;
    if (matches > 0) {
      source = source.replaceAll(from, to);
      changed += matches;
    }
  }
  return { source, changed };
}

function transformNuxtGraph(nodes) {
  if (!Array.isArray(nodes)) return { nodes, changed: 0 };

  let changed = 0;
  const originalLength = nodes.length;
  const resolve = (ref) => Number.isInteger(ref) && ref >= 0 ? nodes[ref] : undefined;
  const ensureValue = (value) => {
    const existing = nodes.findIndex((item) => item === value);
    if (existing >= 0) return existing;
    nodes.push(value);
    return nodes.length - 1;
  };
  const setValue = (object, key, value) => {
    if (resolve(object[key]) === value) return;
    object[key] = ensureValue(value);
    changed += 1;
  };
  const setNull = (object, key) => {
    if (resolve(object[key]) === null) return;
    object[key] = ensureValue(null);
    changed += 1;
  };
  const resolveSlug = (ref) => {
    const value = resolve(ref);
    if (typeof value === 'string') return value;
    if (value && typeof value === 'object' && !Array.isArray(value)) return resolve(value.current);
    return null;
  };
  const updateBlockText = (blockRef, text) => {
      const block = resolve(blockRef);
      const children = block && resolve(block.children);
      if (!Array.isArray(children)) return;
      for (const childRef of children) {
        const child = resolve(childRef);
        if (child && typeof child === 'object' && 'text' in child) setValue(child, 'text', text);
      }
  };
  const updateCopy = (copyRef, text) => {
    const blocks = resolve(copyRef);
    if (!Array.isArray(blocks)) return;
    for (const blockRef of blocks) {
      updateBlockText(blockRef, text);
    }
  };
  const updatePortableTitle = (titleRef, lines) => {
    const blocks = resolve(titleRef);
    if (!Array.isArray(blocks) || blocks.length < lines.length) return;
    lines.forEach((text, index) => updateBlockText(blocks[index], text));
    if (blocks.length !== lines.length) {
      blocks.splice(lines.length);
      changed += 1;
    }
  };
  const updateSeo = (seoRef, project) => {
    const seo = resolve(seoRef);
    if (!seo || typeof seo !== 'object' || Array.isArray(seo)) return;
    setValue(seo, 'title', `${project.name} | FrigidCrow`);
    setValue(seo, 'description', project.seoDescription);
  };
  const updateSiteSeo = (object) => {
    const title = resolve(object.title);
    if (title !== 'FrigidCrow | 创意技术开发者与数字构建者' && title !== siteCopy.title) return;
    setValue(object, 'title', siteCopy.title);
    setValue(object, 'description', siteCopy.description);
  };
  const createLink = ({ label, type, url }) => {
    nodes.push({
      label: ensureValue(label),
      type: ensureValue(type),
      url: ensureValue(url)
    });
    return nodes.length - 1;
  };
  const updateSocials = (object, isRaw) => {
    const current = resolve(object.socials);
    if (Array.isArray(current)) {
      const labels = current.map((ref) => resolve(resolve(ref)?.label));
      const urls = current.map((ref) => resolve(resolve(ref)?.url));
      if (labels.join('|') === '联系|项目（GitHub）' && urls[0] === (isRaw ? '172187433@qq.com' : 'mailto:172187433@qq.com')) return;
    }
    const contact = createLink({
      label: '联系',
      type: 'email',
      url: isRaw ? '172187433@qq.com' : 'mailto:172187433@qq.com'
    });
    const repositories = createLink({
      label: '项目（GitHub）',
      type: 'external',
      url: 'https://github.com/FrigidCrow?tab=repositories'
    });
    nodes.push([contact, repositories]);
    object.socials = nodes.length - 1;
    changed += 1;
  };

  for (let index = 0; index < originalLength; index += 1) {
    const node = nodes[index];
    if (!node || typeof node !== 'object' || Array.isArray(node)) continue;

    if ('slug' in node && ('name' in node || 'companyName' in node)) {
      const project = projects[resolveSlug(node.slug)];
      if (project) {
        if ('name' in node) setValue(node, 'name', project.name);
        if ('companyName' in node) setValue(node, 'companyName', project.name);
        if ('logo' in node && 'name' in node) setNull(node, 'logo');
        setValue(node, 'websiteUrl', project.url);
        updateCopy(node.copy, project.description);
        updateSeo(node.seo, project);
      }
    }

    if ('title' in node && 'description' in node) updateSiteSeo(node);

    if ('name' in node && 'position' in node) {
      const name = resolve(node.name);
      const position = resolve(node.position);
      const capability = capabilities.find((item) =>
        (item.fromName === name && item.fromPosition === position) ||
        (item.name === name && item.position === position)
      );
      if (capability) {
        setValue(node, 'name', capability.name);
        setValue(node, 'position', capability.position);
        const portrait = resolve(node.portrait);
        if (portrait && typeof portrait === 'object' && !Array.isArray(portrait) && 'alt' in portrait) {
          setValue(portrait, 'alt', capability.name);
        }
      }
    }

    if ('socials' in node && 'footerTitle' in node) updateSocials(node, false);
    if ('socials' in node && 'footer_title' in node) updateSocials(node, true);
    if ('footerTitle' in node) updatePortableTitle(node.footerTitle, [siteCopy.footerTitle]);
    if ('footer_title' in node) updatePortableTitle(node.footer_title, [siteCopy.footerTitle]);
    if ('hero_title' in node) updatePortableTitle(node.hero_title, [siteCopy.heroTitle]);
    if ('investors_title' in node) updatePortableTitle(node.investors_title, siteCopy.profileTitle);
    if ('investors_copy' in node) setValue(node, 'investors_copy', siteCopy.profileCopy);
    if ('investors_section_label' in node) setValue(node, 'investors_section_label', siteCopy.profileLabel);
    if ('portfolio_title' in node) updatePortableTitle(node.portfolio_title, siteCopy.portfolioTitle);
    if ('portfolio_copy' in node) setValue(node, 'portfolio_copy', siteCopy.portfolioCopy);
    if ('portfolio_section_label' in node) setValue(node, 'portfolio_section_label', siteCopy.portfolioLabel);
    if ('team_title' in node) updatePortableTitle(node.team_title, siteCopy.teamTitle);
    if ('team_copy' in node) updatePortableTitle(node.team_copy, siteCopy.teamCopy);
  }

  return { nodes, changed };
}

function polishNuxtDataInHtml(source) {
  let changed = 0;
  const pattern = /(<script[^>]*id="__NUXT_DATA__"[^>]*>)([\s\S]*?)(<\/script>)/g;
  source = source.replace(pattern, (match, start, json, end) => {
    const result = transformNuxtGraph(JSON.parse(json));
    if (result.changed === 0) return match;
    changed += result.changed;
    return `${start}${JSON.stringify(result.nodes)}${end}`;
  });
  return { source, changed };
}

function polishHtml(source, file) {
  let changed = 0;

  const footerPattern = /<ul class="footer__list footer__list--socials">[\s\S]*?<\/ul>/g;
  if (footerPattern.test(source)) {
    source = source.replace(footerPattern, footerMarkup);
    changed += 1;
  }

  if (file === 'index.html') {
    for (const capability of capabilities) {
      const from = `<div class="home-team-member"><p class="h2"><span class="text-splitter">${capability.fromName}</span></p><p class="home-team-member__position btn-label ttu"><span class="text-splitter">${capability.fromPosition}</span></p></div>`;
      const to = `<div class="home-team-member"><p class="h2"><span class="text-splitter">${capability.name}</span></p><p class="home-team-member__position btn-label ttu"><span class="text-splitter">${capability.position}</span></p></div>`;
      if (source.includes(from)) {
        source = source.replaceAll(from, to);
        changed += 1;
      }
    }
  }

  const routeMatch = file.match(/^companies\/([^/]+)\/index\.html$/);
  if (!routeMatch) return { source, changed };

  const project = projects[routeMatch[1]];
  if (!project) return { source, changed };

  const headingMarkup = `<h1 class="company-content__title anim-fade">${project.name}</h1>`;
  const headingPattern = /<h1 class="(?:company-content__title--hidden )?company-content__title anim-fade">[\s\S]*?<\/h1>/;
  if (headingPattern.test(source)) {
    source = source.replace(headingPattern, headingMarkup);
    changed += 1;
  }

  const figurePattern = /<figure class="company-content__fig anim-fade">[\s\S]*?<\/figure>/;
  if (figurePattern.test(source)) {
    source = source.replace(figurePattern, '');
    changed += 1;
  }

  if (source.includes(headingMarkup) && !source.includes(`${headingMarkup}<!---->`)) {
    source = source.replace(headingMarkup, `${headingMarkup}<!---->`);
    changed += 1;
  }

  const linkMarkup = `<a class="company-content__url anim-fade ttu btn-label" target="_blank" rel="noreferrer noopener" href="${project.url}">${project.url.replace(/^https?:\/\//, '')}</a>`;
  const linkPattern = /<a class="company-content__url[\s\S]*?<\/a>/;
  if (linkPattern.test(source)) {
    source = source.replace(linkPattern, linkMarkup);
    changed += 1;
  } else {
    if (source.includes(`${headingMarkup}<!---->`)) {
      source = source.replace(`${headingMarkup}<!---->`, `${headingMarkup}<!---->${linkMarkup}`);
      changed += 1;
    }
  }

  const copyPattern = /(<div class="portable-text text-splitter body-copy"><!--\[--><p>)[\s\S]*?(<\/p><!--\]--><\/div>)/;
  if (copyPattern.test(source)) {
    source = source.replace(copyPattern, `$1${project.description}$2`);
    changed += 1;
  }

  return { source, changed };
}

const files = (await Promise.all(editableRoots.map(collect))).flat();
let total = 0;

for (const file of files) {
  const absolute = new URL(file, root);
  let source = await readFile(absolute, 'utf8');
  const globalResult = applyReplacements(source, globalReplacements);
  source = globalResult.source;
  let changed = globalResult.changed;

  if (extname(file) === '.html') {
    const htmlResult = polishHtml(source, file);
    source = htmlResult.source;
    changed += htmlResult.changed;

    const nuxtDataResult = polishNuxtDataInHtml(source);
    source = nuxtDataResult.source;
    changed += nuxtDataResult.changed;
  } else if (extname(file) === '.json') {
    const graphResult = transformNuxtGraph(JSON.parse(source));
    if (graphResult.changed > 0) {
      source = JSON.stringify(graphResult.nodes);
      changed += graphResult.changed;
    }
  }

  if (changed > 0) {
    await writeFile(absolute, source);
    console.log(`${file}: ${changed}`);
    total += changed;
  }
}

const runtimeReplacements = {
  '_nuxt/CMR927m8.js': [
    ['{ class: "sound-toggle__label" }, " 声音 ", -1)', '{ class: "sound-toggle__label" }, "声音", -1)']
  ],
};

for (const [file, replacements] of Object.entries(runtimeReplacements)) {
  const absolute = new URL(file, root);
  const source = await readFile(absolute, 'utf8');
  const result = applyReplacements(source, replacements);
  if (result.changed > 0) {
    await writeFile(absolute, result.source);
    console.log(`${file}: ${result.changed}`);
    total += result.changed;
  }
}

console.log(`Applied ${total} review and public-project refinements.`);
