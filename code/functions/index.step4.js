'use strict';

const functions = require('firebase-functions'); // Cloud Functions for Firebase library
const DialogflowApp = require('actions-on-google').DialogflowApp; // Google Assistant helper library
const firebase = require('firebase');

const googleAssistantRequest = 'google'; // Constant to identify Google Assistant requests

/*
    Set the configuration for your app
    1. Visit the Firebase console: https://console.firebase.google.com/
    2. Click on the card for your project
    3. Click on the 'Add Firebase to your web app' button
    4. Copy the credentials from the pop-up into the object below
*/

const config = {
    // Insert configuration here
};
firebase.initializeApp(config);

// Get database reference and Todo List reference from firebase
var database;
var todoListRef;

if (config.databaseURL) {
    database = firebase.database();
    todoListRef = database.ref('todos');
}

exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
    console.log('Request headers: ' + JSON.stringify(request.headers));
    console.log('Request body: ' + JSON.stringify(request.body));

    // An action is a string used to identify what needs to be done in fulfillment
    let action = request.body.result.action; // https://dialogflow.com/docs/actions-and-parameters

    // Parameters are any entites that Dialogflow has extracted from the request.
    const parameters = request.body.result.parameters; // https://dialogflow.com/docs/actions-and-parameters

    // Contexts are objects used to track and store conversation state
    const inputContexts = request.body.result.contexts; // https://dialogflow.com/docs/contexts

    // Get the request source (Google Assistant, Slack, API, etc) and initialize DialogflowApp
    const requestSource = (request.body.originalRequest) ? request.body.originalRequest.source : undefined;
    const app = new DialogflowApp({
        request: request,
        response: response
    });

    // Function to send correctly formatted Google Assistant responses to Dialogflow which are then sent to the user
    function sendGoogleResponse(responseToUser) {
        if (typeof responseToUser === 'string') {
            app.ask(responseToUser); // Google Assistant response
        } else {
            // If speech or displayText is defined use it to respond
            let googleResponse = app.buildRichResponse().addSimpleResponse({
                speech: responseToUser.speech || responseToUser.displayText,
                displayText: responseToUser.displayText || responseToUser.speech
            });

            // Optional: Overwrite previous response with rich response
            if (responseToUser.googleRichResponse) {
                googleResponse = responseToUser.googleRichResponse;
            }

            // Optional: add contexts (https://dialogflow.com/docs/contexts)
            if (responseToUser.googleOutputContexts) {
                app.setContext(...responseToUser.googleOutputContexts);
            }

            app.ask(googleResponse); // Send response to Dialogflow and Google Assistant
        }
    }

    // Function to send correctly formatted responses to Dialogflow which are then sent to the user
    function sendResponse(responseToUser) {
        // if the response is a string send it as a response to the user
        if (typeof responseToUser === 'string') {
            let responseJson = {};
            responseJson.speech = responseToUser; // spoken response
            responseJson.displayText = responseToUser; // displayed response
            response.json(responseJson); // Send response to Dialogflow
        } else {
            // If the response to the user includes rich responses or contexts send them to Dialogflow
            let responseJson = {};

            // If speech or displayText is defined, use it to respond (if one isn't defined use the other's value)
            responseJson.speech = responseToUser.speech || responseToUser.displayText;
            responseJson.displayText = responseToUser.displayText || responseToUser.speech;

            // Optional: add rich messages for integrations (https://dialogflow.com/docs/rich-messages)
            responseJson.data = responseToUser.richResponses;

            // Optional: add contexts (https://dialogflow.com/docs/contexts)
            responseJson.contextOut = responseToUser.outputContexts;

            response.json(responseJson); // Send response to Dialogflow
        }
    }

    function respond(response) {
        // Use the Actions on Google lib to respond to Google requests; for other requests use JSON
        if (requestSource === googleAssistantRequest) {
            sendGoogleResponse(response); // Send simple response to user
        } else {
            sendResponse(response); // Send simple response to user
        }
    }

    // Create handlers for Dialogflow actions as well as a 'default' handler
    // Use the "respond" function to respond to user input with plain text
    const actionHandlers = {
        'create': () => {
            // Step 1
            // Create a new to-do item from the given text
            // The text of the new to-do item is stored in parameters.text

            // text is the text of the new todo being created.
            const text = parameters.text;
            if (text) {
                // Add the new todo to the database as a child of the existing todo node.
                todoListRef.push({
                    status: "incomplete",
                    text,
                });
                // Respond to indicate the todo was created successfully.
                respond(`OK, I just added "${text}".`);
            } else {
                // If text is falsy, respond with an error message.
                // If you're seeing this response, check that the text parameter in the intent
                // is required and that you've specified a prompt for it. If you've taken these
                // steps, Dialogflow should prompt the user to specify the text, rather than
                // making a request to your project's Firebase Function without the text parameter.
                respond('Error: no item name specified.');
            }
        },

        'show': () => {
            // Step 2
            // List the uncompleted to-do items created so far

            // Read the todo list out of the database, then call the callback with the value as argument.
            todoListRef.once('value', snapshot => {
                const todoList = snapshot.val();
                // Check if the list is empty.
                if (!todoList || Object.keys(todoList).length === 0){
                    respond("Your todo list is empty.");
                } else {
                    var index = 1;
                    // Create a list of todos, with the completed ones marked with [DONE].
                    const listText = Object.keys(todoList)
                        .map(key => {
                            const { text, status } = todoList[key];
                            const line = `[${index}] ${text}${status === "complete" ? " [DONE]" : ""}`;
                            index++;
                            return line;
                        })
                        .join(',\n');
                    respond(`Here are your todos: \n${listText}`);
                }
            });
        },

        'complete': () => {
            // Step 3
            // Complete a to-do item
            // The index of the item to complete is stored in parameters.index

            // itemNumber is the index of the specified todo, converted to an integer.
            const itemNumber = parseInt(parameters.index);
            if (!itemNumber || isNaN(itemNumber)) {
                respond('Error: couldn\'t parse the item number.');
            } else {
                // Read the todo list out of the database, then call the callback with the value as argument.
                todoListRef.once('value', snapshot => {
                    const todoList = snapshot.val();
                    // If todoList is null or undefined, Object.keys(todoList) will throw an error. In this
                    // case, we default to an empty object so that keys will be the empty array.
                    const keys = Object.keys(todoList || {});
                    // Only proceed if todoList exists and itemNumber is between one and the number
                    // of items in the todo list.
                    if (todoList && itemNumber > 0 && itemNumber <= keys.length) {
                        const key = keys[itemNumber - 1];
                        let item = todoList[key];
                        item.status = 'complete';
                        // Update the item's status in the database.
                        database.ref(`todos/${key}`).update(item);
                        respond(`Completed todo number ${itemNumber}.`);
                    } else {
                        respond(`There is no todo number ${itemNumber}.`);
                    }
                });
            }
        },

        'update': () => {
            // Step 4
            // Update a to-do item with the given text
            // The updated text is stored in parameters.text
            // The index of the item to update is stored in parameters.index

            const itemNumber = parseInt(parameters.index);
            const itemText = parameters.text;

            if (!itemNumber || isNaN(itemNumber)) {
                respond('Error: couldn\'t parse the item number.');
            } else if (!itemText) {
                respond('Error: no item text specified.');
            } else {
                // Read the todo list out of the database, then call the callback with the value as argument.
                todoListRef.once('value', snapshot => {
                    const todoList = snapshot.val();
                    // If todoList is null or undefined, Object.keys(todoList) will throw an error. In this
                    // case, we default to an empty object so that keys will be the empty array.
                    const keys = Object.keys(todoList || {});
                    // Only proceed if todoList exists and itemNumber is between one and the number
                    // of items in the todo list.
                    if (todoList && itemNumber > 0 && itemNumber <= keys.length) {
                        const key = keys[itemNumber - 1];
                        let item = todoList[key];
                        item.text = itemText;
                        // Update the item's status in the database.
                        database.ref(`todos/${key}`).update(item);
                        respond(`Todo number ${itemNumber} updated to "${itemText}".`);
                    } else {
                        respond(`There is no todo number ${itemNumber}.`);
                    }
                });
            }
        },

        // Default handler for unknown or undefined actions
        'default': () => {
            respond('Sorry, I didn\'t understand that.');
        },
    };

    // If undefined or unknown action use the default handler
    if (!actionHandlers[action]) {
        action = 'default';
    }

    // Run the proper handler function to handle the request from Dialogflow
    actionHandlers[action]();
});
