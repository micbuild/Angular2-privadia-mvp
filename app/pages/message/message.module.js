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
var common_1 = require("@angular/common");
var router_1 = require('@angular/router');
/**
 *  Providers
 */
var enquiry_service_1 = require("../../providers/enquery/enquiry.service");
/**
 *  Components
 */
var message_component_1 = require('./message.component');
var message_routing_module_1 = require('./message-routing.module');
var ng2_cloudinary_1 = require("ng2-cloudinary");
var enquiry_component_1 = require("./enquiry/enquiry.component");
var enquiries_component_1 = require("../../components/tables/enquiries/enquiries.component");
var dialog_component_1 = require("../../components/enquiry/dialog/dialog.component");
var MessageModule = (function () {
    function MessageModule() {
    }
    MessageModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                message_routing_module_1.MessageRoutingModule,
                router_1.RouterModule,
                ng2_cloudinary_1.Ng2CloudinaryModule
            ],
            declarations: [
                message_component_1.MessageComponent,
                enquiry_component_1.EnquiryComponent,
                enquiries_component_1.EnquiriesTableComponent,
                dialog_component_1.DialogComponent
            ],
            providers: [enquiry_service_1.EnquiryService]
        }), 
        __metadata('design:paramtypes', [])
    ], MessageModule);
    return MessageModule;
}());
exports.MessageModule = MessageModule;
//# sourceMappingURL=message.module.js.map