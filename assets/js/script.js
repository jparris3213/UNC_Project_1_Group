var container = $("#container");

function astoroidSection (){

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

    for( var i = 0; i < 3/*TODO:lenght of array*/; i++){

        var row = $("<tr scope='row'>");

        row.append("<td>"+ /*TODO:*/"astoroid name" +"</td>");

        row.append("<td>"+ /*TODO:*/"size" + "</td>");

        row.append("<td>"+ /*TODO:*/"miss distance" +"</td>");

    tBodyAstoroid.append(row);
};

tableAstoroid.append(tBodyAstoroid);

container.append(tableAstoroid);

};

function ISSSection (){

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

        ISSrow.append("<td>"+ /*TODO:*/"next time" +"</td>");

        ISSrow.append("<td>"+ /*TODO:*/"visable?" + "</td>");

        ISSrow.append("<td>"+ /*TODO:*/"north" +"</td>");

        ISSrow.append("<td>"+ /*TODO:*/"up" +"</td>");

    tBodyISS.append(ISSrow);

    tableISS.append(tBodyISS);

    container.append(tableISS);

};

function init(){
    astoroidSection();
    ISSSection();
};

init();

var requestUrl = "https://api.nasa.gov/planetary/apod?api_key=qsQaRTJvk3pICPh8Ta3EufSeNvUosCdNK2CVBlfm&count=4";
var image1El = document.getElementById("image1")


function getApiImages(){
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

  for(i=0;i<data.length;i++){
    imageURL = data[i].url;
    var alt = data[i].title;
    var desc = data[i].explanation;
    var h2El = document.createElement("h2");
    var img = document.createElement("img");
    var pEl = document.createElement("p");
    h2El.innerText = alt;
    pEl.innerText = desc;
    img.src = imageURL;
    img.setAttribute("alt", alt);
    var src = image1El;
    src.appendChild(h2El);
    src.appendChild(img);
    src.appendChild(pEl);
    }
  });
}

getApiImages();
var lightSwitch = $('#light-switch')





$('#light-switch').on('click', function (e) {
    var body = $('body');
    body.addClass.toggle("switch-func")
});

