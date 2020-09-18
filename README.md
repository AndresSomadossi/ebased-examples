# ebased-examples
Examples using ebased as main library

## Commands

### Deploy
- export AWS_DEFAULT_REGION=us-east-1 && export AWS_PROFILE=myawsprofile
- sls deploy

### Function Local Invocation
- export AWS_DEFAULT_REGION=us-east-1 && export AWS_REGION=us-east-1 && export AWS_PROFILE=myawsprofile

- sls invoke local -f createExchange  --context '{"invokedFunctionArn": "arn:aws:lambda:us-east-1:084299793407"}' -d '{"base": "USD", "destination": "EUR", "amount": 20, "meta": {"clientId": "AA3366", "trackingTag": "LOCAL01"} }'
- sls invoke local -f createExchange -d '{"base": "USD", "destination": "EUR", "amount": "0"}'
- sls invoke local -f getRate -d '{"base": "USD", "destination": "EUR"}'
- sls invoke local -f getRate -d '{"base":"USD","destination":"EUR","meta":{ "source":"createExchange"} }'
- sls invoke local -f getRate -d '{"base": "USD2", "destination": "EUR"}'
- sls invoke local -f getRate -d '{"base": "USD", "destination": "ARG"}'
- sls invoke local -f reportExchange -d '{"id":"da2b012d-57fd-4614-975a-fbc7b5c89650","baseCurrency": "USD", "baseAmount": 10, "destinationCurrency": "EUR","destinationAmount": 8.40,"rate": 0.8399126491}'

### Function Invocation

- sls invoke -f createExchange -d '{"base": "USD", "destination": "EUR", "amount": 20, "meta": {"clientId": "AA3366", "trackingTag": "AB02"} }'
- sls invoke -f createExchange -d '{"base": "USD", "destination": "EUR", "amount": "0"}'
- sls invoke -f getRate -d '{"base": "USD", "destination": "EUR"}'
- sls invoke -f getRate -d '{"base": "USD", "destination": "ARG"}'
- sls invoke -f reportExchange -d '{"id":"da2b012d-57fd-4614-975a-fbc7b5c89650","baseCurrency": "USD", "baseAmount": 10, "destinationCurrency": "EUR","destinationAmount": 8.40,"rate": 0.8399126491}'

### Lambda Invocation Logs
- sls logs -f createExchange
- sls logs -f getRate
- sls logs -f reportExchange
