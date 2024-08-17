const measurementService = require('../../src/services/measurementService'); // Substitua pelo caminho correto
const knex = require('../../src/database/index.js');
const { UnauthorizedGardenReturn } = require('../../src/errors/gardenError.js');
const { SensorConfigurationNotFound } = require('../../src/errors/measurementError');
const irrigationSettingService = require("../../src/services/irrigationSettingService");

jest.mock('../../src/database');

describe("Measurement Service", () => {

    beforeEach(() => {
        jest.clearAllMocks();
        jest.clearAllTimers();
    });

    describe("Last Measures", () => {
        it("Should return all last measures of a garden", async () => {
            
        });
    });
});