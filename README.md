# askmeanything

### Project Description
------------------------------
Askmeanything is a Q&A app developed as an  assignment for NTUA SaaS Course.<br>
The application is implemented in 3 different architectural approaches :
* [MVC](https://github.com/KosPsych/askmeanything/tree/MVC)
* [SOA](https://github.com/KosPsych/askmeanything/tree/SOA)
* [Microservices](https://github.com/KosPsych/askmeanything/tree/microservices)

### TEAM 
--------------------
* [Kostas Psychogios](https://github.com/KosPsych)
* [Giannis Lyras](https://github.com/johnlyras98)
* [Thomas Panteleakos ](https://github.com/thomaspant?tab=repositories)

### SETUP
--------------------
***For the MVC architecture***


Create a .env file with a variable db_uri = < MongodbUri >
```
npm i 
```
and then:
```
npm start 
```
and you should see the app running in localhost.<br>

If you wish,you can create a docker container for the app via :

```
docker build -t imageID .
```
and then run the image with port forwarding:

```
docker run -p <port>:3000 imageID .
 ```
 -------------------------------------
***SOA,Microservices***

Navigate to each Service and add a .env file with:
* db_uri = < your mongodb uri >
* token = < your secret token >

After,at each service's dir and at frontend's dir run :
```
npm i 
```
```
npm start 
```
If you wish,you can  create a kubernetes Cluster for your app and run via
```
skaffold dev
```
in the root of the project's dir.This requires Docker,Kubernetes and skaffold to be installed.

