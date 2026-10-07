import React, { useEffect, useRef, useState } from 'react';
import './alche-clone.css';

// The footer imports the same custom element, markup, and timings.
export function AlcheMirror() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    document.title = 'ESHIP';
    const finish = () => setLoading(false);
    document.addEventListener('enti-intro-complete', finish);
    return () => document.removeEventListener('enti-intro-complete', finish);
  }, []);
  return <div className="alche-mirror-shell">
    <iframe className="alche-mirror-frame" src="/alche-mirror/index.html" title="ESHIP immersive runtime" />
    {loading && React.createElement('enti-intro', { mode: 'opening', speed: '1.5' })}
  </div>;
}

type Work = { date: string; title: string; kind: string; tag: string; accent: string };
const works: Work[] = [
  { date: '2026.01.17', title: 'KizunaAI “Hello, Fortnite”', kind: 'In-Game-Concert', tag: 'FORTNITE / METAVERSE', accent: '#ff5b38' },
  { date: '2025.05.16', title: 'WEAR GO LAND', kind: 'Fashion metaverse', tag: 'STELLla / MOBILE', accent: '#d5ff3f' },
  { date: '2025.02.20', title: 'DISCOAT 2025SS EXHIBITION in virtual', kind: 'Virtual fashion show', tag: 'CLOUD RENDERING', accent: '#9c8cff' },
  { date: '2024.10.18', title: 'Matsuken SambaⅡ Rise Up the World', kind: 'Immersive concert', tag: 'FORTNITE / MUSIC', accent: '#55dbd0' },
  { date: '2024.07.29', title: 'run for money CREATED IN FORTNITE', kind: 'Participatory world', tag: 'FORTNITE', accent: '#ffdc64' },
  { date: '2021.07.16', title: 'SHIN SEKAI “nowhere” RADWIMPS', kind: 'Role playing music', tag: 'METAVERSE / MOBILE', accent: '#f58ab7' },
];

function WorldCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointer = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let raf = 0;
    let t = 0;
    const stars = Array.from({ length: 180 }, (_, i) => ({ a: i * 2.399, r: .1 + (i % 19) / 19 * .9, z: (i % 13) / 13 }));
    const resize = () => { const dpr = Math.min(2, window.devicePixelRatio || 1); canvas.width = innerWidth * dpr; canvas.height = innerHeight * dpr; canvas.style.width = `${innerWidth}px`; canvas.style.height = `${innerHeight}px`; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); };
    const render = () => {
      t += .007; const w = innerWidth; const h = innerHeight; const cx = w / 2 + pointer.current.x * 30; const cy = h / 2 + pointer.current.y * 20; ctx.clearRect(0, 0, w, h);
      const gradient = ctx.createRadialGradient(cx, cy, 10, cx, cy, Math.max(w, h) * .72); gradient.addColorStop(0, '#111427'); gradient.addColorStop(.48, '#04050b'); gradient.addColorStop(1, '#000'); ctx.fillStyle = gradient; ctx.fillRect(0, 0, w, h);
      ctx.save(); ctx.translate(cx, cy);
      stars.forEach((star, i) => { const angle = star.a + t * (.2 + star.z); const radius = Math.max(w, h) * (.15 + star.r * .68); const x = Math.cos(angle) * radius; const y = Math.sin(angle) * radius * .48; const depth = .4 + .6 * Math.sin(angle * 1.3 + t); const size = 1 + depth * 2; ctx.globalAlpha = .15 + depth * .45; ctx.fillStyle = i % 11 === 0 ? '#d5ff3f' : '#fff'; ctx.beginPath(); ctx.arc(x, y, size, 0, Math.PI * 2); ctx.fill(); });
      const rotation = t * .6 + pointer.current.x * .7; const rings = [105, 180, 265]; rings.forEach((radius, ri) => { ctx.lineWidth = ri === 1 ? 1.8 : 1; ctx.strokeStyle = ri === 1 ? '#d5ff3f' : `rgba(104,173,255,${.24 - ri * .04})`; ctx.beginPath(); for (let i = 0; i <= 80; i++) { const a = i / 80 * Math.PI * 2; const x = Math.cos(a + rotation * (ri % 2 ? 1 : -1)) * radius; const y = Math.sin(a + rotation * (ri % 2 ? 1 : -1)) * radius * (.24 + ri * .04); const zz = Math.sin(a + rotation) * 16; i ? ctx.lineTo(x, y + zz) : ctx.moveTo(x, y + zz); } ctx.stroke(); });
      for (let i = 0; i < 14; i++) { const a = i / 14 * Math.PI * 2 + rotation; const x = Math.cos(a) * 260; const y = Math.sin(a) * 72; ctx.strokeStyle = i % 3 === 0 ? '#ff5b38' : 'rgba(180,205,255,.28)'; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(x, y); ctx.stroke(); }
      ctx.restore(); raf = requestAnimationFrame(render);
    };
    const move = (e: MouseEvent) => { pointer.current = { x: (e.clientX / innerWidth - .5), y: (e.clientY / innerHeight - .5) }; };
    addEventListener('resize', resize); addEventListener('mousemove', move); resize(); render(); return () => { cancelAnimationFrame(raf); removeEventListener('resize', resize); removeEventListener('mousemove', move); };
  }, []);
  return <canvas ref={canvasRef} className="alche-world" aria-label="A rotating abstract 3D constellation" />;
}

export function AlcheClone() {
  const [sound, setSound] = useState(false);
  const [menu, setMenu] = useState(false);
  const [cursor, setCursor] = useState({ x: -100, y: -100 });
  useEffect(() => { document.title = 'ESHIP — Architect worlds that move hearts'; return () => { document.title = 'E-SHIP Design Review | Versions V1–V5'; }; }, []);
  useEffect(() => { const move = (e: MouseEvent) => setCursor({ x: e.clientX, y: e.clientY }); addEventListener('mousemove', move); return () => removeEventListener('mousemove', move); }, []);
  return <div className="alche-page">
    <WorldCanvas /><div className="alche-noise" /><div className="alche-cursor" style={{ transform: `translate3d(${cursor.x}px,${cursor.y}px,0)` }} />
    <header className="alche-header"><a className="alche-logo" href="#top"><img src="/common/eship-logo.svg" alt="ESHIP" /><span>INC.</span></a><button className="alche-menu-button" onClick={() => setMenu(!menu)} aria-expanded={menu}><span>{menu ? 'CLOSE' : 'MENU'}</span><i /><i /><i /></button></header>
    <nav className={`alche-nav ${menu ? 'is-open' : ''}`}><a href="#top" onClick={() => setMenu(false)}>TOP</a><a href="#works" onClick={() => setMenu(false)}>WORKS</a><a href="#about" onClick={() => setMenu(false)}>ABOUT</a><a href="#vision" onClick={() => setMenu(false)}>VISION</a><a href="#service" onClick={() => setMenu(false)}>SERVICE</a><a href="#contact" onClick={() => setMenu(false)}>CONTACT / RECRUIT</a></nav>
    <main id="top">
      <section className="alche-hero"><div className="hero-vertical">ESHIP / 2026</div><div className="hero-center"><div className="hero-kicker">CREATIVE STUDIO FOR DIGITAL NATIVES</div><h1>Architect worlds<br /><em>that move hearts</em><br />and spark hope.</h1><p>これまでにない<br />没入型・体験型のエンターテインメントを生み出す</p></div><div className="hero-bottom"><span>SCROLL TO EXPLORE</span><span className="scroll-line" /></div></section>
      <section className="alche-news"><div className="eyebrow">NEWS <span>ニュース</span></div><div className="news-list"><a href="#works"><time>2025.06.26</time><span>Unreal Fest Bali 2025で登壇しました</span><b>↗</b></a><a href="#works"><time>2025.05.16</time><span>次世代ファッションメタバースアプリ WEAR GO LAND</span><b>↗</b></a><a href="#contact"><time>2024.10.29</time><span>クリエイティブチーム ReIMAGINE を結成</span><b>↗</b></a></div></section>
      <section id="works" className="alche-works"><div className="section-head"><div><div className="eyebrow">WORKS <span>実績</span></div><h2>Worlds made<br /><em>to be entered.</em></h2></div><p>ブランドやIP、アーティストの世界観を、参加できるデジタル空間へ。</p></div><div className="works-grid">{works.map((work, i) => <article className="work-card" key={work.title} style={{ '--accent': work.accent } as React.CSSProperties}><div className="work-art"><div className="work-grid-lines" /><div className="work-orb" /><span>0{i + 1}</span><small>{work.tag}</small></div><div className="work-meta"><time>{work.date}</time><h3>{work.title}</h3><p>{work.kind}</p><b>VIEW CASE STUDY ↗</b></div></article>)}</div><button className="outline-button">MORE WORKS <span>＋</span></button></section>
      <section id="about" className="alche-about"><div className="eyebrow">ABOUT <span>私たちについて</span></div><div className="about-layout"><div className="about-jp">心を揺さぶり、希望を持てる<br /><em>“世界”</em>を作る</div><div className="about-copy"><h2>We build<br /><em>places to feel.</em></h2><p>ESHIPは、デジタルネイティブ時代にこれまでにないエンターテインメント体験を生み出すクリエイティブスタジオです。ゲーム、音楽、ファッション、都市。境界を越えて、人が集まり、動き出す世界を設計します。</p><p>We imagine and architect worlds where people can meet, play, and feel something new.</p></div></div></section>
      <section id="vision" className="alche-vision"><div className="vision-stamp">VISION<br /><span>∞</span></div><div><div className="eyebrow">OUR VISION</div><h2>Pioneering immersive<br /><em>entertainment like no other.</em></h2><p>没入する。参加する。記憶に残る。<br />体験の未来を、テクノロジーと想像力で更新する。</p></div></section>
      <section id="service" className="alche-service"><div className="section-head"><div className="eyebrow">SERVICE <span>事業内容</span></div><p>ゲームエンジンの可能性を、エンターテインメントの新しい領域へ。</p></div><div className="service-cards"><article><div className="service-number">01</div><img src="/alche/fortnite.png" alt="Fortnite creative worlds" /><h3>Fortnite<br />Creative Works</h3><p>Planning and producing entertaining, scalable experiences for brands, IP, and artists.</p><a href="#contact">EXPLORE SERVICE ↗</a></article><article><div className="service-number">02</div><img src="/alche/ue2.png" alt="Unreal Engine works" /><h3>Unreal Engine<br />Works</h3><p>From cloud rendering to iOS, Android, and PC, we create immersive worlds for every device.</p><a href="#contact">EXPLORE SERVICE ↗</a></article><article><div className="service-number">03</div><img src="/alche/stellla.png" alt="Stellla metaverse platform" /><h3>stellla<br />platform</h3><p>A metaverse foundation for live events, fashion shows, and industrial digital spaces.</p><a href="#contact">EXPLORE SERVICE ↗</a></article></div></section>
      <section className="alche-stellla"><div className="stellla-copy"><div className="eyebrow">stellla <span>メタバース構築基盤</span></div><h2>One world.<br /><em>Many ways in.</em></h2><p>ライブイベント、ファッションショー、工場や都市計画まで。多人数接続、アバター、EC、3Dオーディオをひとつの世界に。</p><a href="#contact" className="text-button">VISIT STELLLA ↗</a></div><div className="stellla-mesh"><div className="mesh-sphere" /><span>LIVE / FASHION / CITY / INDUSTRY</span></div></section>
      <section id="contact" className="alche-contact"><div className="eyebrow">CONTACT / RECRUIT</div><h2>Let’s make a world<br /><em>worth entering.</em></h2><a href="mailto:hello@alche.studio" className="contact-link">Contact ESHIP <span>↗</span></a><div className="contact-bottom"><span>© 2026 ESHIP</span><div><a href="#top">TOP</a><a href="#works">WORKS</a><a href="#about">ABOUT</a><a href="#service">SERVICE</a></div><span>SOUND {sound ? 'ON' : 'OFF'} <button onClick={() => setSound(!sound)} aria-label="Toggle sound">◉</button></span></div></section>
    </main><div className={`sound-gate ${sound ? 'hidden' : ''}`}><div className="sound-mark">♪</div><p>このサイトにはサウンドが含まれます。<br />有効にしますか?</p><div><button onClick={() => setSound(true)}>サウンドをオンにする</button><button onClick={() => setSound(true)}>サウンドなしで進む</button></div></div>
  </div>;
}

