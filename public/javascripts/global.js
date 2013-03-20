function meow(title, message) {
  $.meow({
    'title': title,
    'message': message,
    'icon': '../images/nyan-cat.gif',
    'sticky': true,
    'closeable': true
  });
}

