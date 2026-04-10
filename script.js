let addMode = false;

document.getElementById("addBtn").onclick = () => {
  addMode = true;
  alert("Click on map to add report");
};

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
