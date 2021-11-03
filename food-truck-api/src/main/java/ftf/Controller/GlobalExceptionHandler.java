package ftf.Controller;

import ftf.exceptions.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.time.LocalDateTime;


@ControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {
    @ExceptionHandler(InvalidLoginException.class)
    public ResponseEntity<Object>handleInvalidLoginException(InvalidLoginException ex,
                                                        WebRequest request){
        return new ResponseEntity<>(new ApiError(ex.getMessage(), HttpStatus.NOT_FOUND, LocalDateTime.now()), HttpStatus.NOT_FOUND);
    }
    @ExceptionHandler(UsernameTakenException.class)
    public ResponseEntity<Object>handleUsernameTakenException(UsernameTakenException ex,
                                                              WebRequest request){
        return new ResponseEntity<>(new ApiError(ex.getMessage(),HttpStatus.CONFLICT,LocalDateTime.now()),HttpStatus.CONFLICT);

    }

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<Object>handleUserNotFoundException(UserNotFoundException ex,
                                                             WebRequest request){
        return new ResponseEntity<>(new ApiError(ex.getMessage(),HttpStatus.NOT_FOUND,LocalDateTime.now()),HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(FoodTruckNotFound.class)
    public ResponseEntity<Object>handleUserNotFoundException(FoodTruckNotFound ex,
                                                             WebRequest request){
        return new ResponseEntity<>(new ApiError(ex.getMessage(),HttpStatus.NOT_FOUND,LocalDateTime.now()),HttpStatus.NOT_FOUND);
    }

}
