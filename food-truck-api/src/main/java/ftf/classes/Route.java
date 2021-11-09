package ftf.classes;
import javax.persistence.*;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name = Route.TABLE_NAME)
public class Route {
    public static final String TABLE_NAME = "Route";
    @Id
    @GeneratedValue(generator = TABLE_NAME + "_GENERATOR")
    @SequenceGenerator(
            name = TABLE_NAME + "_GENERATOR",
            sequenceName = TABLE_NAME + "_SEQUENCE"
    )
    @Column(name = "routeID")
    Long routeID;

    @JoinColumn(name = "truckID")
    @ManyToOne
    FoodTruck truck;

    //one route has many locations
    @OneToMany(mappedBy = "route")
//    @JoinColumn(name = "locationID", referencedColumnName = "routeID")
    List<Location> location;
}
