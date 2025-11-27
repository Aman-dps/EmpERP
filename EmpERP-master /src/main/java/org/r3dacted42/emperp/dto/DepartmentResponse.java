package org.r3dacted42.emperp.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public record DepartmentResponse(
        @JsonProperty("department_id")
        Long departmentId,
        @JsonProperty("name")
        String name,
        @JsonProperty("capacity")
        Long capacity,
        @JsonProperty("strength")
        Long strength
) {
}
