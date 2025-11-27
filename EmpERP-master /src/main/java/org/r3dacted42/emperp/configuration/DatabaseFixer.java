package org.r3dacted42.emperp.configuration;

import lombok.RequiredArgsConstructor;
import org.r3dacted42.emperp.entity.UserAccount;
import org.r3dacted42.emperp.repository.UserAccountRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class DatabaseFixer implements CommandLineRunner {

    private final UserAccountRepository userAccountRepository;
    private final org.springframework.security.crypto.password.PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        List<UserAccount> users = userAccountRepository.findAll();
        boolean adminExists = false;
        String adminEmail = "amantiwari8005@gmail.com";

        for (UserAccount user : users) {
            if (user.getUsername().equals(adminEmail)) {
                user.setActive(true);
                userAccountRepository.save(user);
                adminExists = true;
                System.out.println("Ensured admin is active: " + user.getUsername());
            } else {
                userAccountRepository.delete(user);
                System.out.println("Deleted user: " + user.getUsername());
            }
        }

        if (!adminExists) {
            UserAccount newAdmin = UserAccount.builder()
                    .username(adminEmail)
                    .password(passwordEncoder.encode("google-auth-user"))
                    .active(true)
                    .build();
            userAccountRepository.save(newAdmin);
            System.out.println("Created admin user: " + adminEmail);
        }
    }
}
