import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Timestamp } from '@angular/fire/firestore';
import { firstValueFrom } from 'rxjs'; // To work with observables synchronously
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-member-registration',
  templateUrl: './member-registration.component.html',
  styleUrls: ['./member-registration.component.css']
})
export class MemberRegistrationComponent implements OnInit {
  memberForm: FormGroup;
  Router: any;

  constructor(private fb: FormBuilder, private db: AngularFireDatabase, private router: Router) {
    this.memberForm = this.fb.group({
      memberName: ['', Validators.required],
      gender: ['', Validators.required],
      address: ['', Validators.required],
      dob: ['', Validators.required],
      issueDate: ['', Validators.required],
      expiryDate: ['', Validators.required]
    });
  }

  ngOnInit(): void { }

  // Function to generate a random 6-digit membership number
  async generateMembershipNo(): Promise<string> {
    let isUnique = false;
    let membershipNo = '';

    while (!isUnique) {
      // Generate a random 6-digit number
      membershipNo = Math.floor(100000 + Math.random() * 900000).toString();

      // Check if this membership number already exists in the database
      isUnique = await this.checkUniqueMembershipNo(membershipNo);
    }

    return membershipNo;
  }

  // Function to check if a generated membership number is unique
  async checkUniqueMembershipNo(membershipNo: string): Promise<boolean> {
    const snapshot = await firstValueFrom(this.db.list('Members', ref => ref.orderByChild('membershipNo').equalTo(membershipNo)).valueChanges());
    return snapshot.length === 0;
  }

  // Function to handle form submission
  async onSubmit(): Promise<void> {
    try {
      if (this.memberForm.valid) {
        const membershipNo = await this.generateMembershipNo(); // Generate unique membershipNo
        const memberData = {
          ...this.memberForm.value,
          membershipNo, 
          dob: new Date(this.memberForm.value.dob).toISOString().split('T')[0], 
          issueDate: new Date(this.memberForm.value.issueDate).toISOString().split('T')[0],
          expiryDate: new Date(this.memberForm.value.expiryDate).toISOString().split('T')[0]
        };
        
        await this.db.list('Members').push(memberData);
        Swal.fire('Success!', 'Member data successfully saved to Firebase!', 'success');
        this.router.navigate(['container/manage'])
        console.log('Member data successfully saved to Firebase!');
        this.memberForm.reset();
      } else {
        console.log('Form is invalid:', this.memberForm.errors);
      }
    } catch (error) {
      Swal.fire('Error!', 'There was an error saving the member data.', 'error');
      console.error('Error saving member data to Firebase:', error);
    }
  }
  

  onCancel(): void {
    this.memberForm.reset(); // Reset the form fields
    console.log('Form has been reset');
  }

 
  
  
}
