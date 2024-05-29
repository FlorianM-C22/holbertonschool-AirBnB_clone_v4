//Amenities tickboxes
$(document).ready(function() {
  const selectedAmenities = {};

  $('input[type="checkbox"]').change(function() {
      const amenityId = $(this).attr('data-id');
      const amenityName = $(this).attr('data-name');

      if (this.checked) {
          selectedAmenities[amenityId] = amenityName;
      } else {
          delete selectedAmenities[amenityId];
      }

      const amenitiesList = Object.values(selectedAmenities).join(', ');
      $('div.amenities h4').text(amenitiesList);
  });
});

// Api status
$.get("http://127.0.0.1:5001/api/v1/status/")
.done(function(data, textStatus) {
  if (data.status === "OK") {
    $('#api_status').addClass("available");
  } else {
    $('#api_status').removeClass("available");
  }
})
.fail(function() {
  $('#api_status').removeClass("available");
  alert('API Failure');
});

// Places search
$.ajax({
  type: "POST",
  url: "http://127.0.0.1:5001/api/v1/places_search/",
  contentType: "application/json",
  data: JSON.stringify({}),
  success: function(data) {
    // Get the section where places will be displayed
    const placesSection = $('section.places');

    // Clear any existing places
    placesSection.empty();

    // Loop through the data and create HTML elements
    data.forEach(place => {
      // Create the place article
      const placeArticle = $('<article></article>');

      // Create and append the place name
      const placeName = $('<h2></h2>').text(place.name);
      placeArticle.append(placeName);

      // Create and append description element
      const description = $('<p></p>').text(place.description.replace(/Owner: .*/, ''));
      article.append(description);

      // Append the article to the section
      placesSection.append(placeArticle);
    });
  },
  error: function() {
    alert('Error occurred while searching for places');
  }
});
