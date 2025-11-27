package org.r3dacted42.emperp.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.Date;

public record EmployeeSalaryRequest(
        @JsonProperty("employee_id") @NotNull(message = "employee id is required") String employeeId,

        @JsonProperty("payment_date") @NotNull(message = "payment date is required") @JsonFormat(pattern = "yyyy-MM-dd") Date paymentDate,

        @JsonProperty("amount") @NotNull(message = "salary amount is required") Double amount,

        @JsonProperty("description") @Size(max = 255, message = "description must be at most 255 chars long") String description) {
}
