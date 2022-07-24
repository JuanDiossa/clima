const KEY = "804aee177291391902a138d516ddc403";
const lang = "es";//es:español, en:ingles
const units = "metric";//metric:celcius, imperial:fahrenheit
const city = document.querySelector("input");
const submit = document.querySelector("button");
const showCity =document.getElementById("city");
const showWind =document.getElementById("wind");
const showHumidity =document.getElementById("humidity");
const showDate =document.getElementById("date");
const showTemp = document.getElementById("temp");
const showState = document.getElementById("state");
const date = new Date();
const month = date.toString();
const img = document.getElementById("img");
const section = document.querySelector("section");
const key = "Enter";
const errText = document.querySelector("small");

async function fetchData(urlApi){
    const response = await fetch(urlApi);
    const data = await response.json();
    return data;
}

async function showWeather(){

    try {
    
        
    const API = `https://api.openweathermap.org/data/2.5/weather?appid=${KEY}&lang=${lang}&units=${units}&q=${city.value}`;

    const weather = await fetchData(API);

    if (weather.cod == 200){
        errText.className = "mx-3 hidden";
    }

    let speed = Math.floor(((weather.wind.speed*1)/1000) * (3600/1));

    section.className = "my-8 bg-[#80ccff] bg-opacity-90 md:grid md:grid-cols-3 rounded-lg shadow-lg p-4 md:justify-items-stretch w-full flex flex-col";
    img.className = "block";
    img.src = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;

    showDate.innerHTML = `${date.getDate()}/${month.substr(4,3)}/${date.getFullYear()}`;

    showCity.innerHTML = weather.name+", "+weather.sys.country;

    showTemp.innerHTML = `${weather.main.temp}°C`;

    showHumidity.innerHTML = `${weather.main.humidity}%`;

    showWind.innerHTML = `${speed} Km/h`;

    showState.innerHTML = `${weather.weather[0].description}`;

    } catch (err) {
        errText.className = "mx-3 text-red-300 italic"
        // alert("error en ciudad/pais ingresado");
        console.log(err);
    }



}



submit.addEventListener("click", showWeather);
document.addEventListener("keydown",(event) =>{
    if (event.key === key && event.target.localName == "input"){
        showWeather();
    }
})
