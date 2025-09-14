const request = require('supertest');
const app = require('../src/app');

describe('Test GET /launches', () => {
    test('It should response with 200 success', async () => {
        const response = await request(app).get('/launches')
            .expect('Content-Type', /json/)
            ;
        const statusCode = response.statusCode
        expect(statusCode).toBe(200);
    })
});


describe('Test POST /launches', () => {
    test('It should respond with 200 success', async () => {
        const response = await request(app)
            .post("/launches")
            .send({
                mission: 'USS Enterprise',
                rocket: "NCC 1701-D",
                destination: 'Kepler-186 f',
                launchDate: 'January 4,2028'
            }).expect('Content-Type', /json/);
        const statusCode = response.statusCode;
        expect(statusCode).toBe(201);
        expect(response.body).toMatchObject({
            "message": "Launch added successfully",
        })
    });

    test('It should catch missing required properties', async () => {
        const response = await request(app)
            .post("/launches")
            .send({
                mission: 'USS Enterprise',
                rocket: "NCC 1701-D",
                launchDate: 'January 4,2028'
            }).expect('Content-Type', /json/);
        const statusCode = response.statusCode;
        expect(statusCode).toBe(400);
        expect(response.body).toStrictEqual({
            "error": "Missing required launch property",
        })
    });

    test('It should catch invalid dates', async () => {
        const response = await request(app)
            .post("/launches")
            .send({
                mission: 'USS Enterprise',
                rocket: "NCC 1701-D",
                destination: 'Kepler-186 f',
                launchDate: 'Jary 4,2028'
            }).expect('Content-Type', /json/);
        const statusCode = response.statusCode;
        expect(statusCode).toBe(400);
        expect(response.body).toStrictEqual({
            "error": "Invalid launch Date",
        })
    });
});
