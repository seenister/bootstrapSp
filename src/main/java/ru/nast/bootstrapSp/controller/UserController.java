package ru.nast.bootstrapSp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.nast.bootstrapSp.DTO.UserDTO;
import ru.nast.bootstrapSp.mapping.UserMapper;
import ru.nast.bootstrapSp.model.User;
import ru.nast.bootstrapSp.service.UserService;

import java.util.List;

@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserMapper userMapper;


    @GetMapping("/users/current")
    public User getCurrentUser() {
        return userService.getById(userService.getCurrentUser().getId());
    }

    @GetMapping("/users/{id}")
    public User getUserById(@PathVariable("id") long id) {
        return userService.getById(id);
    }

    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @PostMapping("/users/new")
    public ResponseEntity<HttpStatus> saveUser(@RequestBody UserDTO userDTO) {
        userService.add(userMapper.mappingCreateUser(userDTO));
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/users/{id}")
    public ResponseEntity<HttpStatus> updateUser(@RequestBody UserDTO userDTO) {
        userService.update(userMapper.mappingEditUser(userDTO));
        return ResponseEntity.ok().build();
    }


    @DeleteMapping ("/users/{id}")
    public ResponseEntity<HttpStatus> deleteUser(@RequestBody UserDTO userDTO) {
        userService.delete(userService.getById(userDTO.getId()));
        return ResponseEntity.ok().build();
    }

}

