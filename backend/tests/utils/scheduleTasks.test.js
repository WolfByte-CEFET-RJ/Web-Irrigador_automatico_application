const schedule = require('node-schedule');
const { deleteOldIrrigationHistory } = require('../../src/services/mqttService');
const scheduleTasks = require('../../src/utils/scheduleTasks'); // ajuste o caminho do arquivo

jest.mock('node-schedule', () => ({
  scheduleJob: jest.fn()
}));

jest.mock('../../src/services/mqttService', () => ({
  deleteOldIrrigationHistory: jest.fn()
}));

describe('scheduleTasks', () => {
  it('should schedule a job to delete old irrigation history daily at midnight', async () => {
    const mockJob = jest.fn();
    schedule.scheduleJob.mockImplementation((time, callback) => {
      mockJob();
      callback(); 
    });

    await scheduleTasks(); 

    expect(schedule.scheduleJob).toHaveBeenCalledWith('0 0 * * *', expect.any(Function));

    expect(deleteOldIrrigationHistory).toHaveBeenCalled();
  });

  it('should log an error if deleteOldIrrigationHistory fails', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {}); 

    deleteOldIrrigationHistory.mockRejectedValueOnce(new Error('Test error'));

    schedule.scheduleJob.mockImplementation((time, callback) => {
      callback(); 
    });

    await scheduleTasks(); 
    
    expect(consoleErrorSpy).toHaveBeenCalledWith('Error deleting old irrigation history:', expect.any(Error));

    consoleErrorSpy.mockRestore(); 
  });
});