package ru.nast.bootstrapSp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import ru.nast.bootstrapSp.DTO.CreateUserDTO;
import ru.nast.bootstrapSp.model.Role;
import ru.nast.bootstrapSp.model.User;
import ru.nast.bootstrapSp.service.UserService;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("index-page")
public class IndexController {

    @Autowired
    UserService userService;

    @GetMapping("/getCurrentUser")
    public User getCurrentUser() {
        return (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }

    @GetMapping("/getAllUsers")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @PostMapping("/adduser")
    public ResponseEntity<String> saveUser(CreateUserDTO createUserDTO) {
        Set<Role> roles = new HashSet<>();

        if (createUserDTO.getADMIN().equals("ADMIN")){
            roles.add(new Role(1L, "ADMIN"));
        }
        if (createUserDTO.getUSER().equals("USER")){
            roles.add(new Role(2L, "USER"));
        }
        User user = new User(createUserDTO.getName(), createUserDTO.getLastname(), createUserDTO.getAge(),
                createUserDTO.getEmail(), createUserDTO.getPassword(), roles);
        userService.add(user);

        HttpHeaders headers = new HttpHeaders();
        headers.add("Location", "/index-page");
        return new ResponseEntity<String>(headers, HttpStatus.FOUND);
    }


    @PostMapping("/edit")
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
    public User showUpdateForm(@PathVariable("id") long id) {
        return userService.getById(id);
    }

    @PostMapping("/deleteUser/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable("id") long id) {
        userService.delete(userService.getById(id));

        HttpHeaders headers = new HttpHeaders();
        headers.add("Location", "/index-page");
        return new ResponseEntity<String>(headers, HttpStatus.FOUND);
    }
}
