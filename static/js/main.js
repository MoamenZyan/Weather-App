

var inputElement = document.getElementById("text-input");
var button = document.getElementById("button");
var temp = document.getElementById("temp");
var icon = document.getElementById("icon");
var place = document.getElementById("location");
var time = document.getElementById("time");
var desc = document.getElementById("desc");
var err = document.getElementById("err");



button.addEventListener("click", function(){
    var city = inputElement.value
    const url = `https://visual-crossing-weather.p.rapidapi.com/forecast?aggregateHours=24&location=${city}&contentType=json&unitGroup=uk&shortColumnNames=true`;
    if (city == "") {
        err.innerHTML = `<p style="font-size: 20pt;">Please Enter A City</p>`
        place.innerHTML = ""
        time.innerHTML = ""
        desc.innerHTML = ""
        icon.innerHTML = ""
        temp.innerHTML = ""
    }
    else {
        fetch(url, {
            method: "GET",
            headers: {
                'X-RapidAPI-Key': '718a4a8248msh4cb9123f9b48ed1p142a91jsnb0bdba18dcf8',
                'X-RapidAPI-Host': 'visual-crossing-weather.p.rapidapi.com'
            }
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            else {
                if (res.status != 200) {
                    throw Error("City Not Found");
                }
                else {
                    throw Error(`Unknow Error: ${res.status}`)
                }
            }
        })
        .then(data => {
            let currentDate = new Date(data['locations'][city]['currentConditions']['datetime']);
            var year = currentDate.getFullYear();
            var month = currentDate.getMonth() + 1;
            var day = currentDate.getDate();
            var hours = currentDate.getHours();
            var minutes = currentDate.getMinutes();
            var formattedDateTime = year + '-' + month + '-' + day + ' ' + hours + ':' + (minutes < 10 ? '0' : '') + minutes;
            temp.innerHTML = `
                <p>${data['locations'][city]['currentConditions']['temp']}° C</p>
            `;

            place.innerHTML = `
                <img src="static/icons/location.png" alt="Icon" width="30" height="30" style="margin-right: 10px;">
                <p>${data['locations'][city]['address']}</p>
            `;

            time.innerHTML = `
                <img src="static/icons/clock.png" alt="Icon" width="28" height="28" style="margin-right: 10px;">
                <p>${formattedDateTime}</p>
            `;

            desc.innerHTML = `
                <img src="static/icons/info.png" alt="Icon" width="28" height="28" style="margin-right: 10px;">
                <p>${data['locations'][city]['currentConditions']['icon']}</p>
            `;
        })
        .finally(()=>{
            inputElement.value = ""
            err.innerHTML = ""
        })
        .catch(error => {
            err.innerHTML = `<p style="color: red;font-size: 20pt;">${error}</p>`;
        });
    }
});
