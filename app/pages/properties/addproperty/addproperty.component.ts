import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { MainService } from '../../../providers/homeservice';
import { PropertiesService } from '../../../providers/properties/properties.service';

declare var $:any;


@Component({
    moduleId: module.id,
    selector: ' addproperty-cmp ',
    templateUrl: 'addproperty.component.html',
    styleUrls: [ 'addproperty.component.css' ]
})

export class AddpropertyComponent implements OnInit{
    //@ViewChild('propertyInfo') propertyInfo;
    //@ViewChild('propertyMargeting') propertyMargeting;
    //@ViewChild('propertyImage') propertyImage;

    //@ViewChild('pointsOfInterest') pointsOfInterest;
    //@ViewChild('localActivities') localActivities;
    //@ViewChild('features') features;
    //@ViewChild('services') services;
    //@ViewChild('trip') trip;

    // private villadescription;
    // private reading:boolean = false;
    // private datatableInited:boolean = false;
    
    // private properties = [];

    // private contacts;
    // private bedrooms;
    // private bathrooms;

    private isActive = true;
    private isLoad = true;

    public propertyForm = new FormGroup ({
        OwnerName: new FormControl('OwnerName'),
        InternalName: new FormControl('InternalName'),
        Name: new FormControl('Name'),
        Address: new FormControl('Address'),
        RegionId: new FormControl(1),
        RegionName: new FormControl('RegionName'),
        Headline: new FormControl('Headline'),
        Summary: new FormControl('Summary'),
        Description: new FormControl('Description'),
        OtherInfo: new FormControl('OtherInfo'),
        CollaboratorInitials: new FormControl(''),
        BoxUrl: new FormControl('BoxUrl'),
        Bathrooms: new FormControl(1),
        Bedrooms: new FormControl(2),
        Sleeps: new FormControl(6),
        Capacity: new FormControl(3),
        LivingAreaSize: new FormControl(4),
        DiningCapacity: new FormControl(5),
        KitchenInfo: new FormControl('KitchenInfo'),
        ChildrenAllowed: new FormControl(2),
        SmokingAllowed: new FormControl(false),
        WheelchairAccessible: new FormControl(true),
        PetsAllowed: new FormControl(false),
        EventsAllowed: new FormControl(true),
    });

    constructor ( private mainService: MainService,
                  private propertyService: PropertiesService ) {

    }

    // steve@freelancemvc.net, agent1@freelancemvc.net 
    ngOnInit(){
        // this.contacts = [];
        // this.bedrooms = [];
        // this.bathrooms = [];
        // this.villadescription = this.propertyInfo.villadescription;
    }

    private saveInfo() {
        console.log('Save FORM',);
        /*
        $(".title-error").removeClass("title-error");
        $(".metafilter-names li a.has-error").removeClass("has-error");

        let validateErrors = $(".tab-content .has-error");
        if ( validateErrors.length ) {
            $.notify({
                icon: "notifications",
                message: $(".tab-content .has-error").length + " Validation Errors Found"

            },{
                type: 'danger',
                timer: 3000,
                placement: {
                    from: 'top',
                    align: 'right'
                }
            });

            for (let i = 0; i < validateErrors.length; i++) {
                let ele = validateErrors[i];

                while (!ele.className.includes('card-content')) {
                    if (ele.className.includes('panel-group')) {
                        $(ele).addClass('title-error');
                    }
                    ele = ele.parentElement;
                }

                let eleTabName = document.getElementsByClassName(ele.id + "-tab-name");
                $(eleTabName).addClass("has-error");
            }

            return;
        }

        $('.has-error').removeClass("has-error");

        let metaData = [];
        for (let i = 1; i < 125; i++) {
            let available = this.pointsOfInterest.metafilters[i] 
                        ||  this.features.metafilters[i] 
                        ||  this.services.metafilters[i] 
                        ||  this.villadescription.metafilters[i] 
                        ||  this.localActivities.metafilters[i] 
                        ||  this.trip.metafilters[i] ;
            metaData.push({ 
                Available: available ? 1 : 0,
                MetaDataId: i
            });
        }

        let contacts = this.propertyInfo.contacts.map( (item, index) => { 
            return {
                EmailAddress: item.email,
                FirstName: item.firstName,
                JobTitle: item.jobTitle,
                LastName: item.lastName,
                Telephone: parseInt(item.telephone)
            };
        });

        let bathrooms = this.propertyInfo.bathrooms.map( (item, index) => {
            return {
                Description: item.description,
                Name: item.name,
                PropertyRoomType: 2
            }
        });

        let bedrooms = this.propertyInfo.bedrooms.map( (item, index) => {
            return {
                Description: item.description,
                Name: item.name,
                PropertyRoomType: 1
            }
        });
        
        let poi = this.pointsOfInterest.metafilterHeading.PoITypes.map( (item, index) => {
            return {
                Available: item.checked ? 1 : 0,
                Distance: item.distance,
                Name: item.typeName,
                PointOfInterestTypeId: item.Id
            };
        })
        let data = {
            Active: this.isActive,
            AgencyPackUrl: this.propertyMargeting.agencyPackUrl,
            Benefits: this.features.metafilterHeading.uniqueBenefits,
            Contacts: contacts,
            Housekeeping: this.services.metafilterHeading.housekeeperState,
            Images: this.propertyImage.images,
            LiftAvailable: this.features.metafilterHeading.liftAvailable,
            MetaData: metaData,
            OtherHousekeepingInfo: this.services.metafilterHeading.housekeepOtherInfo,
            Owner: this.propertyInfo.owner,
            UserId: this.propertyInfo.owner.Id,
            PointsOfInterest: poi,
            Region: this.propertyInfo.region,
            RegionId: this.propertyInfo.region.Id,
            RegionName: this.propertyInfo.regionName,
            Rooms: bedrooms.concat(bathrooms),
        }*/
        this.propertyService.addProperty(this.propertyForm.value).subscribe(
            d => { 
                $.notify({
                    icon: "notifications",
                    message: "Property Added Successfully"

                },{
                    type: 'success',
                    timer: 3000,
                    placement: {
                        from: 'top',
                        align: 'right'
                    }
                });
                this.mainService.readData();
            },
            e => { console.log("error:", e); }
        );

        console.log(this.propertyForm.value);
    }

    private continueInfo() {

    }

    private discardInfo() {

    }

    private activeChange(e) {
        this.isActive = e.target.checked;
    }
}