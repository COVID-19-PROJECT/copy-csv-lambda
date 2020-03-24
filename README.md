# extract-data-csv-lambda

This project is a AWS Lambda function with Node.js that make the job to extract the data from [CSSEGISandData /COVID-19 - repository](https://github.com/CSSEGISandData/COVID-19). Internal the lambda make a request to GitHub raw server to extract the plain text CSV in date, then format the response and upload a new *.json file to S3 Bucket.

## Usage

This AWS Lambda only need to be deployed in AWS environment and require you send the next payload:

* **baseURL:** the url from the GitHub Raw server.

Important to know, this lambda take the current date, to extract the daily file created by CSSEGISandData Repository. So, for this reason, the lambda need to be calle with a Schedule Job, to repeate every day the Job tu extract and upload new information.

## Contributing

### 1. Clone this repository

```bash
$ git clone https://github.com/COVID-19-PROJECT/extract-data-csv-lambda.git
```

### Enable git-flow in the project
```bash
$ cd extract-data-csv-lambda
$ git flow init -d
```

### Instaling dependecies

Go to the folder where the project was clone and run `npm install` or `npm i`

```bash
$ cd extract-data-csv-lambda
$ npm install
```

### Scripts in template

The scripts by default in the template are:

* **coverage**
* **lint**
* **test**

## Authors / Contributors

- Author: Alex Mejicanos - <alexmejicanos@outlook.com>
- Contributors:

