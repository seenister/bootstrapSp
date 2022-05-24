$(document).ready(function () {

    $('a[href*=".ru"]').css('border', 'solid 3px red');

    $('h1').click(function () {
        $(this).toggleClass('blue')
    });

    $('h1').mouseenter(function () {
        $(this).toggleClass('blue')
    });

    $('h1').mouseleave(function () {
        $(this).toggleClass('blue')
    });

    $('input').change(function () {
       $('#userName').text(',' + $(this).val())
    });

    $('input').keyup(function () {
        $('#userName').text(',' + $(this).val())
    });

    $('box:first').delay(1000).hide(1000)

});