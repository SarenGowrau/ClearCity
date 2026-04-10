let addMode = false;

document.getElementById("addBtn").onclick = () => {
  addMode = true;
  alert("Click on map to add report");
};

marker.bindPopup(`
  <div style="text-align:center">
    <h4>Garbage Spot</h4>
    <p>Severity: ${report.severity}</p>
    <p>Status: ${report.status}</p>
    <button onclick="claimReport(${index})">Claim</button>
    <button onclick="markCleaned(${index})">Cleaned</button>
  </div>
`);

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
