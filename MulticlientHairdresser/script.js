(function(){

    let hours = Array.from(document.querySelectorAll('.hour'));
    let ws;
    let occupation = [];

    function changeOccupancy(hourButton){
        hourButton.classList.toggle('hour-occupied');
    }

    function shakeTheButton(hourButton){
        hourButton.classList.add('shake');
        window.setTimeout(() => hourButton.classList.remove('shake'), 1000);
    }

    function getIdClient() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        }
        return s4() + s4() + '-' + s4();
    };

    const ClientId = getIdClient();

    function init(){
        if(ws){
            ws.onerror = ws.onopen = ws.onclose = null;
            ws.close();
        }

        ws = new WebSocket('ws://localhost:6969');
        ws.onopen = () =>{
            console.log("Connection opened");
        }
        ws.onmessage = async ({data}) =>{
            const received = await data.text();
            const info = received.split(" ");
            const number = parseInt(info[0]);
            console.log(`From server: ${info[1]}, from client: ${ClientId}`);
            if(!hours[number].classList.contains("hour-occupied")){
                occupation.push({
                    index: number,
                    id: info[1]
                });
                changeOccupancy(hours[number]);
            }
            else{
                if(occupation.some((element) => element.index === number && element.id === ClientId)){
                    console.log("Wrong");
                }
                else{
                    changeOccupancy(hours[number]);
                    occupation = occupation.filter((element) => element.index !== number);
                }
            }
        }
        ws.onclose = function() {
            ws = null;
        }
    }

    hours.forEach((hour, idx) =>{
        hour.onclick = function(){
            if(!ws){
                console.log("No WebSocket connection");
                return;
            }
            const toSend = String(idx) + " " + String(ClientId);
            ws.send(toSend);            
            if(occupation.some((element) => element.index === idx && element.id === ClientId) || !hours[idx].classList.contains("hour-occupied")){
                if(!hours[idx].classList.contains("hour-occupied")){
                    occupation.push({
                        index: idx,
                        id: ClientId
                    });
                }
                else{
                    occupation = occupation.filter((element) => element.index !== idx);
                }
                changeOccupancy(hour);
            }
            else{
                shakeTheButton(hour);
            }
        }
    })

    init();
})();
