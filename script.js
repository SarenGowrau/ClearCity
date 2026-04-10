// Initialize map (Chennai default)
let map = L.map('map').setView([13.0827, 80.2707], 12);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

let reports = [];
let markers = [];
let addMode = false;

// 🎨 Colored icons
const greenIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const orangeIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-orange.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const redIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

// Add mode
document.getElementById("addBtn").onclick = () => {
  addMode = true;
  alert("Click on map to add report");
};

// Use location
document.getElementById("locBtn").onclick = () => {
  navigator.geolocation.getCurrentPosition(pos => {
    const { latitude, longitude } = pos.coords;

    reports.push({
      lat: latitude,
      lng: longitude,
      severity: "Medium",
      status: "Reported"
    });

    map.setView([latitude, longitude], 15);
    renderReports();
  });
};

// Map click
map.on('click', function(e) {
  if (!addMode) return;

  const severity = document.getElementById("severity").value;

  reports.push({
    lat: e.latlng.lat,
    lng: e.latlng.lng,
    severity: severity,
    status: "Reported"
  });

  addMode = false;
  renderReports();
});

// Render reports
function renderReports() {
  // Clear old markers
  markers.forEach(m => map.removeLayer(m));
  markers = [];

  reports.forEach((report, index) => {

    let icon;
    if (report.severity === "Low") icon = greenIcon;
    else if (report.severity === "Medium") icon = orangeIcon;
    else icon = redIcon;

    let marker = L.marker([report.lat, report.lng], { icon }).addTo(map);

    marker.bindPopup(`
      <div style="text-align:center">
        <h4 style="color:${report.severity === 'High' ? 'red' : report.severity === 'Medium' ? 'orange' : 'green'}">
          Garbage Spot
        </h4>
        <p>Severity: ${report.severity}</p>
        <p>Status: ${report.status}</p>
        <button onclick="claimReport(${index})">Claim</button>
        <button onclick="markCleaned(${index})">Cleaned</button>
      </div>
    `);

    markers.push(marker);
  });

  updateDashboard();
}

// Claim
function claimReport(index) {
  reports[index].status = "In Progress";
  renderReports();
}

// Cleaned
function markCleaned(index) {
  reports[index].status = "Cleaned";
  renderReports();
}

// Dashboard
function updateDashboard() {
  document.getElementById("total").innerText = reports.length;
  document.getElementById("progress").innerText =
    reports.filter(r => r.status === "In Progress").length;
  document.getElementById("cleaned").innerText =
    reports.filter(r => r.status === "Cleaned").length;
}