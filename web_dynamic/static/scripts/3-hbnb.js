$(document).ready(function () {
  const checkedDict = {};

  $('.amenities input[type="checkbox"]').change(function () {
    if ($(this).prop('checked')) {
      const id = $(this).attr('data-id');
      const name = $(this).attr('data-name');
      checkedDict[id] = name;
    } else {
      const key = $(this).attr('data-id');
      delete checkedDict[key];
    }

    const amenList = [];
    $.each(checkedDict, function (key, val) {
      amenList.push(val);
    });
    const amenStr = amenList.join(', ');
    if (amenStr.length < 20) {
      $('.amenities h4').text(amenStr);
    } else {
      $('.amenities h4').text(amenStr.substring(0, 20) + '...');
    }
  });

  $.get('http://0.0.0.0:5001/api/v1/status/', function (data, textStatus) {
    if (textStatus === 'success') {
      if (data.status === 'OK') {
        $('#api_status').addClass('available');
      } else {
        $('#api_status').removeClass('available');
      }
    }
  });

  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({}), // Empty object
    success: function (response) {
      for (const place of response) {
        const article = $('<article></article>').addClass('place');
        const titleBox = $('<div></div>').addClass('title_box');
        const title = $('<h2></h2>').text(place.name);
        const price = $('<div></div>').addClass('price_by_night').text('$' + place.price_by_night);
        titleBox.append(title, price);
        const information = $('<div></div>').addClass('information');
        const maxGuest = $('<div></div>').addClass('max_guest').text(place.max_guest + ' Guests');
        const numberRooms = $('<div></div>').addClass('number_rooms').text(place.number_rooms + ' Rooms');
        const numberBathrooms = $('<div></div>').addClass('number_bathrooms').text(place.number_bathrooms + ' Bathrooms');
        information.append(maxGuest, numberRooms, numberBathrooms);
        const description = $('<div></div>').addClass('description').text(place.description);
        article.append(titleBox, information, description);
        $('section.places').append(article);
      }
      console.log('Success:', response);
    },
    error: function (error) {
      console.error('Error:', error);
    }
  });
});
