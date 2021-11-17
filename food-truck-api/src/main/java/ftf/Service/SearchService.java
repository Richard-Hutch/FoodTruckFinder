package ftf.Service;

import ftf.Repository.FoodTruckRepository;
import ftf.classes.FoodTruck;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class SearchService {

    @Autowired
    FoodTruckRepository foodTruckRepository;

    public List<FoodTruck> searchTrucks(String searchTrucks) {

        String[] searchTrucksList = searchTrucks.split(" ");

        ArrayList<FoodTruck> foodTrucks = new ArrayList<>();

        for (String str : searchTrucksList) {
            foodTrucks.addAll(foodTruckRepository.findByTruckNameLike(str));
            foodTrucks.addAll(foodTruckRepository.findByTruckNameContains(str));
            foodTrucks.addAll(foodTruckRepository.findFoodTrucksByFoodType(str));
            foodTrucks.addAll(foodTruckRepository.findFoodTrucksByFoodTypeContains(str));
        }

        Set<FoodTruck> foodTruckSet = new HashSet<>(foodTrucks);

        return new ArrayList<>(foodTruckSet);
    }

}
