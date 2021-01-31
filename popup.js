chrome.runtime.onMessage.addListener(function(msg) {
	console.log(msg);

	google.charts.load("current", {packages:["corechart"]});
  google.charts.setOnLoadCallback(drawChart_fakenews);
  google.charts.setOnLoadCallback(drawChart_toxictweets);


  function drawChart_fakenews() {
      var data = google.visualization.arrayToDataTable([
        ['Fake Tweets', 'Fake Tweets per Day'],
        ['Fake Tweets', msg.fake],
        ['Genuine Tweets', (msg.total - msg.fake)]
      ]);

      var options = {
        title: 'Fake Tweets Visualisation',
        legend: 'none',
        is3D: true,
        backgroundColor: 'rgb(179, 218, 255)',
      };

      var chart = new google.visualization.PieChart(document.getElementById('piechart_3d_fake'));
      chart.draw(data, options);
  }

  function drawChart_toxictweets() {
      var data = google.visualization.arrayToDataTable([
        ['Toxic Tweets', 'Toxic Tweets per Day'],
        ['Toxic Tweets', msg.toxic],
        ['Non-Toxic Tweets', (msg.total - msg.toxic)]
      ]);

      var options = {
        title: 'Toxic Tweets Visualisation',
        legend: 'none',
        is3D: true,
        backgroundColor: 'rgb(255, 134, 134)',
      };

      var chart = new google.visualization.PieChart(document.getElementById('piechart_3d_toxic'));
      chart.draw(data, options);
  }
});

var blurr_toggle = document.getElementById('blurrtoggle');
blurr_toggle.addEventListener('change', function(event) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    if(blurr_toggle.checked) {
      chrome.tabs.sendMessage(tabs[0].id, {blurr: true});
    }
    else {
      chrome.tabs.sendMessage(tabs[0].id, {blurr: false});
    }
  });
});
