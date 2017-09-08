   const myIp:string = "https://api.ipify.org/?format=json";
    fetch(myIp).then(res => {
      return res.json()
      .then(data => {
        const ip:string = data.ip;
        const myGeoIp:string = `http://freegeoip.net/json/${ip}`;
        return fetch(myGeoIp)
        .then(res => {
          return res.json()
          .then(data => {
            const lat:number = data.latitude;
            const lon:number = data.longitude;
            const weatherApp = `http://api.openweathermap.org/data/2.5/forecast/daily?id=524901&APPID=bd5e378503939ddaee76f12ad7a97608&cnt=3&units=metric&lat=${lat}&lon=${lon}`;
              return fetch(weatherApp)
              .then(res => {
                return res.json()
                .then(data => {
                  const weatherTable = document.getElementById("weatherTable");
                  console.log(data)
                  const tempArr:any[] = data.list;
                  let result: string = "";
                    tempArr.forEach(v => {
                      result += "<tr>";
                      const temp:number = v.temp.day;
                      const tempMin:number = v.temp.min;
                      const tempMax:number = v.temp.max;
                      const pressure:number = v.pressure; 
                      result+=`<td>${temp}</td>
                              <td>${tempMin}</td>
                              <td>${tempMax}</td>
                              <td>${pressure}</td>`;
                      result+="</tr>";
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