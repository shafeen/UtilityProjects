var mainBody = $("#myBody").get(0);

// LIVEdotIO view
function createLDIViewHandlebars(idPostfix) {
    var ldiViewTemplate = Handlebars.compile($("#ldiView-template").html());
    return $(ldiViewTemplate({idPostfix : idPostfix}))[0];
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