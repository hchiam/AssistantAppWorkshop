Intents are the backbone of Dialogflow projects. Each intent describes a mapping between what a user says and what action should be taken by your software. In this step, we'll write a "Create item" intent that is invoked when a user wants to add items to their todo list.

# Create a new intent

![](screenshots/01-create-item/01-create-intent.markedup.png)
- Navigate to the Intents page.
- Click on the `Create intent` button.

![](screenshots/01-create-item/02-create-intent-name-user-says.markedup.png)
- Give your intent a name. This can be anything. We are calling ours `Add item`.
- In the `User says` section, add some expressions that you think people would use to create a new item. Here are some examples:
  - Create a new todo
  - New item
  - New todo
  - Make a new item
  - Create a todo
  - Add a new todo
  - Add new item
- Your examples don't have to be comprehensive: Dialogflow automatically combines aspects of the examples you provide to generate new ones. For example, given the examples above, Dialogflow will also invoke your new intent when the user says _"Make new todo"_.

![](screenshots/01-create-item/03-create-intent-parameter.markedup.png)
- Click on the quotation mark symbol (`"`) in the left of the `User says` input box. It should be replaced by an `@` symbol.
- You're now in template mode. Try entering these templates:
  - Add `@sys.any:text` as a new todo
  - Add `@sys.any:text` to the list
  - Create a todo to `@sys.any:text`
  - Make a todo with description `@sys.any:text`
- `@sys.any:text` should be highlighted in all examples. This means that, if a user enters _"Create a todo to wash the dishes"_, the intent will be invoked with the parameter `text` set to `wash the dishes`.
- You can see a list of the intent's parameters in the `Action` section. Right now, you only have one parameter: `text`.
- Make the `text` parameter required by checking the checkbox in the leftmost column of the parameter table.
- Click on the `Define prompts` link in the rightmost column of the parameter table.
- Add a prompt for when the user doesn't provide any text for the todo, e.g. _"What is the description of your new todo item?"_ Dialogflow will automatically respond with this prompt when the user tries to invoke this intent without specifying the missing parameter, e.g. by saying _"Create a todo"_.
- Set the action name to `create`.
- Click on the `Save` button.

# Set up webhook fulfillment for the intent

![](screenshots/01-create-item/04-create-intent-fullfilment.markedup.png)
- Open the `Fulfillment` section of the intent editing page.
- Check the `Use webhook` checkbox.
- Navigate to the `Fulfillment` page. Don't forget to save your intent first!
- Insert code to create a new todo item and respond to the user on 'Step 1' section.
```js
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
```
- Deploy your new code.

# Test the intent

![](screenshots/01-create-item/05-create-intent-simulate.png)
- Open the [Actions for Google console](https://console.actions.google.com), select your project, and navigate to the Simulator page.
- In the Actions for Google simulator, type or say _"Talk to my test app"_, then create a new todo using the intent you just created.

![](screenshots/01-create-item/06-create-intent-database.markedup.png)
- Open the [Firebase Console](https://console.firebase.google.com), select your project, and navigate to the Database page.
- Check that the newly-created todo exists in the database.

[Move on to the next step](./02-show-list.md)
