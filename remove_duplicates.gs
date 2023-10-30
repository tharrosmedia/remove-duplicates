function removeDuplicates() {
  const SHEETS = {
    NAME: 'Google Ads Upload',
    LOG: {
      NAME: 'Script Messages',
      TIMESTAMP: 'Timestamp',
      MESSAGE: 'Message',
    }
  };

  function logMessage(message) {
    var logSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEETS.LOG.NAME);
    var timestamp = new Date();
    logSheet.appendRow([timestamp, message]);
  }

  logMessage("removeDuplicates function started.");

  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEETS.NAME);
  var rows = sheet.getDataRange().getValues();
  var numRows = rows.length;
  var toDelete = [];

  var seen = {}; // This object will store the hashes of rows we've already seen

  for (var i = 1; i < numRows; i++) {
    var row = rows[i];
    var hash = row.join(','); // Creating a comma-separated string of all values in the row
    
    if (seen[hash]) { // If we've seen this hash before, mark the row for deletion
      toDelete.push(i);
      logMessage("Duplicate detected: Row " + (i+1));
    } else {
      seen[hash] = true;
    }
  }

  // Removing duplicates from the bottom to avoid messing up the indexes
  for (var i = toDelete.length - 1; i >= 0; i--) {
    sheet.deleteRow(toDelete[i]+1);
    logMessage("Duplicate removed: Row " + (toDelete[i]+1));
  }

  logMessage("removeDuplicates function ended.");
}
