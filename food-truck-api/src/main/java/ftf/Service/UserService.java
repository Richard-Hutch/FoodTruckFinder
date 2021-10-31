package ftf.Service;

import ftf.classes.User;
import ftf.Repository.UserRepository;
import ftf.exceptions.InvalidLoginException;
import ftf.exceptions.UserNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    public Optional<User> findUser(Long userId) {
        return userRepository.findById(userId);
    }
    public Optional<User> findByUsername(String username) {return userRepository.findByUsername(username);}

    public User saveUser(User user) {

        /*checking user information and determining whether the account information
        provided is valid
         */

        return userRepository.save(user);
    }

    public User updateUser(User user) {
        Optional<User> update = userRepository.findByUserId(user.getId());

        if (!update.isPresent())
            throw new UserNotFoundException("User Not Found");

        User up = update.get();

        up.setAddress(user.getAddress());
        up.setUsername(user.getUsername());
        up.setPassword(user.getPassword());
        up.setCity(user.getCity());
        up.setName(user.getName());
        up.setState(user.getState());

        userRepository.save(up);

        return up;
    }

    public List<User> getUsers() {
        //will return all the users based on username
        return userRepository.findAll();
    }


    public List<User> findByUsernameAndPassword(String username, String password) {
        return userRepository.findByUsernameAndPassword(username, password);
    }
}
