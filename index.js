const path = window.location.pathname;
if (path.endsWith("index.html") || path === "/" || path.endsWith("/")) {
  function updateClock (){
    current = Date.now()
    hour = new Date(Date.now()).getHours();
    minutes = new Date(Date.now()).getMinutes();
    seconds = new Date(Date.now()).getSeconds();
    
    hour = hour.toString().padStart(2, 0);
    minutes = minutes.toString().padStart(2, 0);
    seconds = seconds.toString().padStart(2, 0);
    document.getElementById("time").innerHTML = `${hour}: ${minutes}: ${seconds}`;
  }
  function date(){
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayName = days[new Date().getDay()];
    const date = new Date().getDate();
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const monthName = months[new Date().getMonth()];
    const year = new Date().getFullYear();
    const dateString = `${dayName}, ${date} ${monthName} ${year}`;
    document.getElementById("date").innerHTML = dateString;
    console.log(date);

  }
date();

setInterval(updateClock, 1000);
}



else if (path.endsWith("stopwatch.html")) {
    let elapsetime = 0;
    let display = document.getElementById("time");
    let start = 0;
    let timer = null;
    let count = 0;
    let running = false;
    let paused = false;
    let pauseTime = 0;
    let previous = document.getElementById('previous')

    function startimer() {
        if (!running) {
            if (paused) {
                start = Date.now() - elapsetime;
                paused = false;
            } else {
                start = Date.now();
                elapsetime = 0;
            }
            timer = setInterval(update, 10);
            running = true;
        }
    }

    function pausetimer() {
        if (running) {
            clearInterval(timer);
            elapsetime = Date.now() - start;
            running = false;
            paused = true;
            count++;

        
        previous.innerHTML += `<li> Lap ${count}: ${display.textContent} </li>`;

        }

    }

    function resettimer() {
        clearInterval(timer);
        elapsetime = 0;
        count = 0;
        start = 0;
        running = false;
        paused = false;
        display.textContent = "00:00:00:00";
        previous.innerHTML = "";
    }

    function update() {
        let elapsed = 0;
        if (running) {
            elapsed = Date.now() - start;
        } else {
            elapsed = elapsetime;
        }

        let hours = Math.floor(elapsed / (1000 * 60 * 60));
        let minutes = Math.floor((elapsed / (1000 * 60)) % 60);
        let seconds = Math.floor((elapsed / 1000) % 60);
        let milliseconds = Math.floor((elapsed % 1000) / 10);

        hours = hours.toString().padStart(2, '0');
        minutes = minutes.toString().padStart(2, '0');
        seconds = seconds.toString().padStart(2, '0');
        milliseconds = milliseconds.toString().padStart(2, '0');

        display.textContent = `${hours}:${minutes}:${seconds}:${milliseconds}`;
    }
}   