
function validateDigitBox(self) {
    self.value = self.value.replace(/[^0-9]/g, '');
}

function insertDigitBox(){
    let boxTemplate = document.getElementById("digit-box-template");
    let buttonTemplate = document.getElementById("add-digit-box-button-template");
    let container = document.querySelector(".container.active");

    let box = boxTemplate.content.cloneNode(true);
    let button = buttonTemplate.content.cloneNode(true);

    let existingButton = container.querySelector(".add-digit-box-button");
    if(existingButton) container.removeChild(existingButton);

    container.appendChild(box);
    container.appendChild(button);

    // Nice ux
    container.querySelector(".digit-box:last-of-type").focus();
}

function setup(){
    insertDigitBox();
}