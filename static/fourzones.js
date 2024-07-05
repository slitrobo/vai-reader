var gazeData = {};

window.onload = async function() {

    webgazer.params.showVideoPreview = true;
    //start the webgazer tracker
    await webgazer.setRegression('ridge') /* currently must set regression and tracker */
        //.setTracker('clmtrackr')
        .setGazeListener(function(data, clock) {
          gazeData = data;
            // console.log(data); /* data is an object containing an x and y key which are the x and y prediction coordinates (no bounds limiting) */
          //   console.log(clock); /* elapsed time in milliseconds since webgazer.begin() was called */
        }).begin();
        webgazer.showPredictionPoints(true); /* shows a square every 100 milliseconds where current prediction is */

    //Set up the webgazer video feedback.
    var setup = function() {

        //Set up the main canvas. The main canvas is used to calibrate the webgazer.
        var canvas = document.getElementById("calibrator");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        canvas.style.position = 'fixed';
        p5canvas.width = window.innerWidth;
        p5canvas.height = window.innerHeight;
    };
    setup();

    document.getElementById("facemesh").appendChild(document.getElementById("webgazerFaceOverlay"))
};



// Kalman Filter defaults to on. Can be toggled by user.
window.applyKalmanFilter = true;

// Set to true if you want to save the data even if you reload the page.
window.saveDataAcrossSessions = true;

window.onbeforeunload = function() {
    webgazer.end();
}

/**
 * Restart the calibration process by clearing the local storage and reseting the calibration point
 */
// function Restart(){
//     document.getElementById("Accuracy").innerHTML = "<a>Not yet Calibrated</a>";
//     webgazer.clearData();
//     ClearCalibration();
//     PopUpInstruction();
// }


/**
* This function occurs on resizing the frame
* clears the canvas & then resizes it (as plots have moved position, can't resize without clear)
*/
function resize() {
    var canvas = document.getElementById('calibration');
    var context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
};
window.addEventListener('resize', resize, false);
