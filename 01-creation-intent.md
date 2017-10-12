Intents are the backbone of Dialogflow projects. Each intent describes a mapping between what a user says and what action should be taken by your software. In this step, we'll create an intent that will allow you to add new items to your todo list.

# Create a new intent

![](screenshots/01-creation-intent/01-create-intent.markedup.png)
- Navigate to the Intents page.
- Click on the `Create intent` button.

![](screenshots/01-creation-intent/02-create-intent-name-user-says.markedup.png)
- Give your intent a name. This can be anything. We are calling ours `Add item`.
- In the `User says` section, add some expressions that you think people would use to create a new item. Here are some examples:
  - Create new item
  - New item
  - New todo
  - Make a new item
  - Create a todo
- Your examples don't have to be comprehensive: Dialogflow automatically combines aspects of the examples you provide to generate new ones. For example, given the examples above, Dialogflow will also invoke your new intent when the user says _"Make new todo"_.

![](screenshots/01-creation-intent/03-create-intent-parameter.markedup.png)
- Click on the quotation mark symbol (`"`) in the left of the `User says` input box. It should be replaced by an `@` symbol.
- You're now in template mode. Try entering these templates:
  - Add `@sys.any:text` as a new todo
  - Create an item to `@sys.any:text`
  - Make a todo with description `@sys.any:text`
- `@sys.any:text` should be highlighted in both examples. This means that, if a user enters _"Create an item to wash the dishes"_, the intent will be invoked with the parameter `text` set to `wash the dishes`.
- You can see a list of the intent's parameters in the `Action` section. Right now, you only have one parameter: `text`.
- Make the `text` parameter required by checking the checkbox in the leftmost column of the parameter table.
- Click on the `Define prompts` link in the rightmost column of the parameter table.
- Add a prompt for when the user doesn't provide any text for the todo, e.g. _"What is the description of your new todo item?"_

- Click on the `Save` button.

# Set up webhook fulfillment for the intent

![](screenshots/01-creation-intent/04-create-intent-fullfilment.markedup.png)
- Open the `Fulfillment` section of the intent editing page.
- Check the `Use webhook` checkbox.
- Navigate to the `Fulfillment` page. Don't forget to save your intent first!
- Insert code to create a new todo item and respond to the user on 'Step 1' section.
```
var item = parameters['text'];
if (item) {
  todoListRef.push({
    status: "incomplete",
    text: item,
  });
  respond('New item added successfully');
} else {
  respond('Error. You should say the item name');
}
```
- `TODO: explanation of code here`
- Deploy your new code.

# Set up Firebase database 

TODO: change db rules to true, no auth

# Test the intent

![](screenshots/01-creation-intent/05-create-intent-simulate.png)
- Open the [Actions for Google](https://console.actions.google.com), select your project and navigate to the Simulator page.
- In the Actions for Google simulator, type or say _"Talk to my test app"_, then create a new todo item using the intent you just created.

![](screenshots/01-creation-intent/06-create-intent-database.markedup.png)
- Open the [Firebase Console](https://console.firebase.google.com) and navigate to the Database page.
- Check that the newly-created todo exists in the database.
