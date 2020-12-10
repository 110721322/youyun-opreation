var CHROME_VERSION = "41.0";
var FIREFOX_VERSION = "49.0";
var IE_VERSION = "10.0";
var OPERA_VERSION = "12.1.0";
var SAFARI_VERSION = "6.1.0";

function lowVersionBrowser() {
  var browserVersion = computedBrowserVersion();
  var lowVersionPage = document.querySelector("#lowVersionPage");
  var app = document.querySelector("#app");

  switch (true) {
    case browserVersion.chrome && compareVersion(browserVersion.chrome, CHROME_VERSION) === -1:
    case browserVersion.firefox && compareVersion(browserVersion.firefox, FIREFOX_VERSION) === -1:
    case browserVersion.opera && compareVersion(browserVersion.opera, OPERA_VERSION) === -1:
    case browserVersion.safari && compareVersion(browserVersion.safari, SAFARI_VERSION) === -1:
    case browserVersion.ie && compareVersion(browserVersion.ie, IE_VERSION) === -1:
      lowVersionPage.style.display = "block";
      document.body.removeChild(app);
      break;
    default:
      lowVersionPage.style.display = "none";
  }
}
