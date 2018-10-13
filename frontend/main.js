
window.onload = function(){
const login = document.getElementById("login");
const content = document.getElementById("content");
const username = document.getElementById("username");
const password = document.getElementById("password");
const submit = document.getElementById("submit");


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
        }
    }
    
    });
}