"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/operator/catch');
require('rxjs/add/operator/map');
var login_service_1 = require("../login/login.service");
var ProposalsService = (function () {
    function ProposalsService(http, loginService) {
        this.http = http;
        this.loginService = loginService;
        this.apiUrl = 'http://privadia-mvp-api-2-dev.azurewebsites.net';
        this.token = localStorage.getItem('id_token');
        console.log('Load Proposals Service');
    }
    ProposalsService.prototype.createProposals = function (data) {
        if (!this.loginService.getPermission('Proposals/Post'))
            return Observable_1.Observable.throw(null);
        var header = new http_1.Headers({ 'Authorization': this.token });
        var options = new http_1.RequestOptions({ headers: header });
        return this.http.post(this.apiUrl + "/api/Proposals", data, options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    ProposalsService.prototype.saveProposals = function (data) {
        if (!this.loginService.getPermission('Proposals/Post'))
            return Observable_1.Observable.throw(null);
        var header = new http_1.Headers({ 'Authorization': this.token });
        var options = new http_1.RequestOptions({ headers: header });
        return this.http.put(this.apiUrl + "/api/Proposals", data, options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    ProposalsService.prototype.submitProposals = function (data) {
        if (!this.loginService.getPermission('Proposals/Submit'))
            return Observable_1.Observable.throw(null);
        var header = new http_1.Headers({ 'Authorization': this.token });
        var options = new http_1.RequestOptions({ headers: header });
        return this.http.post(this.apiUrl + "/api/Proposals/Submit", data, options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    ProposalsService.prototype.extractData = function (res) {
        var body = res.json();
        return body || {};
    };
    ProposalsService.prototype.handleError = function (error) {
        var errMsg;
        if (error instanceof http_1.Response) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            errMsg = error.status + " - " + (error.statusText || '') + " " + err;
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        return Observable_1.Observable.throw(errMsg);
    };
    ProposalsService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, login_service_1.LoginService])
    ], ProposalsService);
    return ProposalsService;
}());
exports.ProposalsService = ProposalsService;
//# sourceMappingURL=proposals.service.js.map