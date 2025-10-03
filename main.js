// Guest
let guests = [
  { name: "Haley", room: 101, duration: 3 },
  { name: "Ulises", room: 102, duration: 2 },
  { name: "Lewis", room: 103, duration: 4 }
];

const form = document.getElementById("checkInForm");
const guestNameInput = document.getElementById("guestName");
const roomNumberInput = document.getElementById("roomNumber");
const stayDurationInput = document.getElementById("stayDuration");
const errorMsg = document.getElementById("errorMsg");
const guestListDiv = document.getElementById("guestList");

// Guests Loading
function renderGuests() {
  guestListDiv.innerHTML = "";
  guests.forEach(g => {
    const div = document.createElement("div");
    div.className = "guest-card";
    div.innerHTML = `<strong>${g.name}</strong><br>
                     Room: ${g.room}<br>
                     Stay: ${g.duration} days`;
    guestListDiv.appendChild(div);
  });
}

// Room Availability
function canCheckIn(room) {
  const roomGuests = guests.filter(g => g.room === room);
  return roomGuests.length < 2;
}

// Handle
form.addEventListener("submit", function(e) {
  e.preventDefault();

  const name = guestNameInput.value.trim();
  const room = parseInt(roomNumberInput.value);
  const duration = parseInt(stayDurationInput.value);

  // Validation
  if (!name || !room || !duration) {
    errorMsg.textContent = "All fields are required!";
    return;
  }

  if (!canCheckIn(room)) {
    errorMsg.textContent = "Room is at capacity. Choose another room.";
    return;
  }

  // Add Guest
  guests.push({ name, room, duration });

  // Update Guest List
  renderGuests();

  // Clear Form
  guestNameInput.value = "";
  roomNumberInput.value = "";
  stayDurationInput.value = "";
  errorMsg.textContent = "";
});

// Initial Render
renderGuests();