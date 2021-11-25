# Assignment Update operators 
This assignment allows you to practice update operators. 😊

### Install the modules: 
`npm install`

### 1. Set up your server
Set up the `server.js`and configure everything accordingly. 
+ Configure the .env file for mongoose (use a new database for this task)
+ Create the routes 
+ Wire up the routes

### 2. Assignment Update Operators 
We will practice the update operators.

#### Task 1. Inserting songs 
Create a new `post` route which allows you to ceate a new song into the database. 

#### Task 2. Update a song by ID  
Create a new `patch` route which allows you to update the song by ID. Make sure all fields can be updated except the `tags`.  

#### Task 3. Update the tags array of a song by ID
Create a new `patch` route which allows you to add tags to the array. Make sure that each tag can only be added once. 

Tip: 

````javascript 
const updatedItem = await Schema.findByIdAndUpdate(id, {$addToSet:{ item:item }}, {new:true})

````

#### Task 4 . Remove the first/last item from the tags array by ID
Create a new `patch` route which allows you to remove the first or last tag from the `tags` array based on a route parameter you supply. 

Tip: 

````javascript 
 const updatedItem = await Schema.findByIdAndUpdate(id, {$pop:{ item:1 }}, {new:true})

````

#### Task 5. Remove field by ID
Create a new `patch` route which allows you to remove the `genre` field from the song document by ID.

````javascript 
 const updatedItem = await Schema.findByIdAndUpdate(id, {$unset:{ field:""}}, {new:true})
````




