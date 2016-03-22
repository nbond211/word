$(document).ready(function () {

    $('#search-btn').click(function () {
        $('.words-go-here').empty();
        generateNextSentence($('#search-word').val());
        $('#search-word').val('');
    });

    $('#search-word').keypress(function (e) {
        if (e.which == 13) {
            $('.words-go-here').empty();
            generateNextSentence($('#search-word').val());
            $('#search-word').val('');
            return false;
        }
    });
    
    wordCounter = 0;
});

var wordCounter;

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function writeNextLine(text, title) {
    var words = text.split(" ");
    $('.words-go-here').append('<div class="row sentence"><div class="col-md-10 col-md-offset-1"><p class="text-center"></p></div></div>');
    for (var i = 0; i < words.length; i++) {
        $('p').last().append('<span onClick="updateFromWord(this)" class="underline-on-hover">' + words[i] + '</span> <span>&nbsp</span>');
    }
    $('.sentence').last().append('<div class="col-md-10 col-md-offset-1"><p class="text-center text-title">'+ '- ' + title +'</p></div>');
    wordCounter++;
    $('html, body').animate({
        scrollTop: $(".sentence").last().offset().top
    }, 2000);
}

function generateNextSentence(searchWord) {
    $.ajax({
        type: "POST",
        url: "/search",
        data: JSON.parse('{"text":"' + searchWord + '" }'),
        success: function (data) {
            var wordnik = JSON.parse(data);

            var rand = getRandomInt(0, wordnik.examples.length);

            writeNextLine(wordnik.examples[rand].text, wordnik.examples[rand].title);
        },
        dataType: "text"
    });
}

function updateFromWord(clickedWord) {
    generateNextSentence($(clickedWord).text());
    $(clickedWord).addClass('' + wordCounter);
    $(clickedWord).addClass('underline-always');
    $('.underline-on-hover').prop( "onclick", null );
    $('.underline-on-hover').removeClass('underline-on-hover');
    $(clickedWord).connections({ to: '.' + (wordCounter - 1) });
}