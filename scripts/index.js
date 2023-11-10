var map,markers=[],startMarker;

function initMap1() {
    map = new mappls.Map('map', {
        center: [12.840625, 80.153431],
        zoomControl: true,
        location: true,
        disableDoubleClickZoom: true
    });
    map.setZoom(13);
    var window = new mappls.InfoWindow({
            map: map,
            content: "<div style=\"border-radius:40px; \"'><h2 style=\"font: bold 16px arial helvetica\">Vellore Institue of Technology</h2>" +
                "<p style=\"font: italic 14px/20px times\">Perfect Place To Learn</p>" +
                "<img style=\"width: 200px;height: 100px;\" src=\"https://lh5.googleusercontent.com/p/AF1QipMp5VUqmzb6NGNnwe9qf_fUdR2EmyIwU7tkC0GT=w750-h401-p-k-no\">" +
                "<p>VIT Chennai Vandalur-Kelambakkam Road</p>" +
                "<p><a href=\"https://chennai.vit.ac.in/\" target=\"_blank\">Website link</a></p></div>",
            position: {
                lat: 12.84055556,
                lng: 80.15388889
            },
            fitbounds:true
        });

    var cD = ['coordinates1.xlsx', 'coordinates2.xlsx', 'coordinates3.xlsx','coordinates4.xlsx','coordinates5.xlsx'];
    var strokeColors = ['#FF0000', '#000000', '#1E2F97','#F09876','#00BB54']; 

    
    for (let i = 0; i < cD.length; i++) {
        createPolylineForExcelFile(cD[i], strokeColors[i]);
    }
    
   //createPolylineForExcelFile('coordinates1.xlsx',strokeColors[1]);

   var coordinateBus1 = [
    { lat: 12.918898, lng:80.147998 },
    {lat:12.907141,lng:80.159321},
    {lat:12.867995,lng:80.147296},
    {lat:12.885771,lng:80.151066}
];

var coordinateBus2 = [
    {lat:12.811352,	lng:80.197909},
    {lat:12.811511,	lng:80.194082},
    {lat:12.81916,	lng:80.17453}
]

var coordinateBus3=[

    {lat:12.847011,lng:80.185789},
    {lat:12.841034,lng:80.163867}
]

var coordinateBus4=[

    {lat:12.827762,lng:80.106372},
    {lat:12.800304,lng:80.0756},
    {lat:12.775373,lng:80.053946}
]
var coordinateBus5=[

    {lat:12.847011,lng:80.185789},
    {lat:12.841034,lng:80.163867},
    {lat:12.935907,lng:	80.164473}
]

var startPt=[
    { lat: 12.83641, lng: 80.1554 },
]

for (var i = 0; i < startPt.length; i++) {
    markers.push(new mappls.Marker({
        map: map,
        position: startPt[i],
        icon_url:'https://cdn2.iconfinder.com/data/icons/school-set-5/512/3-64.png',
        height:50,
        width:50,
        // icon_url: 'https://avatars.githubusercontent.com/u/19231370?s=280&v=4',
        popupHtml: `<div style="white-space:nowrap;font-size:15px;padding: 5px;color:#00000"><p><strong>Start Point</strong></p></div>`,
        popupOptions: {offset: {'bottom': [0, -40]}},
        draggable:false
    })
    );
}

var endPts=[
    { lat: 12.926414, lng:80.131429 },  //Dest of coord 1
    {lat:12.809801, lng:80.203513}, //dest of coord 2.
    {lat:12.861278,	lng:80.191335}, // dest of coord 3
    {lat:12.790044,	lng:80.031387}, //dest of coord 4
    {lat:12.936329,	lng:80.179871}
]

for (var i = 0; i < endPts.length; i++) {
    markers.push(new mappls.Marker({
        map: map,
        position: endPts[i],
        icon_url:'https://cdn0.iconfinder.com/data/icons/startup-190/64/46-64.png',
        // height:60,
        // width:55,
        //   https://static.thenounproject.com/png/333477-200.png
        // icon_url: 'https://avatars.githubusercontent.com/u/19231370?s=280&v=4',
        popupHtml: `<div style="white-space:nowrap;font-size:10px;padding left:15px;color:#00000">End point: ${i+1}</div>`,
        popupOptions: {offset: {'bottom': [0, -40]}},
        draggable:false
    })
    );
}

for (var i = 0; i < coordinateBus1.length; i++) {
    markers.push(new mappls.Marker({
        map: map,
        position: coordinateBus1[i],
        icon_url: 'https://static.thenounproject.com/png/886617-200.png',
        draggable:false
    })
    );
}
for (var i = 0; i < coordinateBus2.length; i++) {
    markers.push(new mappls.Marker({
        map: map,
        position: coordinateBus2[i],
        icon_url: 'https://static.thenounproject.com/png/886617-200.png',
        draggable:false
    })
    );
}
for (var i = 0; i < coordinateBus3.length; i++) {
    markers.push(new mappls.Marker({
        map: map,
        position: coordinateBus3[i],
        icon_url: 'https://static.thenounproject.com/png/886617-200.png',
        draggable:false
    })
    );
}
for (var i = 0; i < coordinateBus4.length; i++) {
    markers.push(new mappls.Marker({
        map: map,
        position: coordinateBus4[i],
        icon_url: 'https://static.thenounproject.com/png/886617-200.png',
        draggable:false
    })
    );
}
for (var i = 0; i < coordinateBus5.length; i++) {
    markers.push(new mappls.Marker({
        map: map,
        position: coordinateBus5[i],
        icon_url: 'https://static.thenounproject.com/png/886617-200.png',
        draggable:false
    })
    );
}

//rotating 
let rotateFlag = true; // set initial flag value to true
let tapCount = 0; // counter for tap events
let tapTimer; // timer for tap events

function rotateCamera(timestamp) {
  if (rotateFlag) { // check if rotation should continue
    map.rotateTo((timestamp / 100) % 360, { duration: 0 });
    requestAnimationFrame(rotateCamera);
  }
}

map.on("load", () => {
  rotateCamera(0);
});

map.on("click", () => {
  rotateFlag = false; // set flag value to false to stop rotation
});

map.on("touchstart", (e) => {
    e.preventDefault(); // prevent default behavior
    e.stopPropagation(); // stop event propagation

  tapCount++; // increment the tap counter
  if (tapCount === 1) { // start the timer for the first tap
    tapTimer = setTimeout(() => {
      tapCount = 0; // reset the tap counter
    }, 900); // set the time in milliseconds for a double tap
  } else if (tapCount === 3) { // handle a triple tap
    clearTimeout(tapTimer); // clear the timer for the second tap
    tapCount = 0; // reset the tap counter
    rotateFlag = true; // set flag value to true to resume rotation
  }
});

map.on("mouseup", () => {
  clearTimeout(tapTimer); // clear the timer when the mouse button is released
});


}


function createPolylineForExcelFile(file, strokeColor) {
    // Load coordinates from Excel sheet
    loadCoordinatesFromExcel(file, function(coordinates) {
        var routeCoordinates = coordinates.map(function(coord) {
            return { lat: coord.lat, lng: coord.lng };
        });

        var routePolyline = new mappls.Polyline({
            map: map,
            path: routeCoordinates,
            strokeColor: strokeColor,
            strokeOpacity: 1.0,
            strokeWeight: 5,
         /*   animate:{
                path:true,
                speed: 10
            }
            */
            animate: {
                speed: 8,
                icon_width: 20,
                icon_height: 50,
                icon_url: "http://www.mapmyindia.com/api/advanced-maps/doc/sample/map_sdk/car.png",
                repeat: true,
            }
        });
    /*     // Animate the polyline with a specified interval (e.g., 1000ms)
            animatePolyline(routePolyline, 1000, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfTu8yzYQydcWHwzxbHmrMHir71XQp12AVSDmZMtEQqw&s');       */
    });
}

/*    function animatePolyline(polyline, interval, markerIconUrl) {
var currentIndex = 0;

// Create a marker for the start of the animation
    startMarker = new mappls.Marker({
    map: map,
    position: polyline.getPath().getAt(0),
    icon_url: markerIconUrl
});

// Function to update the marker position and polyline color
function updateMarkerAndColor() {
    if (currentIndex < polyline.getPath().getLength() - 1) {
        // Update the color of the current polyline segment
        polyline.setOptions({ strokeColor: "#008000" });

        // Move the marker to the next point
        startMarker.setPosition(polyline.getPath().getAt(currentIndex));
        currentIndex++;
    } else {
        // End of animation, clear the interval
        clearInterval(animationInterval);
    }
}

// Set up the animation interval
var animationInterval = setInterval(updateMarkerAndColor, interval);
}
*/

var markerBus=[];
        // multiple bus dispatch.
/* 
function createPolylineForBus(busNumber) {
    // Define file name based on bus number
    var fileName = 'coordinates' + busNumber + '.xlsx';
  
    // Hide all existing polylines and markers
    markerBus.forEach(function(marker) {
      if (typeof marker.setVisible === 'function') {
        marker.setVisible(false);
      }
    });
  
    // Show the polyline corresponding to the selected bus
    loadCoordinatesFromExcel(fileName, function(coordinates) {
      var routeCoordinates = coordinates.map(function(coord) {
        return { lat: coord.lat, lng: coord.lng };
      });
  
      var routePolyline = new mappls.Polyline({
        map: map,
        path: routeCoordinates,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 5,
        animate: {
          speed: 8,
          icon_width: 20,
          icon_height: 50,
          icon_url: 'http://www.mapmyindia.com/api/advanced-maps/doc/sample/map_sdk/car.png',
          repeat: true,
        },
      });
  
      // Show start marker for the selected bus
      var startMarker = new mappls.Marker({
        map: map,
        position: routeCoordinates[0],
        icon_url: 'https://static.thenounproject.com/png/886617-200.png',
        draggable: false,
      });
  
      markerBus.push(startMarker);
  
      // Show all markers for the selected bus
      markerBus.forEach(function(marker) {
        var markerPosition = marker.getPosition();
        if (markerPosition && typeof marker.setVisible === 'function' && markerPosition.equals(routeCoordinates[0])) {
          marker.setVisible(true);
        }
      });
    });
  }
  */
 
  function createPolylineForBus(busNumber) {
    // Define file name based on bus number
    var fileName = 'coordinates' + busNumber + '.xlsx';

    // Hide all existing polylines and markers
    markers.forEach(function(marker) {
        if (typeof marker.setVisible === 'function') {
            marker.setVisible(false);
        }
    });
    markerBus.forEach(function(marker) {
        if (typeof marker.setVisible === 'function') {
            marker.setVisible(false);
        }
    });
    if (typeof map.getPolylines === 'function') {
        map.getPolylines().forEach(function(polyline) {
            polyline.setVisible(false);
        });
    }

    // Show the polyline corresponding to the selected bus
    loadCoordinatesFromExcel(fileName, function(coordinates) {
        var routeCoordinates = coordinates.map(function(coord) {
            return { lat: coord.lat, lng: coord.lng };
        });

        var routePolyline = new mappls.Polyline({
            map: map,
            path: routeCoordinates,
            strokeColor: '#008000',
            strokeOpacity: 1,
            strokeWeight: 7,
        });

        // Show start marker for the selected bus
        var startMarker = new mappls.Marker({
            map: map,
            position: routeCoordinates[0],
            icon_url: 'https://static.thenounproject.com/png/886617-200.png',
            draggable: false,
        });

        markerBus.push(startMarker);

        // Show all markers for the selected bus
        markerBus.forEach(function(marker) {
            var markerPosition = marker.getPosition();
            if (markerPosition && typeof marker.setVisible === 'function' && markerPosition.equals(routeCoordinates[0])) {
                markerBus.setVisible(true);
            }
        });
    });
}
  

function loadCoordinatesFromExcel(file, callback) {
    // Create a new XMLHttpRequest object
    var xhr = new XMLHttpRequest();

    // Configure the request to fetch the Excel file
    xhr.open('GET', file, true);

    // Set the response type to 'arraybuffer'
    xhr.responseType = 'arraybuffer';

    // Define what should happen when the request is complete
    xhr.onload = function() {
        // Convert the response data into a Uint8Array
        var data = new Uint8Array(xhr.response);

        // Parse the Excel workbook from the Uint8Array
        var workbook = XLSX.read(data, { type: 'array' });

        // Get the name of the first sheet in the workbook
        var sheetName = workbook.SheetNames[0];

        // Get the data from the first sheet
        var sheet = workbook.Sheets[sheetName];

        // Initialize an array to store the coordinates
        var coordinates = [];

        // Convert the sheet data to JSON and extract coordinates
        XLSX.utils.sheet_to_json(sheet).forEach(function(row) {
            coordinates.push({ lat: parseFloat(row.lat), lng: parseFloat(row.lng) });
        });

        // Invoke the provided callback with the extracted coordinates
        if (callback && typeof callback === 'function') {
            callback(coordinates);
        }
    };

    // Send the XMLHttpRequest to fetch the file
    xhr.send();
}

// Store references to polylines when creating them
var polylineReferences = [];

function createPolylineForExcelFile(file, strokeColor) {
    // Load coordinates from Excel sheet
    loadCoordinatesFromExcel(file, function(coordinates) {
        var routeCoordinates = coordinates.map(function(coord) {
            return { lat: coord.lat, lng: coord.lng };
        });

        var routePolyline = new mappls.Polyline({
            map: map,
            path: routeCoordinates,
            strokeColor: strokeColor,
            strokeOpacity: 1.0,
            strokeWeight: 5,
            animate: {
                speed: 8,
                icon_width: 20,
                icon_height: 50,
                icon_url: "http://www.mapmyindia.com/api/advanced-maps/doc/sample/map_sdk/car.png",
                repeat: true,
            }
        });

        // Store the reference to the polyline
        polylineReferences.push(routePolyline);
    });
}