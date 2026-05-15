class AuthProxy {
    constructor(authType, authData) {
        this.authType = authType;
        this.authData = authData;
    }

    async sendRequest(targetUrl, method = "GET", bodyData = null) {
        console.log("-> Request to", targetUrl);

        let reqHeaders = {
            "Content-Type": "application/json"
        };

        if (this.authType === "api_key") {
            reqHeaders["X-API-KEY"] = this.authData;
        } else if (this.authType === "jwt" || this.authType === "oauth") {
            reqHeaders["Authorization"] = "Bearer " + this.authData;
        }

        let options = {
            method: method,
            headers: reqHeaders
        };

        if (bodyData !== null) {
            options.body = JSON.stringify(bodyData);
        }

        let response = await fetch(targetUrl, options);
        let result = await response.json();

        return result;
    }
}

module.exports = AuthProxy;