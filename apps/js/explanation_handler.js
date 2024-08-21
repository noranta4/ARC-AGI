document.addEventListener('DOMContentLoaded', () => {
    const submitExplanationBtn = document.getElementById('submit_explanation_btn');
    const explanationInput = document.getElementById('explanation_input');

    submitExplanationBtn.addEventListener('click', submitExplanation);

    function submitExplanation() {
        const explanation = explanationInput.value.trim();
        if (!explanation) {
            alert('Please enter an explanation before submitting.');
            return;
        }

        // Get the task name and number from the label element
        const taskNameElement = document.getElementById('task_name');
        const taskNameFull = taskNameElement.textContent.trim();
        const [taskNumberFull, taskName] = taskNameFull.split('    ').map(s => s.trim());

        if (!taskName || !taskNumberFull) {
            alert('Task information not found. Please make sure a task is loaded.');
            return;
        }

        // Create the JSON object
        const explanationData = {
            "explanation": explanation,
        };

        // Convert to JSON string
        const jsonString = JSON.stringify(explanationData, null, 2);

        // Create a Blob with the JSON data
        const blob = new Blob([jsonString], { type: 'application/json' });

        // Create a download link and trigger the download
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = `${taskName}`;
        a.click();

        //alert('Explanation submitted successfully! Please save the downloaded file.');
        explanationInput.value = '';
    }
});