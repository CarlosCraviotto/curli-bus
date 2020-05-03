import chai = require('chai');
import {QueryBusSync} from '../../QueryBusSync';
import {QueryInstanceType} from '../../Types';

let bus: QueryBusSync;

class QueryTest {

    public name?: string;
    [key: string]: any

}

let nameProperty = 'test';
let queryTest: QueryTest = new QueryTest();

describe('QueryBusSync app', function () {

    beforeEach(()=>{

        bus = new QueryBusSync();

        nameProperty = 'test';
        queryTest = new QueryTest();
        queryTest.name = nameProperty;
    });

    it('Should register a handler function and be called after the ask.', function () {

        bus.registerHandler(QueryTest, function (query: QueryInstanceType): any {
            return query;
        });

        const queryTestResult = bus.ask(queryTest);
        chai.assert.deepEqual(nameProperty, queryTestResult.name);
    });

});
