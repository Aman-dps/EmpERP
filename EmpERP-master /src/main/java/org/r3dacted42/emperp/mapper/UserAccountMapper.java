package org.r3dacted42.emperp.mapper;

import org.r3dacted42.emperp.dto.UserAccountRequest;
import org.r3dacted42.emperp.dto.UserAccountResponse;
import org.r3dacted42.emperp.entity.UserAccount;
import org.springframework.stereotype.Service;

@Service
public class UserAccountMapper {
    public UserAccount toEntity(final UserAccountRequest request) {
        return UserAccount.builder()
                .username(request.username())
                .password(request.password())
                .build();
    }
    public UserAccountResponse toResponse(final UserAccount entity, final String token) {
        return new UserAccountResponse(
                entity.getId(),
                entity.getUsername(),
                token
        );
    }
}
