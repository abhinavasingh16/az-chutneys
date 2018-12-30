// Mailchimp Newsletter
$(document).ready(function() {
    $('#email_submit').ketchup().click(function() {
        if ($(this).ketchup('isValid')) {
            var action = '/mailinglist/'+$('#address').val();
            console.log(action);
            $('#invite button').html('<i class="fa fa-spinner fa-spin" style=" font-size: 18px; top:1px; left:0;"></i>');
            $.ajax({
                url: action,
                type: 'GET',
                data: {
                    email: $('#address').val()
                },
                success: function(data) {
                    console.log("done");
                    setTimeout(function() {
                        $('#email_submit').html('<i class="fa fa-check bounceIn animated" style=" font-size: 20px; top:0; left:0;"></i>');
                    }, 1000)
                },
                error: function() {
                    setTimeout(function() {
                        $('#email_submit button').html('<i class="fa fa-angle-right"></i>');
                        $('#email_submit').addClass('shake animated');
                    }, 1000)
                    setTimeout(function() {
                        $('#email_submit').removeClass('shake animated');
                    }, 2000)
                }
            });
        }
        return false;
    });
});
