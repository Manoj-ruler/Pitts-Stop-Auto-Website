import { type FormEvent, type ReactNode, useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { ArrowDownRight, ArrowRight, Check, ChevronDown, CircleAlert, Clock3, Crosshair, Gauge, Hammer, Menu, MoveRight, Phone, ShieldCheck, Sparkles, X, Wrench, Zap } from 'lucide-react';
import { Link, Route, Switch, Router as WouterRouter, useLocation } from 'wouter';
import NotFound from '@/pages/not-found';
import heroGarage from './assets/garage-hero.jpg';
import detailGarage from './assets/garage-detail.jpg';

const queryClient = new QueryClient();

type HotspotId = 'brakes' | 'engine' | 'diagnostics';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About us' },
  { href: '/services', label: 'Services' },
  { href: '/why-us', label: 'Why choose us' },
  { href: '/contact', label: 'Contact' },
];

function useMeta(title: string, description: string) {
  useEffect(() => {
    document.title = `${title} — Pitts Stop Auto`;
    let tag = document.querySelector('meta[name="description"]');
    if (!tag) {
      tag = document.createElement('meta');
      tag.setAttribute('name', 'description');
      document.head.appendChild(tag);
    }
    tag.setAttribute('content', description);
  }, [title, description]);
}

function Header() {
  const [location] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const active = (href: string) => href === '/' ? location === '/' : location.startsWith(href);

  return (
    <>
      <header className="sticky top-0 z-30 border-b border-white/10 bg-[hsl(220_14%_8%/.92)] backdrop-blur-md">
        <div className="mx-auto flex h-[76px] max-w-[1320px] items-center justify-between px-5 lg:px-10">
          <Link href="/" onClick={() => setMenuOpen(false)} className="focus-ring group flex items-center gap-3" data-testid="link-brand">
            <span className="relative grid h-10 w-10 place-items-center border border-primary/80 bg-primary font-display text-xl font-bold text-primary-foreground">
              PS<span className="absolute -bottom-1 -right-1 h-2 w-2 bg-accent" />
            </span>
            <span className="leading-none">
              <span className="block font-display text-[22px] font-semibold tracking-[.04em] text-foreground">PITTS STOP</span>
              <span className="eyebrow block text-[9px] text-primary">AUTO / SERVICE</span>
            </span>
          </Link>
          <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary navigation">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} data-testid={`link-nav-${item.label.toLowerCase().replaceAll(' ', '-')}`} className={`focus-ring relative py-3 text-[12px] font-semibold uppercase tracking-[.12em] transition-colors ${active(item.href) ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}>
                {item.label}
                {active(item.href) && <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary" />}
              </Link>
            ))}
          </nav>
          <div className="hidden items-center gap-3 lg:flex">
            <Link href="/contact#estimate" className="focus-ring inline-flex items-center gap-2 border border-white/20 px-4 py-3 text-[11px] font-bold uppercase tracking-[.12em] text-foreground transition-colors hover:border-primary hover:bg-primary" data-testid="link-header-estimate">
              Request an estimate <ArrowRight size={14} />
            </Link>
          </div>
          <button type="button" className="focus-ring grid h-11 w-11 place-items-center border border-white/15 text-foreground lg:hidden" onClick={() => setMenuOpen(true)} aria-label="Open navigation menu" data-testid="button-open-menu">
            <Menu size={21} />
          </button>
        </div>
      </header>
      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-[hsl(220_14%_5%/.96)] lg:hidden" role="dialog" aria-modal="true" aria-label="Mobile navigation">
          <div className="flex h-[76px] items-center justify-between border-b border-white/10 px-5">
            <span className="eyebrow text-primary">Pitts Stop Auto / Navigation</span>
            <button type="button" className="focus-ring grid h-11 w-11 place-items-center border border-white/15" onClick={() => setMenuOpen(false)} aria-label="Close navigation menu" data-testid="button-close-menu"><X size={21} /></button>
          </div>
          <nav className="flex flex-col px-5 pt-10" aria-label="Mobile navigation links">
            {navItems.map((item, i) => (
              <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)} data-testid={`link-mobile-${item.label.toLowerCase().replaceAll(' ', '-')}`} className={`focus-ring animate-rise border-b border-white/10 py-5 font-display text-4xl tracking-tight ${active(item.href) ? 'text-primary' : 'text-foreground'}`} style={{ animationDelay: `${i * 60}ms` }}>
                <span className="mr-3 font-mono-ui text-xs text-muted-foreground">0{i + 1}</span>{item.label}
              </Link>
            ))}
            <Link href="/contact#estimate" onClick={() => setMenuOpen(false)} className="focus-ring mt-8 inline-flex w-fit items-center gap-3 bg-primary px-5 py-4 text-xs font-bold uppercase tracking-[.14em]" data-testid="link-mobile-estimate">Start an estimate <ArrowRight size={15} /></Link>
          </nav>
        </div>
      )}
    </>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[hsl(220_14%_6%)]">
      <div className="mx-auto grid max-w-[1320px] gap-12 px-5 py-14 md:grid-cols-[1.2fr_.7fr_.7fr] lg:px-10">
        <div>
          <div className="mb-5 flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center bg-primary font-display text-lg font-bold">PS</span>
            <span className="font-display text-xl tracking-[.04em]">PITTS STOP AUTO</span>
          </div>
          <p className="max-w-sm text-sm leading-7 text-muted-foreground">A capable neighborhood garage for the work your vehicle actually needs. Clear notes, careful hands, no theater.</p>
          <p className="mt-6 eyebrow text-accent">Built for the long road home.</p>
        </div>
        <div>
          <p className="eyebrow mb-5 text-foreground">Explore</p>
          <div className="flex flex-col items-start gap-3 text-sm text-muted-foreground">
            <Link href="/about" className="focus-ring hover:text-foreground" data-testid="link-footer-about">About us</Link>
            <Link href="/services" className="focus-ring hover:text-foreground" data-testid="link-footer-services">Services</Link>
            <Link href="/why-us" className="focus-ring hover:text-foreground" data-testid="link-footer-why-us">Why choose us</Link>
            <Link href="/contact" className="focus-ring hover:text-foreground" data-testid="link-footer-contact">Contact</Link>
          </div>
        </div>
        <div>
          <p className="eyebrow mb-5 text-foreground">At the shop</p>
          <p className="text-sm leading-7 text-muted-foreground">Address: <span className="text-foreground">[ADDRESS — VERIFY]</span><br />Phone: <span className="text-foreground">[PHONE — VERIFY]</span><br />Hours: <span className="text-foreground">[HOURS — VERIFY]</span></p>
          <Link href="/contact#estimate" className="focus-ring mt-5 inline-flex items-center gap-2 border-b border-primary pb-1 text-xs font-bold uppercase tracking-[.12em] text-primary" data-testid="link-footer-estimate">Request an estimate <ArrowRight size={14} /></Link>
        </div>
      </div>
      <div className="border-t border-white/10 px-5 py-5 lg:px-10">
        <div className="mx-auto flex max-w-[1320px] flex-col justify-between gap-2 text-[10px] uppercase tracking-[.1em] text-muted-foreground sm:flex-row"><span>© {new Date().getFullYear()} Pitts Stop Auto</span><span>Service details shown as placeholders pending verification.</span></div>
      </div>
    </footer>
  );
}

function Shell({ children }: { children: ReactNode }) {
  return <div className="noise min-h-[100dvh] overflow-x-hidden">{children}</div>;
}

function PageFrame({ children, title, description }: { children: ReactNode; title: string; description: string }) {
  useMeta(title, description);
  return <Shell><Header /><main>{children}</main><Footer /></Shell>;
}

function SectionLabel({ index, children }: { index: string; children: ReactNode }) {
  return <div className="mb-5 flex items-center gap-3"><span className="font-mono-ui text-[11px] text-primary">{index}</span><span className="h-px w-8 bg-primary/70" /><span className="eyebrow">{children}</span></div>;
}

function ButtonLink({ href, children, variant = 'primary', testId }: { href: string; children: ReactNode; variant?: 'primary' | 'outline'; testId: string }) {
  return <Link href={href} className={`focus-ring inline-flex items-center justify-center gap-3 px-5 py-4 text-[11px] font-bold uppercase tracking-[.12em] transition-all ${variant === 'primary' ? 'bg-primary text-primary-foreground hover:bg-[#d7352d]' : 'border border-white/20 text-foreground hover:border-primary hover:bg-primary/10'}`} data-testid={testId}>{children}<ArrowRight size={15} /></Link>;
}

function HotspotBay() {
  const [selected, setSelected] = useState<HotspotId>('brakes');
  const spots: Record<HotspotId, { title: string; copy: string; x: string; y: string; icon: ReactNode }> = {
    brakes: { title: 'Brake inspection', copy: 'Pedal feel, pad wear, rotors, lines — we look at the full stop, not just the loudest symptom.', x: '22%', y: '65%', icon: <CircleAlert size={16} /> },
    engine: { title: 'Engine service', copy: 'Fluids, belts, leaks and the small clues that keep a bigger repair from finding you later.', x: '62%', y: '43%', icon: <Gauge size={16} /> },
    diagnostics: { title: 'Diagnostics', copy: 'A warning light is a starting point. We pair scan data with a hands-on check before recommending work.', x: '76%', y: '69%', icon: <Crosshair size={16} /> },
  };
  const active = spots[selected];
  return (
    <div className="relative min-h-[440px] overflow-hidden border border-white/15 bg-[#15191b] sm:min-h-[580px]">
      <img src={heroGarage} alt="Graphite vehicle in a dark automotive repair bay" className="absolute inset-0 h-full w-full object-cover object-center opacity-80" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#090b0c] via-transparent to-[#090b0c]/20" />
      <div className="absolute left-5 top-5 flex items-center gap-2 border border-white/20 bg-black/40 px-3 py-2 backdrop-blur-sm"><span className="h-2 w-2 rounded-full bg-primary animate-pulse-dot" /><span className="font-mono-ui text-[10px] uppercase tracking-[.14em] text-foreground">Inspection bay / live view</span></div>
      {Object.entries(spots).map(([id, spot]) => (
        <button key={id} type="button" onClick={() => setSelected(id as HotspotId)} className={`focus-ring absolute grid h-10 w-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border text-foreground transition-all ${selected === id ? 'scale-110 border-accent bg-accent text-accent-foreground' : 'border-white/70 bg-black/50 hover:border-accent hover:bg-accent/90 hover:text-accent-foreground'}`} style={{ left: spot.x, top: spot.y }} aria-label={`Show ${spot.title}`} aria-pressed={selected === id} data-testid={`button-hotspot-${id}`}>{spot.icon}</button>
      ))}
      <div className="absolute bottom-0 left-0 right-0 border-t border-white/15 bg-[#0b0d0e]/90 p-5 backdrop-blur-sm sm:p-6">
        <div className="flex items-start gap-4"><span className="mt-1 text-accent">{active.icon}</span><div><p className="eyebrow mb-2 text-accent">Selected inspection point</p><h3 className="font-display text-2xl uppercase tracking-[.03em]">{active.title}</h3><p className="mt-1 max-w-xl text-sm leading-6 text-muted-foreground">{active.copy}</p></div></div>
      </div>
    </div>
  );
}

function HomePage() {
  return (
    <PageFrame title="Independent auto repair, done properly" description="Pitts Stop Auto is a capable independent automotive repair garage. Request an estimate and get clear next steps.">
      <section className="relative isolate overflow-hidden border-b border-white/10">
        <div className="mx-auto grid max-w-[1320px] items-end gap-10 px-5 pb-16 pt-16 lg:grid-cols-[.9fr_1.1fr] lg:px-10 lg:pb-24 lg:pt-24">
          <div className="relative z-10 animate-rise">
            <p className="eyebrow mb-7 text-primary">Independent automotive repair / [CITY — VERIFY]</p>
            <h1 className="max-w-xl font-display text-[clamp(4.5rem,10vw,9.5rem)] font-semibold uppercase leading-[.82] tracking-[-.035em]">Good work<br /><span className="text-primary">holds up.</span></h1>
            <p className="mt-8 max-w-md text-base leading-7 text-muted-foreground">A real garage for the vehicles that get you everywhere. Thoughtful diagnostics, precise repairs, and a straight answer before any wrench turns.</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row"><ButtonLink href="/contact#estimate" testId="link-hero-estimate">Request an estimate</ButtonLink><ButtonLink href="/services" variant="outline" testId="link-hero-services">Explore services</ButtonLink></div>
            <div className="mt-12 flex items-center gap-4 border-l border-primary pl-4"><ShieldCheck size={18} className="shrink-0 text-accent" /><p className="text-xs leading-5 text-muted-foreground">No pressure. No mystery line items.<br /><span className="text-foreground">Just the next right step.</span></p></div>
          </div>
          <div className="relative animate-rise delay-2"><HotspotBay /><p className="absolute -bottom-9 right-0 hidden font-mono-ui text-[10px] uppercase tracking-[.14em] text-muted-foreground sm:block">Tap a point to inspect</p></div>
        </div>
        <div className="pointer-events-none absolute -right-24 top-20 -z-10 font-display text-[18rem] font-bold leading-none text-white/[.025]">01</div>
      </section>
      <section className="mx-auto grid max-w-[1320px] gap-12 px-5 py-20 lg:grid-cols-[.72fr_1.28fr] lg:px-10 lg:py-28">
        <div><SectionLabel index="01">The short version</SectionLabel><h2 className="max-w-md font-display text-5xl uppercase leading-[.92] sm:text-6xl">You bring the noise.<br /><span className="text-primary">We find the cause.</span></h2></div>
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="border-t border-white/20 pt-5"><Wrench className="mb-6 text-accent" size={22} /><h3 className="font-display text-3xl uppercase">Repair with context</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">We explain what we found, what matters now, and what can wait. The work should make sense before it starts.</p></div>
          <div className="border-t border-white/20 pt-5"><Zap className="mb-6 text-accent" size={22} /><h3 className="font-display text-3xl uppercase">Built for real life</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">Daily drivers, work vehicles, weekend machines. The recommendation changes with the vehicle and how you use it.</p></div>
        </div>
      </section>
      <section className="border-y border-white/10 bg-[#111416]">
        <div className="mx-auto grid max-w-[1320px] items-center gap-10 px-5 py-16 lg:grid-cols-[1fr_.75fr] lg:px-10 lg:py-24">
          <div className="overflow-hidden border border-white/10"><img src={detailGarage} alt="Gloved hands inspecting a brake assembly in a repair garage" className="h-[360px] w-full object-cover grayscale-[.2] sm:h-[480px]" /></div>
          <div><SectionLabel index="02">How it feels here</SectionLabel><h2 className="font-display text-5xl uppercase leading-[.9] sm:text-7xl">Less guessing.<br /><span className="text-accent">More knowing.</span></h2><p className="mt-7 max-w-md text-sm leading-7 text-muted-foreground">The best repair experience is not flashy. It is a clean handoff, a clear inspection, and a vehicle that feels right when you leave.</p><ButtonLink href="/why-us" variant="outline" testId="link-home-why-us" >See how we work</ButtonLink></div>
        </div>
      </section>
      <section className="mx-auto max-w-[1320px] px-5 py-20 lg:px-10 lg:py-28">
        <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><SectionLabel index="03">Start here</SectionLabel><h2 className="font-display text-5xl uppercase leading-none sm:text-6xl">A better first visit</h2></div><p className="max-w-xs text-sm leading-6 text-muted-foreground">Tell us what the vehicle is doing. We will help map the next move.</p></div>
        <div className="grid border-y border-white/15 sm:grid-cols-3">
          {[['01', 'Describe the symptom', 'A sound, a light, a feeling — it all helps.'], ['02', 'Get a clear plan', 'We will follow up with questions or an estimate.'], ['03', 'Make the call', 'Book the work when the timing feels right.']].map(([num, title, copy]) => <div key={num} className="group border-b border-white/15 p-6 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0 sm:p-8"><span className="font-mono-ui text-xs text-primary">{num}</span><h3 className="mt-14 font-display text-3xl uppercase group-hover:text-accent">{title}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{copy}</p><ArrowDownRight className="mt-8 text-white/30 transition-transform group-hover:translate-x-1 group-hover:translate-y-1 group-hover:text-primary" size={20} /></div>)}
        </div>
      </section>
      <CtaBand />
    </PageFrame>
  );
}

function CtaBand() {
  return <section className="border-t border-primary/30 bg-primary px-5 py-12 text-primary-foreground lg:px-10 lg:py-16"><div className="mx-auto flex max-w-[1320px] flex-col items-start justify-between gap-8 md:flex-row md:items-center"><div><p className="eyebrow mb-3 text-primary-foreground/70">Ready when you are</p><h2 className="font-display text-5xl uppercase leading-[.88] sm:text-6xl">Let's find<br />the next step.</h2></div><ButtonLink href="/contact#estimate" variant="outline" testId="link-cta-estimate">Request an estimate</ButtonLink></div></section>;
}

function AboutPage() {
  return <PageFrame title="About the garage" description="Meet Pitts Stop Auto: a straightforward independent garage built around careful diagnostics and human service.">
    <PageIntro eyebrow="About us / 01" title={<>A garage<br /><span className="text-primary">with a point of view.</span></>} copy="Pitts Stop Auto is an independent shop in the making. The details below are intentionally marked for verification so this site can become the real story of the people, place, and service behind the name." />
    <section className="mx-auto grid max-w-[1320px] gap-12 px-5 py-20 lg:grid-cols-[.8fr_1.2fr] lg:px-10 lg:py-28"><div><SectionLabel index="02">The principle</SectionLabel><p className="font-display text-5xl uppercase leading-[.9] sm:text-7xl">Do the work.<br /><span className="text-accent">Explain the work.</span></p></div><div className="grid gap-8 text-sm leading-7 text-muted-foreground sm:grid-cols-2"><p>A good shop should make you feel more informed, not more dependent. Our job is to inspect carefully, show our thinking, and give you a recommendation you can actually use.</p><p>Our people, founding story, years in operation, and local details will live here once verified. Until then, we would rather show a deliberate placeholder than make a claim we cannot stand behind.</p><div className="border-l border-primary pl-5 text-foreground sm:col-span-2">Team story placeholder — replace with a verified origin story, names, and a real portrait or shop image.</div></div></section>
    <section className="border-y border-white/10 bg-[#111416]"><div className="mx-auto grid max-w-[1320px] gap-12 px-5 py-20 lg:grid-cols-[1fr_.8fr] lg:px-10 lg:py-28"><img src={detailGarage} alt="Detailed brake inspection inside a dark repair garage" className="h-[420px] w-full object-cover sm:h-[560px]" /><div><SectionLabel index="03">What we believe</SectionLabel><div className="space-y-8">{['A diagnosis is not a sales pitch.', 'Maintenance is easier when it is explained.', 'Trust is built one clean handoff at a time.'].map((line, i) => <div key={line} className="flex gap-5 border-b border-white/10 pb-7"><span className="font-mono-ui text-xs text-primary">0{i + 1}</span><p className="font-display text-3xl uppercase leading-none">{line}</p></div>)}</div></div></div></section>
    <CtaBand />
  </PageFrame>;
}

function PageIntro({ eyebrow, title, copy }: { eyebrow: string; title: ReactNode; copy: string }) {
  return <section className="relative overflow-hidden border-b border-white/10"><div className="mx-auto max-w-[1320px] px-5 pb-20 pt-16 lg:px-10 lg:pb-28 lg:pt-24"><p className="eyebrow mb-8 text-primary">{eyebrow}</p><h1 className="max-w-4xl font-display text-[clamp(4.5rem,10vw,9rem)] uppercase leading-[.8] tracking-[-.03em]">{title}</h1><p className="mt-10 max-w-lg text-base leading-7 text-muted-foreground">{copy}</p></div><div className="pointer-events-none absolute -right-10 bottom-[-3rem] font-display text-[15rem] leading-none text-white/[.025]">P</div></section>;
}

const services = [
  { icon: <Wrench size={20} />, name: 'General repair', copy: 'The work that keeps a daily driver dependable: wear items, leaks, noises, and the little things that become big things when ignored.', tags: '[SERVICE LIST — VERIFY]' },
  { icon: <Gauge size={20} />, name: 'Diagnostics', copy: 'A warning light gets a measured response. We combine scan data, visual inspection, and experience to narrow the real cause.', tags: 'Check engine / electrical / drivability' },
  { icon: <CircleAlert size={20} />, name: 'Brake service', copy: 'Inspection and repair for the system that turns motion into a safe stop — pads, rotors, fluid, lines, and pedal feel.', tags: 'Inspection / pads / rotors' },
  { icon: <Hammer size={20} />, name: 'Maintenance', copy: 'Fluid services and scheduled care that make sense for your vehicle, mileage, and actual driving conditions.', tags: '[MAINTENANCE MENU — VERIFY]' },
  { icon: <ShieldCheck size={20} />, name: 'Pre-purchase check', copy: 'A second set of eyes before you buy. We will document visible condition and questions worth asking.', tags: '[AVAILABILITY — VERIFY]' },
  { icon: <Sparkles size={20} />, name: 'Special projects', copy: 'Have a vehicle with a story? Bring us the unusual noise, thoughtful upgrade, or project that needs a careful starting point.', tags: '[CAPABILITY — VERIFY]' },
];

function ServicesPage() {
  return <PageFrame title="Auto repair services" description="Explore Pitts Stop Auto service categories, from diagnostics and brakes to maintenance and general repair.">
    <PageIntro eyebrow="Services / 01" title={<>The work<br /><span className="text-primary">that matters.</span></>} copy="Start with the symptom. We will help identify the service category, the urgency, and the clearest next step. Specific offerings and vehicle coverage should be verified before publishing." />
    <section className="mx-auto max-w-[1320px] px-5 py-20 lg:px-10 lg:py-28"><div className="mb-12 flex items-end justify-between gap-6"><div><SectionLabel index="02">Service menu</SectionLabel><h2 className="font-display text-5xl uppercase leading-none sm:text-6xl">Useful, not inflated</h2></div><span className="hidden font-mono-ui text-[10px] uppercase tracking-[.12em] text-muted-foreground sm:block">Tap a category to start a conversation</span></div><div className="grid border-t border-white/15 md:grid-cols-2">{services.map((service, i) => <div key={service.name} className="group flex gap-5 border-b border-white/15 py-8 md:px-5 md:py-10 md:odd:border-r"><div className="mt-1 grid h-10 w-10 shrink-0 place-items-center border border-primary/60 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">{service.icon}</div><div><div className="flex items-start justify-between gap-4"><h3 className="font-display text-3xl uppercase">{service.name}</h3><span className="font-mono-ui text-[10px] text-muted-foreground">0{i + 1}</span></div><p className="mt-3 text-sm leading-6 text-muted-foreground">{service.copy}</p><p className="mt-5 font-mono-ui text-[10px] uppercase tracking-[.1em] text-accent">{service.tags}</p><Link href="/contact#estimate" className="focus-ring mt-6 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[.1em] text-foreground opacity-70 hover:text-primary hover:opacity-100" data-testid={`link-service-${i}`}>Ask about this <ArrowRight size={14} /></Link></div></div>)}</div></section>
    <CtaBand />
  </PageFrame>;
}

function WhyUsPage() {
  const [open, setOpen] = useState<number | null>(0);
  const faqs = [
    ['What should I include in an estimate request?', 'Tell us what the vehicle is doing, when it started, and anything you already know about the vehicle. A photo of a warning light or a short video of a noise can help too.'],
    ['Can I wait while the vehicle is inspected?', '[WAITING POLICY — VERIFY]. We will confirm timing and options when we follow up.'],
    ['Do you work on my make and model?', '[VEHICLE COVERAGE — VERIFY]. Send the year, make, and model with your request and we will confirm.'],
    ['Do you offer a warranty on repairs?', '[WARRANTY TERMS — VERIFY]. This should be replaced with the shop’s current written policy.'],
  ];
  return <PageFrame title="Why choose Pitts Stop Auto" description="Service information for Pitts Stop Auto: clear communication, careful inspection, and a repair process built around trust.">
    <PageIntro eyebrow="Why choose us / 01" title={<>The difference<br /><span className="text-accent">is in the details.</span></>} copy="A trustworthy repair experience is a series of small, visible choices. Here is the standard we are designing around — with business-specific claims held for verification." />
    <section className="mx-auto grid max-w-[1320px] gap-12 px-5 py-20 lg:grid-cols-[.9fr_1.1fr] lg:px-10 lg:py-28"><div><SectionLabel index="02">Our standard</SectionLabel><h2 className="max-w-md font-display text-5xl uppercase leading-[.9] sm:text-7xl">No shortcuts<br /><span className="text-primary">in the handoff.</span></h2><p className="mt-8 max-w-md text-sm leading-7 text-muted-foreground">You should know what we found, why it matters, and what happens next. The shop’s actual guarantees, certifications, and customer proof belong here once verified.</p><ButtonLink href="/contact#estimate" variant="outline" testId="link-why-estimate">Talk through a repair</ButtonLink></div><div className="space-y-3">{[['01', 'Clear recommendations', 'We separate urgent, useful, and optional so the decision stays yours.'], ['02', 'Visible process', 'Inspection notes and updates should make the work easier to understand.'], ['03', 'Respect for your time', 'We aim to communicate early when timing, parts, or scope changes.'], ['04', 'Verified trust signals', '[CERTIFICATIONS / WARRANTY / REVIEWS — VERIFY]']].map(([num, title, copy]) => <div key={num} className="grid grid-cols-[42px_1fr] gap-4 border-t border-white/15 py-5"><span className="font-mono-ui text-xs text-primary">{num}</span><div><h3 className="font-display text-2xl uppercase">{title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{copy}</p></div></div>)}</div></section>
    <section className="border-y border-white/10 bg-[#111416]"><div className="mx-auto max-w-[1000px] px-5 py-20 lg:px-10 lg:py-28"><SectionLabel index="03">Common questions</SectionLabel><h2 className="mb-10 font-display text-5xl uppercase leading-none sm:text-6xl">Before you pull in</h2>{faqs.map(([question, answer], i) => <div key={question} className="border-t border-white/15"><button type="button" className="focus-ring flex w-full items-center justify-between gap-5 py-6 text-left" onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i} data-testid={`button-faq-${i}`}><span className="font-display text-2xl uppercase">{question}</span><ChevronDown size={18} className={`shrink-0 text-primary transition-transform ${open === i ? 'rotate-180' : ''}`} /></button>{open === i && <p className="max-w-2xl pb-7 pr-10 text-sm leading-7 text-muted-foreground">{answer}</p>}</div>)}</div></section>
    <CtaBand />
  </PageFrame>;
}

function EstimateForm() {
  const [form, setForm] = useState({ name: '', contact: '', vehicle: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const update = (field: keyof typeof form, value: string) => setForm((current) => ({ ...current, [field]: value }));
  const submit = (event: FormEvent) => {
    event.preventDefault();
    const next: Record<string, string> = {};
    if (!form.name.trim()) next.name = 'Please tell us your name.';
    if (!form.contact.trim()) next.contact = 'Add a phone number or email so we can reply.';
    if (!form.message.trim()) next.message = 'A few words about the vehicle helps us start.';
    setErrors(next);
    if (!Object.keys(next).length) setSubmitted(true);
  };
  if (submitted) return <div className="border border-accent/50 bg-accent/10 p-8 sm:p-10" role="status" data-testid="status-estimate-success"><div className="mb-6 grid h-12 w-12 place-items-center bg-accent text-accent-foreground"><Check size={24} /></div><p className="eyebrow mb-3 text-accent">Request received</p><h3 className="font-display text-4xl uppercase">We have the signal.</h3><p className="mt-4 max-w-md text-sm leading-7 text-muted-foreground">Thanks, {form.name}. This is a friendly demo success state — connect this form to the verified shop inbox or phone workflow before launch.</p><button type="button" onClick={() => { setSubmitted(false); setForm({ name: '', contact: '', vehicle: '', message: '' }); }} className="focus-ring mt-8 border-b border-accent pb-1 text-xs font-bold uppercase tracking-[.12em] text-accent" data-testid="button-new-estimate">Send another request</button></div>;
  return <form onSubmit={submit} noValidate className="space-y-5" id="estimate" data-testid="form-estimate"><div className="grid gap-5 sm:grid-cols-2"><Field label="Your name" value={form.name} onChange={(v) => update('name', v)} error={errors.name} required testId="input-name" /><Field label="Phone or email" value={form.contact} onChange={(v) => update('contact', v)} error={errors.contact} required testId="input-contact" /></div><Field label="Vehicle (year / make / model)" value={form.vehicle} onChange={(v) => update('vehicle', v)} testId="input-vehicle" /><Field label="What is it doing?" value={form.message} onChange={(v) => update('message', v)} error={errors.message} required textarea testId="input-message" /><div className="flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-5 sm:flex-row sm:items-center"><p className="max-w-xs text-[11px] leading-5 text-muted-foreground">By sending this request, you are asking the shop to follow up. Replace this note with the verified privacy/contact language.</p><button type="submit" className="focus-ring inline-flex items-center gap-3 bg-primary px-5 py-4 text-[11px] font-bold uppercase tracking-[.12em] text-primary-foreground hover:bg-[#d7352d]" data-testid="button-submit-estimate">Send request <MoveRight size={15} /></button></div></form>;
}

function Field({ label, value, onChange, error, required, textarea, testId }: { label: string; value: string; onChange: (value: string) => void; error?: string; required?: boolean; textarea?: boolean; testId: string }) {
  const Tag = textarea ? 'textarea' : 'input';
  return <label className="block text-left"><span className="mb-2 block font-mono-ui text-[10px] uppercase tracking-[.12em] text-muted-foreground">{label}{required && <span className="ml-1 text-primary">*</span>}</span><Tag required={required} value={value} onChange={(event) => onChange(event.target.value)} className={`focus-ring min-h-12 w-full resize-y border bg-[#0d1011] px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 ${textarea ? 'min-h-32' : ''} ${error ? 'border-primary' : 'border-white/15'}`} aria-invalid={Boolean(error)} data-testid={testId} />{error && <span className="mt-2 block text-xs text-primary" role="alert">{error}</span>}</label>;
}

function ContactPage() {
  return <PageFrame title="Contact Pitts Stop Auto" description="Request an estimate from Pitts Stop Auto or find verified shop contact details and hours.">
    <PageIntro eyebrow="Contact / 01" title={<>Bring us<br /><span className="text-primary">the symptom.</span></>} copy="The fastest way to start is to tell us what the vehicle is doing. For the actual shop address, phone, and hours, use the verified details below once they are confirmed." />
    <section className="mx-auto grid max-w-[1320px] gap-10 px-5 py-20 lg:grid-cols-[.7fr_1.3fr] lg:px-10 lg:py-28">
      <div className="space-y-10"><div><SectionLabel index="02">Find the shop</SectionLabel><div className="space-y-6 text-sm"><div className="flex gap-4"><Crosshair className="shrink-0 text-primary" size={19} /><div><p className="eyebrow mb-1 text-foreground">Address</p><p className="text-muted-foreground">[ADDRESS — VERIFY]</p></div></div><div className="flex gap-4"><Phone className="shrink-0 text-primary" size={19} /><div><p className="eyebrow mb-1 text-foreground">Phone</p><a href="#estimate" className="focus-ring text-muted-foreground hover:text-foreground" data-testid="link-phone-placeholder">[PHONE — VERIFY]</a></div></div><div className="flex gap-4"><Clock3 className="shrink-0 text-primary" size={19} /><div><p className="eyebrow mb-1 text-foreground">Hours</p><p className="text-muted-foreground">[HOURS — VERIFY]</p></div></div></div></div><div className="border-t border-white/15 pt-7"><p className="eyebrow mb-3 text-accent">Prefer a direct conversation?</p><p className="text-sm leading-7 text-muted-foreground">Once the shop phone is verified, make this a direct tap-to-call action. For now, the estimate request is the best place to start.</p></div></div>
      <div className="border border-white/15 bg-[#111416] p-5 sm:p-8"><SectionLabel index="03">Request an estimate</SectionLabel><h2 className="mb-8 font-display text-5xl uppercase leading-[.9] sm:text-6xl">A few details<br /><span className="text-accent">go a long way.</span></h2><EstimateForm /></div>
    </section>
  </PageFrame>;
}

function Router() {
  const [location] = useLocation();
  useEffect(() => { if (location.includes('#')) window.setTimeout(() => document.getElementById(location.split('#')[1])?.scrollIntoView({ behavior: 'smooth' }), 50); }, [location]);
  return <ErrorBoundary resetKey={location}><Switch><Route path="/" component={HomePage} /><Route path="/about" component={AboutPage} /><Route path="/services" component={ServicesPage} /><Route path="/why-us" component={WhyUsPage} /><Route path="/contact" component={ContactPage} /><Route component={NotFound} /></Switch></ErrorBoundary>;
}

function App() {
  return <QueryClientProvider client={queryClient}><TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Router /></WouterRouter><Toaster /></TooltipProvider></QueryClientProvider>;
}

export default App;