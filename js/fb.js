function saveEvent($dspElem, event){
  if (!currentUser){
    alert("You need to log in");
    return;
  }
  $dspElem.html("Saving event...");
  currentUser.child("events").push(event, function(err){
    if(err )
      $dspElem.html("Saving failed. Try again.");
    else{
      $dspElem.html("Event saved!");
      setTimeout(function(){
        resetState();
      }, 1000);
    }
  });
}
function beginFeed(cb, timeDiff){
  if (!timeDiff) timeDiff = 0;
  if (!currentUser){
    alert("You need to log in");
    return;
  }
  currentUser.child("feedings").push(new Date().getTime()-timeDiff, function(error){
    if(error)
      alert("Cannot connect to server, try again later.");
    else{
        if (cb && typeof cb == "function") cb();
      }
  });
}

