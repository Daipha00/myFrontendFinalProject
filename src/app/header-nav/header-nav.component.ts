import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-header-nav',
  templateUrl: './header-nav.component.html',
  styleUrl: './header-nav.component.css'
})
export class HeaderNavComponent implements OnInit{
  ngOnInit(): void {}

  @ViewChild('sidenav') sidenav!: MatSidenav;

//   toggleButton() {
//     this.sidenav.toggle();
// }
}