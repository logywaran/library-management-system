package com.library.library_management.dto;

import jakarta.validation.constraints.NotBlank;

public class BorrowRequest {

    @NotBlank(message = "Borrower name is required")
    private String borrowerName;

    public BorrowRequest() {
    }

    public BorrowRequest(String borrowerName) {
        this.borrowerName = borrowerName;
    }

    public String getBorrowerName() {
        return borrowerName;
    }

    public void setBorrowerName(String borrowerName) {
        this.borrowerName = borrowerName;
    }
}
