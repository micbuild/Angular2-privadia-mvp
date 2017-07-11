import { Component, OnInit, Input } from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators, FormArray} from "@angular/forms";
import {LoginService} from "../../../providers/login/login.service";
import {ProposalsService} from "../../../providers/proposals/proposals.service";
import {EnquiryService} from "../../../providers/enquery/enquiry.service";

declare const moment: any;

@Component({
    moduleId: module.id,
    selector: 'proposal-cmp ',
    templateUrl: 'proposal.component.html',
    styleUrls: [ 'proposal.component.css' ]
})  

export class ProposalComponent implements OnInit{
    @Input() private data;
    public proposalForm: FormGroup;
    public proposalManagerForm: FormGroup;
	public isAgent = this.loginService.getRoles('Agent');
    public isCreateProposal = false;

    public TermsContract = [{
			Id: 1,
			Name: 'Contract',
		}, {
			Id: 2,
			Name: 'Contract 2',
		}, {
			Id: 3,
			Name: 'Contract 3',
		}, {
			Id: 4,
			Name: 'Contract 4',
		}];

	constructor( private builder: FormBuilder,
				 private loginService: LoginService,
				 private enquiryService: EnquiryService, private proposalsService: ProposalsService ) {
    }

	ngOnInit() {
		this.initForm(this.data)
		/*
		const date = moment('2017-07-10T14:23:28+00:00').utcOffset(moment().utcOffset());
		console.log('Date ', date.format())
		console.log('Moment ', moment().utc().format())
		console.log('Moment ', moment().utcOffset())
		*/
    }

    private initForm(data) {
		this.proposalManagerForm = this.builder.group({
			EnquiryMessageThreadId: new FormControl(this.data.Id),
			CheckIn: new FormControl({ value: moment(data.Enquiry.CheckIn).format('MM/DD/YYYY'), disabled: this.isAgent}),
			CheckOut: new FormControl({ value: moment(data.Enquiry.CheckOut).format('MM/DD/YYYY'), disabled: this.isAgent}),
			CustomerName: new FormControl({ value: data.Enquiry.ClientName, disabled: true}),
			PropertyName: new FormControl({ value: data.Enquiry.PropertyName, disabled: true}),
			RentalCost: new FormControl({
				value: data.Enquiry.Proposal && data.Enquiry.Proposal.RentalCost || 0,
				disabled: this.isAgent
			}),
			Fees: new FormControl({
				value: data.Enquiry.Proposal && data.Enquiry.Proposal.Fees || 0,
				disabled: this.isAgent
			}),
			ExchangeFeePercentage: new FormControl({
				value: data.Enquiry.Proposal && data.Enquiry.Proposal.ExchangeFeePercentage || 0,
				disabled: this.isAgent
			}),
			TermsList: new FormArray([]),
			DepositPercentage: new FormControl({
				value: data.Enquiry.Proposal && data.Enquiry.Proposal.DepositPercentage || null,
				disabled: this.isAgent
			}),
			BalancePercentage: new FormControl({
				value: data.Enquiry.Proposal && data.Enquiry.Proposal.BalancePercentage || 0,
				disabled: this.isAgent
			}),
			BalanceDaysBeforeCheckIn: new FormControl({
				value: data.Enquiry.Proposal && data.Enquiry.Proposal.BalanceDaysBeforeCheckIn || 0,
				disabled: this.isAgent
			}),
			DefaultTerms: new FormControl({
				value: data.Enquiry.Proposal && data.Enquiry.Proposal.DefaultTerms || null,
				disabled: this.isAgent
			}),
			CancellationPolicy: new FormControl({
				value: data.Enquiry.Proposal && data.Enquiry.Proposal.CancellationPolicy || null,
				disabled: this.isAgent
			}),
		})
	}

    private addTerm() {
		const control = <FormArray>this.proposalManagerForm.controls['TermsList'];
		control.push(new FormControl('Term 1'));
		console.log('Add Term')
	}

    private removeTerm(i: number) {
		const control = <FormArray>this.proposalManagerForm.controls['TermsList'];
		control.removeAt(i);
		console.log('remove Term')
	}

	private createProposal() {
		this.enquiryService.createProposal({EnquiryMessageThreadId: this.data.Id});
		setTimeout(() => {
			this.initForm(this.enquiryService.enquiry)
		}, 500)
	}

	private acceptProposal() {
	    console.log('Accept Proposal')
    }

    private submitProposal() {
		console.log('Submit Proposal',)
		this.enquiryService.submitProposal({EnquiryMessageThreadId: this.data.Id});

		setTimeout(() => {
			this.initForm(this.enquiryService.enquiry)
		}, 500)
    }

    private saveProposal() {
	    console.log('Save Proposal');
		this.proposalsService.saveProposals(this.proposalManagerForm.value).subscribe(
			d => {
				console.log('Submit Proposal ', d)
			},
			e => {
				console.log('Submit Proposal Error', e)
			}
		)
    }

    private declineProposal() {
	    console.log('Decline Proposal')
		this.enquiryService.declineProposal({EnquiryThreadId: this.data.Id})
    }

    private cancelProposal() {
	    console.log('Cancel Proposal')
		this.enquiryService.cancelProposal({EnquiryThreadId: this.data.Id})
    }
}