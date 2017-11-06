$(function () {
  $("#generate").click(generate);
  $("#twitter").click(tweet);
});
function tweet() {
  window.open(
    "https://twitter.com/intent/tweet?text=" +
    $("#title").html() +
    "%0A" +
    $("#subtitle").html()
  );
}
function generate() {
  $("#generate").addClass("is-loading");
  function success(data) {
    var quoteobj = data;
    $("#title").html(quoteobj.quote);
    $("#subtitle").html("~" + quoteobj.author);
    $("#generate").removeClass("is-loading");
    $("#title, #subtitle").fadeTo(400, 1);
    $("#twitter").prop("disabled", false);
  }
  function error() {
    $("#twitter").prop("disabled", true);
    $("#title").html("An Error occurred..");
    $("#subtitle").html("Please check your Network Connection");
    $("#generate").removeClass("is-loading");
    $("#title, #subtitle").fadeTo(400, 1);
  }
  $.ajax({
    url: "https://andruxnet-random-famous-quotes.p.mashape.com/",
    data: { cat: "famous" },
    headers: {
      "X-Mashape-Key": "fBS0BpKB2AmshneYTotYf54rOh57p1uRRK9jsnFAvZnARrHJo0",
      Accept: "application/json"
    },
    success: success,
    error: error
  });
  $("#title, #subtitle").fadeTo(400, 0);
}