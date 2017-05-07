document.addEventListener("DOMContentLoaded", function(e){
  console.log("dom is fully loaded");


  $.ajax({
    method: "GET",
    url: "api/twitter"
  });

});
