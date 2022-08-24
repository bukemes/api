// UNIT TESTING MEANS: 
// - MOCK RESPONSES, WITHOUT DATABASE!!! 
// - TESTING INDIVIDUAL FUNCTIONS, CLASSES, MODULES, SCHEMAS, ETC.
// import tourController from '../controllers/tourController';
import mongoose from 'mongoose';
import TOUR, {LocalizedData, InternationalTourInput} from '../models/tourModel';
import { faker } from '@faker-js/faker';
// import * as db from './db';
import db from './db2';
// import request from 'supertest';
// import { app } from '../app';
// import setupExpress from '../utilities/express';


describe('UNIT TESTS', () => {
    // const app = setupExpress();
    // const agent = request.agent(app);

    beforeEach(async () => await db.connect());
    afterEach(async () => await db.clear());
    afterAll(async () => await db.close());
    // async () => await db.clear(), 

    test('TOUR: Create Tour', async () => {
        const locale: LocalizedData = {
            language: 'en',
            title: faker.name.firstName(),
            description: faker.commerce.productDescription(),
        };
        const tourInput: InternationalTourInput = {
            isPublished: true,
            i18n: [locale],
            headerImage: faker.image.image(600,400),
            schedule: new mongoose.Types.ObjectId(),
            duration: faker.datatype.number({ min: 30, max: 240 }),
        };
        const tour = new TOUR({ ...tourInput });
        const createdTour = await tour.save();
        expect(createdTour).toBeDefined();
        expect(createdTour.i18n[0].language).toBe(locale.language);
        // expect(createdTour.description).toBe(tour.description);
        expect(createdTour.headerImage).toBe(tour.headerImage);
        expect(createdTour.duration).toBe(tour.duration);
    });

    // describe('tags', () => {
    //     describe('POST /tags', () => {
    //         test('successful', async () => {
    //             const res = await agent.post('/tags').send({ name: 'test-tag'});
    //             expect(res.statusCode).toEqual(201);
    //             expect(res.body).toBeTruthy();
    //         });
    //     });
    // });
      
});