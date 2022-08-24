/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as db from './db';
import * as toursController from '../controllers/toursController';
import { mockRequest, mockResponse } from 'jest-mock-req-res';
import { Request, response, Response } from 'express';
// INTEGRATION TESTING MEANS: 
// - TESTING BLOCKS OF FUNCTIONALITY, LIKE MODULES, THAT HAS DEPENDENCIES.
// The goal of these tests is to check the connectivity and communication between different components of the application.

// without authentication, test things separately


describe('Tours', () => {
    describe('Is true,', () => {
        it(' true?', () => {
            expect(true).toBe(true);
        });
    });    
});