# EBASED EXAMPLES

Examples using ebased as main library. 

## Index

01) Menu: Simple Rest API with DynamoDB.
02) Bank: Async workflows using SQS and SNS.

## Commands

IN EACH NEW CONSOLE EXECUTE, THIS VARIABLES ARE NEEDED IN EACH COMMAND: 

- export AWS_DEFAULT_REGION=us-east-1 && export AWS_REGION=us-east-1 && export AWS_PROFILE=myawsprofile

#### Function Invocation

- ebased invoke -f |FuntionName| (LOCAL)
- ebased invoke -f |FuntionName| -m remote (AWS)

#### Deploy
- sls deploy

#### Lambda Invocation Logs
- sls logs -f |FuntionName|