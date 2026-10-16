# offline chat viewer

A HTML template for viewing and reading ChatGPT conversations without internet connection.

### How to setup?
First, you need to setup a web server, hosting files inside this repo.\
Then you will provide the conversation JSON files you want to view. This part is tricky. The API changes often and I can't provide a solid solution. You need to download the conversation manually.\
save the JSON data inside the chat folder.(i.e ```/chat/123.json```). Thenn chat will be accessible via ```/?c=ID``` URL (i.e ```http://localhost/?c=123```)

#### update
As of Oct 2026, a ChatGPT response includes a combination of markdown and html contents that markdown library cant render correctly.

## How to download my conversation JSON file
### ChatGPT
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

### Deepseek
As of right now, Deepseek response format is totally supported, and its more straight forward.\
Responses are converted internally.

``` js
res=await fetch("https://chat.deepseek.com/api/v0/chat/history_messages?chat_session_id=abcd1234-1234-1234-1234-abcd12345678", {
    "credentials": "include",
    "headers": {
        ///
    },
    "method": "GET",
    "mode": "cors"
});
```


## Also

#### chats/0.json
this file contains conversation indexes for searching algorithm.
#### chats/index.json
this file contains conversation for the chats list menu.
#### tools/index.html
use this file generate your own ```0.json```. configure the list of chats to crawl. Open it inside a browser ```http://localhost/tools/index.html```
#### tools/trim.js
in case you wanna share a file with anyone use this script this remove metadata inside the JSON file.
```
node ./tools/trim.js ./chats/123.json
```

### Support for rendering responses
ChatGPT API returns responses in a custom markdown format. I used the marked library to to turn them into html.
As of latest version these should work fine unless there is a bug with the library:\
simple and nested text formats, tables, code (spacings and indents dont work well)\
Also we dont have a copy function for tables and codes. inlined images, and voice chats, files, and many other things are not supported as well.