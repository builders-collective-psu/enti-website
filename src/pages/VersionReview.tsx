import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './version-review.css';
import { useElementPicker, useSelectedElementHighlight, type ElementSelection } from '../hooks/useElementPicker';

export const versions = [
  { id: 'v1', name: 'The initial draft', subtitle: 'Curiosity. Creativity. Action.', description: 'An editorial, multi-page concept with bold serif accents, colorful pathway cards, and a playful ring sculpture.', features: ['Original hero & typography', 'Cluster explorer', 'Static multi-page navigation'], commit: 'c50fd02', shape: '✳', path: '/versions/v1/' },
  { id: 'v2', name: 'The React redesign', subtitle: 'Ideas in motion.', description: 'A technical, single-page direction with scroll-driven 3D choreography, blueprint grids, and a builder-focused curriculum.', features: ['Scroll-driven 3D', 'Technical visual language', 'Single-page storytelling'], commit: '9ae4995', shape: '◇', path: '/versions/v2/' },
  { id: 'v3', name: 'The expanded redesign', subtitle: 'More of the E-SHIP story.', description: 'The mechanical assembly direction, with the ranking badge, video showcase, programs and grants, and travel experiences.', features: ['Mechanical 3D assembly', 'Programs & treks', 'Ranking & video showcase'], commit: '431efc0', shape: '⚙', path: '/versions/v3/' },
  { id: 'v4', name: 'The multi-page design', subtitle: 'A little more room to explore.', description: 'The latest draft, organized into dedicated pages with a larger ranking card, inline videos, and more readable mobile type.', features: ['Dedicated page routes', 'Inline video player', 'Mobile navigation & type'], commit: 'd21cf74', shape: '↗', path: '/versions/v4/' },
  { id: 'v5', name: 'The immersive ESHIP site', subtitle: 'Make something useful.', description: 'The current direction: a WebGL glass world with the ENTI intro, academic pages, a live newsroom from the ENTI minor mailing list, and inline program videos.', features: ['Immersive 3D runtime', 'Newsroom & list signup', 'Program video player'], commit: 'dev', shape: '◎', path: '/eship/' },
];

export function VersionLanding() {
  return <div className="review-hub">
    <header className="hub-header"><Link to="/" className="hub-brand">E—SHIP <span>DESIGN REVIEW</span></Link><div className="hub-header-meta"><span className="hub-date">FOUR DIRECTIONS · ONE PROGRAM</span><a className="hub-github" href="https://github.com/builders-collective-psu/enti-website" target="_blank" rel="noreferrer" aria-label="View the repository on GitHub" title="View the repository on GitHub"><svg viewBox="0 0 16 16" width="18" height="18" aria-hidden="true" focusable="false"><path fill="currentColor" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z"/></svg></a></div></header>
    <main className="hub-main">
      <section className="hub-intro"><p className="hub-eyebrow">PENN STATE ENGINEERING ENTREPRENEURSHIP</p><h1>Find the pieces<br />you <em>like best.</em></h1><p>Explore the five drafts of the E-SHIP website. Each version is saved as it looked at that stage, so you can compare the details and help shape what comes next.</p></section>
      <div className="version-grid">{versions.map((version, index) => <article className={`version-card card-${version.id}`} key={version.id}>
        <Link className="version-art" to={`/review/${version.id}`} aria-label={`Explore ${version.id.toUpperCase()}: ${version.name}`}><span className="version-number">{version.id.toUpperCase()}{index === versions.length - 1 && <small>CURRENT</small>}</span><span className="version-symbol" aria-hidden="true">{version.shape}</span><span className="version-caption">{version.subtitle}</span></Link>
        <div className="version-details"><h2>{version.name}</h2><p>{version.description}</p><ul>{version.features.map(feature => <li key={feature}>{feature}</li>)}</ul><Link className="version-open" to={`/review/${version.id}`}>Explore {version.id.toUpperCase()} <span aria-hidden="true">↗</span></Link></div>
      </article>)}</div>
      <section className="review-instructions"><span className="hub-eyebrow">HOW TO LEAVE FEEDBACK</span><h2>A favorite detail is a great starting point.</h2><p>Open a version and choose “Select an element” to click a heading, image, or detail. Add your name, feedback, and any suggested wording, then save your note for the website team.</p><blockquote>“I prefer the hero typography in V1, the mechanical animation in V3, and the page navigation in V4.”</blockquote></section>
    </main><footer className="hub-footer"><span>E-SHIP · DESIGN EXPLORATIONS</span><span>Snapshots from October 1, 2026</span></footer>
  </div>;
}

export function VersionViewer() {
  const { version: id } = useParams();
  const version = versions.find(item => item.id === id);
  const frame = useRef<HTMLIFrameElement>(null);
  const [showNote, setShowNote] = useState(false);
  const [element, setElement] = useState('');
  const [note, setNote] = useState('');
  const [status, setStatus] = useState('');
  const [reviewerName, setReviewerName] = useState(() => {
    try { return localStorage.getItem('eship-reviewer-name') || ''; } catch { return ''; }
  });
  const [replacementText, setReplacementText] = useState('');
  const [selection, setSelection] = useState<ElementSelection | null>(null);
  const [picking, setPicking] = useState(false);
  const [saving, setSaving] = useState(false);
  const [savedCount, setSavedCount] = useState(0);
  const submission = useRef({ id: crypto.randomUUID(), payload: '' });
  const nameInput = useRef<HTMLInputElement>(null);
  const pickElement = useCallback((picked: ElementSelection) => {
    setSelection(picked);
    setElement(`${picked.element.tag.toUpperCase()}: ${picked.element.ariaLabel || picked.element.text || 'Visual element'}`.slice(0, 200));
    setPicking(false); setShowNote(true); setStatus('');
    window.setTimeout(() => nameInput.current?.focus(), 0);
  }, []);
  const cancelPicking = useCallback(() => setPicking(false), []);
  useElementPicker(frame, picking, pickElement, cancelPicking);
  useSelectedElementHighlight(frame, selection, picking);
  useEffect(() => { setShowNote(false); setPicking(false); setSelection(null); setElement(''); setNote(''); setReplacementText(''); setStatus(''); }, [id]);
  useEffect(() => {
    const cancel = (event: KeyboardEvent) => { if (event.key === 'Escape') setPicking(false); };
    window.addEventListener('keydown', cancel);
    return () => window.removeEventListener('keydown', cancel);
  }, []);
  if (!version) return <div className="review-hub invalid-version"><h1>Version not found</h1><Link to="/">Return to all versions</Link></div>;
  function currentPage() {
    return selection?.page || (frame.current?.contentWindow ? frame.current.contentWindow.location.pathname + frame.current.contentWindow.location.search + frame.current.contentWindow.location.hash : version!.path);
  }
  async function copyNote() {
    if (!element.trim() || (!note.trim() && !replacementText.trim())) { setStatus('Add the element and feedback or suggested wording first.'); return; }
    const message = `E-SHIP design feedback\nReviewer: ${reviewerName.trim()}\nVersion: ${version!.id.toUpperCase()} — ${version!.name}\nPage: ${location.origin}${currentPage()}\nElement: ${element.trim()}\nCurrent text: ${selection?.element.text || ''}\nSelector: ${selection?.element.selector || ''}\nSuggested wording: ${replacementText.trim()}\nFeedback: ${note.trim()}\nReview link: ${location.href}`;
    try { await navigator.clipboard.writeText(message); setStatus('Copied! Paste this note into your email or message.'); }
    catch { setStatus('Clipboard unavailable. Copy the note below.'); setNote(message); }
  }
  async function saveNote(event: React.FormEvent) {
    event.preventDefault();
    if (saving) return;
    const payload = { reviewerName, version: id, page: currentPage(), elementLabel: element, element: selection?.element || null, comment: note, replacementText };
    if (!reviewerName.trim() || !element.trim() || (!note.trim() && !replacementText.trim())) { setStatus('Add your name, an element, and feedback or suggested wording.'); return; }
    const fingerprint = JSON.stringify(payload);
    if (submission.current.payload !== fingerprint) submission.current = { id: crypto.randomUUID(), payload: fingerprint };
    setSaving(true); setStatus('Saving your feedback…');
    try {
      const response = await fetch('/api/feedback', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...payload, submissionId: submission.current.id }), signal: AbortSignal.timeout(15000) });
      const result = await response.json();
      if (!response.ok || !result.saved) throw new Error(result.error || 'Could not save feedback. Please try again.');
      try { localStorage.setItem('eship-reviewer-name', reviewerName.trim()); } catch { /* Storage may be disabled. */ }
      setSavedCount(count => count + 1);
      setStatus(`Saved! Your note is with the website team. Reference: ${result.id.slice(0, 8)}. Select another element to add more feedback.`);
      setNote(''); setReplacementText('');
      submission.current = { id: crypto.randomUUID(), payload: '' };
    } catch (error) { setStatus(error instanceof Error ? error.message : 'Could not save feedback. Your note is still here; please try again.'); }
    finally { setSaving(false); }
  }
  function startPicking() { setPicking(true); setShowNote(false); setStatus(''); }
  return <div className="version-viewer">
    <header className="viewer-toolbar"><Link to="/" className="viewer-back">← All versions</Link><nav aria-label="Switch design version">{versions.map(item => <Link key={item.id} to={`/review/${item.id}`} aria-current={item.id === id ? 'page' : undefined}>{item.id.toUpperCase()}</Link>)}</nav><div className="viewer-actions"><button className={picking ? 'picker-active' : ''} onClick={picking ? cancelPicking : startPicking} aria-pressed={picking} disabled={saving}>{picking ? 'Cancel selection' : 'Select an element'} <span aria-hidden="true">⌖</span></button><button onClick={() => { setPicking(false); setShowNote(!showNote); setStatus(''); }} aria-expanded={showNote}>Leave a note <span aria-hidden="true">✎</span></button></div></header>
    <div className="viewer-label"><strong>{version.id.toUpperCase()} · {version.name}</strong><span>{savedCount > 0 ? `${savedCount} note${savedCount === 1 ? '' : 's'} saved this session` : 'Select a detail and share your feedback with the website team.'}</span></div>
    {picking && <div className="picker-instructions" role="status">Click a heading, image, or detail to comment on it. Keyboard: Tab to a detail, Enter to select, Esc to cancel.</div>}
    <iframe key={id} ref={frame} className="version-frame" src={version.path} title={`${version.id.toUpperCase()} — ${version.name}`} />
    {showNote && <aside className="feedback-panel" aria-label="Design feedback"><div className="feedback-title"><h2>Your thoughts on {version.id.toUpperCase()}</h2><button onClick={() => setShowNote(false)} aria-label="Close feedback">×</button></div><p>Save a note for the website team. Your name, version, page, and selected detail are included.</p>
      {selection && <div className="selected-detail"><span>SELECTED {selection.element.tag.toUpperCase()}</span><blockquote>{selection.element.text || selection.element.ariaLabel || 'Visual element'}</blockquote><small>{selection.element.section && `${selection.element.section} · `}{selection.page}</small><button type="button" onClick={startPicking}>Choose another element</button></div>}
      <form onSubmit={saveNote}><fieldset disabled={saving}><label>Your name<input ref={nameInput} autoComplete="name" required maxLength={100} value={reviewerName} onChange={e => setReviewerName(e.target.value)} placeholder="e.g. Professor Smith" /></label><label>Element or section<input required maxLength={200} value={element} onChange={e => setElement(e.target.value)} placeholder="e.g. Homepage hero typography" /></label><label>Suggested wording <span className="optional-field">optional</span><textarea rows={2} maxLength={3000} value={replacementText} onChange={e => setReplacementText(e.target.value)} placeholder="Replace the heading with…" /></label><label>Feedback <span className="optional-field">or just add wording above</span><textarea rows={3} maxLength={6000} value={note} onChange={e => setNote(e.target.value)} placeholder="What would you keep or change, and why?" /></label><button className="copy-note" type="submit">{saving ? 'Saving…' : 'Save feedback ↗'}</button><button type="button" className="copy-feedback-secondary" onClick={copyNote}>Copy note instead</button></fieldset></form><p className="feedback-status" role="status">{status || 'Saved notes are collected by the website team. Your name is remembered on this browser.'}</p></aside>}
  </div>;
}
