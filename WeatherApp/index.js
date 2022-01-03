// async function fetchData(){
//     await fetch(`http://api.weatherapi.com/v1/current.json?key=8aec8f96bd1c41fb8f0104044210112&q=London&aqi=yes`)
//         .then((response) => response.json())
//         .then((data) => {
//                 console.log(data.location);
//                 return Promise.resolve(data.location);
//             })
//         .catch((error) =>{
//             console.log("Twoja stara");
//         })
// }


const fetchData = async function(city){
    const response = await axios.get(`http://api.weatherapi.com/v1/current.json?key=8aec8f96bd1c41fb8f0104044210112&q=${city}&aqi=yes`);
    if(response.data.Error){
        return [];
    }
    console.log(response.data.current);
    return response.data.current;
} 

const weatherConditions = async (city) =>{
    const data = await fetchData(city);
    
    const cityName = document.querySelector(".city");
    const temperature = document.querySelector(".temperature");
    const weatherPicture = document.querySelector(".weather-picture");
    const pressure = document.querySelector("#pressure");
    const wind = document.querySelector("#wind");
    const humidity = document.querySelector("#humidity");
    cityName.innerText = city;
    temperature.innerText = `${data.temp_c}°C`;
    weatherPicture.src = `${data.condition.icon}`
    pressure.innerText = `${data.pressure_mb} hPa`;
    wind.innerText = `${data.wind_kph} km/h`;
    humidity.innerText = `${data.humidity} %`
}

const screenIndex = (screens) =>screens.findIndex((screen) => screen.classList.contains("active"));


const swiftScreen = () =>{
    const buttons = document.querySelectorAll(".btn");
    const cities = ["Porto", "London", "Gdansk"];
    var screens = document.querySelectorAll("li");
    screens = Array.from(screens);


    buttons[0].addEventListener("click", () =>{
        const index = screenIndex(screens);

        if(index === 0){
            screens[index].classList.remove("active");
            screens[screens.length - 1].classList.add("active")
            weatherConditions(cities[screens.length - 1]);
        }
        else{
            screens[index].classList.remove("active");
            screens[index - 1].classList.add("active");
            weatherConditions(cities[index - 1]);
        }
    })

    buttons[1].addEventListener("click", () =>{
        const index = screenIndex(screens);

        if(index == screens.length - 1){
            screens[index].classList.remove("active");
            screens[0].classList.add("active")
            weatherConditions(cities[0]);
        }
        else{
            screens[index].classList.remove("active");
            screens[index + 1].classList.add("active")
            weatherConditions(cities[index + 1]);
        }
    })
}

const swiftAction = (button) => {

}


weatherConditions("Porto");
swiftScreen();

