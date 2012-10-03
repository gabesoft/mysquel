var squel = require('./squel')
  , insertSet = squel.Insert.prototype.set
  , insertToString = squel.Insert.prototype.toString;

function formatValue (value, options) {
    if (null === value) {
        value = "NULL";
    } else if ("boolean" === typeof value) {
        value = value ? "TRUE" : "FALSE";
    } else if ("number" !== typeof value) {
        if (false === options.usingValuePlaceholders) {
            value = "'" + value + "'";
        }
    }
    return value;
}

squel.Insert.prototype.set = function(field, value, options) {
    this.fieldOptions = this.fieldOptions || {};
    this.fieldOptions[field] = options;
    return insertSet.apply(this, [field, value]);
};

squel.Insert.prototype.toString = function() {
    var result   = insertToString.apply(this)
      , options  = this.options
      , foptions = this.fieldOptions || {}
      , values   = this.fields
      , update   = '';

    Object.keys(foptions).forEach(function(field) {
        var opts = foptions[field];
        if (opts && opts.duplicateKeyUpdate) {
            update += field + '=' + formatValue(values[field], options);
            update += ', ';
        }
    });

    if (update.length > 0) {
        update = update.substring(0, update.length - 2);
        return result + ' ON DUPLICATE KEY UPDATE ' + update;
    } else {
        return result;
    }
};

module.exports = squel;
