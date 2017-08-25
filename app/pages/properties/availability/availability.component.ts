import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { PropertiesService } from '../../../providers/properties/properties.service';
import {LoginService} from "../../../providers/login/login.service";
import {LookupsService} from "../../../providers/lookups/lookups.service";
import {handlerErrorFieds, handlerErrorNotify} from "../../../helpers/helpers";

declare const $:any;

@Component({
    moduleId: module.id,
    selector: ' availability-cmp ',
    templateUrl: 'availability.component.html',
    styleUrls: [ 'availability.component.css' ]
})

export class AvailabilityComponent implements OnInit {
    private availabilityForm: FormGroup;
    private UpdateTypeList: Array<{ Id: number, Name: string }>;
    private UpdateBlock: boolean = null;
    private isCalendarView: boolean = true;

    constructor ( public propertiesService: PropertiesService,
                  private loginService: LoginService,
                  private route: ActivatedRoute) {
    }

    ngOnInit(){
        this.UpdateTypeList = [
            {Id: 1, Name: 'Internal Booking'},
            {Id: 2, Name: 'External Booking'},
            {Id: 3, Name: 'Owner Present'},
            {Id: 4, Name: 'Not Available for Rent'},
            {Id: 5, Name: 'Other'}
        ];
        this.availabilityForm = new FormGroup({
            CheckIn: new FormControl('08/16/2017'),
            CheckOut: new FormControl('08/18/2017'),
            UpdateType: new FormControl({
                Id: 1,
                Name: 'Internal Booking',
            }),
            Notes: new FormControl(),
            isAgency: new FormControl(false),
            FirstName: new FormControl(),
            LastName: new FormControl(),
            Email: new FormControl(),
            Phone: new FormControl(),
            CompanyName: new FormControl(),
            ContactName: new FormControl(),
            AgencyEmail: new FormControl(),
            AgencyPhone: new FormControl()
        });

        // this.availabilityForm.valueChanges.subscribe(data => {
        //     console.log('Form changes', data);
        //     this.output = data
        // });

    }

    private autosize(e){
        e.target.style.cssText = 'height:' + (e.target.scrollHeight) + 'px';
    }

    toggleUpdateBlock() {
        if (this.UpdateBlock === null) {
            this.UpdateBlock = true;
        } else {
            this.UpdateBlock = !this.UpdateBlock;
        }
        if (this.UpdateBlock === true && this.isCalendarView === false) {
            this.isCalendarView = true;
        }
    }

    toggleCalendarView() {
        this.isCalendarView = !this.isCalendarView;
        if (this.isCalendarView === false && this.UpdateBlock === true) {
            this.UpdateBlock = false;
        }
    }
}
