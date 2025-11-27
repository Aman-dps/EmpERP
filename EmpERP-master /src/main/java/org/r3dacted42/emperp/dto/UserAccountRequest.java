package org.r3dacted42.emperp.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;

public record UserAccountRequest(
        @JsonProperty("username")
        @NotEmpty(message = "username is required")
        @Size(min = 5, max = 255, message = "username must be 5 to 255 chars long")
        String username,

        @JsonProperty("password")
        @NotEmpty(message = "password is required")
        @Size(min = 8, max = 255, message = "password must be 8 to 255 chars long")
        String password
) {
}
