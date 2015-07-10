var mainBody = $("#myBody").get(0);

// LIVEdotIO view
function createLDIView(idPostfix) {
    var ldiView = document.createElement("div");
    var idPrefix = "";
    ldiView.id = idPrefix + idPostfix;

    var divHeading = document.createElement("h4");
    var divPara1 = document.createElement("p");
    var divPara2 = document.createElement("p");

    // these IDs must match the corresponding model's attribute names
    divHeading.id = "divHead_" + idPostfix;
    divPara1.id = "divPara1_" + idPostfix;
    divPara2.id = "divPara2_" + idPostfix;

    divHeading.appendChild(document.createTextNode("Heading " + idPostfix));
    divPara1.appendChild(document.createTextNode("Info 1"));
    divPara2.appendChild(document.createTextNode("Info 2"));

    ldiView.appendChild(divHeading);
    ldiView.appendChild(divPara1);
    ldiView.appendChild(divPara2);

    ldiView.className = "ldiView";
    divHeading.className = "ldiViewHead";
    divPara1.className = "ldiViewPara";
    divPara2.className = "ldiViewPara";

    return ldiView;
}


function addNewLDIView(viewName) {
    var ldiView = createLDIView(viewName);
    $(ldiView).hide();
    mainBody.insertBefore(ldiView, mainBody.firstElementChild);
    $(ldiView).fadeIn();
}

function removeLDIView(viewName) {
    // Note: view IDs will be named after the event received
    var ldiViewToRemove = $("#"+viewName).get(0);
    if(ldiViewToRemove != null) {
        $(ldiViewToRemove).fadeOut("slow", function() {
            $(this).remove();
        });
    }
}

// Note: we assume that ldiModel properties match ldiView children ids 1:1
function updateLDIViewData(ldiModel) {
    // Note: view MUST contain the elements whose IDs match the model's attributes
    for(var ldiModelAttr in ldiModel) {
        if(ldiModel.hasOwnProperty(ldiModelAttr)) {
            $("#"+ldiModelAttr).html(ldiModel[ldiModelAttr]);
        }
    }
}