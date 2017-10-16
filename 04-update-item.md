# Create a update item intent

![](screenshots/04-update-item/04-update-item-intent.png)
- In the Dialogflow tab, navigate to the Intents page.
- Click on the `Create intent` button.
- Give your intent a name.
- In the `User says` section, add some expressions that you think people would use to show the to-do list. Here are some examples:
  - Update item `@sys.number-integer:index` with `@sys.any:text`
  - Change `@sys.number-integer:index` item to `@sys.any:text`
  - Update `@sys.number-integer:index` item to `@sys.any:text`
  - Change todo number `@sys.number-integer:index`
  - Update todo number `@sys.number-integer:index`
- All the items should be in template mode.
- Some other examples for when the user doesn't specify the parameters right away:
  - Change a todo
  - Update a todo
- Enter action name as `update`.
- Make the `index` and `text` parameters required by checking the checkbox in the leftmost column of the parameter table.
- Add a prompt for when the user doesn't provide any number or text
- Check the `Use webhook` checkbox under the Fulfillment section.
- Click on the `Save` button.

# Set up fulfillment for the intent

- Navigate to the Fulfillment page.
- Insert code to create a new todo item and respond to the user. This code should go after the comment section `// Step 4`.
```js
var itemNumber = parseInt(parameters['index']);
var itemText = parameters['text'];

var item;
var keys = Object.keys(todoList);
if (itemNumber > 0 && todoList && keys.length >= itemNumber) {
  keys.forEach((key, idx) => {
    if ((itemNumber - 1) === idx) {
      item = todoList[key];
      item.text = itemText;
      firebase.database().ref(`todos/${key}`).update(item);
      return;
    }
  });
}

respond(`Item #${itemNumber} updated to ${itemText}`);
```
- `TODO: explanation of code here`
- Deploy your new code.

# Test the intent

- In the Actions for Google simulator, type or say _"Talk to my test app"_, then _"Update first item with updated item"_.
