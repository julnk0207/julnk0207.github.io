type ContactIconName = "mail" | "linkedin" | "github" | "instagram" | "x";

const contacts: Array<{
  label: string;
  value: string;
  href: string;
  icon: ContactIconName;
  external?: boolean;
}> = [
  {
    label: "Email",
    value: "julnk0207@gmail.com",
    href: "mailto:julnk0207@gmail.com",
    icon: "mail",
  },
  {
    label: "LinkedIn",
    value: "Hyunjun Kim",
    href: "https://www.linkedin.com/in/hyunjun-kim-58a914264/",
    icon: "linkedin",
    external: true,
  },
  {
    label: "GitHub",
    value: "@julnk0207",
    href: "https://github.com/julnk0207",
    icon: "github",
    external: true,
  },
  {
    label: "Instagram",
    value: "@julnk0207",
    href: "https://www.instagram.com/julnk0207?igsh=anhobmZna3owdDRo&utm_source=qr",
    icon: "instagram",
    external: true,
  },
  {
    label: "X / Twitter",
    value: "@julnk0207",
    href: "https://x.com/julnk0207",
    icon: "x",
    external: true,
  },
];

function ContactIcon({ name }: { name: ContactIconName }) {
  const paths: Record<ContactIconName, React.ReactNode> = {
    mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
    linkedin: <><path d="M7 9v8" /><path d="M7 6.5v.01" /><path d="M11 17v-8" /><path d="M11 12.5a4 4 0 0 1 8 0V17" /></>,
    github: <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3.3-.4 6.8-1.6 6.8-7A5.5 5.5 0 0 0 19.3 3.7 5.1 5.1 0 0 0 19.1 0S18 0 15 1.5a13.4 13.4 0 0 0-7 0C5 0 3.9 0 3.9 0a5.1 5.1 0 0 0-.2 3.7A5.5 5.5 0 0 0 2.2 7.5c0 5.4 3.5 6.6 6.8 7A4.8 4.8 0 0 0 8 18v4" />,
    instagram: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".8" className="icon-fill" /></>,
    x: <path d="M4 3h4.7l3.9 5.2L17 3h3l-6 7.5L21 21h-4.7l-4.4-5.9L7 21H4l6.5-8.2L4 3Z" />,
  };

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      {paths[name]}
    </svg>
  );
}

export function ContactLinks({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`contact-links${compact ? " contact-links-compact" : ""}`}>
      {contacts.map((contact) => (
        <a
          className="contact-link"
          href={contact.href}
          key={contact.label}
          {...(contact.external ? { target: "_blank", rel: "noreferrer" } : {})}
        >
          <span className="contact-icon"><ContactIcon name={contact.icon} /></span>
          <span className="contact-copy">
            <span className="contact-label">{contact.label}</span>
            <strong>{contact.value}</strong>
          </span>
          <span className="contact-arrow" aria-hidden="true">↗</span>
        </a>
      ))}
    </div>
  );
}
