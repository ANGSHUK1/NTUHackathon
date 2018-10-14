window.onload = function(){
    const login = document.getElementById("login");
    const content = document.getElementById("content");
    const username = document.getElementById("username");
    const password = document.getElementById("password");
    const submit = document.getElementById("submit");
    const logout = document.getElementById("logout");
    const addcontent = document.getElementById("newcontent");
    const register = document.getElementById("register");
    const r_username = document.getElementById("r_username");
    const password1 = document.getElementById("password1");
    const password2 = document.getElementById("password2");

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
            card.style.backgroundImage = "url(" + newcontent.data[e].url + ")";
            card.style.backgroundRepeat = "no-repeat";
            card.style.backgroundPosition = "center";
            card.style.backgroundSize = "cover";
            card.addEventListener("mouseover", function(){
                changeLocation(newcontent.data[e].lat, newcontent.data[e].lng)
            });


            card.setAttribute("class", "card blog-card");

            var titlecontent = document.createElement("DIV");
            titlecontent.setAttribute("class", "title-content");
            var name = document.createElement("H3");
            name.innerHTML = newcontent.data[e].name;

            var line = document.createElement("HR");
            titlecontent.appendChild(name);
            titlecontent.appendChild(line);

            card.append(titlecontent);


            let info = document.createElement("DIV");
            info.setAttribute("class", "card-info");
            var color = document.createElement("DIV");
            color.setAttribute("class", "color-overlay");
            for (var x in newcontent.data[e]){
                if (!(x == "url" || x == "lat" ||x == "lng" ||x == "name")){
                var input = document.createElement("P");
                input.innerHTML = x.charAt(0).toUpperCase() + x.slice(1) + ": " +newcontent.data[e][x];
                info.appendChild(input);
                }
            }


            card.appendChild(info);
            //card.appendChild(gradient);
            card.appendChild(color);


            addcontent.appendChild(card);
            card.addEventListener("mouseover", function(info){
                changeLocation(newcontent.data[e].lat, newcontent.data[e].lng)
            });

            info.addEventListener("click", function(){
              console.log("clicked");
              //info.removeEventListener("click", eventlistener, false);
              while (info.firstChild) {
                console.log("here");
                info.removeChild(info.firstChild);
              }
              var pickerForm = document.createElement("form");
              var datePicker = document.createElement("input");
              datePicker.addEventListener("click", (e) => {e.stopPropagation()})
              datePicker.setAttribute("type", "date");
              datePicker.setAttribute("required", "");
              datePicker.style.margin = "10px";
              pickerForm.appendChild(datePicker);

              var datePicker2 = document.createElement("input");
              datePicker2.addEventListener("click", (e) => {e.stopPropagation()})
              datePicker2.setAttribute("type", "date");
              datePicker.setAttribute("required", "");
              pickerForm.appendChild(datePicker2);

              var br = document.createElement("br");
              pickerForm.appendChild(br);

              var username = document.createElement("input");
              username.addEventListener("click", (e) => {e.stopPropagation()})
              username.setAttribute("type", "text");
              username.setAttribute("placeholder", "Enter your name");
              datePicker.setAttribute("required", "");
              pickerForm.appendChild(username);

              var br = document.createElement("br");
              pickerForm.appendChild(br);
              
              var br = document.createElement("br");
              pickerForm.appendChild(br);
              
              var submitbutton = document.createElement("button");
              submitbutton.setAttribute("type", "submit");
              submitbutton.innerHTML = "Submit request for this pet";
              pickerForm.appendChild(submitbutton);

              submitbutton.onclick = function(){
                  if (username.value == "" || datePicker.value == "" || datePicker2.value == ""){
                      alert("Please don't submit empty forms :(");
                  }
                  else{
                  alert("Congratulations! We will contact you shortly!");
                  }
            }
              info.appendChild(pickerForm);
            }, false);

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

  register.addEventListener("click", function(){
    if(password1.value != password2.value){
      window.alert("The passwords do not match");
      return;
    }
    var http = new XMLHttpRequest();
    http.open("POST", "http://localhost:3000/api/register", true);
    http.setRequestHeader("Content-type", "application/JSON");
    var params = {"username": r_username.value, "password": password1.value}
    http.send(JSON.stringify(params));
    http.onload = function(){
      content.style.display = "Block";
      login.style.display = "None";
      getContent();
    }
  });
  logout.addEventListener("click", function(){
    document.cookie = "auth=no; "
  });
}
