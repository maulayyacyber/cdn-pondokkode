var FormValidation = function () {
 var base_url = window.location.origin+"/developers/dashboard/";

 var handlePasswordStrengthChecker = function () {
     var initialized = false;
     var input = $("#password");

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

    return {
        //main function to initiate the module
        init: function () {
            handleFormProject();
            handleFormProjectEdit();
            handleFormDevelopers();
            handleFormDevelopersEdit();
            handlePasswordStrengthChecker();
        }

    };

}();
