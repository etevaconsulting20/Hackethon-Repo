


var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  console.log("window.bootstrap", window.bootstrap)
  return new window.bootstrap.Tooltip(tooltipTriggerEl)
})