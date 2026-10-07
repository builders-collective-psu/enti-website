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
