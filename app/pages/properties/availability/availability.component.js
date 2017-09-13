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
var router_1 = require("@angular/router");
var forms_1 = require('@angular/forms');
var properties_service_1 = require('../../../providers/properties/properties.service');
var calendar_service_1 = require("../../../providers/calendar/calendar.service");
var lookups_service_1 = require("../../../providers/lookups/lookups.service");
var helpers_1 = require("../../../helpers/helpers");
var AvailabilityComponent = (function () {
    function AvailabilityComponent(route, propertiesService, lookupsService, calendarService, builder) {
        var _this = this;
        this.route = route;
        this.propertiesService = propertiesService;
        this.lookupsService = lookupsService;
        this.calendarService = calendarService;
        this.builder = builder;
        this.availabilityForm = new forms_1.FormGroup({
            Id: new forms_1.FormControl(null),
            PropertyId: new forms_1.FormControl(null),
            CheckIn: new forms_1.FormControl(null),
            CheckOut: new forms_1.FormControl(null),
            // CheckIn: new FormControl(moment('09/10/2017 14:23').format('MM/DD/YYYY')),
            // CheckOut: new FormControl(moment('09/10/2017 14:23').add(1, 'day').format('MM/DD/YYYY')),
            EntryType: new forms_1.FormControl({
                Id: null,
                Name: null,
            }),
            Notes: new forms_1.FormControl(null),
            isAgency: new forms_1.FormControl(null),
            FirstName: new forms_1.FormControl(null),
            LastName: new forms_1.FormControl(null),
            Email: new forms_1.FormControl(null),
            Phone: new forms_1.FormControl(null),
            CompanyName: new forms_1.FormControl(null),
            ContactName: new forms_1.FormControl(null),
            AgencyEmail: new forms_1.FormControl(null),
            AgencyPhone: new forms_1.FormControl(null)
        });
        this.CheckIn = moment('09/25/2017').startOf('days');
        this.CheckOut = moment(this.CheckIn).add(1, 'day').startOf('days');
        this.isCalendarView = true;
        this.UpdateBlock = null;
        route.params.subscribe(function (params) {
            _this.propertyId = params['id'];
            _this.availabilityForm.controls['PropertyId'].patchValue(_this.propertyId);
            propertiesService.readDataProperty(params['id']);
            lookupsService.getCalendarEntryTypes().subscribe(function (d) {
                _this.calendarEntryTypes = d;
            }, function (e) {
                helpers_1.handlerErrorNotify('Error');
                console.log('Error calendarEntryTypes', e);
            });
            calendarService.getCalendarByProperty(_this.propertyId).subscribe(function (d) {
                _this.bookingDays = d;
                var nextDate = _(d);
                nextDate.next();
                _this.bookingDays.some(function (booking, index) {
                    var tmpNextDate = nextDate.next();
                    var tmpStart = moment(booking.CheckIn).startOf('days');
                    var tmpEnd = moment(booking.CheckOut).startOf('days');
                    var tmpNextStart = moment(!tmpNextDate.done && tmpNextDate.value.CheckIn).startOf('days');
                    // const tmpNextEnd   = moment(!tmpNextDate.done && tmpNextDate.value.CheckOut).startOf('days');
                    if (index === 0 && _this.CheckOut.isSameOrBefore(tmpStart)) {
                        return true;
                    }
                    else if (_this.CheckIn.isBetween(tmpStart, tmpEnd, null, '[)')) {
                        _this.CheckIn = tmpEnd;
                        _this.CheckOut = tmpNextStart;
                        if (_this.CheckIn.isBefore(_this.CheckOut) || tmpNextDate.done) {
                            _this.availabilityForm.controls['CheckIn'].patchValue(tmpEnd.format('MM/DD/YYYY'));
                            _this.availabilityForm.controls['CheckOut'].patchValue(tmpEnd.add(1, 'day').format('MM/DD/YYYY'));
                            console.log('Next Date', tmpNextDate.value.CheckIn);
                            _this.minDate = tmpEnd.format('MM/DD/YYYY');
                            _this.maxDate = tmpNextDate.value.CheckIn;
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                    // if(this.CheckIn.isSameOrBefore(tmpStart) && this.CheckOut.isSameOrBefore(tmpStart)) {
                    //     console.log('True exclude array', this.CheckIn.format('MM/DD/YYYY'), this.CheckOut.format('MM/DD/YYYY'));
                    //     return true;
                    // }
                    // if(this.CheckIn.isSame(tmpNextStart) || this.CheckIn.isBetween(tmpStart, tmpEnd, null, '[)')) {
                    //     // console.log('this.CheckIn',this.CheckIn.format('MM/DD/YYYY'));
                    //     this.CheckIn = tmpNextEnd;
                    //     // this.CheckOut = tmpNextEnd.add(1, 'day');
                    //     this.availabilityForm.controls['CheckIn'].patchValue(tmpNextEnd.format('MM/DD/YYYY'));
                    //     console.log('True include array', index, this.CheckIn.format('MM/DD/YYYY'), this.CheckOut.format('MM/DD/YYYY'));
                    //     //return true;
                    // }
                    // console.log('Date start ', tmpStart.format('MM/DD/YYYY'));
                    // console.log('Date end ', tmpEnd.format('MM/DD/YYYY'));
                    //console.log('Date next start ', nextDate.next());
                    // console.log('Date next start ', this.CheckIn.format('MM/DD/YYYY'));
                    // console.log('Date next end ', this.CheckIn.isBetween(tmpStart, tmpEnd, null, '[)'));
                    // console.log('Date between ', this.CheckIn.isBetween(tmpStart, tmpEnd, null, '[)'));
                    // if(this.CheckIn.isBetween(tmpStart, tmpEnd, null, '[)')) {
                    //     console.log('Test -------------', index);
                    //     this.availabilityForm.controls['CheckIn'].patchValue(tmpEnd.format('MM/DD/YYYY'));
                    //     this.availabilityForm.controls['CheckOut'].patchValue(tmpEnd.add(1, 'days').format('MM/DD/YYYY'));
                    //     return false;
                    // }
                    // if(index === 0 && this.CheckIn < tmpStart && this.CheckOut <= tmpStart) {
                    //     // console.log('Index 1', index);
                    //     this.availabilityForm.controls['CheckIn'].patchValue(this.CheckIn.format('MM/DD/YYYY'));
                    //     this.availabilityForm.controls['CheckOut'].patchValue(this.CheckOut.format('MM/DD/YYYY'));
                    //     return false;
                    // }
                    // if(this.CheckIn > tmpStart && this.CheckIn >= tmpEnd) {
                    //     // console.log('Index 2', index);
                    //     this.availabilityForm.controls['CheckIn'].patchValue(this.CheckIn.format('MM/DD/YYYY'));
                    //     return true
                    // }
                    // console.log('Index 3', index);
                    // if(this.CheckIn.isBefore(tmpEnd.format('MM/DD/YYYY')))
                    //     this.CheckIn = tmpEnd;
                    // return true;
                });
                // this.disabledDates();
            }, function (e) {
                console.log('Error calendar', e);
            });
            _this.availabilityForm.controls['CheckIn'].patchValue(_this.CheckIn.format('MM/DD/YYYY'));
            _this.availabilityForm.controls['CheckOut'].patchValue(_this.CheckOut.format('MM/DD/YYYY'));
        });
    }
    AvailabilityComponent.prototype.ngOnInit = function () {
        // console.log('',this.availabilityForm.value);
    };
    AvailabilityComponent.prototype.ngAfterContentInit = function () {
        // console.log('Content Init qq', this.availabilityForm.value);
    };
    AvailabilityComponent.prototype.ngAfterViewInit = function () {
        // console.log('View Init qq', this.availabilityForm.value);
    };
    AvailabilityComponent.prototype.ngAfterContentChecked = function () {
        // console.log('Content Checked qq', this.availabilityForm.value);
    };
    AvailabilityComponent.prototype.ngAfterViewChecked = function () {
        // console.log('View Checked qq', this.availabilityForm.value);
    };
    AvailabilityComponent.prototype.toggleUpdateBlock = function () {
        if (this.UpdateBlock === null) {
            // this.disabledDates();
            this.UpdateBlock = true;
        }
        else {
            // this.disabledDates();
            this.UpdateBlock = !this.UpdateBlock;
        }
        if (this.UpdateBlock === true && this.isCalendarView === false) {
            this.isCalendarView = true;
        }
        // this.availabilityForm.controls['CheckIn'].valueChanges.subscribe(data => {
        //     // this.availabilityForm.controls['CheckOut'].patchValue(moment(data).add(1,'day').format('MM/DD/YYYY'));
        //     this.disabledDatesIn.some((disabledDate) => {
        //         if(moment(data).add(1,'day').diff(moment(disabledDate), 'days') <= 0) {
        //             setTimeout(() => {
        //                 console.log('Disabled date 100 IF',);
        //                 $('.checkOut').data("DateTimePicker")
        //                               .minDate(moment(data).add(1,'day').format('MM/DD/YYYY'))
        //                               .maxDate(moment(disabledDate).format('MM/DD/YYYY'));
        //             }, 100);
        //             return true;
        //         }
        //         else {
        //             setTimeout(() => {
        //                 console.log('Disabled date 100 ELSE',);
        //                 $('.checkOut').data("DateTimePicker").maxDate(false);
        //             }, 100);
        //         }
        //     });
        //
        //     setTimeout(() => {
        //         console.log('Disabled date',);
        //         $('.checkOut').data("DateTimePicker").minDate(moment(data).add(1,'day').format('MM/DD/YYYY'));
        //     }, 200);
        //
        //     const index = _.findIndex(this.bookingDays, (o) => { return o.Id == null });
        //     if(index < 0) {
        //         console.log('if',);
        //         this.bookingDays.push(this.availabilityForm.value);
        //     }
        //     else {
        //         console.log('else',);
        //         this.bookingDays[index] = this.availabilityForm.value;
        //     }
        //     // console.log('Booking Days CheckIN ',this.bookingDays);
        // });
        //
        //
        // this.availabilityForm.controls['CheckOut'].valueChanges.subscribe(data => {
        //     // this.availabilityForm.controls['CheckIn'].patchValue(moment(data).add(-1,'day').format('MM/DD/YYYY'));
        //     // const index = _.findIndex(this.bookingDays, (o) => { return o.Id == null });
        //     // if(index < 0)
        //     //     this.bookingDays.push(this.availabilityForm.value);
        //     // else
        //     //     this.bookingDays[index] = this.availabilityForm.value;
        //     // console.log('Booking Days CheckIN after', this.availabilityForm.value);
        //     // console.log('Booking Days CheckOUT ',this.bookingDays);
        //     // this.bookingDays[this.bookingDays.length - 1].CheckOut = data;
        // })
        // console.log('Data update ', data);
        // console.log('Booking update ', _.unionBy(this.bookingDays, data, 'Id'));
        // console.log('Booking update ', this.bookingDays);
    };
    AvailabilityComponent.prototype.disabledDates = function () {
        var _this = this;
        this.disabledDatesIn = [];
        this.disabledDatesOut = [];
        this.bookingDays.forEach(function (booking) {
            var checkInMoment = moment(booking.CheckIn);
            var checkOutMoment = moment(booking.CheckOut);
            var diff = checkOutMoment.diff(checkInMoment, 'days');
            _this.disabledDatesIn.push(checkInMoment.format('MM/DD/YYYY'));
            _this.disabledDatesOut.push(checkOutMoment.format('MM/DD/YYYY'));
            for (var i = 1; i < diff; i++) {
                _this.disabledDatesIn.push(checkInMoment.add(1, 'day').format('MM/DD/YYYY'));
                _this.disabledDatesOut.push(checkOutMoment.add(-1, 'day').format('MM/DD/YYYY'));
            }
        });
    };
    AvailabilityComponent.prototype.toggleCalendarView = function () {
        this.isCalendarView = !this.isCalendarView;
        if (this.isCalendarView === false && this.UpdateBlock === true) {
            this.UpdateBlock = false;
        }
    };
    AvailabilityComponent.prototype.saveForm = function (formData) {
        var _this = this;
        // formData.EntryType = 4;
        formData.EntryType = formData.EntryType.Id;
        if (formData.Id) {
            this.calendarService.updateCalendar(formData).subscribe(function (d) {
                _.replace(_this.bookingDays, { Id: formData.Id }, d);
                _this.UpdateBlock = !_this.UpdateBlock;
            }, function (e) {
                console.log('Error save availability', e);
            });
        }
        else {
            this.calendarService.addCalendar(formData).subscribe(function (d) {
                _this.bookingDays.push(d);
                _this.UpdateBlock = !_this.UpdateBlock;
            }, function (e) {
                console.log('Error save availability', e);
            });
        }
        console.log("save form", formData);
    };
    AvailabilityComponent.prototype.handlerEditAvailability = function (id) {
        var _this = this;
        this.calendarService.getCalendar(id).subscribe(function (d) {
            _this.availabilityForm = new forms_1.FormGroup({
                Id: new forms_1.FormControl(d.Id),
                PropertyId: new forms_1.FormControl(_this.propertyId),
                CheckIn: new forms_1.FormControl(d.CheckIn),
                CheckOut: new forms_1.FormControl(d.CheckOut),
                EntryType: new forms_1.FormControl(d.EntryType),
                Notes: new forms_1.FormControl(d.Notes),
            });
            _this.isCalendarView = true;
            if (_this.UpdateBlock === null) {
                _this.UpdateBlock = true;
            }
            else {
                _this.UpdateBlock = !_this.UpdateBlock;
            }
        }, function (e) {
            console.log('Error availability', e);
        });
        //     this.availabilityForm.controls['CheckIn'].valueChanges.subscribe(data => {
        //         this.bookingDays[this.bookingDays.length - 1].CheckIn = data;
        //     });
        //
        //     this.availabilityForm.controls['CheckOut'].valueChanges.subscribe(data => {
        //         this.bookingDays[this.bookingDays.length - 1].CheckOut = data;
        //     })
    };
    AvailabilityComponent.prototype.handlerDeleteAvailability = function (id) {
        this.bookingDays = _.remove(this.bookingDays, function (o) {
            return o.Id != id;
        });
        this.calendarService.deleteAvailability(id).subscribe(function (d) {
            console.log('Deleted Availability  ', d);
        }, function (e) {
            console.log('Deleted Availability ERROR', e);
        });
    };
    AvailabilityComponent.prototype.autosize = function (e) {
        e.target.style.cssText = 'height:' + (e.target.scrollHeight) + 'px';
    };
    AvailabilityComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: ' availability-cmp ',
            templateUrl: 'availability.component.html',
            styleUrls: ['availability.component.css']
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, properties_service_1.PropertiesService, lookups_service_1.LookupsService, calendar_service_1.CalendarService, forms_1.FormBuilder])
    ], AvailabilityComponent);
    return AvailabilityComponent;
}());
exports.AvailabilityComponent = AvailabilityComponent;
//# sourceMappingURL=availability.component.js.map