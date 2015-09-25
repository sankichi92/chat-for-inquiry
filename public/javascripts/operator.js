var template = $('#panel').remove().clone();
var userCount = 0;
var socket = io.connect();

socket.emit('operator');

socket.on('message', function (data) {
  console.log('message', data);
  var panel = $('#' + data.id);
  if (!panel[0]) {
    panel = createPanel(data.id);
    socket.emit('request logs', data.id);
  }
  appendMessage(panel, data.msg, false);
});

socket.on('log', function (data) {
  console.log('log', data);
  var panel = $('#' + data.id);
  if (!panel[0]) panel = createPanel(data.id);
  prependMessage(panel, data.msg, data.from === 'operator');
});

socket.on('connection', function (id) {
  console.log('connection', id);
  createPanel(id);
});

socket.on('disconnect', function (id) {
  console.log('disconnect', id);
  $('#' + id).find('.panel')
      .removeClass('panel-default')
      .addClass('panel-danger')
      .find('button.send')
      .attr('disabled', '');
});

function createPanel(id) {
  userCount++;
  var panel = template.clone()
    .attr('id', id)
    .find('.panel-heading')
    .append(userCount)
    .end()
    .appendTo('#panels')
    .hide()
    .show('slow');
  panel.find('form').submit(function () {
    var input = $(this.message);
    socket.emit('message from operator', {id: id, msg: input.val()});
    appendMessage(panel, input.val(), true);
    input.val('');
    return false;
  });
  panel.find('button.close').click(function () {
    panel.hide('slow', function () {
      panel.remove();
    });
  });
  return panel;
}

function appendMessage(panel, msg, isMine) {
  var clazz = isMine ? 'text-right' : 'list-group-item-info';
  var panelBody = panel.find('ul');
  panelBody.append($('<li>').addClass('list-group-item ' + clazz).text(msg))
      .animate({scrollTop: panelBody.prop('scrollHeight')}, 'slow');
}

function prependMessage(panel, msg, isMine) {
  var clazz = isMine ? 'text-right' : 'list-group-item-info';
  panel.find('ul').prepend($('<li>').addClass('list-group-item ' + clazz).text(msg));
}
