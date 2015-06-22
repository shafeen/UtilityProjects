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

Feature Goals:
----------------
- modify current LIVEdotIO views (the data in the model)
- add new LIVEdotIO views depending on **$event** data
- remove currently active LIVEdotIO views
- customizable views and models


#### Version 0.1:
###### Overview:
You can send an event/viewname to the frontend depending on some logic that the developer
will decide in the backend.

The frontend receives an event/viewname from the backend and then creates/updates/deletes
a LIVEdotIO view on the page. Note that right now the views should exactly map from the
simple model we have in place.

The part of the data the frontend receives to display on the view will be encapsulated
in a model sent from the backend.

There is a very basic default template view in place as our LIVEdotIO view in the frontend
which consists of a single **div** containing an **<h4>** and 2 **<p>** elements.
We also have a very simple LIVEdotIO model in place in the backend corresponding to
our simple view.

Project based on version 0.1 source code: **RedisLive** (coming soon)

More descriptions (and code snippets) coming soon....

