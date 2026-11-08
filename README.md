# Guadalmina Golf Booking Flow

A lightweight booking flow for a golf resort reservation experience in the `Guadalmina Golf` brand.

## What it does

- Lets a guest choose a course, date, player count and preferred tee time.
- Captures customer details and optional notes.
- Reviews the reservation before final confirmation.
- Calculates a price estimate based on the selected course and number of players.
- Stores the latest confirmed booking in `localStorage`.

## Run locally

Because this is a static front-end, you can launch it with any local web server:

```bash
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## Files

- `index.html` — booking flow UI
- `styles.css` — styling
- `app.js` — booking logic and validation

## Notes

This is a front-end prototype designed for a booking experience. It does not integrate with a payment provider or live golf-course inventory API yet.
