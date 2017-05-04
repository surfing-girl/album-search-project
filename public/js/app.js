$('form').submit((e) => {
  let query = document.getElementById('search').value;
  e.preventDefault();
  $.getJSON('https://api.spotify.com/v1/search?q=' + query + '&type=album', (data) => {
    let info = '';
    if (data.albums.items.length > 0) {
      $.each(data.albums.items, (index, album) => {
        info += '<li><div class="album-wrap"><img class="album-art" src="' + album.images[0].url + '"/></div>'
        info += '<span class="album-title">' + album.name + '</span>'
        info += '<span class="album-artist">' + album.artists[0].name + '</span></li>';
      });
    } else {
      info = "<li class='no-albums desc'><i class='material-icons icon-help'>help_outline</i>No albums found that match: " + query + ".</li>"
    }
    $('#albums').html(info);
  });
});
