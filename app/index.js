import clock from "clock";
import document from "document";
import { me as appbit } from "appbit";
import { today } from "user-activity";

import { HeartRateSensor } from "heart-rate";

import { formatDate, hoursToAngle, minutesToAngle, secondsToAngle, zeroPadding} from "../common/utils"

import { battery, charger } from "power";

// Tick every second
clock.granularity = "seconds";

// Heart rate monitor
let hrm = null;
if (HeartRateSensor) {
  hrm = new HeartRateSensor({ frequency: 1 });
  hrm.start();
}

const hourHand = document.getElementById("hours");
const minHand  = document.getElementById("mins");
const secHand  = document.getElementById("secs");

const clockLabel     = document.getElementById("clock-label");
const dateLabel      = document.getElementById("date-label");
const heartLabel     = document.getElementById("heart-label");
const caloriesLabel  = document.getElementById("calories-label");
const distanceLabel  = document.getElementById("distance-label");
const elevationLabel = document.getElementById("elevation-label");
const activeLabel    = document.getElementById("active-label");
const stepsLabel     = document.getElementById("steps-label");
const batteryLevel   = document.getElementById("rect-battery");
const batteryWidth   = batteryLevel.width;
const batteryImg     = document.getElementById("rect-charging");


let screentapped = 0;

const goals = [document.getElementById("hearGoalGroup"),
               document.getElementById("caloriesGoalGroup"),
               document.getElementById("distanceGoalGroup"),
               document.getElementById("elevationGoalGroup"),
               document.getElementById("stepsGoalGroup")]

for (let goal of goals) {
  goal.style.visibility = 'hidden';
}

goals[screentapped].style.visibility = 'visible';

// Triggered when watch is tapped
document.getElementById('tap-target').onclick = () => {
  if (screentapped < 4) {
    goals[screentapped++].style.visibility = 'hidden';
    goals[screentapped  ].style.visibility = 'visible';
    goals[screentapped].animate("enable");
  } else {
    screentapped = 0;
    goals[4].style.visibility            = 'hidden';
    goals[screentapped].style.visibility = 'visible';
    goals[screentapped].animate("enable");
  }
};

// Second hand annimation
setInterval(() => {
  const today = new Date();
  const secs = today.getSeconds();
  document.getElementById("secsanimation").from = secondsToAngle(secs);
  document.getElementById("secsanimation").to   = secondsToAngle(secs) + 6;
  secHand.animate("enable");
}, 1000);


// Update the screen every tick
function updateClock(evt) {
  const date  = new Date();
  const hours = date.getHours();
  const mins  = date.getMinutes();
  const secs  = date.getSeconds();
    
  hourHand.groupTransform.rotate.angle = hoursToAngle(hours % 12, mins);
  minHand.groupTransform.rotate.angle  = minutesToAngle(mins, secs);
  
  clockLabel.text = `${zeroPadding(hours)}:${zeroPadding(mins)}`;
  dateLabel.text  = formatDate(date.getDay(), date.getUTCDate(), date.getMonth());
  
  heartLabel.text     = hrm.heartRate === null ? ":-(" : hrm.heartRate;
  caloriesLabel.text  = today.adjusted.calories;
  distanceLabel.text  = today.adjusted.distance / 1000;
  elevationLabel.text = today.adjusted.elevationGain;
  stepsLabel.text     = today.adjusted.steps;
  
  batteryLevel.width = Math.floor(batteryWidth * battery.chargeLevel / 100);
}
// Update the clock every tick event
clock.addEventListener("tick",  updateClock);
charger.addEventListener("change",  () => {
  charger.connected ? batteryImg.animate("enable") : batteryImg.animate("disable");
});
