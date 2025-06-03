import { CommonModule, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-book-details',
  imports: [NgIf],
  templateUrl: './view-book-details.component.html',
  styleUrl: './view-book-details.component.css'
})
export class ViewBookDetailsComponent {

   book: any;

  constructor(private router: Router) {
    const nav = this.router.getCurrentNavigation();
    this.book = nav?.extras?.state?.['book'];
  }

  goBack() {
  history.back();
}
shareWithFriends() {
    if (navigator.share) {
      navigator.share({
        title: 'Check out this book!',
        text: 'I found a great book for you.',
        url: window.location.href
      }).then(() => {
        console.log('Thanks for sharing!');
      }).catch(console.error);
    } else {
      alert('Sharing not supported in this browser.');
    }
  }
}


