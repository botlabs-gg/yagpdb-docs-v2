import docsearch from "@docsearch/js";

docsearch({
  appId: "ER865HD7LN",
  apiKey: "56b4cffcb36dc6b444754b5cdf907917",
  container: "#docsearch",
  debug: false,
  indexName: "help-yagpdb",
  insights: true
});

const onClick = function () {
  document.getElementsByClassName("DocSearch-Button")[0].click();
};

document.getElementById("searchToggleMobile").onclick = onClick;
document.getElementById("searchToggleDesktop").onclick = onClick;
