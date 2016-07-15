var FormValidation = function () {
 var base_url = window.location.origin+"/authorize/authorize/";

 var handlePasswordStrengthChecker = function () {
     var initialized = false;
     var input = $("#pass_user");

     input.keydown(function () {
         if (initialized === false) {
             // set base options
             input.pwstrength({
                 raisePower: 1.4,
                 minChar: 6,
                 verdicts: ["Lemah", "Normal", "Sedang", "Kuat", "Sangat Kuat"],
                 scores: [17, 26, 40, 50, 60]
             });

             // add your own rule to calculate the password strength
             input.pwstrength("addRule", "demoRule", function (options, word, score) {
                 return word.match(/[a-z].[0-9]/) && score;
             }, 10, true);

             // set as initialized
             initialized = true;
         }
     });
 }

    var handleFormTestimoni = function() {
        // for more info visit the official plugin documentation:
        // http://docs.jquery.com/Plugins/Validation

            var formuser = $('#form_testimoni');
            var error3 = $('.alert-danger', formuser);

            //IMPORTANT: update CKEDITOR textarea with actual content before submit


            formuser.validate({
                errorElement: 'span', //default input error message container
                errorClass: 'help-block', // default input error message class
                focusInvalid: true, // do not focus the last invalid input
                ignore: "",
                rules: {
                    email: {
                        required: true,
                        email : true
                    },
                    subject: {
                        required : true
                    },
                    isi: {
                        required: true
                    }
                },

                messages: { // custom messages for radio buttons and checkboxes
                    email: {
                        required: "Email is required.",
                        email: "Email address is not correct."
                    },
                    subject: {
                        required: "Subject is required."
                    },
                    isi: {
                        required: "Message is required.",
                    }
                },

                errorPlacement: function (error, element) { // render error placement for each input type
                    if (element.parent(".input-group").size() > 0) {
                        error.insertAfter(element.parent(".input-group"));
                    } else if (element.attr("data-error-container")) {
                        error.appendTo(element.attr("data-error-container"));
                    } else if (element.parents('.radio-list').size() > 0) {
                        error.appendTo(element.parents('.radio-list').attr("data-error-container"));
                    } else if (element.parents('.radio-inline').size() > 0) {
                        error.appendTo(element.parents('.radio-inline').attr("data-error-container"));
                    } else if (element.parents('.checkbox-list').size() > 0) {
                        error.appendTo(element.parents('.checkbox-list').attr("data-error-container"));
                    } else if (element.parents('.checkbox-inline').size() > 0) {
                        error.appendTo(element.parents('.checkbox-inline').attr("data-error-container"));
                    } else {
                        error.insertAfter(element); // for other inputs, just perform default behavior
                    }
                },

                invalidHandler: function (event, validator) { //display error alert on form submit
                    error3.show();
                    App.scrollTo(error3, -200);
                },

                highlight: function (element) { // hightlight error inputs
                   $(element)
                        .closest('.form-group').addClass('has-error'); // set error class to the control group
                },

                unhighlight: function (element) { // revert the change done by hightlight
                    $(element)
                        .closest('.form-group').removeClass('has-error'); // set error class to the control group
                },

                success: function (label) {
                    label
                        .closest('.form-group').removeClass('has-error'); // set success class to the control group
                },

                submitHandler: function (form) {
                    form.submit();
                    error3.hide();
                }
            });

            $('#form_testimoni input').keypress(function (e) {
                if (e.which == 13) {
                    if ($('#form_testimoni').validate().form()) {
                        $('#form_testimoni').submit();
                    }
                    return false;
                }
        });

             //apply validation on select2 dropdown value change, this only needed for chosen dropdown integration.
            $('.select2me', formuser).change(function () {
                formuser.validate().element($(this)); //revalidate the chosen dropdown value and show error or success message for the input
            });
    }

    var handleFormUser = function() {
        // for more info visit the official plugin documentation:
        // http://docs.jquery.com/Plugins/Validation

            var formuser = $('#form_user');
            var error3 = $('.alert-danger', formuser);

            //IMPORTANT: update CKEDITOR textarea with actual content before submit


            formuser.validate({
                errorElement: 'span', //default input error message container
                errorClass: 'help-block', // default input error message class
                focusInvalid: true, // do not focus the last invalid input
                ignore: "",
                rules: {
                    nama_user: {
                        minlength: 4,
                        required: true
                    },
                    foto_user: {
                        extension: "jpg|jpeg|png"
                    },
                    email_user: {
                        email: true,
                        required: true,
                        "remote":{
                            url: base_url+'master/user/cek_email',
                            type: "post",
                            data:
                                {
                                    email: function()
                                    {
                                        return $('#form_user :input[name="email_user"]').val();
                                    },
                                    id: function()
                                    {
                                        return $('#form_user :input[name="id"]').val();
                                    }
                                }
                        }
                    },
                    user_name: {
                        minlength: 4,
                        required: true,
                        "remote":{
                            url: base_url+'master/user/cek_username',
                            type: "post",
                            data:
                                {
                                    username: function()
                                    {
                                        return $('#form_user :input[name="user_name"]').val();
                                    },
                                    id: function()
                                    {
                                        return $('#form_user :input[name="id"]').val();
                                    }
                                }
                        }
                    },
					website: {
						required: true
					},
					about: {
						required: true
					},
                    pass_user: {
                        minlength: 6,
                        required: true
                    },
                    re_pass_user: {
	                    equalTo: "#pass_user"
	            }
                },

                messages: { // custom messages for radio buttons and checkboxes
                    nama_user: {
                        minlength: "Nama minimum 4 character.",
                        required: "Nama is required."
                    },
                    foto_user: {
                        extension: "The filetype is not allowed."
                    },
                    email_user: {
                        email: "Email address is not correct",
                        required: "Email is required.",
                        remote: jQuery.validator.format("Email {0} has been registered.")
                    },
                    user_name: {
                        minlength: "Username minimum 4 character.",
                        required: "Username is required.",
                        remote: jQuery.validator.format("Username {0} has been registered.")
                    },
					website: {
						required: "Website is required."
					},
					about: {
						required: "About is required."
					},
                    pass_user: {
                        minlength: "Password minimum 6 character.",
                        required: "Password is required."
                    },
                    re_pass_user:{
                      equalTo: "Password confirmation is not correct."
                    }
                },

                errorPlacement: function (error, element) { // render error placement for each input type
                    if (element.parent(".input-group").size() > 0) {
                        error.insertAfter(element.parent(".input-group"));
                    } else if (element.attr("data-error-container")) {
                        error.appendTo(element.attr("data-error-container"));
                    } else if (element.parents('.radio-list').size() > 0) {
                        error.appendTo(element.parents('.radio-list').attr("data-error-container"));
                    } else if (element.parents('.radio-inline').size() > 0) {
                        error.appendTo(element.parents('.radio-inline').attr("data-error-container"));
                    } else if (element.parents('.checkbox-list').size() > 0) {
                        error.appendTo(element.parents('.checkbox-list').attr("data-error-container"));
                    } else if (element.parents('.checkbox-inline').size() > 0) {
                        error.appendTo(element.parents('.checkbox-inline').attr("data-error-container"));
                    } else {
                        error.insertAfter(element); // for other inputs, just perform default behavior
                    }
                },

                invalidHandler: function (event, validator) { //display error alert on form submit
                    error3.show();
                    App.scrollTo(error3, -200);
                },

                highlight: function (element) { // hightlight error inputs
                   $(element)
                        .closest('.form-group').addClass('has-error'); // set error class to the control group
                },

                unhighlight: function (element) { // revert the change done by hightlight
                    $(element)
                        .closest('.form-group').removeClass('has-error'); // set error class to the control group
                },

                success: function (label) {
                    label
                        .closest('.form-group').removeClass('has-error'); // set success class to the control group
                },

                submitHandler: function (form) {
                    form.submit();
                    error3.hide();
                }
            });

            $('#form_user input').keypress(function (e) {
	            if (e.which == 13) {
	                if ($('#form_user').validate().form()) {
	                    $('#form_user').submit();
	                }
	                return false;
	            }
	    });

             //apply validation on select2 dropdown value change, this only needed for chosen dropdown integration.
            $('.select2me', formuser).change(function () {
                formuser.validate().element($(this)); //revalidate the chosen dropdown value and show error or success message for the input
            });
    }

    var handleFormUserEdit = function() {
        // for more info visit the official plugin documentation:
        // http://docs.jquery.com/Plugins/Validation

            var formuser = $('#form_user_edit');
            var error3 = $('.alert-danger', formuser);

            //IMPORTANT: update CKEDITOR textarea with actual content before submit


            formuser.validate({
                errorElement: 'span', //default input error message container
                errorClass: 'help-block', // default input error message class
                focusInvalid: true, // do not focus the last invalid input
                ignore: "",
                rules: {
                    nama_user: {
                        minlength: 4,
                        required: true
                    },
                    foto_user: {
                        extension: "jpg|jpeg|png"
                    },
                    email_user: {
                        email: true,
                        required: true,
                        "remote":{
                            url: base_url+'master/user/cek_email',
                            type: "post",
                            data:
                                {
                                    email: function()
                                    {
                                        return $('#form_user_edit :input[name="email_user"]').val();
                                    },
                                    id: function()
                                    {
                                        return $('#form_user_edit :input[name="id"]').val();
                                    }
                                }
                        }
                    },
                    user_name: {
                        minlength: 4,
                        required: true,
                        "remote":{
                            url: base_url+'master/user/cek_username',
                            type: "post",
                            data:
                                {
                                    username: function()
                                    {
                                        return $('#form_user_edit :input[name="user_name"]').val();
                                    },
                                    id: function()
                                    {
                                        return $('#form_user_edit :input[name="id"]').val();
                                    }
                                }
                        }
                    },
					website: {
						required: true
					},
					about: {
						required: true
					},					
                    pass_user: {
                        minlength: 6
                    },
                    re_pass_user: {
	                    equalTo: "#pass_user"
	            }
                },

                messages: { // custom messages for radio buttons and checkboxes
                    nama_user: {
                        minlength: "Nama minimum 4 character.",
                        required: "Nama is required."
                    },
                    foto_user: {
                        extension: "The filetype is not allowed."
                    },
                    email_user: {
                        email: "Email address is not correct",
                        required: "Email is required.",
                        remote: jQuery.validator.format("Email {0} has been registered.")
                    },
                    user_name: {
                        minlength: "Username minimum 4 character.",
                        required: "Username is required.",
                        remote: jQuery.validator.format("Username {0} has been registered.")
                    },
					website: {
						required: "Website is required."
					},
					about: {
						required: "About is required."
					},					
                    pass_user: {
                        minlength: "Password minimum 6 character."
                    }
                },

                errorPlacement: function (error, element) { // render error placement for each input type
                    if (element.parent(".input-group").size() > 0) {
                        error.insertAfter(element.parent(".input-group"));
                    } else if (element.attr("data-error-container")) {
                        error.appendTo(element.attr("data-error-container"));
                    } else if (element.parents('.radio-list').size() > 0) {
                        error.appendTo(element.parents('.radio-list').attr("data-error-container"));
                    } else if (element.parents('.radio-inline').size() > 0) {
                        error.appendTo(element.parents('.radio-inline').attr("data-error-container"));
                    } else if (element.parents('.checkbox-list').size() > 0) {
                        error.appendTo(element.parents('.checkbox-list').attr("data-error-container"));
                    } else if (element.parents('.checkbox-inline').size() > 0) {
                        error.appendTo(element.parents('.checkbox-inline').attr("data-error-container"));
                    } else {
                        error.insertAfter(element); // for other inputs, just perform default behavior
                    }
                },

                invalidHandler: function (event, validator) { //display error alert on form submit
                    error3.show();
                    App.scrollTo(error3, -200);
                },

                highlight: function (element) { // hightlight error inputs
                   $(element)
                        .closest('.form-group').addClass('has-error'); // set error class to the control group
                },

                unhighlight: function (element) { // revert the change done by hightlight
                    $(element)
                        .closest('.form-group').removeClass('has-error'); // set error class to the control group
                },

                success: function (label) {
                    label
                        .closest('.form-group').removeClass('has-error'); // set success class to the control group
                },

                submitHandler: function (form) {
                    form.submit();
                    error3.hide();
                }
            });

            $('#form_user_edit input').keypress(function (e) {
	            if (e.which == 13) {
	                if ($('#form_user_edit').validate().form()) {
	                    $('#form_user_edit').submit();
	                }
	                return false;
	            }
	    });

             //apply validation on select2 dropdown value change, this only needed for chosen dropdown integration.
            $('.select2me', formuser).change(function () {
                formuser.validate().element($(this)); //revalidate the chosen dropdown value and show error or success message for the input
            });
    }

    var handleFormProject = function() {
        // for more info visit the official plugin documentation:
        // http://docs.jquery.com/Plugins/Validation

            var formuser = $('#form_project');
            var error3 = $('.alert-danger', formuser);

            //IMPORTANT: update CKEDITOR textarea with actual content before submit


            formuser.validate({
                errorElement: 'span', //default input error message container
                errorClass: 'help-block', // default input error message class
                focusInvalid: true, // do not focus the last invalid input
                ignore: "",
                rules: {
                    judul: {
                        required: true
                    },
                    category: {
                        required: true
                    },
                    button_style: {
                        required: true
                    },
                    image_project: {
                        extension: "jpg|jpeg|png"
                    },
                    domain: {
                        required: true
                    },
                    descriptions: {
                        required : true
                    },
                    developers:{
                        required: true
                    }
                },

                messages: { // custom messages for radio buttons and checkboxes
                    judul: {
                        required: "Judul is required."
                    },
                    category: {
                        required: "Category is required."
                    },
                    button_style: {
                        required: "Button style is required."
                    },                    
                    image_developers: {
                        extension: "The filetype is not allowed."
                    },
                    domain: {
                        required: "Domain is required."
                    },
                    descriptions: {
                        required: "Descriptions is required."
                    },
                    developers: {
                        required: "Developers is required."
                    }
                },

                errorPlacement: function (error, element) { // render error placement for each input type
                    if (element.parent(".input-group").size() > 0) {
                        error.insertAfter(element.parent(".input-group"));
                    } else if (element.attr("data-error-container")) {
                        error.appendTo(element.attr("data-error-container"));
                    } else if (element.parents('.radio-list').size() > 0) {
                        error.appendTo(element.parents('.radio-list').attr("data-error-container"));
                    } else if (element.parents('.radio-inline').size() > 0) {
                        error.appendTo(element.parents('.radio-inline').attr("data-error-container"));
                    } else if (element.parents('.checkbox-list').size() > 0) {
                        error.appendTo(element.parents('.checkbox-list').attr("data-error-container"));
                    } else if (element.parents('.checkbox-inline').size() > 0) {
                        error.appendTo(element.parents('.checkbox-inline').attr("data-error-container"));
                    } else {
                        error.insertAfter(element); // for other inputs, just perform default behavior
                    }
                },

                invalidHandler: function (event, validator) { //display error alert on form submit
                    error3.show();
                    App.scrollTo(error3, -200);
                },

                highlight: function (element) { // hightlight error inputs
                   $(element)
                        .closest('.form-group').addClass('has-error'); // set error class to the control group
                },

                unhighlight: function (element) { // revert the change done by hightlight
                    $(element)
                        .closest('.form-group').removeClass('has-error'); // set error class to the control group
                },

                success: function (label) {
                    label
                        .closest('.form-group').removeClass('has-error'); // set success class to the control group
                },

                submitHandler: function (form) {
                    form.submit();
                    error3.hide();
                }
            });

            $('#form_project input').keypress(function (e) {
                if (e.which == 13) {
                    if ($('#form_project').validate().form()) {
                        $('#form_project').submit();
                    }
                    return false;
                }
        });

             //apply validation on select2 dropdown value change, this only needed for chosen dropdown integration.
            $('.select2me', formuser).change(function () {
                formuser.validate().element($(this)); //revalidate the chosen dropdown value and show error or success message for the input
            });
    }

    var handleFormProjectEdit = function() {
        // for more info visit the official plugin documentation:
        // http://docs.jquery.com/Plugins/Validation

            var formuser = $('#form_project_edit');
            var error3 = $('.alert-danger', formuser);

            //IMPORTANT: update CKEDITOR textarea with actual content before submit


            formuser.validate({
                errorElement: 'span', //default input error message container
                errorClass: 'help-block', // default input error message class
                focusInvalid: true, // do not focus the last invalid input
                ignore: "",
                rules: {
                    judul: {
                        required: true
                    },
                    category: {
                        required: true
                    },
                    button_style: {
                        required: true
                    },
                    image_project: {
                        extension: "jpg|jpeg|png"
                    },
                    domain: {
                        required: true
                    },
                    descriptions: {
                        required : true
                    },
                    developers: {
                        required: true
                    }
                },

                messages: { // custom messages for radio buttons and checkboxes
                    judul: {
                        required: "Judul is required."
                    },
                    category: {
                        required: "Category is required."
                    },
                    button_style: {
                        required: "Button style is required."
                    },
                    image_developers: {
                        extension: "The filetype is not allowed."
                    },
                    domain: {
                        required: "Domain is required."
                    },
                    descriptions: {
                        required: "Descriptions is required."
                    },
                    developers: {
                        required: "Developers is required."
                    }
                },

                errorPlacement: function (error, element) { // render error placement for each input type
                    if (element.parent(".input-group").size() > 0) {
                        error.insertAfter(element.parent(".input-group"));
                    } else if (element.attr("data-error-container")) {
                        error.appendTo(element.attr("data-error-container"));
                    } else if (element.parents('.radio-list').size() > 0) {
                        error.appendTo(element.parents('.radio-list').attr("data-error-container"));
                    } else if (element.parents('.radio-inline').size() > 0) {
                        error.appendTo(element.parents('.radio-inline').attr("data-error-container"));
                    } else if (element.parents('.checkbox-list').size() > 0) {
                        error.appendTo(element.parents('.checkbox-list').attr("data-error-container"));
                    } else if (element.parents('.checkbox-inline').size() > 0) {
                        error.appendTo(element.parents('.checkbox-inline').attr("data-error-container"));
                    } else {
                        error.insertAfter(element); // for other inputs, just perform default behavior
                    }
                },

                invalidHandler: function (event, validator) { //display error alert on form submit
                    error3.show();
                    App.scrollTo(error3, -200);
                },

                highlight: function (element) { // hightlight error inputs
                   $(element)
                        .closest('.form-group').addClass('has-error'); // set error class to the control group
                },

                unhighlight: function (element) { // revert the change done by hightlight
                    $(element)
                        .closest('.form-group').removeClass('has-error'); // set error class to the control group
                },

                success: function (label) {
                    label
                        .closest('.form-group').removeClass('has-error'); // set success class to the control group
                },

                submitHandler: function (form) {
                    form.submit();
                    error3.hide();
                }
            });

            $('#form_project_edit input').keypress(function (e) {
                if (e.which == 13) {
                    if ($('#form_project_edit').validate().form()) {
                        $('#form_project_edit').submit();
                    }
                    return false;
                }
        });

             //apply validation on select2 dropdown value change, this only needed for chosen dropdown integration.
            $('.select2me', formuser).change(function () {
                formuser.validate().element($(this)); //revalidate the chosen dropdown value and show error or success message for the input
            });
    }

    var handleFormDevelopers = function() {
        // for more info visit the official plugin documentation:
        // http://docs.jquery.com/Plugins/Validation

            var formuser = $('#form_developers');
            var error3 = $('.alert-danger', formuser);

            //IMPORTANT: update CKEDITOR textarea with actual content before submit


            formuser.validate({
                errorElement: 'span', //default input error message container
                errorClass: 'help-block', // default input error message class
                focusInvalid: true, // do not focus the last invalid input
                ignore: "",
                rules: {
                    nama: {
                        required: true
                    },
                    username: {
                        minlength: 4,
                        required: true,
                        "remote":{
                            url: base_url+'master/developers/cek_username',
                            type: "post",
                            data:
                                {
                                    username: function()
                                    {
                                        return $('#form_developers :input[name="username"]').val();
                                    },
                                    id: function()
                                    {
                                        return $('#form_developers :input[name="id"]').val();
                                    }
                                }
                        }
                    },
                    password: {
                        minlength: 6,
                        required: true
                    },
                    re_pass_user: {
	                    equalTo: "#password"
					},					
                    image_developers: {
                        extension: "jpg|jpeg|png"
                    },
                    job: {
                        required: true
                    },
                    descriptions: {
                        required : true
                    }
                },

                messages: { // custom messages for radio buttons and checkboxes
                    nama: {
                        required: "Nama is required."
                    },
                    username: {
                        minlength: "Username minimum 4 character.",
                        required: "Username is required.",
                        remote: jQuery.validator.format("Username {0} has been registered.")
                    },
                    password: {
                        minlength: "Password minimum 6 character.",
						required: "Password is required."
                    },					
                    image_developers: {
                        extension: "The filetype is not allowed."
                    },
                    job: {
                        required: "Jobs is required."
                    },
                    descriptions: {
                        required: "Descriptions is required."
                    }
                },

                errorPlacement: function (error, element) { // render error placement for each input type
                    if (element.parent(".input-group").size() > 0) {
                        error.insertAfter(element.parent(".input-group"));
                    } else if (element.attr("data-error-container")) {
                        error.appendTo(element.attr("data-error-container"));
                    } else if (element.parents('.radio-list').size() > 0) {
                        error.appendTo(element.parents('.radio-list').attr("data-error-container"));
                    } else if (element.parents('.radio-inline').size() > 0) {
                        error.appendTo(element.parents('.radio-inline').attr("data-error-container"));
                    } else if (element.parents('.checkbox-list').size() > 0) {
                        error.appendTo(element.parents('.checkbox-list').attr("data-error-container"));
                    } else if (element.parents('.checkbox-inline').size() > 0) {
                        error.appendTo(element.parents('.checkbox-inline').attr("data-error-container"));
                    } else {
                        error.insertAfter(element); // for other inputs, just perform default behavior
                    }
                },

                invalidHandler: function (event, validator) { //display error alert on form submit
                    error3.show();
                    App.scrollTo(error3, -200);
                },

                highlight: function (element) { // hightlight error inputs
                   $(element)
                        .closest('.form-group').addClass('has-error'); // set error class to the control group
                },

                unhighlight: function (element) { // revert the change done by hightlight
                    $(element)
                        .closest('.form-group').removeClass('has-error'); // set error class to the control group
                },

                success: function (label) {
                    label
                        .closest('.form-group').removeClass('has-error'); // set success class to the control group
                },

                submitHandler: function (form) {
                    form.submit();
                    error3.hide();
                }
            });

            $('#form_developers input').keypress(function (e) {
                if (e.which == 13) {
                    if ($('#form_developers').validate().form()) {
                        $('#form_developers').submit();
                    }
                    return false;
                }
        });

             //apply validation on select2 dropdown value change, this only needed for chosen dropdown integration.
            $('.select2me', formuser).change(function () {
                formuser.validate().element($(this)); //revalidate the chosen dropdown value and show error or success message for the input
            });
    }

    var handleFormDevelopersEdit = function() {
        // for more info visit the official plugin documentation:
        // http://docs.jquery.com/Plugins/Validation

            var formuser = $('#form_developers_edit');
            var error3 = $('.alert-danger', formuser);

            //IMPORTANT: update CKEDITOR textarea with actual content before submit

            formuser.validate({
                errorElement: 'span', //default input error message container
                errorClass: 'help-block', // default input error message class
                focusInvalid: true, // do not focus the last invalid input
                ignore: "",
                rules: {
                    nama: {
                        required: true
                    },
                    username: {
                        minlength: 4,
                        required: true,
                        "remote":{
                            url: base_url+'master/developers/cek_username',
                            type: "post",
                            data:
                                {
                                    username: function()
                                    {
                                        return $('#form_developers_edit :input[name="username"]').val();
                                    },
                                    id: function()
                                    {
                                        return $('#form_developers_edit :input[name="id"]').val();
                                    }
                                }
                        }
                    },
                    password: {
                        minlength: 6
                    },
                    re_pass_user: {
	                    equalTo: "#password"
					},					
                    image_developers: {
                        extension: "jpg|jpeg|png"
                    },
                    job: {
                        required: true
                    },
                    descriptions: {
                        required : true
                    }
                },

                messages: { // custom messages for radio buttons and checkboxes
                    nama: {
                        required: "Nama is required."
                    },
                    username: {
                        minlength: "Username minimum 4 character.",
                        required: "Username is required.",
                        remote: jQuery.validator.format("Username {0} has been registered.")
                    },
                    password: {
                        minlength: "Password minimum 6 character."
                    },					
                    image_developers: {
                        extension: "The filetype is not allowed."
                    },
                    job: {
                        required: "Jobs is required."
                    },
                    descriptions: {
                        required: "Descriptions is required."
                    }
                },

                errorPlacement: function (error, element) { // render error placement for each input type
                    if (element.parent(".input-group").size() > 0) {
                        error.insertAfter(element.parent(".input-group"));
                    } else if (element.attr("data-error-container")) {
                        error.appendTo(element.attr("data-error-container"));
                    } else if (element.parents('.radio-list').size() > 0) {
                        error.appendTo(element.parents('.radio-list').attr("data-error-container"));
                    } else if (element.parents('.radio-inline').size() > 0) {
                        error.appendTo(element.parents('.radio-inline').attr("data-error-container"));
                    } else if (element.parents('.checkbox-list').size() > 0) {
                        error.appendTo(element.parents('.checkbox-list').attr("data-error-container"));
                    } else if (element.parents('.checkbox-inline').size() > 0) {
                        error.appendTo(element.parents('.checkbox-inline').attr("data-error-container"));
                    } else {
                        error.insertAfter(element); // for other inputs, just perform default behavior
                    }
                },

                invalidHandler: function (event, validator) { //display error alert on form submit
                    error3.show();
                    App.scrollTo(error3, -200);
                },

                highlight: function (element) { // hightlight error inputs
                   $(element)
                        .closest('.form-group').addClass('has-error'); // set error class to the control group
                },

                unhighlight: function (element) { // revert the change done by hightlight
                    $(element)
                        .closest('.form-group').removeClass('has-error'); // set error class to the control group
                },

                success: function (label) {
                    label
                        .closest('.form-group').removeClass('has-error'); // set success class to the control group
                },

                submitHandler: function (form) {
                    form.submit();
                    error3.hide();
                }
            });

            $('#form_developers_edit input').keypress(function (e) {
                if (e.which == 13) {
                    if ($('#form_developers_edit').validate().form()) {
                        $('#form_developers_edit').submit();
                    }
                    return false;
                }
        });

             //apply validation on select2 dropdown value change, this only needed for chosen dropdown integration.
            $('.select2me', formuser).change(function () {
                formuser.validate().element($(this)); //revalidate the chosen dropdown value and show error or success message for the input
            });
    }    


    var handleFormBlog = function() {
        // for more info visit the official plugin documentation:
        // http://docs.jquery.com/Plugins/Validation

            var formuser = $('#form_blog');
            var error3 = $('.alert-danger', formuser);

            //IMPORTANT: update CKEDITOR textarea with actual content before submit
            formuser.on('submit', function() {
                for(var instanceName in CKEDITOR.instances) {
                    CKEDITOR.instances[instanceName].updateElement();
                }
            })

            formuser.validate({
                errorElement: 'span', //default input error message container
                errorClass: 'help-block', // default input error message class
                focusInvalid: true, // do not focus the last invalid input
                ignore: "",
                rules: {
                    foto_thumbnail : {
                        extension: "jpg|jpeg|png"
                    },
                    judul: {
                        required: true
                    },
                    category : {
                        required: true
                    },
                    isi: {
                        required: true
                    },
                    tags: {
                        required: true
                    },
                    descriptions : {
                        required : true,
						minlength : 60
                    }
                },

                messages: { // custom messages for radio buttons and checkboxes
                    foto_thumbnail : {
                        extension : "The filetype is not allowed."
                    },
                    judul: {
                        required: "Judul is required."
                    },
                    category: {
                        required : "Category is required."
                    },
                    isi: {
                        required: "Content is required."
                    },
                    tags: {
                        required: "Meta Tags is required."
                    },
                    descriptions : {
                        required : "Meta Descriptions is required.",
						minlength : "Minimal 60 Character."
                    }
                },

                errorPlacement: function (error, element) { // render error placement for each input type
                    if (element.parent(".input-group").size() > 0) {
                        error.insertAfter(element.parent(".input-group"));
                    } else if (element.attr("data-error-container")) {
                        error.appendTo(element.attr("data-error-container"));
                    } else if (element.parents('.radio-list').size() > 0) {
                        error.appendTo(element.parents('.radio-list').attr("data-error-container"));
                    } else if (element.parents('.radio-inline').size() > 0) {
                        error.appendTo(element.parents('.radio-inline').attr("data-error-container"));
                    } else if (element.parents('.checkbox-list').size() > 0) {
                        error.appendTo(element.parents('.checkbox-list').attr("data-error-container"));
                    } else if (element.parents('.checkbox-inline').size() > 0) {
                        error.appendTo(element.parents('.checkbox-inline').attr("data-error-container"));
                    } else {
                        error.insertAfter(element); // for other inputs, just perform default behavior
                    }
                },

                invalidHandler: function (event, validator) { //display error alert on form submit
                    error3.show();
                    App.scrollTo(error3, -200);
                },

                highlight: function (element) { // hightlight error inputs
                   $(element)
                        .closest('.form-group').addClass('has-error'); // set error class to the control group
                },

                unhighlight: function (element) { // revert the change done by hightlight
                    $(element)
                        .closest('.form-group').removeClass('has-error'); // set error class to the control group
                },

                success: function (label) {
                    label
                        .closest('.form-group').removeClass('has-error'); // set success class to the control group
                },

                submitHandler: function (form) {
                    form.submit();
                    error3.hide();
                }
            });

            $('#form_blog input').keypress(function (e) {
                if (e.which == 13) {
                    if ($('#form_blog').validate().form()) {
                        $('#form_blog').submit();
                    }
                    return false;
                }
        });
    }

    var handleFormBlogEdit = function() {
        // for more info visit the official plugin documentation:
        // http://docs.jquery.com/Plugins/Validation

            var formuser = $('#form_blog_edit');
            var error3 = $('.alert-danger', formuser);

            //IMPORTANT: update CKEDITOR textarea with actual content before submit
            formuser.on('submit', function() {
                for(var instanceName in CKEDITOR.instances) {
                    CKEDITOR.instances[instanceName].updateElement();
                }
            })

            formuser.validate({
                errorElement: 'span', //default input error message container
                errorClass: 'help-block', // default input error message class
                focusInvalid: true, // do not focus the last invalid input
                ignore: "",
                rules: {
                    foto_thumbnail : {
                        extension: "jpg|jpeg|png"
                    },
                    judul: {
                        required: true
                    }, 
                    category: {
                        required:true
                    },
                    isi: {
                        required: true
                    },
                    tags: {
                        required: true
                    },
                    descriptions : {
                        required : true,
						minlength : 60
                    }
                },

                messages: { // custom messages for radio buttons and checkboxes
                    foto_thumbnail : {
                        extension : "The filetype is not allowed."
                    },
                    judul: {
                        required: "Judul is required."
                    },
                    category: {
                        required: true
                    },
                    isi: {
                        required: "Content is required."
                    },
                    tags: {
                        required: "Meta Tags is required."
                    },
                    descriptions : {
                        required : "Meta Descriptions is required.",
						minlength : "Minimal 60 character."
                    }
                },

                errorPlacement: function (error, element) { // render error placement for each input type
                    if (element.parent(".input-group").size() > 0) {
                        error.insertAfter(element.parent(".input-group"));
                    } else if (element.attr("data-error-container")) {
                        error.appendTo(element.attr("data-error-container"));
                    } else if (element.parents('.radio-list').size() > 0) {
                        error.appendTo(element.parents('.radio-list').attr("data-error-container"));
                    } else if (element.parents('.radio-inline').size() > 0) {
                        error.appendTo(element.parents('.radio-inline').attr("data-error-container"));
                    } else if (element.parents('.checkbox-list').size() > 0) {
                        error.appendTo(element.parents('.checkbox-list').attr("data-error-container"));
                    } else if (element.parents('.checkbox-inline').size() > 0) {
                        error.appendTo(element.parents('.checkbox-inline').attr("data-error-container"));
                    } else {
                        error.insertAfter(element); // for other inputs, just perform default behavior
                    }
                },

                invalidHandler: function (event, validator) { //display error alert on form submit
                    error3.show();
                    App.scrollTo(error3, -200);
                },

                highlight: function (element) { // hightlight error inputs
                   $(element)
                        .closest('.form-group').addClass('has-error'); // set error class to the control group
                },

                unhighlight: function (element) { // revert the change done by hightlight
                    $(element)
                        .closest('.form-group').removeClass('has-error'); // set error class to the control group
                },

                success: function (label) {
                    label
                        .closest('.form-group').removeClass('has-error'); // set success class to the control group
                },

                submitHandler: function (form) {
                    form.submit();
                    error3.hide();
                }
            });

            $('#form_blog_edit input').keypress(function (e) {
                if (e.which == 13) {
                    if ($('#form_blog_edit').validate().form()) {
                        $('#form_blog_edit').submit();
                    }
                    return false;
                }
        });
    }

    var handleFormTutorial = function() {
        // for more info visit the official plugin documentation:
        // http://docs.jquery.com/Plugins/Validation

            var formuser = $('#form_tutorial');
            var error3 = $('.alert-danger', formuser);

            //IMPORTANT: update CKEDITOR textarea with actual content before submit
            formuser.on('submit', function() {
                for(var instanceName in CKEDITOR.instances) {
                    CKEDITOR.instances[instanceName].updateElement();
                }
            })

            formuser.validate({
                errorElement: 'span', //default input error message container
                errorClass: 'help-block', // default input error message class
                focusInvalid: true, // do not focus the last invalid input
                ignore: "",
                rules: {
                    foto_thumbnail : {
                        extension: "jpg|jpeg|png"
                    },
                    judul: {
                        required: true
                    },
                    category:{
                        required: true
                    },
                    isi: {
                        required: true
                    },
                    tags: {
                        required: true
                    },
                    descriptions : {
                        required : true,
						minlength : 60
                    }
                },

                messages: { // custom messages for radio buttons and checkboxes
                    foto_thumbnail : {
                        extension : "The filetype is not allowed."
                    },
                    judul: {
                        required: "Judul is required."
                    },
                    category: {
                        required: "Category is required."
                    },
                    isi: {
                        required: "Content is required."
                    },
                    tags: {
                        required: "Meta Tags is required."
                    },
                    descriptions : {
                        required : "Meta Descriptions is required.",
						minlength : "Minimal 60 character."
                    }
                },

                errorPlacement: function (error, element) { // render error placement for each input type
                    if (element.parent(".input-group").size() > 0) {
                        error.insertAfter(element.parent(".input-group"));
                    } else if (element.attr("data-error-container")) {
                        error.appendTo(element.attr("data-error-container"));
                    } else if (element.parents('.radio-list').size() > 0) {
                        error.appendTo(element.parents('.radio-list').attr("data-error-container"));
                    } else if (element.parents('.radio-inline').size() > 0) {
                        error.appendTo(element.parents('.radio-inline').attr("data-error-container"));
                    } else if (element.parents('.checkbox-list').size() > 0) {
                        error.appendTo(element.parents('.checkbox-list').attr("data-error-container"));
                    } else if (element.parents('.checkbox-inline').size() > 0) {
                        error.appendTo(element.parents('.checkbox-inline').attr("data-error-container"));
                    } else {
                        error.insertAfter(element); // for other inputs, just perform default behavior
                    }
                },

                invalidHandler: function (event, validator) { //display error alert on form submit
                    error3.show();
                    App.scrollTo(error3, -200);
                },

                highlight: function (element) { // hightlight error inputs
                   $(element)
                        .closest('.form-group').addClass('has-error'); // set error class to the control group
                },

                unhighlight: function (element) { // revert the change done by hightlight
                    $(element)
                        .closest('.form-group').removeClass('has-error'); // set error class to the control group
                },

                success: function (label) {
                    label
                        .closest('.form-group').removeClass('has-error'); // set success class to the control group
                },

                submitHandler: function (form) {
                    form.submit();
                    error3.hide();
                }
            });

            $('#form_tutorial input').keypress(function (e) {
                if (e.which == 13) {
                    if ($('#form_tutorial').validate().form()) {
                        $('#form_tutorial').submit();
                    }
                    return false;
                }
        });
    }

    var handleFormTutorialEdit = function() {
        // for more info visit the official plugin documentation:
        // http://docs.jquery.com/Plugins/Validation

            var formuser = $('#form_tutorial_edit');
            var error3 = $('.alert-danger', formuser);

            //IMPORTANT: update CKEDITOR textarea with actual content before submit
            formuser.on('submit', function() {
                for(var instanceName in CKEDITOR.instances) {
                    CKEDITOR.instances[instanceName].updateElement();
                }
            })

            formuser.validate({
                errorElement: 'span', //default input error message container
                errorClass: 'help-block', // default input error message class
                focusInvalid: true, // do not focus the last invalid input
                ignore: "",
                rules: {
                    foto_thumbnail : {
                        extension: "jpg|jpeg|png"
                    },
                    judul: {
                        required: true
                    },
                    category:{
                        required: true
                    },
                    isi: {
                        required: true
                    },
                    tags: {
                        required: true
                    },
                    descriptions : {
                        required : true,
						minlength: 60
                    }
                },

                messages: { // custom messages for radio buttons and checkboxes
                    foto_thumbnail : {
                        extension : "The filetype is not allowed."
                    },
                    judul: {
                        required: "Judul is required."
                    },
                    category: {
                        required: "Category is required."
                    },
                    isi: {
                        required: "Content is required."
                    },
                    tags: {
                        required: "Meta Tags is required."
                    },
                    descriptions : {
                        required : "Meta Descriptions is required.",
						minlength: "minimal 60 character."
                    }
                },

                errorPlacement: function (error, element) { // render error placement for each input type
                    if (element.parent(".input-group").size() > 0) {
                        error.insertAfter(element.parent(".input-group"));
                    } else if (element.attr("data-error-container")) {
                        error.appendTo(element.attr("data-error-container"));
                    } else if (element.parents('.radio-list').size() > 0) {
                        error.appendTo(element.parents('.radio-list').attr("data-error-container"));
                    } else if (element.parents('.radio-inline').size() > 0) {
                        error.appendTo(element.parents('.radio-inline').attr("data-error-container"));
                    } else if (element.parents('.checkbox-list').size() > 0) {
                        error.appendTo(element.parents('.checkbox-list').attr("data-error-container"));
                    } else if (element.parents('.checkbox-inline').size() > 0) {
                        error.appendTo(element.parents('.checkbox-inline').attr("data-error-container"));
                    } else {
                        error.insertAfter(element); // for other inputs, just perform default behavior
                    }
                },

                invalidHandler: function (event, validator) { //display error alert on form submit
                    error3.show();
                    App.scrollTo(error3, -200);
                },

                highlight: function (element) { // hightlight error inputs
                   $(element)
                        .closest('.form-group').addClass('has-error'); // set error class to the control group
                },

                unhighlight: function (element) { // revert the change done by hightlight
                    $(element)
                        .closest('.form-group').removeClass('has-error'); // set error class to the control group
                },

                success: function (label) {
                    label
                        .closest('.form-group').removeClass('has-error'); // set success class to the control group
                },

                submitHandler: function (form) {
                    form.submit();
                    error3.hide();
                }
            });

            $('#form_tutorial_edit input').keypress(function (e) {
                if (e.which == 13) {
                    if ($('#form_tutorial_edit').validate().form()) {
                        $('#form_tutorial_edit').submit();
                    }
                    return false;
                }
        });
    }

    var handleFormCategoryBlog = function() {
        // for more info visit the official plugin documentation:
        // http://docs.jquery.com/Plugins/Validation

            var formuser = $('#form_category_blog');
            var error3 = $('.alert-danger', formuser);

            //IMPORTANT: update CKEDITOR textarea with actual content before submit


            formuser.validate({
                errorElement: 'span', //default input error message container
                errorClass: 'help-block', // default input error message class
                focusInvalid: true, // do not focus the last invalid input
                ignore: "",
                rules: {
                    nama_category: {
                        required: true,
                        "remote":{
                            url: base_url+'posts/category_blog/cek_name',
                            type: "post",
                            data:
                                {
                                    name: function()
                                    {
                                        return $('#form_category :input[name="nama_category"]').val();
                                    },
                                    id: function()
                                    {
                                        return $('#form_category :input[name="id"]').val();
                                    }
                                }
                        }
                    },
                    button_style : {
                        required : true
                    },
                    descriptions: {
                        maxlength: 50,
                        required: true
                    }
                },

                messages: { // custom messages for radio buttons and checkboxes
                    nama_category: {
                        required: "Category is required.",
                        remote: jQuery.validator.format("Category {0} has been registered.")
                    },
                    button_style : {
                        required : "Button style is required."
                    },
                    descriptions: {
                        maxlength: "Descriptions maximum 50 character.",
                        required: "Descriptions is required."
                    }
                },

                errorPlacement: function (error, element) { // render error placement for each input type
                    if (element.parent(".input-group").size() > 0) {
                        error.insertAfter(element.parent(".input-group"));
                    } else if (element.attr("data-error-container")) {
                        error.appendTo(element.attr("data-error-container"));
                    } else if (element.parents('.radio-list').size() > 0) {
                        error.appendTo(element.parents('.radio-list').attr("data-error-container"));
                    } else if (element.parents('.radio-inline').size() > 0) {
                        error.appendTo(element.parents('.radio-inline').attr("data-error-container"));
                    } else if (element.parents('.checkbox-list').size() > 0) {
                        error.appendTo(element.parents('.checkbox-list').attr("data-error-container"));
                    } else if (element.parents('.checkbox-inline').size() > 0) {
                        error.appendTo(element.parents('.checkbox-inline').attr("data-error-container"));
                    } else {
                        error.insertAfter(element); // for other inputs, just perform default behavior
                    }
                },

                invalidHandler: function (event, validator) { //display error alert on form submit
                    error3.show();
                    App.scrollTo(error3, -200);
                },

                highlight: function (element) { // hightlight error inputs
                   $(element)
                        .closest('.form-group').addClass('has-error'); // set error class to the control group
                },

                unhighlight: function (element) { // revert the change done by hightlight
                    $(element)
                        .closest('.form-group').removeClass('has-error'); // set error class to the control group
                },

                success: function (label) {
                    label
                        .closest('.form-group').removeClass('has-error'); // set success class to the control group
                },

                submitHandler: function (form) {
                    form.submit();
                    error3.hide();
                }
            });

            $('#form_category_blog input').keypress(function (e) {
                if (e.which == 13) {
                    if ($('#form_category_blog').validate().form()) {
                        $('#form_category_blog').submit();
                    }
                    return false;
                }
        });

             //apply validation on select2 dropdown value change, this only needed for chosen dropdown integration.
            $('.select2me', formuser).change(function () {
                formuser.validate().element($(this)); //revalidate the chosen dropdown value and show error or success message for the input
            });
    }

    var handleFormCategoryBlogEdit = function() {
        // for more info visit the official plugin documentation:
        // http://docs.jquery.com/Plugins/Validation

            var formuser = $('#form_category_blog_edit');
            var error3 = $('.alert-danger', formuser);

            //IMPORTANT: update CKEDITOR textarea with actual content before submit


            formuser.validate({
                errorElement: 'span', //default input error message container
                errorClass: 'help-block', // default input error message class
                focusInvalid: true, // do not focus the last invalid input
                ignore: "",
                rules: {
                    nama_category: {
                        required: true,
                        "remote":{
                            url: base_url+'posts/category_blog/cek_name',
                            type: "post",
                            data:
                                {
                                    name: function()
                                    {
                                        return $('#form_category_blog_edit :input[name="nama_category"]').val();
                                    },
                                    id: function()
                                    {
                                        return $('#form_category_blog_edit :input[name="id"]').val();
                                    }
                                }
                        }
                    },
                    button_style : {
                        required : true
                    },
                    descriptions: {
                        maxlength: 50,
                        required: true
                    }
                },

                messages: { // custom messages for radio buttons and checkboxes
                    nama_category: {
                        required: "Category is required.",
                        remote: jQuery.validator.format("Category {0} has been registered.")
                    },
                    button_style : {
                        required : "Button style is required."
                    },
                    descriptions: {
                        maxlength: "Descriptions maximum 50 character.",
                        required: "Descriptions is required."
                    }
                },

                errorPlacement: function (error, element) { // render error placement for each input type
                    if (element.parent(".input-group").size() > 0) {
                        error.insertAfter(element.parent(".input-group"));
                    } else if (element.attr("data-error-container")) {
                        error.appendTo(element.attr("data-error-container"));
                    } else if (element.parents('.radio-list').size() > 0) {
                        error.appendTo(element.parents('.radio-list').attr("data-error-container"));
                    } else if (element.parents('.radio-inline').size() > 0) {
                        error.appendTo(element.parents('.radio-inline').attr("data-error-container"));
                    } else if (element.parents('.checkbox-list').size() > 0) {
                        error.appendTo(element.parents('.checkbox-list').attr("data-error-container"));
                    } else if (element.parents('.checkbox-inline').size() > 0) {
                        error.appendTo(element.parents('.checkbox-inline').attr("data-error-container"));
                    } else {
                        error.insertAfter(element); // for other inputs, just perform default behavior
                    }
                },

                invalidHandler: function (event, validator) { //display error alert on form submit
                    error3.show();
                    App.scrollTo(error3, -200);
                },

                highlight: function (element) { // hightlight error inputs
                   $(element)
                        .closest('.form-group').addClass('has-error'); // set error class to the control group
                },

                unhighlight: function (element) { // revert the change done by hightlight
                    $(element)
                        .closest('.form-group').removeClass('has-error'); // set error class to the control group
                },

                success: function (label) {
                    label
                        .closest('.form-group').removeClass('has-error'); // set success class to the control group
                },

                submitHandler: function (form) {
                    form.submit();
                    error3.hide();
                }
            });

            $('#form_category_blog_edit input').keypress(function (e) {
                if (e.which == 13) {
                    if ($('#form_category_blog_edit').validate().form()) {
                        $('#form_category_blog_edit').submit();
                    }
                    return false;
                }
        });

             //apply validation on select2 dropdown value change, this only needed for chosen dropdown integration.
            $('.select2me', formuser).change(function () {
                formuser.validate().element($(this)); //revalidate the chosen dropdown value and show error or success message for the input
            });
    }

    var handleFormCategory = function() {
        // for more info visit the official plugin documentation:
        // http://docs.jquery.com/Plugins/Validation

            var formuser = $('#form_category');
            var error3 = $('.alert-danger', formuser);

            //IMPORTANT: update CKEDITOR textarea with actual content before submit


            formuser.validate({
                errorElement: 'span', //default input error message container
                errorClass: 'help-block', // default input error message class
                focusInvalid: true, // do not focus the last invalid input
                ignore: "",
                rules: {
                    nama_category: {
                        required: true,
                        "remote":{
                            url: base_url+'posts/category/cek_name',
                            type: "post",
                            data:
                                {
                                    name: function()
                                    {
                                        return $('#form_category :input[name="nama_category"]').val();
                                    },
                                    id: function()
                                    {
                                        return $('#form_category :input[name="id"]').val();
                                    }
                                }
                        }
                    },
                    button_style : {
                        required : true
                    },
                    descriptions: {
                        maxlength: 50,
                        required: true
                    }
                },

                messages: { // custom messages for radio buttons and checkboxes
                    nama_category: {
                        required: "Category is required.",
                        remote: jQuery.validator.format("Category {0} has been registered.")
                    },
                    button_style : {
                        required : "Button style is required."
                    },
                    descriptions: {
                        maxlength: "Descriptions maximum 50 character.",
                        required: "Descriptions is required."
                    }
                },

                errorPlacement: function (error, element) { // render error placement for each input type
                    if (element.parent(".input-group").size() > 0) {
                        error.insertAfter(element.parent(".input-group"));
                    } else if (element.attr("data-error-container")) {
                        error.appendTo(element.attr("data-error-container"));
                    } else if (element.parents('.radio-list').size() > 0) {
                        error.appendTo(element.parents('.radio-list').attr("data-error-container"));
                    } else if (element.parents('.radio-inline').size() > 0) {
                        error.appendTo(element.parents('.radio-inline').attr("data-error-container"));
                    } else if (element.parents('.checkbox-list').size() > 0) {
                        error.appendTo(element.parents('.checkbox-list').attr("data-error-container"));
                    } else if (element.parents('.checkbox-inline').size() > 0) {
                        error.appendTo(element.parents('.checkbox-inline').attr("data-error-container"));
                    } else {
                        error.insertAfter(element); // for other inputs, just perform default behavior
                    }
                },

                invalidHandler: function (event, validator) { //display error alert on form submit
                    error3.show();
                    App.scrollTo(error3, -200);
                },

                highlight: function (element) { // hightlight error inputs
                   $(element)
                        .closest('.form-group').addClass('has-error'); // set error class to the control group
                },

                unhighlight: function (element) { // revert the change done by hightlight
                    $(element)
                        .closest('.form-group').removeClass('has-error'); // set error class to the control group
                },

                success: function (label) {
                    label
                        .closest('.form-group').removeClass('has-error'); // set success class to the control group
                },

                submitHandler: function (form) {
                    form.submit();
                    error3.hide();
                }
            });

            $('#form_category input').keypress(function (e) {
                if (e.which == 13) {
                    if ($('#form_category').validate().form()) {
                        $('#form_category').submit();
                    }
                    return false;
                }
        });

             //apply validation on select2 dropdown value change, this only needed for chosen dropdown integration.
            $('.select2me', formuser).change(function () {
                formuser.validate().element($(this)); //revalidate the chosen dropdown value and show error or success message for the input
            });
    }

    var handleFormCategoryEdit = function() {
        // for more info visit the official plugin documentation:
        // http://docs.jquery.com/Plugins/Validation

            var formuser = $('#form_category_edit');
            var error3 = $('.alert-danger', formuser);

            //IMPORTANT: update CKEDITOR textarea with actual content before submit


            formuser.validate({
                errorElement: 'span', //default input error message container
                errorClass: 'help-block', // default input error message class
                focusInvalid: true, // do not focus the last invalid input
                ignore: "",
                rules: {
                    nama_category: {
                        required: true,
                        "remote":{
                            url: base_url+'posts/category/cek_name',
                            type: "post",
                            data:
                                {
                                    name: function()
                                    {
                                        return $('#form_category_edit :input[name="nama_category"]').val();
                                    },
                                    id: function()
                                    {
                                        return $('#form_category_edit :input[name="id"]').val();
                                    }
                                }
                        }
                    },
                    button_style : {
                        required : true
                    },
                    descriptions: {
                        maxlength: 50,
                        required: true
                    }
                },

                messages: { // custom messages for radio buttons and checkboxes
                    nama_category: {
                        required: "Category is required.",
                        remote: jQuery.validator.format("Category {0} has been registered.")
                    },
                    button_style : {
                        required : "Button style is required."
                    },
                    descriptions: {
                        maxlength: "Descriptions maximum 50 character.",
                        required: "Descriptions is required."
                    }
                },

                errorPlacement: function (error, element) { // render error placement for each input type
                    if (element.parent(".input-group").size() > 0) {
                        error.insertAfter(element.parent(".input-group"));
                    } else if (element.attr("data-error-container")) {
                        error.appendTo(element.attr("data-error-container"));
                    } else if (element.parents('.radio-list').size() > 0) {
                        error.appendTo(element.parents('.radio-list').attr("data-error-container"));
                    } else if (element.parents('.radio-inline').size() > 0) {
                        error.appendTo(element.parents('.radio-inline').attr("data-error-container"));
                    } else if (element.parents('.checkbox-list').size() > 0) {
                        error.appendTo(element.parents('.checkbox-list').attr("data-error-container"));
                    } else if (element.parents('.checkbox-inline').size() > 0) {
                        error.appendTo(element.parents('.checkbox-inline').attr("data-error-container"));
                    } else {
                        error.insertAfter(element); // for other inputs, just perform default behavior
                    }
                },

                invalidHandler: function (event, validator) { //display error alert on form submit
                    error3.show();
                    App.scrollTo(error3, -200);
                },

                highlight: function (element) { // hightlight error inputs
                   $(element)
                        .closest('.form-group').addClass('has-error'); // set error class to the control group
                },

                unhighlight: function (element) { // revert the change done by hightlight
                    $(element)
                        .closest('.form-group').removeClass('has-error'); // set error class to the control group
                },

                success: function (label) {
                    label
                        .closest('.form-group').removeClass('has-error'); // set success class to the control group
                },

                submitHandler: function (form) {
                    form.submit();
                    error3.hide();
                }
            });

            $('#form_category_edit input').keypress(function (e) {
                if (e.which == 13) {
                    if ($('#form_category_edit').validate().form()) {
                        $('#form_category_edit').submit();
                    }
                    return false;
                }
        });

             //apply validation on select2 dropdown value change, this only needed for chosen dropdown integration.
            $('.select2me', formuser).change(function () {
                formuser.validate().element($(this)); //revalidate the chosen dropdown value and show error or success message for the input
            });
    }

    var handleFormMeme = function() {
        // for more info visit the official plugin documentation:
        // http://docs.jquery.com/Plugins/Validation

            var formuser = $('#form_meme');
            var error3 = $('.alert-danger', formuser);

            //IMPORTANT: update CKEDITOR textarea with actual content before submit


            formuser.validate({
                errorElement: 'span', //default input error message container
                errorClass: 'help-block', // default input error message class
                focusInvalid: true, // do not focus the last invalid input
                ignore: "",
                rules: {
                    image_meme : {
                        required : true,
                        extension : "jpg|jpeg|png|gif" 
                    },
                    judul_meme: {
                        required: true
                    },
                    descriptions: {
                        required: true
                    },
                    tags_meme : {
                        required : true
                    }
                },

                messages: { // custom messages for radio buttons and checkboxes
                    image_meme: {
                        required: "Image is required.",
                        extension: "The filetype is not allowed."
                    },
                    judul_meme : {
                        required : "Judul is required."
                    },
                    descriptions: {
                        required: "Descriptions is required."
                    },
                    tags_meme : {
                        required : "Tags is required."
                    }
                },

                errorPlacement: function (error, element) { // render error placement for each input type
                    if (element.parent(".input-group").size() > 0) {
                        error.insertAfter(element.parent(".input-group"));
                    } else if (element.attr("data-error-container")) {
                        error.appendTo(element.attr("data-error-container"));
                    } else if (element.parents('.radio-list').size() > 0) {
                        error.appendTo(element.parents('.radio-list').attr("data-error-container"));
                    } else if (element.parents('.radio-inline').size() > 0) {
                        error.appendTo(element.parents('.radio-inline').attr("data-error-container"));
                    } else if (element.parents('.checkbox-list').size() > 0) {
                        error.appendTo(element.parents('.checkbox-list').attr("data-error-container"));
                    } else if (element.parents('.checkbox-inline').size() > 0) {
                        error.appendTo(element.parents('.checkbox-inline').attr("data-error-container"));
                    } else {
                        error.insertAfter(element); // for other inputs, just perform default behavior
                    }
                },

                invalidHandler: function (event, validator) { //display error alert on form submit
                    error3.show();
                    App.scrollTo(error3, -200);
                },

                highlight: function (element) { // hightlight error inputs
                   $(element)
                        .closest('.form-group').addClass('has-error'); // set error class to the control group
                },

                unhighlight: function (element) { // revert the change done by hightlight
                    $(element)
                        .closest('.form-group').removeClass('has-error'); // set error class to the control group
                },

                success: function (label) {
                    label
                        .closest('.form-group').removeClass('has-error'); // set success class to the control group
                },

                submitHandler: function (form) {
                    form.submit();
                    error3.hide();
                }
            });

            $('#form_meme input').keypress(function (e) {
                if (e.which == 13) {
                    if ($('#form_meme').validate().form()) {
                        $('#form_meme').submit();
                    }
                    return false;
                }
        });

             //apply validation on select2 dropdown value change, this only needed for chosen dropdown integration.
            $('.select2me', formuser).change(function () {
                formuser.validate().element($(this)); //revalidate the chosen dropdown value and show error or success message for the input
            });
    }

    var handleFormMemeEdit = function() {
        // for more info visit the official plugin documentation:
        // http://docs.jquery.com/Plugins/Validation

            var formuser = $('#form_meme_edit');
            var error3 = $('.alert-danger', formuser);

            //IMPORTANT: update CKEDITOR textarea with actual content before submit


            formuser.validate({
                errorElement: 'span', //default input error message container
                errorClass: 'help-block', // default input error message class
                focusInvalid: true, // do not focus the last invalid input
                ignore: "",
                rules: {
                    image_meme : {
                        //required : true,
                        extension : "jpg|jpeg|png|gif" 
                    },
                    judul_meme: {
                        required: true
                    },
                    descriptions: {
                        required: true
                    },
                    tags_meme : {
                        required : true
                    }
                },

                messages: { // custom messages for radio buttons and checkboxes
                    image_meme: {
                        //required: "Image is required.",
                        extension: "The filetype is not allowed."
                    },
                    judul_meme : {
                        required : "Judul is required."
                    },
                    descriptions: {
                        required: "Descriptions is required."
                    },
                    tags_meme : {
                        required : "Tags is required."
                    }
                },

                errorPlacement: function (error, element) { // render error placement for each input type
                    if (element.parent(".input-group").size() > 0) {
                        error.insertAfter(element.parent(".input-group"));
                    } else if (element.attr("data-error-container")) {
                        error.appendTo(element.attr("data-error-container"));
                    } else if (element.parents('.radio-list').size() > 0) {
                        error.appendTo(element.parents('.radio-list').attr("data-error-container"));
                    } else if (element.parents('.radio-inline').size() > 0) {
                        error.appendTo(element.parents('.radio-inline').attr("data-error-container"));
                    } else if (element.parents('.checkbox-list').size() > 0) {
                        error.appendTo(element.parents('.checkbox-list').attr("data-error-container"));
                    } else if (element.parents('.checkbox-inline').size() > 0) {
                        error.appendTo(element.parents('.checkbox-inline').attr("data-error-container"));
                    } else {
                        error.insertAfter(element); // for other inputs, just perform default behavior
                    }
                },

                invalidHandler: function (event, validator) { //display error alert on form submit
                    error3.show();
                    App.scrollTo(error3, -200);
                },

                highlight: function (element) { // hightlight error inputs
                   $(element)
                        .closest('.form-group').addClass('has-error'); // set error class to the control group
                },

                unhighlight: function (element) { // revert the change done by hightlight
                    $(element)
                        .closest('.form-group').removeClass('has-error'); // set error class to the control group
                },

                success: function (label) {
                    label
                        .closest('.form-group').removeClass('has-error'); // set success class to the control group
                },

                submitHandler: function (form) {
                    form.submit();
                    error3.hide();
                }
            });

            $('#form_meme_edit input').keypress(function (e) {
                if (e.which == 13) {
                    if ($('#form_meme_edit').validate().form()) {
                        $('#form_meme_edit').submit();
                    }
                    return false;
                }
        });

             //apply validation on select2 dropdown value change, this only needed for chosen dropdown integration.
            $('.select2me', formuser).change(function () {
                formuser.validate().element($(this)); //revalidate the chosen dropdown value and show error or success message for the input
            });
    }

    var handleFormQuotes = function() {
        // for more info visit the official plugin documentation:
        // http://docs.jquery.com/Plugins/Validation

            var formuser = $('#form_quotes');
            var error3 = $('.alert-danger', formuser);

            //IMPORTANT: update CKEDITOR textarea with actual content before submit


            formuser.validate({
                errorElement: 'span', //default input error message container
                errorClass: 'help-block', // default input error message class
                focusInvalid: true, // do not focus the last invalid input
                ignore: "",
                rules: {
                    image_quotes : {
                        required : true,
                        extension : "jpg|jpeg|png|gif" 
                    },
                    judul_quotes: {
                        required: true
                    },
                    descriptions: {
                        required: true
                    },
                    tags_quotes : {
                        required : true
                    }
                },

                messages: { // custom messages for radio buttons and checkboxes
                    image_quotes: {
                        required: "Image is required.",
                        extension: "The filetype is not allowed."
                    },
                    judul_quotes : {
                        required : "Judul is required."
                    },
                    descriptions: {
                        required: "Descriptions is required."
                    },
                    tags_quotes : {
                        required : "Tags is required."
                    }
                },

                errorPlacement: function (error, element) { // render error placement for each input type
                    if (element.parent(".input-group").size() > 0) {
                        error.insertAfter(element.parent(".input-group"));
                    } else if (element.attr("data-error-container")) {
                        error.appendTo(element.attr("data-error-container"));
                    } else if (element.parents('.radio-list').size() > 0) {
                        error.appendTo(element.parents('.radio-list').attr("data-error-container"));
                    } else if (element.parents('.radio-inline').size() > 0) {
                        error.appendTo(element.parents('.radio-inline').attr("data-error-container"));
                    } else if (element.parents('.checkbox-list').size() > 0) {
                        error.appendTo(element.parents('.checkbox-list').attr("data-error-container"));
                    } else if (element.parents('.checkbox-inline').size() > 0) {
                        error.appendTo(element.parents('.checkbox-inline').attr("data-error-container"));
                    } else {
                        error.insertAfter(element); // for other inputs, just perform default behavior
                    }
                },

                invalidHandler: function (event, validator) { //display error alert on form submit
                    error3.show();
                    App.scrollTo(error3, -200);
                },

                highlight: function (element) { // hightlight error inputs
                   $(element)
                        .closest('.form-group').addClass('has-error'); // set error class to the control group
                },

                unhighlight: function (element) { // revert the change done by hightlight
                    $(element)
                        .closest('.form-group').removeClass('has-error'); // set error class to the control group
                },

                success: function (label) {
                    label
                        .closest('.form-group').removeClass('has-error'); // set success class to the control group
                },

                submitHandler: function (form) {
                    form.submit();
                    error3.hide();
                }
            });

            $('#form_quotes input').keypress(function (e) {
                if (e.which == 13) {
                    if ($('#form_quotes').validate().form()) {
                        $('#form_quotes').submit();
                    }
                    return false;
                }
        });

             //apply validation on select2 dropdown value change, this only needed for chosen dropdown integration.
            $('.select2me', formuser).change(function () {
                formuser.validate().element($(this)); //revalidate the chosen dropdown value and show error or success message for the input
            });
    }

    var handleFormQuotesEdit = function() {
        // for more info visit the official plugin documentation:
        // http://docs.jquery.com/Plugins/Validation

            var formuser = $('#form_quotes_edit');
            var error3 = $('.alert-danger', formuser);

            //IMPORTANT: update CKEDITOR textarea with actual content before submit


            formuser.validate({
                errorElement: 'span', //default input error message container
                errorClass: 'help-block', // default input error message class
                focusInvalid: true, // do not focus the last invalid input
                ignore: "",
                rules: {
                    image_quotes : {
                        //required : true,
                        extension : "jpg|jpeg|png|gif" 
                    },
                    judul_quotes: {
                        required: true
                    },
                    descriptions: {
                        required: true
                    },
                    tags_quotes : {
                        required : true
                    }
                },

                messages: { // custom messages for radio buttons and checkboxes
                    image_quotes: {
                        //required: "Image is required.",
                        extension: "The filetype is not allowed."
                    },
                    judul_quotes : {
                        required : "Judul is required."
                    },
                    descriptions: {
                        required: "Descriptions is required."
                    },
                    tags_quotes : {
                        required : "Tags is required."
                    }
                },

                errorPlacement: function (error, element) { // render error placement for each input type
                    if (element.parent(".input-group").size() > 0) {
                        error.insertAfter(element.parent(".input-group"));
                    } else if (element.attr("data-error-container")) {
                        error.appendTo(element.attr("data-error-container"));
                    } else if (element.parents('.radio-list').size() > 0) {
                        error.appendTo(element.parents('.radio-list').attr("data-error-container"));
                    } else if (element.parents('.radio-inline').size() > 0) {
                        error.appendTo(element.parents('.radio-inline').attr("data-error-container"));
                    } else if (element.parents('.checkbox-list').size() > 0) {
                        error.appendTo(element.parents('.checkbox-list').attr("data-error-container"));
                    } else if (element.parents('.checkbox-inline').size() > 0) {
                        error.appendTo(element.parents('.checkbox-inline').attr("data-error-container"));
                    } else {
                        error.insertAfter(element); // for other inputs, just perform default behavior
                    }
                },

                invalidHandler: function (event, validator) { //display error alert on form submit
                    error3.show();
                    App.scrollTo(error3, -200);
                },

                highlight: function (element) { // hightlight error inputs
                   $(element)
                        .closest('.form-group').addClass('has-error'); // set error class to the control group
                },

                unhighlight: function (element) { // revert the change done by hightlight
                    $(element)
                        .closest('.form-group').removeClass('has-error'); // set error class to the control group
                },

                success: function (label) {
                    label
                        .closest('.form-group').removeClass('has-error'); // set success class to the control group
                },

                submitHandler: function (form) {
                    form.submit();
                    error3.hide();
                }
            });

            $('#form_quotes_edit input').keypress(function (e) {
                if (e.which == 13) {
                    if ($('#form_quotes_edit').validate().form()) {
                        $('#form_quotes_edit').submit();
                    }
                    return false;
                }
        });

             //apply validation on select2 dropdown value change, this only needed for chosen dropdown integration.
            $('.select2me', formuser).change(function () {
                formuser.validate().element($(this)); //revalidate the chosen dropdown value and show error or success message for the input
            });
    }

    var handleFormPages = function() {
        // for more info visit the official plugin documentation:
        // http://docs.jquery.com/Plugins/Validation

            var formuser = $('#form_pages');
            var error3 = $('.alert-danger', formuser);

            //IMPORTANT: update CKEDITOR textarea with actual content before submit
            formuser.on('submit', function() {
                for(var instanceName in CKEDITOR.instances) {
                    CKEDITOR.instances[instanceName].updateElement();
                }
            })

            formuser.validate({
                errorElement: 'span', //default input error message container
                errorClass: 'help-block', // default input error message class
                focusInvalid: true, // do not focus the last invalid input
                ignore: "",
                rules: {
                    judul: {
                        required: true
                    },
                    kategori:{
                        required: true
                    },
                    isi: {
                        required: true
                    },
                    tags: {
                        required: true
                    }
                },

                messages: { // custom messages for radio buttons and checkboxes
                    judul: {
                        required: "Judul tidak boleh kosong"
                    },
                    kategori: {
                        required: "Kategori tidak boleh kosong"
                    },
                    isi: {
                        required: "Isi tidak boleh kosong"
                    },
                    tags: {
                        required: "Tags tidak boleh kosong"
                    }
                },

                errorPlacement: function (error, element) { // render error placement for each input type
                    if (element.parent(".input-group").size() > 0) {
                        error.insertAfter(element.parent(".input-group"));
                    } else if (element.attr("data-error-container")) {
                        error.appendTo(element.attr("data-error-container"));
                    } else if (element.parents('.radio-list').size() > 0) {
                        error.appendTo(element.parents('.radio-list').attr("data-error-container"));
                    } else if (element.parents('.radio-inline').size() > 0) {
                        error.appendTo(element.parents('.radio-inline').attr("data-error-container"));
                    } else if (element.parents('.checkbox-list').size() > 0) {
                        error.appendTo(element.parents('.checkbox-list').attr("data-error-container"));
                    } else if (element.parents('.checkbox-inline').size() > 0) {
                        error.appendTo(element.parents('.checkbox-inline').attr("data-error-container"));
                    } else {
                        error.insertAfter(element); // for other inputs, just perform default behavior
                    }
                },

                invalidHandler: function (event, validator) { //display error alert on form submit
                    error3.show();
                    App.scrollTo(error3, -200);
                },

                highlight: function (element) { // hightlight error inputs
                   $(element)
                        .closest('.form-group').addClass('has-error'); // set error class to the control group
                },

                unhighlight: function (element) { // revert the change done by hightlight
                    $(element)
                        .closest('.form-group').removeClass('has-error'); // set error class to the control group
                },

                success: function (label) {
                    label
                        .closest('.form-group').removeClass('has-error'); // set success class to the control group
                },

                submitHandler: function (form) {
                    form.submit();
                    error3.hide();
                }
            });

            $('#form_pages input').keypress(function (e) {
	            if (e.which == 13) {
	                if ($('#form_pages').validate().form()) {
	                    $('#form_pages').submit();
	                }
	                return false;
	            }
	    });
    }

    var handleFormFile = function() {
        // for more info visit the official plugin documentation:
        // http://docs.jquery.com/Plugins/Validation

            var formuser = $('#form_file');
            var error3 = $('.alert-danger', formuser);

            //IMPORTANT: update CKEDITOR textarea with actual content before submit


            formuser.validate({
                errorElement: 'span', //default input error message container
                errorClass: 'help-block', // default input error message class
                focusInvalid: true, // do not focus the last invalid input
                ignore: "",
                rules: {
                  judul_file:{
                    required: true
                  },
                    userfile: {
                        required: true,
                        extension: "pdf|doc"
                    }
                },

                messages: { // custom messages for radio buttons and checkboxes
                  judul_file:{
                    required: "Nama file tidak boleh kosong"
                  },
                    userfile: {
                        required: "Silahkan pilih file",
                        extension: "Tipe file tidak diizinkan"
                    }
                },

                errorPlacement: function (error, element) { // render error placement for each input type
                    if (element.parent(".input-group").size() > 0) {
                        error.insertAfter(element.parent(".input-group"));
                    } else if (element.attr("data-error-container")) {
                        error.appendTo(element.attr("data-error-container"));
                    } else if (element.parents('.radio-list').size() > 0) {
                        error.appendTo(element.parents('.radio-list').attr("data-error-container"));
                    } else if (element.parents('.radio-inline').size() > 0) {
                        error.appendTo(element.parents('.radio-inline').attr("data-error-container"));
                    } else if (element.parents('.checkbox-list').size() > 0) {
                        error.appendTo(element.parents('.checkbox-list').attr("data-error-container"));
                    } else if (element.parents('.checkbox-inline').size() > 0) {
                        error.appendTo(element.parents('.checkbox-inline').attr("data-error-container"));
                    } else {
                        error.insertAfter(element); // for other inputs, just perform default behavior
                    }
                },

                invalidHandler: function (event, validator) { //display error alert on form submit
                    error3.show();
                    App.scrollTo(error3, -200);
                },

                highlight: function (element) { // hightlight error inputs
                   $(element)
                        .closest('.form-group').addClass('has-error'); // set error class to the control group
                },

                unhighlight: function (element) { // revert the change done by hightlight
                    $(element)
                        .closest('.form-group').removeClass('has-error'); // set error class to the control group
                },

                success: function (label) {
                    label
                        .closest('.form-group').removeClass('has-error'); // set success class to the control group
                },

                submitHandler: function (form) {
                    form.submit();
                    error3.hide();
                }
            });

            $('#form_file input').keypress(function (e) {
	            if (e.which == 13) {
	                if ($('#form_file').validate().form()) {
	                    $('#form_file').submit();
	                }
	                return false;
	            }
	    });
    }

    var handleFormFileEdit = function() {
        // for more info visit the official plugin documentation:
        // http://docs.jquery.com/Plugins/Validation

            var formuser = $('#form_file_edit');
            var error3 = $('.alert-danger', formuser);

            //IMPORTANT: update CKEDITOR textarea with actual content before submit


            formuser.validate({
                errorElement: 'span', //default input error message container
                errorClass: 'help-block', // default input error message class
                focusInvalid: true, // do not focus the last invalid input
                ignore: "",
                rules: {
                  judul_file:{
                    required: true
                  },
                    userfile: {
                        extension: "pdf|doc"
                    }
                },

                messages: { // custom messages for radio buttons and checkboxes
                  judul_file:{
                    required: "Nama file tidak boleh kosong"
                  },
                    userfile: {
                        extension: "Tipe file tidak diizinkan"
                    }
                },

                errorPlacement: function (error, element) { // render error placement for each input type
                    if (element.parent(".input-group").size() > 0) {
                        error.insertAfter(element.parent(".input-group"));
                    } else if (element.attr("data-error-container")) {
                        error.appendTo(element.attr("data-error-container"));
                    } else if (element.parents('.radio-list').size() > 0) {
                        error.appendTo(element.parents('.radio-list').attr("data-error-container"));
                    } else if (element.parents('.radio-inline').size() > 0) {
                        error.appendTo(element.parents('.radio-inline').attr("data-error-container"));
                    } else if (element.parents('.checkbox-list').size() > 0) {
                        error.appendTo(element.parents('.checkbox-list').attr("data-error-container"));
                    } else if (element.parents('.checkbox-inline').size() > 0) {
                        error.appendTo(element.parents('.checkbox-inline').attr("data-error-container"));
                    } else {
                        error.insertAfter(element); // for other inputs, just perform default behavior
                    }
                },

                invalidHandler: function (event, validator) { //display error alert on form submit
                    error3.show();
                    App.scrollTo(error3, -200);
                },

                highlight: function (element) { // hightlight error inputs
                   $(element)
                        .closest('.form-group').addClass('has-error'); // set error class to the control group
                },

                unhighlight: function (element) { // revert the change done by hightlight
                    $(element)
                        .closest('.form-group').removeClass('has-error'); // set error class to the control group
                },

                success: function (label) {
                    label
                        .closest('.form-group').removeClass('has-error'); // set success class to the control group
                },

                submitHandler: function (form) {
                    form.submit();
                    error3.hide();
                }
            });

            $('#form_file_edit input').keypress(function (e) {
	            if (e.which == 13) {
	                if ($('#form_file_edit').validate().form()) {
	                    $('#form_file_edit').submit();
	                }
	                return false;
	            }
	    });
    }


    var handleFormAlbum = function() {
        // for more info visit the official plugin documentation:
        // http://docs.jquery.com/Plugins/Validation

            var form3 = $('#form_album');
            var error3 = $('.alert-danger', form3);

            //IMPORTANT: update CKEDITOR textarea with actual content before submit


            form3.validate({
                errorElement: 'span', //default input error message container
                errorClass: 'help-block', // default input error message class
                focusInvalid: true, // do not focus the last invalid input
                ignore: "",
                rules: {
                    nama_album: {
                        required: true,
                        minlength: 3
                    }
                },

                messages: { // custom messages for radio buttons and checkboxes
                    nama_album: {
                        required: "Nama album foto tidak boleh kosong",
                        minlength: "Nama album foto minimal 3 karakter"
                    }
                },

                errorPlacement: function (error, element) { // render error placement for each input type
                    if (element.parent(".input-group").size() > 0) {
                        error.insertAfter(element.parent(".input-group"));
                    } else if (element.attr("data-error-container")) {
                        error.appendTo(element.attr("data-error-container"));
                    } else if (element.parents('.radio-list').size() > 0) {
                        error.appendTo(element.parents('.radio-list').attr("data-error-container"));
                    } else if (element.parents('.radio-inline').size() > 0) {
                        error.appendTo(element.parents('.radio-inline').attr("data-error-container"));
                    } else if (element.parents('.checkbox-list').size() > 0) {
                        error.appendTo(element.parents('.checkbox-list').attr("data-error-container"));
                    } else if (element.parents('.checkbox-inline').size() > 0) {
                        error.appendTo(element.parents('.checkbox-inline').attr("data-error-container"));
                    } else {
                        error.insertAfter(element); // for other inputs, just perform default behavior
                    }
                },

                invalidHandler: function (event, validator) { //display error alert on form submit
                    error3.show();
                    App.scrollTo(error3, -200);
                },

                highlight: function (element) { // hightlight error inputs
                   $(element)
                        .closest('.form-group').addClass('has-error'); // set error class to the control group
                },

                unhighlight: function (element) { // revert the change done by hightlight
                    $(element)
                        .closest('.form-group').removeClass('has-error'); // set error class to the control group
                },

                success: function (label) {
                    label
                        .closest('.form-group').removeClass('has-error'); // set success class to the control group
                },

                submitHandler: function (form) {
                    form.submit();
                    error3.hide();
                }
            });

                $('#form_album input').keypress(function (e) {
	            if (e.which == 13) {
	                if ($('#form_album').validate().form()) {
	                    $('#form_album').submit();
	                }
	                return false;
	            }
	        });
    }

    var handleFormPortofolio = function() {
        // for more info visit the official plugin documentation:
        // http://docs.jquery.com/Plugins/Validation

            var formuser = $('#form_portofolio');
            var error3 = $('.alert-danger', formuser);

            //IMPORTANT: update CKEDITOR textarea with actual content before submit


            formuser.validate({
                errorElement: 'span', //default input error message container
                errorClass: 'help-block', // default input error message class
                focusInvalid: true, // do not focus the last invalid input
                ignore: "",
                rules: {
                    'files[]': {
                        required: true,
                        extension: "gif|jpg|jpeg|png"
                    }
                },

                messages: { // custom messages for radio buttons and checkboxes
                    'files[]': {
                        required: "Silahkan pilih gambar",
                        extension: "Tipe file tidak diizinkan"
                    }
                },

                errorPlacement: function (error, element) { // render error placement for each input type
                    if (element.parent(".input-group").size() > 0) {
                        error.insertAfter(element.parent(".input-group"));
                    } else if (element.attr("data-error-container")) {
                        error.appendTo(element.attr("data-error-container"));
                    } else if (element.parents('.radio-list').size() > 0) {
                        error.appendTo(element.parents('.radio-list').attr("data-error-container"));
                    } else if (element.parents('.radio-inline').size() > 0) {
                        error.appendTo(element.parents('.radio-inline').attr("data-error-container"));
                    } else if (element.parents('.checkbox-list').size() > 0) {
                        error.appendTo(element.parents('.checkbox-list').attr("data-error-container"));
                    } else if (element.parents('.checkbox-inline').size() > 0) {
                        error.appendTo(element.parents('.checkbox-inline').attr("data-error-container"));
                    } else {
                        error.insertAfter(element); // for other inputs, just perform default behavior
                    }
                },

                invalidHandler: function (event, validator) { //display error alert on form submit
                    error3.show();
                    App.scrollTo(error3, -200);
                },

                highlight: function (element) { // hightlight error inputs
                   $(element)
                        .closest('.form-group').addClass('has-error'); // set error class to the control group
                },

                unhighlight: function (element) { // revert the change done by hightlight
                    $(element)
                        .closest('.form-group').removeClass('has-error'); // set error class to the control group
                },

                success: function (label) {
                    label
                        .closest('.form-group').removeClass('has-error'); // set success class to the control group
                },

                submitHandler: function (form) {
                    form.submit();
                    error3.hide();
                }
            });

            $('#form_portofolio input').keypress(function (e) {
	            if (e.which == 13) {
	                if ($('#form_portofolio').validate().form()) {
	                    $('#form_portofolio').submit();
	                }
	                return false;
	            }
	    });
    }

    var handleFormPortofolioData = function() {
        // for more info visit the official plugin documentation:
        // http://docs.jquery.com/Plugins/Validation

            var formuser = $('#form_portofolio_data');
            var error3 = $('.alert-danger', formuser);

            //IMPORTANT: update CKEDITOR textarea with actual content before submit


            formuser.validate({
                errorElement: 'span', //default input error message container
                errorClass: 'help-block', // default input error message class
                focusInvalid: true, // do not focus the last invalid input
                ignore: "",
                rules: {
                    'caption_portofolio[]': {
                        required: true
                    },
                    'lokasi_portofolio[]': {
                        required: true
                    }
                },

                messages: { // custom messages for radio buttons and checkboxes
                    'caption_portofolio[]': {
                        required: "Caption tidak boleh kosong."
                    },
                    'lokasi_portofolio[]': {
                        required: "Lokasi tidak boleh kosong."
                    }
                },

                errorPlacement: function (error, element) { // render error placement for each input type
                    if (element.parent(".input-group").size() > 0) {
                        error.insertAfter(element.parent(".input-group"));
                    } else if (element.attr("data-error-container")) {
                        error.appendTo(element.attr("data-error-container"));
                    } else if (element.parents('.radio-list').size() > 0) {
                        error.appendTo(element.parents('.radio-list').attr("data-error-container"));
                    } else if (element.parents('.radio-inline').size() > 0) {
                        error.appendTo(element.parents('.radio-inline').attr("data-error-container"));
                    } else if (element.parents('.checkbox-list').size() > 0) {
                        error.appendTo(element.parents('.checkbox-list').attr("data-error-container"));
                    } else if (element.parents('.checkbox-inline').size() > 0) {
                        error.appendTo(element.parents('.checkbox-inline').attr("data-error-container"));
                    } else {
                        error.insertAfter(element); // for other inputs, just perform default behavior
                    }
                },

                invalidHandler: function (event, validator) { //display error alert on form submit
                    error3.show();
                    App.scrollTo(error3, -200);
                },

                highlight: function (element) { // hightlight error inputs
                   $(element)
                        .closest('.form-group').addClass('has-error'); // set error class to the control group
                },

                unhighlight: function (element) { // revert the change done by hightlight
                    $(element)
                        .closest('.form-group').removeClass('has-error'); // set error class to the control group
                },

                success: function (label) {
                    label
                        .closest('.form-group').removeClass('has-error'); // set success class to the control group
                },

                submitHandler: function (form) {
                    form.submit();
                    error3.hide();
                }
            });

            $('#form_portofolio_data input').keypress(function (e) {
	            if (e.which == 13) {
	                if ($('#form_portofolio_data').validate().form()) {
	                    $('#form_portofolio_data').submit();
	                }
	                return false;
	            }
	    });
    }

    return {
        //main function to initiate the module
        init: function () {
            handleFormBlog();
            handleFormBlogEdit();
            handleFormTutorial();
            handleFormTutorialEdit();
            handleFormCategory();
            handleFormCategoryEdit();
            handleFormCategoryBlog();
            handleFormCategoryBlogEdit();
            handleFormTestimoni();
            handleFormMeme();
            handleFormMemeEdit();
            handleFormQuotes();
            handleFormQuotesEdit();
            handleFormFile();
            handleFormFileEdit();
            handleFormPortofolio();
            handleFormPortofolioData();
            handleFormUser();
            handleFormUserEdit();
            handleFormProject();
            handleFormProjectEdit();
            handleFormDevelopers();
            handleFormDevelopersEdit();
            handleFormPages();
            handleFormAlbum();
            handlePasswordStrengthChecker();
        }

    };

}();
