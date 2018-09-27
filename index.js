'use strict';
const Alexa = require('ask-sdk-core');

//link with Alexa APP (My skill)
const APP_ID = 'amzn1.ask.skill.3e683c33-4490-4993-9a6a-30997a0c1543'; 

const SKILL_NAME = 'Crossfit Coach';
const WELCOME_MESSAGE = 'Welcome to Crossfit Coach. How can I help you?';
const HELP_MESSAGE = 'You can ask for your program daily workout, build a\
workout based on your desired workout type and your crossfit level or you\
can ask to define an exercise ... What can I help you with?';
const HELP_REPROMPT = 'What can I help you with?';
const STOP_MESSAGE = 'Goodbye!';
const ERROR_MESSAGE = 'Sorry, I can\'t understand the command. Please say again.'

/**
 * exercises: { exerciseName: string, exerciseDescription: string } 
 */
const exercises = [
    {name:"D. U.", description:"Double under movement is a jump up higher than usual while swinging the rope twice under his feet. ... One jump rope passes twice, DOUBLE, below the feet, UNDER you…. "},
    {name:"H. S. P. U.", description:"Handstand push-up is a type of push-up exercise where the body is positioned in a handstand position. The feet are often placed against a wall. Handstand pushups require significant strength."},
    {name:"Snatch", description:"Snatch is a weightlifting movement. The lifter lifts the bar as high as possible and pulls himself under it in a squat position, receiving the bar overhead with the arms straight, decreasing the necessary height of the bar, therefore increasing the amount of weight that the lifter may successfully lift."},
];

/**
 * workouts: { name: string, workoutDescription: string } 
 */
const runningWorkouts = [
    {name:"easy running", description:"Run intervals 1 minute intervals for 20 minutes, performing a light running on the odd minutes and walking in the even minutes."},
    {name:"medium running", description:"Alternate between running on 2 minutes intervals in a medium pace where is not easy to you to keep and walking 1 minute intervals for resting in a fast walking pace. Do that for 30 minutes."},
    {name:"hard running", description:"Run 10 kilometers in less than 1 hour. Keep your pace under 6 minutes per kilometer in the whole run."},
];

const cardioWorkouts = [
    {name:"easy lifting", description:"For time, 5  rounds of 20 D. U., 3 H. S. P. U.. Time cap 10 minutes"},
    {name:"medium lifting", description:"For time, 10 rounds of 20 D.U. 5 H. S. P. U.. Time cap 15 minutes"},
    {name:"hard lifting", description:"For time, 5 rounds of 100 D.U. 10 H.S.P.U.. Time cap 20 minutes"},
];

const liftingWorkouts = [
    {name:"easy lifting", description:"5 rounds of 1 minute. Every minute performing 3 snatches. 65 libres"},
    {name:"medium lifting", description:"5 rounds of 1 minute. Every minute performing 3 snatches. 95 libres"},
    {name:"hard lifting", description:"5 rounds of 1 minute. Every minute performing 3 snatches. Progressive load, starting on 60% of your Personal Record."},
];

//Handlers
const LaunchRequestHandler = {
  canHandle(handlerInput) {
    console.log("LaunchRequest.canHandle >>");
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
  },
  handle(handlerInput) {
    console.log("LaunchRequest.handle >>");
    console.log(JSON.stringify(handlerInput, null, 2)); // request study purpose @TODO:remove debug logs

    return handlerInput.responseBuilder
      .speak(WELCOME_MESSAGE)
      .reprompt(WELCOME_MESSAGE)
      .withSimpleCard(SKILL_NAME, WELCOME_MESSAGE)
      .getResponse();
  }
};

const buildWodIntentHandler = {
  canHandle(handlerInput) {
    console.log("buildWodIntentHandler.canHandle >>");
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'buildWod';
  },
  handle(handlerInput) {
    console.log("buildWodIntentHandler.handle >>");
    console.log(JSON.stringify(handlerInput, null, 2)); // handlerInput study purpose @TODO:remove debug logs
    
    //check if the slots are filled provided. Try to delegate the fullfilling of required slots to Alexa (prompts)
    
    //if (handlerInput.dialogState === "STARTED"){
    //} else if (handlerInput.dialogState != "COMPLETED"){
    //} else {
        //based on workout type and workout level, generate the correct workout and build response
        //send speak response
        //send graphical response with the abreviated workout

        const wod = liftingWorkouts; //@todo: get the correct workout from above algorithm
        const index = Math.floor(Math.random() * wod.length);
        const workout = wod[index];

        return handlerInput.responseBuilder
        .speak(workout.description)
        .withSimpleCard(workout.name, workout.description)
        .getResponse();
    //}
  }
};


const dailyWodIntentHandler = {
  canHandle(handlerInput) {
    console.log("dailyWodIntentHandler.canHandle >>");
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'dailyWod';
  },
  handle(handlerInput) {
    console.log("dailyWodIntentHandler.handle >>");
    console.log(JSON.stringify(handlerInput, null, 2)); // handlerInput study purpose 
    
    //if (handlerInput.dialogState === "STARTED"){
    //} else if (handlerInput.dialogState != "COMPLETED"){
    //} else {
        //connect to dynamoDB and check for context.System.user.userID
        //get history of workouts for the user
        //build workout based on algorithm (one day cardio, one day lifting, alternate muscles and so on)
        //send speak response
        //send graphical response with the abreviated workout
        
        const wod = runningWorkouts; //@todo: get the correct workout from above algorithm
        const index = Math.floor(Math.random() * wod.length);
        const workout = wod[index];
        
        return handlerInput.responseBuilder
        .speak(workout.description)
        .withSimpleCard(workout.name, workout.description)
        .getResponse();
    //}
  }
};


const HelpIntentHandler = {
  canHandle(handlerInput) {
  console.log("HelpIntentHandler.canHandle >>");
  return handlerInput.requestEnvelope.request.type === 'IntentRequest'
    && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    console.log("HelpIntentHandler.handle >>");

    return handlerInput.responseBuilder
      .speak(HELP_MESSAGE)
      .reprompt(HELP_REPROMPT)
      .withSimpleCard(SKILL_NAME, HELP_MESSAGE)
      .getResponse();
  }
};

const CancelAndStopIntentHandler = {
  canHandle(handlerInput) {
    console.log("CancelAndStopIntentHandler.canHandle >>");
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
      || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    console.log("CancelAndStopIntentHandler.handle >>");
    return handlerInput.responseBuilder
      .speak(STOP_MESSAGE)
      .withSimpleCard(SKILL_NAME, STOP_MESSAGE)
      .getResponse();
  }
};


const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    console.log("SessionEndedRequestHandler.canHandle >>");
    return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    //any cleanup logic goes here
    console.log("SessionEndedRequestHandler.handle >>");
    return handlerInput.responseBuilder.getResponse();
  }
};


const ErrorHandler = {
  canHandle() {
    console.log("ErrorHandler.canHandle >>");
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak(ERROR_MESSAGE)
      .reprompt(ERROR_MESSAGE)
      .getResponse();
  },
};


exports.handler = Alexa.SkillBuilders.custom()
  .addRequestHandlers(
    LaunchRequestHandler,
    buildWodIntentHandler,
    dailyWodIntentHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler)
  .addErrorHandlers(ErrorHandler)
  .lambda();

