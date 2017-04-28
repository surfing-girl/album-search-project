$.getJSON('/album_search/js/data.json', (data) => {
  let info = '<ul>';
  $.each(data, (index, lover) => {
    info += '<li>' + lover.name + ': ' + lover.age + '</li>'
  });
  info += '</ul>';
  $('#albums').html(info);
});
