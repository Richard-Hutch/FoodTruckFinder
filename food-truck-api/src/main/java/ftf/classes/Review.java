package ftf.classes;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = Review.TABLE_NAME)
public class Review {
    public static final String TABLE_NAME = "Review";

    @Id
    @GeneratedValue(generator = TABLE_NAME + "_GENERATOR")
    @SequenceGenerator(
            name = TABLE_NAME + "_GENERATOR",
            sequenceName = TABLE_NAME + "_SEQUENCE"
    )
    @Column(name = "reviewID")
    Long reviewID;

    @Column(name = "rating")
    double rating;

    @JoinColumn(name = "truckID")
    @ManyToOne
    FoodTruck truck;

    @Column(name = "description")
    String reviewDescription;

    @JoinColumn(name = "userID")
    @ManyToOne
    User user;

}
