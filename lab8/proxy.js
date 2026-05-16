class AuthProxy {
    constructor(authType, authData) {
        this.authType = authType;
        this.authData = authData;
        this.requestsMade = 0;
        this.limit = 5;
    }

    changeStrategy(newType, newData) {
        this.authType = newType;
        this.authData = newData;
    }

    async renewJwtToken() {
        console.log("! Token expired, getting new one");
        this.authData = "new_token_" + Math.floor(Math.random() * 1000);
    }

    async sendRequest(targetUrl, method = "GET", bodyData = null) {
        this.requestsMade += 1;
        
        if (this.requestsMade > this.limit) {
            console.log("Error: Too many requests");
            return null;
        }

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

        if (response.status === 401 && this.authType === "jwt") {
            await this.renewJwtToken();
            reqHeaders["Authorization"] = "Bearer " + this.authData;
            options.headers = reqHeaders;
            response = await fetch(targetUrl, options);
        }

        let result = await response.json();
        return result;
    }
}

module.exports = AuthProxy;