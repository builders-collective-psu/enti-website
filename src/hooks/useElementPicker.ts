import { useEffect, type RefObject } from 'react';

export type SelectedElement = {
  selector: string;
  tag: string;
  text: string;
  ariaLabel: string;
  section: string;
  imageSrc: string;
};
export type ElementSelection = { page: string; element: SelectedElement };
const candidates = 'h1,h2,h3,h4,h5,h6,p,li,a,button,label,img,svg,input,textarea,select,canvas,iframe,section,article';

function originalText(element: Element | null | undefined) {
  if (!element) return '';
  // Preserve source casing while keeping words on either side of line breaks apart.
  const clone = element.cloneNode(true) as Element;
  clone.querySelectorAll('br').forEach(br => br.replaceWith(' '));
  return (clone.textContent || '').replace(/\s+/g, ' ').trim();
}

function selectorFor(element: Element, doc: Document) {
  const segments: string[] = [];
  let current: Element | null = element;
  while (current && current.tagName !== 'HTML') {
    if (current.id && doc.querySelectorAll(`#${CSS.escape(current.id)}`).length === 1) {
      segments.unshift(`#${CSS.escape(current.id)}`);
      break;
    }
    const siblings = current.parentElement ? Array.from(current.parentElement.children).filter(child => child.tagName === current!.tagName) : [current];
    segments.unshift(`${current.tagName.toLowerCase()}:nth-of-type(${siblings.indexOf(current) + 1})`);
    current = current.parentElement;
  }
  return segments.join(' > ');
}

export function useElementPicker(frame: RefObject<HTMLIFrameElement | null>, enabled: boolean, onPick: (selection: ElementSelection) => void, onCancel: () => void) {
  useEffect(() => {
    const iframe = frame.current;
    if (!iframe || !enabled) return;
    let detach = () => {};
    function attach() {
      detach();
      const doc = iframe!.contentDocument;
      const win = iframe!.contentWindow;
      if (!doc?.body || !win) return;
      const overlay = doc.createElement('div');
      overlay.setAttribute('aria-hidden', 'true');
      overlay.style.cssText = 'position:fixed;pointer-events:none;z-index:2147483647;border:3px solid #d5f44a;background:#d5f44a18;border-radius:4px;box-sizing:border-box;display:none;';
      doc.body.appendChild(overlay);
      const style = doc.createElement('style');
      style.textContent = 'body,body *{cursor:crosshair!important}';
      doc.head.appendChild(style);
      let hovered: Element | null = null;
      const previousTabIndexes = new Map<Element, string | null>();
      doc.querySelectorAll(candidates).forEach(el => {
        previousTabIndexes.set(el, el.getAttribute('tabindex'));
        if (!el.matches('a,button,input,textarea,select')) el.setAttribute('tabindex', '0');
      });
      const position = () => {
        if (!hovered?.isConnected) { overlay.style.display = 'none'; return; }
        const rect = hovered.getBoundingClientRect();
        Object.assign(overlay.style, { display: 'block', left: `${rect.left}px`, top: `${rect.top}px`, width: `${rect.width}px`, height: `${rect.height}px` });
      };
      const targetElement = (target: EventTarget | null) => target && 'nodeType' in target && (target as Node).nodeType === 1 ? (target as Element).closest(candidates) : null;
      const hover = (event: Event) => { hovered = targetElement(event.target); position(); };
      const select = (event: Event) => {
        // Every click is captured so links and controls do not activate in picker mode.
        event.preventDefault(); event.stopPropagation(); event.stopImmediatePropagation();
        const element = targetElement(event.target);
        if (!element) return;
        const container = element.closest('section,article');
        const sectionHeading = container?.querySelector('h1') || container?.querySelector('h2,h3,h4');
        const text = originalText(element).slice(0, 1800);
        onPick({ page: win!.location.pathname + win!.location.search + win!.location.hash, element: {
          selector: selectorFor(element, doc!).slice(0, 2000), tag: element.tagName.toLowerCase(), text,
          ariaLabel: (element.getAttribute('aria-label') || element.getAttribute('alt') || '').slice(0, 300),
          section: (originalText(sectionHeading) || container?.id || '').slice(0, 300),
          imageSrc: (element.getAttribute('src') || '').slice(0, 2048),
        } });
      };
      const key = (event: KeyboardEvent) => {
        if (event.key === 'Escape') { event.preventDefault(); event.stopImmediatePropagation(); onCancel(); }
        else if (event.key === 'Enter' || event.key === ' ') select(event);
      };
      doc.addEventListener('pointerover', hover, true);
      doc.addEventListener('focusin', hover, true);
      doc.addEventListener('click', select, true);
      doc.addEventListener('keydown', key, true);
      win.addEventListener('scroll', position, true);
      win.addEventListener('resize', position);
      detach = () => {
        doc.removeEventListener('pointerover', hover, true);
        doc.removeEventListener('focusin', hover, true);
        doc.removeEventListener('click', select, true);
        doc.removeEventListener('keydown', key, true);
        win.removeEventListener('scroll', position, true);
        win.removeEventListener('resize', position);
        previousTabIndexes.forEach((value, el) => value === null ? el.removeAttribute('tabindex') : el.setAttribute('tabindex', value));
        overlay.remove(); style.remove();
      };
    }
    attach();
    iframe.addEventListener('load', attach);
    return () => { iframe.removeEventListener('load', attach); detach(); };
  }, [frame, enabled, onPick, onCancel]);
}

export function useSelectedElementHighlight(frame: RefObject<HTMLIFrameElement | null>, selection: ElementSelection | null, picking: boolean) {
  useEffect(() => {
    const iframe = frame.current;
    if (!iframe || !selection || picking) return;
    let detach = () => {};
    function highlight() {
      detach();
      const doc = iframe!.contentDocument;
      const win = iframe!.contentWindow;
      if (!doc || !win || win.location.pathname + win.location.search + win.location.hash !== selection!.page) return;
      let element: Element | null;
      try { element = doc.querySelector(selection!.element.selector); } catch { return; }
      if (!element) return;
      const style = doc.createElement('style');
      style.textContent = '[data-eship-review-selected]{outline:3px solid #d5f44a!important;outline-offset:5px!important;border-radius:3px}';
      doc.head.appendChild(style);
      element.setAttribute('data-eship-review-selected', 'true');
      detach = () => { style.remove(); element?.removeAttribute('data-eship-review-selected'); };
    }
    highlight();
    iframe.addEventListener('load', highlight);
    return () => { iframe.removeEventListener('load', highlight); detach(); };
  }, [frame, selection, picking]);
}
