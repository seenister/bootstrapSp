package ru.nast.bootstrapSp.service;

import org.springframework.security.core.userdetails.UserDetailsService;
import ru.nast.bootstrapSp.model.User;

import java.util.List;

public interface UserService extends UserDetailsService {
    List<User> getAllUsers();
    void add(User user);
    void delete(User user);
    void update(User user);
    User getById(long id);
    User getByName(String name);
    User getCurrentUser();
}

