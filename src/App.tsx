import { useState } from "react";
import LightPillar from "./components/LightPillar";
import BlurText from "./components/BlurText";
import ShinyText from "./components/ShinyText";
import GradientText from "./components/GradientText";
import CountUp from "./components/CountUp";
import RotatingText from "./components/RotatingText";
import Magnet from "./components/Magnet";
import FadeIn from "./components/FadeIn";
import CustomCursor from "./components/CustomCursor";
import LogoLoop from "./components/LogoLoop";
import ProfileCard from "./components/ProfileCard";
import ScrambleText from "./components/ScrambleText";

const techLogos = [
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg", alt: "Kotlin" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", alt: "React" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", alt: "Next.js" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", alt: "TypeScript" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", alt: "Node.js" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg", alt: "Tailwind" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg", alt: "PostgreSQL" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", alt: "MongoDB" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg", alt: "Firebase" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", alt: "Git" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg", alt: "GitHub" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg", alt: "Vite" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg", alt: "Android" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", alt: "JavaScript" },
];

const projects = [
  {
    title: "DEAL Thailand",
    subtitle: "Agricultural Marketplace App",
    badge: "Production App",
    image: import.meta.env.BASE_URL + "deal-logo.png",
    desc: "แอป Android สำหรับตลาดยางพาราและสินค้าเกษตรไทย พร้อมระบบประมูล Real-time, ร้านค้าออนไลน์ และชำระเงินผ่าน Google Play",
    role: "Android Developer (Freelance)",
    features: [
      "แก้ไขระบบ In-App Purchase (5 แพ็กเกจ) ให้ทำงานกับ Google Play Store",
      "Debug ปัญหา SKU mismatch ระหว่าง App กับ Play Console",
      "ทดสอบ Backend API ทั้งระบบ (15+ endpoints)",
      "แก้ไข PKCS#8 Key Configuration บน Render",
    ],
    tags: ["Kotlin", "Jetpack Compose", "Play Billing", "Socket.IO", "Firebase"],
    status: "เผยแพร่บน Google Play Store",
    featured: true,
  },
  {
    title: "DonateDev",
    subtitle: "Donation Platform",
    badge: "Research Project",
    image: import.meta.env.BASE_URL + "donatedev-logo.png",
    desc: "เว็บแอประบบบริจาครองรับ 2 โหมด: บริจาคตามโปรเจกต์ และบริจาคให้สตรีมเมอร์ พร้อมแจ้งเตือนแบบ Real-time",
    role: "Full-Stack Developer (งานวิจัย)",
    features: [
      "ระบบ OTP Authentication",
      "การชำระเงินผ่าน Omise + Webhook",
      "Real-time Donation Alerts ผ่าน WebSocket",
      "Admin Dashboard พร้อม Analytics",
    ],
    tags: ["Next.js 16", "React 19", "TypeScript", "MongoDB", "Socket.IO", "Omise"],
    featured: true,
  },
  {
    title: "FullstackFarm",
    subtitle: "Smart Farm IoT System",
    desc: "ระบบฟาร์มอัจฉริยะ IoT พร้อม Web Dashboard สำหรับติดตามข้อมูล sensor แบบ Real-time",
    tags: ["HTML", "CSS", "JavaScript", "IoT"],
    link: "https://github.com/devpanitan/FullstackFarm",
  },
  {
    title: "Farm IoT A14",
    subtitle: "IoT Agriculture Project",
    desc: "ระบบ IoT สำหรับการเกษตร ติดตามข้อมูลสภาพแวดล้อมในฟาร์ม",
    tags: ["IoT", "Sensors", "Dashboard"],
    link: "https://github.com/devpanitan/Farm-iot-a14",
  },
];

const skills = [
  { cat: "Mobile", icon: "📱", items: ["Kotlin", "Jetpack Compose", "Android SDK", "Google Play Billing", "Firebase FCM", "Retrofit", "Socket.IO"] },
  { cat: "Frontend", icon: "🎨", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "HTML / CSS", "JavaScript"] },
  { cat: "Backend", icon: "⚙️", items: ["Node.js", "Express.js", "PostgreSQL", "MongoDB", "REST API", "WebSocket", "JWT Auth"] },
  { cat: "Tools & Cloud", icon: "☁️", items: ["Git / GitHub", "Firebase", "AWS S3", "Render", "Google Play Console", "Omise Payment"] },
];

const timeline = [
  { year: "2026", title: "Android Developer (Freelance)", company: "DEAL Thailand App", items: ["แก้ไขระบบ Google Play Billing ให้ชำระเงินและปลดล็อกฟีเจอร์ได้", "ทดสอบ Backend API ทั้งระบบ บน Render", "Deploy แอปบน Google Play Store"] },
  { year: "2025 - 2026", title: "Full-Stack Developer (Research)", company: "DonateDev — งานวิจัย", items: ["พัฒนาระบบบริจาค Full-Stack ด้วย Next.js + MongoDB", "ระบบ Payment Gateway (Omise) + Real-time alerts"] },
  { year: "2023 - ปัจจุบัน", title: "Computer Science Student", company: "มหาวิทยาลัยราชภัฏสุรินทร์ (SRRU)", items: ["สาขาวิทยาการคอมพิวเตอร์", "โปรเจกต์ Smart Farm IoT"] },
];

const stats = [
  { value: 4, suffix: "+", label: "โปรเจกต์" },
  { value: 15, suffix: "+", label: "APIs ทดสอบ" },
  { value: 5, suffix: "", label: "แพ็กเกจ IAP" },
  { value: 10, suffix: "+", label: "เทคโนโลยี" },
];

function TerminalCard() {
  const lines = [
    { cmd: "whoami", out: "patipan-rueangyong" },
    { cmd: "cat role.txt", out: "Mobile & Full-Stack Developer" },
    { cmd: "cat education.txt", out: "Computer Science @ SRRU" },
    { cmd: "ls skills/", out: "kotlin/  compose/  react/  nextjs/  nodejs/  postgresql/  mongodb/" },
    { cmd: "cat status.txt", out: "✓ Open to work" },
  ];

  return (
    <div className="rounded-2xl overflow-hidden shadow-2xl border border-[#29ffb8]/20 bg-[#0a0a1a]/90 backdrop-blur">
      {/* Terminal header */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-[#111]/80 border-b border-[#29ffb8]/10">
        <span className="w-3 h-3 rounded-full bg-red-500/80" />
        <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
        <span className="w-3 h-3 rounded-full bg-green-500/80" />
        <span className="ml-auto text-xs font-mono text-[#29ffb8]/50">patipan@dev ~</span>
      </div>
      {/* Terminal body */}
      <div className="p-5 font-mono text-sm leading-7">
        {lines.map((l, i) => (
          <div key={i}>
            <span className="text-[#29ffb8]">$ </span>
            <span className="text-gray-400">{l.cmd}</span>
            <div className="text-white/90 pl-4">{l.out}</div>
          </div>
        ))}
        <div className="mt-1">
          <span className="text-[#29ffb8]">$ </span>
          <span className="inline-block w-2 h-4 bg-[#29ffb8] animate-pulse" />
        </div>
      </div>
    </div>
  );
}

function SectionTitle({ text }: { text: string }) {
  return (
    <div className="text-center mb-14">
      <BlurText text={text} className="text-3xl font-bold justify-center" delay={100} />
      <div className="w-16 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded mx-auto mt-3" />
    </div>
  );
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const links = ["about", "skills", "projects", "experience", "blog", "contact"];
  const labels: Record<string, string> = { about: "เกี่ยวกับ", skills: "ทักษะ", projects: "ผลงาน", experience: "ประสบการณ์", blog: "บทความ", contact: "ติดต่อ" };

  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-white/85 backdrop-blur-md border-b border-transparent transition-all">
      <div className="max-w-[1100px] mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="text-xl font-bold text-gray-900">
          <GradientText colors={['#6366f1', '#a855f7', '#ec4899', '#6366f1']} speed={4}>Patipan.dev</GradientText>
        </a>
        <div className={`${open ? "flex" : "hidden"} md:flex flex-col md:flex-row absolute md:static top-16 left-0 right-0 bg-white md:bg-transparent p-5 md:p-0 gap-5 md:gap-7 shadow-md md:shadow-none`}>
          {links.map(l => <a key={l} href={`#${l}`} onClick={() => setOpen(false)} className="text-sm font-medium text-gray-500 hover:text-indigo-500 transition">{labels[l]}</a>)}
        </div>
        <button onClick={() => setOpen(!open)} className="md:hidden text-2xl bg-transparent border-none cursor-pointer">&#9776;</button>
      </div>
    </nav>
  );
}

export default function App() {
  return (
    <div className="text-gray-900 bg-white">
      <CustomCursor />
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-screen flex items-center pt-16 overflow-hidden bg-[#050510]">
        <LightPillar topColor="#29ffb8" bottomColor="#6366f1" intensity={1.0} rotationSpeed={0.25} pillarWidth={2.5} pillarHeight={0.35} pillarRotation={15} />
        <div className="relative z-10 max-w-[1100px] drop-shadow-lg mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <ShinyText text="สวัสดีครับ, ผมชื่อ" className="text-base font-semibold" speed={3} />
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mt-2">
              <ScrambleText text="ปฏิภาณ เรืองยงค์" speed={40} scrambleChars="กขคจฉชซฎฏดตถทนบปพฟมยรลวศษสหอฮ" />
            </h1>
            <h2 className="text-lg text-gray-300 mt-1">
              <ScrambleText text="Patipan Rueangyong" speed={35} />
            </h2>
            <div className="mt-4 flex items-center gap-2">
              <span className="px-4 py-1.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-sm font-semibold">
                <RotatingText texts={["Mobile Developer", "Full-Stack Dev", "Problem Solver", "Open to Work"]} interval={2500} className="h-5" />
              </span>
            </div>
            <p className="mt-5 text-gray-300 leading-relaxed">นักศึกษาวิทยาการคอมพิวเตอร์ มหาวิทยาลัยราชภัฏสุรินทร์ อายุ 21 ปี<br />มีประสบการณ์พัฒนาแอปจริงที่เผยแพร่บน Google Play Store</p>
            <div className="mt-7 flex gap-3">
              <Magnet strength={12} padding={20}>
                <a href="#projects" className="px-7 py-3 rounded-xl bg-indigo-500 text-white font-semibold border-2 border-indigo-500 hover:bg-indigo-600 hover:scale-105 transition-all inline-block">ดูผลงาน</a>
              </Magnet>
              <Magnet strength={12} padding={20}>
                <a href="#contact" className="px-7 py-3 rounded-xl bg-white/10 backdrop-blur text-white font-semibold border-2 border-white/30 hover:bg-white/20 hover:scale-105 transition-all inline-block">ติดต่อผม</a>
              </Magnet>
            </div>
          </div>
          <div className="hidden md:block">
            <FadeIn direction="right" delay={0.5}>
              <TerminalCard />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Quote + Profile Card */}
      <section className="py-14 bg-[#050510] border-t border-[#29ffb8]/10">
        <div className="max-w-[1100px] mx-auto px-6 flex flex-col md:flex-row items-center gap-10 md:gap-16">
          <FadeIn direction="left" delay={0.2}>
            <ProfileCard />
          </FadeIn>
          <FadeIn direction="right" delay={0.3}>
            <div className="text-center md:text-left flex-1">
              <p className="text-2xl md:text-3xl font-mono italic text-[#29ffb8]/80 tracking-wide leading-relaxed">
                " <ScrambleText text="Code is the thread of life." speed={60} /> "
              </p>
              <p className="mt-4 text-gray-500 text-sm">— ปฏิภาณ เรืองยงค์</p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-12 bg-gradient-to-r from-[#0a0a1a] via-[#1a1040] to-[#0a0a1a]">
        <div className="max-w-[1100px] mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map(s => (
            <div key={s.label} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[#29ffb8]">
                <CountUp to={s.value} duration={2.5} suffix={s.suffix} />
              </div>
              <p className="text-sm mt-1 text-gray-400">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-20 px-6">
        <div className="max-w-[1100px] mx-auto">
          <SectionTitle text="เกี่ยวกับผม" />
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: "📱", title: "Mobile Developer", desc: "พัฒนาแอป Android ด้วย Kotlin + Jetpack Compose รวมถึงระบบ In-App Purchase, Push Notification และ Real-time Chat" },
              { icon: "🌐", title: "Full-Stack Web", desc: "สร้างเว็บแอปด้วย Next.js, React, Node.js, Express พร้อม Database ทั้ง PostgreSQL และ MongoDB" },
              { icon: "⚡", title: "Problem Solver", desc: "เคย Debug และแก้ไขระบบ Billing ของแอปที่เผยแพร่บน Play Store จนระบบชำระเงินทำงานได้สมบูรณ์" },
            ].map((c, i) => (
              <FadeIn key={c.title} delay={i * 0.15} direction="up">
                <Magnet strength={12} padding={20}>
                  <div className="bg-white rounded-2xl p-8 text-center border border-gray-200 hover:-translate-y-1 hover:shadow-xl hover:border-indigo-200 transition-all cursor-default">
                    <div className="text-4xl mb-4">{c.icon}</div>
                    <h3 className="text-lg font-bold mb-2">{c.title}</h3>
                    <p className="text-sm text-gray-500">{c.desc}</p>
                  </div>
                </Magnet>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="py-20 px-6 bg-gray-50">
        <div className="max-w-[1100px] mx-auto">
          <SectionTitle text="ทักษะ" />
          <div className="grid md:grid-cols-2 gap-6">
            {skills.map((s, i) => (
              <FadeIn key={s.cat} delay={i * 0.1} direction={i % 2 === 0 ? "left" : "right"}>
                <div className="bg-white rounded-2xl p-7 border border-gray-200 hover:shadow-lg hover:border-indigo-100 transition-all">
                  <h3 className="text-sm font-bold text-indigo-500 mb-3">{s.icon} {s.cat}</h3>
                  <div className="flex flex-wrap gap-2">
                    {s.items.map(item => (
                      <span key={item} className="bg-indigo-50 text-indigo-700 px-3.5 py-1.5 rounded-lg text-sm font-medium hover:bg-indigo-100 hover:scale-105 transition-all cursor-default">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Logo Loop */}
      <section className="py-10 border-y border-gray-100">
        <LogoLoop logos={techLogos} speed={80} logoHeight={36} gap={56} pauseOnHover fadeOut fadeOutColor="#ffffff" />
      </section>

      {/* Projects */}
      <section id="projects" className="py-20 px-6">
        <div className="max-w-[1100px] mx-auto">
          <SectionTitle text="ผลงาน" />
          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((p, i) => (
              <FadeIn key={p.title} delay={i * 0.12} direction="up">
                <div className={`bg-white rounded-2xl p-7 border transition-all hover:-translate-y-2 hover:shadow-xl ${p.featured ? "border-indigo-200" : "border-gray-200"} h-full`}>
                  <div className="flex items-start gap-4 mb-2">
                    {p.image && <img src={p.image} alt={p.title} className="w-12 h-12 rounded-xl object-contain flex-shrink-0" />}
                    <div>
                      {p.badge && (
                        <span className="inline-block mb-1 px-3 py-0.5 rounded-md bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs font-semibold">
                          {p.badge}
                        </span>
                      )}
                      <h3 className="text-xl font-bold">{p.title}</h3>
                    </div>
                  </div>
                  <p className="text-sm text-indigo-500 font-medium mb-3">{p.subtitle}</p>
                  <p className="text-sm text-gray-500 mb-4">{p.desc}</p>
                  {p.role && <p className="text-sm text-gray-600 mb-1"><strong>บทบาท:</strong> {p.role}</p>}
                  {p.features && (
                    <ul className="list-disc pl-5 text-sm text-gray-500 mb-4 space-y-1">
                      {p.features.map((f, j) => <li key={j}>{f}</li>)}
                    </ul>
                  )}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {p.tags.map(t => <span key={t} className="bg-gray-100 text-gray-600 px-2.5 py-1 rounded-md text-xs font-medium">{t}</span>)}
                  </div>
                  {p.status && <p className="text-sm text-green-600 font-medium flex items-center gap-2"><span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />{p.status}</p>}
                  {p.link && <a href={p.link} target="_blank" className="text-sm text-indigo-500 font-semibold hover:underline">GitHub Repository →</a>}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className="py-20 px-6 bg-gray-50">
        <div className="max-w-[700px] mx-auto">
          <SectionTitle text="ประสบการณ์" />
          {timeline.map((t, i) => (
            <FadeIn key={i} delay={i * 0.15} direction="left">
              <div className={`grid grid-cols-[120px_1fr] md:grid-cols-[140px_1fr] gap-6 pb-8 mb-8 ${i < timeline.length - 1 ? "border-b border-gray-200" : ""}`}>
                <GradientText className="text-sm font-bold pt-1" colors={['#6366f1', '#a855f7', '#6366f1']} speed={3}>{t.year}</GradientText>
                <div>
                  <h3 className="text-lg font-bold">{t.title}</h3>
                  <p className="text-sm text-gray-500 mb-2">{t.company}</p>
                  <ul className="list-disc pl-5 text-sm text-gray-500 space-y-1">
                    {t.items.map((item, j) => <li key={j}>{item}</li>)}
                  </ul>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Blog */}
      <section id="blog" className="py-20 px-6">
        <div className="max-w-[1100px] mx-auto">
          <SectionTitle text="บทความ" />
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "แก้ปัญหา Google Play Billing ไม่ปลดล็อกฟีเจอร์",
                desc: "เรื่องราวการ Debug SKU mismatch ระหว่าง Android App กับ Play Console จนระบบชำระเงินทำงานได้",
                tag: "Android",
                date: "มี.ค. 2026",
              },
              {
                title: "สร้างระบบ Donation Real-time ด้วย Next.js + Socket.IO",
                desc: "วิธีสร้างระบบแจ้งเตือนบริจาคแบบ real-time สำหรับสตรีมเมอร์ พร้อม Omise Payment Gateway",
                tag: "Full-Stack",
                date: "ก.พ. 2026",
              },
              {
                title: "PKCS#8 Key Error บน Render — แก้ยังไง?",
                desc: "บันทึกการแก้ปัญหา Private Key format ผิดบน Render ที่ทำให้ Google API verify ไม่ผ่าน",
                tag: "DevOps",
                date: "มี.ค. 2026",
              },
            ].map((post, i) => (
              <FadeIn key={i} delay={i * 0.1} direction="up">
                <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:-translate-y-1 hover:shadow-lg hover:border-indigo-200 transition-all h-full flex flex-col">
                  <span className="inline-block mb-3 px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-600 text-xs font-semibold w-fit">{post.tag}</span>
                  <h3 className="text-base font-bold mb-2 leading-snug">{post.title}</h3>
                  <p className="text-sm text-gray-500 mb-4 flex-1">{post.desc}</p>
                  <p className="text-xs text-gray-400">{post.date}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 px-6">
        <div className="max-w-[1100px] mx-auto">
          <SectionTitle text="ติดต่อ" />
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {[
              { icon: "✉️", title: "Email", value: "panitan05499@srru.ac.th", href: "mailto:panitan05499@srru.ac.th" },
              { icon: "📞", title: "Phone", value: "097-929-6288", href: "tel:0979296288" },
              { icon: "💻", title: "GitHub", value: "devpanitan", href: "https://github.com/devpanitan" },
            ].map((c, i) => (
              <FadeIn key={c.title} delay={i * 0.1} direction="up">
                <Magnet strength={12} padding={20}>
                  <a href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} className="bg-gray-50 rounded-2xl p-7 text-center border border-gray-200 hover:-translate-y-1 hover:border-indigo-200 hover:bg-white hover:shadow-lg transition-all block">
                    <div className="text-3xl mb-3">{c.icon}</div>
                    <h3 className="text-sm font-bold mb-1">{c.title}</h3>
                    <p className="text-sm text-indigo-500">{c.value}</p>
                  </a>
                </Magnet>
              </FadeIn>
            ))}
          </div>
          <FadeIn direction="up" delay={0.3}>
            <div className="text-center">
              <div className="mb-6">
                <GradientText className="text-lg font-medium" colors={['#6366f1', '#a855f7', '#ec4899', '#6366f1']} speed={5}>
                  พร้อมรับงาน Freelance และฝึกงาน
                </GradientText>
              </div>
              <Magnet strength={12} padding={20}>
                <a href="mailto:panitan05499@srru.ac.th" className="inline-block px-8 py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold hover:scale-105 hover:shadow-xl transition-all">
                  ส่ง Email หาผม ✨
                </a>
              </Magnet>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 text-center py-6 text-sm">
        &copy; 2026 Patipan Rueangyong. Built with React + Tailwind + WebGL
      </footer>
    </div>
  );
}
