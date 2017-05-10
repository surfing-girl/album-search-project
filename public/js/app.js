$('body').append('<div id="album-details"></div>');
$('#album-details').hide();

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
    $('#albums').show('slow');
    $('#album-details').hide();
    $('img').click( (e) => {
      console.log('helllooooo');
      $('#albums').hide('slow');
      let albumDetails = '<div class="main-content clearfix"><span><a id="searchResults" href="#">< Search results</a></span><div id="albumHeader">';
      //albumDetails += '';

      $.getJSON('https://api.spotify.com/v1/albums/' + e.target.parentNode.parentNode.childNodes[1].getAttribute('id') , (data) => {
        albumDetails += '<img class="album-art" src="' + e.target.getAttribute('src') + '"/>';
        albumDetails += '<h1><a href="' + data.external_urls.spotify + '">' + e.target.parentNode.parentNode.childNodes[1].innerHTML + ' ';
        albumDetails += ' (' + data.release_date + ')</a></h1><span>' + e.target.parentNode.parentNode.childNodes[2].innerHTML + '</span></div>';
        albumDetails += '<div id="tracksList"><h2>Track list:</h2><ol>';
        $.each(data.tracks.items, (index, track) => {
          albumDetails += '<li>' + track.name + '</li>';
        });
        albumDetails += '</ol></div></div>';
        $('#album-details').show().html(albumDetails);
        $('#searchResults').click( (e)=> {
          e.preventDefault();
          $('#album-details').hide('slow');
          $('#albums').show('slow');
        });
      });
    });
  });
});
