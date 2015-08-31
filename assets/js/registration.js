
    var user = new User();

    function checkEmail(){
        var field = document.getElementById("email");
        var errorContainer = field.parentNode.querySelector('.error');

        user.email = document.getElementById("email").value;
        if (user.validateUserEmail()) {
            errorContainer.style.display = 'none';
        } else {
            applyModelErrorsToForm(user.errors, field, errorContainer);
        }
    }

    function checkName(){
        var field = document.getElementById("username1");
        var errorContainer = field.parentNode.querySelector('.error');

        user.email = document.getElementById("username1").value;
        if (user.validateName()) {
            errorContainer.style.display = 'none';

        } else {
            applyModelErrorsToForm(user.errors, field, errorContainer);
        }
    }

    function checkPassword(){
        var field = document.getElementById("password2");
        var errorContainer = field.parentNode.querySelector('.error');

        user.password = document.getElementById("password2").value;
        if (user.validateUserPasswordLength()) {
            errorContainer.style.display = 'none';
        } else {
            applyModelErrorsToForm(user.errors, field, errorContainer);
        }
    }

    function checkConfirmPassword(){
        var field = document.getElementById("password3");
        var errorContainer = field.parentNode.querySelector('.error');

        user.password2 = document.getElementById("password3").value;
        if (user.validateConfirmPassword()) {
            errorContainer.style.display = 'none';

        } else {
            applyModelErrorsToForm(user.errors, field, errorContainer);
        }
    }


    function applyModelErrorsToForm(error, field, errorContainer) {
        if (field && error.name) {
            errorContainer = field.parentNode.querySelector('.error');
            errorContainer.style.color = 'red';
            errorContainer.innerHTML = error.email;
            errorContainer.style.display = 'block';
        }
        if (field && error.email) {
            errorContainer = field.parentNode.querySelector('.error');
            errorContainer.style.color = 'red';
            errorContainer.innerHTML = error.email;
            errorContainer.style.display = 'block';
        }

        if (field && error.password) {
            errorContainer = field.parentNode.querySelector('.error');
            errorContainer.style.color = 'red';
            errorContainer.innerHTML = error.password;
            errorContainer.style.display = 'block';
        }
        if (field && error.password2) {
            errorContainer = field.parentNode.querySelector('.error');
            errorContainer.style.color = 'red';
            errorContainer.innerHTML = error.password2;
            errorContainer.style.display = 'block';
        }

    }
