var lightSwitch = $('#light-switch')





$('#light-switch').on('click', function (e) {
    var body = $('body');
    body.addClass.toggle("switch-func")
});

