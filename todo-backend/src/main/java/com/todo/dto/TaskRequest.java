package com.todo.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TaskRequest {

    @NotBlank(message = "Title is required")
    private String title;

    private String definition;

    private LocalDate dueDate;

    private String status = "pending";

    private Boolean reminder = false;
}
