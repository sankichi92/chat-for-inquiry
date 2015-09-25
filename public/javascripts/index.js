var socket = io.connect();

$('form').submit(function () {
  var input = $(this.message);
  socket.emit('message', input.val());
  appendMessage(input.val(), true);
  input.val('');
  return false;
});

socket.on('message', function (msg) {
  console.log('message', msg);
  appendMessage(msg, false);
});

function appendMessage(msg, isMine) {
  var clazz = isMine ? 'text-right' : 'list-group-item-info';
  var logs = $('#logs');
  logs.append($('<li>').addClass('list-group-item ' + clazz).text(msg))
      .animate({scrollTop: logs.prop('scrollHeight')}, 'slow');
}
