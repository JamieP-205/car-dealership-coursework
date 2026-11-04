# Car dealership website — group coursework

[Portfolio case study](https://jamieparr.dev/projects/car-dealership-coursework/)

First-year COM109 Client Side Development coursework at Ulster University, 2025/26.

This repository contains the group's website. My allocated pages were Finance and About Us; the complete site is included so navigation, styles and shared scripts work together.

## My contribution

- Finance and About Us pages.
- A finance estimate using vehicle price, deposit and repayment term.
- JavaScript/jQuery input validation and dynamic results.
- Testing valid and invalid inputs.
- Final improvements to form validation, shared CSS and consistency.

The shared stylesheet, scripts and other pages were group work. I do not claim sole authorship of the complete website.

## Run locally

Open home.html in a browser, then select Finance or About Us.

Alternatively, run:

    python -m http.server 8000

Then open http://localhost:8000/home.html

## Main files

- finance.html — finance form and result area
- about-us.html — dealership information
- js/main.js — shared behaviour, including the finance calculation
- css/styles.css — shared styling

## Limitations

The finance calculation divides the price minus deposit by the repayment term. It excludes interest and fees.

This is an educational demonstration, not a real dealership or finance service.
