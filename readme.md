#offline chat viewer

A HTML template for viewing and reading ChatGPT conversation without internet connection.

### How to setup?
First you need to setup a web server hosting files inside the repo.

Then you need to provide the conversation JSON file you want to view. This part is tricky the API changes often and i cant provide a solid solution. You need to download the conversation manually.

save the JSON data inside the chat folder.(i.e ```/chat/123.json```)

The chat will be accessible via ```/?c=ID``` parameter (i.e ```http://localhost/?c=123```)

### How to download my conversation JSON file
As of right now (Aug 2026), Use your browser (Firefox) debugger menu. Open the desired web page. In the network inspection look for something like ``` https://chatgpt.com/backend-api/conversations/abcd1234-1234-1234-1234-abcd12345678?include_has_versions=true&num_turns=10 ```. Right click on it, and click 'fetch in console'. Change the URL to ``` https://chatgpt.com/backend-api/conversation/abcd1234-1234-1234-1234-abcd12345678 ```. Add a "res=" at the beginning.
it becomes something like:
``` js
res=await fetch("https://chatgpt.com/backend-api/conversation/abcd1234-1234-1234-1234-abcd12345678", {
    "credentials": "include",
    "headers": {
    ///
}});
```
Click enter. Then you can copy the result into your clipboard with
``` js
res=await (await res.blob()).text(); navigator.clipboard.writeText(res);
```
if you got error like
```
Uncaught (in promise) DOMException: Clipboard write was blocked due to lack of user activation.
```
click on copy on any message in the page, it give script access to clipboard for few seconds then execute this line again
``` js
navigator.clipboard.writeText(res);
```

## Also

#### chats/0.json
this file contains conversation indexes for searching algorithm.
#### chats/index.json
this file contains conversation for the chats list menu.
#### tools/index.html
use this file generate your own ```0.json```. configure the list of chats to crawl and open it inside the browser ```http://localhost/tools/index.html```
#### tools/trim.js
in case you wanna share the chats with other in public or tools/index.html failed, use this script this remove metadata inside the JSON file.
```
node ./tools/trim.js ./chats/123.json
```