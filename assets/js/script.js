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
var lightSwitch = $('#light-switch')





$('#light-switch').on('click', function (e) {
    var body = $('body');
    body.addClass.toggle("switch-func")
});

