var numeral = require('../../numeral'),
    language = require('../../languages/pl-PL');

numeral.language('pl', language);

exports['language:pl'] = {
    setUp: function (callback) {
        numeral.language('pl');
        callback();
    },

    tearDown: function (callback) {
        numeral.language('en-US');
        callback();
    },

    format: function (test) {
        test.expect(16);

        var tests = [
            [10000,'0,0.0000','10 000,0000'],
            [10000.23,'0,0','10 000'],
            [-10000,'0,0.0','-10 000,0'],
            [10000.1234,'0.000','10000,123'],
            [-10000,'(0,0.0000)','(10 000,0000)'],
            [-0.23,'.00','-,23'],
            [-0.23,'(.00)','(,23)'],
            [0.23,'0.00000','0,23000'],
            [1230974,'0.0a','1,2mln'],
            [1460,'0a','1tys.'],
            [-104000,'0a','-104tys.'],
            [1,'0o','1.'],
            [52,'0o','52.'],
            [23,'0o','23.'],
            [100,'0o','100.'],
            [1,'0[.]0','1']
        ];

        for (var i = 0; i < tests.length; i++) {
            test.strictEqual(numeral(tests[i][0]).format(tests[i][1]), tests[i][2], tests[i][1]);
        }

        test.done();
    },

    currency: function (test) {
        test.expect(4);

        var tests = [
            [1000.234,'0,0.00$','1 000,23PLN'],
            [-1000.234,'(0,0$)','(1 000PLN)'],
            [-1000.234,'0.00$','-1000,23PLN'],
            [1230974,'(0.00a$)','1,23mlnPLN']
        ];

        for (var i = 0; i < tests.length; i++) {
            test.strictEqual(numeral(tests[i][0]).format(tests[i][1]), tests[i][2], tests[i][1]);
        }

        test.done();
    },

    percentages: function (test) {
        test.expect(4);

        var tests = [
            [1,'0%','100%'],
            [0.974878234,'0.000%','97,488%'],
            [-0.43,'0%','-43%'],
            [0.43,'(0.000%)','43,000%']
        ];

        for (var i = 0; i < tests.length; i++) {
            test.strictEqual(numeral(tests[i][0]).format(tests[i][1]), tests[i][2], tests[i][1]);
        }

        test.done();
    },

    unformat: function (test) {
        test.expect(10);

        var tests = [
            ['10 000,123',10000.123],
            ['(0,12345)',-0.12345],
            ['(1,23mlnPLN)',-1230000],
            ['1,23mlnPLN',1230000],
            ['10tys.',10000],
            ['-10tys.',-10000],
            ['23.',23],
            ['10 000,00PLN',10000],
            ['-76%',-0.76],
            ['2:23:57',8637]
        ];

        for (var i = 0; i < tests.length; i++) {
            test.strictEqual(numeral().unformat(tests[i][0]), tests[i][1], tests[i][0]);
        }

        test.done();
    }
};