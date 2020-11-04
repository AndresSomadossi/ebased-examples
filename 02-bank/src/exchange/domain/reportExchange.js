const { ReportExchangeValidation } = require('../schema/input/reportExchangeValidation');
const { ExchangeReported } = require('../schema/event/exchangeReported');

const { ReportExchangeCommand } = require('../schema/command/reportExchange');
const { reportExchange } = require('../service/externalRequestReportExchange');

module.exports = async (eventPayload, eventMeta) => {
  new ReportExchangeValidation(eventPayload, eventMeta);
  await reportExchange(new ReportExchangeCommand(eventPayload));
  const reportResult = { exchangeCreatedId: eventPayload.id, status: 'DeliveryCompleted' }
  new ExchangeReported(reportResult);
  return { body: reportResult };

}