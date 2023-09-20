const inputText = document.querySelector("#inputText")
const searchBtn = document.querySelector("#search-btn")
const apiKey = "f30a6d38320864b5030395cbeb03be80"
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const timeZoneDb = " https://api.timezonedb.com/v2.1/get-time-zone?key=PC6WROD4W0YM&format=json&by=position&"




function update(){

   let mainContainer = document.querySelector(".main-container")

   while(mainContainer.firstChild){
    mainContainer.removeChild(mainContainer.firstChild)
   }
}

async function temperature(){

    update()

    const cityInputName = inputText.value
    if(cityInputName.length > 1){
    const response = await fetch(apiUrl + cityInputName + `&appid=${apiKey}`);

            if (response.status === 404) {
                alert("Wrong Name / Spelling")
                throw new Error("Wrong Name / Spelling")
            }
       
    let data = await response.json();
    // console.log(data);


    let _cityName = data.name
    let _temp = data.main.temp
    let _weatherCondition = data.weather[0].main





    let div = document.createElement("div")
    div.className = " d-flex flex-column justify-content-center align-items-center"

    let img = document.createElement("img")

    if(_weatherCondition == "Clouds"){
        img.src = "cloudy.png";
        document.body.style.background = "linear-gradient(90deg, #1c92d2, #f2fcfe)"
        
    }else if(_weatherCondition == "Clear"){
        img.src = "clear.png";
        document.body.style.background = "linear-gradient(50deg, #F2994A, #F2C94C)"
        
    }else if(_weatherCondition == "Rain"){
        img.src = "raining.png";
        document.body.style.background = "linear-gradient(90deg, #c4e0e5, #4ca1af)"

        
    }else if(_weatherCondition == "Drizzle"){
        img.src = "drizzle.png";
        document.body.style.background =  "linear-gradient(90deg, #44A08D, #093637)"

        
    }else if(_weatherCondition == "Mist"|| _weatherCondition == "Smoke" ||
     _weatherCondition == "Haze" || _weatherCondition == "Fog" ||  _weatherCondition == "Sand"  ||
       _weatherCondition == "Dust" ||  _weatherCondition == "Ash"||
         _weatherCondition == "Squall"|| _weatherCondition == "Tornado"){

        img.src = "mist.png";
        document.body.style.backgroundImage = "linear-gradient(90deg, #Dfe3d0, #b9bdc1)"
        
    }

    img.className = "img-1 me-2"

    let h1 = document.createElement("h1")
    h1.textContent = Math.round(_temp) + " °C";

    let _h1 = document.createElement("h1")
    _h1.className = "city-name";
    _h1.textContent = _cityName;

    div.appendChild(img)
    div.appendChild(h1)
    div.appendChild(_h1)

    document.querySelector(".main-container").appendChild(div)

        humidityWind(data)
        inputText.value =""
    }
    else{
        alert("Please Enter The City Name");
        
            console.log(alert);
    }

}


function humidityWind(data){


    let _humidity = data.main.humidity
    let _windSpeed = data.wind.speed


    let div0 = document.createElement("div")
    div0.className = "second-half-dev"

    let div1 = document.createElement("div")
    div1.className = "humidity-dev"

    let img = document.createElement("img")

    img.src = "Humidity.png";
    img.className = "img-2"

    let innerDiv = document.createElement("div")
    innerDiv.className = "col"
    
    let p = document.createElement("p")
    p.className ="m-0";
    p.textContent = _humidity + " %";

    let p2 = document.createElement("p")
    p2.textContent = "Humidity"
    p2.className = "m-0"


    innerDiv.appendChild(p)
    innerDiv.appendChild(p2)

    div1.appendChild(img)
    div1.appendChild(innerDiv)

// creating wind side of the div
    let div2 = document.createElement("div")
    div2.className = "Wind-div"

    let img2 = document.createElement("img")

    img2.src = "windSpeed.png";
    img2.className = "img-2"

    let innerDiv2 = document.createElement("div")
    innerDiv2.className = "col"
    
    let _p = document.createElement("p")
    _p.className ="m-0 p-tag"
    _p.textContent = _windSpeed + " km/h";


    let _p2 = document.createElement("p")
    _p2.textContent = "Wind Speed"
    _p2.className = "m-0 p-tag"


    innerDiv2.appendChild(_p)
    innerDiv2.appendChild(_p2)

    div2.appendChild(img2)
    div2.appendChild(innerDiv2)

    div0.appendChild(div1)
    div0.appendChild(div2)


    document.querySelector(".main-container").appendChild(div0)

    tempLogLat(data)

}

function tempLogLat(data){

    let _Tmin = data.main.temp_min
    let _Tmax = data.main.temp_max
    let _lon = data.coord.lon
    let _lat = data.coord.lat


    let div0 = document.createElement("div")
    div0.className = "second-half-dev-1 mb-4"

    let div1 = document.createElement("div")
    div1.className = "humidity-dev"

    let innerDiv = document.createElement("div")
    innerDiv.className = "col"
    
    let p = document.createElement("p")
    p.className ="mb-2 p-tag";
    p.textContent = "Tmin " + _Tmin;

    let p2 = document.createElement("p")
    p2.textContent = "Tmax " + _Tmax;
    p2.className = "m-0 p-tag"


    innerDiv.appendChild(p)
    innerDiv.appendChild(p2)

    div1.appendChild(innerDiv)

// creating wind side of the div
    let div2 = document.createElement("div")
    div2.className = "Wind-div"


    let innerDiv2 = document.createElement("div")
    innerDiv2.className = "col"
    
    let _p = document.createElement("p")
    _p.className ="m-0 p-tag"
    _p.textContent ="Longitude : \xa0"+ _lon;


    let _p2 = document.createElement("p")
    _p2.textContent = "Latitude : \xa0"+ _lat;
    _p2.className = "m-0 p-tag"


    innerDiv2.appendChild(_p)
    innerDiv2.appendChild(_p2)


    div2.appendChild(innerDiv2)

    div0.appendChild(div1)
    div0.appendChild(div2)


    document.querySelector(".main-container").appendChild(div0)

    timeFeelLike(data)

}

async function timeFeelLike(data){

    let _lon = data.coord.lon
    let _lat = data.coord.lat
        
    const response = await fetch(timeZoneDb + `lat=${_lat}` + `&lng=${_lon}`);
        if (!response.ok) {
            throw new Error(`Fetch request failed with status ${response.status}`);
            }
        const geoData = await response.json();
        
        // console.log(geoData);
        

    let _feelsLike = data.main.feels_like
    let cityTime = geoData.formatted
    let _zoneName = geoData.zoneName


    let div = document.createElement("div")
    div.className = " d-flex flex-column justify-content-center align-items-center m-2"

    let h5 = document.createElement("h5")
    h5.textContent = "Feels Like " + Math.round(_feelsLike)+ " °C";

    div.appendChild(h5)

    
    // ! creating the time div
    
    let _div = document.createElement("div")
    _div.className = " d-flex flex-column justify-content-center align-items-center m-2"
    
    let _h5 = document.createElement("h5")
    _h5.textContent = cityTime;
    
    _div.appendChild(_h5)


//!  creating the zoneName div

    let _div_ = document.createElement("div")
    _div_.className = " d-flex flex-column justify-content-center align-items-center m-2"
    
    let _h5_ = document.createElement("h5")
    _h5_.textContent = _zoneName;
    
    _div_.appendChild(_h5_)
    
    document.querySelector(".main-container").appendChild(div)
    document.querySelector(".main-container").appendChild(_div)
    document.querySelector(".main-container").appendChild(_div_)
}

searchBtn.addEventListener("click", temperature)
inputText.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      // code for enter
      temperature();
    }
});
