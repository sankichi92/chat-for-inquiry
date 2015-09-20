var socket = io.connect();
$('form').submit(function () {
  var input = $('#message');
  socket.emit('message', input.val());
  appendMessage(input.val());
  input.val('');
  return false;
});
socket.on('message', function (msg) {
  console.log('message', msg);
  appendMessage(msg);
});
function appendMessage(msg) {
  $('#logs').append($('<li>').text(msg));
}
