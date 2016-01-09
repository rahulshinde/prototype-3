$(document).ready( function() {
	$("#content").load("about.html");


    $("#about").on("click", function() {
        $('canvas').remove();
        $("#content").load("about.html");
        $('.link-hover').removeClass('active');
        $(this).addClass('active');
        $('.info-text').removeClass('visible');
        $('#about-info').addClass('visible');

        //scroll
        $('body,html').animate({scrollTop: 0 ,}, 0);
    });

    $("#orbit").on("click", function() {
        $('canvas').remove();
        $("#content").load("orbit.html");
        $('.link-hover').removeClass('active');
        $(this).addClass('active');
        $('.info-text').removeClass('visible');
        $('#ex1-info').addClass('visible');

        //scroll
        $('body,html').animate({scrollTop: 0 ,}, 0);
    });

    $("#pov").on("click", function() {
        $('canvas').remove();
        $("#content").load("walkthrough.html");
        $('.link-hover').removeClass('active');
        $(this).addClass('active');
        $('.info-text').removeClass('visible');
        $('#ex2-info').addClass('visible');

        //scroll
        $('body,html').animate({scrollTop: 0 ,}, 0);
    });

    $(".nav-open").on("click", function() {
        $('.nav').slideToggle();
    });

    enquire.register("screen and (max-width: 800px)", {
        setup : function() {
            $(".nav-open").hide();
            $(".nav").hide();
        },    
        match : function() {
            $(".nav-open").show();
            $(".nav").hide();
        },  
        unmatch : function() {
            $(".nav-open").hide();
            $(".nav").show();
        }
    });

});