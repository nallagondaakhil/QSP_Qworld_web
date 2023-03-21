import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: 'app-edit-subscriber-management',
  templateUrl: './edit-subscriber-management.component.html',
  styleUrls: ['./edit-subscriber-management.component.scss']
})
export class EditSubscriberManagementComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.buildEditForm();
  }

  fromDate = new FormControl(new Date());
  editUserForm!:FormGroup;
  
  
  editGeneralServiceForm!: FormGroup;
  editTechnicalServiceForm!: FormGroup;

  breadcrumbList: any = [
    { label: "Service Management" },
    { label: "Edit Payroll Group" },
  ];

  titleWithBack = { title: "Edit Subscriber" };

  ngOnInit(): void {
  }

  active = 1;
  serviceTypes = [
    { id: 1, value: "apiController", label: "API controller" },
    { id: 2, value: "dummy controller", label: "dummy controller" },
  ];
  serviceGroups = [
    { id: 1, value: "payrollGroup", label: "Payroll Group" },
    { id: 2, value: "payrollGroup1", label: "Payroll Group1" },
  ];
  businessEnitities = [
    { id: 1, value: "quess", label: "Quess" },
    { id: 2, value: "quess1", label: "Quess1" },
  ];
  products = [
    { id: 1, value: "qpay", label: "QPay" },
    { id: 2, value: "qpay1", label: "QPay1" },
  ];
  transactionPeriods = [
    { id: 1, value: "month", label: "Month" },
    { id: 2, value: "year", label: "Year" },
  ];

  buildEditForm() {
    this.editGeneralServiceForm = this.formBuilder.group({
      serviceType: ["apiController", Validators.required],
      serviceGroup: ["payrollGroup", Validators.required],
      businessEntity: ["quess", Validators.required],
      product: ["qpay", Validators.required],
      transactionLimitPeriod: ["month", Validators.required],
      transactionLimit: ["0.000", Validators.required],
      unitCost: ["0.000", Validators.required],
      serviceDescription: ["", Validators.required],
      serviceName: ["", Validators.required],
    });
    this.editTechnicalServiceForm = this.formBuilder.group({
      apiName: ["", Validators.required],
      apiDescription: ["", Validators.required],
      apiMethod: ["", Validators.required],
      apiFormat: ["", Validators.required],
      apiInput: [
        "{“empNo”.”12345”, “grossSalary”.”123432”, “incomeTax”.”12343”, providentfund”.”12654”}",
        Validators.required,
      ],
      apiOutput: [
        "{“Net Salary”.’123456”, “Employee No”.”12345”, Message”.”Payroll Processed Successfully”}",
        Validators.required,
      ],
      apiSlug: ["", Validators.required],
    });
  }

  submitGeneralServiceData() {}
  submitTechnicalServiceData() {}
  backtoTableList() {
    this.router.navigate(["/content/home/service-management"]);
  }

  navigateBack(){
    this.router.navigate(["/content/home/subscriber-management"]);
  }

}
