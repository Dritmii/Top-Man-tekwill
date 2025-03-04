// Данные услуг для каждого барбера
const services = {
  top: [
    { name: "Мужская стрижка", time: "1 час", price: 330 },
    { name: "Детская стрижка", time: "30 мин", price: 300 },
    { name: "Удлиненная стрижка", time: "1 час", price: 250 },
    { name: "Оформление бороды", time: "30 мин", price: 160 },
    { name: "Камуфлирование бороды", time: "20 мин", price: 150 },
    { name: "Королевское бритье", time: "30 мин", price: 100 },
    { name: "Укладка волос", time: "20 мин", price: 80 },
    { name: "Борода + стрижка", time: "1 час", price: 400 },
    { name: "Hair tatoo", time: "5 мин", price: 50 },
    { name: "Ваксинг 1 зона", time: "5 мин", price: 50 },
    { name: "Ваксинг 3 зоны", time: "10 мин", price: 100 }
  ],
  good: [
    { name: "Мужская стрижка", time: "1 час", price: 200 },
    { name: "Борода + стрижка", time: "1 час", price: 270 },
    { name: "Hair tatoo", time: "5 мин", price: 50 },
    { name: "Оформление бороды", time: "30 мин", price: 160 },
    { name: "Ваксинг 1 зона", time: "5 мин", price: 50 },
    { name: "Ваксинг 3 зоны", time: "10 мин", price: 100 }
  ],
  junior: [
    { name: "Мужская стрижка", time: "2 часа", price: 150 },
    { name: "Hair tatoo", time: "5 мин", price: 50 },
    { name: "Ваксинг 1 зона", time: "5 мин", price: 50 },
    { name: "Ваксинг 3 зоны", time: "10 мин", price: 100 }
  ]
};

let selectedBarber = "top";  // Барбер по умолчанию
let selectedServices = [];
let selectedDate = null;
let selectedTime = null;

function renderServices() {
const container = document.querySelector(".services-container");
container.innerHTML = "";
if (!services[selectedBarber]) return;
services[selectedBarber].forEach(service => {
  const card = document.createElement("div");
  card.classList.add("service-card");
  card.innerHTML = `
    <p>${service.name}</p>
    <small>${service.time}</small>
    <p>${service.price} MDL</p>
  `;
  card.addEventListener("click", () => addService(service));
  container.appendChild(card);
});
}

function addService(service) {
if (selectedServices.some(s => s.name === service.name)) return;
selectedServices.push(service);
updateOrder();
}

function updateOrder() {
// Обновляем все списки заказов (на обоих этапах)
const orderLists = document.querySelectorAll(".order-list");
orderLists.forEach(orderList => {
  orderList.innerHTML = "";
  selectedServices.forEach(service => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${service.name} - ${service.price} MDL
      <button class="remove-btn">&times;</button>
    `;
    li.querySelector(".remove-btn").addEventListener("click", () => {
      selectedServices = selectedServices.filter(s => s.name !== service.name);
      saveToLocalStorage();
      updateOrder();
    });
    orderList.appendChild(li);
  });
});
// Обновляем итоговую сумму: выбираем элемент с классом .total-sum
const totalElements = document.querySelectorAll(".total-price .total-sum");
const total = selectedServices.reduce((sum, s) => sum + s.price, 0);
totalElements.forEach(el => el.textContent = total);
saveToLocalStorage();
}

function saveToLocalStorage() {
localStorage.setItem('selectedServices', JSON.stringify(selectedServices));
}

function loadFromLocalStorage() {
const saved = JSON.parse(localStorage.getItem('selectedServices')) || [];
selectedServices = saved;
updateOrder();
renderServices();
}

document.querySelectorAll(".barber-btn").forEach(btn => {
btn.addEventListener("click", () => {
  document.querySelectorAll(".barber-btn").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  selectedBarber = btn.getAttribute("data-barber");
  selectedServices = [];
  renderServices();
  updateOrder();
});
});

document.addEventListener('DOMContentLoaded', () => {
loadFromLocalStorage();
renderServices();
});

// Обновление шагов по навигации
function updateStep(currentStep) {
document.querySelectorAll(".step").forEach((step, index) => {
  step.classList.toggle("active", index === currentStep);
});
}

document.querySelectorAll(".step").forEach((step, index) => {
step.addEventListener("click", () => {
  if (index === 0) {
    document.querySelector("#step-1").style.display = "flex";
    document.querySelector("#step-2").style.display = "none";
    document.querySelector("#step-3").style.display = "none";
    if(document.querySelector("#step-4")) document.querySelector("#step-4").style.display = "none";
    document.querySelector(".barber-selection").style.display = "flex";
    updateStep(0);
  } else if (index === 1) {
    if (selectedServices.length === 0) {
      alert(translate("pleaseSelectAtLeastOneService"));
      return;
    }
    document.querySelector("#step-1").style.display = "none";
    document.querySelector("#step-2").style.display = "block";
    document.querySelector("#step-3").style.display = "none";
    document.querySelector(".barber-selection").style.display = "none";
    updateStep(1);
    renderCalendar();
    renderTimeSlots();
  } else if (index === 2) {
    const form = document.getElementById("personalDataForm");
    if (!form.checkValidity()) {
      alert(translate("pleaseFillPersonalData"));
      return;
    }
    if (!selectedDate || !selectedTime) {
      alert(translate("pleaseSelectDateAndTime"));
      return;
    }
    document.querySelector("#step-1").style.display = "none";
    document.querySelector("#step-2").style.display = "none";
    document.querySelector("#step-3").style.display = "block";
    updateStep(2);
    updateOrderSummary();
  } else if (index === 3) {
    // Новая проверка: нельзя переходить на шаг 4, если форма личных данных не заполнена
    const form = document.getElementById("personalDataForm");
    if (!form.checkValidity()) {
      alert(translate("pleaseFillPersonalData"));
      return;
    }
    if (!selectedDate || !selectedTime) {
      alert(translate("pleaseSelectDateAndTime"));
      return;
    }
    document.querySelector("#step-1").style.display = "none";
    document.querySelector("#step-2").style.display = "none";
    document.querySelector("#step-3").style.display = "none";
    document.querySelector("#step-4").style.display = "block";
    updateStep(3);
    renderFinalSummary();
  }
});
});

document.querySelector("#toStep2").addEventListener("click", () => {
if (selectedServices.length === 0) {
  alert(translate("pleaseSelectAtLeastOneService"));
  return;
}
document.querySelector("#step-1").style.display = "none";
document.querySelector("#step-2").style.display = "block";
if(document.querySelector("#step-3")) document.querySelector("#step-3").style.display = "none";
document.querySelector(".barber-selection").style.display = "none";
updateStep(1);
renderCalendar();
renderTimeSlots();
});

document.querySelector("#toStep3")?.addEventListener("click", () => {
if (!selectedDate || !selectedTime) {
  alert(translate("pleaseSelectDateAndTime"));
  return;
}
document.querySelector("#step-2").style.display = "none";
document.querySelector("#step-3").style.display = "block";
updateStep(2);
updateOrderSummary();
});

document.querySelector("#toStep4")?.addEventListener("click", () => {
const form = document.getElementById("personalDataForm");
if (!form.checkValidity()) {
  alert(translate("pleaseFillPersonalData"));
  return;
}
document.querySelector("#step-3").style.display = "none";
document.querySelector("#step-4").style.display = "block";
updateStep(3);
renderFinalSummary();
});

document.querySelector("#finalConfirm")?.addEventListener("click", () => {
alert(translate("orderConfirmed"));
localStorage.removeItem('selectedServices');
location.reload();
});

function updateOrderSummary() {
const summaryDate = document.getElementById("summaryDate");
const summaryTime = document.getElementById("summaryTime");
summaryDate.textContent = selectedDate ? new Date(selectedDate).toLocaleDateString() : translate("selectDate");
summaryTime.textContent = selectedTime || translate("selectTime");
}

function renderFinalSummary() {
const finalSummary = document.getElementById("finalSummary");
finalSummary.innerHTML = "";
const servicesItem = document.createElement("li");
servicesItem.innerHTML = `<strong>${translate("servicesLabel")}:</strong> ${selectedServices.map(s => s.name).join(", ")}`;
finalSummary.appendChild(servicesItem);
const dateItem = document.createElement("li");
dateItem.innerHTML = `<strong>${translate("date")}:</strong> ${selectedDate ? new Date(selectedDate).toLocaleDateString() : translate("selectDate")}`;
finalSummary.appendChild(dateItem);
const timeItem = document.createElement("li");
timeItem.innerHTML = `<strong>${translate("time")}:</strong> ${selectedTime || translate("selectTime")}`;
finalSummary.appendChild(timeItem);
const firstName = document.getElementById("firstName").value;
const lastName = document.getElementById("lastName").value;
const phone = document.getElementById("phone").value;
const personalItem = document.createElement("li");
personalItem.innerHTML = `<strong>${translate("personalDataLabel")}:</strong> ${firstName} ${lastName}, ${translate("phone")}: ${phone}`;
finalSummary.appendChild(personalItem);
}

function renderCalendar() {
const calendarContainer = document.querySelector(".calendar-dates");
calendarContainer.innerHTML = "";
const today = new Date();
// Массив ключей месяцев
const monthKeys = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const month = translate(monthKeys[today.getMonth()]);
const monthElement = document.createElement("div");
monthElement.classList.add("month");
monthElement.textContent = month;
calendarContainer.appendChild(monthElement);
const datesWrapper = document.createElement("div");
datesWrapper.classList.add("dates-wrapper");
// Массив ключей дней недели
const dayKeys = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
for (let i = 0; i < 7; i++) {
  const date = new Date();
  date.setDate(today.getDate() + i);
  const btn = document.createElement("button");
  btn.classList.add("date-btn");
  btn.textContent = date.getDate();
  const dayLabel = document.createElement("div");
  dayLabel.textContent = translate(dayKeys[(date.getDay() + 6) % 7]);
  dayLabel.classList.add("day-label");
  const dateWrapper = document.createElement("div");
  dateWrapper.classList.add("date-wrapper");
  dateWrapper.appendChild(btn);
  dateWrapper.appendChild(dayLabel);
  datesWrapper.appendChild(dateWrapper);
  btn.addEventListener("click", () => {
    datesWrapper.querySelectorAll(".date-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    selectedDate = date;
    saveToSessionStorage();
    renderTimeSlots();
  });
}
calendarContainer.appendChild(datesWrapper);
}

function saveToSessionStorage() {
if (selectedDate) {
  sessionStorage.setItem('selectedDate', selectedDate.toISOString());
}
}

function renderTimeSlots() {
const timeSlotsContainer = document.querySelector(".time-slots");
timeSlotsContainer.innerHTML = "";
const times = [
  "9:00", "9:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
  "15:00", "15:30", "16:00", "16:30", "17:00", "17:30",
  "18:00", "18:30"
];
times.forEach(time => {
  const btn = document.createElement("button");
  btn.classList.add("time-btn");
  btn.textContent = time;
  if (selectedTime === time) {
    btn.classList.add("active");
  }
  const icon = document.createElement("img");
  icon.classList.add("time-icon");
  const [hour] = time.split(":").map(Number);
  if (hour < 12) {
    icon.src = "../img/morning.svg";
    icon.alt = translate("morning");
  } else if (hour < 16) {
    icon.src = "../img/day.svg";
    icon.alt = translate("day");
  } else {
    icon.src = "../img/night.svg";
    icon.alt = translate("evening");
  }
  btn.prepend(icon);
  btn.addEventListener("click", () => {
    timeSlotsContainer.querySelectorAll(".time-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    selectedTime = time;
    saveToSessionStorage();
  });
  timeSlotsContainer.appendChild(btn);
});
}
