import{c as u,u as x,r as l,j as r}from"./index-Bkclfx5a.js";const f=[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]],m=u("arrow-left",f);function y({src:g,title:t,bgColor:n="#050505",allowScroll:a=!1,buttonPosition:s="default",buttonTheme:b="default"}){x();const[d,c]=l.useState(!0);l.useEffect(()=>{const e=document.title;return t&&(document.title=t),window.scrollTo(0,0),a||(document.body.style.overflow="hidden"),()=>{document.title=e,document.body.style.overflow=""}},[t,a]);const p=()=>{window.location.href="/#techfest-events"},h=()=>{c(!1)},i={default:{bg:"rgba(0, 0, 0, 0.6)",border:"rgba(139, 92, 246, 0.5)",hoverBg:"rgba(139, 92, 246, 0.2)",hoverBorder:"rgba(139, 92, 246, 0.8)",shadow:"rgba(139, 92, 246, 0.3)"},golden:{bg:"rgba(0, 0, 0, 0.6)",border:"rgba(212, 175, 55, 0.5)",hoverBg:"rgba(212, 175, 55, 0.2)",hoverBorder:"rgba(212, 175, 55, 0.8)",shadow:"rgba(212, 175, 55, 0.3)"},red:{bg:"rgba(0, 0, 0, 0.6)",border:"rgba(229, 9, 20, 0.5)",hoverBg:"rgba(229, 9, 20, 0.2)",hoverBorder:"rgba(229, 9, 20, 0.8)",shadow:"rgba(229, 9, 20, 0.3)"},redish:{bg:"rgba(0, 0, 0, 0.6)",border:"rgba(220, 38, 127, 0.5)",hoverBg:"rgba(220, 38, 127, 0.2)",hoverBorder:"rgba(220, 38, 127, 0.8)",shadow:"rgba(220, 38, 127, 0.3)"},beige:{bg:"rgba(0, 0, 0, 0.6)",border:"rgba(194, 154, 108, 0.5)",hoverBg:"rgba(194, 154, 108, 0.2)",hoverBorder:"rgba(194, 154, 108, 0.8)",shadow:"rgba(194, 154, 108, 0.3)"},blue:{bg:"rgba(0, 0, 0, 0.6)",border:"rgba(59, 130, 246, 0.5)",hoverBg:"rgba(59, 130, 246, 0.2)",hoverBorder:"rgba(59, 130, 246, 0.8)",shadow:"rgba(59, 130, 246, 0.3)"}},o=i[b]||i.default;return r.jsxs("div",{style:{position:"fixed",inset:0,backgroundColor:n,zIndex:9999,overflow:"hidden"},children:[r.jsx("style",{dangerouslySetInnerHTML:{__html:`
                    .event-wrapper::-webkit-scrollbar {
                        display: none;
                    }
                    
                    @keyframes skeleton-pulse {
                        0%, 100% {
                            opacity: 0.6;
                        }
                        50% {
                            opacity: 1;
                        }
                    }
                    
                    .skeleton-loader {
                        position: absolute;
                        inset: 0;
                        background: linear-gradient(90deg, rgba(139, 92, 246, 0.1) 0%, rgba(139, 92, 246, 0.2) 50%, rgba(139, 92, 246, 0.1) 100%);
                        background-size: 200% 100%;
                        animation: skeleton-pulse 2s infinite;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        gap: 20px;
                        z-index: 10001;
                    }
                    
                    .skeleton-item {
                        background: rgba(139, 92, 246, 0.2);
                        border: 1px solid rgba(139, 92, 246, 0.3);
                        border-radius: 4px;
                        animation: skeleton-pulse 2s infinite;
                    }
                    
                    .skeleton-header {
                        width: 300px;
                        height: 40px;
                    }
                    
                    .skeleton-content {
                        width: 80%;
                        height: 400px;
                    }
                `}}),d&&r.jsxs("div",{className:"skeleton-loader",children:[r.jsx("div",{className:"skeleton-item skeleton-header"}),r.jsx("div",{className:"skeleton-item skeleton-content"})]}),r.jsxs("button",{onClick:p,style:{position:"absolute",top:s==="lower"?"100px":s==="original"?"20px":"60px",left:"20px",zIndex:1e4,padding:"10px 20px",paddingLeft:"15px",backgroundColor:o.bg,border:`1px solid ${o.border}`,borderRadius:"4px",color:"#fff",cursor:"pointer",display:"flex",alignItems:"center",gap:"8px",backdropFilter:"blur(5px)",fontFamily:"var(--font-heading, sans-serif)",textTransform:"uppercase",letterSpacing:"0.1em",fontSize:"0.8rem",transition:"all 0.3s ease"},onMouseEnter:e=>{e.currentTarget.style.backgroundColor=o.hoverBg,e.currentTarget.style.borderColor=o.hoverBorder,e.currentTarget.style.boxShadow=`0 0 15px ${o.shadow}`},onMouseLeave:e=>{e.currentTarget.style.backgroundColor=o.bg,e.currentTarget.style.borderColor=o.border,e.currentTarget.style.boxShadow="none"},children:[r.jsx(m,{size:16}),r.jsx("span",{children:"Back to Events"})]}),r.jsx("iframe",{src:g,className:"event-wrapper",onLoad:h,style:{width:"100%",height:"100%",border:"none",backgroundColor:n,overflow:a?"auto":"hidden",scrollbarWidth:"none",msOverflowStyle:"none",opacity:d?0:1,transition:"opacity 0.3s ease"},scrolling:a?"yes":"no",seamless:"seamless",title:t||"Event"})]})}export{y as E};
