package org.r3dacted42.emperp.service;

import lombok.RequiredArgsConstructor;
import org.r3dacted42.emperp.dto.UserAccountRequest;

import org.r3dacted42.emperp.entity.UserAccount;
import org.r3dacted42.emperp.mapper.UserAccountMapper;
import org.r3dacted42.emperp.repository.UserAccountRepository;
import org.r3dacted42.emperp.security.JWTService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserAccountService {
    private final UserAccountRepository userAccountRepository;
    private final UserAccountMapper userAccountMapper;
    private final PasswordEncoder passwordEncoder;
    private final JWTService jwtService;

    public Object createUserAccount(UserAccountRequest userAccountRequest) {
        if (userAccountRepository.existsByUsername(userAccountRequest.username())) {
            return "username taken";
        }
        UserAccount userAccount = userAccountMapper.toEntity(userAccountRequest);
        userAccount.setPassword(passwordEncoder.encode(userAccount.getPassword()));

        // If this is the first user, make them active. Otherwise, inactive.
        if (userAccountRepository.count() == 0) {
            userAccount.setActive(true);
        } else {
            userAccount.setActive(false);
        }

        UserAccount savedUser = userAccountRepository.save(userAccount);

        if (!savedUser.isActive()) {
            return "Account created but pending approval.";
        }

        return userAccountMapper.toResponse(
                savedUser,
                jwtService.generateToken(userAccount.getUsername()));
    }

    public Object validateCredentials(UserAccountRequest userAccountRequest) {
        UserAccount userAccount = userAccountRepository.findByUsername(userAccountRequest.username()).orElse(null);
        if (userAccount == null)
            return "username not found";
        if (!userAccount.isActive())
            return "Account is pending approval";
        if (!passwordEncoder.matches(userAccountRequest.password(), userAccount.getPassword()))
            return "password mismatch";
        return userAccountMapper.toResponse(
                userAccount,
                jwtService.generateToken(userAccount.getUsername()));
    }

    public boolean userAccountExists(String username) {
        return userAccountRepository.existsByUsername(username);
    }

    public String approveUser(String username) {
        UserAccount user = userAccountRepository.findByUsername(username).orElse(null);
        if (user == null)
            return "User not found";
        user.setActive(true);
        userAccountRepository.save(user);
        return "User approved";
    }

    public java.util.List<UserAccount> getPendingUsers() {
        return userAccountRepository.findByActiveFalse();
    }
}
