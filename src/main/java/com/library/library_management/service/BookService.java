package com.library.library_management.service;

import com.library.library_management.dto.BookDTO;
import com.library.library_management.dto.BorrowRequest;
import com.library.library_management.exception.BookAlreadyBorrowedException;
import com.library.library_management.exception.BookNotFoundException;
import com.library.library_management.model.Book;
import com.library.library_management.repository.BookRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class BookService {

    private final BookRepository bookRepository;

    public BookService(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    // Add a book
    public BookDTO addBook(BookDTO bookDTO) {
        Book book = mapToEntity(bookDTO);
        Book savedBook = bookRepository.save(book);
        return mapToDTO(savedBook);
    }

    // Get all books
    public List<BookDTO> getAllBooks() {
        return bookRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    // Update a book (Metadata only)
    public BookDTO updateBook(Long id, BookDTO bookDTO) {
        Book existingBook = bookRepository.findById(id)
                .orElseThrow(() -> new BookNotFoundException("Book not found with id: " + id));

        existingBook.setTitle(bookDTO.getTitle());
        existingBook.setAuthor(bookDTO.getAuthor());
        existingBook.setCategory(bookDTO.getCategory());
        // Business fields (available, borrowedBy) are NOT updated here

        Book updatedBook = bookRepository.save(existingBook);
        return mapToDTO(updatedBook);
    }

    // Borrow a book
    public BookDTO borrowBook(Long id, BorrowRequest borrowRequest) {
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new BookNotFoundException("Book not found with id: " + id));

        if (!book.isAvailable()) {
            throw new BookAlreadyBorrowedException("Book is already borrowed by: " + book.getBorrowedBy());
        }

        book.setAvailable(false);
        book.setBorrowedBy(borrowRequest.getBorrowerName());

        return mapToDTO(bookRepository.save(book));
    }

    // Return a book
    public BookDTO returnBook(Long id) {
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new BookNotFoundException("Book not found with id: " + id));

        book.setAvailable(true);
        book.setBorrowedBy(null);

        return mapToDTO(bookRepository.save(book));
    }

    // Delete a book
    public void deleteBook(Long id) {
        if (!bookRepository.existsById(id)) {
            throw new BookNotFoundException("Book not found with id: " + id);
        }
        bookRepository.deleteById(id);
    }

    // Mapper methods
    private BookDTO mapToDTO(Book book) {
        return new BookDTO(
                book.getId(),
                book.getTitle(),
                book.getAuthor(),
                book.getCategory(),
                book.isAvailable(),
                book.getBorrowedBy());
    }

    private Book mapToEntity(BookDTO bookDTO) {
        return new Book(bookDTO.getTitle(), bookDTO.getAuthor(), bookDTO.getCategory());
    }
}
