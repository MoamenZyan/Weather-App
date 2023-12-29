

var inputElement = document.getElementById("text-input");
var button = document.getElementById("button");
var temp = document.getElementById("temp");
var icon = document.getElementById("icon");
var place = document.getElementById("location");
var time = document.getElementById("time");
var desc = document.getElementById("desc");
var err = document.getElementById("err");



button.addEventListener("click", function(){
    const key = "efcc53c9202b49c2b39112905232912"
    var city = inputElement.value
    const url = `http://api.weatherapi.com/v1/current.json?key=${key}&q=${city}`
    if (city == "") {
        err.innerHTML = `<p style="font-size: 20pt;">Please Enter A City</p>`
        place.innerHTML = ""
        time.innerHTML = ""
        desc.innerHTML = ""
        icon.innerHTML = ""
        temp.innerHTML = ""
    }
    else {
        fetch(url)
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            else {
                if (res.status == 400) {
                    throw Error("City Not Found");
                }
                else {
                    throw Error(`Unknow Error: ${res.status}`)
                }
            }
        })
        .then(data => {
            icon.innerHTML = `
                <img src="${data['current']['condition']['icon']}" width="120" height="120" alt="Icon">
            `;

            temp.innerHTML = `
                <p>${data['current']['temp_c']}° C</p>
            `;

            place.innerHTML = `
                <img src="static/icons/location.png" alt="Icon" width="30" height="30" style="margin-right: 10px;">
                <p>${data['location']['name']}, ${data['location']['country']}</p>
            `;

            time.innerHTML = `
                <img src="static/icons/clock.png" alt="Icon" width="28" height="28" style="margin-right: 10px;">
                <p>${data['location']['localtime']}</p>
            `;

            desc.innerHTML = `
                <img src="static/icons/info.png" alt="Icon" width="28" height="28" style="margin-right: 10px;">
                <p>${data['current']['condition']['text']}</p>
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
