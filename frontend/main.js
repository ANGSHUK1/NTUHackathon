window.onload = function(){
    const login = document.getElementById("login");
    const content = document.getElementById("content");
    const username = document.getElementById("username");
    const password = document.getElementById("password");
    const submit = document.getElementById("submit");
    const addcontent = document.getElementById("newcontent");
    const logout = document.getElementById("logout");
var cookie = document.cookie;
var http2 = new XMLHttpRequest();
function getContent(){
    http2.open("POST", "http://localhost:3000/api/fetch", true);
    http2.setRequestHeader("Content-type", "application/JSON");
    http2.send();
    http2.onload = function(){
        var newcontent = JSON.parse(http2.responseText);
        for (let e=0; e<newcontent.data.length; e++){
            var card = document.createElement("DIV");
            card.addEventListener("mouseover", function(){
                changeLocation(newcontent.data[e].lat, newcontent.data[e].lng)
            });
            card.setAttribute("class", "card");

            var image = document.createElement("DIV");
            image.setAttribute("class", "image");

            card.appendChild(image);

            var info = document.createElement("DIV");
            info.setAttribute("class", "info");
            for (var x in newcontent.data[e]){
                if (x != "url"){
                var input = document.createElement("P");
                input.innerHTML = newcontent.data[e][x];
                info.appendChild(input);
                }
            }

            card.appendChild(info);
            addcontent.appendChild(card);
        }
    }
}

if (!cookie.includes("auth=yes")){
content.style.display = "None";

submit.addEventListener("click", function(){
    var http = new XMLHttpRequest();
    http.open("POST", "http://localhost:3000/api/login", true);
    http.setRequestHeader("Content-type", "application/JSON");
    var params = {"username": username.value, "password": password.value}
    http.send(JSON.stringify(params));
    http.onload = function(){
        if (http.status == 200){
            content.style.display = "Block";
            login.style.display = "None";
            getContent();
            }
        }
    });
    }

else{
    content.style.display = "Block";
    login.style.display = "None";
    getContent();
}
logout.addEventListener("click", function(){
    document.cookie = "auth = no; ";
    console.log(document.cookie);
});
}
