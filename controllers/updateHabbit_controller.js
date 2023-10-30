const Habbit = require('../models/habbit');
const Tracker = require('../models/tracker');

module.exports.update = async (req, res) => {
    try {
        const habitId = req.params.id;
        const habit = await Habbit.findById(habitId).populate('tracker').exec();
        
        if (!habit) {
            return res.status(404).send('Habit not found');
        }

        let streakCount = 0; // Initialize streakCount

        for (let tracker of habit.tracker) {
            console.log(`Tracker Status: ${tracker.status}`);
            if (tracker.status === 'Done') {
                streakCount++; // Increment streakCount for "done" trackers
            } else if (tracker.status === 'Not-Done') {
                streakCount = 0; // Reset streakCount for "not-done" trackers
            }
            console.log(`Streak Count: ${streakCount}`);
            tracker.streakCount = streakCount; // Update the streakCount of the tracker
            await tracker.save(); // Save the updated tracker
        }
        

        // Render the updateHabbit view with habit data and updated trackers
        res.render('updateHabbit', {
            title: `${habit.habbit}`,
            habit: habit,
            all_trackers: habit.tracker,
            updatePage: true
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};
