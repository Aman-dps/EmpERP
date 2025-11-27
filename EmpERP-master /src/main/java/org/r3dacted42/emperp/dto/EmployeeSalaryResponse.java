package org.r3dacted42.emperp.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.Date;

public record EmployeeSalaryResponse(
                @JsonProperty("id") Long id,
                @JsonProperty("employee_id") String employeeId,
                @JsonProperty("payment_date") Date paymentDate,
                @JsonProperty("amount") Double amount,
                @JsonProperty("description") String description) {
}
