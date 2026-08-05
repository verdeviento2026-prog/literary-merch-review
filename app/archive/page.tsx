import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "迭代档案｜文学器物决策室",
  description: "追溯 24 张弃用与迭代稿，了解从结构探索、实拍校准到电商主图的设计演进。",
};

type Iteration = {
  group: "马克杯" | "亚克力台历" | "硫酸纸书签";
  author: string;
  theme: string;
  slug: string;
  diagnosis: string;
  revision: string;
};

const basePath=process.env.NEXT_PUBLIC_BASE_PATH||"";

const iterations: Iteration[] = [
  { group:"马克杯", author:"苏轼", theme:"雨中归舟", slug:"mug-01-sushi-rain", diagnosis:"氛围成立，但远景与桌面叙事抢过杯体，缩略图里商品不够直接。", revision:"V2 放大杯体并突出杯型、釉面与印刷区域，文学场景退为背景信息。" },
  { group:"马克杯", author:"卡夫卡", theme:"晨间档案", slug:"mug-02-kafka-morning-archive", diagnosis:"档案室气质明确，画面却更像杂志静物，缺少主图应有的规格层级。", revision:"V2 保留深红门缝语言，改成正面商品展示，并补充容量与材质标签。" },
  { group:"马克杯", author:"加缪", theme:"正午", slug:"mug-03-camus-noon", diagnosis:"生活方式感偏重，强烈光影压低了杯身图案的第一眼识别。", revision:"V2 用更干净的商品台面和统一暖白背景，让蓝色与金黄图形成为焦点。" },
  { group:"马克杯", author:"海明威", theme:"水面之下", slug:"mug-04-hemingway-below-surface", diagnosis:"场景层次多，但杯体比例、图案可见度和商业信息层级不稳定。", revision:"V2 固定与同系列一致的杯体占比，以深海线描和红色浮标建立识别点。" },
  { group:"亚克力台历", author:"托尔斯泰", theme:"田野与家", slug:"calendar-01-tolstoy-field-home", diagnosis:"旧稿使用了木质底座，与实际链接的透明折弯亚克力双环结构不一致。", revision:"V2 纠正为 14×14cm 透明折弯结构，田野图形只存在于可印刷页面。" },
  { group:"亚克力台历", author:"伍尔夫", theme:"自己的光", slug:"calendar-02-woolf-daylight", diagnosis:"窗格光影有编辑感，但旧结构不准确，且不容易一眼判断为台历商品。", revision:"V2 明确双环、月历页与透明支架，窗格光影转为辅助性的背景线索。" },
  { group:"亚克力台历", author:"陀思妥耶夫斯基", theme:"地下室之夜", slug:"calendar-03-dostoevsky-underground", diagnosis:"整体过暗，支架边缘和月历信息被压住，缩略图商品识别最弱。", revision:"V2 提亮透明材质和边缘高光，以暖黄门缝保留主题，避免吞掉商品。" },
  { group:"亚克力台历", author:"萨特", theme:"自由日程", slug:"calendar-04-sartre-freedom-schedule", diagnosis:"网格概念存在，但页面更像平面海报，没有建立清楚的实物结构。", revision:"V2 以透明台历的侧面折弯和双环为结构锚点，再用开放网格表达主题。" },
  { group:"硫酸纸书签", author:"博尔赫斯", theme:"迷宫", slug:"bookmark-01-borges-labyrinth", diagnosis:"材质感已经接近实物，但主次关系偏散，缺少系列化的电商陈列秩序。", revision:"V2 保留半透明质感，把五枚组合、尺寸与主题图形统一到同一套主图结构。" },
  { group:"硫酸纸书签", author:"里尔克", theme:"玫瑰", slug:"bookmark-02-rilke-rose", diagnosis:"玫瑰细节真实，但卡片大小、透光和组合数量没有被清楚说明。", revision:"V2 强化五枚组合与半透明叠放，统一红色规格标签和背景光线。" },
  { group:"硫酸纸书签", author:"黑塞", theme:"荒野", slug:"bookmark-03-hesse-wilderness", diagnosis:"画面偏糊、对比度低，山林与书签边界混在一起，不像清晰的电商商品图。", revision:"V2 拉开书签与背景的明度差，固定正面陈列，并提高印刷线条与轮廓清晰度。" },
  { group:"硫酸纸书签", author:"佩索阿", theme:"星图", slug:"bookmark-04-pessoa-star-chart", diagnosis:"星图气质成立，但背景叙事仍多于规格表达，与其他款的视觉层级不统一。", revision:"V2 保留深蓝与细金线，统一为可比较的五枚组合商品主图。" },
];

const stages = [
  { code:"V0", title:"结构探索", count:"12 张", body:"先快速确定作者、主题与可印刷图形。价值在方向探索；主要问题是商品结构会漂移，部分画面更像气氛海报。" },
  { code:"V1", title:"实拍校准", count:"12 张", body:"用买家评价中的材质、透光、印刷与使用状态校准真实感。商品更可信，但电商主图的商品占比与信息层级仍不足。" },
  { code:"V2", title:"电商主图", count:"29 张", body:"以商家主图的陈列结构为骨架，以买家实拍校准材质，并统一暖白背景、系列签与规格标签。当前方案在主页面决策。" },
];

export default function ArchivePage() {
  const groups = ["马克杯", "亚克力台历", "硫酸纸书签"] as const;
  return <main>
    <header className="masthead archive-masthead">
      <a className="brand" href={`${basePath}/`}><span className="brand-seal">文</span><span>文学器物决策室</span></a>
      <div className="header-actions"><div className="issue">ITERATION ARCHIVE · V0—V2</div><a className="archive-link" href={`${basePath}/`}>← 返回当前方案</a></div>
    </header>

    <section className="archive-hero">
      <div className="hero-kicker">迭代档案 · 全部旧稿保留</div>
      <h1>不是被删除，<br/><em>而是有依据地淘汰。</em></h1>
      <p>这里收录当前方案之前的 24 张图片。每一组都可以从 V0 结构草稿追到 V1 实拍校准，再回到主页面查看现在的 29 张 V2 电商主图；点击任意图片可单独打开原图。</p>
      <div className="hero-meta"><span>03 个阶段</span><span>24 张旧稿</span><span>12 条迭代链</span></div>
    </section>

    <section className="archive-timeline" aria-label="迭代阶段">
      {stages.map((stage, index)=><article key={stage.code} className={stage.code === "V2" ? "current" : ""}>
        <div className="stage-index">0{index+1}</div><div className="stage-code">{stage.code}</div><h2>{stage.title}</h2><strong>{stage.count}</strong><p>{stage.body}</p>
        {stage.code === "V2" && <a href={`${basePath}/`}>查看当前 29 张主图 →</a>}
      </article>)}
    </section>

    <nav className="archive-jump" aria-label="档案分类">
      <span>按商品追溯</span>{groups.map(group=><a key={group} href={`#${group}`}>{group}</a>)}
    </nav>

    {groups.map((group, groupIndex)=><section className="archive-section" id={group} key={group}>
      <div className="archive-section-head"><span>0{groupIndex+1}</span><div><div className="hero-kicker">PRODUCT ARCHIVE</div><h2>{group}</h2></div><p>每行从左到右对照 V0 与 V1，下方记录被淘汰的原因，以及该问题在 V2 中的处理方式。</p></div>
      <div className="iteration-list">
        {iterations.filter(item=>item.group===group).map((item, index)=><article className="iteration-card" key={item.slug}>
          <div className="iteration-title"><span>{String(index+1).padStart(2,"0")}</span><h3>{item.author}<small>《{item.theme}》</small></h3></div>
          <div className="iteration-images">
            <a href={`${basePath}/archive/${item.slug}-draft.webp`} target="_blank" rel="noreferrer"><img loading="lazy" src={`${basePath}/archive/${item.slug}-draft.webp`} alt={`${item.author}《${item.theme}》V0 结构草稿`}/><span><b>V0</b> 结构草稿 · 打开原图 ↗</span></a>
            <a href={`${basePath}/archive/${item.slug}-reviewbased.webp`} target="_blank" rel="noreferrer"><img loading="lazy" src={`${basePath}/archive/${item.slug}-reviewbased.webp`} alt={`${item.author}《${item.theme}》V1 实拍校准稿`}/><span><b>V1</b> 实拍校准 · 打开原图 ↗</span></a>
          </div>
          <div className="iteration-notes"><div><b>为什么弃用</b><p>{item.diagnosis}</p></div><div><b>如何进入 V2</b><p>{item.revision}</p></div></div>
        </article>)}
      </div>
    </section>)}

    <section className="archive-cta"><div><span className="hero-kicker">CURRENT DECISION</span><h2>档案用于解释，<br/>V2 用于决策。</h2></div><p>旧稿不参与当前投票，避免混淆版本；回到主页面即可对 29 张统一电商主图做首选、备选与淘汰判断。</p><a href={`${basePath}/`}>返回当前方案 →</a></section>
    <footer><span>文学器物决策室 · 迭代档案</span><span>V0 结构探索 / V1 实拍校准 / V2 电商主图 · 2026/08</span></footer>
  </main>;
}
