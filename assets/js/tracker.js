$(document).ready(function () {
    // AJAX for creating a new tracker
    $('#update-form').on('submit', 'form', function (e) {
        e.preventDefault(); // Prevent the form from submitting normally
        const form = $(this);
        const data = form.serialize();

        $.ajax({
            type: 'POST',
            url: '/create-tracker', // Replace with your server route
            data: data,
            success: function (data) {
                // Handle success (e.g., update the table with the new tracker)
                console.log('Tracker created successfully:', data);
                updateTableWithNewTracker(data.data.tracker);
                form.trigger('reset'); // Clear the form
            },
            error: function (error) {
                // Handle errors
                console.error('Error creating tracker:', error);
            },
        });
    });

    // Function to update the table with a new tracker row
    function updateTableWithNewTracker(trackerData) {
        const tableBody = $('#trackerTable tbody');
        const newRow = `
            <tr>
                <td>${trackerData.date}</td>
                <td>${trackerData.day}</td>
                <td>${trackerData.status}</td>
                <td>${trackerData.streakCount}</td>
            </tr>
        `;
        tableBody.append(newRow);
    }
});
