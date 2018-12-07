
VSS.init({
    usePlatformStyles: false
});

function showResult(data) {
    document.getElementById("networkResult").style.display = "block";
    document.getElementById("networkResult").value = JSON.stringify(data, null, 4);
}

function getClient() {
    // Using xdm promise implementation, as jquery isn't loaded yet
    var deferred = XDM.createDeferred();
    VSS.require(["VSS/Service", "TFS/Dashboards/RestClient"], function (VSS_Service, dashboardsApi) {
        deferred.resolve(VSS_Service.getCollectionClient(dashboardsApi.DashboardHttpClient3));
    });
    return deferred.promise;
}



function getTeamContext(){
    var webcontext = VSS.getWebContext();
    return {
      projectId : webcontext.project.id,
      teamId: webcontext.team.id  
    };
}

function getDashboards() {
    getClient().then(function(client){
        client.getDashboards(getTeamContext())
            .then(function (dashboards) {
                var result = "";
                for (i in dashboards.dashboardEntries) {
                    result += "<br /><a onclick=\"pickDashboard('"+dashboards.dashboardEntries[i].id +"')\">" + dashboards.dashboardEntries[i].id + " " + dashboards.dashboardEntries[i].name+"</a>";
                }
                document.getElementById("dashboardList").innerHTML = result;
                showResult(dashboards);
            },function(error){
                showResult(error);
            });
    });
}

function pickDashboard(id){
    document.getElementById("getDashboardId").value = id;
    document.getElementById("deleteDashboardId").value = id;
    document.getElementById("widgetsDashboardId").value = id;
}

function createDashboard() {
    getClient().then(function(client){
        client.createDashboard(
            JSON.parse(document.getElementById("createDashboardPayload").value), 
            getTeamContext())
            .then(function (result) {
                showResult(result);
            },function(error){
                showResult(error);
            });
    });
}

function getDashboard() {
    getClient().then(function(client){
        client.getDashboard(getTeamContext(), document.getElementById("getDashboardId").value)
            .then(function (result) {
                showResult(result);
            },function(error){
                showResult(error);
            });
    });
}

function deleteDashboard() {
    getClient().then(function(client){
        client.deleteDashboard(getTeamContext(), document.getElementById("deleteDashboardId").value)
            .then(function (result) {
                showResult(result);
            },function(error){
                showResult(error);
            });
    });
}


function pickWidget(id){
    document.getElementById("getWidgetId").value = id;
    document.getElementById("updateWidgetId").value = id;
    document.getElementById("replaceWidgetId").value = id;
    document.getElementById("deleteWidgetId").value = id;
}

function getWidgets() {
    getClient().then(function(client){
        client.getWidgets(getTeamContext(), document.getElementById("widgetsDashboardId").value)
            .then(function(widgets){
                var result = "";
                for (i in widgets.widgets) {
                    result += "<br /><a onclick=\"pickWidget('"+widgets.widgets[i].id +"')\">" +  widgets.widgets[i].id + " " + widgets.widgets[i].name+"</a>";
                }
                document.getElementById("widgetsList").innerHTML = result;
                showResult(widgets);
            },function(error){
                showResult(error);
            });
    });
}

function getWidget() {
    getClient().then(function(client){
        client.getWidget(getTeamContext(), document.getElementById("widgetsDashboardId").value, document.getElementById("getWidgetId").value)
            .then(function (result) {
                showResult(result);
            },function(error){
                showResult(error);
            });
    });
}

function createWidget() {
    getClient().then(function(client){
        client.createWidget(
            JSON.parse(document.getElementById("createWidgetPayload").value), 
            getTeamContext(), document.getElementById("widgetsDashboardId").value
            )
            .then(function (result) {
                showResult(result);
            },function(error){
                showResult(error);
            });
    });
}

function updateWidget() {
    getClient().then(function(client){
        client.updateWidget(
            JSON.parse(document.getElementById("updateWidgetPayload").value), 
            getTeamContext(), document.getElementById("widgetsDashboardId").value,
            document.getElementById("updateWidgetId").value
            )
            .then(function (result) {
                showResult(result);
            },function(error){
                showResult(error);
            });
    });
}

function replaceWidget() {
    getClient().then(function(client){
        client.replaceWidget(
            JSON.parse(document.getElementById("replaceWidgetPayload").value), 
            getTeamContext(), document.getElementById("widgetsDashboardId").value,
            document.getElementById("replaceWidgetId").value
            )
            .then(function (result) {
                showResult(result);
            },function(error){
                showResult(error);
            });
    });
}

function deleteWidget() {
    getClient().then(function(client){
        client.deleteWidget(
            getTeamContext(), document.getElementById("widgetsDashboardId").value,
            document.getElementById("deleteWidgetId").value
            )
            .then(function (result) {
                showResult(result);
            },function(error){
                showResult(error);
            });
    });
}

function replaceWidgets() {
    getClient().then(function(client){
        client.replaceWidgets(
            JSON.parse(document.getElementById("replaceWidgetsPayload").value), 
            getTeamContext(), document.getElementById("widgetsDashboardId").value,
            document.getElementById("replaceWidgetsETag").value
            )
            .then(function (result) {
                showResult(result);
            },function(error){
                showResult(error);
            });
    });
}

function updateWidgets() {
    getClient().then(function(client){
        client.updateWidgets(
            JSON.parse(document.getElementById("updateWidgetsPayload").value), 
            getTeamContext(), document.getElementById("widgetsDashboardId").value,
            document.getElementById("updateWidgetsETag").value
            )
            .then(function (result) {
                showResult(result);
            },function(error){
                showResult(error);
            });
    });
}
