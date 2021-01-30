console.log("News credibility extension started !!");
function xml2string(node) {
  if (typeof XMLSerializer !== "undefined") {
    var serializer = new XMLSerializer();
    return serializer.serializeToString(node);
  } else if (node.xml) {
    return node.xml;
  }
}

var scanned_tweets = [];
var scanned_results = [];

function colorChanger() {
  let tweets = document.querySelectorAll("article");
  tweets.forEach(function (tweet) {
    if (window.scanned_tweets.includes(tweet)) {
      var the_tweet_no = window.scanned_tweets.indexOf(tweet);
      var resp = window.scanned_results[the_tweet_no];
      var fields = resp.split("|");
      var fakeness = fields[0];
      var toxicity = fields.slice(1, fields.length);
      if (toxicity.length > 1) {
        tweet.setAttribute("style", "background-color: rgb(255, 134, 134);");
      } else if (fakeness == "fake") {
        tweet.setAttribute("style", "background-color: rgb(179, 218, 255);");
      }
    }
    // console.log("Entered");
    // let tweet_string = xml2string(tweet);
    // var text = tweet_string.replace(/<(?:.|\n)*?>/gm, "");
    // console.log(text);
    else {
      console.log("scanned_results :", scanned_results);
      var xhttp = new XMLHttpRequest();
      xhttp.open("POST", "http://127.0.0.1:5000/_api_call", true);
      // xhttp.send(text);
      xhttp.send(tweet.outerHTML);
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          var resp = xhttp.responseText;

          window.scanned_tweets.push(tweet);
          window.scanned_results.push(resp);

          console.log(resp);
          var fields = resp.split("|");
          var fakeness = fields[0];
          var toxicity = fields.slice(1, fields.length);
          if (toxicity.length > 1) {
            tweet.setAttribute(
              "style",
              "background-color: rgb(255, 134, 134);"
            );
          } else if (fakeness == "fake") {
            tweet.setAttribute(
              "style",
              "background-color: rgb(179, 218, 255);"
            );
          }
        }
      };

      fake_ratio();
    }
  });
}

let timer = setInterval(colorChanger, 2000);

function fake_ratio(){
  var fake=0, not_fake=0;
  var toxic=0, not_toxic=0;
  for(var i=0; i<window.scanned_results.length; i++){
    if (window.scanned_results[i].includes('not-fake')){
      not_fake += 1;
    }
    else{
      fake += 1;
    }
    if (window.scanned_results[i].split('|').length > 1){
      toxic += 1;
    }
    else{
      not_toxic += 1;
    }
  }

  chrome.runtime.sendMessage({
    "total": fake + not_fake,
    "fake": fake,
    "toxic": toxic
  });
}
