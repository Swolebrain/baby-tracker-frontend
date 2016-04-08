$('input[type="submit"]').off("click").on("click", function(){
  var self = $(this);
  if (self.attr("method") === "login"){
    //user clicked on log in
    self.val("logging in...");
    var emailadd= $("#logemail").val();
    ref.authWithPassword({
      "email": emailadd,
      "password": $("#logpassword").val()
    }, function(error, authData) {
      if (error) {
        alert("Login Failed for "+emailadd+"-"+ error);
      } else {
        self.val("Authenticated successfully!");
        //console.log(authData);
        currentUser = ref.child("users").child(authData.uid);
        setTimeout(function(){
          $(".login").fadeOut();
          $("#main-ui").fadeIn();
          fitToHeight();
        }, 350);
      }
    });
  }
  else{
    //user clicked on register
    var $pw = $("#regpassword"), $pw2 = $("#regpassword-confirm");
    if ($pw.val() != $pw2.val()){
      self.val("Passwords do not match!");
      return;
    }
    self.val("submitting registration...");
    ref.createUser({
      email    : $("#regemail").val(),
      password : $pw.val()
    }, function(error, userData) {
      if (error) {
        alert("Error creating user:", error);
      } else {
        self.val("Successfully created user!");
        currentUser = ref.child("users").child(userData.uid);
        setTimeout(function(){
          $(".register").fadeOut();
          $("#main-ui").show();
          fitToHeight();
        }, 350);
      }
    });
    
      
  }
});
/*$('input[type="submit"]').mouseup(function(){
  $(this).css('background', '#1abc9c');
});*/

$('#loginform').click(function(){
  $(".register").hide();
  $('.login').fadeToggle('slow');
});
$('#registerform').click(function(){
  $(".login").hide();
  $('.register').fadeToggle('slow');

});


$(document).mouseup(function (e)
{
    var login = $(".login"), register = $(".register");

    if ( !login.is(e.target) // if the target of the click isn't the container...
        && login.has(e.target).length === 0 && // ... nor a descendant of the container
        !register.is(e.target) && register.has(e.target).length === 0)
    {
      login.hide();
      register.hide();
      $('#loginform, #registerform').removeClass('green');
    }
});



