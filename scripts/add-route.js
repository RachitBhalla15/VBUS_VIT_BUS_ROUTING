var map,direction_option;
function initMap1(){
    map = new mappls.Map('map', {
        center: [28.09, 78.3],
        zoom: 5,
    });
    map.addListener('load',function(){ 
        var direction_option = {
            map: map,
            divWidth:'350px',
            start: { label: 'start', geoposition: "mmi000" },
            end: { label: 'end', geoposition: "28.656769,77.203775" },
            Resource: 'route_eta',
            annotations:"nodes,congestion",
            Profile:['driving','biking','trucking','walking'],
            routeSummary:{
                summarycallback:function(data){
                    console.log(data);
                }
            }
        }
        mappls.direction(direction_option,function(data) {
            direction_plugin=data;
            console.log(direction_plugin);
        });
    });
}

var addButton = document.querySelector('.add-button');
addButton.addEventListener('click', function() {
  // Get start and end points from direction_option object
  if (direction_option) {
    start = direction_option.start;
    console.log("Start"+ start);
    end = direction_option.end;

    // Create new polyline for added route
    var routeCoordinates = [
      [start.geoposition.split(',')[0], start.geoposition.split(',')[1]],
      [end.geoposition.split(',')[0], end.geoposition.split(',')[1]]
    ];
    var routePolyline = new mappls.Polyline({
      path: routeCoordinates,
      strokeColor: '#000000',
      strokeOpacity: 1.0,
      strokeWeight: 2
    });
    routePolyline.setMap(map);
  }
});

var startCoordinates = direction_option.start.geoposition;
var endCoordinates = direction_option.end.geoposition;

console.log("Start coordinates: " + startCoordinates);
console.log("End coordinates: " + endCoordinates);

