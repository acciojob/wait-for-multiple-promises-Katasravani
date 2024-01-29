//your JS code here. If required.
const outputTable = document.getElementById("output");

// Create an array of promises that resolve after random delays
const promises = [
  new Promise((resolve) => {
    setTimeout(() => resolve("Promise 1"), getRandomDelay());
  }),
  new Promise((resolve) => {
    setTimeout(() => resolve("Promise 2"), getRandomDelay());
  }),
  new Promise((resolve) => {
    setTimeout(() => resolve("Promise 3"), getRandomDelay());
  }),
];

// Add a loading row
const loadingRow = outputTable.insertRow();
loadingRow.classList.add("text-center");
loadingRow.insertCell().colSpan = 2;
loadingRow.cells[0].textContent = "Loading...";

// Start a timer to track the total time
const startTime = performance.now();

Promise.all(promises)
  .then((results) => {
    const endTime = performance.now();
    const totalTime = endTime - startTime;

    // Remove the loading row
    loadingRow.remove();

    // Populate the table with results
    results.forEach((result, index) => {
      const row = outputTable.insertRow();
      row.insertCell().textContent = `Promise ${index + 1}`;
      row.insertCell().textContent = getRandomDelay().toFixed(3); // Display delay with 3 decimal places
    });

    // Add a row for total time
    const totalRow = outputTable.insertRow();
    totalRow.insertCell().textContent = "Total";
    totalRow.insertCell().textContent = totalTime.toFixed(3);
  })
  .catch((error) => {
    console.error("Error:", error);
    // Handle errors gracefully, e.g., display an error message in the table
  });

function getRandomDelay() {
  return Math.random() * 2000 + 1000; // Random delay between 1 and 3 seconds
}
