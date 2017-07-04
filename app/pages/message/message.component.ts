import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {EnquiryService} from "../../providers/enquery/enquiry.service";

declare const $:any;

@Component({
    moduleId: module.id,
    selector: 'message-cmp',
    templateUrl: 'message.component.html',
    styleUrls: [ 'message.component.css' ]
})

export class MessageComponent implements OnInit{
    constructor ( private router: Router, private enquiryService: EnquiryService) {
        enquiryService.readDataEnquiries();
        router.events.subscribe((val) => {
            const hash = window.location.hash;
            hash && $('ul.nav a[href="' + hash + '"]').tab('show');
    }); }

    ngOnInit(){
        $('.sidebar .sidebar-wrapper, .main-panel').scrollTop(0);
        /*
        setTimeout(()=> {
            let dataTableQuery: any = $('#datatables');
            const tableWidget = dataTableQuery.DataTable({
                bLengthChange: false,
                ordering: false,
                info: false,
            });
        }, 10)
        */
    }
}
