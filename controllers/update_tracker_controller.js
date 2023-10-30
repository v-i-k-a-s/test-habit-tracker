const Habbit = require('../models/habbit');
const Tracker = require('../models/tracker');

module.exports.createTracker = async (req, res) => {
    try {
        // Find the habit by ID
        const habit = await Habbit.findById(req.body.habbit);

        if (!habit) {
            return res.status(404).json({ message: "Habit not found" });
        }

        // Create a new tracker
        const tracker = await Tracker.create({
            habbit: req.body.habbit,
            status: req.body.status,
            date: req.body.date,
            day: req.body.day
        });

        // Push the tracker to the habit's tracker array
        habit.tracker.push(tracker);
        await habit.save();

        if (req.xhr) {
            return res.status(200).json({
                data: {
                    tracker: tracker
                },
                message: "Tracker Created"
            });
        }

        return res.redirect('back');
    } catch (err) {
        console.error(`Error in creating the habit tracker: ${err}`);
        return res.status(500).json({ message: "Error in updating the tracker" });
    }
};
