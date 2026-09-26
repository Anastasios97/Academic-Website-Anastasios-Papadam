import React, { useEffect, useRef, useState } from 'react';
import type { Publication } from '../types';
import { toAPA, toBibTeX } from '../data/profile';

interface CiteButtonProps {
  publication: Publication;
  onCopied: (message: string) => void;
}

const copyText = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
};

const CiteButton: React.FC<CiteButtonProps> = ({ publication, onCopied }) => {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (event: MouseEvent | KeyboardEvent) => {
      if (event instanceof KeyboardEvent) {
        if (event.key === 'Escape') setOpen(false);
        return;
      }
      if (!wrapperRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', close);
    document.addEventListener('keydown', close);
    return () => {
      document.removeEventListener('mousedown', close);
      document.removeEventListener('keydown', close);
    };
  }, [open]);

  const copy = async (format: 'APA' | 'BibTeX') => {
    const ok = await copyText(format === 'APA' ? toAPA(publication) : toBibTeX(publication));
    onCopied(ok ? `${format} citation copied` : 'Copy failed. Please copy manually.');
    setOpen(false);
  };

  return (
    <div className="cite-wrapper" ref={wrapperRef}>
      <button
        type="button"
        className="cite-button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen(value => !value)}
      >
        Cite
      </button>
      {open && (
        <div className="cite-menu" role="menu">
          <button type="button" role="menuitem" onClick={() => copy('APA')}>Copy APA</button>
          <button type="button" role="menuitem" onClick={() => copy('BibTeX')}>Copy BibTeX</button>
        </div>
      )}
    </div>
  );
};

export default CiteButton;
