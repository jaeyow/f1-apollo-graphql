const { gql } = require('apollo-server');

// Schema definition
const typeDefs = gql`
    type Driver {
        driverId: String
        permanentNumber: String
        code: String
        url: String
        givenName: String
        familyName: String
        dateOfBirth: String
        nationality: String
    }

    type Constructor {
        constructorId: String
        url: String
        name: String
        nationality: String
    }

    type Time {
        millis: String
        time: String
    }

    type AverageSpeed {
        units: String
        speed: String
    }

    type FastestLap {
        rank: String
        lap: String
        Time: Time
        AverageSpeed: AverageSpeed
    }

    type Result {
        number: String
        position: String
        positionText: String
        points: String
        Driver: Driver
        Constructor: Constructor
        grid: String
        laps: String
        status: String
        Time: Time
        FastestLap: FastestLap
    }

    type Location {
        lat: String
        long: String
        locality: String
        country: String
    }

    type Circuit {
        circuitId: String
        url: String
        circuitName: String
        Location: Location
    }

    type Race {
        season: String
        round: String
        url:  String
        raceName: String
        Circuit: Circuit
        date: String
        time: String
    }

    type RaceResult {
        season: String
        round: String
        url:  String
        raceName: String
        Circuit: Circuit
        date: String
        time: String
        results: [Result]
    }

    type Query {
        results: [Result]
        races: [Race]
        raceResults: [RaceResult]
    }
`;

module.exports =  typeDefs;
