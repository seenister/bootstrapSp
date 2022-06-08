package ru.nast.bootstrapSp.mapping;

import org.springframework.stereotype.Component;
import ru.nast.bootstrapSp.DTO.UserDTO;
import ru.nast.bootstrapSp.model.Role;
import ru.nast.bootstrapSp.model.User;

import java.util.HashSet;
import java.util.Set;

@Component
public class UserMapper {
    public User mappingEditUser(UserDTO editUserDTO){
        Set<Role> roles = new HashSet<>();
        if (editUserDTO.getAdmin() != null){
            roles.add(new Role(1L, "ADMIN"));
        }
        if (editUserDTO.getUser() != null){
            roles.add(new Role(2L, "USER"));
        }
        User user = new User(editUserDTO.getId(),editUserDTO.getName(), editUserDTO.getLastname(), editUserDTO.getAge(),
                editUserDTO.getEmail(), editUserDTO.getPassword(), roles);
        return user;
    }
    public User mappingCreateUser(UserDTO createUserDTO){
        Set<Role> roles = new HashSet<>();

        if (createUserDTO.getAdmin() != null){
            roles.add(new Role(1L, "ADMIN"));
        }
        if (createUserDTO.getUser() != null){
            roles.add(new Role(2L, "USER"));
        }
        User user = new User(createUserDTO.getName(), createUserDTO.getLastname(), createUserDTO.getAge(),
                createUserDTO.getEmail(), createUserDTO.getPassword(), roles);
        return user;
    }
}