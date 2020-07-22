#!/bin/bash
 mongoimport --host mongodb  --db wireframe --collection colors  --type json --file  /mongo-seed/colors.json --jsonArray
 mongoimport --host mongodb  --db wireframe --collection users  --type json --file  /mongo-seed/users.json --jsonArray
 