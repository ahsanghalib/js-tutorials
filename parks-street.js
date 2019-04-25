/**
 * Town that has parks and streets
 * parks and streets has: name, build year, function: age
 * parks has : number of trees, park area, function: tree density per sq km.  
 * street has: length in km, 
 */

class Town {
    constructor(name, buildYear) {
        this.name = name;
        this.buildYear = buildYear;
    }

    calculateAge() {
        return (new Date().getFullYear() - this.buildYear).toFixed(0);
    }

    static calc(argArray) {
        let sum = 0, avg = 0;

        argArray.forEach(a => {
            sum += parseFloat(a);
        });

        avg = (sum / argArray.length).toFixed(2);

        return [sum, avg];
    }

}

class Park extends Town {
    constructor(name, buildYear, numOfTrees, parkArea) {
        super(name, buildYear);
        this.numOfTrees = numOfTrees;
        this.parkArea = parkArea;
    }

    treeDensity() {
        return (this.numOfTrees / this.parkArea).toFixed(0);
    }

    largePark() {
        return (this.treeDensity() > 1000) ? true : false;
    }
}

class Street extends Town {
    constructor(name, buildYear, streetLength, streetCategory) {
        super(name, buildYear);
        this.streetLength = streetLength;
        this._streetCategory = streetCategory;
    }

    streetCat() {
        if (this.streetLength <= 1) {
            this._streetCategory = 'tiny';
        } else if (this.streetLength > 1 && this.streetLength <= 2) {
            this._streetCategory = 'small';
        } else if (this.streetLength > 2 && this.streetLength <= 3) {
            this._streetCategory = 'normal';
        } else if (this.streetLength > 3 && this.streetLength <= 4) {
            this._streetCategory = 'big';
        } else if (this.streetLength > 4) {
            this._streetCategory = 'huge';
        }

        return this._streetCategory;
    }

}

const heading = () => {
    let smallTown = new Town('Multan', 1900);
    let headingString = `SMALL TOWN: ${smallTown.name}, BUILD IN: ${smallTown.buildYear}, AGE IS: ${smallTown.calculateAge()} years`;

    console.log(headingString);
    console.log('='.repeat(headingString.length));
};

const parksReport = () => {

    // data variables
    let parks = [
        new Park('Green Park', 1975, 5000000, 25000),
        new Park('National Park', 1955, 8000000, 5000),
        new Park('Oak Park', 1925, 700000, 3000),
    ];

    console.log(`----------PARKS REPORT------------`);

    let age = parks.map(el => el.calculateAge());
    let [sum, avg] = Town.calc(age);

    console.log(`Our ${parks.length} has an average age of ${avg} years`);

    parks.forEach(p => {
        console.log(`${p.name} has a tree density of ${p.treeDensity()} trees per sq km.`);
    });

    parks.forEach(p => {
        if (p.largePark()) {
            console.log(`${p.name} has more then 1000 trees.`);
        }
    });
};

const streetsReport = () => {

    // data variables
    let streets = [
        new Street('Ocean Avenue', 1999, 3.5),
        new Street('Evergreen Street', 2008, 1.25),
        new Street('4th Street', 2015, 2.75),
        new Street('Sunset Boulevard', 1982, 6.5),
    ];

    console.log(`----------STREETS REPORT------------`);

    let length = streets.map(el => el.streetLength);
    let [sum, avg] = Town.calc(length);

    console.log(`Our ${streets.length} has a total length of ${sum} km, with an averge of ${avg}`);

    streets.forEach(s => {
        console.log(`${s.name}, build in ${s.buildYear}, is a ${s.streetCat()}.`);
    });
};

const init = () => {
    heading();
    parksReport();
    streetsReport();
};


init();