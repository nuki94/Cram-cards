function User(name, email, password, password2) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.password2 = password2;
    this.errors = {};
}


User.prototype.validateName = function(){
    var isValid = true;
    if (!Validation.busyUserName()) {
        this.errors.password = 'Sorry, that username is already taken';
        isValid = false;
    }
    return isValid;
}

User.prototype.validateUserEmail = function () {
    var isValid = true;
    if (!Validation.validateEmail(this.email)) {
        this.errors.email = 'Enter a valid e-mail address';
        isValid = false;
    }
    return isValid;
}

User.prototype.validateUserPasswordLength = function(){
    var isValid = true;

    if (!Validation.validateLength(this.password)) {
        this.errors.password = 'Too simple password';

        isValid = false;
    }
    return isValid;
}

User.prototype.validateConfirmPassword = function(){
    var isValid = true;
    if (!Validation.validatePassword(this.password2, this.password)) {
        this.errors.password2 = 'Password must be confirmed';
        isValid = false;
    }
    console.log(this.email);
    return isValid;
}