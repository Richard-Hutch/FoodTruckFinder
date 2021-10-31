package ftf.classes;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonView;
import lombok.Data;

@Data
@Entity
@Table(name = Routes.TABLE_NAME)
public class Routes {
    public static final String TABLE_NAME = "Routes";
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

    //-decimal degrees format-
    //reference: -90 to 90 for latitude
    //           -180 to 180 for longitude
    @Column(name = "latitude")
    double latitude;

    @Column(name = "longitude")
    double longitude;
}
