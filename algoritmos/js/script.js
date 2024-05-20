const inputText = document.getElementById('input-text');
const analyzeButton = document.getElementById('analyze-button');
const resultsTable = document.getElementById('results-table');

analyzeButton.addEventListener('click', analyzeText);

function analyzeText() {
    const text = inputText.value.toLowerCase();
    const words = text.split(' ');

    const wordFrequencies = {};
    for (const word of words) {
        if (wordFrequencies[word]) {
            wordFrequencies[word]++;
        } else {
            wordFrequencies[word] = 1;
        }
    }

    const sortedFrequencies = Object.entries(wordFrequencies).sort((a, b) => b[1] - a[1]);

    const tableBody = resultsTable.querySelector('tbody');
    tableBody.innerHTML = ''; // Clear existing results

    for (const [word, frequency] of sortedFrequencies) {
        const row = tableBody.insertRow();
        const wordCell = row.insertCell();
        const frequencyCell = row.insertCell();

        wordCell.textContent = word;
        frequencyCell.textContent = frequency;
    }
}