// No new schema — reports aggregate data from existing models.
// Importing them here ensures Mongoose registers the models before populate() runs.
import "../schema"; // Asset
import "../allocation/schema"; // Allocation
import "../asset-gate-pass/schema"; // GatePass
