basicMEAN (a starter project)
---

#### Authentication
**POST** : `/authenticate/signup`  
params: `{ email: String, password: String }`
  
**POST** : `/authenticate/login`  
params: `{ email: String, password: String }`  
  
#### Rendering partial views
Place template (pug/jade) files for partial pages for modules (ng-views, etc)
in the `views/partials/` folder. For example: all the templates used by the navbar
can be found in `/views/partials/navbar`.

When trying to render a partial view from the client (an ng-include for example), 
use the following address format: `/partials/<module>/<view>`. 