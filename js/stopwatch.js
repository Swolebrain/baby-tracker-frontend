var tickTime, status = "idle";
function updateTime(start, $elem){
  var curTimeMs = getCurTime();
  start = start - curTimeMs;
  tickTime = setInterval(function(){
    var elapsed = new Date().getTime() - start;
    var m = "0"+parseInt(elapsed/60000), 
        s = "0"+parseInt((elapsed%60000)/1000), 
        ms = "000"+(elapsed%1000);
    var timeStr = m.slice(-2)+":"+s.slice(-2)+":"+ms.slice(-3);
    $elem.html(timeStr);
  }, Math.floor(Math.random()*30)+20);
}

$("#playbtn").click(function(){
  if (status === "counting") return;
  status = "counting";
  if (!$("#time-display").html().includes(":")) 
    $("#time-display").html("00:00:000");
  updateTime(new Date().getTime(), $("#time-display"));
});

$("#pausebtn").click(function(){
  clearInterval(tickTime);
  status = "paused";
});

$("#stopbtn").click(function(){
  clearInterval(tickTime);
  status = "idle";
  
});

$("#savebtn").click(function(){
  if (currentUser){
    //here, check when the last feeding started
    currentUser.child("feedings").orderByValue().limitToLast(1).on("value",
    function(snapshot){
      var lastFeed;
      for (var k in snapshot.val()){
        lastFeed = snapshot.val()[k];
        //console.log(lastFeed);
      }
      if ( !lastFeed || new Date().getTime() - lastFeed > 3600000){
        var c = confirm("It has been over an hour since your last feeding, create new feeding?");
        if (c) beginFeed(function(){
          alert("New feeding recorded.");
        }, getCurTime()-3000);
      }
      
      saveEvent($("#stopwatch-feedback"), {duration: getCurTime(), 
                                         name: $("#stopwatch").attr("eventname"), 
                                         time: new Date().getTime()}); 
    });
    
  }
  else{
    alert("Not logged in, can't save.");
  }
});

$("#resetbtn").click(resetState);
  

  
function getCurTime(){
  var curTime = $("#time-display").html().split(":").map(Number);
  var curTimeMs = curTime[0]*60000+curTime[1]*1000+curTime[2];
  return curTimeMs;
}

function resetState(){
  $("#time-display").html("00:00:000");
  $("#stopwatch-feedback").html("&nbsp;");
  $("#opts-feedback").html("&nbsp;");
  $("#stopwatch").fadeOut();
}