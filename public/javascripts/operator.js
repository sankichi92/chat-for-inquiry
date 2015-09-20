var template = $('#panel').remove().clone();
var socket = io.connect();

socket.emit('operator');

socket.on('message', function (data) {
  console.log('message', data);
  var panel = $('#' + data.from);
  if (!panel[0]) panel = createPanel(data.id);
  appendMessage(panel, data.msg, false);
});

socket.on('connection', function (id) {
  console.log('connection', id);
  createPanel(id);
});

function createPanel(id) {
  var panel = template.clone().attr('id', id).appendTo('#panels');
  panel.find('form').submit(function () {
    var input = $(this.message);
    socket.emit('message from operator', {to: id, msg: input.val()});
    appendMessage(panel, input.val(), true);
    input.val('');
    return false;
  });
  panel.find('button.close').click(function () {
    panel.remove();
  });
  return panel;
}

function appendMessage(panel, msg, isMine) {
  var clazz = isMine ? 'text-right' : 'list-group-item-info';
  panel.find('ul').append($('<li>').addClass('list-group-item ' + clazz).text(msg));
}
