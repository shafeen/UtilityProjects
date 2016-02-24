var mainBody = $("#myBody").get(0);

// alternative to createLDIView using handlebars
// TODO: replace createLDIView with this
function createLDIViewHandlebars(idPostfix) {
    var ldiViewTemplate = Handlebars.compile($("#ldiView-template").html());
    return $(ldiViewTemplate({idPostfix : idPostfix}))[0];
}

// LIVEdotIO view
// TODO: remove this when no longer used
function createLDIView(idPostfix) {
    var ldiView = $("<div></div>");

    var idPrefix = "";
    $(ldiView).attr("id", idPrefix + idPostfix);

    // the element's IDs must match the corresponding model's attribute names
    var divHeading = $("<h4></h4>").attr("id", "divHead_" + idPostfix);
    var divPara1 = $("<p></p>").attr("id",  "divPara1_" + idPostfix);
    var divPara2 = $("<p></p>").attr("id", "divPara2_" + idPostfix);

    divHeading.append("Heading "+idPostfix);
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
    var ldiView = createLDIViewHandlebars(viewName);
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