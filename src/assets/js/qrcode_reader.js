var resultDiv;

document.addEventListener("deviceready", init, false);
function init() {
  console.log('addEventListener from .js');
  document.getElementById("startScan").addEventListener("touchend", startScan, false);
  resultDiv = document.getElementById("results");
}

function startScan() {
  console.log('=====scan======');
  cordova.plugins.barcodeScanner.scan(
    function (result) {
      var s = "Result: " + result.text + "<br/>" +
        "Format: " + result.format + "<br/>" +
        "Cancelled: " + result.cancelled;
      resultDiv.innerHTML = s;
    },
    function (error) {
      alert("Scanning failed: " + error);
    }
  );

}
