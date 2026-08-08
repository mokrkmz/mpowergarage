const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const PHONE_DISPLAY = '+44 7444 924 382';
const PHONE_TEL = '+447444924382';
const WHATSAPP = '447444924382';
const EMAIL = 'info@mpowergarage.com';
const ADDRESS_LINE = '1 Vale Grove';
const ADDRESS_LOCALITY = 'Acton';
const ADDRESS_REGION = 'London';
const POSTCODE = 'W3 7QP';
const FULL_ADDRESS = `${ADDRESS_LINE}, ${ADDRESS_LOCALITY}, ${ADDRESS_REGION} ${POSTCODE}`;
const SITE = 'https://mpowergarage.co.uk';
const WA_BASE = `https://wa.me/${WHATSAPP}`;
const LAT = 51.5059715;
const LNG = -0.2616248;
const MAPS_QUERY = encodeURIComponent(FULL_ADDRESS);
const MAPS_LINK = `https://www.google.com/maps/search/?api=1&query=${MAPS_QUERY}`;
const MAPS_EMBED = `https://maps.google.com/maps?q=${MAPS_QUERY}&z=15&output=embed`;

function waLink(text) {
  return `${WA_BASE}?text=${encodeURIComponent(text)}`;
}

function schemaBusiness() {
  return {
    '@context': 'https://schema.org',
    '@type': ['AutoRepair', 'LocalBusiness'],
    '@id': `${SITE}/#business`,
    name: 'MPower Garage',
    alternateName: 'MPower Garage Mobile Mechanic',
    url: SITE,
    telephone: PHONE_DISPLAY,
    email: EMAIL,
    image: [`${SITE}/images/og-image.jpg`, `${SITE}/images/hero.jpg`],
    logo: `${SITE}/favicon.svg`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: ADDRESS_LINE,
      addressLocality: ADDRESS_LOCALITY,
      addressRegion: ADDRESS_REGION,
      postalCode: POSTCODE,
      addressCountry: 'GB'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: LAT,
      longitude: LNG
    },
    hasMap: MAPS_LINK,
    areaServed: [
      { '@type': 'City', name: 'Acton' },
      { '@type': 'City', name: 'Ealing' },
      { '@type': 'City', name: 'Hanwell' },
      { '@type': 'City', name: 'Southall' },
      { '@type': 'City', name: 'Chiswick' },
      { '@type': 'AdministrativeArea', name: 'West London' }
    ],
    description: 'Mobile mechanic and auto repair covering Acton, Ealing and West London. Car servicing, MOT preparation, diagnostics, brakes and tyres — we come to you.',
    priceRange: '££',
    currenciesAccepted: 'GBP',
    paymentAccepted: 'Cash, Card, Bank Transfer',
    openingHoursSpecification: [
      { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '08:00', closes: '18:00' },
      { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Saturday', opens: '08:00', closes: '14:00' }
    ],
    knowsAbout: [
      'Mobile car servicing',
      'MOT preparation',
      'Engine diagnostics',
      'Brake repair',
      'Suspension repair'
    ]
  };
}

function breadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: it.href.startsWith('http') ? it.href : `${SITE}/${it.href === 'index.html' ? '' : it.href}`
    }))
  };
}

function breadcrumbs(items) {
  const parts = items.map((it, i) => {
    const last = i === items.length - 1;
    if (last) return `<span aria-current="page">${it.name}</span>`;
    return `<a href="${it.href}">${it.name}</a><span>/</span>`;
  }).join('');
  return `<nav class="breadcrumbs" aria-label="Breadcrumb">${parts}</nav>`;
}

function nav(active) {
  const items = [
    ['index.html', 'Home', 'home'],
    ['services.html', 'Services', 'services'],
    ['pricing.html', 'Pricing', 'pricing'],
    ['about.html', 'About', 'about'],
    ['contact.html', 'Contact', 'contact']
  ];
  const links = items.map(([href, label, key]) => {
    const cls = key === active ? ' class="active"' : '';
    return `<li><a href="${href}"${cls}>${label}</a></li>`;
  }).join('\n        ');
  return `<div class="m-stripe"></div>
<nav>
  <div class="nav-inner">
    <a href="index.html" class="logo">
      <div class="logo-badge"><span></span><span></span><span></span></div>
      <div class="logo-text">M<em>POWER</em> GARAGE</div>
    </a>
    <ul class="nav-links">
        ${links}
      <li class="nav-cta-group">
        <a href="${WA_BASE}" class="cta-wa-nav" target="_blank" rel="noopener">WhatsApp</a>
        <a href="tel:${PHONE_TEL}" class="cta">Call</a>
      </li>
    </ul>
    <div class="hamburger" onclick="toggleMenu()" aria-label="Menu">
      <span></span><span></span><span></span>
    </div>
  </div>
</nav>
<div class="mobile-menu" id="mobile-menu">
  <a href="index.html">Home</a>
  <a href="services.html">Services</a>
  <a href="mobile-mechanic-acton.html">Mobile Mechanic Acton</a>
  <a href="mobile-mechanic-ealing.html">Mobile Mechanic Ealing</a>
  <a href="areas-we-cover.html">Areas We Cover</a>
  <a href="blog.html">Advice</a>
  <a href="pricing.html">Pricing</a>
  <a href="about.html">About</a>
  <a href="contact.html">Contact</a>
  <a href="tel:${PHONE_TEL}">Call ${PHONE_DISPLAY}</a>
  <a href="${WA_BASE}" target="_blank" rel="noopener">WhatsApp Us</a>
</div>`;
}

function footer() {
  return `<footer>
  <div class="footer-inner">
    <div class="footer-brand">
      <div class="logo" style="text-decoration:none;cursor:default;">
        <div class="logo-badge"><span></span><span></span><span></span></div>
        <div class="logo-text">M<em>POWER</em> GARAGE</div>
      </div>
      <p>Mobile mechanic serving Acton, Ealing and West London. Honest diagnostics, quality parts and clear pricing — we come to you.</p>
      <p style="margin-top:0.75rem;font-size:13px;color:var(--muted);">${FULL_ADDRESS}<br><a href="tel:${PHONE_TEL}" style="color:var(--m-blue);text-decoration:none;">${PHONE_DISPLAY}</a></p>
    </div>
    <div class="footer-col">
      <h4>SERVICES</h4>
      <a href="diagnostics.html">Engine Diagnostics</a>
      <a href="brakes-and-suspension.html">Brakes &amp; Suspension</a>
      <a href="mot-service.html">MOT Preparation</a>
      <a href="car-servicing.html">Car Servicing</a>
      <a href="services.html">All Services</a>
      <a href="blog.html">Car Advice</a>
    </div>
    <div class="footer-col">
      <h4>AREAS &amp; MAKES</h4>
      <a href="mobile-mechanic-acton.html">Acton</a>
      <a href="mobile-mechanic-ealing.html">Ealing</a>
      <a href="bmw-service-acton.html">BMW Service</a>
      <a href="mercedes-service-west-london.html">Mercedes Service</a>
      <a href="toyota-service-ealing.html">Toyota Service</a>
      <a href="sitemap.html">Sitemap</a>
    </div>
  </div>
  <div class="footer-bottom">
    <p>&copy; 2026 mpowergarage.co.uk — All rights reserved</p>
    <p><a href="mailto:${EMAIL}" style="color:inherit;text-decoration:none;">${EMAIL}</a></p>
  </div>
</footer>
<div class="sticky-cta" aria-label="Quick contact">
  <a class="cta-call" href="tel:${PHONE_TEL}">CALL NOW</a>
  <a class="cta-wa" href="${WA_BASE}" target="_blank" rel="noopener">WHATSAPP</a>
</div>
<script src="js/main.js"></script>`;
}

function ctaRow(waText) {
  return `<div class="cta-row">
  <a href="tel:${PHONE_TEL}" class="btn-red">CALL ${PHONE_DISPLAY}</a>
  <a href="${waLink(waText)}" class="btn-wa" target="_blank" rel="noopener">WHATSAPP US</a>
</div>`;
}

function layout({ title, description, canonical, active, schemaExtra, body, ogTitle, keywords, preloadHero, noindex }) {
  const schemas = [schemaBusiness()];
  if (schemaExtra) {
    if (Array.isArray(schemaExtra)) schemas.push(...schemaExtra);
    else schemas.push(schemaExtra);
  }
  const schemaScripts = schemas.map(s =>
    `<script type="application/ld+json">\n${JSON.stringify(s, null, 2)}\n  </script>`
  ).join('\n  ');
  const pageUrl = `${SITE}/${canonical === 'index.html' ? '' : canonical}`;
  const robots = noindex ? 'noindex, follow' : 'index, follow';
  const kw = keywords
    ? `\n  <meta name="keywords" content="${keywords}" />`
    : '';
  const preload = preloadHero
    ? `\n  <link rel="preload" as="image" href="images/hero.jpg" fetchpriority="high" />`
    : '';

  return `<!DOCTYPE html>
<html lang="en-GB">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
  <meta name="description" content="${description}" />
  <meta name="robots" content="${robots}" />${kw}
  <link rel="canonical" href="${pageUrl}" />
  <link rel="icon" href="favicon.svg" type="image/svg+xml" />
  <link rel="apple-touch-icon" href="images/og-image.jpg" />
  <meta property="og:site_name" content="MPower Garage" />
  <meta property="og:locale" content="en_GB" />
  <meta property="og:title" content="${ogTitle || title}" />
  <meta property="og:description" content="${description}" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="${pageUrl}" />
  <meta property="og:image" content="${SITE}/images/og-image.jpg" />
  <meta property="og:image:alt" content="MPower Garage mobile mechanic West London" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${ogTitle || title}" />
  <meta name="twitter:description" content="${description}" />
  <meta name="twitter:image" content="${SITE}/images/og-image.jpg" />
  <meta name="geo.region" content="GB-LND" />
  <meta name="geo.placename" content="Acton, London" />
  <meta name="geo.position" content="${LAT};${LNG}" />
  <meta name="ICBM" content="${LAT}, ${LNG}" />
  <meta name="theme-color" content="#0066B1" />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>${preload}
  <link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;500;600;700&family=Barlow:wght@300;400;500&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/main.css" />
  ${schemaScripts}
</head>
<body>
${nav(active)}
${body}
${footer()}
</body>
</html>
`;
}

function faqSchema(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(([q, a]) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a }
    }))
  };
}

function faqHtml(faqs) {
  return `<div class="faq-list">
${faqs.map(([q, a]) => `    <div class="faq-item"><h3>${q}</h3><p>${a}</p></div>`).join('\n')}
  </div>`;
}

const pages = [];

pages.push({
  file: 'index.html',
  title: 'MPower Garage | Mobile Mechanic Acton & West London',
  description: 'Same-day mobile mechanic in Acton and West London. Car servicing, MOT prep, diagnostics and repairs — we come to you. Call or WhatsApp to book.',
  canonical: 'index.html',
  active: 'home',
  preloadHero: true,
  keywords: 'mobile mechanic Acton, mobile mechanic Ealing, car service West London, MOT preparation Acton, MPower Garage',
  body: `
<section class="page-section" id="home">
  <div class="hero">
    <div class="hero-accent"></div>
    <div class="hero-bg-text">MPG</div>
    <div class="hero-content">
      <div class="mobile-note">MOBILE MECHANIC · SAME-DAY SLOTS · WE COME TO YOU</div>
      <div class="hero-eyebrow">Professional Auto Service</div>
      <h1>
        <span>BUILT</span><br>
        <span class="line-blue">TO</span><br>
        <span class="line-red">PERFORM.</span>
      </h1>
      <p class="hero-sub">Same-day mobile car servicing and repairs across Acton, Ealing and West London. Diagnostics, MOT prep, brakes and full servicing — at your home or workplace. Call or WhatsApp now.</p>
      ${ctaRow('Hi MPower Garage, I need a same-day mobile mechanic visit if possible.')}
    </div>
    <div class="stats-row">
      <div class="stat-item">
        <div class="stat-num">12+</div>
        <div class="stat-label">YEARS EXPERIENCE</div>
      </div>
      <div class="stat-item">
        <div class="stat-num">WE COME</div>
        <div class="stat-label">TO YOU</div>
      </div>
      <div class="stat-item">
        <div class="stat-num">SAME DAY</div>
        <div class="stat-label">WHEN DIARY ALLOWS</div>
      </div>
    </div>
  </div>
</section>
<section class="page-section">
  <div class="page-wrap">
    <div class="section-eyebrow">What We Do</div>
    <h2 class="section-title">Full-range<br>mobile auto services</h2>
    <p class="section-sub">Serving drivers across Acton, Ealing, Hanwell, Southall and West London. We come to you with the tools and parts to get it done.</p>
    <div class="services-grid">
      <div class="service-card">
        <div class="service-num">01</div>
        <h3><a href="diagnostics.html">Engine Diagnostics →</a></h3>
        <p>Advanced computer diagnostics to identify faults quickly and accurately. No guesswork, just results.</p>
      </div>
      <div class="service-card">
        <div class="service-num">02</div>
        <h3><a href="car-servicing.html">Car Servicing →</a></h3>
        <p>Basic, full and major services using quality parts suited to your vehicle — carried out at your location.</p>
      </div>
      <div class="service-card">
        <div class="service-num">03</div>
        <h3><a href="mot-service.html">MOT Preparation →</a></h3>
        <p>Pre-MOT checks and annual service so you book your test with confidence.</p>
      </div>
      <div class="service-card">
        <div class="service-num">04</div>
        <h3><a href="brakes-and-suspension.html">Brakes &amp; Suspension →</a></h3>
        <p>Pads, discs, calipers, shock absorbers and steering components. Safe stopping, sorted.</p>
      </div>
      <div class="service-card">
        <div class="service-num">05</div>
        <h3><a href="services.html">Tyres, Electrics &amp; More →</a></h3>
        <p>Batteries, alternators, AC, fluid top-ups and more. See the full list of mobile services.</p>
      </div>
      <div class="service-card">
        <div class="service-num">06</div>
        <h3><a href="mobile-mechanic-acton.html">Mobile Mechanic Acton →</a></h3>
        <p>Local mobile mechanic covering Acton W3 and nearby West London — book by call or WhatsApp.</p>
      </div>
    </div>
    <p style="margin-top:1.5rem;"><a href="areas-we-cover.html" style="color:var(--m-blue);font-family:var(--font-display);letter-spacing:0.08em;text-decoration:none;">AREAS WE COVER →</a>
    &nbsp;&nbsp;<a href="mobile-mechanic-ealing.html" style="color:var(--m-blue);font-family:var(--font-display);letter-spacing:0.08em;text-decoration:none;">EALING →</a></p>
  </div>
</section>
<section class="page-section">
  <div class="page-wrap">
    <div class="section-eyebrow">Pricing</div>
    <h2 class="section-title">Transparent,<br>fair pricing</h2>
    <p class="section-sub">No hidden charges. You approve every cost before we start work on your vehicle.</p>
    <div class="pricing-grid">
      <div class="price-card">
        <div class="price-tier">ESSENTIAL</div>
        <h3>Basic Service</h3>
        <div class="price-amount">£59 <span>from</span></div>
        <ul class="price-list">
          <li>Engine oil &amp; filter change</li>
          <li>Tyre pressure check</li>
          <li>All fluid top-ups</li>
          <li>Visual safety inspection</li>
        </ul>
      </div>
      <div class="price-card featured">
        <div class="featured-tag">MOST POPULAR</div>
        <div class="price-tier">FULL SERVICE</div>
        <h3>Full Service</h3>
        <div class="price-amount">£129 <span>from</span></div>
        <ul class="price-list">
          <li>Everything in Basic</li>
          <li>Brake &amp; pad inspection</li>
          <li>Air &amp; cabin filters</li>
          <li>Computer diagnostics scan</li>
          <li>60-point vehicle check</li>
        </ul>
      </div>
      <div class="price-card">
        <div class="price-tier">PREMIUM</div>
        <h3>Major Service</h3>
        <div class="price-amount">£229 <span>from</span></div>
        <ul class="price-list">
          <li>Everything in Full Service</li>
          <li>Spark plugs &amp; timing belt check</li>
          <li>Gearbox fluid service</li>
          <li>Coolant system flush</li>
          <li>12-month parts &amp; labour warranty</li>
        </ul>
      </div>
    </div>
    <p style="margin-top:1.5rem;"><a href="pricing.html" style="color:var(--m-blue);font-family:var(--font-display);letter-spacing:0.08em;text-decoration:none;">FULL PRICING DETAILS →</a></p>
  </div>
</section>
`
});

pages.push({
  file: 'services.html',
  title: 'Car Services | Mobile Mechanic Acton | MPower Garage',
  description: 'Same-day mobile car services in Acton and West London: diagnostics, servicing, MOT prep, brakes, tyres and electrics. Book MPower Garage by call or WhatsApp.',
  canonical: 'services.html',
  active: 'services',
  body: `
<section class="page-section">
  <div class="page-hero">
    <div class="mobile-note">SAME-DAY SLOTS WHEN AVAILABLE</div>
    <div class="section-eyebrow">Services</div>
    <h1>Mobile auto<br>services</h1>
    <p class="section-sub" style="margin:0;">We bring the garage to you across Acton, Ealing and West London. See the <a href="service-list.html" style="color:var(--m-blue);">full service list</a> (GBP-ready names).</p>
    ${ctaRow('Hi, I need a quote for a mobile car service.')}
  </div>
  <div class="page-wrap" style="padding-top:0;">
    <div class="services-grid">
      <div class="service-card">
        <div class="service-num">01</div>
        <h3><a href="diagnostics.html">Engine Diagnostics →</a></h3>
        <p>Fault codes, warning lights and live data checks at your location.</p>
      </div>
      <div class="service-card">
        <div class="service-num">02</div>
        <h3><a href="car-servicing.html">Oil &amp; Full Servicing →</a></h3>
        <p>Basic, full and major services with premium-grade oils and filters.</p>
      </div>
      <div class="service-card">
        <div class="service-num">03</div>
        <h3><a href="mot-service.html">MOT Preparation →</a></h3>
        <p>Pre-MOT inspection and fixes so you are ready for the test centre.</p>
      </div>
      <div class="service-card">
        <div class="service-num">04</div>
        <h3><a href="brakes-and-suspension.html">Brakes &amp; Suspension →</a></h3>
        <p>Pads, discs, shocks and steering components with quality parts.</p>
      </div>
      <div class="service-card">
        <div class="service-num">05</div>
        <h3>Tyre &amp; Wheel</h3>
        <p>Mobile tyre fitting support, pressure checks and condition reports. Call to confirm sizes and availability.</p>
      </div>
      <div class="service-card">
        <div class="service-num">06</div>
        <h3>Electrics &amp; Air Con</h3>
        <p>Battery testing, starters, alternators and AC re-gas where suitable on-site.</p>
      </div>
    </div>
  </div>
</section>
`
});

const motFaqs = [
  ['Do you carry out the MOT test itself?', 'We provide MOT preparation and pre-MOT checks at your location. The official MOT is done at an approved test centre — we help you pass first time.'],
  ['Which areas do you cover?', 'We cover Acton, Ealing, Hanwell, Southall and wider West London. Message us your postcode to confirm.'],
  ['How do I book?', `Call ${PHONE_DISPLAY} or WhatsApp us with your vehicle details and preferred time.`]
];

const motCrumbs = [
  { name: 'Home', href: 'index.html' },
  { name: 'Services', href: 'services.html' },
  { name: 'MOT Preparation', href: 'mot-service.html' }
];

pages.push({
  file: 'mot-service.html',
  title: 'MOT Preparation Acton & West London | MPower Garage',
  description: 'Mobile MOT preparation in Acton and West London. Pre-MOT checks, lights, brakes and advisories sorted before your test. Call or WhatsApp MPower Garage.',
  canonical: 'mot-service.html',
  active: 'services',
  schemaExtra: [faqSchema(motFaqs), breadcrumbSchema(motCrumbs)],
  body: `
<section class="page-section">
  <div class="page-hero">
    ${breadcrumbs(motCrumbs)}
    <div class="mobile-note">MOBILE · ACTON W3</div>
    <div class="section-eyebrow">MOT</div>
    <h1>MOT preparation<br>at your door</h1>
    <div class="content-block">
      <p>Avoid a failed MOT. MPower Garage carries out thorough pre-MOT checks at your home or workplace across Acton and West London — lights, brakes, tyres, suspension and common failure points.</p>
      <p>We fix what we can on the day and give you a clear report before you book the test centre.</p>
    </div>
    ${ctaRow('Hi, I need MOT preparation for my car.')}
    <h2 class="section-title" style="font-size:2rem;margin-top:2rem;">Common questions</h2>
    ${faqHtml(motFaqs)}
  </div>
</section>
`
});

const serviceFaqs = [
  ['What is included in a basic service?', 'Oil and filter change, fluid top-ups, tyre pressure check and a visual safety inspection.'],
  ['Do you service all makes?', 'Yes — European and domestic vehicles including BMW, Mercedes, Toyota, Ford, Vauxhall and more.'],
  ['Do you come to my address?', 'Yes. We are a mobile mechanic based in Acton, covering West London.']
];

pages.push({
  file: 'car-servicing.html',
  title: 'Car Servicing Acton | Mobile Mechanic | MPower Garage',
  description: 'Mobile car servicing in Acton from £59. Basic, full and major services at your home or work. Book MPower Garage by phone or WhatsApp.',
  canonical: 'car-servicing.html',
  active: 'services',
  schemaExtra: faqSchema(serviceFaqs),
  body: `
<section class="page-section">
  <div class="page-hero">
    <div class="section-eyebrow">Servicing</div>
    <h1>Mobile car<br>servicing</h1>
    <div class="content-block">
      <p>Keep your car reliable without dropping it at a garage. We carry out basic, full and major services at your location using oils and filters matched to your manufacturer’s spec.</p>
      <p>From £59 for a basic service. Full pricing is on our <a href="pricing.html" style="color:var(--m-blue);">pricing page</a>.</p>
    </div>
    ${ctaRow('Hi, I would like to book a car service.')}
    <div class="pricing-grid">
      <div class="price-card">
        <div class="price-tier">ESSENTIAL</div>
        <h3>Basic Service</h3>
        <div class="price-amount">£59 <span>from</span></div>
        <ul class="price-list">
          <li>Engine oil &amp; filter change</li>
          <li>Tyre pressure check</li>
          <li>All fluid top-ups</li>
          <li>Visual safety inspection</li>
        </ul>
      </div>
      <div class="price-card featured">
        <div class="featured-tag">MOST POPULAR</div>
        <div class="price-tier">FULL SERVICE</div>
        <h3>Full Service</h3>
        <div class="price-amount">£129 <span>from</span></div>
        <ul class="price-list">
          <li>Everything in Basic</li>
          <li>Brake &amp; pad inspection</li>
          <li>Air &amp; cabin filters</li>
          <li>Computer diagnostics scan</li>
          <li>60-point vehicle check</li>
        </ul>
      </div>
      <div class="price-card">
        <div class="price-tier">PREMIUM</div>
        <h3>Major Service</h3>
        <div class="price-amount">£229 <span>from</span></div>
        <ul class="price-list">
          <li>Everything in Full Service</li>
          <li>Spark plugs &amp; timing belt check</li>
          <li>Gearbox fluid service</li>
          <li>Coolant system flush</li>
          <li>12-month parts &amp; labour warranty</li>
        </ul>
      </div>
    </div>
    <h2 class="section-title" style="font-size:2rem;margin-top:3rem;">Common questions</h2>
    ${faqHtml(serviceFaqs)}
  </div>
</section>
`
});

const brakeFaqs = [
  ['Can you replace brake pads at my home?', 'Yes, most pad and disc jobs can be done on your driveway if it is safe and legal to work there.'],
  ['Do parts come with a warranty?', 'Quality parts are backed by a 12-month parts and labour warranty.']
];

pages.push({
  file: 'brakes-and-suspension.html',
  title: 'Brakes & Suspension Repair Acton | MPower Garage',
  description: 'Mobile brake and suspension repairs in Acton and West London. Pads, discs, shocks and steering components. Call or WhatsApp MPower Garage.',
  canonical: 'brakes-and-suspension.html',
  active: 'services',
  schemaExtra: faqSchema(brakeFaqs),
  body: `
<section class="page-section">
  <div class="page-hero">
    <div class="section-eyebrow">Safety</div>
    <h1>Brakes &amp;<br>suspension</h1>
    <div class="content-block">
      <p>Squealing pads, soft pedal or knocking suspension? We inspect and repair brake and suspension components at your location across Acton and West London.</p>
      <p>Pads, discs, calipers, shock absorbers, springs, bushes and steering parts — with clear pricing before we start.</p>
    </div>
    ${ctaRow('Hi, I need help with brakes or suspension.')}
    ${faqHtml(brakeFaqs)}
  </div>
</section>
`
});

const diagFaqs = [
  ['What warning lights can you check?', 'Engine management, ABS, airbag, battery/charging and other OBD-related lights — we read codes and explain the fix in plain English.'],
  ['How long does a diagnostic take?', 'Most scans take 30–60 minutes depending on the fault. We confirm timing when you book.']
];

pages.push({
  file: 'diagnostics.html',
  title: 'Car Diagnostics Acton | Mobile Mechanic | MPower Garage',
  description: 'Mobile engine diagnostics in Acton and West London. Warning light scans and fault finding at your home or work. Book MPower Garage today.',
  canonical: 'diagnostics.html',
  active: 'services',
  schemaExtra: faqSchema(diagFaqs),
  body: `
<section class="page-section">
  <div class="page-hero">
    <div class="section-eyebrow">Diagnostics</div>
    <h1>Engine &amp; fault<br>diagnostics</h1>
    <div class="content-block">
      <p>Dashboard light on? We bring professional diagnostic equipment to you, read fault codes and identify the cause before recommending repairs.</p>
      <p>Serving Acton, Ealing and West London as a fully mobile service.</p>
    </div>
    ${ctaRow('Hi, my car has a warning light and I need diagnostics.')}
    ${faqHtml(diagFaqs)}
  </div>
</section>
`
});

const localFaqs = [
  ['Are you a mobile mechanic in Acton?', 'Yes. MPower Garage is based at 1 Vale Grove, Acton W3 7QP and operates as a mobile mechanic across West London.'],
  ['Do I need a garage bay?', 'No. We work at your home, workplace or a safe roadside location where permitted.'],
  ['How do I get a quote?', `Call ${PHONE_DISPLAY} or WhatsApp with your registration, issue and postcode.`]
];

pages.push({
  file: 'mobile-mechanic-acton.html',
  title: 'Mobile Mechanic Acton W3 | MPower Garage West London',
  description: 'Looking for a mobile mechanic in Acton? MPower Garage comes to you for servicing, diagnostics, brakes and MOT prep across Acton W3 and West London.',
  canonical: 'mobile-mechanic-acton.html',
  active: 'services',
  keywords: 'mobile mechanic Acton, car service Acton W3, mobile mechanic West London',
  schemaExtra: [
    faqSchema(localFaqs),
    breadcrumbSchema([
      { name: 'Home', href: 'index.html' },
      { name: 'Areas', href: 'areas-we-cover.html' },
      { name: 'Acton', href: 'mobile-mechanic-acton.html' }
    ])
  ],
  body: `
<section class="page-section">
  <div class="page-hero">
    ${breadcrumbs([
      { name: 'Home', href: 'index.html' },
      { name: 'Areas', href: 'areas-we-cover.html' },
      { name: 'Acton', href: 'mobile-mechanic-acton.html' }
    ])}
    <div class="mobile-note">ACTON · W3 7QP</div>
    <div class="section-eyebrow">Local</div>
    <h1>Mobile mechanic<br>in Acton</h1>
    <div class="content-block">
      <p>MPower Garage is your local mobile mechanic in Acton, London W3. We come to your driveway or workplace for car servicing, diagnostics, brake work and MOT preparation.</p>
      <p>Based at ${FULL_ADDRESS}, we cover Acton, Ealing, Shepherd’s Bush, Chiswick, Hanwell, Southall and the wider West London area.</p>
      <p>No waiting room. No drop-off stress. Book a time that suits you.</p>
    </div>
    ${ctaRow('Hi, I need a mobile mechanic in Acton.')}
    <h2 class="section-title" style="font-size:2rem;">Areas we cover</h2>
    <div class="content-block">
      <p><a href="mobile-mechanic-acton.html" style="color:var(--m-blue);">Acton</a> · <a href="mobile-mechanic-ealing.html" style="color:var(--m-blue);">Ealing</a> · Hanwell · Southall · Shepherd’s Bush · Chiswick · <a href="areas-we-cover.html" style="color:var(--m-blue);">all areas</a></p>
      <p>Not sure if we cover your postcode? <a href="contact.html" style="color:var(--m-blue);">Get in touch</a> — we will confirm straight away.</p>
    </div>
    <h2 class="section-title" style="font-size:2rem;">Popular services</h2>
    <div class="services-grid">
      <div class="service-card"><div class="service-num">01</div><h3><a href="car-servicing.html">Car Servicing →</a></h3><p>From £59 basic service at your location.</p></div>
      <div class="service-card"><div class="service-num">02</div><h3><a href="mot-service.html">MOT Prep →</a></h3><p>Pre-MOT checks before your test.</p></div>
      <div class="service-card"><div class="service-num">03</div><h3><a href="diagnostics.html">Diagnostics →</a></h3><p>Warning lights and fault finding.</p></div>
    </div>
    <h2 class="section-title" style="font-size:2rem;margin-top:2rem;">Common questions</h2>
    ${faqHtml(localFaqs)}
  </div>
</section>
`
});

pages.push({
  file: 'pricing.html',
  title: 'Pricing | Mobile Car Service Acton | MPower Garage',
  description: 'Transparent mobile mechanic pricing in Acton and West London. Basic service from £59, full from £129, major from £229. Call or WhatsApp to book.',
  canonical: 'pricing.html',
  active: 'pricing',
  body: `
<section class="page-section">
  <div class="page-hero">
    <div class="section-eyebrow">Pricing</div>
    <h1>Transparent,<br>fair pricing</h1>
    <p class="section-sub" style="margin:0 0 1rem;">No hidden charges. You approve every cost before we start.</p>
    ${ctaRow('Hi, I would like a price for a service.')}
    <div class="pricing-grid">
      <div class="price-card">
        <div class="price-tier">ESSENTIAL</div>
        <h3>Basic Service</h3>
        <div class="price-amount">£59 <span>from</span></div>
        <ul class="price-list">
          <li>Engine oil &amp; filter change</li>
          <li>Tyre pressure check</li>
          <li>All fluid top-ups</li>
          <li>Visual safety inspection</li>
        </ul>
      </div>
      <div class="price-card featured">
        <div class="featured-tag">MOST POPULAR</div>
        <div class="price-tier">FULL SERVICE</div>
        <h3>Full Service</h3>
        <div class="price-amount">£129 <span>from</span></div>
        <ul class="price-list">
          <li>Everything in Basic</li>
          <li>Brake &amp; pad inspection</li>
          <li>Air &amp; cabin filters</li>
          <li>Computer diagnostics scan</li>
          <li>60-point vehicle check</li>
        </ul>
      </div>
      <div class="price-card">
        <div class="price-tier">PREMIUM</div>
        <h3>Major Service</h3>
        <div class="price-amount">£229 <span>from</span></div>
        <ul class="price-list">
          <li>Everything in Full Service</li>
          <li>Spark plugs &amp; timing belt check</li>
          <li>Gearbox fluid service</li>
          <li>Coolant system flush</li>
          <li>12-month parts &amp; labour warranty</li>
        </ul>
      </div>
    </div>
    <div class="content-block" style="margin-top:2rem;">
      <p>Diagnostics, brakes and other repairs are quoted after inspection. Call or WhatsApp with your registration for a faster estimate.</p>
    </div>
  </div>
</section>
`
});

pages.push({
  file: 'about.html',
  title: 'About MPower Garage | Mobile Mechanic West London',
  description: 'MPower Garage is a mobile mechanic based in Acton, serving West London with honest advice, quality parts and skilled workmanship.',
  canonical: 'about.html',
  active: 'about',
  body: `
<section class="page-section">
  <div class="page-wrap">
    <div class="about-grid">
      <div>
        <div class="section-eyebrow">Who We Are</div>
        <h1 class="section-title">Mechanics<br>you can trust</h1>
        <div class="about-text">
          <p>MPower Garage is a mobile mechanic service based in Acton, London. We built this business on one principle: every driver deserves honest advice, quality parts and skilled workmanship — without the runaround.</p>
          <p>Our technicians bring years of experience across European and domestic vehicles, with modern diagnostic equipment so we fix it right the first time.</p>
          <p>From Acton to Ealing, Hanwell to Southall — we look after every vehicle with the same care, at your home or workplace.</p>
        </div>
        <div class="values-grid">
          <div class="value-item"><h4>Honest</h4><p>No upselling. No surprises on the bill.</p></div>
          <div class="value-item"><h4>Mobile</h4><p>We come to you across West London.</p></div>
          <div class="value-item"><h4>Fast</h4><p>Many jobs completed same day.</p></div>
          <div class="value-item"><h4>Reliable</h4><p>12-month parts &amp; labour guarantee.</p></div>
        </div>
        ${ctaRow('Hi, I would like to book with MPower Garage.')}
      </div>
      <div class="about-visual-block">
        <div class="about-big-text">M<br>PWR</div>
        <div class="cert-row">
          <div class="cert-badge">IMI CERTIFIED</div>
          <div class="cert-badge">FULLY INSURED</div>
          <div class="cert-badge">12M WARRANTY</div>
          <div class="cert-badge">MOBILE SERVICE</div>
        </div>
      </div>
    </div>
  </div>
</section>
`
});

const contactCrumbs = [
  { name: 'Home', href: 'index.html' },
  { name: 'Contact', href: 'contact.html' }
];

pages.push({
  file: 'contact.html',
  title: 'Contact & Book | MPower Garage Acton',
  description: `Book a mobile mechanic in Acton or West London. Call ${PHONE_DISPLAY} or WhatsApp MPower Garage. Based at ${FULL_ADDRESS}.`,
  canonical: 'contact.html',
  active: 'contact',
  schemaExtra: breadcrumbSchema(contactCrumbs),
  body: `
<section class="page-section">
  <div class="page-wrap">
    ${breadcrumbs(contactCrumbs)}
    <div class="section-eyebrow">Get In Touch</div>
    <h1 class="section-title">Book your<br>visit today</h1>
    <p class="section-sub">Fastest way: call or WhatsApp. Tell us your vehicle, postcode and the issue — we will confirm a slot.</p>
    <div class="contact-grid">
      <div class="contact-details">
        <div class="contact-item">
          <h4>BASE ADDRESS</h4>
          <p>MPower Garage<br>${ADDRESS_LINE}<br>${ADDRESS_LOCALITY}, ${ADDRESS_REGION} ${POSTCODE}</p>
          <p style="margin-top:0.5rem;font-size:13px;color:var(--muted);">Mobile mechanic — we come to you. This is our business base, not a public workshop waiting area.</p>
          <p style="margin-top:0.75rem;"><a href="${MAPS_LINK}" target="_blank" rel="noopener" style="color:var(--m-blue);">Open in Google Maps →</a></p>
          <iframe class="map-frame" title="MPower Garage base location map" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="${MAPS_EMBED}"></iframe>
        </div>
        <div class="contact-item">
          <h4>PHONE</h4>
          <p><a href="tel:${PHONE_TEL}" style="color:var(--text);text-decoration:none;">${PHONE_DISPLAY}</a></p>
        </div>
        <div class="contact-item">
          <h4>EMAIL</h4>
          <p><a href="mailto:${EMAIL}" style="color:var(--text);text-decoration:none;">${EMAIL}</a></p>
        </div>
        <div class="contact-item">
          <h4>OPENING HOURS</h4>
          <div>
            <div class="hours-row"><span class="hours-day">Monday – Friday</span><span class="hours-time">8:00 – 18:00</span></div>
            <div class="hours-row"><span class="hours-day">Saturday</span><span class="hours-time">8:00 – 14:00</span></div>
            <div class="hours-row"><span class="hours-day">Sunday</span><span class="hours-closed">Closed</span></div>
          </div>
        </div>
      </div>
      <div>
        <div class="contact-actions">
          <a class="contact-action call" href="tel:${PHONE_TEL}">
            <h3>CALL NOW</h3>
            <p>${PHONE_DISPLAY}</p>
          </a>
          <a class="contact-action wa" href="${waLink('Hi MPower Garage, I would like to book a visit. My vehicle is: ')}" target="_blank" rel="noopener">
            <h3>WHATSAPP</h3>
            <p>Send your vehicle, postcode and what you need</p>
          </a>
          <a class="contact-action" href="mailto:${EMAIL}?subject=Booking%20request%20-%20MPower%20Garage">
            <h3>EMAIL</h3>
            <p>${EMAIL}</p>
          </a>
        </div>
        <p class="form-note" style="margin-top:1.25rem;">We aim to reply within 2 hours during working hours.</p>
      </div>
    </div>
  </div>
</section>
`
});

const ealingFaqs = [
  ['Do you cover Ealing Broadway and surrounding streets?', 'Yes. We cover Ealing Broadway, West Ealing, North Ealing and nearby postcodes as a mobile mechanic.'],
  ['How quickly can you come to Ealing?', 'Often same-day or next-day depending on diary. Call or WhatsApp with your postcode for the earliest slot.'],
  ['Is there a call-out fee?', 'Visit pricing is confirmed when you book. Many services are quoted as a clear job price with no surprise extras.']
];
const ealingCrumbs = [
  { name: 'Home', href: 'index.html' },
  { name: 'Areas', href: 'areas-we-cover.html' },
  { name: 'Ealing', href: 'mobile-mechanic-ealing.html' }
];

pages.push({
  file: 'mobile-mechanic-ealing.html',
  title: 'Mobile Mechanic Ealing | MPower Garage West London',
  description: 'Mobile mechanic in Ealing for car servicing, diagnostics, brakes and MOT prep. MPower Garage comes to your home or workplace. Call or WhatsApp to book.',
  canonical: 'mobile-mechanic-ealing.html',
  active: 'services',
  keywords: 'mobile mechanic Ealing, car service Ealing, MOT prep Ealing, mobile mechanic West Ealing',
  schemaExtra: [faqSchema(ealingFaqs), breadcrumbSchema(ealingCrumbs)],
  body: `
<section class="page-section">
  <div class="page-hero">
    ${breadcrumbs(ealingCrumbs)}
    <div class="mobile-note">EALING · WEST LONDON</div>
    <div class="section-eyebrow">Local</div>
    <h1>Mobile mechanic<br>in Ealing</h1>
    <div class="content-block">
      <p>Need a reliable mobile mechanic in Ealing? MPower Garage comes to your driveway or workplace for servicing, diagnostics, brake work and MOT preparation — no drop-off, no waiting room.</p>
      <p>Based in nearby Acton (W3), we regularly work across Ealing Broadway, West Ealing, North Ealing and surrounding streets. Same clear pricing and honest advice as our <a href="mobile-mechanic-acton.html" style="color:var(--m-blue);">Acton mobile mechanic</a> page.</p>
      <p>Popular jobs in Ealing: full service, warning light diagnostics, brake pads/discs and pre-MOT checks before you book a test centre.</p>
    </div>
    ${ctaRow('Hi, I need a mobile mechanic in Ealing.')}
    <h2 class="section-title" style="font-size:2rem;">Related services</h2>
    <div class="services-grid">
      <div class="service-card"><div class="service-num">01</div><h3><a href="car-servicing.html">Car Servicing →</a></h3><p>From £59 at your Ealing address.</p></div>
      <div class="service-card"><div class="service-num">02</div><h3><a href="diagnostics.html">Diagnostics →</a></h3><p>Warning lights checked on-site.</p></div>
      <div class="service-card"><div class="service-num">03</div><h3><a href="mot-service.html">MOT Prep →</a></h3><p>Pre-MOT checks before your test.</p></div>
    </div>
    <h2 class="section-title" style="font-size:2rem;margin-top:2rem;">Common questions</h2>
    ${faqHtml(ealingFaqs)}
  </div>
</section>
`
});

const areasCrumbs = [
  { name: 'Home', href: 'index.html' },
  { name: 'Areas we cover', href: 'areas-we-cover.html' }
];

pages.push({
  file: 'areas-we-cover.html',
  title: 'Areas We Cover | Mobile Mechanic West London | MPower Garage',
  description: 'MPower Garage mobile mechanic covering Acton, Ealing, Hanwell, Southall, Chiswick and West London. Check your area and book by call or WhatsApp.',
  canonical: 'areas-we-cover.html',
  active: 'services',
  keywords: 'mobile mechanic West London, mobile mechanic Hanwell, mobile mechanic Southall, mobile mechanic Chiswick',
  schemaExtra: breadcrumbSchema(areasCrumbs),
  body: `
<section class="page-section">
  <div class="page-hero">
    ${breadcrumbs(areasCrumbs)}
    <div class="section-eyebrow">Coverage</div>
    <h1>Areas we<br>cover</h1>
    <div class="content-block">
      <p>We are a mobile mechanic based in Acton. If your postcode is in West London, there is a strong chance we can come to you — message us to confirm.</p>
    </div>
    ${ctaRow('Hi, do you cover my postcode? It is: ')}
    <div class="areas-grid">
      <div class="area-card">
        <h3><a href="mobile-mechanic-acton.html">Acton</a></h3>
        <p>Our base (W3). Fastest response for Acton Central, East Acton, South Acton and The Vale.</p>
      </div>
      <div class="area-card">
        <h3><a href="mobile-mechanic-ealing.html">Ealing</a></h3>
        <p>Ealing Broadway, West Ealing and North Ealing — regular mobile servicing and diagnostics.</p>
      </div>
      <div class="area-card">
        <h3>Hanwell</h3>
        <p>Handy for driveway services and pre-MOT checks without travelling to a workshop.</p>
      </div>
      <div class="area-card">
        <h3>Southall</h3>
        <p>Mobile oil services, brakes and fault finding at home or work when access is safe.</p>
      </div>
      <div class="area-card">
        <h3>Chiswick</h3>
        <p>Convenient mobile visits for busy schedules — book a slot that fits around your day.</p>
      </div>
      <div class="area-card">
        <h3>Shepherd’s Bush</h3>
        <p>Nearby coverage for servicing and warning-light diagnostics. WhatsApp your postcode to confirm.</p>
      </div>
    </div>
    <div class="content-block">
      <p>Not listed? Still ask — we often cover neighbouring West London postcodes. Start on <a href="contact.html" style="color:var(--m-blue);">contact</a> or WhatsApp.</p>
    </div>
  </div>
</section>
`
});

const sitemapCrumbs = [
  { name: 'Home', href: 'index.html' },
  { name: 'Sitemap', href: 'sitemap.html' }
];

pages.push({
  file: 'sitemap.html',
  title: 'Sitemap | MPower Garage',
  description: 'HTML sitemap for MPower Garage — all service, area and company pages for our West London mobile mechanic site.',
  canonical: 'sitemap.html',
  active: 'about',
  schemaExtra: breadcrumbSchema(sitemapCrumbs),
  body: `
<section class="page-section">
  <div class="page-hero">
    ${breadcrumbs(sitemapCrumbs)}
    <div class="section-eyebrow">Site</div>
    <h1>Sitemap</h1>
    <div class="sitemap-cols">
      <div>
        <h2>MAIN</h2>
        <a href="index.html">Home</a>
        <a href="about.html">About</a>
        <a href="pricing.html">Pricing</a>
        <a href="contact.html">Contact</a>
        <a href="privacy.html">Privacy Policy</a>
      </div>
      <div>
        <h2>SERVICES</h2>
        <a href="services.html">All Services</a>
        <a href="service-list.html">Full Service List</a>
        <a href="car-servicing.html">Car Servicing</a>
        <a href="mot-service.html">MOT Preparation</a>
        <a href="diagnostics.html">Diagnostics</a>
        <a href="brakes-and-suspension.html">Brakes &amp; Suspension</a>
        <a href="bmw-service-acton.html">BMW Service</a>
        <a href="mercedes-service-west-london.html">Mercedes Service</a>
        <a href="toyota-service-ealing.html">Toyota Service</a>
      </div>
      <div>
        <h2>AREAS &amp; ADVICE</h2>
        <a href="areas-we-cover.html">Areas We Cover</a>
        <a href="mobile-mechanic-acton.html">Mobile Mechanic Acton</a>
        <a href="mobile-mechanic-ealing.html">Mobile Mechanic Ealing</a>
        <a href="blog.html">Car Advice</a>
      </div>
    </div>
  </div>
</section>
`
});

pages.push({
  file: 'privacy.html',
  title: 'Privacy Policy | MPower Garage',
  description: 'Privacy policy for mpowergarage.co.uk — how MPower Garage handles enquiries and contact information.',
  canonical: 'privacy.html',
  active: 'about',
  schemaExtra: breadcrumbSchema([
    { name: 'Home', href: 'index.html' },
    { name: 'Privacy', href: 'privacy.html' }
  ]),
  body: `
<section class="page-section">
  <div class="page-hero">
    ${breadcrumbs([
      { name: 'Home', href: 'index.html' },
      { name: 'Privacy', href: 'privacy.html' }
    ])}
    <div class="section-eyebrow">Legal</div>
    <h1>Privacy<br>policy</h1>
    <div class="content-block">
      <p>MPower Garage (“we”) operates mpowergarage.co.uk. When you contact us by phone, WhatsApp or email, we use the details you provide only to respond to your enquiry and arrange a booking.</p>
      <p>We do not sell your personal information. Call recordings or message history may be kept as needed to provide the service and meet legal obligations.</p>
      <p>Our business base address is ${FULL_ADDRESS}. Contact: ${EMAIL} / ${PHONE_DISPLAY}.</p>
      <p>If you want us to delete enquiry details we hold, email ${EMAIL} and we will respond as soon as reasonably possible.</p>
    </div>
  </div>
</section>
`
});

const gbpServices = [
  ['Car servicing', 'Basic, full and major mobile services at your home or workplace. Oils and filters matched to manufacturer spec.'],
  ['Oil change', 'Engine oil and filter change using the correct grade for your vehicle, with a visual safety check.'],
  ['Engine diagnostics', 'OBD fault-code reading and warning-light diagnosis on-site. Plain-English report before any repair.'],
  ['Brake repair', 'Pads, discs and related brake work carried out at your location where safe and practical.'],
  ['Suspension repair', 'Shocks, springs, bushes and related suspension components — inspected and quoted clearly.'],
  ['MOT preparation', 'Pre-MOT checks for lights, brakes, tyres and common fails before you book the test centre.'],
  ['Battery replacement', 'Testing and replacement of 12V batteries at your driveway or workplace.'],
  ['Air conditioning service', 'AC checks and re-gas where suitable as a mobile job.'],
  ['Mobile mechanic', 'We come to you across Acton, Ealing and West London — same-day slots when the diary allows.']
];

const servicesListCrumbs = [
  { name: 'Home', href: 'index.html' },
  { name: 'Services', href: 'services.html' },
  { name: 'Service list', href: 'service-list.html' }
];

pages.push({
  file: 'service-list.html',
  title: 'Service List | Mobile Mechanic Acton | MPower Garage',
  description: 'Full list of MPower Garage mobile mechanic services in Acton and West London — servicing, diagnostics, brakes, MOT prep and more. Match this list on Google Business Profile.',
  canonical: 'service-list.html',
  active: 'services',
  schemaExtra: breadcrumbSchema(servicesListCrumbs),
  body: `
<section class="page-section">
  <div class="page-hero">
    ${breadcrumbs(servicesListCrumbs)}
    <div class="section-eyebrow">Services</div>
    <h1>What we<br>offer</h1>
    <div class="content-block">
      <p>Use these exact service names on Google Business Profile. Same-day visits are available when the diary allows — WhatsApp your postcode and registration for the next slot.</p>
    </div>
    ${ctaRow('Hi, I need a quote. Service: ')}
    <div class="faq-list">
${gbpServices.map(([name, desc]) => `      <div class="faq-item"><h3>${name}</h3><p>${desc}</p></div>`).join('\n')}
    </div>
    <p style="margin-top:1.5rem;"><a href="services.html" style="color:var(--m-blue);">Back to services overview →</a></p>
  </div>
</section>
`
});

function brandPage({ file, brand, areaLabel, title, description, canonical, h1Line2, intro, extra }) {
  const crumbs = [
    { name: 'Home', href: 'index.html' },
    { name: 'Services', href: 'services.html' },
    { name: `${brand} service`, href: file }
  ];
  return {
    file,
    title,
    description,
    canonical,
    active: 'services',
    keywords: `${brand} service ${areaLabel}, mobile ${brand} mechanic, ${brand} oil change ${areaLabel}`,
    schemaExtra: breadcrumbSchema(crumbs),
    body: `
<section class="page-section">
  <div class="page-hero">
    ${breadcrumbs(crumbs)}
    <div class="mobile-note">MOBILE · ${brand.toUpperCase()} · ${areaLabel.toUpperCase()}</div>
    <div class="section-eyebrow">${brand}</div>
    <h1>${brand} service<br>${h1Line2}</h1>
    <div class="content-block">
      ${intro}
      <p>We are an independent mobile mechanic — not a main dealer. That means transparent pricing and manufacturer-spec oils/filters without dealer labour rates.</p>
      ${extra || ''}
    </div>
    ${ctaRow(`Hi, I need mobile ${brand} service in ${areaLabel}.`)}
    <div class="services-grid">
      <div class="service-card"><div class="service-num">01</div><h3><a href="car-servicing.html">Servicing →</a></h3><p>Basic, full and major for ${brand} models.</p></div>
      <div class="service-card"><div class="service-num">02</div><h3><a href="diagnostics.html">Diagnostics →</a></h3><p>Warning lights and fault codes on-site.</p></div>
      <div class="service-card"><div class="service-num">03</div><h3><a href="brakes-and-suspension.html">Brakes →</a></h3><p>Pads, discs and suspension work.</p></div>
    </div>
  </div>
</section>
`
  };
}

pages.push(brandPage({
  file: 'bmw-service-acton.html',
  brand: 'BMW',
  areaLabel: 'Acton',
  title: 'BMW Service Acton | Mobile Mechanic | MPower Garage',
  description: 'Mobile BMW servicing in Acton and West London. Oil services, diagnostics and brake work at your home or workplace. Call or WhatsApp MPower Garage.',
  canonical: 'bmw-service-acton.html',
  h1Line2: 'in Acton',
  intro: '<p>Looking for BMW service in Acton without the dealer wait? MPower Garage comes to you for oil services, inspections, diagnostics and common repairs on 1 Series, 3 Series, X models and more.</p>',
  extra: '<p>Also covering nearby <a href="mobile-mechanic-ealing.html" style="color:var(--m-blue);">Ealing</a> and wider West London.</p>'
}));

pages.push(brandPage({
  file: 'mercedes-service-west-london.html',
  brand: 'Mercedes',
  areaLabel: 'West London',
  title: 'Mercedes Service West London | Mobile Mechanic | MPower Garage',
  description: 'Mobile Mercedes servicing in West London. A-Class, C-Class and more — oil service, diagnostics and brakes at your location. Book MPower Garage by call or WhatsApp.',
  canonical: 'mercedes-service-west-london.html',
  h1Line2: 'West London',
  intro: '<p>Independent mobile Mercedes service across Acton, Ealing and West London. Ideal for routine servicing, warning lights and brake work when you cannot spare a day at the dealer.</p>'
}));

pages.push(brandPage({
  file: 'toyota-service-ealing.html',
  brand: 'Toyota',
  areaLabel: 'Ealing',
  title: 'Toyota Service Ealing | Mobile Mechanic | MPower Garage',
  description: 'Mobile Toyota servicing in Ealing — Yaris, Corolla, RAV4 and more. Honest pricing, quality parts, we come to you. Call or WhatsApp MPower Garage.',
  canonical: 'toyota-service-ealing.html',
  h1Line2: 'in Ealing',
  intro: '<p>Toyota owners in Ealing can book a mobile service at home or work. We handle oil services, filters, diagnostics and common repairs with clear quotes before we start.</p>',
  extra: '<p>Based nearby in <a href="mobile-mechanic-acton.html" style="color:var(--m-blue);">Acton</a> for fast local response.</p>'
}));

const blogPosts = [
  {
    file: 'blog-how-often-service-car-uk.html',
    title: 'How Often Should You Service Your Car in the UK? | MPower Garage',
    description: 'UK car service intervals explained — annual vs mileage, basic vs full service, and when a mobile mechanic visit makes sense in Acton and West London.',
    h1: 'How often should<br>you service your car?',
    date: '2026-08-01',
    summary: 'Annual vs mileage intervals, and what a basic or full service usually includes.',
    bodyHtml: `
      <p>Most UK manufacturers recommend a service every 12 months or 10,000–12,000 miles — whichever comes first. Check your handbook: some newer cars stretch intervals, but skipping services can void warranties and hide faults.</p>
      <p><strong>Basic service</strong> usually covers oil, filter, fluids and a safety look-over. <strong>Full / major</strong> adds filters, plugs (when due), deeper checks and sometimes gearbox or coolant work.</p>
      <p>If dropping the car at a garage is hard, a <a href="car-servicing.html" style="color:var(--m-blue);">mobile car service</a> at home in Acton or Ealing keeps you on schedule without a day off work.</p>
      <p>Not sure which package you need? WhatsApp your registration and mileage — we will recommend the right level.</p>
    `
  },
  {
    file: 'blog-mot-fail-common-reasons.html',
    title: 'Common MOT Fail Reasons (and How to Avoid Them) | MPower Garage',
    description: 'The most common UK MOT fail reasons — lights, tyres, brakes, wipers — and how a mobile pre-MOT check in West London can help you pass first time.',
    h1: 'Common MOT fail<br>reasons to fix first',
    date: '2026-08-01',
    summary: 'Lights, tyres, brakes and simple fixes that fail many cars before the test.',
    bodyHtml: `
      <p>Many MOT fails are avoidable: blown bulbs, worn tyre tread or uneven wear, brake imbalance, cracked wipers, washer jets, and warning lights left on the dash.</p>
      <p>A short <a href="mot-service.html" style="color:var(--m-blue);">MOT preparation</a> visit at your driveway catches these before you pay for a test. We check common fail points and fix what we can on the day.</p>
      <p>We do not carry out the official MOT ourselves — that is done at an approved test centre — but arriving prepared saves retest stress and often money.</p>
      <p>Book a pre-MOT check in Acton, Ealing or nearby West London by call or WhatsApp.</p>
    `
  },
  {
    file: 'blog-when-to-call-mobile-mechanic.html',
    title: 'When to Call a Mobile Mechanic vs a Garage | MPower Garage',
    description: 'When a mobile mechanic is the smarter choice — and when you still need a workshop. Practical advice for drivers in Acton, Ealing and West London.',
    h1: 'Mobile mechanic<br>or workshop?',
    date: '2026-08-01',
    summary: 'Which jobs suit a driveway visit, and which need a ramp or specialist bay.',
    bodyHtml: `
      <p>Call a <a href="mobile-mechanic-acton.html" style="color:var(--m-blue);">mobile mechanic</a> for servicing, battery work, many brake jobs, diagnostics and pre-MOT checks — especially if you work from home or cannot leave the car all day.</p>
      <p>A workshop is still better for heavy jobs that need a ramp, welding, major gearbox removal, or equipment we cannot safely use on the street.</p>
      <p>If you are unsure, describe the symptom and postcode on WhatsApp. We will say honestly whether we can do it on-site or you need a garage bay.</p>
      <p>Same-day slots are often available across Acton and Ealing when the diary allows.</p>
    `
  }
];

const blogCrumbs = [
  { name: 'Home', href: 'index.html' },
  { name: 'Advice', href: 'blog.html' }
];

pages.push({
  file: 'blog.html',
  title: 'Car Advice Blog | Mobile Mechanic West London | MPower Garage',
  description: 'Practical car servicing and MOT advice from MPower Garage — mobile mechanic tips for drivers in Acton, Ealing and West London.',
  canonical: 'blog.html',
  active: 'about',
  schemaExtra: breadcrumbSchema(blogCrumbs),
  body: `
<section class="page-section">
  <div class="page-hero">
    ${breadcrumbs(blogCrumbs)}
    <div class="section-eyebrow">Advice</div>
    <h1>Car care<br>guides</h1>
    <div class="content-block">
      <p>Short, practical guides for West London drivers. No fluff — just what helps you book the right job.</p>
    </div>
    <div class="blog-grid">
${blogPosts.map(p => `      <a class="blog-card" href="${p.file}">
        <div class="blog-date">${p.date}</div>
        <h2>${p.h1.replace(/<br>/g, ' ')}</h2>
        <p>${p.summary}</p>
      </a>`).join('\n')}
    </div>
    ${ctaRow('Hi, I have a question about servicing my car.')}
  </div>
</section>
`
});

for (const post of blogPosts) {
  const crumbs = [
    { name: 'Home', href: 'index.html' },
    { name: 'Advice', href: 'blog.html' },
    { name: post.summary.slice(0, 40) + '…', href: post.file }
  ];
  pages.push({
    file: post.file,
    title: post.title,
    description: post.description,
    canonical: post.file,
    active: 'about',
    schemaExtra: [
      breadcrumbSchema(crumbs),
      {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: post.title.split('|')[0].trim(),
        datePublished: post.date,
        dateModified: post.date,
        author: { '@type': 'Organization', name: 'MPower Garage' },
        publisher: { '@type': 'Organization', name: 'MPower Garage', url: SITE },
        mainEntityOfPage: `${SITE}/${post.file}`
      }
    ],
    body: `
<section class="page-section">
  <div class="page-hero">
    ${breadcrumbs(crumbs)}
    <div class="section-eyebrow">Advice · ${post.date}</div>
    <h1>${post.h1}</h1>
    <div class="content-block">
      ${post.bodyHtml}
    </div>
    ${ctaRow('Hi, I read your advice page and want to book.')}
    <p><a href="blog.html" style="color:var(--m-blue);">← All advice articles</a></p>
  </div>
</section>
`
  });
}

for (const page of pages) {
  const html = layout(page);
  fs.writeFileSync(path.join(ROOT, page.file), html, 'utf8');
  console.log('wrote', page.file, html.length);
}

const notFound = layout({
  file: '404.html',
  title: 'Page Not Found | MPower Garage',
  description: 'This page could not be found. Return to MPower Garage home or contact us to book a mobile mechanic.',
  canonical: '404.html',
  active: 'home',
  noindex: true,
  body: `
<section class="page-section">
  <div class="page-hero">
    <div class="section-eyebrow">404</div>
    <h1>Page not<br>found</h1>
    <div class="content-block">
      <p>That link does not exist. Head home or book a visit instead.</p>
    </div>
    <div class="cta-row">
      <a href="index.html" class="btn-red">GO HOME</a>
      <a href="contact.html" class="btn-outline">CONTACT</a>
    </div>
  </div>
</section>
`
});
fs.writeFileSync(path.join(ROOT, '404.html'), notFound, 'utf8');
console.log('wrote 404.html');

const urls = pages.map(p => {
  const loc = p.file === 'index.html' ? `${SITE}/` : `${SITE}/${p.file}`;
  const priority = p.file === 'index.html' ? '1.0' : p.file.includes('mobile-mechanic') ? '0.9' : '0.8';
  return `  <url>
    <loc>${loc}</loc>
    <changefreq>monthly</changefreq>
    <priority>${priority}</priority>
  </url>`;
}).join('\n');

fs.writeFileSync(path.join(ROOT, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`);
console.log('wrote sitemap.xml');

fs.writeFileSync(path.join(ROOT, 'robots.txt'), `User-agent: *
Allow: /

Sitemap: ${SITE}/sitemap.xml
`);
console.log('wrote robots.txt');

fs.writeFileSync(path.join(ROOT, 'NAP-CITATIONS.txt'), `Copy-paste NAP for Bing Places, Apple Business Connect, Yell, etc.

Name:
MPower Garage

Address line 1:
1 Vale Grove

City / Town:
Acton

Region:
London

Postcode:
W3 7QP

Country:
United Kingdom

Phone:
+44 7444 924 382

Website:
https://mpowergarage.co.uk

Email:
info@mpowergarage.com

Category:
Mobile mechanic / Auto repair

Service areas:
Acton, Ealing, Hanwell, Southall, Chiswick, West London

Hours:
Mon-Fri 08:00-18:00
Sat 08:00-14:00
Sun Closed

Short description:
Mobile mechanic serving Acton, Ealing and West London. Car servicing, MOT preparation, diagnostics and repairs — we come to you. Same-day slots when available. Call or WhatsApp +44 7444 924 382.

GBP service names (add each on Google Business Profile):
- Car servicing
- Oil change
- Engine diagnostics
- Brake repair
- Suspension repair
- MOT preparation
- Battery replacement
- Air conditioning service
- Mobile mechanic
`);
console.log('wrote NAP-CITATIONS.txt');

fs.writeFileSync(path.join(ROOT, 'SEO-OFFSITE-CHECKLIST.md'), `# Off-site SEO checklist — MPower Garage

Site technical SEO is in place. These steps bring real customers.

## NAP (copy exactly everywhere)
- **Name:** MPower Garage
- **Address:** 1 Vale Grove, Acton, London W3 7QP
- **Phone:** +44 7444 924 382
- **Website:** https://mpowergarage.co.uk
- **WhatsApp:** same number

## 1) Google Business Profile (highest priority)
1. Create or claim the profile.
2. Primary category: **Mobile mechanic** (secondary: Auto repair).
3. Use **service-area business** if offered — Acton, Ealing, Hanwell, Southall, Chiswick, West London.
4. Hours: Mon–Fri 08:00–18:00, Sat 08:00–14:00, Sun closed.
5. Add website + phone. Upload photos when you have them (van, tools, jobs).
6. Ask every happy customer for a Google review.

## 2) Google Search Console
1. Add property for mpowergarage.co.uk and verify (DNS or HTML).
2. Submit sitemap: https://mpowergarage.co.uk/sitemap.xml
3. Request indexing for: home, mobile-mechanic-acton.html, mobile-mechanic-ealing.html, contact.html

## 3) Photos (when ready)
- Van / tools / working on a car (customer permission)
- Add to GBP and later to the website gallery
- Filenames like \`acton-mobile-mechanic-service.jpg\` help slightly

## 4) Citations (same NAP)
List the business on 3–5 UK directories with identical NAP, e.g. Bing Places, Apple Business Connect, Yell, or local directories. Do not create spam listings.

## 5) Reviews & trust
- 10+ real Google reviews beats most on-page tricks
- Reply to every review politely
- Never buy fake reviews

## 6) Optional later
- Short blog posts answering real questions ("how often should I service my car UK")
- Instagram / Facebook with same NAP in bio + link to site
- Track calls from GBP insights

## Do not fake
- Do not invent star ratings in schema
- Do not publish thin doorway pages for every street
`);
console.log('wrote SEO-OFFSITE-CHECKLIST.md');
if (fs.existsSync(path.join(ROOT, 'GBP-CHECKLIST.md'))) {
  fs.unlinkSync(path.join(ROOT, 'GBP-CHECKLIST.md'));
}

const oldNew = path.join(ROOT, 'new');
if (fs.existsSync(oldNew)) {
  fs.unlinkSync(oldNew);
  console.log('removed duplicate draft: new');
}

console.log('build complete,', pages.length, 'pages');
