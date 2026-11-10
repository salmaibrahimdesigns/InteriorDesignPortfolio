# Salma Ibrahim portfolio: From Blank to Belonging

## Run it
Open this folder in VS Code, install the Live Server extension, right-click index.html and choose "Open with Live Server". Or just double-click index.html. No build step; all paths are relative.

## Folders
index.html, project.html, /css, /js, /data (pins.js, projects.js), /images, /fonts.

## Edit pins
data/pins.js: each pin has id, x, y, w, h (percent of images/pin-board), image, alt, note. Add ?debug=pins to the URL (e.g. index.html?debug=pins) to draw red boxes over each hotspot.

## Edit or add a project
data/projects.js: add an object with slug, name, category, year, tag, lead, description (array of paragraphs) and images. Put images in images/p/ as name-800/name-1600 in .webp and .jpg. project.html?project=slug fills from this file. The gallery wall is one picture (images/p/gallery-wall-1672) with a clickable area over each frame; to move or add one, edit the `<a class="hs">` lines in index.html (left/top/width/height are percentages of the picture). Add ?debug is not needed: hover a frame to see its outline.

## Swap images
Keep images under about 1600px wide, export WebP plus JPG with the same base name.

## Publish
Netlify: drag the whole folder onto app.netlify.com/drop. GitHub Pages: push the folder to a repo, then Settings > Pages > deploy from the main branch.

## Still TODO
- Fonts: Lora is bundled; headings use GFS Baskerville as a stand-in. Swap in Cormorant Garamond .woff2 files in /fonts when you have them.
- Résumé link (hidden until a file is provided).
- Frame-to-full-screen transition on project open (currently a normal page load).
- Lighthouse and 375/768/1280/1920 QA pass in your own browser.

## Contact
The email address in the Contact section is a mailto link that opens the visitor's email app addressed to you. A form that sends messages straight from the site needs a free form service such as Formspree; ask if you want that added.
