var should = require('should')
  , squel  = require('../mysquel');

describe('insert', function() {
    it('should generate insert statement with ON DUPLICATE option', function() {
        var sql = squel.insert()
               .into('test')
               .set('f1', 1)
               .set('f2', 1.2, { duplicateKeyUpdate: true })
               .set('f3', true)
               .set('f4', 'blah', { duplicateKeyUpdate: true })
               .set('f5', null)
               .toString();

        sql.should.equal('INSERT INTO test (f1, f2, f3, f4, f5) VALUES (1, 1.2, TRUE, \'blah\', NULL) ON DUPLICATE KEY UPDATE f2=1.2, f4=\'blah\'');
    });

    it('should generate insert statement without ON DUPLICATE option', function() {
        var sql = squel.insert()
               .into('test')
               .set('f1', 1)
               .set('f2', 1.2)
               .set('f3', true)
               .set('f4', 'blah')
               .set('f5', null)
               .toString();

        sql.should.equal('INSERT INTO test (f1, f2, f3, f4, f5) VALUES (1, 1.2, TRUE, \'blah\', NULL)');
    });
});
