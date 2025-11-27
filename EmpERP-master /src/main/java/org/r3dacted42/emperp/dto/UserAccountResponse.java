package org.r3dacted42.emperp.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public record UserAccountResponse(
        @JsonProperty("id")
        Long id,
        @JsonProperty("username")
        String username,
        @JsonProperty("token")
        String token
) {
}
