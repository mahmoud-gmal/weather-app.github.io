// The getCurrentPosition() method is used to return the user's position.
// Check if Geolocation is supported
// If supported, run the getCurrentPosition() method. If not, display a message to the user
// If the getCurrentPosition() method is successful, it returns a coordinates object to the function specified in the parameter (showPosition)
// The showPosition() function outputs the Latitude and Longitude

window.addEventListener("load", ()=>{
  let long;
  let lat;
  let temperatureDescription = document.querySelector(".temperature-description");
  let temperatureDegree = document.querySelector(".temperature-degree");
  let locationTimezone = document.querySelector(".location-timezone");
  let temperatureSection = document.querySelector(".temperature");
  let temperatureSpan = document.querySelector(".temperature span");

  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(position =>{
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const proxy = "https://cors-anywhere.herokuapp.com";
      const api = `${proxy}/https://api.darksky.net/forecast/d2a09f2513410dfd1008594b1128fc96/${lat},${long}`;

      fetch(api)
        .then(response => {
          return response.json();
        })
        .then(data => {
          //console.log(data);
          //instead of  data.currently.temperature
          const {temperature, summary, icon} = data.currently;
          // set Dom Elements form the API
          temperatureDegree.textContent = temperature;
          temperatureDescription.textContent = summary;
          locationTimezone.textContent = data.timezone;

          // formula for celsius
          let celsius = (temperature - 32) * (5 / 9);

          // set Icon'from API' callback
          setIcons(icon, document.querySelector(".icon"));

          // change temp to celsius/farenheit
          temperatureSection.addEventListener("click", () =>{
            if(temperatureSpan.textContent === "F"){
              temperatureSpan.textContent = "C";
              temperatureDegree.textContent = Math.floor(celsius);

            }
            else{
              temperatureSpan.textContent = "F";
              temperatureDegree.textContent = temperature;
            }

          });
          

        });

    });

  }
// for setting Icon
function setIcons(icon, iconId){

  const skycons = new Skycons({color: "white"});

  // Changing api icon from a format "partly-cloudy-day" to "PARTLY_CLOUDY_DAY"
  const currentIcon = icon.replace(/-/g, "_").toUpperCase(); //PARTLY_CLOUDY_DAY

  skycons.play(); // start animation!

  // want to change the icon? no problem:
  return skycons.set(iconId, Skycons[currentIcon]);

}



});
