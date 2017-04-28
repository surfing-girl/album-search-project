$.getJSON('/js/data.json', (data) => {
  let info = '<ul>';
  $.each(data, (index, lover) => {
    info += '<li>' + lover.name + ': ' + lover.age + ' <3 </li>'
  });
  info += '</ul>';
  $('#albums').html(info);
});
