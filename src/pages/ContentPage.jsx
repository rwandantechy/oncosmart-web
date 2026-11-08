import PageBreadcrumb from "../components/layout/PageBreadcrumb";
import SiteFooter from "../components/layout/SiteFooter";
import SiteHeader from "../components/layout/SiteHeader";
import { CONTENT_PAGES, SEARCH_CALL_TO_ACTION, SOURCE_NOTE } from "../content/pages";
import { SEARCH } from "../content/search";
import { MAIN_CONTENT_ID } from "../content/states";

/** Renders any of the public information pages from its entry in CONTENT_PAGES. */
export default function ContentPage({ page }) {
  const { eyebrow, heading, intro, sections, sourceHref } = CONTENT_PAGES[page];

  return (
    <>
      <SiteHeader compact />
      <main id={MAIN_CONTENT_ID} className="container content-page">
        <PageBreadcrumb current={heading} />
        <div className="hero-copy">
          <p className="eyebrow">{eyebrow}</p>
          <h1>{heading}</h1>
          <p className="intro">{intro}</p>
        </div>
        {sections.map((section) => (
          <section className="content-section" key={section.heading}>
            <h2>{section.heading}</h2>
            {section.paragraphs?.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            {section.points && (
              <dl className="content-points">
                {section.points.map((point) => (
                  <div key={point.term}>
                    <dt>{point.term}</dt>
                    <dd>{point.text}</dd>
                  </div>
                ))}
              </dl>
            )}
            {section.bullets && (
              <ul className="key-points">
                {section.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            )}
          </section>
        ))}
        <section className="content-section content-cta">
          <h2>{SEARCH_CALL_TO_ACTION.heading}</h2>
          <p>{SEARCH_CALL_TO_ACTION.text}</p>
          <a className="inline-source-link" href={SEARCH_CALL_TO_ACTION.href}>
            {SEARCH_CALL_TO_ACTION.linkLabel}{" "}
            <span className="external-arrow" aria-hidden="true">
              {SEARCH.card.sourceGlyph}
            </span>
          </a>
        </section>
        <p className="methodology">
          <strong>{SOURCE_NOTE.strong}</strong>
          <a href={sourceHref} target="_blank" rel="noreferrer">
            {SOURCE_NOTE.linkLabel}
          </a>
        </p>
      </main>
      <SiteFooter />
    </>
  );
}
