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
var platform_browser_1 = require('@angular/platform-browser');
var router_1 = require('@angular/router');
var http_1 = require('@angular/http');
// import { ROUTER_PROVIDERS } from '@angular/router-deprecated';
var app_component_1 = require('./app.component');
var dashboard_component_1 = require('./pages/dashboard.component');
var users_component_1 = require('./pages/users/users.component');
var dashboard_module_1 = require('./pages/dashboard.module');
var users_module_1 = require('./pages/users/users.module');
var sidebar_module_1 = require('./components/sidebar/sidebar.module');
var footer_module_1 = require('./components/shared/footer/footer.module');
var navbar_module_1 = require('./components/shared/navbar/navbar.module');
var common_1 = require('@angular/common');
var homeservice_1 = require('./providers/homeservice');
var login_service_1 = require('./providers/login/login.service');
var properties_service_1 = require('./providers/properties/properties.service');
var booking_service_1 = require('./providers/booking/booking.service');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                dashboard_module_1.DashboardModule,
                users_module_1.UsersModule,
                sidebar_module_1.SidebarModule,
                navbar_module_1.NavbarModule,
                footer_module_1.FooterModule,
                http_1.HttpModule,
                router_1.RouterModule.forRoot([])
            ],
            declarations: [app_component_1.AppComponent, dashboard_component_1.DashboardComponent, users_component_1.UsersComponent],
            providers: [
                { provide: common_1.LocationStrategy, useClass: common_1.HashLocationStrategy },
                homeservice_1.MainService, login_service_1.LoginService, properties_service_1.PropertiesService, booking_service_1.BookingService
            ],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map