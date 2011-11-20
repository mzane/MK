/* ******************************* */
/* ********** UI-PORTAL ********** */
/* ******************************* */


/**
 * UI-OBJECT
 */
window.ui = {};



/**
 * UI-CLIENT
 */
ui.getClient=function(){var host=window.location.host;if(host.indexOf("gmx")!=-1){return"gmx"}else if(host.indexOf("web.de")!=-1||host.indexOf("webde")!=-1){return"webde"}else if(host.indexOf("1und1")!=-1){return"1und1"}else{return"gmx"}};
