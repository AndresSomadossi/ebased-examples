# ebased-examples
Examples using ebased as main library

## Commands


### Function Invocation
- export AWS_DEFAULT_REGION=us-east-1 && export AWS_REGION=us-east-1 && export AWS_PROFILE=myawsprofile

- ebased invoke -f ExchangeCreateExchange
- ebased invoke -f ExchangeGetRate
- ebased invoke -f ExchangeReportExchange
- ebased invoke -f AccountCreateDeposit
- ebased invoke -f AccountCreateWithdrawal
- ebased invoke -f WalletGetBalance
- ebased invoke -f WalletGetTransactions


### Deploy
- export AWS_DEFAULT_REGION=us-east-1 && export AWS_PROFILE=myawsprofile
- sls deploy

### Lambda Invocation Logs
- sls logs -f createExchange
- sls logs -f getRate
- sls logs -f reportExchange