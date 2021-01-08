let tabs = document.getElementById("horizontal-tabs");
let input = document.createElement("INPUT");
input.setAttribute("type", "number");
input.setAttribute("id", "rosearchinputbar")
input.setAttribute("size", "3")
let button = document.createElement("INPUT");
button.setAttribute("type", "submit");
button.setAttribute("value", "Join");
let text = document.createElement("p");
tabs.parentNode.insertBefore(text, tabs);
tabs.parentNode.insertBefore(button, text);
tabs.parentNode.insertBefore(input, button)

let index = 0;
let game = null;

button.onclick = function FindAndJoin() {
    text.textContent = "";
    let url = window.location.href.toString();
    let placeId = url.substring(url.indexOf("games")+6, url.indexOf("/", url.indexOf("games")+6))
    getData(placeId, parseInt(document.getElementById("rosearchinputbar").value));
}

function getData(placeId, players) {
    let check = false;
    let XHR = new XMLHttpRequest();
    XHR.open("GET", "https://www.roblox.com/games/getgameinstancesjson?placeId=" + placeId + "&startIndex=" + index);
    XHR.send();
    XHR.onreadystatechange = () => {
        if(XHR.readyState === XMLHttpRequest.DONE) {
            let jsonResponse = JSON.parse(XHR.responseText)
            if(jsonResponse.Collection.length === 0) {
                index = 0;
                text.textContent = "None Found";
                return;

            }
            for (let i = 0; i < jsonResponse.Collection.length; i++) {
                if (jsonResponse.Collection[i].CurrentPlayers.length === players) {
                    game = jsonResponse.Collection[i].Guid;
                    check = true;
                }
            }
            index += 10;
            if(!check) {
                getData(placeId, players);
            } else {
                location.href = "Roblox.GameLauncher.joinGameInstance(" + placeId + "," + game + ");";
                index = 0;
            }
        }
    }
}