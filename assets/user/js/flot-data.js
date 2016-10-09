
//Flot Pie Chart
$(document).ready(function() {
  var reportStringData = $('#reportData').val(),

  reportData = JSON.parse(reportStringData);

  $(function () {

    var data = [{
      label: "Correct Answers",
      data: reportData.correctAnswers,
      color: '#00FF00'
    }, {
      label: "Wrong Answers",
      data: reportData.wrongAnswers,
      color: '#FF0000'
    }];

    var plotObj = $.plot($("#flot-pie-chart"), data, {
      series: {
        pie: {
          show: true,
          radius: '.8'
        }
      },
      grid: {
        hoverable: true
      },

      tooltip: true,
      tooltipOpts: {
        content: "%p.0%, %s", // show percentages, rounding to 2 decimal places
        shifts: {
          x: 20,
          y: 0
        },
        defaultTheme: false
      }
    });

  });


//Flot Bar Chart

  $(function () {
    var data1 = reportData.barData;
    var dataSet = {data: data1, color: '#00FF87'};
    var ticks = [[1, "Easy"], [2, "Medium"], [3, "Difficult"], [4, "Advanced"], [5, "Expert"]];
    var options = {
      series: {
        bars: {show: true}
      },
      bars: {
        align: 'center',
        horizontal: true,
        barWidth: .5,
        fillColor: {colors: [{opacity: 0.5}, {opacity: 1}]},
        lineWidth: 1
      },
      legend: {
        noColumns: 0,
        labelBoxBorderColor: "#858585",
        position: "ne"
      },
      grid: {
        backgroundColor: {colors: ["#919191", "#141414"]},
        hoverable: true
      },
      xaxis: {
        axisLabel: "Average Time(in sec)",
        axisLabelUseCanvas: true,
        axisLabelFontSizePixels: 12,
        axisLabelFontFamily: 'Verdana, Arial',
        axisLabelPadding: 10,
        max: reportData.totalAvgTime,
        ticks: 10
      },

      yaxis: {
        axisLabel: "Difficulty Level",
        axisLabelUseCanvas: true,
        axisLabelFontSizePixels: 12,
        axisLabelFontFamily: 'Verdana, Arial',
        axisLabelPadding: 3,
        ticks: ticks

      },
      tooltip: true,
      tooltipOpts: {
        content: "Average Time: %x sec, Difficulty Level: %y",
        defaultTheme: false
      }
    };
console.log("reportData.totalAvgTime",reportData.totalAvgTime);
    $.plot($("#flot-bar-chart"), [dataSet], options);

  });


  $(function () {
    var data1 = reportData.stackCorrectData;
    var data2 = reportData.stackWrongData;
    var dataSet1 = {label: "correct", data: data1, color: '#00FF00'};
    var dataSet2 = {label: "wrong", data: data2, color: '#FF0000'};
    var ticks = [[1, "Easy"], [2, "Medium"], [3, "Difficult"], [4, "Advanced"], [5, "Expert"]];
    var options = {
      series: {
        bars: {show: true},
        stack: true
      },
      bars: {
        align: 'center',
        horizontal: true,
        barWidth: .5,
        fillColor: {colors: [{opacity: 0.5}, {opacity: 1}]},
        lineWidth: 1
      },
      legend: {
        noColumns: 0,
        labelBoxBorderColor: "#858585",
        position: "ne"
      },
      grid: {
        backgroundColor: {colors: ["#919191", "#141414"]},
        hoverable: true
      },
      xaxis: {
        axisLabel: "Answers",
        axisLabelUseCanvas: true,
        axisLabelFontSizePixels: 12,
        axisLabelFontFamily: 'Verdana, Arial',
        axisLabelPadding: 10,
        max: reportData.totalStackData,
        ticks: 10,
        minTickSize: 1

      },

      yaxis: {
        axisLabel: "Difficulty Level",
        axisLabelUseCanvas: true,
        axisLabelFontSizePixels: 12,
        axisLabelFontFamily: 'Verdana, Arial',
        axisLabelPadding: 3,
        ticks: ticks

      },
      tooltip: true,
      tooltipOpts: {
        content: "%s: %x , Difficulty Level: %y",
        defaultTheme: false
      }
    };
    console.log("reportData.totalStackData",reportData.totalStackData);
    var d = [];
    d.push(dataSet1);
    d.push(dataSet2);
    $.plot($("#flot-stack-chart"), d, options);

  });
});
