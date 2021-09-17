//DOM Selectors

var container = $("#info-table");
var areaCode = document.getElementById("areacode");
var submitEl = document.getElementById("submit");
var zipCode;
var lat;
var long;

//Toggle light/dark mode variables
var body = $('body');
var lightSwitch = $('#light-switch')

//Picture API call variables
var requestUrl = "https://api.nasa.gov/planetary/apod?api_key=qsQaRTJvk3pICPh8Ta3EufSeNvUosCdNK2CVBlfm&count=4";
var image1El = document.getElementById("img-one");
var image2El = document.getElementById("img-two");
var image3El = document.getElementById("img-three");

var title1 = document.getElementById("img-one-title");
var title2 = document.getElementById("img-two-title");
var title3 = document.getElementById("img-three-title");

var desEl1 = document.getElementById("desc-one");
var desEl2 = document.getElementById("desc-two");
var desEl3 = document.getElementById("desc-three");
//----------------------------------------------------------------------------------------------------------------

$("#search").click(function(event){
    event.preventDefault();

    areaCode = $("#areacode").val();
    //console.log(areaCode);
    var areaUrl = "https://api.openweathermap.org/geo/1.0/zip?zip=" + areaCode + "&appid=ce2aa6f67e317ff5f10deb7b9c6358f1";
    fetch(areaUrl)
})
//Toggle light/dark mode event listener
$('#flexSwitchCheckChecked').on('click', function (e) {


});


//Search button event listener
$("#search").click(function (event) {
    event.preventDefault();
    zipCode = $("#zipcode").val();
    zipUrl = "https://api.openweathermap.org/geo/1.0/zip?zip=" + zipCode + "&appid=ce2aa6f67e317ff5f10deb7b9c6358f1";
    fetch(zipUrl, {
        method: 'GET',
        credentials: 'same-origin',
        redirect: 'follow',
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            lat = data.lat;
            long = data.lon;
            console.log(areaCode, lat, long);
            useCoordinates(lat,long);
        });
});

//gets the sunrise and sunset information and stores it in data
var useCoordinates = function(lat, long) {
    //console.log(lat + " " + long);
    var issAPI = "https://satellites.fly.dev/passes/25544?lat=" + lat + "&lon=" + long + "&limit=100&days=7&visible_only=true";
    console.log(issAPI);
    fetch(issAPI)
    .then(function(response){
        if(response.ok) {
            response.json()
            .then(function(data){
                console.log(data);
                $(".issSection").remove(); //removes previous table information
                ISSSection(data);          //sets up the table with the data provided
            })
        }
    })
}

function astoroidSection (){
            console.log(areaCode, lat, long)
};

//NASA Near Earth Object API

function chickenLittle () {
  var today = moment().format('YYYY-MM-DD');
  var neoAPI = "https://api.nasa.gov/neo/rest/v1/feed?start_date=" +  today + "&end_date=" + today + "&api_key=aU9gsLEa5EEkdwAiUCG77iWZ1guGb6eXR4VVR4rn";
  fetch(neoAPI, {
    method: 'GET',
    credentials: 'same-origin',
    redirect: 'follow'
  })
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
      var neos = data['near_earth_objects'][today];

    for (i = 0; i < 3; i++) {
      asteroidName = neos[i].name;//Returns the Name of the NEO  
      asteroidSize = neos[i].estimated_diameter.meters.estimated_diameter_max
      asteroidMiss = neos[i].close_approach_data[0].miss_distance.kilometers    
      $("#asteroid_name_"+ i).text(asteroidName);
      $("#asteroid_size_" + i).text(asteroidSize + " Meters"); //Returns the Max Diameter in Meters
      $("#asteroid_miss_" + i).text(asteroidMiss + " Kilometers");//Returns closes Approach
      console.log(neos[i].is_potentially_hazardous_asteroid);//Boolean for if it is potentially dangerous
    };
  });
};

chickenLittle();


//API call to retrieve images from NASA API call
function getApiImages() {
    fetch(requestUrl, {
        method: 'GET',
        credentials: 'same-origin',
        redirect: 'follow',
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            var imageURL = data[0].url; //images url
            var alt = data[0].title;    //title of the image
            var desc = data[0].explanation; //description of the image
            image1El.src = imageURL;    //sets the source of the image element equal to the url of the image
            image1El.setAttribute("alt", alt);  //the alt of the image equal to the title
            title1.innerText = alt; //inner text of the html for the title
            desEl1.innerText = desc;    //inner text of the html for the description

            var imageURL = data[1].url;
            var alt = data[1].title;
            var desc = data[1].explanation;
            image2El.src = imageURL;
            image2El.setAttribute("alt", alt);
            title2.innerText = alt;
            desEl2.innerText = desc;

            var imageURL = data[2].url;
            var alt = data[2].title;
            var desc = data[2].explanation;
            image3El.src = imageURL;
            image3El.setAttribute("alt", alt);
            title3.innerText = alt;
            desEl3.innerText = desc;
        });
}

getApiImages();


//Asteroid table
function astoroidSection() {

    var headerAstoroid = $("<header>Astoroids Near You</header>");

    container.append(headerAstoroid);

    var tableAstoroid = $("<table class='table table-dark table-striped'>");

    var tHeadAstoroid = $("<thead>");

    var headerAstoroidTable = $("<tr>");

    headerAstoroidTable.append("<th scope='col'>Astoroid Name</th>");

    headerAstoroidTable.append("<th scope='col'>Size</th>");

    headerAstoroidTable.append("<th scope='col'>Miss Distance</th>");

    headerAstoroidTable.append("<th scope='col'></th>")

    tHeadAstoroid.append(headerAstoroidTable);

    tableAstoroid.append(tHeadAstoroid);

    var tBodyAstoroid = $("<tbody>");

    for (var i = 0; i < 3/*TODO:lenght of array*/; i++) {

        var row = $("<tr scope='row'>");

        row.append("<td id='asteroid_name_" + i + "'>"+ /*TODO:*/"astoroid name" +"</td>");

        row.append("<td id='asteroid_size_" + i + "'>"+" Meters" + "</td>");

        row.append("<td id='asteroid_miss_" + i + "'>"+ /*TODO:*/"miss distance" +"</td>");

        row.append("<td id='asteroid_distruction_" + i + "'>" +/*TODO*/"✌?☢" + "</td>")

        tBodyAstoroid.append(row);
    };

    tableAstoroid.append(tBodyAstoroid);

    container.append(tableAstoroid);

};

//ISS Satellite Table
function ISSSection(data) {

    var headerISS = $("<header class='issSection'>ISS</header>");

    container.append(headerISS);

    var tableISS = $("<table class='issSection table table-dark table-striped'>");

    var tHeadISS = $("<thead>");

    var headerISSTable = $("<tr>");

    headerISSTable.append("<th>Next Time in View (Culmination)</th>");

    headerISSTable.append("<th>Cardinal Coordinates</th>");

    headerISSTable.append("<th>Altitude off Horizon</th>");

    tHeadISS.append(headerISSTable);

    tableISS.append(tHeadISS);

    // console.log(data[0].culmination.length);

    console.log(data[0]);
    var tBodyISS = $("<tbody>");

    for(i=0; i<3; i++){   //gets the next three days that the ISS will be visible and displays data on them

        var ISSrow = $("<tr>");

        var dateViewable = data[i].culmination.utc_datetime;    //gets the date/time

        var date = dateViewable.split(".");                     //splits the time and makes it easier to read

        var altitude = data[i].culmination.alt;                 //gets the altitude

        var cardinalCoordinate = data[i].culmination.az_octant; //gets the cardinal coordinate

        ISSrow.append("<td>" + date[0] + "</td>");

        ISSrow.append("<td>" + cardinalCoordinate + "</td>");

        ISSrow.append("<td>" + altitude + "\u00B0" + "</td>");

        tBodyISS.append(ISSrow);

        tableISS.append(tBodyISS);

        container.append(tableISS);

    }
};

function init() {
    astoroidSection();
    //ISSSection();
};

init();