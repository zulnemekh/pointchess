
    Chart.defaults.global.pointHitDetectionRadius = 1;
    Chart.defaults.global.customTooltips = function(tooltip) {

        var tooltipEl = $('#chartjs-tooltip');

        if (!tooltip) {
            tooltipEl.css({
                opacity: 0
            });
            return;
        }

        tooltipEl.removeClass('above below');
        tooltipEl.addClass(tooltip.yAlign);

        var innerHtml = '';
        for (var i = tooltip.labels.length - 1; i >= 0; i--) {
          innerHtml += [
            '<div class="chartjs-tooltip-section">',
            ' <span class="chartjs-tooltip-key" style="background-color:' + tooltip.legendColors[i].fill + '"></span>',
            ' <span class="chartjs-tooltip-value">' + tooltip.labels[i] + '</span>',
            '</div>'
          ].join('');
        }
        tooltipEl.html(innerHtml);

        tooltipEl.css({
            opacity: 1,
            left: tooltip.chart.canvas.offsetLeft + tooltip.x + 'px',
            top: tooltip.chart.canvas.offsetTop + tooltip.y + 'px',
            fontFamily: tooltip.fontFamily,
            fontSize: tooltip.fontSize,
            fontStyle: tooltip.fontStyle,
        });
    };
    var getLabel = function() {
    	var length=30;
    	var label=[];
	    	for (var i = 0; i < length; i++) {
	      		label.push(i);
	      }
    	return label;
    }
    var getScores = function(newDataA1) {
       s=newDataA1;
      var scores1=[null,null,null,null,null,null,null,null,"-0.44","-0.44",">= -0.27",">= -0.27","-0.77","-0.77","-1.27","-1.27","-1.29","-1.29","-1.31","-1.31","-1.36","-1.36","-1.65","-1.65"];
      var scores=["-0.54", "-0.54", "-0.65", "-0.65", "-0.74", "0.74","1.07", "-1.07", "1.17"];
      for (var i = 0; i < s.length; i++) {
      	val = parseFloat(s[i]);
      	val.toFixed(2);
	      	if(!isNaN(val)){
		      	val=val*10;
		      	s[i]=val;
	      	}else{ s[i]=0; }
      	}

      return s;
    };
    var randomScalingFactor = function() {
    	tt=Math.round(Math.random() * 10);
    	
        return tt;
    };
      var drawChart = function(newDataA1) {
      	 var dataSetA1 = lineChartData["datasets"][1]["data"];

      	 ss=getScores(newDataA1);
    		dataSetA1.length;
    // var newDataA = dataSetA[dataSetA.length] + (20 - Math.floor(Math.random() * (41)));
    // var newDataB = dataSetB[9] + (20 - Math.floor(Math.random() * (41)));
   			if(ss[ss.length] === "")   
    		dataSetA1.push(ss[ss.length]);
      	// myLine.addData(getScores(), '');
     	// console.log("drawChart");
      // myLine.Line(data, optionsNoAnimation);
    };
    var lineChartData = {
        labels: getLabel(),
        datasets: [{
            label: "My First dataset",
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: [randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor()]
        }, {
            label: "My Second dataset",
            fillColor: "rgba(151,187,205,0.2)",
            strokeColor: "rgba(151,187,205,1)",
            pointColor: "rgba(151,187,205,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(151,187,205,1)",
            data: ["-0.54", "-0.54", "-0.65", "-0.65", "-0.74", "0.74","1.07", "-1.07", "1.17"]
        }]
    };
		var myLine;
		var optionsNoAnimation = {animation : false}
    window.onload = function() {
      
        // var ctx2 = document.getElementById("chart2").getContext("2d");
         var ctx2=document.getElementById("chart2");
         var ctx=ctx2.getContext("2d");
        ctx.beginPath();
        ctx.arc(95,50,40,0,2*Math.PI);
        ctx.stroke();
        myLine = new Chart(ctx);
        // .Line(lineChartData, {
        //     responsive: true
        // });
         // myLine = new Chart(ctx);
         
    };
    setInterval(function(){
  		// updateData(data);
  		// drawChart1();
    myLine.Line(lineChartData, optionsNoAnimation)
    ;}, 2000
  );

// Live updating Chart begin
  var count = 10;
  var data = {
	  labels : ["1","2","3","4","5", "6", "7", "8", "9", "10"],
		datasets : [
		  {
				fillColor : "rgba(220,220,220,0.5)",
				strokeColor : "rgba(220,220,220,1)",
				pointColor : "rgba(220,220,220,1)",
				pointStrokeColor : "#fff",
				data : [65,59,90,81,56,45,30,20,3,37]
			},
			{
				fillColor : "rgba(151,187,205,0.5)",
				strokeColor : "rgba(151,187,205,1)",
				pointColor : "rgba(151,187,205,1)",
				pointStrokeColor : "#fff",
				data : [0,0,0,0,0,0,0,0,0,0,"0.37","0.37","0.37","0.37","0.15","0.15","0.11"]
			}
		]
  }
  // this is ugly, don't judge me
  var drawChart3 = function(){
  	oldData=data;
    // var labels = oldData["labels"];
    var dataSetA = oldData["datasets"][0]["data"];
    var dataSetB = oldData["datasets"][1]["data"];
    // labels.shift();
    // count++;
    // labels.push(count.toString());
    ss=getScores();
    dataSetA.length;
    // var newDataA = dataSetA[dataSetA.length] + (20 - Math.floor(Math.random() * (41)));
    // var newDataB = dataSetB[9] + (20 - Math.floor(Math.random() * (41)));
   if(ss[ss.length] === "")   
    dataSetA.push(ss[ss.length]);
    
    // dataSetB.push(newDataB);
    // dataSetA.shift();
    // dataSetB.shift(); 
    

       };
      
  var optionsAnimation = {
    //Boolean - If we want to override with a hard coded scale
    scaleOverride : true,
    //** Required if scaleOverride is true **
    //Number - The number of steps in a hard coded scale
    scaleSteps : 10,
    //Number - The value jump in the hard coded scale
    scaleStepWidth : 10,
    //Number - The scale starting value
    scaleStartValue : 0
  }
  
  // Not sure why the scaleOverride isn't working...
  var optionsNoAnimation = {
    animation : false,
    //Boolean - If we want to override with a hard coded scale
    scaleOverride : true,
    //** Required if scaleOverride is true **
    //Number - The number of steps in a hard coded scale
    scaleSteps : 20,
    //Number - The value jump in the hard coded scale
    scaleStepWidth : 10,
    //Number - The scale starting value
    scaleStartValue : 0
  }
  
  //Get the context of the canvas element we want to select
  var ctx = document.getElementById("myChart").getContext("2d");
  var optionsNoAnimation = {animation : false}
  var myNewChart = new Chart(ctx);
  myNewChart.Line(data, optionsAnimation);	
  
  // setInterval(function(){
  // 		// updateData(data);
  //   var scores=["-0.54", "-0.54", "-0.65", "-0.65", "-0.74", "0.74","1.07", "-1.07", "1.17"];
  //   myNewChart.Line(data, optionsNoAnimation)
  //   ;}, 2000
  // );

// Live updating Chart end

   