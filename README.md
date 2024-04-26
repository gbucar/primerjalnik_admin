# Urbanome

## Setup
- clone the repository: `git clone git@github.com:gbucar/urbanome.git`
- cd inside `cd urbanome`
- install the dependencies `npm istall`

## Development
- run development server `npm run dev`
### Program structure
The whole program consist of this and the 
[super-duper-engine](https://github.com/gbucar/super-duper-engine) repository.
In this repository is everything related to the frontend and the database, in
the super-duper-engine repository is everything related to populating the 
database with actual values from noisecapture and atmotube.

**The database** is built on top of [pocketbase](https://pocketbase.io/), it is accessible via 
[http://shiny.ijs.si:8090/_/](http://shiny.ijs.si:8090/_/) inside the network
and is not (and **should not be**) accessible from the outside. This is on 
purpose.
You can experiment with the database, if you clone it on your local pc and run
pocketbase locally. The only thing you need to do there is to set up collections.
I haven't added them to git because there is sensitive data about users there 
and I am currently unaware of any option to save just the configuration.

**The frontend** is built with [sveltekit](https://kit.svelte.dev/), it is 
currently accessible via [primerjalnik.si](https://www.primerjalnik.si/).
Frontend should only access the database on the server, not on the client.

<!-- **The srvus tunnel** check out `docker-compose.yml`, it is using the  -->
<!-- [srv.us](http://srv.us/) service, via ssh. You must have an ssh key to access it -->
<!-- and the address will be different for different ssh keys, check out  -->
<!-- [Deployment](#Deployment). -->

**The updater** gets the data from noisecapture and atmotube and saves it in 
pocketbase. [super-duper-engine](https://github.com/gbucar/super-duper-engine)


## Deployment
<!-- - generate ssh key pair (`ssh-keygen`, make sure to set the folder to ./.ssh -->
<!-- in the root directory of this project, otherwise you will need to adjust  -->
<!-- docker-compose volume for srvus. Also, do not set a password) -->
- make a pb_data folder `mkdir pb_data` (probably not necessary)
- run `docker compose up` and write down the url to your app replace the one in 
docker-compose.yml with this one
- run `docker compose up -d` 
- **update:** `git clone && docker compose restart`
- don't forget to set up the updater too

## Server configuration
Currently (5. 2. 2023), everything lives on "shiny" server, in a `~/pb/urbanome`
folder. The whole project is configured as described above.

### Shiny server
There is also a crontab (check it out with `crontab -e`), that saves the 
pocketbase database every hour. All the saves are in the `~/pb/urbanome_backup`
folder. It has a healthcheck on healthchecks.io, that you can set up by changing
the url in `~/pb/urbanome_backup/backup.sh`.

### The other server
There are two important directories, `~/site-checker` and `~/super-duper-engine`.

The **site-checker** directory holds a script that checks if urbanome site is up
and reports to healthchecks.io. You have to set up a crontab, again, use 
`crontab -e` to check them all out.

The **super-duper-engine** contains the entire repository of the updater. To set
it up, follow instructions in its readme.md. Here, there are two crontabs, one 
for pocketbase updater and one for arso saver. 

