package com.project.EatIt.service;

import com.project.EatIt.config.JwtProvider;
import com.project.EatIt.model.User;
import com.project.EatIt.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService{

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtProvider jwtProvider;

    @Override
    public User findUserByJWT(String jwt) throws Exception {

        String email = jwtProvider.getEmailFromJwtToken(jwt);
        User user = findUserByEmail(email);

        if(user == null) throw new Exception("User not found!");
        return user;
    }

    @Override
    public User findUserByEmail(String email) throws Exception {
        User user = userRepository.findByEmail(email);

        if(user ==  null) throw new Exception("User not found!");
        return user;
    }
}
