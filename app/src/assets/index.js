if (!!window.EventSource) {
    /**
     * url pattern is http/https://{domain}:{port}/marais-event-push/sse/{id} 
     * where {id} is dynamic value for specific user, please change it
     */
    // var source = new EventSource('http://localhost:8888/marais-event-push/sse/1'); // :8888 not use nginx
    var source = new EventSource('http://localhost:8081/marais-event-push/sse/2'); // :8081 if use nginx local server
    // var source = new EventSource('https://marais-stage.com/marais-event-push/sse/1'); // stage
  } else {
    console.log("瀏覽器不支援 SSE，使用傳統的 xhr polling :(");
  }

  source.addEventListener('message', function(e) {
    console.log(e.data);
    let data = JSON.parse(e.data);
    let events = document.getElementById("events");
    const paragraph = document.createElement('p');
    paragraph.textContent = data.content.msg;
    events.appendChild(paragraph);
    bc.postMessage(data);
  }, false);

  source.addEventListener('open', function(e) {
    console.log("連線已建立");
  }, false);
  
  source.addEventListener('error', function(e) {
    if (e.readyState == EventSource.CLOSED) {
      console.log("連線已關閉");
    }
  }, false);

  const bc = new BroadcastChannel("test_channel");
  bc.onmessage = (event) => {
    console.log(event);
    let events = document.getElementById("events");
    const paragraph = document.createElement('p');
    paragraph.textContent = event.data.content.msg;
    events.appendChild(paragraph);
  };
