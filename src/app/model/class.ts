export interface Book {
  quantity?: number;
   bookImageUrl: string;
   authorName: string;
  id: number;
  bookName: string;
  bookIsbnNumber: number;
  bookPrice: number;
  bookRating: number;
  bookCategory: string;
  bookQuantity: number;
  createdAt: string;
}

// src/app/models/book.model.ts

// src/app/models/book.model.ts

export class AddBook {
  id: number = 0;
  bookName: string = '';
  bookImageUrl: string='';
   authorName: string = '';
  bookIsbnNumber: number = 0;
  bookPrice: number = 0;
  bookRating: number = 0;
  bookCategory: string = '';
  bookQuantity: number = 1;
  bookAuthorIds: number[] = [];
 
  // Optional helper for template input (e.g., comma-separated authors)
  bookAuthorIdsString: string = '';

  constructor(init?: Partial<Book>) {
    Object.assign(this, init);
  }

  // Converts comma-separated string into number array
  parseAuthorIds() {
    this.bookAuthorIds = this.bookAuthorIdsString
      .split(',')
      .map(id => +id.trim())
      .filter(id => !isNaN(id));
  }


  // Converts number array back into comma-separated string
  formatAuthorIds() {
    this.bookAuthorIdsString = this.bookAuthorIds.join(', ');
  }
}
export class AddAuthor {
     // <— Must exist (optional or required)
  authorName: string = '';
  authorNid: number = 0;
  authorBio: string = '';
  address: string = '';

  constructor(init?: Partial<Author>) {
    Object.assign(this, init);
  }
    }
  

export interface Author {
  authorId: number;
  authorName: string;
  authorNid: number;
  authorBio: string;
  address: string;
}

export interface OrderResponse {
  orderId: number;
  orderPrice: number;
  userId: number;
  bookIds: number[];
  createdAt: string;
}