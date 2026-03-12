import { notFound } from 'next/navigation';
import Link from 'next/link';
import Navbar from '../../../../components/client/Navbar';
import BookServiceButton from '../../../../components/client/BookServiceButton';
import { slugToKey, serviceItems } from '../../../../lib/servicesConfig';
import ptTranslations from '../../../../locale/pt.json';
import enTranslations from '../../../../locale/en.json';

function renderInline(text, links, lang) {
  const regex = /\{\{(\w+)\}\}|<b>([\s\S]*?)<\/b>|<i>([\s\S]*?)<\/i>/g;
  const parts = [];
  let lastIndex = 0;
  let match;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) parts.push(text.slice(lastIndex, match.index));
    if (match[1]) {
      const link = links?.[match[1]];
      if (link) {
        const href = link.href ?? `/${lang}/services/${link.slug}`;
        parts.push(
          <a
            key={`link-${match.index}`}
            href={href}
            target={link.external ? '_blank' : '_self'}
            rel={link.external ? 'noopener noreferrer' : undefined}
            className='text-purple-primary underline hover:opacity-70 transition-opacity'
          >
            {link.label}
          </a>,
        );
      } else {
        parts.push(match[0]);
      }
    } else if (match[2] !== undefined) {
      parts.push(
        <strong
          key={`bold-${match.index}`}
          className='font-semibold text-gray-900'
        >
          {match[2]}
        </strong>,
      );
    } else if (match[3] !== undefined) {
      parts.push(<em key={`italic-${match.index}`}>{match[3]}</em>);
    }
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) parts.push(text.slice(lastIndex));
  return parts;
}

function renderBlock(block, index, links, lang) {
  const trimmed = block.trim();
  if (!trimmed) return null;

  const lines = trimmed.split('\n');

  // Bold title + body: starts with <b>...</b> followed by content (not a sentence)
  const boldTitleMatch = trimmed.match(/^<b>([\s\S]*?)<\/b>\n([\s\S]*)$/);
  if (boldTitleMatch && !boldTitleMatch[1].trimEnd().endsWith('.')) {
    return (
      <div key={index} className='border-l-2 border-purple-primary pl-4 py-1'>
        <p className='font-bold text-gray-900 mb-1'>{boldTitleMatch[1]}</p>
        <p className='text-gray-600 leading-relaxed text-[15px]'>
          {renderInline(boldTitleMatch[2], links, lang)}
        </p>
      </div>
    );
  }

  // All list items
  if (
    lines.every((l) => l.trim().startsWith('- ') || l.trim().startsWith('• '))
  ) {
    return (
      <ul key={index} className='space-y-2'>
        {lines.map((line, j) => (
          <li key={j} className='flex gap-3 text-gray-600 text-[15px]'>
            <span className='text-purple-primary font-bold shrink-0 mt-px'>
              —
            </span>
            <span>
              {renderInline(line.replace(/^[-•]\s*/, ''), links, lang)}
            </span>
          </li>
        ))}
      </ul>
    );
  }

  // Section header + body on same block (first line ends with :)
  if (lines[0].trim().endsWith(':') && lines.length > 1) {
    const header = lines[0].trim().slice(0, -1);
    const body = lines.slice(1).join('\n');
    return (
      <div key={index}>
        <p className='text-xs font-bold uppercase tracking-widest text-purple-primary mb-2'>
          {header}
        </p>
        <p className='text-gray-600 leading-relaxed text-[15px]'>
          {renderInline(body, links, lang)}
        </p>
      </div>
    );
  }

  // Standalone section header (single line ending with :)
  if (lines.length === 1 && trimmed.endsWith(':')) {
    return (
      <p
        key={index}
        className='text-xs font-bold uppercase tracking-widest text-purple-primary'
      >
        {trimmed.slice(0, -1)}
      </p>
    );
  }

  // First block → intro paragraph (larger)
  if (index === 0) {
    return (
      <p key={index} className='text-gray-700 text-lg leading-relaxed'>
        {lines.map((line, j) => (
          <span key={j}>
            {j > 0 && <br />}
            {renderInline(line, links, lang)}
          </span>
        ))}
      </p>
    );
  }

  // Regular paragraph
  return (
    <p key={index} className='text-gray-600 leading-relaxed text-[15px]'>
      {lines.map((line, j) => (
        <span key={j}>
          {j > 0 && <br />}
          {renderInline(line, links, lang)}
        </span>
      ))}
    </p>
  );
}

function renderDescription(text, links, lang) {
  return text
    .split(/\n\n+/)
    .map((block, i) => renderBlock(block, i, links, lang))
    .filter(Boolean);
}

// Parses text into intro blocks, a "how it works" label, step cards, and outro
function parseSteps(text) {
  const blocks = text
    .split(/\n\n+/)
    .map((b) => b.trim())
    .filter(Boolean);

  const intro = [];
  const steps = [];
  const outro = [];
  let howItWorksLabel = null;
  let currentStep = null;
  const stepRegex = /^(?:Passo|Step)\s+(\d+)[:\s–-]+(.+?)(?:\n([\s\S]*))?$/i;

  for (const block of blocks) {
    // Section label "Como funciona:" / "How it works:"
    if (/^(Como funciona|How it works):?$/i.test(block)) {
      howItWorksLabel = block.replace(/:$/, '');
      continue;
    }

    const stepMatch = block.match(stepRegex);
    if (stepMatch) {
      const title = stepMatch[2].trim();
      const body = stepMatch[3]?.trim() ?? '';
      currentStep = {
        number: stepMatch[1].padStart(2, '0'),
        title,
        content: body ? [body] : [],
      };
      steps.push(currentStep);
      continue;
    }

    if (currentStep) {
      currentStep.content.push(block);
    } else {
      intro.push(block);
    }
  }

  // Move the last block of the last step to outro if it looks like a sign-off
  if (steps.length > 0) {
    const lastStep = steps[steps.length - 1];
    const last = lastStep.content[lastStep.content.length - 1] ?? '';
    if (/^(Sou a |I'm |I am )/i.test(last)) {
      outro.push(lastStep.content.pop());
    }
  }

  return { intro, howItWorksLabel, steps, outro };
}

function renderStepCardContent(blocks, links, lang) {
  return blocks.map((block, i) => {
    const lines = block.split('\n');

    if (
      lines.every((l) => l.trim().startsWith('- ') || l.trim().startsWith('• '))
    ) {
      return (
        <ul key={i} className='space-y-1.5 mt-2'>
          {lines.map((line, j) => (
            <li key={j} className='flex gap-2 text-gray-600 text-sm'>
              <span className='text-purple-primary font-bold shrink-0'>—</span>
              <span>
                {renderInline(line.replace(/^[-•]\s*/, ''), links, lang)}
              </span>
            </li>
          ))}
        </ul>
      );
    }

    return (
      <p key={i} className='text-gray-600 text-sm leading-relaxed mt-2'>
        {lines.map((line, j) => (
          <span key={j}>
            {j > 0 && <br />}
            {renderInline(line, links, lang)}
          </span>
        ))}
      </p>
    );
  });
}

export async function generateStaticParams() {
  const slugs = Object.keys(slugToKey);
  const langs = ['pt', 'en'];
  return langs.flatMap((lang) => slugs.map((slug) => ({ lang, slug })));
}

export async function generateMetadata({ params }) {
  const { lang, slug } = await params;
  const translationKey = slugToKey[slug];
  if (!translationKey) return { title: 'Nevada Consulting' };

  const translations = lang === 'pt' ? ptTranslations : enTranslations;
  const service = translations.translation.services[translationKey];

  return {
    title: `${service.subtitle} — Nevada Consulting`,
  };
}

export default async function ServicePage({ params }) {
  const { lang, slug } = await params;
  const translationKey = slugToKey[slug];

  if (!translationKey) notFound();

  const translations = lang === 'pt' ? ptTranslations : enTranslations;
  const t = translations.translation;
  const service = t.services[translationKey];
  const backLabel = t.services.backToServices;
  const serviceConfig = serviceItems.find((s) => s.slug === slug);

  const bookingVariants =
    translationKey === 'fifth'
      ? [
          {
            slug: 'resume-linkedin-portfolio',
            label: t.services.ctaResumeOnly,
          },
          {
            slug: 'resume-linkedin-assessment',
            label: t.services.ctaResumeWithAssessment,
          },
        ]
      : null;

  const fullText = service.fullDescription ?? service.description;
  const hasSteps = translationKey === 'fifth';
  const parsed = hasSteps
    ? parseSteps(fullText)
    : { intro: [], steps: [], outro: [], howItWorksLabel: null };

  return (
    <>
      <Navbar hideNav />
      <main className='min-h-screen bg-white text-gray-900 pt-24 pb-20 px-6'>
        <div className={`mx-auto ${hasSteps ? 'max-w-5xl' : 'max-w-2xl'}`}>
          <Link
            href={`/${lang}#services`}
            className='inline-flex items-center gap-2 text-sm text-gray-400 hover:text-gray-700 transition-colors duration-200 mb-12'
          >
            ← {backLabel}
          </Link>

          {/* Header */}
          <div className='mb-10'>
            <p className='text-purple-primary text-xs font-bold uppercase tracking-widest mb-3'>
              {t.services.title}
            </p>
            <h1 className='text-3xl md:text-4xl font-bold leading-snug text-gray-900 mb-4'>
              {service.subtitle}
            </h1>
            <div className='w-12 h-0.5 bg-purple-primary' />
          </div>

          {hasSteps ? (
            <>
              {/* Intro paragraphs */}
              {parsed.intro.length > 0 && (
                <div className='space-y-4 mb-10'>
                  {parsed.intro.map((block, i) =>
                    renderBlock(block, i, service.links, lang),
                  )}
                </div>
              )}

              {/* "Como funciona" label */}
              {parsed.howItWorksLabel && (
                <p className='text-xs font-bold uppercase tracking-widest text-purple-primary mb-6'>
                  {parsed.howItWorksLabel}
                </p>
              )}

              {/* Step cards */}
              {parsed.steps.length > 0 && (
                <div className='grid grid-cols-1 md:grid-cols-3 gap-5 mb-10'>
                  {parsed.steps.map((step) => (
                    <div
                      key={step.number}
                      className='rounded-xl border border-gray-200 bg-white p-6 shadow-sm flex flex-col gap-3'
                    >
                      <span className='text-3xl font-black text-purple-primary/20 leading-none'>
                        {step.number}
                      </span>
                      <h3 className='font-bold text-gray-900 text-base leading-snug'>
                        {step.title}
                      </h3>
                      <div className='flex flex-col gap-3'>
                        {renderStepCardContent(
                          step.content,
                          service.links,
                          lang,
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Outro */}
              {parsed.outro.length > 0 && (
                <div className='space-y-3 max-w-2xl'>
                  {parsed.outro.map((block, i) => (
                    <p
                      key={i}
                      className='text-gray-600 text-[15px] leading-relaxed'
                    >
                      {renderInline(block, service.links, lang)}
                    </p>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className='space-y-6'>
              {renderDescription(fullText, service.links, lang)}
            </div>
          )}

          {service.callout ? (
            <div className='mt-10 rounded-2xl border border-purple-primary/25 bg-purple-primary/5 px-8 py-8'>
              <p className='text-purple-primary font-semibold text-xl italic mb-1 text-center'>
                {service.callout}
              </p>
              <BookServiceButton
                slug={slug}
                serviceName={service.subtitle}
                b2b={serviceConfig?.b2b ?? false}
                variants={bookingVariants}
                ctaLabel={service.ctaLabel}
                alwaysShowLabel
              />
            </div>
          ) : (
            <BookServiceButton
              slug={slug}
              serviceName={service.subtitle}
              b2b={serviceConfig?.b2b ?? false}
              variants={bookingVariants}
              ctaLabel={service.ctaLabel}
            />
          )}
        </div>
      </main>
    </>
  );
}
