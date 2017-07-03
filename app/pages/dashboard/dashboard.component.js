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
var dashboard_service_1 = require('../../providers/dashboard/dashboard.service');
var forms_1 = require('@angular/forms');
var lookups_service_1 = require("../../providers/lookups/lookups.service");
var DashboardComponent = (function () {
    function DashboardComponent(dashboardService, lookupsService, builder) {
        this.dashboardService = dashboardService;
        this.lookupsService = lookupsService;
        this.builder = builder;
        this.enquiryForm = new forms_1.FormGroup({});
        this.proposalForm = new forms_1.FormGroup({});
        this.filterForm = new forms_1.FormGroup({});
    }
    DashboardComponent.prototype.ngOnInit = function () {
        var _this = this;
        $('.sidebar .sidebar-wrapper, .main-panel').scrollTop(0);
        $('.modal').appendTo("body");
        /*
        setTimeout(()=> {
            $('.modal-content').perfectScrollbar();
        },100)
        */
        this.filterForm = this.builder.group({
            Bedrooms: new forms_1.FormControl(),
            CheckIn: new forms_1.FormControl(moment().format('MM/DD/YYYY')),
            CheckOut: new forms_1.FormControl(moment().add(1, 'day').format('MM/DD/YYYY')),
            MaxRate: new forms_1.FormControl(),
            MinRate: new forms_1.FormControl(),
            OrderBy: new forms_1.FormControl(),
            Regions: new forms_1.FormArray([]),
            MetaDataFilters: new forms_1.FormArray([]),
        });
        this.enquiryForm = this.builder.group({
            FirstName: new forms_1.FormControl(),
            LastName: new forms_1.FormControl(),
            CheckIn: new forms_1.FormControl(moment().format('MM/DD/YYYY')),
            CheckOut: new forms_1.FormControl(moment().add(1, 'day').format('MM/DD/YYYY')),
            Message: new forms_1.FormControl(),
        });
        this.proposalForm = this.builder.group({
            ClientName: new forms_1.FormControl('Johnathan Robinson'),
            CheckIn: new forms_1.FormControl(moment().format('MM/DD/YYYY')),
            CheckOut: new forms_1.FormControl(moment().add(1, 'day').format('MM/DD/YYYY')),
            RentalPrice: new forms_1.FormControl(1200),
            BookingPrice: new forms_1.FormControl(1495),
        });
        this.filterForm.valueChanges.subscribe(function (d) {
            _this.enquiryForm.controls['CheckIn'].setValue(d.CheckIn);
            _this.enquiryForm.controls['CheckOut'].setValue(d.CheckOut);
        }, function (e) {
            console.log('Error change form ', e);
        });
        console.log('Open filter ', this);
    };
    DashboardComponent.prototype.openEnquiry = function (villa) {
        console.log('onvoted ', villa);
        this.openVilla = villa;
    };
    DashboardComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: ' dashboard-cmp ',
            templateUrl: 'dashboard.component.html',
            styleUrls: ['dashboard.component.css']
        }), 
        __metadata('design:paramtypes', [dashboard_service_1.DashboardService, lookups_service_1.LookupsService, forms_1.FormBuilder])
    ], DashboardComponent);
    return DashboardComponent;
}());
exports.DashboardComponent = DashboardComponent;
//# sourceMappingURL=dashboard.component.js.map