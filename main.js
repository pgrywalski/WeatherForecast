$( document ).ready(function() {
  initLocation();
  updateCitis();

  $(".change-temp").click(function() {
    if ( $(".degree").text() === "℃" ) {
      $(".temp").text( parseInt($(".temp").text()) * 9 / 5 + 32 );
      $(".degree").html("&#8457;");
    } else {
      $(".temp").text( celc );
      $(".degree").html("&#8451;"); 
    }
  });
  
  $(".select-city").change(function() {
    var id = $(".select-city").find( ":selected" ).val();
    getLatLon( id );
  });
});

// Global variable to store Celsius
var celc;

// Get current location
function initLocation() {
  if ( navigator.geolocation ) {
    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };
    navigator.geolocation.getCurrentPosition( successFunction, errorFunction, options );
  }
}

// Temporary initation function
function initLoc() {
  var lat = 50.083328;
  var lon = 19.91667;
  getWeather( lat, lon );
}

// Get the latitude and the longitude of location
function successFunction( position ) {
  var lat = position.coords.latitude;
  var lon = position.coords.longitude;
  getWeather( lat, lon );
}

// Show error if location fails
function errorFunction() {
  alert( "I'm so sorry but I cannot find your location.\nI will set default to Krakow, PL." );
	// Set default location
	initLoc();
}

// Get weather information on latitude and longitude
function getWeather( lat, lon ) {
  var appid = "13823ae0568d487a3799f55cfc746aab";
  var url = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&units=metric&appid=" + appid;
  
  // Send weather object to update UI
  $.getJSON( url ).then(function( json ) {
    updateUI( json );
  });
};

// Update weather informations
function updateUI( obj ) {
  var imgUrl;
  var background;
  celc = obj.main.temp;
  
  // Update user interface information
  $(".location").text(obj.name + ", " + obj.sys.country);
  $(".temp").text(obj.main.temp);
  $(".pressure").html("<span class='bolded'>Pressure:</span> " + obj.main.pressure + " hPa");
  $(".humidity").html("<span class='bolded'>Humidity:</span> " + obj.main.humidity + "%");
  $(".weather-icon").attr("src", "http://openweathermap.org/img/w/" + obj.weather[0].icon + ".png");
  $(".wind-speed").html("<span class='bolded'>Wind:</span> " + obj.wind.speed + " m/s");
  $(".clouds").html("<span class='bolded'>Cloudiness:</span> " + obj.clouds.all + "%");
  $(".date").html("<span class='bolded'>Date:</span> " + new Date(obj.dt * 1000).toLocaleDateString());
  $(".sunrise").html("<span class='bolded'>Sunrise:</span> " + new Date(obj.sys.sunrise * 1000).toLocaleTimeString());
  $(".sunset").html("<span class='bolded'>Sunset:</span> " + new Date(obj.sys.sunset * 1000).toLocaleTimeString());
  
  // Change background image according to weather icon 
  imgUrl = getWeatherBg( obj.weather[0].icon );
  background = "linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65)), url('" + imgUrl + "')";
  $("body").css("background-image", background);
}

// Update dropdown menu of citis
function updateCitis() {
	var obj = getListCities();
	// Create empty jQuery object
  var elements = $();
    
	// Ad citis name and country to object
	for ( var i = 0; i < obj.length; i++ ) {
    elements = elements.add( "<option value='" + obj[i].id + "'>" + 
      obj[i].name + ", " + obj[i].country + "</option>"
		);
	}
	// Append object to select item
	$(".select-city").append( elements );
}

// Get location from city selected in drop down menu
function getLatLon( id ) {
  // Get list of citis
  var arr = getListCities();
  var lat;
  var lon;
  var latLon = $.grep( arr, function( data ) { return data.id === parseInt( id ); });

  lat = latLon[0].coord.lat;
  lon = latLon[0].coord.lon;
  getWeather( lat, lon );
}

// Get image background
function getWeatherBg( icon ) {
  var url;
  var image = [
    { icon: "01d", img: "https://images.unsplash.com/photo-1476819781034-f28f6631e10b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=213ff4953a6a5f7b6b0b0c283e1ca097&auto=format&fit=crop&w=1450&q=80" },
    { icon: "02d", img: "https://images.unsplash.com/photo-1455735459330-969b65c65b1c?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=f7a67f06c27804552d6bbd40afe0961e&auto=format&fit=crop&w=1352&q=80" },
    { icon: "03d", img: "https://images.unsplash.com/photo-1473667756246-477ca4048531?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=698c2c664d8beff2fa35ae3b774088ef&auto=format&fit=crop&w=1350&q=80" },
    { icon: "04d", img: "https://images.unsplash.com/photo-1488226941561-6d7a806ae42a?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=5f95cc79495c602f06dd3ba6b8219ed0&auto=format&fit=crop&w=1350&q=80" },
    { icon: "09d", img: "https://images.unsplash.com/photo-1460013477427-b0cce3e30151?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=b608fede172b5adc6af9d81f27e84509&auto=format&fit=crop&w=1350&q=80" },
    { icon: "10d", img: "https://images.unsplash.com/photo-1437624155766-b64bf17eb2ce?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=152e196f6372da6e3f879333a8816f04&auto=format&fit=crop&w=1350&q=80" },
    { icon: "11d", img: "https://images.unsplash.com/photo-1475116127127-e3ce09ee84e1?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=9c72023575ddab06e98fdca8afb31bc0&auto=format&fit=crop&w=1350&q=80" },
    { icon: "13d", img: "https://images.unsplash.com/photo-1513210264448-4adf37672cb8?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=92450ce6c76e0d7d3dfd964a61530982&auto=format&fit=crop&w=1267&q=80" },
    { icon: "50d", img: "https://images.unsplash.com/photo-1443128759403-3dac98b20779?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=186204ab5de5f2b1942584b61f3be77b&auto=format&fit=crop&w=1350&q=80" },
    { icon: "01n", img: "https://images.unsplash.com/photo-1498084244383-aecd31c8d85e?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=5e1a3d7f3b8b416c8ad6dc1cc18979a7&auto=format&fit=crop&w=1350&q=80" },
    { icon: "02n", img: "https://images.unsplash.com/photo-1470582891830-22e103e72deb?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=2ebbfbf1044b3cb1311b2ca15671ba9f&auto=format&fit=crop&w=1416&q=80" },
    { icon: "03n", img: "https://images.unsplash.com/photo-1516956906165-7586dfbd9f5b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=14f84a01c850c94a9fa2ccedd963c179&auto=format&fit=crop&w=1350&q=80" },
    { icon: "04n", img: "https://images.unsplash.com/photo-1500740516770-92bd004b996e?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=060deca22958f2e0baa11467858a1252&auto=format&fit=crop&w=1352&q=80" },
    { icon: "09n", img: "https://images.unsplash.com/photo-1499184949561-704bad5f6cd6?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=77317a33aa1161d69e1bd6d9af22426a&auto=format&fit=crop&w=1350&q=80" },
    { icon: "10n", img: "https://images.unsplash.com/photo-1501999635878-71cb5379c2d8?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=44a97a58e7e10deab6c8ec6aa41085b5&auto=format&fit=crop&w=1489&q=80" },
    { icon: "11n", img: "https://images.unsplash.com/photo-1504427842454-5c3d7c926047?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=b9c2b955801893783ddea57daf4421cd&auto=format&fit=crop&w=1267&q=80" },
    { icon: "13n", img: "https://images.unsplash.com/photo-1515759001579-b8922fb13a67?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=298902d431dc1a5d81721a7a031ab800&auto=format&fit=crop&w=1350&q=80" },
    { icon: "50n", img: "https://images.unsplash.com/photo-1515510424237-d7e4b9c5c975?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=d7ce4d859746afe49fc340f6d10e5475&auto=format&fit=crop&w=1350&q=80" }
  ];
  url = $.grep( image, function( data ) { return data.icon === icon });
  return url[0].img;
}

// List of cities added to drop down menu
function getListCities() {
  return [
    { id: 3094802, name: "Krakow", country: "PL", coord: { lon: 19.91667, lat: 50.083328 } },
    { id: 756135, name: "Warsaw", country: "PL", coord: { lon: 21.01178, lat: 52.229771 } },
    { id: 7532585, name: "Nowy Sącz", country: "PL", coord: { lon: 20.7066, lat: 49.610199 } },
    { id: 2950158, name: "Berlin", country: "DE", coord: { lon: 10.45, lat: 54.033329 } },
    { id: 5128638, name: "New York", country: "US", coord: { lon: -75.499901, lat: 43.000351 } },
    { id: 6160752, name: "Sydney", country: "CA", coord: { lon: -60.181751, lat: 46.150139 } },
    { id: 3451190, name: "Rio de Janeiro", country: "BR", coord: { lon: -43.2075, lat: -22.902781 } }
  ];
}