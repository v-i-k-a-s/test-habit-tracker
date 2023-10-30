const Habbit = require('../models/habbit');

module.exports.home = async (req, res) => {
    try {
        let habits = await Habbit.find({}); // Corrected variable name to 'habits'

        console.log(habits)

        if (!habits || habits.length == 0) {
            // No habits found or an empty array of habits
            return res.render('home', {
                title: 'Habbit Tracker',
                habbit :[]
            });
        } else {
            // Render the "home" view with data
            return res.render('home', {
                title: 'Habbit Tracker',
                habbit: habits ,
                isHomePage : true
            });
        }
    } catch (err) {
        console.error(`Error in finding the Habbit: ${err}`);
        return res.status(500).send("Error in finding the Habbit.");
    }
};
