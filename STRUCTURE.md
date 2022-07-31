/onboarding
-> create admin user
-> set default language
-> create first object

/signup
/login
/logout
/gdpr -> delete account and all its personal data

<!-- ADMIN/MANAGER -->
/items (object)
-> POST 
-> PUT
-> DEL
-> GET

items has:
- typeName (eg Tours, Tables, ...)
- Multiple String-types (eg: Name of tour "Ghent", Description, etc..)
- Multiple Num-types (eg: a tour can have duration, )
- Multiple Array-types (eg: I want each tour to have toggle(s) for food, etc)
        -> dropdown
- Multiple Dictionary-types
        -> checkbox list
- they all have a value description. eg num type "Duration" will have "in minutes", and a tour can be 120 long. 

/pages
-> POST 
-> PUT
-> DEL
-> GET

<!-- USERS -->
/bookings
-> POST make reservation
-> PUT update reservation
-> DEL cancel reservation
-> GET show reservation

/