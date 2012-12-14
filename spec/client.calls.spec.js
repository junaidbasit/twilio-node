var config = require('../config'),
    twilio = require('../index');

describe('The Twilio REST Client Calls resource', function () {
    //create a client with a valid account SID and authToken for live testing
    var client = new twilio.RestClient(config.accountSid, config.authToken);

    var instanceSid;

    it('initiates a call from a purchased twilio number', function(done) {
        client.account.calls.create({
            to:config.to,
            from:config.from,
            url:'https://demo.twilio.com/welcome/voice'
        }, function(err, data) {
            expect(err).toBeFalsy();
            expect(data.sid).toBeDefined();
            instanceSid = data.sid;
            done();
        });
    });

    it('gets information about a specific call', function(done) {
        client.account.calls(instanceSid).get(function(err,data) {
            expect(data.sid).toBe(instanceSid);
            done();
        });
    });

    it('gets a list of calls for a specific number', function(done) {
        client.account.calls.get({
            from:config.from
        }, function(err, data) {
            expect(data.calls[0].from).toBe(config.from);
            done();
        });
    });
});