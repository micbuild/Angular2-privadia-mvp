import {AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, OnInit} from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { PropertiesService } from '../../../providers/properties/properties.service';
import { CalendarService } from "../../../providers/calendar/calendar.service";
import { LookupsService } from "../../../providers/lookups/lookups.service";
import {handlerErrorFieds, handlerErrorNotify} from "../../../helpers/helpers";
import {LoginService} from "../../../providers/login/login.service";

declare const moment: any;
declare const $: any;
declare const _: any;

@Component({
    moduleId: module.id,
    selector: ' availability-cmp ',
    templateUrl: 'availability.component.html',
    styleUrls: [ 'availability.component.css' ]
})

export class AvailabilityComponent implements OnInit {
    private availabilityForm = new FormGroup({
        Id: new FormControl(null),
        PropertyId: new FormControl(null),
        CheckIn: new FormControl(null),
        CheckOut: new FormControl(null),
        // CheckIn: new FormControl(moment('09/09/2017 14:23', 'DD/MM/YYYY').format('DD/MM/YYYY')),
        // CheckOut: new FormControl(moment('09/09/2017 14:23', 'DD/MM/YYYY').add(1, 'day').format('DD/MM/YYYY')),
        EntryType: new FormControl({
            Id: 1,
            Name: 'Internal Booking',
        }),
        Notes: new FormControl(null),
        Reference: new FormControl(null, Validators.required),
        ViaAgency: new FormControl(null),
        ClientFirstName: new FormControl(null),
        ClientLastName: new FormControl(null),
        ClientTel: new FormControl(null),
        ClientEmail: new FormControl(null),
        AgencyCompanyName: new FormControl(null),
        AgentName: new FormControl(null),
        AgentTel: new FormControl(null),
        AgentEmail: new FormControl(null)
    });

    private CheckIn  = moment('04/12/2017', 'DD/MM/YYYY').startOf('days');
    private CheckOut = moment(this.CheckIn).add(1, 'day').startOf('days');
    private propertyId: any;

    private calendarEntryTypes: Array<{ Id: number, Name: string }>;
    private bookingDays;
    private bookingDaysClear;
    private isCalendarView: boolean = true;


    private UpdateBlock: boolean = false;
    private disabledDatesIn: any;
    private disabledDatesOut: any;

    private maxDate: any;
    private minDate: any;

    private isAgent: boolean;
    private errorForm: boolean;

    constructor ( private route: ActivatedRoute,
                  public propertiesService: PropertiesService,
                  public lookupsService: LookupsService,
                  public calendarService: CalendarService,
                  private builder: FormBuilder,
                  private loginService: LoginService) {

        this.isAgent = this.loginService.getRoles('Agent');

        route.params.subscribe(params => {
            this.propertyId = params['id'];
            this.availabilityForm.controls['PropertyId'].patchValue(this.propertyId);

            propertiesService.readDataProperty(params['id']);

            lookupsService.getCalendarEntryTypes().subscribe(
                d => {
                    this.calendarEntryTypes = d
                },
                e => {
                    handlerErrorNotify('Error ');
                    console.log('Error   calendarEntryTypes', e);
                }
            );

            calendarService.getCalendarByProperty(this.propertyId).subscribe(
                d => {
                    this.bookingDays = d;
                    this.bookingDaysClear = d;
                    // const nextDate = _(d);
                    // nextDate.next();
                    //
                    // this.bookingDays.some((booking, index) => {
                    //     const tmpNextDate = nextDate.next();
                    //
                    //     const tmpStart = moment(booking.CheckIn, 'DD/MM/YYYY').startOf('days');
                    //     const tmpEnd   = moment(booking.CheckOut, 'DD/MM/YYYY').startOf('days');
                    //
                    //     const tmpNextStart = moment(!tmpNextDate.done && tmpNextDate.value.CheckIn, 'DD/MM/YYYY').startOf('days');
                    //     // const tmpNextEnd   = moment(!tmpNextDate.done && tmpNextDate.value.CheckOut).startOf('days');
                    //
                    //     if(index === 0 && this.CheckOut.isSameOrBefore(tmpStart)) {
                    //         return true;
                    //     } else if(this.CheckIn.isBetween(tmpStart, tmpEnd, null, '[)')) {
                    //         this.CheckIn = tmpEnd;
                    //         this.CheckOut = tmpNextStart;
                    //         if(this.CheckIn.isBefore(this.CheckOut) || tmpNextDate.done) {
                    //             this.availabilityForm.controls['CheckIn'].patchValue(tmpEnd.format('DD/MM/YYYY'));
                    //             this.availabilityForm.controls['CheckOut'].patchValue(tmpEnd.add(1, 'day').format('DD/MM/YYYY'));
                    //             this.minDate = tmpEnd.format('MM/DD/YYYY');
                    //             //this.maxDate = tmpNextDate.value.CheckIn;
                    //             return true;
                    //         } else {
                    //             return false;
                    //         }
                    //     }
                    // });
                    setTimeout(() => {
                        this.bookingDays.push({CheckIn: null, CheckOut: null, EntryType: {Id: 1, Name: 'Internal Booking'}})
                    }, 2000);
                },
                e => {
                    console.log('Error calendar', e);
                }
            );
        });
    }

    ngOnInit() {
        // console.log('',this.availabilityForm.value);
    }

    handlerUpdateDate(value) {
        // console.log('Update date TEST', value);
        // console.log('Booking New In 1', this.CheckIn.format('DD/MM/YYYY'));
        // console.log('Booking New OUt 1', this.CheckOut.format('DD/MM/YYYY'));
        this.CheckIn = moment(value, 'DD/MM/YYYY').startOf('days');
        this.CheckOut = moment(this.CheckIn.format('DD/MM/YYYY'), 'DD/MM/YYYY').add(1, 'day');
        // console.log('Booking New In 2', this.CheckIn.format('DD/MM/YYYY'));
        // console.log('Booking New OUt 2', this.CheckOut.format('DD/MM/YYYY'));
        // $('.checkOut').data("DateTimePicker")
        //               .minDate(false)
        //               .maxDate(false);

        const nextDate = _(this.bookingDays);
        nextDate.next();

        this.bookingDaysClear.some((booking, index) => {
            const tmpNextDate = nextDate.next();

            const tmpStart = moment(booking.CheckIn).startOf('days');
            const tmpEnd   = moment(booking.CheckOut).startOf('days');

            const tmpNextStart = moment(!tmpNextDate.done && tmpNextDate.value.CheckIn).startOf('days');
            const tmpNextEnd   = moment(!tmpNextDate.done && tmpNextDate.value.CheckOut).startOf('days');

            console.log('Update', tmpNextStart.format("DD/MM/YYYY"));
            if(index === 0 && this.CheckOut.isSameOrBefore(tmpStart)) {
                console.log('Is Same Or Before',);
                return true;
            } else if(this.CheckOut.isBetween(tmpStart, tmpEnd, null, '[)')) {
                this.availabilityForm.controls['CheckIn'].patchValue(tmpEnd.format('DD/MM/YYYY'));
                this.availabilityForm.controls['CheckOut'].patchValue(tmpEnd.add(1, 'day').format('DD/MM/YYYY'));
                console.log('Is Between',);
                // if(this.CheckOut.isSameOrBefore(tmpNextStart) || tmpNextDate.done) {
                //     this.availabilityForm.controls['CheckOut'].patchValue(this.CheckOut.format('DD/MM/YYYY'));
                //     // this.minDate = tmpEnd.format('DD/MM/YYYY');
                //     // this.maxDate = tmpNextStart.format('DD/MM/YYYY');
                //     // console.log('date ',this.minDate);
                //     // $('.checkOut').data("DateTimePicker")
                //     //               .minDate(this.minDate)
                //     //               .maxDate(this.maxDate);
                //     return true;
                // } else {
                //     return false;
                // }
            } else if(this.CheckOut.isBefore(tmpNextStart)) {
                console.log('Is Before',);
                // this.availabilityForm.controls['CheckOut'].patchValue(this.CheckIn.format('DD/MM/YYYY'));
                // $('.checkOut').data("DateTimePicker")
                //               .minDate(this.CheckIn.format('MM/DD/YYYY'))
                //               .maxDate(tmpNextStart.format('MM/DD/YYYY'));
                return true;
            } else {
                console.log('Else',);
                return false;
            }

        });
        console.log('Booking New In 3', this.CheckIn.format('DD/MM/YYYY'));
        console.log('Booking New OUt 3', this.CheckOut.format('DD/MM/YYYY'));
        // this.bookingDays.push(this.availabilityForm.value);
    };

    toggleUpdateBlock() {
        console.log('Toggle Update Block',);

        if (this.UpdateBlock === null) {
            this.disabledDates();
            this.UpdateBlock = true;
        } else {
            this.disabledDates();
            this.UpdateBlock = !this.UpdateBlock;
            // this.bookingDays[this.bookingDays.length - 1].CheckIn = null;
            // this.bookingDays[this.bookingDays.length - 1].CheckOut = null;
            // console.log('toggle ', this.UpdateBlock,this.bookingDays)
        }


        if (this.UpdateBlock === true && this.isCalendarView === false) {
            this.isCalendarView = true;
        }

        this.availabilityForm.controls['CheckIn'].patchValue(this.CheckIn.format('DD/MM/YYYY'));
        this.availabilityForm.controls['CheckOut'].patchValue(this.CheckOut.format('DD/MM/YYYY'));
        this.handlerUpdateDate(this.CheckIn.format('DD/MM/YYYY'));
        // this.availabilityForm.controls['CheckIn'].valueChanges.subscribe(data => {
        //     // this.availabilityForm.controls['CheckOut'].patchValue(moment(data).add(1,'day').format('DD/MM/YYYY'));
        //     this.disabledDatesIn.some((disabledDate) => {
        //         if(moment(data).add(1,'day').diff(moment(disabledDate), 'days') <= 0) {
        //             setTimeout(() => {
        //                 console.log('Disabled date 100 IF',);
        //                 $('.checkOut').data("DateTimePicker")
        //                               .minDate(moment(data).add(1,'day').format('DD/MM/YYYY'))
        //                               .maxDate(moment(disabledDate).format('DD/MM/YYYY'));
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
        //         $('.checkOut').data("DateTimePicker").minDate(moment(data).add(1,'day').format('DD/MM/YYYY'));
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

        // this.availabilityForm.controls['CheckOut'].valueChanges.subscribe(data => {
        //     // this.availabilityForm.controls['CheckIn'].patchValue(moment(data).add(-1,'day').format('DD/MM/YYYY'));
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
    }

    private disabledDates() {
        console.log('toggleUpdateBlock',);
        this.disabledDatesIn = [];
        this.disabledDatesOut = [];
        this.bookingDaysClear.forEach((booking) => {
            if(booking.Id) {
                const checkInMoment = moment(booking.CheckIn).startOf('days');
                const checkOutMoment = moment(booking.CheckOut).startOf('days');
                const diff = checkOutMoment.diff(checkInMoment,'days');

                this.disabledDatesIn.push(checkInMoment.format('MM/DD/YYYY'));
                this.disabledDatesOut.push(checkOutMoment.format('MM/DD/YYYY'));
                for(let i = 1; i < diff; i++) {
                    this.disabledDatesIn.push(checkInMoment.add(1, 'day').format('MM/DD/YYYY'));
                    this.disabledDatesOut.push(checkOutMoment.add(-1, 'day').format('MM/DD/YYYY'));
                }
            }
        });
    }


    toggleCalendarView() {
        this.isCalendarView = !this.isCalendarView;
        if (this.isCalendarView === false && this.UpdateBlock === true) {
            this.UpdateBlock = false;
        }
    }

    saveForm(formData) {
        if(formData.EntryType.Id == 1 && !this.availabilityForm.valid) {
            handlerErrorNotify('There were errors with your submission, please see form for details.');
            this.errorForm = true;
            return false;
        }
        // fixes with dates
        formData.CheckIn = moment(formData.CheckIn, 'DD/MM/YYYY').format('MM/DD/YYYY');
        formData.CheckOut = moment(formData.CheckOut, 'DD/MM/YYYY').format('MM/DD/YYYY');
        // ----------------
        formData.EntryType = formData.EntryType.Id;
        if(formData.Id) {
            this.calendarService.updateCalendar(formData).subscribe(
                d => {
                    _.replace(this.bookingDays, { Id: formData.Id }, d);
                    this.UpdateBlock = !this.UpdateBlock;
                },
                e => {
                    handlerErrorFieds(e, this.availabilityForm);
                }
            );
        } else {
            this.calendarService.addCalendar(formData).subscribe(
                d => {
                    this.bookingDays.push(d);
                    this.UpdateBlock = !this.UpdateBlock;
                },
                e => {
                    handlerErrorFieds(e, this.availabilityForm);
                    handlerErrorNotify(`Error Message: ${e.Message}`);
                    console.log('Error save availability', e);
                }
            );
        }
        console.log("save form", formData)
    }

    handlerEditAvailability(id) {
        this.calendarService.getCalendar(id).subscribe(
            d => {
                this.disabledDates();
                this.availabilityForm = new FormGroup({
                    Id: new FormControl(d.Id),
                    PropertyId: new FormControl(this.propertyId),
                    CheckIn: new FormControl(moment(d.CheckIn).format('DD/MM/YYYY')),
                    CheckOut: new FormControl(moment(d.CheckOut).format('DD/MM/YYYY')),
                    EntryType: new FormControl(d.EntryType),
                    Notes: new FormControl(d.Notes),
                    Reference: new FormControl(null),
                    ViaAgency: new FormControl(null),
                    ClientFirstName: new FormControl(null),
                    ClientLastName: new FormControl(null),
                    ClientTel: new FormControl(null),
                    ClientEmail: new FormControl(null),
                    AgencyCompanyName: new FormControl(null),
                    AgentName: new FormControl(null),
                    AgentTel: new FormControl(null),
                    AgentEmail: new FormControl(null)
                });

                this.isCalendarView = true;
                if (this.UpdateBlock === null) {
                    this.UpdateBlock = true;
                } else {
                    this.UpdateBlock = !this.UpdateBlock;
                }

                setTimeout(() => {
                    this.availabilityForm.controls['CheckIn'].patchValue(moment(d.CheckIn).format('DD/MM/YYYY'));
                    this.availabilityForm.controls['CheckOut'].patchValue(moment(d.CheckOut).format('DD/MM/YYYY'));
                }, 1000);
            },
            e => {
                console.log('Error availability', e);
            }
        );
    }

    handlerDeleteAvailability(id) {
        this.bookingDays = _.remove(this.bookingDays, (o) => {
            return o.Id != id;
        });

        this.calendarService.deleteAvailability(id).subscribe(
            d => {
                console.log('Deleted Availability  ', d);
            },
            e => {
                console.log('Deleted Availability ERROR', e);

            }
        )
    }

    private autosize(e){
        e.target.style.cssText = 'height:' + (e.target.scrollHeight) + 'px';
    }

}
