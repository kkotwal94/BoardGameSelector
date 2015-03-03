$(document).ready(function() {
    var games_list = [];
    var decension = false;
    $.ajax({
        url: 'api/games',
        type: "GET",
        data: {
            "key": "value"
        },
        success: function(data) {
            $('jq-games').empty();
            games_list = data;
            for (var i = 0; i < data.length; i++) {
                $('#jq-games').append(
                    "<li class=\"game\" title=\"" +
                    data[i].description +
                    "\" data-index=" + i +
                    "><span class=\"thumb_wrapper\"><img class=\"thumb\" src=\"http:" +
                    data[i].thumbnail +
                    "\"/></span><span class=\"txt\">" +
                    data[i].game + " :: " + data[i].playingtime +
                    " minutes</span></li>");
            };
            $(".txt").show();
            $("#jq-games .game").click(function(ev) {
                var j = parseInt($(ev.currentTarget)
                    .attr('data-index'));
                var game_json = games_list[j];
                $("#overlayID").empty();
                $("#overlayID").append("<h1>");
                $("#overlayID").append("<b>" +
                    game_json.game + "</b>");
                $("#overlayID").append("</h1>");
                $("#overlayID").append("<ul>");
                $("#overlayID").append(
                    "<img src=\"http:" +
                    game_json.thumbnail +
                    "\"/>" + "</ul>");
                $("#overlayID").append("<ul>" +
                    game_json.minplayers + "-" +
                    game_json.maxplayers +
                    "players" + "</ul>");
                $("#overlayID").append("<ul>" +
                    "Rank: " + game_json.rank +
                    "</ul>");
                $("#overlayID").append("<ul>" +
                    " Duration: " + game_json.playingtime +
                    "</ul>");
                $('html, body').animate({
                    scrollTop: 0
                });
                doOverlayOpen();
            });
            var size_li = $("#jq-games li").size();
            var x = 20;
            $('#jq-games li:lt(' + x + ')').show();
            $('.show-more > .btn').click(function() {
                x = (x + 5 <= size_li) ? x + 5 :
                    size_li;
                $('#jq-games li:lt(' + x + ')').show();
                $('.show-less').show();
                if (x >= size_li) {
                    $('.show-more').hide();
                }
            });
            $('.show-less > .btn').click(function() {
                x = (x - 5 < 20) ? 20 : x - 5;
                $('#jq-games li').not(':lt(' + x +
                    ')').hide();
                $('.show-more').show();
                $('.show-less').show();
                if (x < 20) {
                    $('.show-less').hide();
                }
            });
        },
        error: function() {
            $('body').html("Error happened");
        }
    });
    $('#random').click(function() {
        $('#jq-games').empty();
        shuffle(games_list);
        for (var i = 0; i < games_list.length; i++) {
            $('#jq-games').append("<li class=\"game\" title=\"" +
                games_list[i].description +
                "\" data-index=" + i +
                "><span class=\"thumb_wrapper\"><img class=\"thumb\" src=\"http:" +
                games_list[i].thumbnail +
                "\"/></span><span class=\"txt\">" +
                games_list[i].game + " :: " + games_list[i]
                .minplayers + "-" + games_list[i].maxplayers +
                "players :: " + games_list[i].playingtime +
                " minutes</span></li>");
        };
        var x = 20;
        $('#jq-games li:lt(' + x + ')').show();
        $("#jq-games .game").click(function(ev) {
            var j = parseInt($(ev.currentTarget).attr(
                'data-index'));
            var game_json = games_list[j];
            $("#overlayID").empty();
            $("#overlayID").append("<h1>");
            $("#overlayID").append("<b>" + game_json.game +
                "</b>");
            $("#overlayID").append("</h1>");
            $("#overlayID").append("<ul>");
            $("#overlayID").append("<img src=\"http:" +
                game_json.thumbnail + "\"/>" +
                "</ul>");
            $("#overlayID").append("<ul>" + game_json.minplayers +
                "-" + game_json.maxplayers +
                "players" + "</ul>");
            $("#overlayID").append("<ul>" + "Rank: " +
                game_json.rank + "</ul>");
            $("#overlayID").append("<ul>" +
                " Duration: " + game_json.playingtime +
                "</ul>");
            $('html, body').animate({
                scrollTop: 0
            });
            doOverlayOpen();
        });
        $(".txt").show();
    })
    $('#maxplayer').click(function() {
        $('#jq-games').empty();
        $('#jq-games').empty();
        games_list.sort(maxcompare)
        for (var i = 0; i < games_list.length; i++) {
            $('#jq-games').append("<li class=\"game\" title=\"" +
                games_list[i].description +
                "\" data-index=" + i +
                "><span class=\"thumb_wrapper\"><img class=\"thumb\" src=\"http:" +
                games_list[i].thumbnail +
                "\"/></span><span class=\"txt\">" +
                games_list[i].game + " :: " + games_list[i]
                .minplayers + "-" + games_list[i].maxplayers +
                "players :: " + games_list[i].playingtime +
                " minutes</span></li>");
        };
        var x = 20;
        $('#jq-games li:lt(' + x + ')').show();
        $("#jq-games .game").click(function(ev) {
            var j = parseInt($(ev.currentTarget).attr(
                'data-index'));
            var game_json = games_list[j];
            $("#overlayID").empty();
            $("#overlayID").append("<h1>");
            $("#overlayID").append("<b>" + game_json.game +
                "</b>");
            $("#overlayID").append("</h1>");
            $("#overlayID").append("<ul>");
            $("#overlayID").append("<img src=\"http:" +
                game_json.thumbnail + "\"/>" +
                "</ul>");
            $("#overlayID").append("<ul>" + game_json.minplayers +
                "-" + game_json.maxplayers +
                "players" + "</ul>");
            $("#overlayID").append("<ul>" + "Rank: " +
                game_json.rank + "</ul>");
            $("#overlayID").append("<ul>" +
                " Duration: " + game_json.playingtime +
                "</ul>");
            $('html, body').animate({
                scrollTop: 0
            });
            doOverlayOpen();
        });
        $(".txt").show();
    });
    $('#minplayer').click(function() {
        $('#jq-games').empty();
        games_list.sort(mincompare)
        for (var i = 0; i < games_list.length; i++) {
            $('#jq-games').append("<li class=\"game\" title=\"" +
                games_list[i].description +
                "\" data-index=" + i +
                "><span class=\"thumb_wrapper\"><img class=\"thumb\" src=\"http:" +
                games_list[i].thumbnail +
                "\"/></span><span class=\"txt\">" +
                games_list[i].game + " :: " + games_list[i]
                .minplayers + "-" + games_list[i].maxplayers +
                "players :: " + games_list[i].playingtime +
                " minutes</span></li>");
        };
        var x = 20;
        $('#jq-games li:lt(' + x + ')').show();
        $("#jq-games .game").click(function(ev) {
            var j = parseInt($(ev.currentTarget).attr(
                'data-index'));
            var game_json = games_list[j];
            $("#overlayID").empty();
            $("#overlayID").append("<h1>");
            $("#overlayID").append("<b>" + game_json.game +
                "</b>");
            $("#overlayID").append("</h1>");
            $("#overlayID").append("<ul>");
            $("#overlayID").append("<img src=\"http:" +
                game_json.thumbnail + "\"/>" +
                "</ul>");
            $("#overlayID").append("<ul>" + game_json.minplayers +
                "-" + game_json.maxplayers +
                "players" + "</ul>");
            $("#overlayID").append("<ul>" + "Rank: " +
                game_json.rank + "</ul>");
            $("#overlayID").append("<ul>" +
                " Duration: " + game_json.playingtime +
                "</ul>");
            $('html, body').animate({
                scrollTop: 0
            });
            doOverlayOpen();
        });
        $(".txt").show();
    });
    $('#duration').click(function() {
        $('#jq-games').empty();
        $(".game").addClass("line");
        games_list.sort(durationcompare)
        for (var i = 0; i < games_list.length; i++) {
            $('#jq-games').append("<li class=\"game\" title=\"" +
                games_list[i].description +
                "\" data-index=" + i +
                "><span class=\"thumb_wrapper\"><img class=\"thumb\" src=\"http:" +
                games_list[i].thumbnail +
                "\"/></span><span class=\"txt\">" +
                games_list[i].game + " :: " + games_list[i]
                .minplayers + "-" + games_list[i].maxplayers +
                "players :: " + games_list[i].playingtime +
                " minutes</span></li>");
        };
        var x = 20;
        $('#jq-games li:lt(' + x + ')').show();
        $("#jq-games .game").click(function(ev) {
            var j = parseInt($(ev.currentTarget).attr(
                'data-index'));
            var game_json = games_list[j];
            $("#overlayID").empty();
            $("#overlayID").append("<h1>");
            $("#overlayID").append("<b>" + game_json.game +
                "</b>");
            $("#overlayID").append("</h1>");
            $("#overlayID").append("<ul>");
            $("#overlayID").append("<img src=\"http:" +
                game_json.thumbnail + "\"/>" +
                "</ul>");
            $("#overlayID").append("<ul>" + game_json.minplayers +
                "-" + game_json.maxplayers +
                "players" + "</ul>");
            $("#overlayID").append("<ul>" + "Rank: " +
                game_json.rank + "</ul>");
            $("#overlayID").append("<ul>" +
                " Duration: " + game_json.playingtime +
                "</ul>");
            $('html, body').animate({
                scrollTop: 0
            });
            doOverlayOpen();
        });
        $(".txt").show();
    });
    $('#rank').click(function() {
        $('#jq-games').empty();
        games_list.sort(rankcompare)
        for (var i = 0; i < games_list.length; i++) {
            $('#jq-games').append("<li class=\"game\" title=\"" +
                games_list[i].description +
                "\" data-index=" + i +
                "><span class=\"thumb_wrapper\"><img class=\"thumb\" src=\"http:" +
                games_list[i].thumbnail +
                "\"/></span><span class=\"txt\">" +
                games_list[i].game + " :: " + games_list[i]
                .minplayers + "-" + games_list[i].maxplayers +
                "players :: " + games_list[i].playingtime +
                " minutes</span></li>");
            // alert(games_list[i].rank);
        };
        var x = 20;
        $('#jq-games li:lt(' + x + ')').show();
        $("#jq-games .game").click(function(ev) {
            var j = parseInt($(ev.currentTarget).attr(
                'data-index'));
            var game_json = games_list[j];
            $("#overlayID").empty();
            $("#overlayID").append("<h1>");
            $("#overlayID").append("<b>" + game_json.game +
                "</b>");
            $("#overlayID").append("</h1>");
            $("#overlayID").append("<ul>");
            $("#overlayID").append("<img src=\"http:" +
                game_json.thumbnail + "\"/>" +
                "</ul>");
            $("#overlayID").append("<ul>" + game_json.minplayers +
                "-" + game_json.maxplayers +
                "players" + "</ul>");
            $("#overlayID").append("<ul>" + "Rank: " +
                game_json.rank + "</ul>");
            $("#overlayID").append("<ul>" +
                " Duration: " + game_json.playingtime +
                "</ul>");
            $('html, body').animate({
                scrollTop: 0
            });
            doOverlayOpen();
        });
        $(".txt").show();
    });
    $('#sortby').click(function() {
        if (decension === true) {
            decension = false;
            alert("Sort by: Acension");
        } else {
            decension = true;
            alert("Sort by: Decension");
        }
    });

    function rankcompare(a, b) {
        if (decension === false) {
            return a.rank - b.rank;
        } else {
            return b.rank - a.rank;
        }
    }

    function durationcompare(a, b) {
        if (decension === false) {
            return a.playingtime - b.playingtime;
        } else {
            return b.playingtime - a.playingtime;
        }
    }

    function mincompare(a, b) {
        if (decension === false) {
            return a.minplayers - b.minplayers;
        } else {
            return b.minplayers - a.minplayers;
        }
    }

    function maxcompare(a, b) {
            if (decension === false) {
                return b.maxplayers - a.maxplayers;
            } else {
                return a.maxplayers - b.maxplayers;
            }
        }
        // Fisher-Yates (aka Knuth) Shuffle/

    function shuffle(array) {
        var currentIndex = array.length,
            temporaryValue, randomIndex;
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
    var isOpen = false;

    function showOverlayBox() {
        if (isOpen == false) return;
        $('.overlayBox').css({
            display: 'block',
            left: ($(window).width() - $('.overlayBox').width()) /
                2,
            top: ($(window).height() - $('.overlayBox').height()) /
                2 - 20,
            position: 'absolute'
        });
        $('.bgCover').css({
            display: 'block',
            width: $(window).width(),
            height: $(window).height(),
        });
    }

    function doOverlayOpen() {
        isOpen = true;
        showOverlayBox();
        $('.bgCover').css({
            opacity: 0
        }).animate({
            opacity: 0.5,
            backgroundColor: '#000'
        });
        return false;
    }

    function doOverlayClose() {
        isOpen = false;
        $('.overlayBox').css('display', 'none');
        $('.bgCover').animate({
            opacity: 0
        }, null, null, function() {
            $(this).hide();
        });
    }
    $(window).bind('resize', showOverlayBox);
    $('a.launchLink').click(doOverlayOpen);
    $('a.closeLink').click(doOverlayClose);
    $("#searchbox").click(function() {
        $('#jq-games').empty();
        var my_A = games_list;
        var copy = [];
        var searchBox = $("#searchBox").val();
        searchBox = searchBox.toLowerCase();
        for (var i = 0; i < my_A.length; i++) {
            my_A[i].game = my_A[i].game.toLowerCase();
            if (my_A[i].game.indexOf(searchBox) > -1) {
                my_A[i].game = my_A[i].game.substr(0, 1).toUpperCase() +
                    my_A[i].game.substr(1, my_A[i].game.length)
                    .toLowerCase();
                copy.push(my_A[i]);
            };
        }
        for (var j = 0; j < copy.length; j++) {
            //alert(copy[j].game); 
            $('#jq-games').append("<li class=\"game\" title=\"" +
                copy[j].description + "\" data-index=" + j +
                "><span class=\"thumb_wrapper\"><img class=\"thumb\" src=\"http:" +
                copy[j].thumbnail +
                "\"/></span><span class=\"txt\">" + copy[j]
                .game + " :: " + copy[j].minplayers + "-" +
                copy[j].maxplayers + "players :: " + copy[j]
                .playingtime + " minutes</span></li>");
        };
        var x = 20;
        $('#jq-games li:lt(' + x + ')').show();
        $("#jq-games .game").click(function(ev) {
            var j = parseInt($(ev.currentTarget).attr(
                'data-index'));
            var game_json = copy[j];
            $("#overlayID").empty();
            $("#overlayID").append("<h1>");
            $("#overlayID").append("<b>" + game_json.game +
                "</b>");
            $("#overlayID").append("</h1>");
            $("#overlayID").append("<ul>");
            $("#overlayID").append("<img src=\"http:" +
                game_json.thumbnail + "\"/>" +
                "</ul>");
            $("#overlayID").append("<ul>" + game_json.minplayers +
                "-" + game_json.maxplayers +
                "players" + "</ul>");
            $("#overlayID").append("<ul>" + "Rank: " +
                game_json.rank + "</ul>");
            $("#overlayID").append("<ul>" +
                " Duration: " + game_json.playingtime +
                "</ul>");
            $('html, body').animate({
                scrollTop: 0
            });
            doOverlayOpen();
        });
        $(".txt").show();
    });
    $("#overlayID").click(doOverlayClose);
    $(".bgCover").click(doOverlayClose);
    $(".overlayBox").click(doOverlayClose);
});
