var container = $("#container");

function astoroidSection (){

    var headerAstoroid = $("<header>Astoroids Near You</header>");

    container.append(headerAstoroid);

    var tableAstoroid = $("<table class=">");

    var headerAstoroidTable = $("<tr>");

    headerAstoroidTable.append("<th>Astoroid Name</th>");

    headerAstoroidTable.append("<th>Size</th>");

    headerAstoroidTable.append("<th>Miss Distance</th>");

    tableAstoroid.append(headerAstoroidTable);

    for( var i = 0; i < 3/*TODO:lenght of array*/; i++){

        var row = $("<tr>");

        row.append("<td>"+ /*TODO:*/"astoroid name" +"</td>");

        row.append("<td>"+ /*TODO:*/"size" + "</td>");

        row.append("<td>"+ /*TODO:*/"miss distance" +"</td>");

    tableAstoroid.append(row);
};

container.append(tableAstoroid);

};

function ISSSection (){

    var headerISS = $("<header>ISS</header>");

    container.append(headerISS)

    var tableISS = $("<table>");

    var headerISSTable = $("<tr>");

    headerISSTable.append("<th>Next Time in View</th>");

    headerISSTable.append("<th>Is It Visable</th>");

    headerISSTable.append("<th>digrees from North</th>");

    headerISSTable.append("<th>Angle off Horizon</th>");

    tableISS.append(headerISSTable);

    var ISSrow = $("<tr>");

        ISSrow.append("<td>"+ /*TODO:*/"next time" +"</td>");

        ISSrow.append("<td>"+ /*TODO:*/"visable?" + "</td>");

        ISSrow.append("<td>"+ /*TODO:*/"north" +"</td>");

        ISSrow.append("<td>"+ /*TODO:*/"up" +"</td>");

    tableISS.append(ISSrow);

    container.append(tableISS);

};

function init(){
    astoroidSection();
    ISSSection();
};

init();
var lightSwitch = $('#light-switch')





$('#light-switch').on('click', function (e) {
    var body = $('body');
    body.addClass.toggle("switch-func")
});

