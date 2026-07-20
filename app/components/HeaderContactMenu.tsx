"use client";

import { useEffect, useRef, useState } from "react";
import { ContactLinks } from "./ContactLinks";

export function HeaderContactMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    function closeOnOutsideClick(event: MouseEvent) {
      if (event.target instanceof Node && !menuRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    }

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
        buttonRef.current?.focus();
      }
    }

    document.addEventListener("mousedown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("mousedown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [isOpen]);

  return (
    <div className="header-contact-menu" ref={menuRef}>
      <button
        className="header-contact"
        type="button"
        aria-expanded={isOpen}
        aria-controls="header-contact-popover"
        onClick={() => setIsOpen((open) => !open)}
        ref={buttonRef}
      >
        Let&apos;s Connect <span aria-hidden="true">{isOpen ? "×" : "↗"}</span>
      </button>
      {isOpen && (
        <div
          className="header-contact-popover"
          id="header-contact-popover"
          onClick={(event) => {
            if (event.target instanceof Element && event.target.closest("a")) {
              setIsOpen(false);
            }
          }}
        >
          <p className="eyebrow">Let&apos;s Connect</p>
          <ContactLinks compact />
        </div>
      )}
    </div>
  );
}
