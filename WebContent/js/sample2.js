var crunchinatorApp =angular.module( 'crunchinatorApp', []);
crunchinatorApp.controller('mainCtrl',['$http','$scope', function AppCtrl ($http,$scope) {

/*$scope.myData = [
                 {name: 'AngularJS', count: 300},
                 {name: 'D3.JS', count: 150},
                 {name: 'jQuery', count: 400},
                 {name: 'Backbone.js', count: 300},
                 {name: 'Ember.js', count: 100}
             ];
*/
var gameId=4;
$http({
	 url: 'rest/game/gameStats', 
	 method: 'POST',
	  headers: { 'Content-Type': 'application/json' },
	//  var gameId = "15";
	    data: JSON.stringify(gameId)
	}).then(function successCallback(response) {
	    $scope.status="we got a response from rest "+response.data.Shows;
	    console.log("yyy : ",response.data);
	    $scope.showsData = response.data.Shows;
	    $scope.fullCountData = response.data.FullCount;
	    $scope.playerCount = response.data.PlayerCount;
	    console.log("iiiiii",$scope.playerCount);
	    //playerNameService.addPlayerCount($scope.playerCount);
	  //  var pCount = $scope.playerCount;
	   // if(response.data.Msg === "Success"){
	    //	 playerNameService.addGameID(response.data.Id);
	    //$location.path("/scoresheet");
	  //  }
	    //window.location = "scoresheet.html";
	  }, function errorCallback(response) {
	    $scope.status = "we got a exception "+response.data;
	  });


}]);
crunchinatorApp.directive( 'crD3Bars',[
  function (data) {
    return {
      restrict: 'E',
      scope: {
        data: '='
      },
      link: function (scope, element,data) {
        var margin = {top: 20, right: 20, bottom: 30, left: 40},
          width = (6*100) - margin.left - margin.right,
          height = 360 - margin.top - margin.bottom;
        var svg = d3.select(element[0])
          .append("svg")
          .attr('width', width + margin.left + margin.right)
          .attr('height', height + margin.top + margin.bottom)
          .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var x = d3.scale.ordinal().rangeRoundBands([0, width], .7);
        var y = d3.scale.linear().range([height, 0]);

        var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom");

        var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left")
            .ticks(10);

        //Render graph based on 'data'
        scope.render = function(data) {
          //Set our scale's domains
          x.domain(data.map(function(d) { return d.name; }));
          y.domain([0, d3.max(data, function(d) { return d.count; })]);
          
          //Redraw the axes
          svg.selectAll('g.axis').remove();
          //X axis
          svg.append("g")
              .attr("class", "x axis")
              .attr("transform", "translate(0," + height + ")")
              .call(xAxis);
              
          //Y axis
          svg.append("g")
              .attr("class", "y axis")
              .call(yAxis)
            .append("text")
              .attr("transform", "rotate(-90)")
              .attr("y", 6);
            //  .style("text-anchor", "end")
             // .text("count");
              
          var bars = svg.selectAll(".bar").data(data);
          bars.enter()
            .append("rect")
            .attr("class", "bar")
            .attr("x", function(d) { return x(d.name); })
            .attr("width", x.rangeBand());

          //Animate bars
          bars
              .transition()
              .duration(1000)
              .attr('height', function(d) { return height - y(d.count); })
              .attr("y", function(d) { return y(d.count); })
        };

         //Watch 'data' and run scope.render(newVal) whenever it changes
         //Use true for 'objectEquality' property so comparisons are done on equality and not reference
          scope.$watch('data', function(){
              scope.render(scope.data);
          }, true);  
        }
    };
  }
]);