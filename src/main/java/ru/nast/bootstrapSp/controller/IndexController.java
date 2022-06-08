package ru.nast.bootstrapSp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.nast.bootstrapSp.DTO.CreateUserDTO;
import ru.nast.bootstrapSp.DTO.DeleteUserDTO;
import ru.nast.bootstrapSp.DTO.EditUserDTO;
import ru.nast.bootstrapSp.mapping.UserMapper;
import ru.nast.bootstrapSp.model.User;
import ru.nast.bootstrapSp.service.UserService;

import java.util.List;

@RestController
@RequestMapping("index-page")
public class IndexController {

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

    @PostMapping("/users/add")
    public ResponseEntity<HttpStatus> saveUser(@RequestBody CreateUserDTO createUserDTO) {
        userService.add(userMapper.mappingCreateUser(createUserDTO));
        return ResponseEntity.ok().build();
    }

    @PostMapping("/users/edit/{id}")
    public ResponseEntity<HttpStatus> updateUser(@RequestBody EditUserDTO editUserDTO) {
        userService.update(userMapper.mappingEditUser(editUserDTO));
        return ResponseEntity.ok().build();
    }

    @PostMapping("/users/delete/{id}")
    public ResponseEntity<HttpStatus> deleteUser(@RequestBody DeleteUserDTO deleteUserDTO) {
        userService.delete(userService.getById(deleteUserDTO.getId()));
        return ResponseEntity.ok().build();
    }
}