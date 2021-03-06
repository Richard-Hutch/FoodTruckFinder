package ftf.Repository;
import ftf.classes.FoodTruck;
import ftf.classes.Review;
import java.util.List;
import org.jetbrains.annotations.NotNull;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {

    Optional<Review> findByReviewID(Long reviewId);

    List<Review> findByTruck(FoodTruck truck);

    List<Review> findByUserId(Long userId);

    List<Review> findReviewsByRatingGreaterThan(double rating);
}