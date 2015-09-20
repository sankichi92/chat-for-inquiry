var socket = io.connect();
socket.emit('operator');
$('form').submit(function () {
  var input = $('#message');
  socket.emit('message from operator', input.val());
  appendMessage(input.val());
  input.val('');
  return false;
});
socket.on('message', function (data) {
  console.log('message', data);
  appendMessage(data.msg);
});
function appendMessage(msg) {
  $('#logs').append($('<li>').addClass('list-group-item').text(msg));
}
