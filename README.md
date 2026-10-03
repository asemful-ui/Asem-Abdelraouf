# Asem Abdelraouf's homepage

Source of my academic homepage, served by GitHub Pages.

All the text lives in `index.html`; each section is marked with a comment such as `<!-- ===== Teaching ===== -->`.
To change something, open `index.html` on GitHub, click the pencil icon, edit, and press **Commit changes**.
The live site updates within a few minutes.

## Common updates

**Add a photo.** Upload a roughly square photo named `photo.jpg` to the top folder of this repository (next to `index.html`). It replaces the initials automatically.

**Add a preprint.** Copy one `<li> … </li>` block under *Preprints* and change the title, authors, arXiv number and year.

**Mark a paper as published.** Add the journal after the arXiv link:

```html
A. Abdelraouf, <a class="arxiv" href="https://arxiv.org/abs/2509.17624">arXiv:2509.17624</a>,
<a href="https://doi.org/...">Journal name, Vol. 1, pp. 1–40</a> (2027)
```

**Add a Talks section.** Paste this between the Teaching and Contact sections:

```html
<!-- ===== Talks ===== -->
<h2 id="talks">Talks</h2>
<ul class="talks">
  <li><span class="term">Nov 2026</span>: <em>Title of the talk</em><br>Seminar name, University, City</li>
</ul>
```

and add `<a href="#talks" data-label="Talks">Talks</a>` to the links in the top bar, before Contact.

**Link a CV.** Upload `cv.pdf` and add `<p><a href="cv.pdf">Detailed CV (PDF)</a></p>` at the end of the CV section.

## Credits

Design adapted from the [minimal-light-academic](https://github.com/harryrichman/minimal-light-academic) theme (CC0), as used on [singh-hp.github.io](https://singh-hp.github.io/).
Fonts: TeX Gyre Pagella by the GUST e-foundry, under the GUST Font License (see `assets/fonts/`).
