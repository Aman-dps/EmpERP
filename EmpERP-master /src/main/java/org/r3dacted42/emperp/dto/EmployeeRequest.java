package org.r3dacted42.emperp.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.*;

public record EmployeeRequest(
        @JsonProperty("employee_id")
        @NotEmpty(message = "employee id is required")
        @Size(min = 3, max = 255, message = "employee id must be 3 to 255 chars long")
        String employeeId,

        @JsonProperty("first_name")
        @NotEmpty(message = "first name is required")
        @Size(min = 1, max = 255, message = "first name must be 1 to 255 chars long")
        String firstName,

        @JsonProperty("last_name")
        @Size(max = 255, message = "last name must be at most 255 chars long")
        String lastName,

        @JsonProperty("email")
        @NotEmpty(message = "email is required")
        @Email(message = "email must be valid")
        String email,

        @JsonProperty("title")
        @Size(max = 255, message = "title must be at most 255 chars long")
        String title,

        @JsonProperty("department_id")
        @NotNull(message = "department id is required")
        Long departmentId
) {
}
