import type { Metadata } from "next";
import "./globals.css";

const title="文学文创电商主图决策室";
const description="马克杯、亚克力台历、硫酸纸书签、帆布包、亚克力PP夹、贴纸与作家系列书签的29款统一电商主图评审。";
const basePath=process.env.NEXT_PUBLIC_BASE_PATH||"";
const githubOwner=process.env.GITHUB_REPOSITORY?.split("/")[0]||"verdeviento2026-prog";
const origin=`https://${githubOwner}.github.io${basePath}`;
export const metadata:Metadata={metadataBase:new URL(origin),title,description,icons:{icon:`${basePath}/favicon.svg`},openGraph:{title,description,type:"website",url:`${origin}/`,images:[{url:`${origin}/og.webp`,width:1736,height:907,alt:title}]},twitter:{card:"summary_large_image",title,description,images:[`${origin}/og.webp`]}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="zh-CN"><body>{children}</body></html>;}
