const API_URL = '/books';
const bookList = document.getElementById('bookList');
const emptyState = document.getElementById('emptyState');
const modal = document.getElementById('bookModal');
const borrowModal = document.getElementById('borrowModal');
const bookForm = document.getElementById('bookForm');
const borrowForm = document.getElementById('borrowForm');
const modalTitle = document.getElementById('modalTitle');
const addBookBtn = document.getElementById('addBookBtn');
const toast = document.getElementById('toast');
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');

let books = [];
let isEditing = false;
let currentBorrowId = null;

// Event Listeners
document.addEventListener('DOMContentLoaded', fetchBooks);
addBookBtn.addEventListener('click', () => openModal());
// Close modals on outside click
window.addEventListener('click', (e) => {
    if (e.target === modal) closeModal('bookModal');
    if (e.target === borrowModal) closeModal('borrowModal');
});
bookForm.addEventListener('submit', handleFormSubmit);
borrowForm.addEventListener('submit', handleBorrowSubmit);
searchInput.addEventListener('input', applyFilters);
categoryFilter.addEventListener('change', applyFilters);

// Fetch Books
async function fetchBooks() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Failed to fetch books');
        books = await response.json();
        applyFilters();
    } catch (error) {
        showToast(error.message, 'error');
    }
}

// Render Books
function renderBooks(booksToRender) {
    bookList.innerHTML = '';

    if (booksToRender.length === 0) {
        emptyState.classList.remove('hidden');
        return;
    }

    emptyState.classList.add('hidden');

    booksToRender.forEach(book => {
        const card = document.createElement('div');
        card.className = 'book-card';

        let statusHtml = '';
        let actionBtnHtml = '';

        if (book.available) {
            statusHtml = `<span class="book-status status-available"><i class="fa-solid fa-check"></i> Available</span>`;
            actionBtnHtml = `<button class="btn-small btn-borrow" onclick="openBorrowModal(${book.id})">Borrow</button>`;
        } else {
            statusHtml = `
                <div class="book-meta">
                    <span class="book-status status-unavailable">Checked Out</span>
                    <div class="borrower-info"><i class="fa-solid fa-user"></i> ${book.borrowedBy || 'Unknown'}</div>
                </div>`;
            actionBtnHtml = `<button class="btn-small btn-return" onclick="returnBook(${book.id})">Return</button>`;
        }

        card.innerHTML = `
            <div class="book-icon">
                <i class="fa-solid fa-book"></i>
            </div>
            <div class="book-category">${book.category || 'General'}</div>
            <div class="book-title">${book.title}</div>
            <div class="book-author">by ${book.author}</div>
            
            ${statusHtml}

            <div class="card-actions">
                ${actionBtnHtml}
                <div class="actions-right">
                    <button class="btn-icon" onclick="openModal(${book.id})">
                        <i class="fa-solid fa-pen"></i>
                    </button>
                    <button class="btn-icon delete" onclick="deleteBook(${book.id})">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
        bookList.appendChild(card);
    });
}

// Apply Filters
function applyFilters() {
    const term = searchInput.value.toLowerCase();
    const cat = categoryFilter.value;

    const filtered = books.filter(book => {
        const matchesTerm = book.title.toLowerCase().includes(term) || book.author.toLowerCase().includes(term);
        const matchesCat = cat === '' || (book.category === cat);
        return matchesTerm && matchesCat;
    });
    renderBooks(filtered);
}

// Handle Add/Edit Form
async function handleFormSubmit(e) {
    e.preventDefault();

    const bookData = {
        id: document.getElementById('bookId').value || null,
        title: document.getElementById('title').value,
        author: document.getElementById('author').value,
        category: document.getElementById('category').value
    };

    saveBook(bookData, isEditing ? 'PUT' : 'POST');
}

// Borrow Flow
function openBorrowModal(id) {
    currentBorrowId = id;
    document.getElementById('borrowBookId').value = id;
    document.getElementById('borrowerName').value = '';
    borrowModal.classList.add('active');
}

async function handleBorrowSubmit(e) {
    e.preventDefault();
    const borrowerName = document.getElementById('borrowerName').value;

    try {
        const response = await fetch(`${API_URL}/${currentBorrowId}/borrow`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ borrowerName })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Borrowing failed');
        }

        showToast('Book Borrowed!');
        closeModal('borrowModal');
        fetchBooks();
    } catch (error) {
        showToast(error.message, 'error');
    }
}

// Custom Confirmation Utility
function showConfirm(title, message, onConfirm) {
    const confirmModal = document.getElementById('confirmModal');
    const confirmTitle = document.getElementById('confirmTitle');
    const confirmMessage = document.getElementById('confirmMessage');
    const confirmProceed = document.getElementById('confirmProceed');

    confirmTitle.textContent = title;
    confirmMessage.textContent = message;
    confirmModal.classList.add('active');

    // Use a fresh replacement button to clear previous listeners efficiently
    const newBtn = confirmProceed.cloneNode(true);
    confirmProceed.parentNode.replaceChild(newBtn, confirmProceed);

    newBtn.onclick = () => {
        closeModal('confirmModal');
        onConfirm();
    };
}

// Return Flow
async function returnBook(id) {
    const book = books.find(b => b.id == id);
    const msg = book ? `Are you sure you want to return '${book.title}'?` : 'Return this book?';

    showConfirm('Confirm Return', msg, async () => {
        try {
            const response = await fetch(`${API_URL}/${id}/return`, {
                method: 'PUT'
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || 'Return failed');
            }

            showToast('Book Returned!');
            fetchBooks();
        } catch (error) {
            showToast(error.message, 'error');
        }
    });
}

async function saveBook(data, method, successMsg) {
    try {
        const url = method === 'PUT' ? `${API_URL}/${data.id}` : API_URL;

        const response = await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || JSON.stringify(errorData) || 'Action failed');
        }

        showToast(successMsg || (method === 'POST' ? 'Book Added' : 'Book Updated'));
        closeModal('bookModal');
        fetchBooks();
    } catch (error) {
        showToast(error.message, 'error');
    }
}

// Delete Book
async function deleteBook(id) {
    const book = books.find(b => b.id == id);
    const msg = book ? `Delete '${book.title}' permanently?` : 'Delete this book?';

    showConfirm('Confirm Delete', msg, async () => {
        try {
            const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || 'Failed to delete');
            }
            showToast('Book deleted');
            fetchBooks();
        } catch (error) {
            showToast(error.message, 'error');
        }
    });
}

// Modal Functions
function openModal(id = null) {
    const modal = document.getElementById('bookModal');
    modal.classList.add('active');

    if (id) {
        const book = books.find(b => b.id === id);
        modalTitle.textContent = 'Edit Book';
        document.getElementById('title').value = book.title;
        document.getElementById('author').value = book.author;
        document.getElementById('category').value = book.category || 'Fiction';
        document.getElementById('bookId').value = book.id;
        isEditing = true;
    } else {
        modalTitle.textContent = 'Add New Book';
        bookForm.reset();
        document.getElementById('bookId').value = '';
        isEditing = false;
    }
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
}

// Toast
function showToast(message, type = 'success') {
    toast.textContent = message;
    toast.style.backgroundColor = type === 'error' ? 'var(--danger)' : 'var(--success)';
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
}

// Expose globals
window.deleteBook = deleteBook;
window.openModal = openModal;
window.openBorrowModal = openBorrowModal;
window.returnBook = returnBook;
window.closeModal = closeModal;
