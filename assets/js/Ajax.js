var Ajax = {
    getXhr: function () {
        if (typeof XMLHttpRequest !== 'undefined') {
            return new XMLHttpRequest();
        }

        if (typeof ActiveXObject !== 'undefined') {
            return new ActiveXObject('Microsoft.XMLHTTP')
        }

        throw new Error('No AJAX Supported');
    },
    request: function (method, url, params, async) {
        var xhr = this.getXhr();
        method = method.toUpperCase();

        if (method === 'GET') {
            var params = this.objectToParams(params);
            if (url.indexOf('?') === -1) {
                url += '?';
            } else if (url.indexOf('=') !== -1 && url.substr(-1) !== '&') {
                url += '&';
            }

            url += params;
        }

        if (method === 'POST' || method === 'PUT'){
            var params = this.objectToJSON(params);
        }

        xhr.open(method, url, async);
        var promise = new Promise();
        if (async) {
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    promise.resolve(xhr);
                }

                if (xhr.readyState == 4 && xhr.status != 200) {
                    promise.reject(xhr);
                }
            }
        }

        xhr.send((method === 'POST') || (method === 'PUT') ? params : null);

        return async ? promise : xhr;
    },
    objectToParams: function(object) {
        var pairs = [];
        for (var i in object) {
            pairs.push(encodeURIComponent(i) + '=' + encodeURIComponent(object[i]));
        }

        return pairs.join('&');
    },
    objectToJSON: function(object){
        var jsonString = JSON.stringify(object);

        return jsonString;
    }
};