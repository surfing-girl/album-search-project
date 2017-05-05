$('form').submit((e) => {
  let query = document.getElementById('search').value;
  e.preventDefault();
  $.getJSON('https://api.spotify.com/v1/search?q=' + query + '&type=album', (data) => {
    let info = '';
    if (data.albums.items.length > 0) {
      $.each(data.albums.items, (index, album) => {
        info += '<li><div class="album-wrap"><img class="album-art" src="' + album.images[0].url + '"/></div>'
        info += '<span id=' + album.id + ' class="album-title">' + album.name + '</span>'
        info += '<span class="album-artist">' + album.artists[0].name + '</span></li>';
      });
    } else {
      info = "<li class='no-albums desc'><i class='material-icons icon-help'>help_outline</i>No albums found that match: " + query + ".</li>"
    }
    $('#albums').html(info);

    $('img').click( (e) => {
      let albumDetails = '<div id="album-details">';
      $('#albums').hide('slow');

      $.getJSON('https://api.spotify.com/v1/albums/' + e.target.parentNode.parentNode.childNodes[1].getAttribute('id') , (data) => {
        // console.log(e.target.albumData.albumId);
        albumDetails += '<img class="album-art" src="' + e.target.getAttribute('src') + '"/>';
        albumDetails += '<a href="' + data.external_urls.spotify + '">' + e.target.parentNode.parentNode.childNodes[1].innerHTML + ' ' + e.target.parentNode.parentNode.childNodes[2].innerHTML + '</a></div>';
        albumDetails += '<h1>' + data.release_date + '</h1>';
        albumDetails += '<ul>';
        $.each(data.tracks.items, (index, track) => {
          albumDetails += '<ol>' + track.name + '</ol>';
        });
        albumDetails += '</ul>';
        $('.main-content').html(albumDetails);
      });
    });
  });
});
