import { Component, OnInit, ViewChild } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/compat/database";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { Router, ActivatedRoute } from "@angular/router";
import Swal from "sweetalert2";
import { ViewDetailsComponent } from "../view-details/view-details.component";

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {
  members = new MatTableDataSource<any>([]); // Table data source
  displayedColumns: string[] = ['membershipNo', 'memberName', 'address', 'gender', 'dob', 'issueDate', 'expiryDate', 'actions'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private db: AngularFireDatabase // Add AngularFireDatabase to constructor
  ) {}

  ngOnInit(): void {
    this.fetchMembers(); // Fetch data when component initializes
  }

  // Method to fetch members from Firebase
  fetchMembers(): void {
    this.db.list('Members').valueChanges().subscribe((data: any[]) => {
      this.members.data = data; // Assign fetched data to table data source
      this.members.paginator = this.paginator; // Set paginator after data is loaded
    }, (error) => {
      Swal.fire('Error!', 'There was an error fetching data from Firebase.', 'error');
      console.error('Error fetching member data from Firebase:', error);
    });
  }

  deleteMemberByMembershipNo(membershipNo: string): void {
    // Reference to the Members node in Firebase Realtime Database
    const membersRef = this.db.list('Members');
  
    // Fetch all members
    membersRef.snapshotChanges().subscribe(actions => {
      actions.forEach(action => {
        const key = action.key; // Get the unique key of the member node
        const data = action.payload.val(); // Get the data of the member node
  
        // Check if the data is of type object (not null or other type)
        if (typeof data === 'object' && data !== null) {
          const memberData = data as { membershipNo: string }; // Type assertion for data object
  
          // Check if the membershipNo matches
          if (memberData.membershipNo === membershipNo && key !== null) {
            // Delete the member using the key
            this.db.list('Members').remove(key)
              .then(() => {
                Swal.fire('Deleted!', 'Member has been deleted successfully.', 'success');
                console.log(`Member with membershipNo ${membershipNo} deleted successfully.`);
              })
              .catch(error => {
                Swal.fire('Error!', 'There was an error deleting the member.', 'error');
                console.error('Error deleting member:', error);
              });
          }
        }
      });
    });
  }

  viewMember(member: any) {
    const dialogRef = this.dialog.open(ViewDetailsComponent, {
      width: '400px',
      data: member
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  
}
