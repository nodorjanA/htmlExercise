// this is the list we maintain
var householdList = [];

// mostly absorbing the onerous code to locate the html elements
var buttons = document.getElementsByTagName("button");
var addButton = document.getElementsByClassName("add")[0];
var submitButton = buttons.item(1);
var ageField = document.getElementById("age");
var relationship = document.getElementById("rel");
var smoker = document.getElementsByName("smoker")[0];
var list = document.getElementsByTagName("ol")[0];
var debug = document.getElementsByClassName("debug")[0];
var errorMessages = [];
var errorsDiv ;

function init() {
    householdList = [];

    addButton.setAttribute("type","button");
    addButton.addEventListener("click", tryAdd);

    submitButton.setAttribute("type",'button');
    submitButton.addEventListener("click", serialize);

    errorsDiv = document.createElement('div');
    addButton.parentElement.append(errorsDiv);

    ageField.onchange = resetErrors;
    relationship.onchange = resetErrors;

    addStyles();
    initializeForm();
}

function addStyles() {
    // this should be done with css, I am just avoiding changing the html
    errorsDiv.style.color = 'red';
    document.body.style.fontFamily = "arial";
    document.body.style.lineHeight = '30px';
    document.body.style.fontSize = '13px';
    document.body.style.paddingLeft = '20px';
    var labels = document.getElementsByTagName('label');
    for (var i=0; i<labels.length; i++) {
        labels[i].style.position = "relative";
    }
    var inputs = document.getElementsByTagName('input');
    for (var i=0; i<inputs.length; i++) {
        inputs[i].style.position = "absolute";
        inputs[i].style.left = "120px";
    }

    var sel = document.getElementsByTagName('select');
    for (var i=0; i<sel.length; i++) {
        sel[i].style.position = "absolute";
        sel[i].style.left = "120px";
    }

    addButton.innerHTML = "Add household member";
    addButton.style.marginTop = "10px";

    submitButton.innerHTML = "Submit list";
    submitButton.style.marginTop = "20px";

}

function resetErrors() {
    errorMessages = [];
    while (errorsDiv.childElementCount > 0) {
        errorsDiv.removeChild(errorsDiv.childNodes[0]);
    }
}

function initializeForm() {
    relationship.options[0].label = "--------";
    relationship.options[5].label = "Grandparent";
    relationship.options.selectedIndex = 0;
    ageField.value = '';
    smoker.checked = false;
    resetErrors();
}

function tryAdd() {
    var age = Number(ageField.value);
    if (Number.isNaN(age) || age <=0 ) {
        errorMessages.push("Wrong age value");
    }
    var selected = relationship.options.selectedIndex;
    var rel = relationship.options[selected].label;
    if (relationship.selectedIndex === 0) {
        errorMessages.push("Missing relationship");
    }
    for (var i=0; i<errorMessages.length; i++) {
        var ediv = document.createElement('div');
        ediv.innerHTML = errorMessages[i];
        errorsDiv.appendChild(ediv);
    }
    if (errorMessages.length === 0) {
        householdList.push({
            relationship: rel,
            age: age,
            smoker: smoker.checked
        });
        updateList();
        initializeForm();
    }

}

function listDiv(text, width) {
    var div = document.createElement('div');
    div.innerText = text;
    div.style.display = "inline-block";
    if (width) {
        div.style.width = '' + width + 'px';
    }
    return div;
}

function deleteFromList(event) {
    var ix = Number(event.target.id);
    householdList.splice(ix, 1);
    updateList();
}

function updateList() {
    list.innerHTML = '';
    for (var i=0; i<householdList.length; i++) {
        var li = document.createElement('li');
        li.appendChild(listDiv(householdList[i].relationship, 120));
        li.appendChild(listDiv('' + householdList[i].age + ' years',80));
        li.appendChild(listDiv(householdList[i].smoker? 'smoker' : '', 80));
        var deleteControl = listDiv('Delete');
        deleteControl.setAttribute("id",'' + i);
        deleteControl.style.color = '#0000bb';
        deleteControl.style.cursor = 'pointer';

        deleteControl.onclick = deleteFromList;
        li.appendChild(deleteControl);
        list.appendChild(li);
    }
    debug.style.display = 'none';
}

function serialize() {
    var result = JSON.stringify(householdList, null ,'\t');

    debug.innerHTML = result;
    debug.style.display = "block";
    debug.style.lineHeight = '1.7';
}

init();