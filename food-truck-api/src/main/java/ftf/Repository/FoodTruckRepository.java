package ftf.Repository;

import ftf.classes.FoodTruck;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import java.util.List;

@Repository
public interface FoodTruckRepository extends JpaRepository<FoodTruck, Long> {
    Optional<FoodTruck> findFoodTruckByTruckName(String name);
    Optional<FoodTruck> findFoodTruckByTruckID(Long ID);
    List<FoodTruck> findFoodTrucksByMinRangeIsGreaterThanEqualAndMaxRangeIsLessThanEqual(Double min, Double max);
    List<FoodTruck> findFoodTrucksByMaxRangeIsLessThanEqual(Double max);
    List<FoodTruck> findFoodTrucksByFoodType(String foodType);
    List<FoodTruck> findByTruckNameContains(String name);
    List<FoodTruck> findByTruckNameLike(String name);
}
