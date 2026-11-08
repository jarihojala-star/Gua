const courseRates = {
  north: 110,
  south: 95,
  signature: 140,
};

const timeSlots = [
  "07:30",
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
];

const form = document.getElementById("booking-form");
const courseSelect = document.getElementById("course");
const dateInput = document.getElementById("date");
const playersSelect = document.getElementById("players");
const timeSelect = document.getElementById("time");
const nextBtn = document.getElementById("next-btn");
const backBtn = document.getElementById("back-btn");
const confirmBtn = document.getElementById("confirm-btn");
const summary = document.getElementById("summary");
const priceTotal = document.getElementById("price-total");
const steps = Array.from(document.querySelectorAll(".form-step"));
const stepStatus = Array.from(document.querySelectorAll(".step"));

let currentStep = 0;

function populateTimeSlots() {
  const currentDateValue = dateInput.value;
  const availableSlots = currentDateValue ? timeSlots : timeSlots.slice(0, 8);

  timeSelect.innerHTML = "";
  availableSlots.forEach((time) => {
    const option = document.createElement("option");
    option.value = time;
    option.textContent = time;
    timeSelect.appendChild(option);
  });
}

function getDefaultDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function updatePrice() {
  const course = courseSelect.value;
  const players = Number(playersSelect.value || 2);
  const baseRate = courseRates[course];
  const total = baseRate * players;
  priceTotal.textContent = `€${total}`;
}

function getSummaryData() {
  return {
    course: courseSelect.options[courseSelect.selectedIndex].text,
    date: dateInput.value || "Not selected",
    time: timeSelect.value || "Not selected",
    players: playersSelect.value,
    name: document.getElementById("name").value || "Not provided",
    email: document.getElementById("email").value || "Not provided",
    phone: document.getElementById("phone").value || "Not provided",
    notes: document.getElementById("notes").value || "No special requests",
  };
}

function renderSummary() {
  const values = getSummaryData();
  summary.innerHTML = `
    <dt>Course</dt><dd>${values.course}</dd>
    <dt>Date</dt><dd>${values.date}</dd>
    <dt>Tee time</dt><dd>${values.time}</dd>
    <dt>Players</dt><dd>${values.players}</dd>
    <dt>Name</dt><dd>${values.name}</dd>
    <dt>Email</dt><dd>${values.email}</dd>
    <dt>Phone</dt><dd>${values.phone}</dd>
    <dt>Notes</dt><dd>${values.notes}</dd>
  `;
}

function validateCurrentStep() {
  const stepEl = steps[currentStep];
  const requiredFields = stepEl.querySelectorAll("input[required], select[required]");
  for (const field of requiredFields) {
    if (!field.value.trim()) {
      field.reportValidity();
      return false;
    }
  }

  return true;
}

function renderStep() {
  steps.forEach((step, index) => {
    step.classList.toggle("active", index === currentStep);
  });

  stepStatus.forEach((step, index) => {
    step.classList.toggle("active", index <= currentStep);
  });

  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === steps.length - 1;

  backBtn.classList.toggle("hidden", isFirstStep);
  nextBtn.classList.toggle("hidden", isLastStep);
  confirmBtn.classList.toggle("hidden", !isLastStep);

  if (isLastStep) {
    renderSummary();
  }
}

nextBtn.addEventListener("click", () => {
  if (!validateCurrentStep()) return;
  if (currentStep < steps.length - 1) {
    currentStep += 1;
    renderStep();
  }
});

backBtn.addEventListener("click", () => {
  if (currentStep > 0) {
    currentStep -= 1;
    renderStep();
  }
});

courseSelect.addEventListener("change", updatePrice);
playersSelect.addEventListener("change", updatePrice);
dateInput.addEventListener("input", () => {
  populateTimeSlots();
  updatePrice();
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!validateCurrentStep()) return;

  const payload = {
    ...getSummaryData(),
    total: priceTotal.textContent,
    createdAt: new Date().toISOString(),
  };

  localStorage.setItem("guadalmina-last-booking", JSON.stringify(payload));

  alert(`Booking confirmed for ${payload.name} on ${payload.date} at ${payload.time}.`);
  form.reset();
  dateInput.value = getDefaultDate();
  populateTimeSlots();
  currentStep = 0;
  renderStep();
  updatePrice();
});

dateInput.value = getDefaultDate();
populateTimeSlots();
updatePrice();
renderStep();
