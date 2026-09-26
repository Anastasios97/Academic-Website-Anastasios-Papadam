import React, { useEffect, useMemo, useRef, useState } from 'react';

export interface PaletteCommand {
  id: string;
  label: string;
  group: string;
  hint?: string;
  keywords?: string;
  run: () => void;
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  commands: PaletteCommand[];
}

const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose, commands }) => {
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const results = useMemo(() => {
    const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
    if (terms.length === 0) return commands;
    return commands.filter(command => {
      const haystack = `${command.label} ${command.group} ${command.keywords ?? ''}`.toLowerCase();
      return terms.every(term => haystack.includes(term));
    });
  }, [commands, query]);

  useEffect(() => {
    if (!isOpen) return;
    setQuery('');
    setActiveIndex(0);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => inputRef.current?.focus());
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  useEffect(() => {
    listRef.current
      ?.querySelector<HTMLElement>(`[data-index="${activeIndex}"]`)
      ?.scrollIntoView({ block: 'nearest' });
  }, [activeIndex]);

  if (!isOpen) return null;

  const execute = (command: PaletteCommand | undefined) => {
    if (!command) return;
    onClose();
    command.run();
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      onClose();
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActiveIndex(index => (results.length ? (index + 1) % results.length : 0));
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveIndex(index => (results.length ? (index - 1 + results.length) % results.length : 0));
    } else if (event.key === 'Enter') {
      event.preventDefault();
      execute(results[activeIndex]);
    }
  };

  let lastGroup = '';

  return (
    <div className="palette-backdrop" onClick={onClose} role="presentation">
      <div
        className="palette-panel"
        role="dialog"
        aria-modal="true"
        aria-label="Quick navigation"
        onClick={event => event.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        <div className="palette-search">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" strokeLinecap="round" />
          </svg>
          <input
            ref={inputRef}
            value={query}
            onChange={event => setQuery(event.target.value)}
            placeholder="Search sections, papers, actions…"
            aria-label="Search the site"
            aria-controls="palette-results"
            aria-activedescendant={results[activeIndex] ? `palette-${results[activeIndex].id}` : undefined}
            role="combobox"
            aria-expanded="true"
          />
          <kbd>esc</kbd>
        </div>

        <ul id="palette-results" ref={listRef} className="palette-results" role="listbox">
          {results.map((command, index) => {
            const showGroup = command.group !== lastGroup;
            lastGroup = command.group;
            return (
              <React.Fragment key={command.id}>
                {showGroup && <li className="palette-group" role="presentation">{command.group}</li>}
                <li
                  id={`palette-${command.id}`}
                  data-index={index}
                  role="option"
                  aria-selected={index === activeIndex}
                  className={index === activeIndex ? 'palette-item active' : 'palette-item'}
                  onMouseMove={() => setActiveIndex(index)}
                  onClick={() => execute(command)}
                >
                  <span>{command.label}</span>
                  {command.hint && <small>{command.hint}</small>}
                </li>
              </React.Fragment>
            );
          })}
          {results.length === 0 && (
            <li className="palette-empty">No matches for “{query}”.</li>
          )}
        </ul>

        <footer className="palette-footer">
          <span><kbd>↑</kbd><kbd>↓</kbd> navigate</span>
          <span><kbd>↵</kbd> open</span>
          <span><kbd>esc</kbd> close</span>
        </footer>
      </div>
    </div>
  );
};

export default CommandPalette;
