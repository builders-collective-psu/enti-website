const GRID = "<svg class=\"loader-grid\" viewBox=\"0 0 220 220\">\n          <defs>\n            <mask id=\"enti-guide-mask\" maskUnits=\"userSpaceOnUse\" x=\"-110\" y=\"-110\" width=\"440\" height=\"440\">\n              <rect x=\"-110\" y=\"-110\" width=\"440\" height=\"440\" fill=\"white\" />\n              <rect class=\"grid-logo-clear\" x=\"70\" y=\"49\" width=\"78\" height=\"120\" rx=\"14\" fill=\"black\" />\n            </mask>\n          </defs>\n          <g mask=\"url(#enti-guide-mask)\">\n          <path class=\"grid-axes\" d=\"M110 0v220M0 110h220\"/>\n          <path class=\"grid-frame\" d=\"M64 16H156L204 64V156L156 204H64L16 156V64ZM70 30H150L190 70V150L150 190H70L30 150V70Z\"/>\n          <path class=\"grid-diagonal\" d=\"M12 42L178 208M42 12L208 178M12 178L178 12M42 208L208 42\"/>\n          <path class=\"grid-ticks\" d=\"M20 66h14M20 154h14M186 66h14M186 154h14M66 20v14M154 20v14M66 186v14M154 186v14\"/>\n          <circle class=\"grid-circle grid-circle-outer\" cx=\"110\" cy=\"110\" r=\"72\"/>\n          <circle class=\"grid-circle grid-circle-inner\" cx=\"110\" cy=\"110\" r=\"42\"/>\n          <path class=\"grid-baseline\" d=\"M18 168h184M18 176h184\"/>\n          </g>\n        </svg>";
const HEAD = "<svg class=\"loader-head\" viewBox=\"0 0 180 180\"><path class=\"head-outline\" d=\"M76 153v-22H57c-18 0-31-12-31-30V83c0-34 26-59 60-59h29l14 15c7 7 4 17-5 20H108M76 153h36v-23h6\"/><path class=\"head-line\" d=\"M73 67h27M73 88h42M73 109h27\"/><circle class=\"head-node\" cx=\"108\" cy=\"67\" r=\"8\"/><circle class=\"head-node\" cx=\"123\" cy=\"88\" r=\"8\"/><circle class=\"head-node\" cx=\"108\" cy=\"109\" r=\"8\"/><circle class=\"head-node\" cx=\"126\" cy=\"130\" r=\"8\"/></svg>";
// Shared ENTI construction sequence: the opening loader and faster footer use this exact markup and stylesheet.
export const INTRO_DURATION_MS = 7800;
const introLabel = 'ESHIP \u2014 BUILD REAL HARDWARE';
const introCipher = '7f0d9a2ce13b44a8c0de5eed96b214f302a89c713dbe6085f4a71e20c39bd652';
// Letter stagger tuned for the original 23-character label; longer labels spread across the same window.
const decodeStep = .145 * 22 / Math.max(22, introLabel.length - 1);
let instance = 0;
class EntiIntro extends HTMLElement {
  connectedCallback() {
    if (this.shadowRoot) return;
    const speed = Math.max(.1, Number(this.getAttribute('speed')) || 1);
    this.style.setProperty('--intro-speed', String(speed));
    const root = this.attachShadow({mode:'open'});
    const maskId = `enti-guide-mask-${++instance}`;
    const chars = Array.from(introLabel, (letter, index) => `<span class="decode-cell" style="--decode-delay:${(2.8 + index * decodeStep) / speed}s"><span class="decode-reel">${Array.from({length:5}, (_,row) => `<span>${introCipher[(index+row*13)%introCipher.length].toUpperCase()}</span>`).join('')}<span>${letter === ' ' ? '&nbsp;' : letter}</span></span></span>`).join('');
    root.innerHTML = `<link rel="stylesheet" href="/enti-intro.css"><div class="eship-loader" aria-label="${this.getAttribute('mode') === 'footer' ? 'ESHIP' : 'Loading ESHIP'}"><div class="eship-loader-visual" aria-hidden="true">${GRID.replaceAll('enti-guide-mask',maskId)}${HEAD}<div class="loader-burst">${Array.from({length:18},(_,i)=>`<i style="--i:${i}"></i>`).join('')}</div></div><div class="eship-loader-word loader-decode" aria-label="${introLabel}"><span class="decode-chars" aria-hidden="true">${chars}</span></div><div class="eship-loader-line"><b></b></div></div>`;
    if (this.getAttribute('mode') !== 'footer') {
      this.timer = setTimeout(() => this.dispatchEvent(new CustomEvent('enti-intro-complete', {bubbles:true,composed:true})), INTRO_DURATION_MS / speed);
    }
    if (this.getAttribute('mode') === 'footer') {
      this.observer = new IntersectionObserver(entries => {
        for (const entry of entries) if (entry.isIntersecting) {
          this.classList.add('running');
        } else {
          this.classList.remove('running');
          const sequence = root.querySelector('.eship-loader');
          sequence.replaceWith(sequence.cloneNode(true));
        }
      }, {threshold:.35});
      this.observer.observe(this);
    }
  }
  disconnectedCallback() { this.observer?.disconnect(); clearTimeout(this.timer); }
}
if (!customElements.get('enti-intro')) customElements.define('enti-intro',EntiIntro);
