import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { AgreementComponent } from '../agreement/agreement.component';
import { ROUTE_ANIMATIONS_ELEMENTS } from '../core/core.module';

@Component({
  selector: 'anms-stake',
  templateUrl: './stake.component.html',
  styleUrls: ['./stake.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StakeComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;

  myForm: FormGroup;
  isEditing: boolean;
  @Input() isMetamaskConnected ;
  @Output() onSave = new EventEmitter<any>();
  constructor(private fb: FormBuilder,private dialog: MatDialog) {
    this.myForm = this.createForm();
  }

  ngOnInit() {}
  createForm() {
    return this.fb.group({
      amount: [
        15000,
        [Validators.required, Validators.min(15000)]
      ],
      duration: [30, [Validators.required, Validators.min(30)]]
    });
  }

  cancelEditing() {
    this.isEditing = false;
  }




  openDialog(): void {
    const dialogRef = this.dialog.open(AgreementComponent, {

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result,'The dialog was closed');
      if(result==true){
        this.onSave.emit(this.myForm.value);
      }
    });
  }
}
