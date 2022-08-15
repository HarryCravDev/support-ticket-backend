# Project Information

Hey there 😄 Welcome to my ticketing web app, there are a few system components which need to be installed to get this setup on your machine. 

Please ensure you have the following technologies installed and setup:
- Nodejs
- NPM
- Docker

This project depends on another project which supplies the frontend functionality, please ensure you have this cloned and setup by following the README provided in the repo: 
- [https://github.com/HarryCravDev/support-ticket-front-end](https://github.com/HarryCravDev/support-ticket-front-end)

## Installation
1:
Let's start by installing all necessary packages to run this app. When you have support-ticket-backend
 repo cloned, navigate your way to that folder using your OS command line tool. Once you are there run...


```bash
npm install
```

2: We now need to setup our config. Navigate to the config folder and create a `dev.json`. In this folder, copy the contents from `template.json` in the same folder and paste it into your `dev.json` file. Next populate the value. If you are using docker, you can use the values shown below.

```json
dev.json
-------- copy below this line ----------
{
	"app": {
		"secret": "someSecretHere#123qwe"
	},
	"db": {
		"mongo_url": "mongodb://root:example@localhost:27017/"
	}
}
```

3:
Next we need to start up our docker containers. Navigate to the docker folder using your OS command line tool, you can find this folder in the root of the project. When you are there run the following command...
```bash
docker-compose up -d
```

4:
Before we start the app, we will need to build it. Navigate to the root of the project and run the following command...
```bash
npm run build
```

5:
Now let's start up the app. Navigate to the root of the project and run the following command...
```bash
npm run dev
```


## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.


## License
[MIT](https://choosealicense.com/licenses/mit/)