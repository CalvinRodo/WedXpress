function loadRegistryItemForm(data, id) {
  $('#registryItemForm input[name=name]').val(data.name);
  $('#registryItemForm textarea[name=description]').val(data.description);
  $('#registryItemForm input[name=price]').val((parseInt(data.price) / 100).toFixed(2));
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

function bindClickEvents() {
  $('.editRegItem').on("click", function () {
    return GetFromServer(this, './registry/edit', loadRegistryItemForm)
  });
  $('.editInvite').on('click', function () {
    return GetFromServer(this, './invite/edit', loadInviteForm)
  });
  $('#editRegistryItem').on('click', function () {
    $('#addNew').attr('disabled', false);
  });
}

function SetupFileUploads() {
  $('.fileupload').fileupload({
    dataType: 'xml',
    url: 'https://wedxpress.s3.amazonaws.com/',
    process: [
      {
        action: 'load',
        fileTypes: /^image\/(gif|jpeg|png)$/,
        maxFileSize: 20000000 // 20MB
      },
      {
        //set the sizes to fit well with bootstrap thumbnails
        action: 'resize',
        maxWidth: 360,
        maxHeight: 270,
        minWidth: 160,
        minHeight: 120
      },
      {
        action: 'save'
      }
    ]
  }).bind('fileuploadsubmit',function (e, data) {
      var $this = $(this);
      $.getJSON('./upload', function (formData) {
        data.formData = formData;
        data.formData['key'] = data.files[0].name;
        data.formData['Content-Type'] = data.files[0].type;
        meow('Upload', 'Uploading ' + data.files[0].name);
        $this.fileupload('send', data);
      });
      //TODO: Add a progressbar
      return false;
    }).bind('fileuploaddone',function (e, data) {
      //TODO: Find a better way to do this
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
      }).done(function () {
          meow('Upload', 'Upload Successful!');
          $this.replaceWith('<a href="' + location + '">' + fileName + '</a>');
        }).fail(function () {
          meow('Error', 'Error Updating Registry Item, try again');
        });
    }).bind('fileuploadfail', function (e, data) {
      meow('Error', 'Failed to Upload image');
    });
}

$(function () {
  // Javascript to enable link to tab
  var hash = document.location.hash;
  var prefix = "tab_";
  if (hash) {
    $('.nav-tabs a[href=' + hash.replace(prefix, "") + ']').tab('show');
  }

  // Change hash for page-reload
  $('.nav-tabs a').on('shown', function (e) {
    window.location.hash = e.target.hash.replace("#", "#" + prefix);
  });

  SetupFileUploads();
  bindClickEvents();
  $('.tooltipster').tooltipster({
    'position': 'top-left'
  });
  $('.description').markItUp(mySettings);
});



