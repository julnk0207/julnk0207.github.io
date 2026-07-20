type FactIconName = "location" | "education" | "research";
type ProfileFactsVariant = "home" | "about";

const sharedFacts: Array<{
  label: string;
  value: string;
  href: string;
  icon: FactIconName;
}> = [
  {
    label: "Based in",
    value: "Suwon, Korea",
    href: "https://maps.app.goo.gl/pHKQiMkCU4TKgk936",
    icon: "location",
  },
  {
    label: "Studying at",
    value: "Seoul National University",
    href: "https://en.snu.ac.kr",
    icon: "education",
  },
  {
    label: "Researching at",
    value: "DSAIL",
    href: "https://data.snu.ac.kr/",
    icon: "research",
  },
];

function FactIcon({ name }: { name: FactIconName }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      {name === "location" && (
        <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>
      )}
      {name === "education" && (
        <><path d="m3 9 9-5 9 5-9 5-9-5Z" /><path d="M7 12v4c2.7 2 7.3 2 10 0v-4" /><path d="M21 9v6" /></>
      )}
      {name === "research" && (
        <><path d="M9 3h6" /><path d="M10 3v6l-5 9a2 2 0 0 0 1.8 3h10.4A2 2 0 0 0 19 18l-5-9V3" /><path d="M8 15h8" /></>
      )}
    </svg>
  );
}

export function ProfileFacts({ variant }: { variant: ProfileFactsVariant }) {
  return (
    <dl className={`profile-facts profile-facts-${variant}`} aria-label="Profile details">
      {sharedFacts.map((fact) => (
        <div className="profile-fact" key={fact.label}>
          <span className="profile-fact-icon"><FactIcon name={fact.icon} /></span>
          <div>
            <dt>{fact.label}</dt>
            <dd>
              <a href={fact.href} target="_blank" rel="noreferrer">
                {fact.value}<span aria-hidden="true">↗</span>
              </a>
            </dd>
          </div>
        </div>
      ))}
    </dl>
  );
}
