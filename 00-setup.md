# Create an Actions on Google project

![](screenshots/00-setup/01-actions-on-google-homepage.markedup.png)
- Visit https://developers.google.com/actions/.
- Click on the "Actions console" button in the top-right corner.
- If necessary, sign in to your Google account.

![](screenshots/00-setup/02-actions-on-google-console.markedup.png)
- Once you've reached the Actions on Google console, click on the "Add/import project" button.

![](screenshots/00-setup/03-actions-on-google-add-project.markedup.png)
- Give your project a name and choose your country.
- Click on the "Create project" button.

# Connect the Actions on Google project to Dialogflow

![](screenshots/00-setup/04-build-dialogflow-app.markedup.png)
- On the overview page for you Actions on Google project, click on the "Build" button in the Dialogflow card.

![](screenshots/00-setup/05-build-dialogflow-app-popup.markedup.png)
- In the pop-up that appears, click on the "Create actions on Dialogflow" card.
- This will open Dialogflow in a new tab.
- Sign in to Google again if necessary.

![](screenshots/00-setup/06-dialogflow-save-app.markedup.png)
- In the tab containing Dialogflow, after signing in to Google, you'll end up on the project creation page.
- Click on the "Save" button.

![](screenshots/00-setup/07-dialogflow-intents-page.markedup.png)
- After saving the project, you'll be redirected to the Intents page.
- Click on the Integrations page in the menu on the left.

![](screenshots/00-setup/08-dialogflow-integrations-page.markedup.png)
- Double-check that the Google Assistant integration is enabled.
- Click on the Google Assistant card.

![](screenshots/00-setup/08.5-dialogflow-update-draft.markedup.png)
- Click on the "Update draft" button.

![](screenshots/00-setup/08.6-dialogflow-draft-updated.markedup.png)
- Click on the "Close" button.

# Enable Inline Editor

The Inline Editor allows you to deploy and edit Firebase Functions from your browser. We'll use Firebase Functions to create, edit, and delete todos that we'll store in Firebase Database.

![](screenshots/00-setup/09-dialogflow-integrations-page.markedup.png)
- Click on the Fulfillment page in the menu on the left.

![](screenshots/00-setup/10-dialogflow-enable-inline-editor.markedup.png)
- Enable the Inline Editor.
- Replace the code in the editor with [scaffold.js](code/scaffold.js).
- Switch to the `package.json` tab in the editor.
- Replace the code in the editor with [package.json](code/package.json).

![](screenshots/00-setup/11-dialogflow-deploy-inline-editor.markedup.png)
- Click on the "Deploy" button.
- This may take a few minutes.
- You can continue with the rest of the setup during the deployment.

![](screenshots/00-setup/12-dialogflow-inline-editor-deployed.markedup.png)
- A message will appear when the deployment is finished.

# Setup Firebase Database

By default, Firebase requires authentication for read and write access. However, for the purposes of this tutorial, we will bypass that and open up permissions to our database. **IMPORTANT: Never do this in production**

![](screenshots/00-setup/17-dialogflow-inline-editor-firebase.markedup.png)
- Click on the "View execution logs in the Firebase console" link to open your Firebase page.

![](screenshots/00-setup/20-firebase-setup-rule.markedup.png)
- Navigate to the `Database page`
- Switch to `Rules` tab
- Change the .read and .write to true.
- Click on `Publish`

![](screenshots/00-setup/18-firebase-database-setup.markedup.png)
- Navigate to the Overview page
- Click on the "Add Firebase to your web app" icon

![](screenshots/00-setup/19-firebase-database-setup-config.markedup.png)
- Copy the config content
- Past this code into the config variable on the Inline Editor (line 19)
- Click on the "Deploy" button.

# Enable Small Talk

Dialogflow's Small Talk feature allows your application to respond to simple questions like "How are you?"

![](screenshots/00-setup/13-dialogflow-click-on-small-talk.markedup.png)
- Click on the Small Talk page in the menu on the left.

![](screenshots/00-setup/14-dialogflow-enable-small-talk.markedup.png)
- Enable Small Talk.

## Bonus: customize your application's small talk!

- Open one of the sections under the heading "Small Talk Customization Progress" and add some custom responses to common questions.

# Test your Actions on Google project

![](screenshots/00-setup/15-click-on-simulator.markedup.png)
- Switch back to the tab containing Actions on Google.
- Refresh the page if necessary.
- Click on the "Test draft" button.

![](screenshots/00-setup/16-talk-to-my-test-app.markedup.png)
- Type or say "Talk to my test app" into the simulator on the left of the page.
- You may need to turn on Voice & Audio Activity, Web & App Activity (including Chrome browsing history), and Device Information permissions for your Google Account at https://myaccount.google.com/activitycontrols.
- Try some small talk, e.g. "How are you?" or "You're so clever."

## Bonus: test out your app on your smartphone!

- This will only work on Android phones that satisfy [these requirements](https://support.google.com/assistant/answer/7172657?co=GENIE.Platform%3DAndroid&hl=en#requirements).
- Make sure that your phone is signed in to the same Google account that you've used to create the application.
- Touch and hold the Home button or say "OK Google" to activate the Google Assistant.
- Type or say "Talk to my test app".
