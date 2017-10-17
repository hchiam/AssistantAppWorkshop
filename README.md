Use Actions on Google, Dialogflow, and Firebase to create a todo application with a conversational UI.

# Missed part of the workshop?

To catch up, complete [Step 0](./00-setup.md), then update your application to reach one of the [checkpoints](./checkpoints.md).

# Steps

In Step 0, you'll set up a new Actions on Google application, backed by Dialogflow and Firebase.

In Steps 1 through 4, you'll add four pieces of functionality to your application: creating new todos, listing existing ones, and updating a todo's status and text.

After each step, you'll get to test your application's new functionality through the Actions on Google simulator.

## [Step 0: Setup](./00-setup.md)

- Create an Actions on Google project
- Connect the Actions on Google project to Dialogflow
- Integrate the Dialogflow project with Firebase through the Inline Editor
- Setup Firebase Database
- Enable Dialogflow's Small Talk feature

## [Step 1: Create Item](./01-create-item.md)

- Create an intent that creates a new todo
- Change the project's Firebase Function to add the todo to Firebase Database

## [Step 2: Show List](./02-show-list.md)

- Create an intent that lists the todos stored in Firebase Database
- Change the project's Firebase Function to show the todo list from the Firebase Database 

## [Step 3: Complete Item](./03-complete-item.md)

- Create an intent that marks a todo as completed
- Change the project's Firebase Function to update the todo's status in Firebase Database

## [Step 4: Update Item](./04-update-item.md)

- Create an intent that updates the text of a todo
- Change the project's Firebase Function to store the updated text in Firebase Database

# Resources
- [Apple SiriKit](https://developer.apple.com/sirikit/)
- [SiriKit Tutorial](https://www.raywenderlich.com/155732/sirikit-tutorial-ios)
- [Alexa Skills Kit](https://developer.amazon.com/alexa-skills-kit)
- [Natural Language Processing with Deep Learning - Stanford University](https://www.youtube.com/watch?v=OQQ-W_63UgQ)
- [Overview of Natural Language Processing](https://www.tutorialspoint.com/artificial_intelligence/artificial_intelligence_natural_language_processing.htm)
- [A UXer's guide to Voice UIs](https://uxplanet.org/a-uxers-guide-to-voice-uis-803188d67b0f)
- [Uncovering Voice UI Design Patterns](https://www.cooper.com/journal/2017/6/uncovering-voice-ui-design-patterns)
- [The Machine is Learning](https://www.theverge.com/2017/5/17/15651246/google-assistant-iphone-ai-future-interface-io-2017)
- [Siri, Cortana, Alexa and Google Assistant are just the beginning: Voice is the future](http://www.zdnet.com/article/siri-cortana-alexa-and-google-assistant-are-just-the-beginning-voice-is-the-future/)
