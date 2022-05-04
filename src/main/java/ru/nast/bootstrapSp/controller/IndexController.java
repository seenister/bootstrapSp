package ru.nast.bootstrapSp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import ru.nast.bootstrapSp.model.Role;
import ru.nast.bootstrapSp.model.User;
import ru.nast.bootstrapSp.service.UserService;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("index")
public class IndexController {

    @Autowired
    UserService userService;

    @GetMapping("/login")
    public String showSignUpForm() {
        return "login";
    }

    @GetMapping("/getAllUsers")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @PostMapping("/adduser")
    public String saveUser(
            @RequestParam("name") String name,
            @RequestParam("lastname") String lastname,
            @RequestParam("age") int age,
            @RequestParam("email") String email,
            @RequestParam("password") String password,
            @RequestParam(required = false, name = "ADMIN") String ADMIN,
            @RequestParam(required = false, name = "USER") String USER) {
        Set<Role> roles = new HashSet<>();
        if (ADMIN != null) {
            roles.add(new Role(1L, ADMIN));
        }
        if (USER != null) {
            roles.add(new Role(2L, USER));
        }
        if (ADMIN == null && USER == null) {
            roles.add(new Role(2L, USER));
        }

        User user = new User(name, lastname, age, email, password, roles);

        userService.add(user);

        return " ";
    }


    @PostMapping("/edit")
    @PreAuthorize("hasRole('ADMIN')")
    public String updateUser(@ModelAttribute("user") User user,
                             @RequestParam(required = false, name = "ADMIN") String ADMIN,
                             @RequestParam(required = false, name = "USER") String USER) {
        Set<Role> roles = new HashSet<>();
        if (ADMIN != null) {
            roles.add(new Role(1L, ADMIN));
        }
        if (USER != null) {
            roles.add(new Role(2L, USER));
        }
        if (ADMIN == null && USER == null) {
            roles.add(new Role(2L, USER));
        }
        user.setRoles(roles);
        userService.update(user);
        return " ";
    }

    @GetMapping("/edit/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public User showUpdateForm(@PathVariable("id") long id) {
        return userService.getById(id);
    }

    @DeleteMapping("{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public String deleteUser(@PathVariable("id") long id) {
        userService.delete(userService.getById(id));
        return "redirect:/index";
    }
}
