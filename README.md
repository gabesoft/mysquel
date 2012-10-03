The original documentation is here [https://github.com/hiddentao/squel/blob/master/README.md]

Added functionality for ON DUPLICATE KEY UPDATE option for mysql insert

**INSERT**

    // INSERT INTO test (f1, f2, f3, f4, f5) VALUES (1, 1.2, TRUE, "blah", NULL) ON DUPLICATE KEY UPDATE f2=1.2, f4="blah"
    squel.insert()
        .into("test")
        .set("f1", 1)
        .set("f2", 1.2, { duplicateKeyUpdate: true })
        .set("f3", true)
        .set("f4", "blah", { duplicateKeyUpdate: true })
        .set("f5", null)
        .toString()
