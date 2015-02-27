$(document).ready(function(){
//I make a games_list from which we will work.
  var games_list = [];

/*This is how (or at least one of several ways) an AJAX request can be made.
  It takes a JSON object which should have url, type, data, success, and error 
  (others are possible some are optional).
  
  When the data comes back the success function should deal with it.
*/
  $.ajax({
    
    url: 'api/games',
    
    type: "GET",
    
    //for a simple GET request this will turn into url parameters api/games?key=value
    data: {"key":"value"},
    
      success: function(data){
      
      
      $('jq-games').empty();
      games_list = data;
      
      for (var i = 0; i < data.length; i++) {
      /* 
      This is where we do "jQuery" templating, we could of course use underscore templating too.
      Note that I'm using "i" as the index for the current game, I'm using "data-index" to store that i and 
      to reference it in "games_list" later when specific data is needed.
      */
          $('#jq-games').append("<li class=\"game\" title=\""+data[i].description+
          "\" data-index="+i+
          "><span class=\"thumb_wrapper\"><img class=\"thumb\" src=\"http:"
          +data[i].thumbnail+"\"/></span><span class=\"txt\">"+ data[i].rank+ " :: "+data[i].playingtime 
          +" minutes</span></li>");
      };
      
      /*
      So this next snippet has the heart of how to use jQuery for specific item 
      issues, and you can maybe begin to imagine how difficult it would be to now 
      delete a game from the list.
      */
      
      $("#jq-games .game").click(function(ev){
        //ev.currentTarget will be the element that was clicked.
        //data-index will have the "i" I left there from the above function
        var j = parseInt($(ev.currentTarget).attr('data-index'));
        var game_json = games_list[j];
        alert("Description" + "::" + game_json.description);
      });
      
     
  
      
      
    // ===================================== 
    var size_li = $("#jq-games li").size();
    var x=20;
//  prompt(size_li);
     $('#jq-games li:lt('+x+')').show();
  
  
   $('.show-more > .btn').click(function () {
        x= (x+5 <= size_li) ? x+5 : size_li;
        $('#jq-games li:lt('+x+')').show();
         $('.show-less').show();
        if(x >= size_li){
            $('.show-more').hide();
        }
        //alert(x);
    });
    $('.show-less > .btn').click(function () {
        x=(x-5<20) ? 20 : x-5;
        $('#jq-games li').not(':lt('+x+')').hide();
        $('.show-more').show();
         $('.show-less').show();
        if(x < 20){
            $('.show-less').hide();
        }
        //alert(x);
    });
  

   
     
  
    
  
    }, 
    
    
    error: function(){
      $('body').html("Error happened");
    }
    
  });
  
 
  
  
         
  
  

  $("#gridmode").click(function(){
    $(".txt").hide();
    $(".game").removeClass("line");
  });
  
  $("#listmode").click(function(){
      $(".txt").show();
     
      //$(".game").addClass("line");
  });
  
   
   $('#random').click(function() {
      $('#jq-games').empty();
      
      shuffle(games_list);
      for (var i = 0; i < games_list.length; i++) {
      /* 
      This is where we do "jQuery" templating, we could of course use underscore templating too.
      Note that I'm using "i" as the index for the current game, I'm using "data-index" to store that i and 
      to reference it in "games_list" later when specific data is needed.
      */
            $('#jq-games').append("<li class=\"game\" title=\""+games_list[i].description+
          "\" data-index="+i+
          "><span class=\"thumb_wrapper\"><img class=\"thumb\" src=\"http:"
          +games_list[i].thumbnail+"\"/></span><span class=\"txt\">"+games_list[i].game+ " :: " + games_list[i].minplayers+ "-" +games_list[i].maxplayers+"players :: "+games_list[i].playingtime 
          +" minutes</span></li>");
         
          //alert(games_list[i].game);
       
      };
       var x = 20;
        $('#jq-games li:lt('+x+')').show();
        
          $("#jq-games .game").click(function(ev){
        //ev.currentTarget will be the element that was clicked.
        //data-index will have the "i" I left there from the above function
        var j = parseInt($(ev.currentTarget).attr('data-index'));
        var game_json = games_list[j];
        //alert(game_json.game + " :: "+game_json.playingtime + " minutes");
      });
       $(".txt").show();
   })
   
   
    $('#maxplayer').click(function() {
      $('#jq-games').empty();
       $('#jq-games').empty();
      
      games_list.sort(maxcompare)
      for (var i = 0; i < games_list.length; i++) {
      /* 
      This is where we do "jQuery" templating, we could of course use underscore templating too.
      Note that I'm using "i" as the index for the current game, I'm using "data-index" to store that i and 
      to reference it in "games_list" later when specific data is needed.
      */
         
          $('#jq-games').append("<li class=\"game\" title=\""+games_list[i].description+
          "\" data-index="+i+
          "><span class=\"thumb_wrapper\"><img class=\"thumb\" src=\"http:"
          +games_list[i].thumbnail+"\"/></span><span class=\"txt\">"+games_list[i].game+ " :: " + games_list[i].minplayers+ "-" +games_list[i].maxplayers+"players :: "+games_list[i].playingtime 
          +" minutes</span></li>");
         
         //alert(games_list[i].maxplayers);
        
      };
       var x = 20;
        $('#jq-games li:lt('+x+')').show();
         $("#jq-games .game").click(function(ev){
        //ev.currentTarget will be the element that was clicked.
        //data-index will have the "i" I left there from the above function
        var j = parseInt($(ev.currentTarget).attr('data-index'));
        var game_json = games_list[j];
        //alert(game_json.game + " :: "+game_json.playingtime + " minutes");
      });
       $(".txt").show();
    });
    
    
    $('#minplayer').click(function() {
      $('#jq-games').empty();
      
      games_list.sort(mincompare)
      for (var i = 0; i < games_list.length; i++) {
      /* 
      This is where we do "jQuery" templating, we could of course use underscore templating too.
      Note that I'm using "i" as the index for the current game, I'm using "data-index" to store that i and 
      to reference it in "games_list" later when specific data is needed.
      */
         
           $('#jq-games').append("<li class=\"game\" title=\""+games_list[i].description+
          "\" data-index="+i+
          "><span class=\"thumb_wrapper\"><img class=\"thumb\" src=\"http:"
          +games_list[i].thumbnail+"\"/></span><span class=\"txt\">"+games_list[i].game+ " :: " + games_list[i].minplayers+ "-" +games_list[i].maxplayers+"players :: "+games_list[i].playingtime 
          +" minutes</span></li>");
         
         //alert(games_list[i].minplayers);
      
      };
       var x = 20;
        $('#jq-games li:lt('+x+')').show();
        $("#jq-games .game").click(function(ev){
        //ev.currentTarget will be the element that was clicked.
        //data-index will have the "i" I left there from the above function
        var j = parseInt($(ev.currentTarget).attr('data-index'));
        var game_json = games_list[j];
        //alert(game_json.game + " :: "+game_json.playingtime + " minutes");
      });
       $(".txt").show();
    });
    
    $('#duration').click(function() {
      $('#jq-games').empty();
 $(".game").addClass("line");
      games_list.sort(durationcompare)
      for (var i = 0; i < games_list.length; i++) {
      /* 
      This is where we do "jQuery" templating, we could of course use underscore templating too.
      Note that I'm using "i" as the index for the current game, I'm using "data-index" to store that i and 
      to reference it in "games_list" later when specific data is needed.
      */
         
           $('#jq-games').append("<li class=\"game\" title=\""+games_list[i].description+
          "\" data-index="+i+
          "><span class=\"thumb_wrapper\"><img class=\"thumb\" src=\"http:"
          +games_list[i].thumbnail+"\"/></span><span class=\"txt\">"+games_list[i].game+ " :: " + games_list[i].rank+ "-" +games_list[i].maxplayers+"players :: "+games_list[i].playingtime 
          +" minutes</span></li>");
         
         //alert(games_list[i].duration);
          
      };
      
      //$(".txt").show();
         var x = 20;
        $('#jq-games li:lt('+x+')').show();
       $("#jq-games .game").click(function(ev){
        //ev.currentTarget will be the element that was clicked.
        //data-index will have the "i" I left there from the above function
        var j = parseInt($(ev.currentTarget).attr('data-index'));
        var game_json = games_list[j];
        //alert(game_json.game + " :: "+game_json.playingtime + " minutes");
      });
       $(".txt").show();
    });
    
    $('#rank').click(function() {
     $('#jq-games').empty();
      
      games_list.sort(rankcompare)
      for (var i = 0; i < games_list.length; i++) {
      /* 
      This is where we do "jQuery" templating, we could of course use underscore templating too.
      Note that I'm using "i" as the index for the current game, I'm using "data-index" to store that i and 
      to reference it in "games_list" later when specific data is needed.
      */
         
          $('#jq-games').append("<li class=\"game\" title=\""+games_list[i].description+
          "\" data-index="+i+
          "><span class=\"thumb_wrapper\"><img class=\"thumb\" src=\"http:"
          +games_list[i].thumbnail+"\"/></span><span class=\"txt\">"+games_list[i].game+ " :: " + games_list[i].minplayers+ "-" +games_list[i].maxplayers+"players :: "+games_list[i].playingtime 
          +" minutes</span></li>");
         
        // alert(games_list[i].rank);
          
      };
        var x = 20;
        $('#jq-games li:lt('+x+')').show();
      
       $("#jq-games .game").click(function(ev){
        //ev.currentTarget will be the element that was clicked.
        //data-index will have the "i" I left there from the above function
        var j = parseInt($(ev.currentTarget).attr('data-index'));
        var game_json = games_list[j];
        //alert(game_json.game + " :: "+game_json.playingtime + " minutes");
      });
       $(".txt").show();
      
    });
    
    
    
    $('#sortby').click(function() {
       alert("sup");
    });
     
  
  function rankcompare(a, b) {
  return a.rank - b.rank;
  }
  
  function durationcompare(a, b) {
  return a.playingtime - b.playingtime;
  }
  
   function mincompare(a, b) {
  return a.minplayers - b.minplayers;
  }
   function maxcompare(a, b) {
  return a.maxplayers - b.maxplayers;
  }
  
  // Fisher-Yates (aka Knuth) Shuffle/
  function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
    

});


    
    
