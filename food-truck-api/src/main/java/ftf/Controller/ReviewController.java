package ftf.Controller;
import ftf.Service.FoodTruckService;
import ftf.Service.ReviewService;
import ftf.Service.UserService;
import ftf.classes.FoodTruck;
import ftf.classes.Review;
import ftf.classes.User;
import ftf.exceptions.FoodTruckNotFoundException;
import ftf.exceptions.UserNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
public class ReviewController {
    @Autowired
    ReviewService reviewService;

    @Autowired
    FoodTruckService ftService;

    @Autowired
    UserService userServe;


    @GetMapping("/reviews/truck/id/{truckID}")
    public Optional<Review> getReviewByID(@PathVariable Long truckID){
        return reviewService.findById(truckID);
    }

    @GetMapping("/reviews/truck/name/{truckName}")
    public List<Review> getReviewByTruckName(@PathVariable String truckName){
        //store information of the truck into the class
        Optional<FoodTruck> truck = ftService.getTruckDetailsByName(truckName);
        return reviewService.findByTruck(truck.get());
    }


    @GetMapping("/reviews/user/{username}")
    public List<Review> getReviewsFromUser(@PathVariable String username) {
        Optional<User> userReview = userServe.findByUsername(username);

        if (!userReview.isPresent())
            throw new UserNotFoundException("User Not Found");

        return reviewService.findByUserId(userReview.get().getId());
    }

    @PostMapping("/postReview/{username}/{truckName}/{rating}/{description}")
    public Optional<Review> saveReview(@PathVariable String username,
                             @PathVariable String truckName,
                             @PathVariable double rating,
                             @PathVariable String description){
        return reviewService.saveReview(username, truckName, rating, description);
    }

    @GetMapping("/reviews/avgRating/{truckName}")
    public Optional<Double> getAverageRatingTruck(@PathVariable String truckName) {
        Optional<FoodTruck> ft = ftService.getTruckDetailsByName(truckName);

        if (!ft.isPresent())
            throw new FoodTruckNotFoundException("Food Truck not found");

        return Optional.of(reviewService.getAvgFoodTruckRating(ft.get()));
    }
}
