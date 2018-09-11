# BPMS

This project develops a BPMS object capable, via REST, of defining business processes and providing a mean of tracing their execution.

Business Process Management System composed of a manager and interpreter.
The manager allows the creation processes and handling of documents

A process is a blueprint that describes what needs to be done. A document is an instance of the blueprint.

A process is subdivided into tasks logically connected forming a net

1. Process model
2. Process document
3. Render the process
4. Roles
5. Policy
5. Calendar

Interpret the process model by: verifing task data and assigning tasks.
Processes are modelled as tasks, each task has policyThe process model subdivides each task 

A document represents a new instance of a process, the user can then create more than one document related to a given process. 

A document has the following properties:

1. Unique code
2. Name of the process it represents
3. Creation date
4. Expiration date
5. User code that created the document
6. Managed by, the code of the last user who managed the document
7. Document status: closed, open or standby
8. Tasks


## Technologies

This project is built on HTML, SVG, XML, CSS, javascript, node.js and JSON.





