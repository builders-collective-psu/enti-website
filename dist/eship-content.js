// Delegation survives native Swup page transitions without duplicate listeners.
if (!window.__eshipContactReady) {
  window.__eshipContactReady = true;
  document.addEventListener('submit', (event) => {
    const form = event.target;
    if (!(form instanceof HTMLFormElement) || !form.matches('[data-eship-contact]')) return;
    event.preventDefault();
    if (!form.reportValidity()) return;
    const fields = new FormData(form);
    const subject = `ESHIP: ${fields.get('topic')}`;
    const body = `Name: ${fields.get('name')}\nEmail: ${fields.get('email')}\n\n${fields.get('message')}`;
    location.href = `mailto:eship@engr.psu.edu?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    form.querySelector('[data-eship-contact-status]').textContent = 'Your email draft is ready to open. Send it from your email app.';
  });
}

// Subscribe posts straight to Penn State LISTSERV, which emails a confirmation link.
if (!window.__eshipSubscribeReady) {
  window.__eshipSubscribeReady = true;
  document.addEventListener('submit', (event) => {
    const form = event.target;
    if (!(form instanceof HTMLFormElement) || !form.matches('[data-eship-subscribe]')) return;
    const status = form.querySelector('[data-eship-subscribe-status]');
    const email = form.elements.s.value.trim();
    form.elements.s.value = email;
    if (!form.reportValidity()) { event.preventDefault(); return; }
    // Prefer Penn State addresses, but let alumni and partners continue on a second submit.
    if (!/@([a-z0-9-]+\.)*psu\.edu$/i.test(email) && form.dataset.confirmedEmail !== email) {
      event.preventDefault();
      form.dataset.confirmedEmail = email;
      status.textContent = 'Penn State students and staff: please use your @psu.edu address. To subscribe with this address anyway, select Subscribe again.';
      form.elements.s.focus();
      return;
    }
    status.textContent = 'Almost done. Check your inbox for a confirmation email from Penn State LISTSERV.';
  });
}

// Newsroom: fill any feed container on first load and after Swup navigation.
if (!window.__eshipNewsReady) {
  window.__eshipNewsReady = true;
  const dateFormat = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  const element = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  };
  const render = async (section) => {
    section.dataset.eshipNewsLoaded = 'true';
    const list = section.querySelector('[data-eship-news-list]');
    const status = section.querySelector('[data-eship-news-status]');
    let body;
    try {
      const response = await fetch('/api/news', { headers: { Accept: 'application/json' } });
      body = await response.json();
    } catch {
      body = { status: 'unavailable', items: [] };
    }
    // Live feed unavailable (token rejected, offline, or static hosting): show the saved archive.
    if (body.status !== 'ok' || !body.items.length || body.stale) {
      try {
        const archive = await fetch('/newsroom-archive.json').then(response => response.json());
        if (archive.items?.length) body = { status: 'ok', items: archive.items, archivedAt: archive.savedAt };
      } catch {}
    }
    section.setAttribute('aria-busy', 'false');
    if (body.archivedAt) {
      const banner = element('p', 'eship-news-archived', `Archived announcements, saved ${dateFormat.format(new Date(body.archivedAt))}. This list may not be up to date; open the full archive for the latest messages.`);
      banner.setAttribute('role', 'note');
      list.before(banner);
    }
    if (body.status === 'ok' && body.items.length) {
      for (const item of body.items) {
        const entry = element('li', 'eship-news-item');
        const meta = element('span', 'eship-kicker', [item.date && dateFormat.format(new Date(item.date)), item.author].filter(Boolean).join(' · '));
        const heading = element('h3');
        const link = element('a', null, item.title);
        link.href = item.link; link.target = '_blank'; link.rel = 'noopener noreferrer';
        heading.append(link);
        entry.append(meta, heading);
        if (item.summary) entry.append(element('p', null, item.summary));
        list.append(entry);
      }
      status.textContent = '';
      return;
    }
    status.textContent = body.status === 'ok'
      ? 'No announcements yet. Subscribe above to hear about the next one.'
      : body.status === 'restricted'
        ? 'The list archive is open to subscribers only. Subscribe above, then sign in to Penn State LISTSERV to read past announcements.'
        : 'Announcements could not be loaded right now. Open the full archive or try again later.';
  };
  const scan = () => document.querySelectorAll('[data-eship-news]:not([data-eship-news-loaded])').forEach(render);
  scan();
  new MutationObserver(scan).observe(document.body, { childList: true, subtree: true });
}

// The opening <enti-intro> fades itself out; remove it once its sequence completes.
if (!window.__eshipOpeningReady) {
  window.__eshipOpeningReady = true;
  document.addEventListener('enti-intro-complete', (event) => {
    if (event.target instanceof Element && event.target.matches('[data-eship-opening]')) event.target.remove();
  });
}

// Video showcase: thumbnails swap the inline Vimeo player (delegated for Swup pages).
if (!window.__eshipPlayerReady) {
  window.__eshipPlayerReady = true;
  document.addEventListener('click', (event) => {
    const thumb = event.target instanceof Element && event.target.closest('[data-eship-video]');
    const player = thumb && thumb.closest('[data-eship-player]');
    if (!player) return;
    const { eshipVideo, title, category, description, creator } = thumb.dataset;
    const frame = player.querySelector('iframe');
    frame.src = `https://player.vimeo.com/video/${eshipVideo}?title=0&byline=0&portrait=0&autoplay=1`;
    frame.title = title;
    player.querySelector('[data-eship-player-title]').textContent = title;
    player.querySelector('[data-eship-player-category]').textContent = category;
    player.querySelector('[data-eship-player-description]').textContent = description;
    player.querySelector('[data-eship-player-creator]').textContent = creator;
    for (const other of player.querySelectorAll('[data-eship-video]')) other.setAttribute('aria-pressed', String(other === thumb));
  });
}

// Curriculum links (#engr-310 etc.) open the matching course.
if (!window.__eshipCourseReady) {
  window.__eshipCourseReady = true;
  const openCourse = () => {
    const target = location.hash && document.getElementById(decodeURIComponent(location.hash.slice(1)));
    if (target instanceof HTMLDetailsElement) { target.open = true; target.scrollIntoView({ block: 'start' }); }
  };
  addEventListener('hashchange', openCourse);
  openCourse();
  new MutationObserver(() => { if (location.hash && document.getElementById(location.hash.slice(1)) && !document.getElementById(location.hash.slice(1)).open) openCourse(); }).observe(document.body, { childList: true, subtree: true });
}
