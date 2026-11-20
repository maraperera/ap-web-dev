// Footer year
document.querySelectorAll('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });

// Enquiry form.
// To start receiving enquiries, put a form endpoint in the form's data-endpoint attribute in index.html,
// for example a Formspree URL: data-endpoint="https://formspree.io/f/your-id"
document.querySelectorAll('form[data-endpoint]').forEach((form) => {
  const status = form.querySelector('.form__status');
  const button = form.querySelector('button[type="submit"]');
  const label = button.textContent;

  const say = (text, state) => { status.textContent = text; if (state) status.dataset.state = state; else delete status.dataset.state; };

  const messageFor = (input) => {
    if (input.validity.valueMissing) return input.type === 'email' ? 'Add your email so I can reply.' : 'This one is needed.';
    if (input.validity.typeMismatch) return 'That email looks incomplete. Write it as name@example.com.';
    return '';
  };

  const check = (input) => {
    const err = input.id && form.querySelector('#' + input.id + '-err');
    const ok = input.checkValidity();
    input.setAttribute('aria-invalid', ok ? 'false' : 'true');
    if (err) err.textContent = ok ? '' : messageFor(input);
    return ok;
  };

  form.querySelectorAll('input[required]').forEach((input) => {
    input.addEventListener('blur', () => { if (input.value) check(input); });
    input.addEventListener('input', () => { if (input.getAttribute('aria-invalid') === 'true') check(input); });
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const required = [...form.querySelectorAll('input[required]')];
    const bad = required.filter((input) => !check(input));
    if (bad.length) { say('A few details are missing. Check the fields marked in red.', 'error'); bad[0].focus(); return; }

    if (!form.dataset.endpoint) { say('Nothing was sent: this form is not connected yet. Please DM @anthonyperera101 on TikTok for now.', 'error'); return; }

    button.disabled = true; button.setAttribute('aria-busy', 'true'); button.textContent = 'Sending…';
    say('');
    try {
      const data = new FormData(form);
      data.set('needs', data.getAll('needs').join(', '));
      const res = await fetch(form.dataset.endpoint, { method: 'POST', body: data, headers: { Accept: 'application/json' } });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      required.forEach((input) => input.removeAttribute('aria-invalid'));
      say('Thanks, your enquiry is in. I’ll be in touch at the email you gave.', 'ok');
    } catch {
      say('That didn’t go through. Try again in a minute, or DM @anthonyperera101 on TikTok.', 'error');
    } finally {
      button.disabled = false; button.removeAttribute('aria-busy'); button.textContent = label;
    }
  });
});

// Slots: swap the built concept samples for real screenshots without touching the layout, e.g.
// hallmarkSlots({ 'concept-barber': 'assets/barber.png', 'concept-cleaning': 'assets/cleaning.png' });
window.hallmarkSlots = (m) => { for (const [k, v] of Object.entries(m)) { const s = document.querySelector(`[data-slot="${k}"]`); if (!s) continue; const im = new Image(); im.src = typeof v === 'string' ? v : v.src; im.alt = (typeof v === 'object' && v.alt) || s.dataset.alt || ''; s.querySelectorAll(':scope > img').forEach((o) => o.remove()); s.prepend(im); } };
document.querySelectorAll('[data-slot] img').forEach((i) => { if (i.complete && !i.naturalWidth) i.remove(); else i.addEventListener('error', () => i.remove(), { once: true }); });
