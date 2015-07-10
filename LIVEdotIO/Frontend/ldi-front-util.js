var mainBody = $("#myBody").get(0);

// LIVEdotIO view
function createLDIView(idPostfix) {
    var ldiView = $("<div></div>");

    var idPrefix = "";
    $(ldiView).attr("id", idPrefix + idPostfix);

    var divHeading = $("<h4></h4>");
    var divPara1 = $("<p></p>");
    var divPara2 = $("<p></p>");

    // these IDs must match the corresponding model's attribute names
    divHeading.attr("id", "divHead_" + idPostfix);
    divPara1.attr("id",  "divPara1_" + idPostfix);
    divPara2.attr("id", "divPara2_" + idPostfix);

    divHeading.append("Heading " + idPostfix);
    divPara1.append("Info 1");
    divPara2.append("Info 2");

    ldiView.append(divHeading)
           .append($("<hr/>"))
           .append(divPara1)
           .append(divPara2);

    ldiView.addClass("ldiView");
    divHeading.addClass("ldiViewHead");
    divPara1.addClass("ldiViewPara");
    divPara2.addClass("ldiViewPara");

    return ldiView.get(0);
}


function addNewLDIView(viewName) {
    var ldiView = createLDIView(viewName);
    $(ldiView).hide();
    mainBody.insertBefore(ldiView, mainBody.firstElementChild);
    $(ldiView).fadeIn();
}

function removeLDIView(viewName) {
    // Note: view IDs will be named after the event received
    var ldiViewToRemove = $("#"+viewName);
    if(ldiViewToRemove.get(0) != null) {
        ldiViewToRemove.fadeOut("slow", function() {
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