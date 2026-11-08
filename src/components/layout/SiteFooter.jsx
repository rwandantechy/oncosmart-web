import { ASSETS } from "../../config/assets";
import { FOOTER, copyrightLine } from "../../content/site";
import Icon from "../Icon";

function isExternal(href) {
  return href.startsWith("http");
}

export default function SiteFooter() {
  return (
    <footer id={FOOTER.id} className="site-footer">
      <div className="footer-banner">
        {FOOTER.banner} <span>{FOOTER.hashtag}</span>
      </div>
      <div className="container site-footer-inner">
        <p className="footer-description">{FOOTER.description}</p>
        <p className="footer-copyright">{copyrightLine(new Date().getFullYear())}</p>
        <img src={ASSETS.partnerLogo} alt={FOOTER.partnerLogoAlt} />
        <div className="footer-links">
          {FOOTER.links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              {...(isExternal(link.href) ? { target: "_blank", rel: "noreferrer" } : {})}
            >
              {link.label}
            </a>
          ))}
        </div>
        <div className="footer-socials" aria-label={FOOTER.socialLabel}>
          {FOOTER.socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              aria-label={social.label}
              target="_blank"
              rel="noreferrer"
            >
              <Icon name={social.icon} variant="brand" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
