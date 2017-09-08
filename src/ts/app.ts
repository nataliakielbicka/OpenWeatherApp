(function() {
    "use strict";
    let url:string = "https://api.ipify.org/?format=json";
    fetch(url).then(function(res) {
      return res.json().then(function(data) {
        let ip:string = data.ip;
        let url2:any = `http://freegeoip.net/json/${ip}`;
        return fetch(url2).then(function(res) {
          return res.json().then(function(data) {
            let lat:number = data.latitude;
            let lon:number = data.longitude;
            let url1 = `http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=b374b402142b1e4df340cfd88462d925&lat=${lat}&lon=${lon}`;
              return fetch(url1).then(function(res) {
                return res.json().then(function(data) {
                  const ul = document.getElementById("weather");
                  let tempArr = data.list;
                  tempArr.map(function(v:any) {
                    let textCon:string = `Current temperature in location: ${v.main.temp}`;
                    ul.textContent = textCon;
                    //console.log(v.main.temp);
                    return textCon;
                  });
              });
            });
        });
      });
    });
  }).catch(function(error) {
    console.log('Request failed', error);
  });
})();