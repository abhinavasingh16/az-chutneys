/*

Script  : Reservation Form
Version : 1.0
Author  : Surjith S M
URI     : http://themeforest.net/user/surjithctly

*/

var check_time_invariants = function(time)
{
    //Convert String time to time object.
    var hour = Number(time.split(':')[0]);
    var min = Number(time.split(':')[1]);

    //Check if time is within bounds
    var during_lunch_time = hour>=11 && hour<=14 && min <= 30;
    var during_dinner_time = hour>=17 && hour<=22;
    if (during_lunch_time || during_dinner_time)
    {
        return true;
    }
    return false;
};

var check_guest_invariants = function(number_of_guests)
{
    return !isNaN(number_of_guests) && Number(number_of_guests) <= 20 && Number(number_of_guests) >= 1;
};

var check_invariants = function(data)
{
    var time_within_bounds = check_time_invariants(data['time']);
    var acceptable_number_of_guests = check_guest_invariants(data['guests']);
    return time_within_bounds && acceptable_number_of_guests;
};

$(document).ready(function()
{
    $("#js-reservation-btn").click(function(e) 
    {
        $("#js-reservation-btn").attr("disabled", true);
        /* 
        CHECK PAGE FOR REDIRECT (Thank you page)
        ---------------------------------------- */

        var redirect = $('#reservationform').data('redirect');
        var noredirect = false;
        if (redirect == 'none' || redirect == "" || redirect == null) {
            noredirect = true;
        }

        $("#js-reservation-result").html('<p class="help-block">Please wait...</p>');

        /* 
        FETCH SUCCESS / ERROR MSG FROM HTML DATA-ATTR
        --------------------------------------------- */

        var success_msg = $('#js-reservation-result').data('success-msg');
        var error_msg = $('#js-reservation-result').data('error-msg');
        var time_error_msg = $('#js-reservation-result').data('closed-error-msg');
        var dataString = {
                            'date':document.getElementById('datepicker').value.replace('/','-').replace('/','-'),
                            'name':document.getElementById('name').value,
                            'time':document.getElementById('time').value,
                            'email':document.getElementById('email').value,
                            'guests':document.getElementById('guests').value,
                            'phone':document.getElementById('phone').value
                         };
        var follows_invariants = check_invariants(dataString);
        if (!follows_invariants)
        {
            //Send Fail alert
            $('#js-reservation-result').fadeIn('slow').html('<div class="alert alert-danger top-space">' + error_msg + '</div>').delay(3000).fadeOut('slow');
            $("#js-reservation-btn").attr("disabled", false);
        }
        var get_url = "/reservation/"+dataString['date']+"/"+dataString['name']+"/"+dataString['time']+"/"+dataString['email']+"/"+dataString['guests']+"/"+dataString['phone'];
        /* 
         AJAX POST
         --------- */

        $.ajax(
        {
            type: "GET",
            url: get_url,
            cache: false,
            dataType:'json',
            success: function(output) 
            {
                console.log("Made it");
                console.log(output);
                var d = output['d'];
                $(".form-group").removeClass("has-success");
                if (d == 'success') 
                {
                    if (noredirect) 
                    {
                        $('#js-reservation-result').fadeIn('slow').html('<div class="alert alert-success top-space">' + success_msg + '</div>').delay(3000).fadeOut('slow');
                    } else 
                    {
                        window.location.href = redirect;
                    }
                } else 
                {
                    if (d=='time-error')
                    {
                        $('#js-reservation-result').fadeIn('slow').html('<div class="alert alert-success top-space">' + time_error_msg + '</div>').delay(3000).fadeOut('slow');
                    }
                    else
                    {
                        $('#js-reservation-result').fadeIn('slow').html('<div class="alert alert-danger top-space">' + error_msg + '</div>').delay(3000).fadeOut('slow');
                    }
                }
                $("#js-reservation-btn").attr("disabled", false);
            }
        });
        return false;
    });
});
