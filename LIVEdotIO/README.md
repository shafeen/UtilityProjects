LIVEdotIO
=========


###### General Description

A (socket io based) live backend to frontend data publisher.

Backend process grabs the relevant published info from the backend and then publishes
it with an event name **$event** where the event name is a variable.

Frontend client received the data from the **$event** and then parses it into a **model**
and then displays the model data into a **view**.
The **model** will be a JavaScript object.
The **view** will consist of customized HTML elements.

###### Serverside Dependencies

Make sure you have **node.js** and its corresponding package manager **npm** installed.

In the **Backend/** directory, run this on the terminal:
``` shell
npm install express
npm install socket.io
```

Features:
---------
- modify current LIVEdotIO views (the data in the model)
- add new LIVEdotIO views depending on $event data
- remove currently active LIVEdotIO views


Version 0.1:
------------
Overview Coming soon!