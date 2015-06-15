LIVEdotIO
=========


###### General Description

A (socket io based) live backend to frontend data publisher.

Backend process grabs the relevant published info from the backend and then publishes
it with an event name "$event" where the $event name is a variable.

Frontend client received the data from the $event and then parses it into a **model**
and then displays the model data into a **view**.
The **model** will be a JavaScript object.
The **view** will consist of customized HTML elements.


Features:
---------
- modify current LIVEdotIO views (the data in the model)
- add new LIVEdotIO views depending on $event data
- remove currently active LIVEdotIO views