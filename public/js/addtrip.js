document.addEventListener("DOMContentLoaded", function () {
    const tripForm = document.querySelector("form");
    const tripListContainer = document.createElement("div"); 
    tripListContainer.id = "tripList";
    document.body.appendChild(tripListContainer);

    // Load trips from localStorage on page load
    loadTrips();

    // Event listener for form submission
    tripForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent default form submission behavior

        // Get form values
        const startDate = document.getElementById("startdate").value;
        const endDate = document.getElementById("enddate").value;
        const place = document.getElementById("place").value;
        const country = document.getElementById("country").value;
        const tripType = document.getElementById("tripType").value;

        if (!startDate || !endDate || !place || !country || !tripType) {
            alert("Please fill in all fields.");
            return;
        }

        // Create trip object
        const trip = {
            startDate,
            endDate,
            place,
            country,
            tripType
        };

        // Get existing trips from localStorage
        let trips = JSON.parse(localStorage.getItem("trips")) || [];

        // Add new trip
        trips.push(trip);

        // Save updated trip list to localStorage
        localStorage.setItem("trips", JSON.stringify(trips));

        // Reset form
        tripForm.reset();

        // Refresh trip list
        loadTrips();
    });

    // Function to load trips from localStorage and display them
    function loadTrips() {
        const trips = JSON.parse(localStorage.getItem("trips")) || [];
        tripListContainer.innerHTML = "<h3>Saved Trips</h3>";

        if (trips.length === 0) {
            tripListContainer.innerHTML += "<p>No trips added yet.</p>";
            return;
        }

        const tripTable = document.createElement("table");
        tripTable.classList.add("table", "table-bordered");

        tripTable.innerHTML = `
            <thead>
                <tr>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Place</th>
                    <th>Country</th>
                    <th>Trip Type</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                ${trips.map((trip, index) => `
                    <tr>
                        <td>${trip.startDate}</td>
                        <td>${trip.endDate}</td>
                        <td>${trip.place}</td>
                        <td>${trip.country}</td>
                        <td>${trip.tripType}</td>
                        <td><button class="btn btn-danger btn-sm" onclick="deleteTrip(${index})">Delete</button></td>
                    </tr>
                `).join("")}
            </tbody>
        `;

        tripListContainer.appendChild(tripTable);
    }
});

// Function to delete a trip from localStorage
function deleteTrip(index) {
    let trips = JSON.parse(localStorage.getItem("trips")) || [];
    trips.splice(index, 1); // Remove the selected trip
    localStorage.setItem("trips", JSON.stringify(trips)); // Update storage
    location.reload(); // Refresh to update UI
}