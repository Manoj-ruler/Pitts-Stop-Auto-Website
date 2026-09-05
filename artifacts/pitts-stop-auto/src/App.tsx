import { createContext, type FormEvent, type ReactNode, useContext, useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import {
  ArrowDownRight,
  ArrowRight,
  Check,
  ChevronDown,
  CircleAlert,
  Clock3,
  Crosshair,
  ExternalLink,
  Gauge,
  Hammer,
  Mail,
  MapPin,
  Menu,
  Moon,
  MoveRight,
  Navigation,
  Phone,
  PhoneCall,
  ShieldCheck,
  Sparkles,
  Sun,
  UserCheck,
  Wrench,
  X,
  Zap,
} from 'lucide-react';
import { Link, Route, Switch, Router as WouterRouter, useLocation } from 'wouter';
import NotFound from '@/pages/not-found';
import heroGarage from './assets/garage-hero.jpg';
import detailGarage from './assets/garage-detail.jpg';

const queryClient = new QueryClient();
type Theme = 'dark' | 'light';
const ThemeContext = createContext<{ theme: Theme; toggle: () => void }>({ theme: 'dark', toggle: () => undefined });

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
    document.title = `${title} | Pitts Stop Auto — Car Care Center`;
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
  const { theme, toggle } = useContext(ThemeContext);
  const active = (href: string) => href === '/' ? location === '/' : location.startsWith(href);

  return (
    <>
      <header className="sticky top-0 z-30 border-b border-white/10 bg-[hsl(220_14%_8%/.92)] backdrop-blur-md">
        <div className="mx-auto flex h-[76px] max-w-[1320px] items-center justify-between px-5 lg:px-10">
          <Link href="/" onClick={() => setMenuOpen(false)} className="focus-ring group flex items-center gap-3" data-testid="link-brand">
            <span className="relative grid h-10 w-10 place-items-center border border-primary/80 bg-primary font-display text-xl font-bold text-primary-foreground">
              PS<span className="absolute -bottom-1 -right-1 h-2 w-2 bg-accent" />
            </span>
            <span className="leading-tight">
              <span className="block font-display text-[20px] sm:text-[22px] font-semibold tracking-[.04em] text-foreground">PITTS STOP AUTO</span>
              <span className="eyebrow block text-[9px] text-primary">CAR CARE CENTER</span>
            </span>
          </Link>
          <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary navigation">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                data-testid={`link-nav-${item.label.toLowerCase().replaceAll(' ', '-')}`}
                className={`focus-ring relative py-3 text-[12px] font-semibold uppercase tracking-[.12em] transition-colors ${
                  active(item.href) ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {item.label}
                {active(item.href) && <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary" />}
              </Link>
            ))}
          </nav>
          <div className="hidden items-center gap-3 lg:flex">
            <button
              type="button"
              onClick={toggle}
              className="focus-ring grid h-11 w-11 place-items-center border border-white/15 text-foreground transition-colors hover:border-primary hover:text-primary"
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              aria-pressed={theme === 'light'}
              data-testid="button-theme-toggle"
            >
              {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
            </button>
            <a
              href="tel:+14126825255"
              className="focus-ring inline-flex items-center gap-2 border border-white/20 px-4 py-3 text-[11px] font-bold uppercase tracking-[.12em] text-foreground transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
              data-testid="link-header-phone"
            >
              <Phone size={14} /> (412) 682-5255
            </a>
          </div>
          <button
            type="button"
            className="focus-ring grid h-11 w-11 place-items-center border border-white/15 text-foreground lg:hidden"
            onClick={() => setMenuOpen(true)}
            aria-label="Open navigation menu"
            data-testid="button-open-menu"
          >
            <Menu size={21} />
          </button>
        </div>
      </header>
      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-[hsl(220_14%_5%/.96)] lg:hidden" role="dialog" aria-modal="true" aria-label="Mobile navigation">
          <div className="flex h-[76px] items-center justify-between border-b border-white/10 px-5">
            <div>
              <span className="font-display text-lg tracking-[.04em] block text-foreground">PITTS STOP AUTO</span>
              <span className="eyebrow text-[9px] text-primary block">CAR CARE CENTER</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={toggle}
                className="focus-ring grid h-11 w-11 place-items-center border border-white/15 text-foreground"
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                aria-pressed={theme === 'light'}
                data-testid="button-mobile-theme-toggle"
              >
                {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
              </button>
              <button
                type="button"
                className="focus-ring grid h-11 w-11 place-items-center border border-white/15 text-foreground"
                onClick={() => setMenuOpen(false)}
                aria-label="Close navigation menu"
                data-testid="button-close-menu"
              >
                <X size={21} />
              </button>
            </div>
          </div>
          <nav className="flex flex-col px-5 pt-8" aria-label="Mobile navigation links">
            {navItems.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                data-testid={`link-mobile-${item.label.toLowerCase().replaceAll(' ', '-')}`}
                className={`focus-ring animate-rise border-b border-white/10 py-4 font-display text-3xl tracking-tight ${
                  active(item.href) ? 'text-primary' : 'text-foreground'
                }`}
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <span className="mr-3 font-mono-ui text-xs text-muted-foreground">0{i + 1}</span>
                {item.label}
              </Link>
            ))}
            <div className="mt-8 flex flex-col gap-3">
              <a
                href="tel:+14126825255"
                className="focus-ring inline-flex w-full items-center justify-center gap-3 bg-primary px-5 py-4 text-xs font-bold uppercase tracking-[.14em] text-primary-foreground"
                data-testid="link-mobile-phone-cta"
              >
                <Phone size={16} /> Call (412) 682-5255
              </a>
              <Link
                href="/contact#estimate"
                onClick={() => setMenuOpen(false)}
                className="focus-ring inline-flex w-full items-center justify-center gap-3 border border-white/20 px-5 py-4 text-xs font-bold uppercase tracking-[.14em] text-foreground"
                data-testid="link-mobile-estimate"
              >
                Request an estimate <ArrowRight size={15} />
              </Link>
            </div>
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
            <span className="grid h-9 w-9 place-items-center bg-primary font-display text-lg font-bold text-primary-foreground">PS</span>
            <div>
              <span className="font-display text-xl tracking-[.04em] block text-foreground">PITTS STOP AUTO</span>
              <span className="eyebrow text-[9px] text-primary block">CAR CARE CENTER</span>
            </div>
          </div>
          <p className="max-w-sm text-sm leading-7 text-muted-foreground">
            Pitts Stop Auto is a small, family-owned business with a simple mission: to provide great, professional, and friendly service to our customers.
          </p>
          <p className="mt-4 eyebrow text-accent">Professional ethics · Quality service · Customer care</p>
        </div>
        <div>
          <p className="eyebrow mb-5 text-foreground">Explore</p>
          <div className="flex flex-col items-start gap-3 text-sm text-muted-foreground">
            <Link href="/" className="focus-ring hover:text-foreground" data-testid="link-footer-home">Home</Link>
            <Link href="/about" className="focus-ring hover:text-foreground" data-testid="link-footer-about">About us</Link>
            <Link href="/services" className="focus-ring hover:text-foreground" data-testid="link-footer-services">Services</Link>
            <Link href="/why-us" className="focus-ring hover:text-foreground" data-testid="link-footer-why-us">Why choose us</Link>
            <Link href="/contact" className="focus-ring hover:text-foreground" data-testid="link-footer-contact">Contact</Link>
          </div>
        </div>
        <div>
          <p className="eyebrow mb-5 text-foreground">At the shop</p>
          <div className="text-sm leading-7 text-muted-foreground space-y-1.5">
            <p>Address: <span className="text-foreground">4740 Baum Blvd, Pittsburgh PA 15213</span></p>
            <p>Telephone: <a href="tel:+14126825255" className="text-foreground hover:text-primary transition-colors underline-offset-4 hover:underline" data-testid="link-footer-phone">(412) 682-5255</a></p>
            <p>Fax: <span className="text-foreground">(412) 682-5252</span></p>
            <p>Email: <a href="mailto:customers@pittsstopauto.com" className="text-foreground hover:text-primary transition-colors underline-offset-4 hover:underline" data-testid="link-footer-email">customers@pittsstopauto.com</a></p>
          </div>
          <a
            href="tel:+14126825255"
            className="focus-ring mt-5 inline-flex items-center gap-2 border-b border-primary pb-1 text-xs font-bold uppercase tracking-[.12em] text-primary hover:text-accent transition-colors"
            data-testid="link-footer-call-cta"
          >
            Call (412) 682-5255 <ArrowRight size={14} />
          </a>
        </div>
      </div>
      <div className="border-t border-white/10 px-5 py-5 lg:px-10">
        <div className="mx-auto flex max-w-[1320px] flex-col justify-between gap-2 text-[10px] uppercase tracking-[.1em] text-muted-foreground sm:flex-row">
          <span>Pitts Stop Auto 2018 ©</span>
          <span>4740 Baum Blvd, Pittsburgh PA 15213 · (412) 682-5255</span>
        </div>
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
  return (
    <div className="mb-5 flex items-center gap-3">
      <span className="font-mono-ui text-[11px] text-primary">{index}</span>
      <span className="h-px w-8 bg-primary/70" />
      <span className="eyebrow">{children}</span>
    </div>
  );
}

function ButtonLink({
  href,
  children,
  variant = 'primary',
  testId,
}: {
  href: string;
  children: ReactNode;
  variant?: 'primary' | 'outline';
  testId: string;
}) {
  return (
    <Link
      href={href}
      className={`focus-ring inline-flex items-center justify-center gap-3 px-5 py-4 text-[11px] font-bold uppercase tracking-[.12em] transition-all ${
        variant === 'primary'
          ? 'bg-primary text-primary-foreground hover:bg-[#d7352d]'
          : 'border border-white/20 text-foreground hover:border-primary hover:bg-primary/10'
      }`}
      data-testid={testId}
    >
      {children}
      <ArrowRight size={15} />
    </Link>
  );
}

function MapEmbed() {
  return (
    <div className="relative h-[340px] w-full overflow-hidden border border-white/15 bg-[#15191b] sm:h-[420px]">
      <iframe
        title="Pitts Stop Auto Location — 4740 Baum Blvd, Pittsburgh PA 15213"
        src="https://maps.google.com/maps?q=4740+Baum+Blvd,+Pittsburgh+PA+15213&t=&z=15&ie=UTF8&iwloc=&output=embed"
        className="h-full w-full border-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}

function HotspotBay() {
  const [selected, setSelected] = useState<HotspotId>('brakes');
  const spots: Record<HotspotId, { title: string; copy: string; x: string; y: string; icon: ReactNode }> = {
    brakes: {
      title: 'Brake System Service',
      copy: 'Pads, rotors, calipers, and delivery system — complete diagnostic check and repair for safe stopping.',
      x: '22%',
      y: '65%',
      icon: <CircleAlert size={16} />,
    },
    engine: {
      title: 'Diagnostics & Major Repairs',
      copy: 'Engine removal/replacement (used or rebuilt), head gaskets, valves, transmissions, timing belts, and water pumps.',
      x: '62%',
      y: '43%',
      icon: <Gauge size={16} />,
    },
    diagnostics: {
      title: 'Suspension & Electrical',
      copy: 'Front/rear suspension, springs, struts, tie rods, ball joints, electrical components, alternator, starter, and batteries.',
      x: '76%',
      y: '69%',
      icon: <Crosshair size={16} />,
    },
  };
  const active = spots[selected];

  return (
    <div className="relative min-h-[440px] overflow-hidden border border-white/15 bg-[#15191b] sm:min-h-[580px]">
      <img
        src={heroGarage}
        alt="Automotive repair facility bay at Pitts Stop Auto"
        className="absolute inset-0 h-full w-full object-cover object-center opacity-80"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#090b0c] via-transparent to-[#090b0c]/20" />
      <div className="absolute left-5 top-5 flex items-center gap-2 border border-white/20 bg-black/40 px-3 py-2 backdrop-blur-sm">
        <span className="h-2 w-2 rounded-full bg-primary animate-pulse-dot" />
        <span className="font-mono-ui text-[10px] uppercase tracking-[.14em] text-foreground">Inspection bay / live view</span>
      </div>
      {Object.entries(spots).map(([id, spot]) => (
        <button
          key={id}
          type="button"
          onClick={() => setSelected(id as HotspotId)}
          className={`focus-ring absolute grid h-10 w-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border text-foreground transition-all ${
            selected === id
              ? 'scale-110 border-accent bg-accent text-accent-foreground'
              : 'border-white/70 bg-black/50 hover:border-accent hover:bg-accent/90 hover:text-accent-foreground'
          }`}
          style={{ left: spot.x, top: spot.y }}
          aria-label={`Show ${spot.title}`}
          aria-pressed={selected === id}
          data-testid={`button-hotspot-${id}`}
        >
          {spot.icon}
        </button>
      ))}
      <div className="absolute bottom-0 left-0 right-0 border-t border-white/15 bg-[#0b0d0e]/90 p-5 backdrop-blur-sm sm:p-6">
        <div className="flex items-start gap-4">
          <span className="mt-1 text-accent">{active.icon}</span>
          <div>
            <p className="eyebrow mb-2 text-accent">Selected inspection point</p>
            <h3 className="font-display text-2xl uppercase tracking-[.03em]">{active.title}</h3>
            <p className="mt-1 max-w-xl text-sm leading-6 text-muted-foreground">{active.copy}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function HomePage() {
  return (
    <PageFrame
      title="Car Care Center"
      description="Pitts Stop Auto Car Care Center is a small, family-owned business in Pittsburgh, PA offering diagnostics, major repairs, minor repairs, and service for most car makes."
    >
      {/* HERO SECTION */}
      <section className="relative isolate overflow-hidden border-b border-white/10">
        <div className="mx-auto grid max-w-[1320px] items-end gap-10 px-5 pb-16 pt-16 lg:grid-cols-[.9fr_1.1fr] lg:px-10 lg:pb-24 lg:pt-24">
          <div className="relative z-10 animate-rise">
            <p className="eyebrow mb-5 text-primary">Small, family-owned business / Pittsburgh, PA</p>
            <h1 className="max-w-xl font-display text-[clamp(3.8rem,8.5vw,8rem)] font-semibold uppercase leading-[.85] tracking-[-.035em]">
              PITTS STOP AUTO<br />
              <span className="text-primary">CAR CARE CENTER</span>
            </h1>
            <p className="mt-7 max-w-md text-base leading-7 text-muted-foreground">
              Pitts Stop Auto is a small, family-owned business with a simple mission: to provide great, professional, and friendly service to our customers. Owner Noor Khan and his professional team have extensive experience in diagnostics, repairs, and quality assurance for all types of automotive vehicles.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/contact#estimate" testId="link-hero-estimate">Request an estimate</ButtonLink>
              <ButtonLink href="/services" variant="outline" testId="link-hero-services">Our Services</ButtonLink>
            </div>
            <div className="mt-10 flex items-center gap-4 border-l border-primary pl-4">
              <ShieldCheck size={20} className="shrink-0 text-accent" />
              <p className="text-xs leading-5 text-muted-foreground">
                Professional ethics · Quality service · Customer care<br />
                <span className="text-foreground">4740 Baum Blvd, Pittsburgh PA 15213 · (412) 682-5255</span>
              </p>
            </div>
          </div>
          <div className="relative animate-rise delay-2">
            <HotspotBay />
            <p className="absolute -bottom-9 right-0 hidden font-mono-ui text-[10px] uppercase tracking-[.14em] text-muted-foreground sm:block">
              Tap a point to inspect capabilities
            </p>
          </div>
        </div>
        <div className="pointer-events-none absolute -right-24 top-20 -z-10 font-display text-[18rem] font-bold leading-none text-white/[.025]">
          PSA
        </div>
      </section>

      {/* SPECIALS SECTION */}
      <section className="border-b border-white/10 bg-[#111416]" aria-label="Specials">
        <div className="mx-auto max-w-[1320px] px-5 py-12 lg:px-10 lg:py-16">
          <div className="flex flex-col items-center justify-between gap-6 border border-accent/30 bg-accent/5 p-8 text-center sm:flex-row sm:text-left">
            <div>
              <div className="mb-2 flex items-center justify-center gap-2 sm:justify-start">
                <span className="h-2 w-2 rounded-full bg-accent" />
                <span className="eyebrow text-accent">SPECIALS</span>
              </div>
              <h2 className="font-display text-3xl uppercase tracking-tight text-foreground sm:text-4xl">
                SEE OUR SPECIAL OFFERS NOW
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Inquire with Noor Khan and our team today about our latest seasonal service offers and specials.
              </p>
            </div>
            <Link
              href="/contact#estimate"
              className="focus-ring shrink-0 inline-flex items-center gap-3 bg-primary px-6 py-4 text-xs font-bold uppercase tracking-[.14em] text-primary-foreground hover:bg-[#d7352d] transition-colors"
              data-testid="button-home-specials"
            >
              SPECIALS <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* OUR SERVICES PREVIEW */}
      <section className="mx-auto max-w-[1320px] px-5 py-20 lg:px-10 lg:py-28" aria-label="Our Services">
        <div className="mb-12 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <SectionLabel index="01">Capabilities</SectionLabel>
            <h2 className="font-display text-5xl uppercase leading-none sm:text-6xl">OUR SERVICES</h2>
          </div>
          <Link
            href="/services"
            className="focus-ring inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.12em] text-primary hover:text-accent transition-colors"
            data-testid="link-home-full-list"
          >
            Full List <ArrowRight size={15} />
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="border border-white/15 bg-[#111416] p-6">
            <span className="font-mono-ui text-xs text-primary">01</span>
            <div className="my-5 grid h-10 w-10 place-items-center border border-primary/60 text-primary">
              <Sparkles size={20} />
            </div>
            <h3 className="font-display text-2xl uppercase">Minor repairs</h3>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Oil change with 20-point checks, state inspections (safety & emissions), diagnostics, tune-ups, brake systems, air conditioning, and heating systems.
            </p>
          </div>

          <div className="border border-white/15 bg-[#111416] p-6">
            <span className="font-mono-ui text-xs text-primary">02</span>
            <div className="my-5 grid h-10 w-10 place-items-center border border-primary/60 text-primary">
              <Gauge size={20} />
            </div>
            <h3 className="font-display text-2xl uppercase">Diagnostics</h3>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Front and rear suspension, timing belts, water pumps, electrical systems, tire repair, good-condition used tires (80% tread), and used-car buying advice.
            </p>
          </div>

          <div className="border border-white/15 bg-[#111416] p-6">
            <span className="font-mono-ui text-xs text-primary">03</span>
            <div className="my-5 grid h-10 w-10 place-items-center border border-primary/60 text-primary">
              <Wrench size={20} />
            </div>
            <h3 className="font-display text-2xl uppercase">Most car makes</h3>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Import and domestic cars or small trucks. Specialty in European cars (Volvo, SAAB, Audi, VW, Jaguar, Land/Range Rover) and Asian makes (Honda, Toyota, Mazda, Nissan).
            </p>
          </div>

          <div className="border border-white/15 bg-[#111416] p-6">
            <span className="font-mono-ui text-xs text-primary">04</span>
            <div className="my-5 grid h-10 w-10 place-items-center border border-primary/60 text-primary">
              <Hammer size={20} />
            </div>
            <h3 className="font-display text-2xl uppercase">Major Repairs</h3>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Engine removal & replacement (used or rebuilt), head gasket & valve jobs, transmission/transaxle replacement (used or rebuilt), and clutches.
            </p>
          </div>
        </div>
      </section>

      {/* ABOUT US PREVIEW */}
      <section className="border-y border-white/10 bg-[#111416]" aria-label="About Us Preview">
        <div className="mx-auto grid max-w-[1320px] items-center gap-10 px-5 py-16 lg:grid-cols-[1fr_.85fr] lg:px-10 lg:py-24">
          <div className="overflow-hidden border border-white/10">
            <img
              src={detailGarage}
              alt="Technician conducting vehicle diagnostics at Pitts Stop Auto"
              className="h-[360px] w-full object-cover sm:h-[480px]"
            />
          </div>
          <div>
            <SectionLabel index="02">About Us</SectionLabel>
            <h2 className="font-display text-4xl uppercase leading-[.9] sm:text-6xl">
              Family-Owned.<br />
              <span className="text-accent">Professional Care.</span>
            </h2>
            <p className="mt-6 text-base leading-7 text-muted-foreground">
              Pitts Stop Auto is a small, family-owned business with a simple mission: to provide great, professional, and friendly service to our customers.
            </p>
            <div className="mt-6 space-y-3 border-t border-white/15 pt-5 text-sm text-muted-foreground">
              <p className="font-semibold text-foreground">
                <span className="text-primary font-mono-ui text-xs mr-2">OWNER</span>
                Noor Khan — Owner
              </p>
              <p>
                The owner, Noor Khan, and his professional team have extensive experience in diagnostics, repairs, and quality assurance for all types of automotive vehicles.
              </p>
              <p className="eyebrow text-accent pt-2">
                Our priorities are professional ethics, quality service, and customer care.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <ButtonLink href="/about" testId="link-home-about-more">Read Our Story</ButtonLink>
              <ButtonLink href="/contact" variant="outline" testId="link-home-contact-direct">Contact The Shop</ButtonLink>
            </div>
          </div>
        </div>
      </section>

      {/* VISIT US SECTION */}
      <section className="mx-auto max-w-[1320px] px-5 py-20 lg:px-10 lg:py-28" aria-label="Visit Us">
        <div className="mb-10">
          <SectionLabel index="03">Location</SectionLabel>
          <h2 className="font-display text-5xl uppercase leading-none sm:text-6xl">VISIT US!</h2>
          <p className="mt-3 text-base text-muted-foreground">
            Conveniently located in Pittsburgh, PA on Baum Boulevard.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.1fr_.9fr]">
          <MapEmbed />

          <div className="flex flex-col justify-between border border-white/15 bg-[#111416] p-6 sm:p-8">
            <div>
              <p className="eyebrow mb-3 text-accent">Pittsburgh Car Care Center</p>
              <h3 className="font-display text-3xl uppercase">Pitts Stop Auto</h3>
              <div className="mt-6 space-y-4 text-sm text-muted-foreground">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 shrink-0 text-primary" size={18} />
                  <div>
                    <span className="font-semibold text-foreground block">Address</span>
                    <span>4740 Baum Blvd, Pittsburgh PA 15213</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="mt-0.5 shrink-0 text-primary" size={18} />
                  <div>
                    <span className="font-semibold text-foreground block">Telephone</span>
                    <a href="tel:+14126825255" className="text-foreground hover:text-primary transition-colors underline-offset-4 hover:underline">
                      (412) 682-5255
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <PhoneCall className="mt-0.5 shrink-0 text-primary" size={18} />
                  <div>
                    <span className="font-semibold text-foreground block">Fax</span>
                    <span>(412) 682-5252</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="mt-0.5 shrink-0 text-primary" size={18} />
                  <div>
                    <span className="font-semibold text-foreground block">Email</span>
                    <a href="mailto:customers@pittsstopauto.com" className="text-foreground hover:text-primary transition-colors underline-offset-4 hover:underline">
                      customers@pittsstopauto.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/15 flex flex-col sm:flex-row gap-3">
              <a
                href="tel:+14126825255"
                className="focus-ring inline-flex items-center justify-center gap-2 bg-primary px-5 py-3 text-xs font-bold uppercase tracking-[.12em] text-primary-foreground hover:bg-[#d7352d] transition-colors"
                data-testid="link-visit-call"
              >
                <Phone size={14} /> Call (412) 682-5255
              </a>
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=4740+Baum+Blvd,+Pittsburgh+PA+15213"
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring inline-flex items-center justify-center gap-2 border border-white/20 px-5 py-3 text-xs font-bold uppercase tracking-[.12em] text-foreground hover:border-primary hover:bg-primary/10 transition-colors"
                data-testid="link-visit-directions"
              >
                <Navigation size={14} /> Get Directions
              </a>
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </PageFrame>
  );
}

function CtaBand() {
  return (
    <section className="border-t border-primary/30 bg-primary px-5 py-12 text-primary-foreground lg:px-10 lg:py-16">
      <div className="mx-auto flex max-w-[1320px] flex-col items-start justify-between gap-8 md:flex-row md:items-center">
        <div>
          <p className="eyebrow mb-3 text-primary-foreground/70">Pitts Stop Auto · Car Care Center</p>
          <h2 className="font-display text-5xl uppercase leading-[.88] sm:text-6xl">
            Professional Care.<br />Personal Service.
          </h2>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href="tel:+14126825255"
            className="focus-ring inline-flex items-center gap-2 border border-white/40 bg-white/10 px-5 py-4 text-[11px] font-bold uppercase tracking-[.12em] text-white hover:bg-white hover:text-black transition-colors"
            data-testid="link-cta-phone"
          >
            <Phone size={15} /> (412) 682-5255
          </a>
          <ButtonLink href="/contact#estimate" variant="outline" testId="link-cta-estimate">
            Request an estimate
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

function PageIntro({ eyebrow, title, copy }: { eyebrow: string; title: ReactNode; copy: string }) {
  return (
    <section className="relative overflow-hidden border-b border-white/10">
      <div className="mx-auto max-w-[1320px] px-5 pb-20 pt-16 lg:px-10 lg:pb-28 lg:pt-24">
        <p className="eyebrow mb-8 text-primary">{eyebrow}</p>
        <h1 className="max-w-4xl font-display text-[clamp(4rem,9vw,8rem)] uppercase leading-[.82] tracking-[-.03em]">
          {title}
        </h1>
        <p className="mt-8 max-w-2xl text-base leading-7 text-muted-foreground">{copy}</p>
      </div>
      <div className="pointer-events-none absolute -right-10 bottom-[-3rem] font-display text-[15rem] leading-none text-white/[.025]">
        PSA
      </div>
    </section>
  );
}

function AboutPage() {
  return (
    <PageFrame
      title="About Us"
      description="Pitts Stop Auto is a small, family-owned automotive repair business in Pittsburgh, PA owned by Noor Khan, dedicated to professional ethics, quality service, and customer care."
    >
      <PageIntro
        eyebrow="About Us / 01"
        title={<>Small, Family-Owned.<br /><span className="text-primary">Professional Service.</span></>}
        copy="Pitts Stop Auto is a small, family-owned business with a simple mission: to provide great, professional, and friendly service to our customers."
      />

      <section className="mx-auto grid max-w-[1320px] gap-12 px-5 py-20 lg:grid-cols-[.8fr_1.2fr] lg:px-10 lg:py-28">
        <div>
          <SectionLabel index="02">Our Mission</SectionLabel>
          <h2 className="font-display text-5xl uppercase leading-[.9] sm:text-7xl">
            Ethics &<br /><span className="text-accent">Customer Care.</span>
          </h2>
        </div>
        <div className="space-y-6 text-base leading-7 text-muted-foreground">
          <p>
            Pitts Stop Auto is a small, family-owned business with a simple mission: to provide great, professional, and friendly service to our customers.
          </p>
          <p>
            The owner, Noor Khan, and his professional team have extensive experience in diagnostics, repairs, and quality assurance for all types of automotive vehicles.
          </p>
          <p className="border-l-2 border-primary pl-4 text-foreground font-semibold">
            "Our priorities are professional ethics, quality service, and customer care."
          </p>
        </div>
      </section>

      {/* TEAM OVERVIEW - NOOR KHAN */}
      <section className="border-y border-white/10 bg-[#111416]">
        <div className="mx-auto max-w-[1320px] px-5 py-20 lg:px-10 lg:py-28">
          <SectionLabel index="03">Leadership & Team</SectionLabel>
          <div className="mt-8 grid gap-8 md:grid-cols-2">
            <div className="border border-white/15 bg-[#15191b] p-8">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center bg-primary text-primary-foreground font-display text-xl font-bold">
                NK
              </div>
              <p className="eyebrow text-primary">Business Leadership</p>
              <h3 className="mt-2 font-display text-3xl uppercase text-foreground">Noor Khan</h3>
              <p className="font-mono-ui text-xs text-accent">Owner</p>
              <p className="mt-4 text-sm leading-6 text-muted-foreground">
                Owner Noor Khan leads Pitts Stop Auto with a commitment to straightforward service, careful vehicle diagnostics, and attentive customer care for every driver who walks through our doors.
              </p>
            </div>

            <div className="border border-white/15 bg-[#15191b] p-8">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center border border-white/30 text-foreground font-display text-xl font-bold">
                <UserCheck size={24} className="text-accent" />
              </div>
              <p className="eyebrow text-accent">Technical Team</p>
              <h3 className="mt-2 font-display text-3xl uppercase text-foreground">Professional Team</h3>
              <p className="font-mono-ui text-xs text-muted-foreground">Diagnostics, Repairs & Quality Assurance</p>
              <p className="mt-4 text-sm leading-6 text-muted-foreground">
                Our professional team brings extensive hands-on experience in vehicle diagnostics, mechanical overhauls, routine service, and quality assurance across all automotive makes and models.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1320px] gap-12 px-5 py-20 lg:grid-cols-[1fr_.8fr] lg:px-10 lg:py-28">
        <img
          src={detailGarage}
          alt="Hands-on diagnostic inspection inside Pitts Stop Auto workshop"
          className="h-[420px] w-full object-cover sm:h-[520px]"
        />
        <div>
          <SectionLabel index="04">Core Priorities</SectionLabel>
          <div className="space-y-8">
            {[
              { num: '01', title: 'Professional Ethics', desc: 'Honest assessments and straightforward advice on your vehicle before any wrench turns.' },
              { num: '02', title: 'Quality Service', desc: 'Thorough diagnostics, dependable repairs, and dedicated quality assurance for all makes.' },
              { num: '03', title: 'Customer Care', desc: 'Friendly, personalized attention from a dedicated family-owned neighborhood shop.' },
            ].map((pillar) => (
              <div key={pillar.num} className="flex gap-5 border-b border-white/10 pb-7">
                <span className="font-mono-ui text-xs text-primary">{pillar.num}</span>
                <div>
                  <h3 className="font-display text-2xl uppercase leading-none">{pillar.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{pillar.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </PageFrame>
  );
}

const servicesData = [
  {
    id: 'makes',
    title: 'Most car makes',
    subtitle: 'Import & domestic coverage and European specialties',
    icon: <Wrench size={22} />,
    description: 'Import and domestic cars or small trucks.',
    specialty: 'Specialty: Most European cars such as Volvo, SAAB, Audi, and VW, as well as Honda, Toyota, Mazda, Nissan, Jaguar, and Land/Range Rover.',
    items: [
      'Import cars and small trucks',
      'Domestic cars and small trucks',
      'European specialty: Volvo, SAAB, Audi, VW',
      'Asian makes: Honda, Toyota, Mazda, Nissan',
      'European luxury: Jaguar, Land/Range Rover',
    ],
  },
  {
    id: 'diagnostics',
    title: 'Diagnostics',
    subtitle: 'Component evaluation & more minor repair/services',
    icon: <Gauge size={22} />,
    description: 'Thorough inspection and component diagnostics to pinpoint issues and provide clear guidance.',
    items: [
      'Front suspension systems and components (Springs, Struts, Tie rods, Ball joints, Steering system)',
      'Rear suspension systems',
      'Timing belts',
      'Water pumps',
      'Electrical systems (Batteries, Alternators, Starters, Lights, and more electrical components)',
      'Tire repair',
      'Good-condition used tires (source states 80% tread)',
      'Used-car buying advice (Check and advise you for buying used cars)',
    ],
  },
  {
    id: 'major',
    title: 'Major Repairs',
    subtitle: 'Powertrain, transmission & mechanical overhauls',
    icon: <Hammer size={22} />,
    description: 'Major repair/services for engines, transmissions, and critical mechanical drivetrains.',
    items: [
      'Engine removal and replacement (Used or rebuilt engines)',
      'Head gasket and valve work',
      'Transmission / transaxle removal and replacement (Used or rebuilt units)',
      'Clutch service',
    ],
  },
  {
    id: 'minor',
    title: 'Minor repairs',
    subtitle: 'Essential maintenance, inspections & safety checks',
    icon: <Sparkles size={22} />,
    description: 'Minor repair/services to keep your vehicle running smoothly, safely, and comfortably.',
    items: [
      'Oil change with 20-point checks',
      'State inspection (Safety & emissions)',
      'Diagnostics (Engine, drivability, electrical & more)',
      'Tune-ups',
      'Brake system service (Pads, rotors, calipers & delivery system)',
      'Air conditioning check, repair, and recharge',
      'Heating system check and repair',
    ],
  },
];

function ServicesPage() {
  return (
    <PageFrame
      title="Automotive Services"
      description="Explore our four primary service categories at Pitts Stop Auto: Most car makes, Diagnostics, Major Repairs, and Minor repairs."
    >
      <PageIntro
        eyebrow="Services / 01"
        title={<>Automotive Repairs<br /><span className="text-primary">& Diagnostics</span></>}
        copy="Pitts Stop Auto provides expert automotive care across four primary service categories. From state inspections and 20-point oil changes to major engine and transmission rebuilds, we deliver dependable workmanship."
      />

      <section className="mx-auto max-w-[1320px] px-5 py-20 lg:px-10 lg:py-28" aria-label="Services List">
        <div className="mb-12 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <SectionLabel index="02">Service Categories</SectionLabel>
            <h2 className="font-display text-5xl uppercase leading-none sm:text-6xl">Full Service Menu</h2>
          </div>
          <a
            href="tel:+14126825255"
            className="focus-ring inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.12em] text-primary hover:text-accent transition-colors"
            data-testid="link-services-header-call"
          >
            <Phone size={14} /> Call (412) 682-5255 for service
          </a>
        </div>

        <div className="space-y-12">
          {servicesData.map((category, index) => (
            <div
              key={category.id}
              id={category.id}
              className="border border-white/15 bg-[#111416] p-6 sm:p-10 transition-colors hover:border-white/30"
              data-testid={`card-service-${category.id}`}
            >
              <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                <div className="flex items-start gap-4">
                  <div className="mt-1 grid h-12 w-12 shrink-0 place-items-center border border-primary/60 bg-primary/10 text-primary">
                    {category.icon}
                  </div>
                  <div>
                    <span className="font-mono-ui text-xs text-primary">Category 0{index + 1}</span>
                    <h3 className="mt-1 font-display text-4xl uppercase tracking-tight text-foreground">
                      {category.title}
                    </h3>
                    <p className="mt-1 text-sm text-accent eyebrow">{category.subtitle}</p>
                    <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
                      {category.description}
                    </p>
                    {category.specialty && (
                      <p className="mt-2 max-w-2xl text-sm font-semibold text-foreground">
                        {category.specialty}
                      </p>
                    )}
                  </div>
                </div>

                <div className="shrink-0">
                  <a
                    href="tel:+14126825255"
                    className="focus-ring inline-flex items-center gap-2 border border-primary/60 bg-primary/10 px-4 py-3 text-[11px] font-bold uppercase tracking-[.12em] text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                    data-testid={`button-call-service-${category.id}`}
                  >
                    <Phone size={14} /> Ask About This
                  </a>
                </div>
              </div>

              <div className="mt-8 border-t border-white/10 pt-6">
                <h4 className="eyebrow mb-4 text-foreground">Services & Capabilities:</h4>
                <ul className="grid gap-3 sm:grid-cols-2 text-sm leading-6 text-muted-foreground">
                  {category.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check size={16} className="mt-1 shrink-0 text-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES PAGE CTA: CALL US! */}
      <section className="border-t border-accent/40 bg-[#15191b] px-5 py-16 lg:px-10 lg:py-20 text-center" aria-label="Call Us CTA">
        <div className="mx-auto max-w-2xl">
          <div className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-full bg-accent text-accent-foreground">
            <Phone size={24} />
          </div>
          <h2 className="font-display text-5xl uppercase tracking-tight sm:text-6xl text-foreground">
            CALL US!
          </h2>
          <p className="mt-3 text-base text-muted-foreground">
            Speak directly with Noor Khan and our team to discuss your vehicle symptoms, schedule a state inspection, or arrange diagnostic service.
          </p>
          <div className="mt-8">
            <a
              href="tel:+14126825255"
              className="focus-ring inline-flex items-center gap-3 bg-primary px-8 py-5 text-sm font-bold uppercase tracking-[.14em] text-primary-foreground hover:bg-[#d7352d] transition-colors"
              data-testid="link-services-call-cta"
            >
              <Phone size={18} /> (412) 682-5255
            </a>
          </div>
          <p className="mt-4 text-xs uppercase tracking-wider text-muted-foreground">
            4740 Baum Blvd, Pittsburgh PA 15213 · customers@pittsstopauto.com
          </p>
        </div>
      </section>
    </PageFrame>
  );
}

function WhyUsPage() {
  const [open, setOpen] = useState<number | null>(0);
  const faqs = [
    [
      'What car makes and models do you service?',
      'We service import and domestic cars and small trucks. Our specialty includes European cars such as Volvo, SAAB, Audi, VW, Jaguar, and Land/Range Rover, as well as Asian makes including Honda, Toyota, Mazda, and Nissan.',
    ],
    [
      'Do you offer used-car buying advice and inspections?',
      'Yes! Under our diagnostics service, we check and advise you for buying used cars so you have a clear picture of vehicle condition before making a purchase.',
    ],
    [
      'What is included in a Pitts Stop Auto oil change?',
      'Our oil change service includes comprehensive 20-point checks to inspect vital fluids, belts, wear components, and essential systems.',
    ],
    [
      'Do you perform Pennsylvania state inspections?',
      'Yes, we provide official Pennsylvania safety and emission state inspections.',
    ],
    [
      'Do you sell used tires or perform tire repairs?',
      'Yes, we provide tire repairs and sell good-condition used tires with 80% tread.',
    ],
    [
      'How do I contact the shop or request service?',
      'You can call us directly at (412) 682-5255, email us at customers@pittsstopauto.com, or submit an estimate request online.',
    ],
  ];

  return (
    <PageFrame
      title="Why Choose Us"
      description="Learn why Pittsburgh drivers trust Pitts Stop Auto: family-owned dedication, Noor Khan's professional team, and comprehensive service for European, Asian, and domestic vehicles."
    >
      <PageIntro
        eyebrow="Why Choose Us / 01"
        title={<>Small Shop Dedication.<br /><span className="text-accent">Complete Capability.</span></>}
        copy="A family-owned garage where professional ethics, quality service, and customer care guide every repair decision."
      />

      <section className="mx-auto grid max-w-[1320px] gap-12 px-5 py-20 lg:grid-cols-[.9fr_1.1fr] lg:px-10 lg:py-28">
        <div>
          <SectionLabel index="02">Our Standard</SectionLabel>
          <h2 className="max-w-md font-display text-5xl uppercase leading-[.9] sm:text-7xl">
            Straightforward<br /><span className="text-primary">Service.</span>
          </h2>
          <p className="mt-8 max-w-md text-sm leading-7 text-muted-foreground">
            Our simple mission is to provide great, professional, and friendly service to our customers. We explain our diagnostic findings clearly so you know exactly what your vehicle needs.
          </p>
          <div className="mt-8">
            <a
              href="tel:+14126825255"
              className="focus-ring inline-flex items-center gap-2 border border-white/20 px-5 py-4 text-xs font-bold uppercase tracking-[.12em] text-foreground hover:border-primary hover:bg-primary/10 transition-colors"
              data-testid="link-why-phone-cta"
            >
              <Phone size={15} /> Call (412) 682-5255
            </a>
          </div>
        </div>

        <div className="space-y-4">
          {[
            {
              num: '01',
              title: 'Family-Owned & Customer-Focused',
              desc: 'Owned by Noor Khan, we prioritize friendly, personal service and long-term customer relationships over dealership sales pressure.',
            },
            {
              num: '02',
              title: 'Extensive Technical Experience',
              desc: 'Our professional team has broad experience in diagnostics, repairs, and quality assurance for all types of automotive vehicles.',
            },
            {
              num: '03',
              title: 'European & Domestic Specialties',
              desc: 'From Volvo, SAAB, Audi, VW, Jaguar, and Land/Range Rover to Honda, Toyota, Mazda, Nissan, and domestic trucks.',
            },
            {
              num: '04',
              title: 'Full Repair Spectrum',
              desc: 'From minor 20-point oil changes and state inspections to major engine and transmission replacements (used or rebuilt).',
            },
          ].map((item) => (
            <div key={item.num} className="grid grid-cols-[42px_1fr] gap-4 border-t border-white/15 py-5">
              <span className="font-mono-ui text-xs text-primary">{item.num}</span>
              <div>
                <h3 className="font-display text-2xl uppercase">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#111416]">
        <div className="mx-auto max-w-[1000px] px-5 py-20 lg:px-10 lg:py-28">
          <SectionLabel index="03">Common Questions</SectionLabel>
          <h2 className="mb-10 font-display text-5xl uppercase leading-none sm:text-6xl">
            Frequently Asked Questions
          </h2>
          {faqs.map(([question, answer], i) => (
            <div key={question} className="border-t border-white/15">
              <button
                type="button"
                className="focus-ring flex w-full items-center justify-between gap-5 py-6 text-left"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
                data-testid={`button-faq-${i}`}
              >
                <span className="font-display text-2xl uppercase">{question}</span>
                <ChevronDown size={18} className={`shrink-0 text-primary transition-transform ${open === i ? 'rotate-180' : ''}`} />
              </button>
              {open === i && (
                <p className="max-w-2xl pb-7 pr-10 text-sm leading-7 text-muted-foreground">
                  {answer}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      <CtaBand />
    </PageFrame>
  );
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

  if (submitted) {
    return (
      <div className="border border-accent/50 bg-accent/10 p-8 sm:p-10" role="status" data-testid="status-estimate-success">
        <div className="mb-6 grid h-12 w-12 place-items-center bg-accent text-accent-foreground">
          <Check size={24} />
        </div>
        <p className="eyebrow mb-3 text-accent">Request received</p>
        <h3 className="font-display text-4xl uppercase">Thank you, {form.name}.</h3>
        <p className="mt-4 max-w-md text-sm leading-7 text-muted-foreground">
          We have received your message. For immediate assistance or urgent scheduling, please call our shop directly at <a href="tel:+14126825255" className="text-foreground underline font-semibold">(412) 682-5255</a>.
        </p>
        <button
          type="button"
          onClick={() => {
            setSubmitted(false);
            setForm({ name: '', contact: '', vehicle: '', message: '' });
          }}
          className="focus-ring mt-8 border-b border-accent pb-1 text-xs font-bold uppercase tracking-[.12em] text-accent"
          data-testid="button-new-estimate"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="space-y-5" id="estimate" data-testid="form-estimate">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Your name" value={form.name} onChange={(v) => update('name', v)} error={errors.name} required testId="input-name" />
        <Field label="Phone or email" value={form.contact} onChange={(v) => update('contact', v)} error={errors.contact} required testId="input-contact" />
      </div>
      <Field label="Vehicle (year / make / model)" value={form.vehicle} onChange={(v) => update('vehicle', v)} testId="input-vehicle" />
      <Field label="What service or diagnostic do you need?" value={form.message} onChange={(v) => update('message', v)} error={errors.message} required textarea testId="input-message" />
      <div className="flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-5 sm:flex-row sm:items-center">
        <p className="max-w-xs text-[11px] leading-5 text-muted-foreground">
          You can also call us directly at <a href="tel:+14126825255" className="text-foreground underline">(412) 682-5255</a> during shop hours.
        </p>
        <button
          type="submit"
          className="focus-ring inline-flex items-center gap-3 bg-primary px-6 py-4 text-[11px] font-bold uppercase tracking-[.12em] text-primary-foreground hover:bg-[#d7352d] transition-colors"
          data-testid="button-submit-estimate"
        >
          Send request <MoveRight size={15} />
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  value,
  onChange,
  error,
  required,
  textarea,
  testId,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  textarea?: boolean;
  testId: string;
}) {
  const Tag = textarea ? 'textarea' : 'input';
  return (
    <label className="block text-left">
      <span className="mb-2 block font-mono-ui text-[10px] uppercase tracking-[.12em] text-muted-foreground">
        {label}
        {required && <span className="ml-1 text-primary">*</span>}
      </span>
      <Tag
        required={required}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={`focus-ring min-h-12 w-full resize-y border bg-[#0d1011] px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 ${
          textarea ? 'min-h-32' : ''
        } ${error ? 'border-primary' : 'border-white/15'}`}
        aria-invalid={Boolean(error)}
        data-testid={testId}
      />
      {error && <span className="mt-2 block text-xs text-primary" role="alert">{error}</span>}
    </label>
  );
}

function ContactPage() {
  return (
    <PageFrame
      title="Contact Us"
      description="Contact Pitts Stop Auto in Pittsburgh, PA: 4740 Baum Blvd, (412) 682-5255, customers@pittsstopauto.com."
    >
      <PageIntro
        eyebrow="Contact / 01"
        title={<>CONTACT US<br /><span className="text-primary">Pitts Stop Auto</span></>}
        copy="Reach out to Noor Khan and our professional team for diagnostics, maintenance, inspections, or major repairs."
      />

      {/* MAP SECTION */}
      <section className="mx-auto max-w-[1320px] px-5 pt-12 lg:px-10" aria-label="Shop Location Map">
        <MapEmbed />
      </section>

      <section className="mx-auto grid max-w-[1320px] gap-10 px-5 py-16 lg:grid-cols-[.8fr_1.2fr] lg:px-10 lg:py-24">
        <div className="space-y-10">
          <div>
            <SectionLabel index="02">Location & Details</SectionLabel>
            <h2 className="font-display text-4xl uppercase mb-6">CONTACT INFORMATION</h2>
            <div className="space-y-6 text-sm">
              <div className="flex gap-4">
                <MapPin className="shrink-0 text-primary" size={20} />
                <div>
                  <p className="eyebrow mb-1 text-foreground">Address</p>
                  <p className="text-muted-foreground">4740 Baum Blvd, Pittsburgh PA 15213</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Phone className="shrink-0 text-primary" size={20} />
                <div>
                  <p className="eyebrow mb-1 text-foreground">Telephone</p>
                  <a
                    href="tel:+14126825255"
                    className="focus-ring font-semibold text-foreground hover:text-primary transition-colors underline-offset-4 hover:underline"
                    data-testid="link-contact-phone"
                  >
                    (412) 682-5255
                  </a>
                </div>
              </div>
              <div className="flex gap-4">
                <PhoneCall className="shrink-0 text-primary" size={20} />
                <div>
                  <p className="eyebrow mb-1 text-foreground">Fax</p>
                  <p className="text-muted-foreground">(412) 682-5252</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Mail className="shrink-0 text-primary" size={20} />
                <div>
                  <p className="eyebrow mb-1 text-foreground">Email</p>
                  <a
                    href="mailto:customers@pittsstopauto.com"
                    className="focus-ring font-semibold text-foreground hover:text-primary transition-colors underline-offset-4 hover:underline"
                    data-testid="link-contact-email"
                  >
                    customers@pittsstopauto.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/15 pt-7">
            <p className="eyebrow mb-3 text-accent">Quick Actions</p>
            <div className="flex flex-wrap gap-3">
              <a
                href="tel:+14126825255"
                className="focus-ring inline-flex items-center gap-2 bg-primary px-4 py-3 text-xs font-bold uppercase tracking-[.12em] text-primary-foreground hover:bg-[#d7352d] transition-colors"
                data-testid="link-action-call"
              >
                <Phone size={14} /> Call Us
              </a>
              <a
                href="mailto:customers@pittsstopauto.com"
                className="focus-ring inline-flex items-center gap-2 border border-white/20 px-4 py-3 text-xs font-bold uppercase tracking-[.12em] text-foreground hover:border-primary hover:bg-primary/10 transition-colors"
                data-testid="link-action-email"
              >
                <Mail size={14} /> Email Us
              </a>
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=4740+Baum+Blvd,+Pittsburgh+PA+15213"
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring inline-flex items-center gap-2 border border-white/20 px-4 py-3 text-xs font-bold uppercase tracking-[.12em] text-foreground hover:border-primary hover:bg-primary/10 transition-colors"
                data-testid="link-action-directions"
              >
                <Navigation size={14} /> Directions
              </a>
            </div>
          </div>
        </div>

        <div className="border border-white/15 bg-[#111416] p-6 sm:p-10">
          <SectionLabel index="03">Send a Message</SectionLabel>
          <h2 className="mb-8 font-display text-4xl uppercase leading-[.9] sm:text-5xl">
            Request an Estimate<br /><span className="text-accent">or Service Inquiry</span>
          </h2>
          <EstimateForm />
        </div>
      </section>
    </PageFrame>
  );
}

function Router() {
  const [location] = useLocation();
  useEffect(() => {
    if (location.includes('#')) {
      window.setTimeout(() => {
        document.getElementById(location.split('#')[1])?.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    }
  }, [location]);

  return (
    <ErrorBoundary resetKey={location}>
      <Switch>
        <Route path="/" component={HomePage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/services" component={ServicesPage} />
        <Route path="/why-us" component={WhyUsPage} />
        <Route path="/contact" component={ContactPage} />
        <Route component={NotFound} />
      </Switch>
    </ErrorBoundary>
  );
}

function App() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === 'undefined') return 'dark';
    const previewTheme = new URLSearchParams(window.location.search).get('theme');
    if (previewTheme === 'light' || previewTheme === 'dark') return previewTheme;
    return window.localStorage.getItem('pitts-stop-theme') === 'light' ? 'light' : 'dark';
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.classList.toggle('light', theme === 'light');
    document.documentElement.style.colorScheme = theme;
    window.localStorage.setItem('pitts-stop-theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggle: () => setTheme((current) => (current === 'dark' ? 'light' : 'dark')) }}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
            <Router />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeContext.Provider>
  );
}

export default App;