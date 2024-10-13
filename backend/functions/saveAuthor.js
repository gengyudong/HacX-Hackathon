const fs = require('fs');
const path = require('path');

// Define the path for your JSON file
const jsonFilePath = path.join(__dirname, 'authors.json');

// Function to read entries from the JSON file
async function readEntries() {
    if (!fs.existsSync(jsonFilePath)) {
        // If the file doesn't exist, return an empty array
        return [];
    }
    const data = await fs.promises.readFile(jsonFilePath, 'utf-8');
    return JSON.parse(data);
}

// Function to write entries to the JSON file
async function writeEntries(entries) {
    await fs.promises.writeFile(jsonFilePath, JSON.stringify(entries, null, 2));
}

// Function to check for duplicates and add if not found
async function addEntryIfNotExists(newEntry) {
    const existingEntries = await readEntries();

    // Check for duplicates
    const existingEntryIndex = existingEntries.findIndex(entry => 
        entry.author.trim().toLowerCase() === newEntry.author.trim().toLowerCase()
    );

    if (existingEntryIndex === -1) {
        // No duplicates found, add new entry with count set to 1
        newEntry.count = 1; // Initialize count
        existingEntries.push(newEntry);
        await writeEntries(existingEntries);
        console.log('New entry added:', newEntry);
        return { success: true };
    } else {
        // Duplicate found, increment the count
        existingEntries[existingEntryIndex].count += 1;
        await writeEntries(existingEntries);
        console.log('Duplicate entry found. Count incremented:', existingEntries[existingEntryIndex]);
        return { success: true, message: 'Count incremented for existing entry.' };
    }
}
// Export the function
module.exports = addEntryIfNotExists;
