var socket = io.connect();
var isStarted = false;
var panel = $('#panel');
socket.emit('operator');
socket.on('message', function (data) {
  console.log('message', data);
  appendMessage(data.from, data.msg);
});
socket.on('connection', function (uid) {
  console.log('connection', uid);
  if (isStarted) {
    panel.clone().attr('id', uid).appendTo('#panels');
  } else {
    panel.removeClass('hidden').attr('id', uid);
    isStarted = true;
  }
  $('#' + uid).find('form').submit(function () {
    var input = $('#' + uid + ' input');
    socket.emit('message from operator', {
      to: uid,
      msg: input.val()
    });
    appendMessage(uid, input.val());
    input.val('');
    return false;
  });
});
function appendMessage(from, msg) {
  $('#' + from).find('ul').append($('<li>').addClass('list-group-item').text(msg));
}
