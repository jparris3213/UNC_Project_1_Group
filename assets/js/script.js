//DOM Selectors

var container = $("#info-table");
var areaCode = document.getElementById("areacode");
var submitEl = document.getElementById("submit");
var zipCode;
var lat;
var long;

//Toggle light/dark mode variables
var body = $('body');
var lightSwitch = $('#flexSwitchCheckChecked')

//Picture API call variables
var requestUrl = "https://api.nasa.gov/planetary/apod?api_key=qsQaRTJvk3pICPh8Ta3EufSeNvUosCdNK2CVBlfm&count=4";
var carouselImgContainer = $("#carousel-container");


//Asteroid Table Length Chooser
var table_length = 7;


//Toggle light/dark mode event listener
lightSwitch.on('click', function (e) {
    var toggleMode = e.target.checked;

    if (!toggleMode) {
        body.removeClass('dark-mode');
        body.addClass('light-mode');
    } else {
        body.removeClass('light-mode');
        body.addClass('dark-mode');
    }
});


//Search button event listener
$("#search").click(function (event) {
    event.preventDefault();
    split_screen = true;
    searchanimation(split_screen);
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
            useCoordinates(lat, long);
        });

    chickenLittle();
});

$("#showpicture").on("click", function () {
    searchanimation(false);
})

//gets the sunrise and sunset information and stores it in data
var useCoordinates = function (lat, long) {
    //console.log(lat + " " + long);
    var issAPI = "https://satellites.fly.dev/passes/25544?lat=" + lat + "&lon=" + long + "&limit=100&days=7&visible_only=true";
    console.log(issAPI);
    fetch(issAPI)
        .then(function (response) {
            if (response.ok) {
                response.json()
                    .then(function (data) {
                        console.log(data);
                        $(".issSection").remove(); //removes previous table information
                        ISSSection(data);          //sets up the table with the data provided
                    })
            }
        })
}

function asteroidSection() {
    console.log(areaCode, lat, long)
};

//NASA Near Earth Object API

function chickenLittle() {
    var today = moment().format('YYYY-MM-DD');
    var neoAPI = "https://api.nasa.gov/neo/rest/v1/feed?start_date=" + today + "&end_date=" + today + "&api_key=aU9gsLEa5EEkdwAiUCG77iWZ1guGb6eXR4VVR4rn";
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

            for (i = 0; i < table_length; i++) {

                var asteroidName = neos[i].name;//Returns the Name of the NEO  

                var asteroidSize = neos[i].estimated_diameter.meters.estimated_diameter_max;
                var roundedSize = Math.round(asteroidSize * 100) / 100;
                var commaSize = roundedSize.toLocaleString("en-US");

                var asteroidMiss = neos[i].close_approach_data[0].miss_distance.kilometers;
                var roundedMiss = Math.round(asteroidMiss * 100) / 100;
                var commaMiss = roundedMiss.toLocaleString("en-US");

                $("#asteroid_name_" + i).text(asteroidName);
                $("#asteroid_size_" + i).text(commaSize + " Meters"); //Returns the Max Diameter in Meters
                $("#asteroid_miss_" + i).text(commaMiss + " Kilometers");//Returns closest Approach
                var dangerGauge = neos[i].is_potentially_hazardous_asteroid;//Boolean for if it is potentially dangerous
                if (dangerGauge === true) {
                    $("#asteroid_distruction_" + i).text("☢");
                } else {
                    $("#asteroid_distruction_" + i).text("✌");
                };

            };


        });
};




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

            for (i = 0; i <= 2; i++) {
                var imageURL = data[i].url;
                var alt = data[i].title;
                var sentences = data[i].explanation;
                sentences = sentences.split(". ");
                sentences[0] += ". ";
                sentences[0] += sentences[1];
                sentences[0] += ". ";
                var desc = sentences[0];

                var imgContainer = $("<div class='carousel-item'>");
                if (i == 0) {
                    imgContainer.addClass("active")
                }

                var imageEl = $("<img src=" + imageURL + " class='image-fluid image-style d-block w-100' alt = 'NASA_space_image'>")

                var titleDescContainer = $("<div class='blurb carousel-caption d-none d-md-block'>")

                var titleEl = $("<h5 class='picture-title'>")
                var imgDescription = $("<p class='picture-desc'>")

                titleEl.html(alt);
                imgDescription.html(desc);

                imgContainer.append(imageEl);
                titleDescContainer.append(titleEl);
                titleDescContainer.append(imgDescription);
                imgContainer.append(titleDescContainer);
                carouselImgContainer.append(imgContainer);


            }
        });
}

getApiImages();



//Asteroid table
function asteroidSection() {

    var headerAsteroid = $("<header class='table-header tiptool'><strong>Asteroids Near You ⓘ<span class='texttooltip'>Tooltip text</span></strong></header>");

    container.append(headerAsteroid);

    var tableAsteroid = $("<table class='table table-dark table-striped'>");

    var tHeadAsteroid = $("<thead>");

    var headerAsteroidTable = $("<tr>");

    headerAsteroidTable.append("<th scope='col'>Asteroid Name</th>");

    headerAsteroidTable.append("<th scope='col'>Size</th>");

    headerAsteroidTable.append("<th scope='col'>Distance From Earth</th>");

    headerAsteroidTable.append("<th scope='col'>Potential Earth Impact</th>");

    headerAsteroidTable.append("<th scope='col'>Date of Clossest Pass</th>");

    headerAsteroidTable.append("<th scope='col'>Current Distance</th>");

    tHeadAsteroid.append(headerAsteroidTable);

    tableAsteroid.append(tHeadAsteroid);

    var tBodyAsteroid = $("<tbody>");

    for (var i = 0; i < table_length/*TODO:lenght of array*/; i++) {

        var row = $("<tr scope='row'>");

        row.append("<td id='asteroid_name_" + i + "'>" + /*TODO:*/"asteroid name" + "</td>");

        row.append("<td id='asteroid_size_" + i + "'>" + " Meters" + "</td>");

        row.append("<td id='asteroid_miss_" + i + "'>" + /*TODO:*/"Distance from Earth" + "</td>");

        row.append("<td id='asteroid_distruction_" + i + "'>" +/*TODO*/"✌?☢" + "</td>");

        row.append("<td id='date_clossest_" + i + "'>" +/*TODO*/"clossest" + "</td>");

        row.append("<td id='current_distance_" + i + "'>" +/*TODO*/"distance" + "</td>");

        tBodyAsteroid.append(row);
    };

    tableAsteroid.append(tBodyAsteroid);

    container.append(tableAsteroid);

};

//ISS Satellite Table
function ISSSection(data) {

    var headerISS = $("<header class='issSection table-header'><strong>ISS Location Information</strong></header>");

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

    for (i = 0; i < 3; i++) {   //gets the next three days that the ISS will be visible and displays data on them

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

//SplitScreen Animation
var split_screen = false;

function searchanimation(shouldisplit) {
    var carousel = $("#carouselExampleCaptions");
    var info_table = $("#info-table");
    if (shouldisplit === false) {
        carousel.animate({ width: "100%" }, 1000);
        info_table.animate({ width: "0%" }, 800);
        info_table.attr("style", "display:none");


    } else {
        //$(".table").attr("style","display:block");
        carousel.animate({
            width: "50%"
        }, 1000);
        info_table.attr("style", "display:block")
        info_table.animate({ width: "50%" }, 1000);
    };

};

function init() {
    searchanimation(split_screen);
    asteroidSection();
    //ISSSection();
};

init();
