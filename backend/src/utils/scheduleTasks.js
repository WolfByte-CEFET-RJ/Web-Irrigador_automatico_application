const schedule = require('node-schedule');
const { deleteOldIrrigationHistory } = require('../services/mqttService');

// Schedule the job to run daily at midnight
function scheduleTasks() {
  const job = schedule.scheduleJob('0 0 * * *', async () => {
    try {
      await deleteOldIrrigationHistory();
      console.log('Old irrigation history deleted');
    } catch (error) {
      console.error('Error deleting old irrigation history:', error);
    }
  });
}

module.exports = scheduleTasks;

scheduleTasks();