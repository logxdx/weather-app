const apiKey = "bb80210d5e77f6d189c13a48d5cb0ac8";
const apiURL = "https://api.openweathermap.org/data/2.5/weather?units=metric";

const card = document.querySelector(".card")
const searchbox = document.querySelector(".search input")
const searchbtn = document.querySelector(".search button")
const wicon = document.querySelector(".weather-icon")


async function checkWeather(city) {

    const response = await fetch(apiURL + `&appid=${apiKey}&q=${city}`);
    var data = await response.json();

    if (response.status == 404) {

        card.style.height = '250px';
        document.querySelector(".weather").style.display = "none";
        document.querySelector(".error").style.display = "block";
        document.querySelector(".error").classList.add("fade-in");
        console.log(data);
    }

    else {

        console.log(data);

        document.querySelector(".error").style.display = "none"
        document.querySelector(".error").classList.remove("fade-in");


        document.querySelector(".temp").innerHTML = `${Math.round(
            data.main["temp"]
        )}<degree>℃</degree>`;
        document.querySelector(".minitemp").innerHTML = `${Math.round(
            data.main["temp_min"]
        )}<degree>℃</degree>`;
        document.querySelector(".maxitemp").innerHTML = `${Math.round(
            data.main["temp_max"]
        )}<degree>℃</degree>`;
        document.querySelector(".humidity").innerHTML = `${data.main["humidity"]}%`;
        document.querySelector(".wind").innerHTML = `${data.wind["speed"]} kmph`;
        document.querySelector(".city").innerHTML = data.name + ', ' + data.sys.country;
        document.querySelector(".status").innerHTML = data.weather[0].main;

        if (data.weather[0].main == "Clouds") {
            wicon.src = "images/clouds.png"
        }
        else if (data.weather[0].main == "Clear") {
            wicon.src = "images/clear.png"
        }
        else if (data.weather[0].main == "Rain") {
            wicon.src = "images/rain.png"
        }
        else if (data.weather[0].main == "Drizzle") {
            wicon.src = "images/drizzle.png"
        }
        else if (data.weather[0].main == "Mist") {
            wicon.src = "images/mist.png"
        }
        else if (data.weather[0].main == "Snow") {
            wicon.src = "images/snow.png"
        }

        card.style.height = 'min-content';
        document.querySelector(".weather").classList.add("fade-in");
        document.querySelector(".weather").style.height = "min-content";

    }

};

searchbtn.addEventListener("click", () => {
    checkWeather(searchbox.value);
});

document.addEventListener("keydown", (e) => {
    if (e.key == "Enter") {
        checkWeather(searchbox.value);
    }
});

checkWeather();
