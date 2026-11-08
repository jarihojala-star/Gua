from pathlib import Path

ROOT = Path(__file__).resolve().parent


def test_index_has_booking_form():
    html = (ROOT / "index.html").read_text(encoding="utf-8")

    assert "Guadalmina Golf" in html
    assert 'id="booking-form"' in html
    assert 'id="course"' in html
    assert 'id="date"' in html
    assert 'id="name"' in html
    assert 'id="summary"' in html


def test_app_contains_booking_logic():
    js = (ROOT / "app.js").read_text(encoding="utf-8")

    assert "const courseRates =" in js
    assert "localStorage.setItem" in js
    assert "renderSummary" in js
    assert "validateCurrentStep" in js
    assert "alert(`Booking confirmed" in js
