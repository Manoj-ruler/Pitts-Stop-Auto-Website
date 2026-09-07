import { createContext, type FormEvent, type ReactNode, useContext, useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
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
  Wifi,
  Wrench,
  X,
  Zap,
} from 'lucide-react';
import { Link, Route, Switch, Router as WouterRouter, useLocation } from 'wouter';
import NotFound from '@/pages/not-found';
import heroGarage from './assets/garage-hero.jpg';
import detailGarage from './assets/garage-detail.jpg';
import logoImg from './assets/logo.png';
import whatsappImg from './assets/whatsapp.png';

const queryClient = new QueryClient();
type Theme = 'dark' | 'light';
const ThemeContext = createContext<{ theme: Theme; toggle: () => void }>({ theme: 'light', toggle: () => undefined });

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
            <img
              src={logoImg}
              alt="Pitts Stop Auto Logo"
              className="h-11 sm:h-13 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
            />
            <span className="leading-tight hidden min-[360px]:block">
              <span className="block font-display text-[18px] sm:text-[21px] font-semibold tracking-[.04em] text-foreground">PITTS STOP AUTO</span>
              <span className="eyebrow block text-[8px] sm:text-[9px] text-primary">CAR CARE CENTER</span>
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
            <span className="hidden xl:inline-flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground border border-white/10 px-3 py-2.5">
              <Clock3 size={13} className="text-primary" /> Mon–Fri 8AM–6PM
            </span>
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
            <div className="flex items-center gap-2.5">
              <img src={logoImg} alt="Pitts Stop Auto Logo" className="h-10 w-auto object-contain" />
              <div>
                <span className="font-display text-lg tracking-[.04em] block text-foreground">PITTS STOP AUTO</span>
                <span className="eyebrow text-[9px] text-primary block">CAR CARE CENTER</span>
              </div>
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
          <div className="mb-5 flex items-center gap-3.5">
            <img src={logoImg} alt="Pitts Stop Auto Logo" className="h-12 sm:h-14 w-auto object-contain" />
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
            <p>Address: <span className="text-foreground">4734 Baum Blvd, Pittsburgh PA 15213</span></p>
            <div className="border-y border-white/10 py-2 my-2 text-xs leading-5">
              <p className="font-semibold text-foreground flex items-center gap-1.5 mb-1">
                <Clock3 size={13} className="text-primary" /> Operating Hours
              </p>
              <p className="text-muted-foreground">Mon – Fri: <span className="text-foreground font-medium">8:00 AM – 6:00 PM</span></p>
              <p className="text-muted-foreground">Sat & Sun: <span className="text-foreground font-medium">Closed</span></p>
            </div>
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
          <span>4734 Baum Blvd, Pittsburgh PA 15213 · (412) 682-5255</span>
        </div>
      </div>
    </footer>
  );
}

function FloatingWhatsApp() {
  return (
    <aside aria-label="WhatsApp Contact" className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50">
      <a
        href="https://wa.me/14126825255"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Pitts Stop Auto on WhatsApp: (412) 682-5255"
        className="group relative flex items-center justify-center focus-ring rounded-full transition-all duration-300 hover:scale-110 active:scale-95"
        data-testid="link-floating-whatsapp"
      >
        <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-md bg-neutral-900 border border-neutral-700 px-3 py-1.5 text-xs font-semibold text-white shadow-xl backdrop-blur-md opacity-0 group-hover:opacity-100 sm:inline-block transition-opacity duration-200">
          Chat with us on WhatsApp · (412) 682-5255
        </span>
        <span className="absolute -inset-1 rounded-full bg-[#25D366] opacity-35 blur-md group-hover:opacity-75 transition-opacity animate-pulse" />
        <img
          src={whatsappImg}
          alt="WhatsApp"
          className="relative h-14 w-14 sm:h-16 sm:w-16 rounded-full object-contain drop-shadow-[0_8px_20px_rgba(0,0,0,0.45)]"
        />
      </a>
    </aside>
  );
}

function Shell({ children }: { children: ReactNode }) {
  return (
    <div className="noise min-h-[100dvh] overflow-x-hidden">
      {children}
      <FloatingWhatsApp />
    </div>
  );
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
        title="Pitts Stop Auto Location — 4734 Baum Blvd, Pittsburgh PA 15213"
        src="https://maps.google.com/maps?q=4734+Baum+Blvd,+Pittsburgh+PA+15213&t=&z=16&ie=UTF8&iwloc=&output=embed"
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
      <div className="absolute left-5 top-5 flex items-center gap-2 border border-white/30 bg-black/70 px-3 py-2 backdrop-blur-sm shadow-md">
        <span className="h-2 w-2 rounded-full bg-primary animate-pulse-dot" />
        <span className="font-mono-ui text-[10px] uppercase tracking-[.14em] text-white">Inspection bay / live view</span>
      </div>
      {Object.entries(spots).map(([id, spot]) => (
        <button
          key={id}
          type="button"
          onClick={() => setSelected(id as HotspotId)}
          className={`focus-ring absolute grid h-10 w-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border transition-all ${
            selected === id
              ? 'scale-110 border-accent bg-accent text-accent-foreground ring-4 ring-accent/30'
              : 'border-white/80 bg-black/70 text-white hover:border-accent hover:bg-accent hover:text-accent-foreground'
          }`}
          style={{ left: spot.x, top: spot.y }}
          aria-label={`Show ${spot.title}`}
          aria-pressed={selected === id}
          data-testid={`button-hotspot-${id}`}
        >
          {spot.icon}
        </button>
      ))}
      <div className="absolute bottom-0 left-0 right-0 border-t border-white/15 bg-[#0b0d0e]/95 p-5 backdrop-blur-sm sm:p-6">
        <div className="flex items-start gap-4">
          <span className="mt-1 text-primary">{active.icon}</span>
          <div>
            <p className="eyebrow mb-2 text-primary font-semibold">Selected inspection point</p>
            <h3 className="font-display text-2xl uppercase tracking-[.03em] text-foreground">{active.title}</h3>
            <p className="mt-1 max-w-xl text-sm leading-6 text-muted-foreground">{active.copy}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function SpecialsModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl sm:max-w-3xl border border-white/15 bg-card text-card-foreground p-6 sm:p-8">
        <DialogHeader className="text-left space-y-2">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-primary" />
            <span className="eyebrow text-primary font-bold">CURRENT SERVICE SPECIALS</span>
          </div>
          <DialogTitle className="font-display text-3xl sm:text-4xl uppercase tracking-tight text-foreground">
            EXCLUSIVE SHOP SPECIAL OFFERS
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Save on essential vehicle maintenance at Pitts Stop Auto. Mention these specials when calling or scheduling your visit.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-5 sm:grid-cols-2 mt-2">
          {/* SPECIAL 1: FULL SYNTHETIC OIL & FILTER */}
          <div className="relative flex flex-col justify-between border-2 border-primary/40 bg-primary/5 p-6 rounded-md hover:border-primary transition-colors">
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="inline-flex items-center gap-1.5 rounded bg-primary/10 px-2.5 py-1 font-mono-ui text-[10px] font-bold uppercase tracking-wider text-primary border border-primary/20">
                  <Sparkles size={12} /> Oil Service Special
                </span>
                <span className="eyebrow text-accent font-semibold">SPECIAL OFFER</span>
              </div>
              <h3 className="font-display text-2xl uppercase tracking-tight text-foreground">
                Full Synthetic Oil & Filter
              </h3>
              <div className="my-4 flex items-baseline gap-2">
                <span className="font-display text-4xl sm:text-5xl font-bold text-primary tracking-tight">$85</span>
                <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">and above</span>
              </div>
              <ul className="space-y-2 text-xs text-muted-foreground border-t border-border pt-4">
                <li className="flex items-start gap-2">
                  <Check size={14} className="text-primary mt-0.5 shrink-0" />
                  <span>Full synthetic motor oil service</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check size={14} className="text-primary mt-0.5 shrink-0" />
                  <span>New premium oil filter installation</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check size={14} className="text-primary mt-0.5 shrink-0" />
                  <span>Comprehensive 20-point vehicle safety check</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check size={14} className="text-primary mt-0.5 shrink-0" />
                  <span>Vital fluids inspection & courtesy top-off</span>
                </li>
              </ul>
            </div>
            <p className="mt-4 text-[10px] text-muted-foreground/80 italic border-t border-border/60 pt-2">
              *$85 and above depending on vehicle engine oil capacity and filter specifications.
            </p>
          </div>

          {/* SPECIAL 2: BRAKE PADS & ROTORS WITH WARRANTY */}
          <div className="relative flex flex-col justify-between border-2 border-accent/40 bg-accent/5 p-6 rounded-md hover:border-accent transition-colors">
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="inline-flex items-center gap-1.5 rounded bg-accent/15 px-2.5 py-1 font-mono-ui text-[10px] font-bold uppercase tracking-wider text-accent border border-accent/30">
                  <ShieldCheck size={12} /> Brake Care Package
                </span>
                <span className="eyebrow text-primary font-semibold">WARRANTY INCLUDED</span>
              </div>
              <h3 className="font-display text-2xl uppercase tracking-tight text-foreground">
                Brake Pads & Rotors
              </h3>
              <div className="my-4 flex items-baseline gap-2">
                <span className="font-display text-4xl sm:text-5xl font-bold text-accent tracking-tight">$425</span>
                <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">and above</span>
              </div>
              <div className="mb-4 inline-flex items-center gap-1.5 rounded bg-primary/10 border border-primary/25 px-3 py-1.5 text-xs font-bold text-primary">
                <ShieldCheck size={14} className="shrink-0" />
                <span>1 Year / 12,000 Miles Warranty</span>
              </div>
              <ul className="space-y-2 text-xs text-muted-foreground border-t border-border pt-4">
                <li className="flex items-start gap-2">
                  <Check size={14} className="text-accent mt-0.5 shrink-0" />
                  <span>Premium replacement brake pads (front or rear)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check size={14} className="text-accent mt-0.5 shrink-0" />
                  <span>Precision replacement brake rotors</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check size={14} className="text-accent mt-0.5 shrink-0" />
                  <span>Complete 1 Year / 12,000 Miles Warranty coverage</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check size={14} className="text-accent mt-0.5 shrink-0" />
                  <span>Hardware inspection, brake line check & road test</span>
                </li>
              </ul>
            </div>
            <p className="mt-4 text-[10px] text-muted-foreground/80 italic border-t border-border/60 pt-2">
              *Starting from $425 and above based on vehicle make, model, and axle specifications.
            </p>
          </div>
        </div>

        {/* FOOTER ACTIONS */}
        <div className="mt-5 border-t border-border pt-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-muted-foreground text-center sm:text-left">
            <span className="font-semibold text-foreground block">Pitts Stop Auto · 4734 Baum Blvd, Pittsburgh PA</span>
            <span>Mon–Fri: 8:00 AM – 6:00 PM · Closed Sat & Sun</span>
          </div>
          <div className="flex flex-wrap gap-2.5 w-full sm:w-auto justify-center sm:justify-end">
            <a
              href="tel:+14126825255"
              className="focus-ring inline-flex items-center gap-2 bg-primary px-5 py-3 text-xs font-bold uppercase tracking-[.12em] text-primary-foreground hover:bg-[#d7352d] transition-colors"
            >
              <Phone size={14} /> Call (412) 682-5255
            </a>
            <a
              href="https://wa.me/14126825255?text=Hi%20Pitts%20Stop%20Auto%2C%20I%20would%20like%20to%20claim%20one%20of%20your%20current%20service%20specials!"
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring inline-flex items-center gap-2 border border-border bg-card px-4 py-3 text-xs font-bold uppercase tracking-[.12em] text-foreground hover:border-primary hover:text-primary transition-colors"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function HomePage() {
  const [specialsModalOpen, setSpecialsModalOpen] = useState(false);

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
                Domestic & Foreign · State Inspection · Minor & Major Repairs<br />
                <span className="text-foreground">4734 Baum Blvd, Pittsburgh PA 15213 · (412) 682-5255</span>
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
              <p className="mt-2 text-sm text-muted-foreground max-w-2xl">
                Featuring <span className="text-foreground font-semibold">Full Synthetic Oil & Filter ($85 and above)</span> and <span className="text-foreground font-semibold">Brake Pads & Rotors with 1-Year / 12,000-Mile Warranty ($425 and above)</span>.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setSpecialsModalOpen(true)}
              className="focus-ring shrink-0 inline-flex items-center gap-3 bg-primary px-6 py-4 text-xs font-bold uppercase tracking-[.14em] text-primary-foreground hover:bg-[#d7352d] transition-colors cursor-pointer"
              data-testid="button-home-specials"
            >
              SPECIALS <ArrowRight size={15} />
            </button>
          </div>
        </div>
        <SpecialsModal open={specialsModalOpen} onOpenChange={setSpecialsModalOpen} />
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
              Oil change with 20-point checks, official PA state inspections (safety & emissions), brake service, exhaust & muffler repairs, and A/C service.
            </p>
          </div>

          <div className="border border-white/15 bg-[#111416] p-6">
            <span className="font-mono-ui text-xs text-primary">02</span>
            <div className="my-5 grid h-10 w-10 place-items-center border border-primary/60 text-primary">
              <Gauge size={20} />
            </div>
            <h3 className="font-display text-2xl uppercase">Diagnostics</h3>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Check engine light diagnosis, electrical & battery repair, steering & suspension, timing belts, tire service, and used-car inspections.
            </p>
          </div>

          <div className="border border-white/15 bg-[#111416] p-6">
            <span className="font-mono-ui text-xs text-primary">03</span>
            <div className="my-5 grid h-10 w-10 place-items-center border border-primary/60 text-primary">
              <Wrench size={20} />
            </div>
            <h3 className="font-display text-2xl uppercase">Most car makes</h3>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Domestic & foreign cars, small trucks, classic cars, and hybrid vehicles. European specialties (Volvo, SAAB, Audi, VW) & Asian makes (Honda, Toyota, Nissan).
            </p>
          </div>

          <div className="border border-white/15 bg-[#111416] p-6">
            <span className="font-mono-ui text-xs text-primary">04</span>
            <div className="my-5 grid h-10 w-10 place-items-center border border-primary/60 text-primary">
              <Hammer size={20} />
            </div>
            <h3 className="font-display text-2xl uppercase">Major Repairs</h3>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Engine service & replacement (used or rebuilt), transmission service & replacement, head gasket & valve jobs, and clutch replacement.
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
              <div className="mb-5 flex items-center gap-3 border-b border-white/10 pb-4">
                <img src={logoImg} alt="Pitts Stop Auto Logo" className="h-12 w-auto object-contain" />
                <div>
                  <p className="eyebrow text-accent">Pittsburgh Car Care Center</p>
                  <h3 className="font-display text-2xl uppercase">Pitts Stop Auto</h3>
                </div>
              </div>
              <div className="mt-6 space-y-4 text-sm text-muted-foreground">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 shrink-0 text-primary" size={18} />
                  <div>
                    <span className="font-semibold text-foreground block">Address</span>
                    <span>4734 Baum Blvd, Pittsburgh PA 15213</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock3 className="mt-0.5 shrink-0 text-primary" size={18} />
                  <div>
                    <span className="font-semibold text-foreground block">Shop Hours</span>
                    <p>Mon – Fri: <span className="text-foreground font-medium">8:00 AM – 6:00 PM</span></p>
                    <p>Sat & Sun: <span className="text-foreground font-medium">Closed</span></p>
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

              <div className="mt-6 pt-5 border-t border-white/10">
                <span className="eyebrow text-accent block mb-2.5">Shop Amenities</span>
                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="inline-flex items-center gap-1.5 rounded border border-white/10 bg-white/5 px-2.5 py-1 text-muted-foreground">
                    <Check size={12} className="text-accent" /> Restroom
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded border border-white/10 bg-white/5 px-2.5 py-1 text-muted-foreground">
                    <Check size={12} className="text-accent" /> Gender-neutral restroom
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded border border-white/10 bg-white/5 px-2.5 py-1 text-muted-foreground">
                    <Wifi size={12} className="text-accent" /> Free WiFi
                  </span>
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
                href="https://www.google.com/maps/dir/?api=1&destination=4734+Baum+Blvd,+Pittsburgh+PA+15213"
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
    <section className="border-t border-primary/30 bg-primary px-5 py-12 text-white lg:px-10 lg:py-16">
      <div className="mx-auto flex max-w-[1320px] flex-col items-start justify-between gap-8 md:flex-row md:items-center">
        <div>
          <p className="eyebrow mb-3 !text-white/85">Pitts Stop Auto · Car Care Center</p>
          <h2 className="font-display text-5xl uppercase leading-[.88] sm:text-6xl text-white">
            Professional Care.<br />Personal Service.
          </h2>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href="tel:+14126825255"
            className="focus-ring inline-flex items-center gap-2 border border-white/40 bg-white/15 px-5 py-4 text-[11px] font-bold uppercase tracking-[.12em] text-white hover:bg-white hover:text-black transition-colors"
            data-testid="link-cta-phone"
          >
            <Phone size={15} /> (412) 682-5255
          </a>
          <Link
            href="/contact#estimate"
            className="focus-ring inline-flex items-center justify-center gap-3 border border-white/40 bg-black/20 px-5 py-4 text-[11px] font-bold uppercase tracking-[.12em] text-white hover:bg-white hover:text-black transition-all"
            data-testid="link-cta-estimate"
          >
            Request an estimate <ArrowRight size={15} />
          </Link>
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
    subtitle: 'Domestic & foreign coverage, European specialties, classic & hybrid vehicles',
    icon: <Wrench size={22} />,
    description: 'Pitts Stop Auto services domestic and foreign cars, small trucks, classic cars, and modern hybrid vehicles.',
    specialty: 'Specialty: European cars (Volvo, SAAB, Audi, VW, Jaguar, Land/Range Rover), Asian makes (Honda, Toyota, Mazda, Nissan), classic cars, and hybrid vehicle diagnostics.',
    items: [
      'Domestic & Foreign cars and small trucks',
      'Classic cars and vintage vehicle service & repair',
      'Hybrid cars service, system diagnostics & battery maintenance',
      'European specialty: Volvo, SAAB, Audi, VW',
      'Asian makes: Honda, Toyota, Mazda, Nissan',
      'European luxury: Jaguar, Land/Range Rover',
    ],
  },
  {
    id: 'diagnostics',
    title: 'Diagnostics',
    subtitle: 'Check engine light, electrical, battery & suspension diagnostics',
    icon: <Gauge size={22} />,
    description: 'Thorough computerized inspection and component diagnostics to pinpoint issues accurately before any work begins.',
    items: [
      'Check engine light diagnosis & computerized system scans',
      'Electrical repair & wiring troubleshooting (Alternators, starters, lighting)',
      'Battery service, charging system testing & battery replacement',
      'Steering & suspension service (Front/rear springs, struts, tie rods, ball joints, steering racks)',
      'Timing belts and water pumps',
      'Tire service & repair, plus good-condition used tires (80% tread)',
      'Used-car pre-purchase inspections & buying advice',
    ],
  },
  {
    id: 'major',
    title: 'Major Repairs',
    subtitle: 'Powertrain, transmission & mechanical overhauls',
    icon: <Hammer size={22} />,
    description: 'Major repair services for engines, transmissions, and critical drivetrain mechanicals.',
    items: [
      'Engine service & repair: engine removal and replacement (Used or rebuilt engines)',
      'Transmission service & repair: removal and replacement (Used or rebuilt units)',
      'Head gasket and cylinder head valve work',
      'Clutch service, flywheels, and manual gearbox repair',
    ],
  },
  {
    id: 'minor',
    title: 'Minor repairs',
    subtitle: 'Inspections, brakes, exhaust, oil & climate control',
    icon: <Sparkles size={22} />,
    description: 'Essential maintenance and minor repairs to keep your vehicle running smoothly, safely, and cleanly.',
    items: [
      'Oil change with comprehensive 20-point safety check',
      'Vehicle inspections: Pennsylvania state safety & emissions inspections',
      'Brake service & repair (Pads, rotors, drums, calipers & hydraulic lines)',
      'Exhaust & muffler service (Muffler replacement, exhaust pipes, catalytic converters)',
      'Air conditioning check, repair, and recharge',
      'Heating system check and climate control repairs',
      'Tune-ups, fluid exchanges & preventative maintenance',
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
            4734 Baum Blvd, Pittsburgh PA 15213 · customers@pittsstopauto.com
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
      'What are your shop operating hours?',
      'Pitts Stop Auto is open Monday through Friday from 8:00 AM to 6:00 PM. We are closed on Saturday and Sunday.',
    ],
    [
      'What car makes and models do you service?',
      'We service domestic and foreign cars, small trucks, classic cars, and hybrid vehicles. Our specialty includes European cars such as Volvo, SAAB, Audi, VW, Jaguar, and Land/Range Rover, as well as Asian makes including Honda, Toyota, Mazda, and Nissan.',
    ],
    [
      'Do you service classic cars and hybrid vehicles?',
      'Yes! Pitts Stop Auto proudly services classic cars and vintage vehicles as well as modern hybrid models with dedicated diagnostics and repairs.',
    ],
    [
      'Do you offer exhaust and muffler repair services?',
      'Yes, we provide full exhaust & muffler service including muffler replacement, exhaust pipes, catalytic converters, and emissions fixes.',
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
      'Yes, we provide official Pennsylvania safety and emissions state inspections.',
    ],
    [
      'What amenities are available at the shop?',
      'We provide a comfortable waiting area with clean restrooms (including gender-neutral restroom access) and free customer WiFi.',
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
  const [form, setForm] = useState({ name: '', email: '', vehicle: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [lastMailto, setLastMailto] = useState('');

  const update = (field: keyof typeof form, value: string) => setForm((current) => ({ ...current, [field]: value }));

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const next: Record<string, string> = {};
    if (!form.name.trim()) next.name = 'Please enter your name.';
    if (!form.email.trim()) {
      next.email = 'Please enter your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      next.email = 'Please enter a valid email address.';
    }
    if (!form.message.trim()) next.message = 'Please describe the service or diagnostic you need.';
    setErrors(next);

    if (!Object.keys(next).length) {
      const subject = encodeURIComponent(`Estimate / Service Inquiry - ${form.name.trim()}`);
      const body = encodeURIComponent(
        `Hello Pitts Stop Auto,\n\n` +
        `I would like to request an estimate / service inquiry.\n\n` +
        `Customer Details:\n` +
        `• Name: ${form.name.trim()}\n` +
        `• Email: ${form.email.trim()}\n` +
        `• Vehicle: ${form.vehicle.trim() || 'Not specified'}\n\n` +
        `Service / Diagnostic Needed:\n${form.message.trim()}\n\n` +
        `Best regards,\n${form.name.trim()}`
      );
      const mailtoUrl = `mailto:customers@pittsstopauto.com?subject=${subject}&body=${body}`;
      setLastMailto(mailtoUrl);
      setSubmitted(true);
      window.location.href = mailtoUrl;
    }
  };

  if (submitted) {
    return (
      <div className="border border-accent/50 bg-accent/10 p-8 sm:p-10" role="status" data-testid="status-estimate-success">
        <div className="mb-6 grid h-12 w-12 place-items-center bg-accent text-accent-foreground">
          <Check size={24} />
        </div>
        <p className="eyebrow mb-3 text-accent">Request prepared</p>
        <h3 className="font-display text-4xl uppercase">Thank you, {form.name}.</h3>
        <p className="mt-4 max-w-md text-sm leading-7 text-muted-foreground">
          We have generated your pre-filled inquiry addressed to <a href="mailto:customers@pittsstopauto.com" className="font-semibold text-foreground underline">customers@pittsstopauto.com</a>. Your email client should open automatically.
        </p>
        <p className="mt-2 max-w-md text-sm leading-7 text-muted-foreground">
          If your email app did not open automatically, click the button below to launch it directly, or call us at <a href="tel:+14126825255" className="text-foreground underline font-semibold">(412) 682-5255</a>.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-4">
          {lastMailto && (
            <a
              href={lastMailto}
              className="focus-ring inline-flex items-center gap-2 bg-primary px-5 py-3 text-xs font-bold uppercase tracking-[.12em] text-primary-foreground hover:bg-[#d7352d] transition-colors"
              data-testid="link-open-email-client"
            >
              <Mail size={15} /> Open Email Client
            </a>
          )}
          <button
            type="button"
            onClick={() => {
              setSubmitted(false);
              setForm({ name: '', email: '', vehicle: '', message: '' });
              setLastMailto('');
            }}
            className="focus-ring border-b border-accent pb-1 text-xs font-bold uppercase tracking-[.12em] text-accent hover:text-accent/80 transition-colors"
            data-testid="button-new-estimate"
          >
            Send another message
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="space-y-5" id="estimate" data-testid="form-estimate">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Your name"
          placeholder="e.g. John Doe"
          value={form.name}
          onChange={(v) => update('name', v)}
          error={errors.name}
          required
          testId="input-name"
        />
        <Field
          label="Your email"
          type="email"
          placeholder="e.g. name@example.com"
          value={form.email}
          onChange={(v) => update('email', v)}
          error={errors.email}
          required
          testId="input-email"
        />
      </div>
      <Field
        label="Vehicle (year / make / model)"
        placeholder="e.g. 2018 Honda Civic"
        value={form.vehicle}
        onChange={(v) => update('vehicle', v)}
        testId="input-vehicle"
      />
      <Field
        label="What service or diagnostic do you need?"
        placeholder="Describe the issue, inspection, or service needed..."
        value={form.message}
        onChange={(v) => update('message', v)}
        error={errors.message}
        required
        textarea
        testId="input-message"
      />
      <div className="flex flex-col items-start justify-between gap-4 border-t border-border pt-5 sm:flex-row sm:items-center">
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
  type = 'text',
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  textarea?: boolean;
  testId: string;
  type?: string;
  placeholder?: string;
}) {
  const Tag = textarea ? 'textarea' : 'input';
  return (
    <label className="block text-left">
      <span className="mb-2 block font-mono-ui text-[10px] uppercase tracking-[.12em] text-muted-foreground">
        {label}
        {required && <span className="ml-1 text-primary">*</span>}
      </span>
      <Tag
        type={textarea ? undefined : type}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={`focus-ring min-h-12 w-full resize-y border bg-card text-card-foreground px-4 py-3 text-sm placeholder:text-muted-foreground/60 ${
          textarea ? 'min-h-32' : ''
        } ${error ? 'border-primary' : 'border-border'}`}
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
      description="Contact Pitts Stop Auto in Pittsburgh, PA: 4734 Baum Blvd, (412) 682-5255, customers@pittsstopauto.com."
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
            <div className="mb-6 flex items-center gap-3">
              <img src={logoImg} alt="Pitts Stop Auto Logo" className="h-12 w-auto object-contain" />
              <h2 className="font-display text-4xl uppercase">CONTACT INFORMATION</h2>
            </div>
            <div className="space-y-6 text-sm">
              <div className="flex gap-4">
                <MapPin className="shrink-0 text-primary" size={20} />
                <div>
                  <p className="eyebrow mb-1 text-foreground">Address</p>
                  <p className="text-muted-foreground">4734 Baum Blvd, Pittsburgh PA 15213</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Clock3 className="shrink-0 text-primary" size={20} />
                <div>
                  <p className="eyebrow mb-1 text-foreground">Shop Hours</p>
                  <p className="text-muted-foreground">Monday – Friday: <span className="text-foreground font-medium">8:00 AM – 6:00 PM</span></p>
                  <p className="text-muted-foreground">Saturday – Sunday: <span className="text-foreground font-medium">Closed</span></p>
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

              <div className="mt-8 pt-6 border-t border-border">
                <p className="eyebrow mb-3 text-accent">Customer Amenities</p>
                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="inline-flex items-center gap-1.5 rounded border border-border bg-muted/30 px-3 py-1.5 text-muted-foreground">
                    <Check size={13} className="text-accent" /> Restroom
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded border border-border bg-muted/30 px-3 py-1.5 text-muted-foreground">
                    <Check size={13} className="text-accent" /> Gender-neutral restroom
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded border border-border bg-muted/30 px-3 py-1.5 text-muted-foreground">
                    <Wifi size={13} className="text-accent" /> Free WiFi
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-border pt-7">
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
                className="focus-ring inline-flex items-center gap-2 border border-border px-4 py-3 text-xs font-bold uppercase tracking-[.12em] text-foreground hover:border-primary hover:bg-primary/10 transition-colors"
                data-testid="link-action-email"
              >
                <Mail size={14} /> Email Us
              </a>
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=4734+Baum+Blvd,+Pittsburgh+PA+15213"
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring inline-flex items-center gap-2 border border-border px-4 py-3 text-xs font-bold uppercase tracking-[.12em] text-foreground hover:border-primary hover:bg-primary/10 transition-colors"
                data-testid="link-action-directions"
              >
                <Navigation size={14} /> Directions
              </a>
            </div>
          </div>
        </div>

        <div className="border border-border bg-card p-6 sm:p-10 shadow-sm">
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
    if (typeof window === 'undefined') return 'light';
    const previewTheme = new URLSearchParams(window.location.search).get('theme');
    if (previewTheme === 'light' || previewTheme === 'dark') return previewTheme;
    const stored = window.localStorage.getItem('pitts-stop-theme-v2');
    if (stored === 'dark' || stored === 'light') return stored;
    return 'light';
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.classList.toggle('light', theme === 'light');
    document.documentElement.style.colorScheme = theme;
    window.localStorage.setItem('pitts-stop-theme-v2', theme);
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