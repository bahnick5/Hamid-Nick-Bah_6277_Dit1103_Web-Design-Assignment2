# FindHome SL

**A Student Accommodation Website for Freetown**

FindHome SL is a mobile-friendly student accommodation website developed as the DCOMP 204 Web Design final project at Limkokwing University of Creative Technology, Sierra Leone.

The project is designed to help students explore accommodation options around Freetown. Visitors can search and filter sample room listings, view room information and illustrative photos, save favourites, and use phone or WhatsApp contact links. Landlords can try a room-listing form.

> **Coursework demonstration:** The accommodation listings, landlord names, phone numbers, prices, ratings, and contact details are sample/demo content. They are not confirmed real properties or contacts. The bedroom photographs are illustrative generated images, not verified photographs of the listed properties. Do not rely on this website to arrange real accommodation without independently verifying every detail.

## Pages

| Page | File | Purpose |
|---|---|---|
| Home | `index.html` | Introductory section, room search and featured listings |
| Find a Room | `rooms.html` | Browse, search, filter and sort sample listings |
| Room Details | `room.html` | View a selected room, photo gallery, facilities, map and contact actions |
| List a Room | `list-room.html` | Demonstration form for submitting a room listing |
| About | `about.html` | Project background, purpose and values |
| FAQ | `faq.html` | Frequently asked questions |
| Contact | `contact.html` | Demonstration contact form |

## Main features

- Search sample rooms by name, area or type.
- Filter listings by area, maximum rent, distance, facilities and verification status.
- Sort room listings.
- Save and remove favourite rooms; favourites are stored in the browser using `localStorage`.
- View room photos using the gallery thumbnails.
- View an embedded OpenStreetMap map on the room details page (internet connection required).
- Use sample WhatsApp and telephone links.
- Expand and collapse FAQ answers.
- Open the responsive navigation menu on smaller screens.
- Switch between light and dark themes; the selected theme is remembered in the browser.
- Validate the contact and room-listing forms and show inline feedback.

## Technology

- HTML5
- CSS3 (responsive layouts, CSS custom properties and theme styles)
- JavaScript (search, filters, sorting, gallery, favourites, menus, FAQ and form validation)
- SVG assets
- OpenStreetMap embed for map display

No build tools or package installation are required for the static website.

## Project structure

```text
stayfreetown/
├── index.html
├── rooms.html
├── room.html
├── list-room.html
├── about.html
├── faq.html
├── contact.html
├── css/style.css
├── js/
│   ├── data.js
│   ├── main.js
│   ├── home.js
│   ├── rooms.js
│   ├── room.js
│   ├── forms.js
│   └── faq.js
├── assets/
│   ├── logo.svg
│   ├── favicon.svg
│   └── img/ (bedroom photographs and room illustration SVGs)
├── testing/
│   ├── results.json
│   └── screenshots/
└── portfolio/
    ├── portfolio.html
    ├── FindHome-SL-A3-Portfolio.pdf
    └── QR code SVG files
```

