
function validateNumberBox(self) {
    self.value = self.value.replace(/[^0-9]/g, '');
}

function insertNumberBox(container){
    let boxTemplate = document.getElementById("number-box-template");
    let buttonTemplate = document.getElementById("add-number-box-button-template");

    let box = boxTemplate.content.cloneNode(true);
    let button = buttonTemplate.content.cloneNode(true);

    let existingButton = container.querySelector(".add-number-box-button");
    if(existingButton) container.removeChild(existingButton);

    container.appendChild(box);
    container.appendChild(button);

    // Nice ux
    container.querySelector(".number-box:last-of-type").focus();
}

// Sorts up to maxPasses, then stops
function bubbleSort(inp, ascending, maxPasses){
    // As the algorithm continues, values will be "locked in" as they bubble to the top of the list
    let maxIndex = inp.length - 1;
    let numPasses = 0;
    let totalSwaps = 0;
    while (maxIndex > 0 && numPasses < maxPasses){
        let numSwaps = 0;

        for(let i = 0; i < maxIndex; i++){
            if(!(ascending ? inp[i] > inp[i + 1] : inp[i] < inp[i + 1])) continue;

            // Swap needs to take place
            let tmp = inp[i + 1];
            inp[i + 1] = inp[i];
            inp[i] = tmp;
            numSwaps++;
        }

        if(numSwaps == 0) maxIndex = 0;
        else maxIndex--;

        numPasses++;
        totalSwaps += numSwaps;
    }

    // Not sure how much I like this but it gets the job done since this function is going to be called with maxPasses = 1 for display purposes, 
    // so there needs to be a way of checking that there was at least one pass (aka the list did change)
    return {
        passes: numPasses,
        swaps: totalSwaps,
        output: inp
    };
}

function executeBubbleSort(){
    // Clear previous run
    document.querySelectorAll(".bubble-sort-row").forEach((row) => {
        row.remove();
    })

    let container = document.getElementById("bubble-sort-container");
    let numberElements = container.querySelectorAll(".number-box");
    let inp = [];

    for(let i = 0; i < numberElements.length; i++){
        let val = numberElements[i].value;
        // Stop at the first empty element
        if(val === '') break;

        inp.push(parseInt(val));
    }

    let res = bubbleSort(inp, true, 1);
    while(res.passes != 0){
        inp = res.output;

        let rowTemplate = document.getElementById("bubble-sort-row-template");
        let boxTemplate = document.getElementById("number-box-template");

        let row = rowTemplate.content.cloneNode(true);

        for(let i = 0; i < inp.length; i++){
            let box = boxTemplate.content.cloneNode(true);
            box.value = inp[i].toString();

            row.appendChild(box);
        }
    }
}

function setup(){
    insertNumberBox(document.getElementById("bubble-sort-input-row"));
}