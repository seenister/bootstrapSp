package ru.nast.bootstrapSp.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import ru.nast.bootstrapSp.DTO.CreateUserDTO;
import ru.nast.bootstrapSp.DTO.DeleteUserDTO;
import ru.nast.bootstrapSp.DTO.EditUserDTO;
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

    @Autowired
    PasswordEncoder passwordEncoder;

    @GetMapping("/getCurrentUser")
    public User getCurrentUser() {
        User currentUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return userService.getById(currentUser.getId());
    }
    @GetMapping("/getUser/{id}")
    public User getUserById(@PathVariable("id") long id) {
        return userService.getById(id);
    }

    @GetMapping("/getAllUsers")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @PostMapping("/adduser")
    public ResponseEntity<HttpStatus> saveUser(@RequestBody CreateUserDTO createUserDTO) {
        Set<Role> roles = new HashSet<>();

        if (createUserDTO.getAdmin() != null){
            roles.add(new Role(1L, "ADMIN"));
        }
        if (createUserDTO.getUser() != null){
            roles.add(new Role(2L, "USER"));
        }
        User user = new User(createUserDTO.getName(), createUserDTO.getLastname(), createUserDTO.getAge(),
                createUserDTO.getEmail(), createUserDTO.getPassword(), roles);
        userService.add(user);

        return ResponseEntity.ok().build();
    }


    @PostMapping("/edit/{id}")
    public ResponseEntity<HttpStatus> updateUser(@RequestBody EditUserDTO editUserDTO) {
        Set<Role> roles = new HashSet<>();
        if (editUserDTO.getAdmin() != null){
            roles.add(new Role(1L, "ADMIN"));
        }
        if (editUserDTO.getUser() != null){
            roles.add(new Role(2L, "USER"));
        }
        User user = new User(editUserDTO.getId(),editUserDTO.getName(), editUserDTO.getLastname(), editUserDTO.getAge(),
                editUserDTO.getEmail(), editUserDTO.getPassword(), roles);
        userService.update(user);


        return ResponseEntity.ok().build();
    }

    @PostMapping("/deleteUser/{id}")
    public ResponseEntity<HttpStatus> deleteUser(@RequestBody DeleteUserDTO deleteUserDTO) {
        userService.delete(userService.getById(deleteUserDTO.getId()));
        return ResponseEntity.ok().build();
    }



}