$.getJSON('https://api.spotify.com/v1/search?q=muse&type=album', (data) => {
  let info = '';
  $.each(data.albums.items, (index, album) => {
    info += '<li><div class="album-wrap"><img class="album-art" src="' + album.images[1].url + '"/></div>'
    info += '<span class="album-title">' + album.name + '</span>'
    info += '<span class="album-artist">' + album.artists[0].name + '</span></li>';
  });
  $('#albums').html(info);
});
