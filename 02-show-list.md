# Create a show list intent

![](screenshots/02-show-list/01-show-list.png)
- In the Dialogflow tab, navigate to the Intents page.
- Click on the `Create intent` button.
- Give your intent a name.
- In the `User says` section, add some expressions that you think people would use to show the to-do list. Here are some examples:
  - Show list
  - Show me my todos
  - What's left on my todo list?
  - What's on my todo list?
  - Show all todos
  - Show todo list
  - Show items
- Enter action name as `show`.
- Check the `Use webhook` checkbox under the Fulfillment section.
- Click on the `Save` button.

# Set up fulfillment for the intent

- Navigate to the Fulfillment page.
- Insert code to create a new todo item and respond to the user. This code should go after the comment section `// Step 2`.
```js
todoListRef.once('value', snapshot => {
    var todoList = snapshot.val();
    // check if the list is empty
    if (!todoList || Object.keys(todoList).length === 0){
        respond("Your list is empty");
        return;
    }
    var list = "";
    // concat all the item into a string
    Object.keys(todoList).forEach(id => {
        var item = todoList[id];
        if (item.status === "complete") {
            list += "[DONE] " + item.text + ",  \n";
        } else {
            list += item.text + ",  \n";
        }
    });
    // remove the last comman
    list = list.slice(0, -4);
    // send the response
    respond(`Here is your list:  \n${list}`);
});
```
- Here, we are iterating over the entire todo list and building a large string for output.
- We use the `respond` function to send a response to Google Assistant.
- Deploy your new code.

# Test the intent

- In the Actions for Google simulator, type or say _"Talk to my test app"_, then _"Show todo list"_.
