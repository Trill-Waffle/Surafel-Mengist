class FluentRestaurants {
    constructor(jsonData) {
        this.data = jsonData;
    }
    filter(f) {
        return new FluentRestaurants(this.data.filter(f));
    }
    // It takes a string, stateStr
    // returns a new FluentRestaurants object in which 
    // all restaurants are located in the given state, stateStr

    //fromState(stateStr: string): FluentRestaurants
    fromState(stateStr) {
        return new FluentRestaurants(this.data.filter(rest => lib220.getProperty(rest, 'state').found ? lib220.getProperty(rest, 'state').value === stateStr ? true : false : false));

    }
    // It takes a number, rating
    // returns a new FluentRestaurants object that holds 
    // restaurants with ratings which are less than or equal to rating.

    //ratingLeq(rating: number): FluentRestaurants
    ratingLeq(rating) {

        return new FluentRestaurants(this.data.filter(rest => lib220.getProperty(rest, 'stars').found ? lib220.getProperty(rest, 'stars').value <= rating ? true : false : false));

    }

    // It takes a number, rating
    // returns a new FluentRestaurants object that holds 
    // restaurants with ratings which are greater than or equal to rating.

    //ratingGeq(rating: number): FluentRestaurants
    ratingGeq(rating) {

        return new FluentRestaurants(this.data.filter(rest => lib220.getProperty(rest, 'stars').found ? lib220.getProperty(rest, 'stars').value >= rating ? true : false : false));

    }

    //reviewGeq(count: number) : FluentRestaurants
    reviewGeq(count) {

        return new FluentRestaurants(this.data.filter(rest => lib220.getProperty(rest, 'review_count').found ? lib220.getProperty(rest, 'review_count').value >= count ? true : false : false));

    }
    // It that takes a string, categoryStr
    // d produces a new FluentRestaurants object that holds
    // only those restaurants that have the provided category, categoryStr.
    category(categoryStr) {
        function categoryFilter(rest) {
            if (lib220.getProperty(rest, 'categories').found) {
                let categoryArray = lib220.getProperty(rest, 'categories').value;
                let tValue = categoryArray.reduce((acc, e) => e === categoryStr ? 1 : (acc === 1) ? 1 : 0, 0);
                if (tValue === 1) {
                    return true;
                }
                return false;
            } else {
                return false;
            }
        }

        return this.filter(categoryFilter);

    }
    // It takes a string, ambienceStr
    //d produces a new FluentRestaurants object with
    //restaurants that have the provided ambience, ambienceStr
    hasAmbience(ambienceStr) {
        function ambienceFilter(rest) {

            if (lib220.getProperty(rest, 'attributes').found) {
                let attObj = lib220.getProperty(rest, 'attributes').value;
                if (lib220.getProperty(attObj, 'Ambience').found) {
                    let ambObj = lib220.getProperty(attObj, 'Ambience').value;
                    if (lib220.getProperty(ambObj, ambienceStr).found) {
                        if (lib220.getProperty(ambObj, ambienceStr).value) {
                            return true;

                        } else {
                            return false;
                        }

                    } else {
                        return false;
                    }

                } else {
                    return false;
                }

            } else {
                return false;
            }

        }

        return this.filter(ambienceFilter);

    }

    // returns a Restaurant
    // 1) has the highest rating. if there is a tie,
    // 2) has the most reviews. if there is a tie,
    // 3) pick the first restaurant.
    // 4) if there is no matching reuslt, return an empty object
    bestPlace() {

        //check highest rating 
        let highestRating = 0;
        highestRating = this.data.reduce((acc, e) => (lib220.getProperty(e, 'stars').found) ? lib220.getProperty(e, 'stars').value > acc ? lib220.getProperty(e, 'stars').value : acc : acc, 0);
        let highRatingRests = this.ratingGeq(highestRating);
        if (highRatingRests.data.length === 1) {
            return highRatingRests.data[0];
        }
        if (highRatingRests.data.length === 0) {
            return {};
        }

        return highRatingRests.mostReviews();

    }
    // reutnrs a Restaurant
    // 1) has the most reviews, if there is a tie,
    // 2) pick the one with the most stars, if there is a tie,
    // 3) pick the first restuarant
    // 4) if there is no match result, return an empty object
    mostReviews() {
      
        //find highest Review number
        let highestReview = 0;
        highestReview = this.data.reduce((acc, e) => (lib220.getProperty(e, 'review_count').found) ? lib220.getProperty(e, 'review_count').value > acc ? lib220.getProperty(e, 'review_count').value : acc : acc, 0);

        let highReviewRests = this.reviewGeq(highestReview);
        if (highReviewRests.data.length === 1) {
            return highReviewRests.data[0];
        }
        if (highReviewRests.data.length === 0) {
            return {};
        }

        let highestRating = 0;
        highestRating = highReviewRests.data.reduce((acc, e) => (lib220.getProperty(e, 'stars').found) ? lib220.getProperty(e, 'stars').value > acc ? lib220.getProperty(e, 'stars').value : acc : acc, 0);

        let tieBreaker = highReviewRests.ratingGeq(highestRating);
        if (tieBreaker.data.length === 1) {
            return tieBreaker.data[0];
        }
        if (tieBreaker.data.length === 0) {
            return {};
        }

        return tieBreaker.data[0];

    }
}


const testData = [{
        name: "Applebee's",
        state: "NC",
        stars: 5,
        review_count: 8,
        categories: ["American", "Sitdown"],
        attributes: {
            RestaurantAttire: "casual",
            Alcohol: "none",
            Ambience: {
                OutdoorSeating: true
            }
        }
    },
    {
        name: "China Garden",
        state: "NC",
        stars: 5,
        review_count: 9,
        categories: ["Chinese", "Sitdown"],
        attributes: {
            RestaurantAttire: "casual",
            Alcohol: "none"

        }

    },
    {
        name: "Beach Ventures Roofing",
        state: "AZ",
        stars: 3,
        review_count: 9,
        categories: ["American"],
        attributes: {
            RestaurantAttire: "casual",
            Alcohol: "none",
            Ambience: {
                OutdoorSeating: false
            }
        }

    },
    {
        name: "Alpaul Automobile Wash",
        state: "NC",
        stars: 3,
        review_count: 9,
    }
];

test('fromState filters correct States', function() {
    let tObj = new FluentRestaurants(testData);
    let list = tObj.fromState('NC').data;
    assert(list.length === 3);
    assert(list[0].name === "Applebee's");
    assert(list[1].name === "China Garden");
    assert(list[2].name === "Alpaul Automobile Wash");

    let list2 = tObj.fromState('AZ').data;
    assert(list2.length ===1);
    assert(list2[0].name === "Beach Ventures Roofing");
});
test('ratingLeq filters correctly', function() {
    let tObj = new FluentRestaurants(testData);
    let list = tObj.ratingLeq(3).data;
    assert(list.length === 2);
    assert(list[0].name === "Beach Ventures Roofing");
    assert(list[1].name === "Alpaul Automobile Wash");
});
test('ratingGeq filters correctly', function() {
    let tObj = new FluentRestaurants(testData);
    let list = tObj.ratingGeq(4).data;
    assert(list.length === 2);
    assert(list[0].name === "Applebee's");
    assert(list[1].name === "China Garden");

});
test('category filters correctly', function() {
    let tObj = new FluentRestaurants(testData);
    let list = tObj.category('American').data;
    assert(list.length === 2);
    assert(list[0].name === "Applebee's");
    assert(list[1].name === "Beach Ventures Roofing");

    let tObj2 = new FluentRestaurants(testData);
    let list2 = tObj.category('Sitdown').data;
    assert(list2.length === 2);
    assert(list2[0].name === "Applebee's");
    assert(list2[1].name === "China Garden");

});
test('hasAmibence filters correctly', function() {
    let tObj = new FluentRestaurants(testData);
    let list = tObj.hasAmbience('OutdoorSeating').data;
    assert(list.length === 1);
    assert(list[0].name === "Applebee's");
});
test('bestRest filters correctly', function() {
    let tObj = new FluentRestaurants(testData);
    let place = tObj.bestPlace();
    assert(place.name === "China Garden");
});
test('bestPlace tie-breaking', function() {
    let tObj = new FluentRestaurants(testData);
    let place = tObj.fromState('NC').bestPlace();
    assert(place.name === 'China Garden');
});
test('mostReviews filter works', function() {
    let tObj = new FluentRestaurants(testData);
    let place = tObj.mostReviews();
    assert(place.name === 'China Garden');
});