//DOM Selectors

var container = $("#info-table");
var areaCode;
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

//Toggle light/dark mode event listener
$('#flexSwitchCheckChecked').on('click', function (e) {


});


//Search button event listener
$("#search").click(function () {
    areaCode = $("#areacode").val();
    areaUrl = "https://api.openweathermap.org/geo/1.0/zip?zip=" + areaCode + "&appid=ce2aa6f67e317ff5f10deb7b9c6358f1";
    fetch(areaUrl, {
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
            console.log(areaCode, lat, long)
        });
});

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
            var imageURL = data[0].url;
            var alt = data[0].title;
            var desc = data[0].explanation;
            image1El.src = imageURL;
            image1El.setAttribute("alt", alt);
            title1.innerText = alt;
            desEl1.innerText = desc;

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

    tHeadAstoroid.append(headerAstoroidTable);

    tableAstoroid.append(tHeadAstoroid);

    var tBodyAstoroid = $("<tbody>");

    for (var i = 0; i < 3/*TODO:lenght of array*/; i++) {

        var row = $("<tr scope='row'>");

        row.append("<td>" + /*TODO:*/"astoroid name" + "</td>");

        row.append("<td>" + /*TODO:*/"size" + "</td>");

        row.append("<td>" + /*TODO:*/"miss distance" + "</td>");

        tBodyAstoroid.append(row);
    };

    tableAstoroid.append(tBodyAstoroid);

    container.append(tableAstoroid);

};

//ISS Satellite Table
function ISSSection() {

    var headerISS = $("<header>ISS</header>");

    container.append(headerISS)

    var tableISS = $("<table class='table table-dark table-striped'>");

    var tHeadISS = $("<thead>");

    var headerISSTable = $("<tr>");

    headerISSTable.append("<th>Next Time in View</th>");

    headerISSTable.append("<th>Is It Visable</th>");

    headerISSTable.append("<th>digrees from North</th>");

    headerISSTable.append("<th>Angle off Horizon</th>");

    tHeadISS.append(headerISSTable);

    tableISS.append(tHeadISS);

    var tBodyISS = $("<tbody>");

    var ISSrow = $("<tr>");

    ISSrow.append("<td>" + /*TODO:*/"next time" + "</td>");

    ISSrow.append("<td>" + /*TODO:*/"visable?" + "</td>");

    ISSrow.append("<td>" + /*TODO:*/"north" + "</td>");

    ISSrow.append("<td>" + /*TODO:*/"up" + "</td>");

    tBodyISS.append(ISSrow);

    tableISS.append(tBodyISS);

    container.append(tableISS);

};


function init() {
    astoroidSection();
    ISSSection();
};

init();

