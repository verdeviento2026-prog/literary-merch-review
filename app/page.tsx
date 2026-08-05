"use client";

import { useEffect, useMemo, useState } from "react";

type Product = "马克杯" | "亚克力台历" | "硫酸纸书签" | "帆布包" | "亚克力PP夹" | "贴纸" | "作家系列书签";
type Decision = "首选" | "备选" | "淘汰" | "未决定";
type Design = { id:string; product:Product; number:string; author:string; theme:string; direction:string; image:string; source:string; link?:string };
const basePath=process.env.NEXT_PUBLIC_BASE_PATH||"";
const bookmarkCopyDocument=`${basePath}/docs/作家系列书签内容与打印说明.docx`;

const productLinks: Partial<Record<Product,string>> = {
  "马克杯":"https://item.taobao.com/item.htm?id=802446102393&skuId=5632838046363",
  "亚克力台历":"https://item.taobao.com/item.htm?id=660797761619&skuId=5207219145567",
  "硫酸纸书签":"https://item.taobao.com/item.htm?id=990767674411&skuId=5962186857379",
  "帆布包":"https://item.taobao.com/item.htm?id=812040486381&skuId=5996468790943",
  "亚克力PP夹":"https://item.taobao.com/item.htm?id=957767991009&skuId=6052913666402",
  "贴纸":"",
  "作家系列书签":"",
};

const raw: Array<[Product,string,string,string,string,string]> = [
  ["马克杯","苏轼","雨中归舟","水墨归舟 · 斜雨远山","mug-01-sushi-rain-ecom-v2.webp","330mL 奶白芝麻釉胖柄杯"],
  ["马克杯","卡夫卡","晨间档案","档案线框 · 深红门缝","mug-02-kafka-morning-archive-ecom-v2.webp","330mL 奶白芝麻釉胖柄杯"],
  ["马克杯","加缪","正午","地中海蓝 · 金黄日轮","mug-03-camus-noon-ecom-v2.webp","330mL 奶白芝麻釉胖柄杯"],
  ["马克杯","海明威","水面之下","深海线描 · 红色浮标","mug-04-hemingway-below-surface-ecom-v2.webp","330mL 奶白芝麻釉胖柄杯"],
  ["亚克力台历","托尔斯泰","田野与家","麦田地平线 · 远处小屋","calendar-01-tolstoy-field-home-ecom-v2.webp","14×14cm 透明折弯亚克力双环台历"],
  ["亚克力台历","伍尔夫","自己的光","窗格光影 · 海蓝细线","calendar-02-woolf-own-light-ecom-v2.webp","14×14cm 透明折弯亚克力双环台历"],
  ["亚克力台历","陀思妥耶夫斯基","地下室之夜","深灰石阶 · 暖黄门缝","calendar-03-dostoevsky-underground-night-ecom-v2.webp","14×14cm 透明折弯亚克力双环台历"],
  ["亚克力台历","萨特","自由日程","开放网格 · 朱红方框","calendar-04-sartre-freedom-schedule-ecom-v2.webp","14×14cm 透明折弯亚克力双环台历"],
  ["硫酸纸书签","博尔赫斯","迷宫","几何迷宫 · 金色光点","bookmark-01-borges-labyrinth-ecom-v2.webp","35×128mm 半透明书签五枚组"],
  ["硫酸纸书签","里尔克","玫瑰","暗红线描 · 花瓣露珠","bookmark-02-rilke-rose-ecom-v2.webp","35×128mm 半透明书签五枚组"],
  ["硫酸纸书签","黑塞","荒野","高对比山林 · 赭红路径","bookmark-03-hesse-wilderness-ecom-v2.webp","35×128mm 半透明书签五枚组"],
  ["硫酸纸书签","佩索阿","星图","深蓝星图 · 细金线","bookmark-04-pessoa-star-map-ecom-v2.webp","35×128mm 半透明书签五枚组"],
  ["帆布包","鲁迅","野草","木刻野草 · 朱红小星","tote-01-luxun-weeds-ecom-v2.webp","米白厚帆布长柄托特 · 大前贴袋"],
  ["帆布包","李清照","归舟","荷叶水波 · 一叶小舟","tote-02-liqingzhao-returning-boat-ecom-v2.webp","米白厚帆布长柄托特 · 大前贴袋"],
  ["帆布包","泰戈尔","飞鸟","深蓝群鸟 · 金色日轮","tote-03-tagore-birds-ecom-v2.webp","米白厚帆布长柄托特 · 大前贴袋"],
  ["帆布包","波伏瓦","越界","开放门框 · 越界细线","tote-04-beauvoir-crossing-ecom-v2.webp","米白厚帆布长柄托特 · 大前贴袋"],
  ["亚克力PP夹","卡尔维诺","透明城市","楼梯拱门 · 透明城廓","ppclip-01-calvino-invisible-city-ecom-v2.webp","4–5cm 亚克力弹簧PP夹五枚组"],
  ["亚克力PP夹","莎士比亚","暴风雨","海浪风帆 · 云与星","ppclip-02-shakespeare-tempest-ecom-v2.webp","4–5cm 亚克力弹簧PP夹五枚组"],
  ["亚克力PP夹","艾米莉·狄金森","密封的光","信封封蜡 · 金色光线","ppclip-03-dickinson-sealed-light-ecom-v2.webp","4–5cm 亚克力弹簧PP夹五枚组"],
  ["亚克力PP夹","杜甫","纸上山河","水墨山河 · 朱红日轮","ppclip-04-dufu-paper-landscape-ecom-v2.webp","4–5cm 亚克力弹簧PP夹五枚组"],
  ["贴纸","文学器物","阅读图标","书、钢笔、月亮与纸船","sticker-01-literary-icons-ecom-v1.webp","A6 哑面不干胶贴纸 · 约12枚套装"],
  ["贴纸","中国诗笺","山水与新茶","舟、雨、远山与朱印","sticker-02-chinese-poetry-ecom-v1.webp","A6 哑面不干胶贴纸 · 约12枚套装"],
  ["贴纸","现代主义","城市断片","门、楼梯、黑太阳与红线","sticker-03-modernist-grid-ecom-v1.webp","A6 哑面不干胶贴纸 · 约12枚套装"],
  ["贴纸","阅读日常","一页一日","书、眼镜、灯与夜窗","sticker-04-reading-life-ecom-v1.webp","A6 哑面不干胶贴纸 · 约12枚套装"],
  ["贴纸","作者印章","文学身份","侧影、书脊、印章与星","sticker-05-author-seal-ecom-v1.webp","A6 哑面不干胶贴纸 · 约12枚套装"],
  ["作家系列书签","中国古典","山水与新茶","苏轼、李清照、陶渊明、王维 · 16枚系列","bookmark-series-01-chinese-poetry-ecom-v1.webp","35×128mm 纹理纸书签 · 16枚/组"],
  ["作家系列书签","现代主义","城市、门与自由","卡夫卡、加缪、萨特、黑塞 · 16枚系列","bookmark-series-02-modernist-ecom-v1.webp","35×128mm 纹理纸书签 · 16枚/组"],
  ["作家系列书签","诗人与书信","星图、玫瑰与书信","里尔克、博尔赫斯、佩索阿、泰戈尔 · 16枚系列","bookmark-series-03-poets-letters-ecom-v1.webp","35×128mm 纹理纸书签 · 16枚/组"],
  ["作家系列书签","世界文学","远方与海","托尔斯泰、陀思妥耶夫斯基、海明威、伍尔夫 · 16枚系列","bookmark-series-04-world-literature-ecom-v1.webp","35×128mm 纹理纸书签 · 16枚/组"],
];

const designs:Design[] = raw.map((item,index)=>({
  id:`design-${index+1}`, product:item[0], number:String(index+1).padStart(2,"0"), author:item[1], theme:item[2],
  direction:item[3], image:`${basePath}/designs/${item[4]}`, source:item[5], link:productLinks[item[0]],
}));
const filters:("全部"|Product)[]=["全部","马克杯","亚克力台历","硫酸纸书签","帆布包","亚克力PP夹","贴纸","作家系列书签"];
const decisionOptions:Decision[]=["首选","备选","淘汰","未决定"];

function DecisionMark({decision}:{decision:Decision}) { return <span className={`decision-mark decision-${decision}`}>{decision}</span>; }

export default function Home(){
  const [product,setProduct]=useState<(typeof filters)[number]>("全部");
  const [decisions,setDecisions]=useState<Record<string,Decision>>({});
  const [focus,setFocus]=useState<Design|null>(null);
  const [copied,setCopied]=useState(false);
  useEffect(()=>{ const saved=localStorage.getItem("literary-design-decisions-v2"); if(saved) try{setDecisions(JSON.parse(saved));}catch{localStorage.removeItem("literary-design-decisions-v2");}},[]);
  useEffect(()=>{localStorage.setItem("literary-design-decisions-v2",JSON.stringify(decisions));},[decisions]);
  useEffect(()=>{const close=(e:KeyboardEvent)=>e.key==="Escape"&&setFocus(null);addEventListener("keydown",close);return()=>removeEventListener("keydown",close);},[]);
  const visible=useMemo(()=>designs.filter(x=>product==="全部"||x.product===product),[product]);
  const totals=useMemo(()=>decisionOptions.reduce((a,o)=>({...a,[o]:designs.filter(x=>(decisions[x.id]||"未决定")===o).length}),{} as Record<Decision,number>),[decisions]);
  const copySummary=async()=>{const text=decisionOptions.map(o=>`${o}（${totals[o]}）\n${designs.filter(x=>(decisions[x.id]||"未决定")===o).map(x=>`- ${x.product}｜${x.author}·${x.theme}`).join("\n")}`).join("\n\n");await navigator.clipboard.writeText(`文学文创设计决策\n\n${text}`);setCopied(true);setTimeout(()=>setCopied(false),1600);};
  return <main>
    <header className="masthead"><a className="brand" href="#top"><span className="brand-seal">文</span><span>文学器物决策室</span></a><div className="header-actions"><div className="issue">E-COMMERCE MAIN IMAGE · V2</div><a className="archive-link" href={`${basePath}/archive/`}>迭代档案 · 24 张旧稿 →</a></div></header>
    <section className="hero" id="top"><div className="hero-kicker">七种日常器物 · 二十九种文学方向</div><h1>一眼看懂商品，<br/><em>再决定文学气质</em></h1><p>新版按商家主图的商品占比与展示结构重做，并以买家实拍校准材质、透光、印刷和使用状态。新增贴纸与作家系列书签：图片负责整组商品判断，书签的准确文字与打印逻辑另附文档。</p><div className="hero-meta"><span>07 品类</span><span>29 主图</span><span>01 决策清单</span></div></section>
    <section className="decision-dock"><div className="dock-copy"><span className="eyebrow">你的决策</span><strong>{designs.length-totals["未决定"]} / {designs.length} 已判断</strong></div><div className="totals"><span><b>{totals["首选"]}</b> 首选</span><span><b>{totals["备选"]}</b> 备选</span><span><b>{totals["淘汰"]}</b> 淘汰</span><span><b>{totals["未决定"]}</b> 未决定</span></div><button className="copy-button" onClick={copySummary}>{copied?"已复制":"复制决策清单"}</button></section>
    <nav className="filters" aria-label="按产品筛选">{filters.map(x=><button className={product===x?"active":""} key={x} onClick={()=>setProduct(x)}>{x}</button>)}</nav>
    <section className="gallery">{visible.map(item=>{const decision=decisions[item.id]||"未决定";return <article className="design-card" key={item.id}>
      <button className="image-button" onClick={()=>setFocus(item)} aria-label={`放大查看${item.author}·${item.theme}`}><img src={item.image} alt={`${item.product}：${item.author}·${item.theme}`}/><span className="zoom-hint">点击查看大图</span></button>
      <div className="card-body"><div className="card-topline"><span>{item.number} / {designs.length}</span><DecisionMark decision={decision}/></div><div className="product-label">{item.product}</div><h2>{item.author}<small>《{item.theme}》</small></h2><blockquote>{item.direction}</blockquote><dl><div><dt>商品结构</dt><dd>{item.source}</dd></div><div><dt>商品链接</dt><dd>{item.link?<a href={item.link} target="_blank" rel="noreferrer">打开淘宝商品 ↗</a>:"待确认代发链接"}</dd></div>{item.product==="作家系列书签"&&<div><dt>内容文档</dt><dd><a href={bookmarkCopyDocument} target="_blank" rel="noreferrer">下载书签文案与打印说明 ↗</a></dd></div>}</dl><div className="decision-buttons">{(["首选","备选","淘汰"] as Decision[]).map(o=><button className={decision===o?`selected selected-${o}`:""} key={o} onClick={()=>setDecisions(d=>({...d,[item.id]:decision===o?"未决定":o}))}>{o}</button>)}</div></div>
    </article>})}</section>
    <section className="review-notes"><span className="section-index">本轮判断标准 / 03</span><h2>先核商品，再选风格。</h2><div className="notes-grid"><p><b>01</b> 台历已统一为当前链接的 14×14cm 透明折弯亚克力双环款，不再使用木底座。</p><p><b>02</b> PP 商品按链接实物标注为小型亚克力弹簧夹，不再写成文件夹；帆布包采用明确“一个起订”的可用链接。</p><p><b>03</b> 当前选择只保存在本设备，可随时反选；复制清单后即可进入打样与印刷校色。</p></div></section>
    <footer><span>文学器物决策室</span><span>基于真实商品结构的电商主图概念稿 · 2026/08</span></footer>
    {focus&&<div className="lightbox" role="dialog" aria-modal="true"><button className="lightbox-backdrop" onClick={()=>setFocus(null)} aria-label="关闭大图"/><div className="lightbox-panel"><button className="lightbox-close" onClick={()=>setFocus(null)}>关闭 ×</button><img src={focus.image} alt={`${focus.author}·${focus.theme}`}/><div><span>{focus.product}</span><strong>{focus.author}《{focus.theme}》</strong><a href={focus.link} target="_blank" rel="noreferrer">查看对应淘宝商品 ↗</a></div></div></div>}
  </main>;
}
