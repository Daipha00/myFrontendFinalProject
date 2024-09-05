import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { firstValueFrom } from 'rxjs';

// Define the Member interface here
interface Member {
  memberName: string;
  gender: string;
  address: string;
  dob: string; // or Date, depending on how you store it in Firebase
  issueDate: string; // or Date
  expiryDate: string; // or Date
}

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  updateForm: FormGroup;
  membershipNo: string = ''; // Store membershipNo to identify which member to update

  constructor(
    private fb: FormBuilder,
    private db: AngularFireDatabase,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.updateForm = this.fb.group({
      memberName: ['', Validators.required],
      gender: ['', Validators.required],
      address: ['', Validators.required],
      dob: ['', Validators.required],
      issueDate: ['', Validators.required],
      expiryDate: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Fetch the membershipNo from route parameters
    this.route.paramMap.subscribe(params => {
      this.membershipNo = params.get('membershipNo') || '';

      // Load member data if membershipNo is present
      if (this.membershipNo) {
        this.loadMemberData();
      }
    });
  }

  // Load member data for editing
  async loadMemberData(): Promise<void> {
    const snapshot = await firstValueFrom(
      this.db.list('Members', ref => ref.orderByChild('membershipNo').equalTo(this.membershipNo)).valueChanges()
    );

    if (snapshot.length > 0) {
      const member = snapshot[0] as Member; // Type assertion here
      this.updateForm.patchValue({
        memberName: member.memberName,
        gender: member.gender,
        address: member.address,
        dob: new Date(member.dob),
        issueDate: new Date(member.issueDate),
        expiryDate: new Date(member.expiryDate)
      });
    }
  }

  // Function to handle form submission
  onUpdate(): void {
    if (this.updateForm.valid) {
      // Prepare the data object
      const updatedMemberData = {
        ...this.updateForm.value,
        dob: new Date(this.updateForm.value.dob).toISOString().split('T')[0], // Convert date to ISO string
        issueDate: new Date(this.updateForm.value.issueDate).toISOString().split('T')[0],
        expiryDate: new Date(this.updateForm.value.expiryDate).toISOString().split('T')[0]
      };

      // Update data in Firebase Realtime Database
      this.db.list('Members', ref => ref.orderByChild('membershipNo').equalTo(this.membershipNo)).snapshotChanges()
        .subscribe(actions => {
          actions.forEach(action => {
            if (action.payload.exists()) {
              const key = action.key;
              if (key) {
                this.db.list('Members').update(key, updatedMemberData)
                  .then(() => {
                    Swal.fire('Success!', 'Member data updated successfully!', 'success');
                    this.router.navigate(['/manage']); // Redirect after update
                  })
                  .catch(error => {
                    Swal.fire('Error!', 'There was an error updating the member data.', 'error');
                    console.error('Error updating member data in Firebase:', error);
                  });
              }
            }
          });
        });
    }
  }

  onCancel(): void {
    this.router.navigate(['/manage']); // Navigate back to the manage component
  }
}
