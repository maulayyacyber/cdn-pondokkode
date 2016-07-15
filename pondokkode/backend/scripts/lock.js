var Lock = function () {
    
    var handleLogoff = function() {
		$('.logoff-form').validate({
	            errorElement: 'span', //default input error message container
	            errorClass: 'help-block', // default input error message class
	            focusInvalid: true, // do not focus the last invalid input
	            rules: {
	                password: {
	                    required: true
	                }
	            },

	            messages: {
	                password: {
	                    required: "Password is required."
	                }
	            },

	            invalidHandler: function (event, validator) { //display error alert on form submit   
	                $('.alert-danger', $('.logoff-form')).show();
	            },

	            highlight: function (element) { // hightlight error inputs
	                $(element)
	                    .closest('.form-group').addClass('has-error'); // set error class to the control group
	            },

	            success: function (label) {
	                label.closest('.form-group').removeClass('has-error');
	                label.remove();
                        $('.alert-danger', $('.logoff-form')).hide();
	            },

	            errorPlacement: function (error, element) {
	                error.insertAfter(element.closest('.input-group'));
                       // jQuery('#user-name').focus();
	            },

	            submitHandler: function (form) {
	                form.submit();
	            }
	        });

	        $('.logoff-form input').keypress(function (e) {
	            if (e.which == 13) {
	                if ($('.logoff-form').validate().form()) {
	                    $('.logoff-form').submit();
	                }
	                return false;
	            }
	        });
	}
    
    return {
        //main function to initiate the module
        init: function () {
            handleLogoff();             
        }

    };

}();