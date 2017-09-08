const myIp = "https://api.ipify.org/?format=json";
fetch(myIp).then(res => {
    return res.json()
        .then(data => {
            const ip = data.ip;
            const myGeoIp = `https://freegeoip.net/json/${ip}`;
            return fetch(myGeoIp)
                .then(res => {
                    return res.json()
                        .then(data => {
                            const lat = data.latitude;
                            const lon = data.longitude;
                            const weatherApp = `https://api.openweathermap.org/data/2.5/forecast/daily?id=524901&APPID=bd5e378503939ddaee76f12ad7a97608&cnt=3&units=metric&lat=${lat}&lon=${lon}`;
                            return fetch(weatherApp)
                                .then(res => {
                                    return res.json()
                                        .then(data => {
                                            const weatherTable = document.getElementById("weatherTable");
                                            console.log(data);
                                            const tempArr = data.list;
                                            let result = "";
                                            tempArr.forEach(v => {
                                                result += "<tr>";
                                                const temp = v.temp.day;
                                                const tempMin = v.temp.min;
                                                const tempMax = v.temp.max;
                                                const pressure = v.pressure;
                                                result += `<td>${temp}</td>
                                                            <td>${tempMin}</td>
                                                            <td>${tempMax}</td>
                                                            <td>${pressure}</td>`;
                                                result += "</tr>";
                                            });
                                            weatherTable.innerHTML = result;
                                            return result;
                                        });
                                });
                        });
                });
        });
}).catch(function(error) {
    console.log('Request failed', error);
});