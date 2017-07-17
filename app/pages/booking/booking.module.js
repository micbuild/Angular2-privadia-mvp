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
var router_1 = require('@angular/router');
var booking_routing_module_1 = require('./booking-routing.module');
var common_1 = require("@angular/common");
var ng2_cloudinary_1 = require("ng2-cloudinary");
var forms_1 = require("@angular/forms");
var booking_service_1 = require("../../providers/booking/booking.service");
var forthcoming_component_1 = require("../../components/tables/forthcoming/forthcoming.component");
/**
 *  Components
 */
var property_info_component_1 = require("../../components/booking/property-info/property-info.component");
var proposal_component_1 = require("../../components/booking/proposal/proposal.component");
var payment_status_component_1 = require("../../components/booking/payment-status/payment-status.component");
/**
 *  My Modules
 */
var form_field_module_1 = require("../../modules/form-fields/form-field.module");
var properties_service_1 = require("../../providers/properties/properties.service");
var lookups_service_1 = require("../../providers/lookups/lookups.service");
var proposals_service_1 = require("../../providers/proposals/proposals.service");
var BookingModule = (function () {
    function BookingModule() {
    }
    BookingModule = __decorate([
        core_1.NgModule({
            imports: [
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                router_1.RouterModule,
                ng2_cloudinary_1.Ng2CloudinaryModule,
                form_field_module_1.FormFieldsModule,
                common_1.CommonModule,
                ng2_cloudinary_1.Ng2CloudinaryModule,
                router_1.RouterModule.forChild(booking_routing_module_1.MODULE_ROUTES)
            ],
            declarations: [booking_routing_module_1.MODULE_COMPONENTS, forthcoming_component_1.ForthcomingTableComponent,
                property_info_component_1.PropertyInfoComponent,
                proposal_component_1.ProposalComponent,
                payment_status_component_1.PaymentStatusComponent],
            providers: [booking_service_1.BookingService, properties_service_1.PropertiesService, lookups_service_1.LookupsService, proposals_service_1.ProposalsService]
        }), 
        __metadata('design:paramtypes', [])
    ], BookingModule);
    return BookingModule;
}());
exports.BookingModule = BookingModule;
//# sourceMappingURL=booking.module.js.map