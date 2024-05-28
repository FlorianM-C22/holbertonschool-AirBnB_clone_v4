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
