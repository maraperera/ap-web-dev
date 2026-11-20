# Anthony: website design and development

A one-page site for Anthony's web design business: modern websites for Australian small businesses, with online booking built in.

Plain HTML, CSS and JavaScript, with no build step. Open `index.html` in a browser, or upload the folder to any static host (Netlify, Vercel, GitHub Pages, Cloudflare Pages).

## Files

- `index.html`: the page
- `css/tokens.css`: every colour, font and spacing value
- `css/base.css`: resets and defaults
- `css/site.css`: the page's styles
- `js/main.js`: the enquiry form and the screenshot slots
- `assets/`: the logo mark (cropped, transparent) and the favicon

## Connect the enquiry form

The form does not send anything yet. Until you connect it, it tells visitors so and points them to TikTok.

1. Create a free form at [formspree.io](https://formspree.io) and copy its endpoint, for example `https://formspree.io/f/abcdwxyz`.
2. In `index.html`, find `<form class="form crop" data-endpoint=""` and paste the endpoint between the quotes.

Enquiries will then arrive in your email. Any service that accepts a normal form POST works the same way.

## Swap in real screenshots

The two concept sites are built in HTML. To show real screenshots instead, add the images to `assets/` and put this at the end of `js/main.js`:

```js
hallmarkSlots({ 'concept-barber': 'assets/barber.png', 'concept-cleaning': 'assets/cleaning.png' });
```

Screenshots should be the top of each homepage, at least 1400px wide, cropped to roughly 7:6 (barber) and 5:6 (cleaning).
