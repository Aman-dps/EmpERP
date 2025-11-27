package org.r3dacted42.emperp.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record DepartmentRequest(
        @JsonProperty("name")
        @NotEmpty(message = "department name is required")
        @Size(min = 1, max = 255, message = "department name must be 1 to 255 chars long")
        String name,

        @JsonProperty("capacity")
        @NotNull(message = "department capacity is required")
        Long capacity
) {
}
