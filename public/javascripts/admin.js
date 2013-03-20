function loadRegistryItemForm(data, id) {
  $('#registryItemForm input[name=name]').val(data.name);
  $('#registryItemForm textarea[name=description]').val(data.description);
  $('#registryItemForm input[name=price]').val(data.price);
  $('#registryItemForm button[name=edit]')
    .attr('disabled', false)
    .attr('formaction', '/registry/edit/' + id);
  $('#addNew').attr('disabled', true);
}

function loadInviteForm(data, id) {
  $('#guestInviteForm input[name=name]').val(data.name);
  $('#guestInviteForm input[name=guests]').val(data.invites);
  $('#guestInviteForm input[name=url]').val(data.url);
  $('#guestInviteForm button[name=edit]')
    .attr('disabled', false)
    .attr('formaction', '/invite/edit/' + id);
}

function GetFromServer(obj, path, func) {
  id = $(obj).attr('data-id');
  $.get(path + '/' + id)
    .done(function (data) {
      func(data, id);
    }).fail(function (data) {
      console.log(data);
    });
  return false;
}

$(function () {
  $('.fileupload').fileupload({
    dataType: 'xml',
    url: 'https://wedxpress.s3.amazonaws.com/'
  }).bind('fileuploadsubmit',function (e, data) {
      var $this = $(this);
      $.getJSON('./upload', function (formData) {
        data.formData = formData;
        data.formData['key'] = data.files[0].name;
        data.formData['Content-Type'] = data.files[0].type;
        $this.fileupload('send', data);
      });
      //TODO: Add a progressbar
      return false;
    }).bind('fileuploaddone',function (e, data) {
      var location = data.result.childNodes[0].childNodes[0].textContent,
        fileName = data.result.childNodes[0].childNodes[1].textContent,
        bucket = data.result.childNodes[0].childNodes[2].textContent,
        key = data.result.childNodes[0].childNodes[3].textContent,
        $this = $(this),
        id = $this.attr('data-id');

      $.post('./upload', {
        'location': location,
        'filename': fileName,
        'bucket': bucket,
        'key': key,
        'id': id
      }, function () {
        $this.replaceWith('<a href="' + location + '">' + fileName + '</a>');
      });
    }).bind('fileuploadfail', function (e, data) {
      alert('failed to upload');
    });

  $('#editRegItem').on("click", function () {
    return GetFromServer(this, './registry/edit', loadRegistryItemForm)
  });
  $('#editInvite').on('click', function () {
    return GetFromServer(this, './invite/edit', loadInviteForm)
  });
  $('#editRegistryItem').on('click', function () {
    $('#addNew').attr('disabled', false);
  });
})



