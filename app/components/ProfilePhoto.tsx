import Image from "next/image";

export function ProfilePhoto({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`profile-photo${compact ? " compact" : ""}`}>
      <Image
        className="profile-photo-image"
        src="/profile-hyunjun.png"
        alt="Hyunjun Kim working on a laptop in a university study space"
        fill
        priority={!compact}
        sizes={compact ? "240px" : "(max-width: 900px) 90vw, 340px"}
      />
    </div>
  );
}
