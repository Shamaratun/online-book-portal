import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Modal from 'bootstrap/js/dist/modal';
import { AddBook, Book } from '../../../model/class';
import { AddBookService } from './service/add-book.service';
import { Router } from '@angular/router';
import { UserService } from '../../user/user-dashboard/service/user.service';

@Component({
  selector: 'app-admin-add-book',
  imports: [FormsModule, CommonModule,NgFor],
  templateUrl: './admin-add-book.component.html',
  styleUrl: './admin-add-book.component.css',
})
export class AdminAddBookComponent {
  book: AddBook = new AddBook();
  books: AddBook[] = [];
  getBooks: Book[] = [];
  editingIndex: number | null = null;

  constructor(
    private addBookService: AddBookService,
    private router: Router,
    private bookService: UserService
  ) { }

  ngOnInit(): void {
 
    this.loadBooks()
  }

  trackByBookId(index: number, book: AddBook): number {
    return book.id;
  }

  get editingBook(): boolean {
    return this.editingIndex !== null;
  }

  openAddModal(): void {
    this.book = new AddBook();
    this.editingIndex = null;
    this.openModal();
  }

  openEditModal(book: Book): void {
    this.book = new AddBook(book);
    this.book.formatAuthorIds();
    this.editingIndex = book.id;
    this.openModal();
  }

  deleteBook(id: number): void {
    this.addBookService.deleteBook(id).subscribe({
      next: () => {
        console.log('Book deleted successfully');
        this.loadBooks(); // optional method to refresh the book list
      },
      error: (err) => {
        console.error('Failed to delete book:', err);
      }
    });
  }


  loadBooks(): void {
    this.bookService.getAllBooks().subscribe({
      next: (data) => {
        console.log('Fetched books:', data);
        this.getBooks = data;
      },
      error: (err) => console.error('Failed to load books:', err)
    });
  }


  onSubmit(): void {
 

    if (this.editingBook && this.editingIndex !== null) {
      // Update existing book
      this.addBookService.editBook(this.book).subscribe({
        next: (updatedBook) => {

          console.log('Book updated successfully');
          this.closeModal();
        },
        error: (err) => {
          console.error('Failed to update book:', err);
        }
      });
    } else {
      
   this.addBookService.addBook(this.book).subscribe({
    next: (res) => {
      console.log('Book added:', res);
      this.loadBooks();
      this.closeModal();
    },
    error: (err) => {
      console.error('Error adding book:', err);
      alert('Failed to add book. Please check all fields and try again.');
    }
  });
}
  }
  openModal(): void {
    const modal = new Modal(document.getElementById('bookModal')!);
    modal.show();
  }

  closeModal(): void {
    const modalElement = document.getElementById('bookModal');
    const modalInstance = Modal.getInstance(modalElement!);
    modalInstance?.hide();
  }
}
