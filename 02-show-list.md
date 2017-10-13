# Create a show list intent

![](screenshots/02-show-list/01-show-list.png)
- In the Dialogflow tab, navigate to the Intents page.
- Click on the `Create intent` button.
- Give your intent a name.
- In the `User says` section, add some expressions that you think people would use to show the to-do list. Here are some examples:
  - Show list
  - Show items list
  - Show todo list
  - Show items
- Enter action name as `show`.
- Check the `Use webhook` checkbox under the Fulfillment section.
- Click on the `Save` button.

# Set up fulfillment for the intent

- Navigate to the Fulfillment page.
- Insert code to create a new todo item and respond to the user. This code should go after the comment section `// Step 2`.
```
// check if the list is empty
if (!todoList || Object.keys(todoList).length === 0) return "Your list is empty";
var list = "";
// concat all the item into a string
Object.keys(todoList).forEach(id => {
  list += todoList[id].text + ",  \n";
});
// remove the last comman
list = list.slice(0, -4);
// send the response
respond(`Here is your list:  \n${list}`);
```
- Here, we are iterating over all the todo list and building a large string for output.
- We use the `respond` function to send a response to Google Assistant.
- Deploy your new code.

# Test the intent

- In the Actions for Google simulator, type or say _"Talk to my test app"_, then _"Show todo list"_.
