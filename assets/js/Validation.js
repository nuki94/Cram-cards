/**
 * Created by vasil on 6/9/15.
 */
var Validation = {


    busyUserName: function(){
        var username = document.getElementById('username1').value;

        Ajax.request(
            'GET',
            Config.usersurl, {'username': username},
            true).setOnSuccess(function(xhr) {
                var result = xhr.responseText;
               isTrue.set(result);
            })
        return isTrue.get();
    },

    validateEmail : function (value) {
        return String(value).match(/^[a-z_\-\.0-9]+@[a-z\-]+\.[a-z\.]+$/) ? true : false;
    },

    validatePassword : function(value, value2){
        console.log(value, value2)
        return value2 == value;
    },

    validateLength : function (value) {
        return String(value).match(/^(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/) ? true : false;
    }

}

var isTrue = (function() {
    var isTrue;
    function setIsTrue(val) {
        isTrue = val;
    }
    return {
        get: function() {
            if(isTrue == 'false'){
                return false;
            }
            else{
                return true;
            }
        },
        set: function(t) {
            setIsTrue(t);
        }
    };
})();
