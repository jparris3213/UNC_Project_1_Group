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

