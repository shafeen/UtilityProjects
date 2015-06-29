LIVEdotREDIS
============


###### General Description

LIVEdotREDIS will be used to monitor redis key values live.
It is based on a fork of release v0.1 of **LIVEdotIO**.

###### Serverside Dependencies

Make sure you have **node.js** and its corresponding package manager **npm** installed.
Also, since this is supposed to be a debug tool for REDIS, you should have a REDIS server running.

In the **Backend/** directory, run this on the terminal:
``` shell
npm install express
npm install socket.io
npm install redis
```

Apache reverse-proxy settings (may not be perfect):
```shell
# in apache2.conf file (or httpd.conf)
RewriteEngine On
RewriteRule socket.io/(.*)$ express/socket.io/$1 [R]
RewriteRule express/(.*)$ http://0.0.0.0:3000/$1 [P,L]
```
```shell
# in VirtualHost conf file (assumes express using port 3000)
ProxyPreserveHost On
ProxyPassReverse /express/ http://0.0.0.0:3000/
```

