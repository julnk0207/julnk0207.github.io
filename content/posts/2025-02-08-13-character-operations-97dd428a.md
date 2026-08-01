---
title: "[SQL First Step] 13. Character Operations"
description: "To combine characters use +(SQL Server), (Oracle, DB2, PostgreSQL), or CONCAT(MySQL)."
date: 2025-02-08
category: "Book"
subcategory: "SQL First Step"
tags:
  - "SQL First Step"
  - "SQL"
linkedin:
  status: draft
  summary: ""
  postId: ""
x:
  status: draft
  summary: ""
  postId: ""
---

## Combining Character

To combine characters use +(SQL Server), ||(Oracle, DB2, PostgreSQL), or `CONCAT`(MySQL).

```sql
mysql> SELECT * FROM sample35;
+------+-------+----------+------+
| no   | price | quantity | unit |
+------+-------+----------+------+
|    1 |   100 |       10 | 개   |
|    2 |   230 |       24 | 통   |
|    3 |  1980 |        1 | 장   |
+------+-------+----------+------+
3 rows in set (0.00 sec)

mysql> SELECT CONCAT(quantity, unit) FROM sample35;
+------------------------+
| CONCAT(quantity, unit) |
+------------------------+
| 10개                   |
| 24통                   |
| 1장                    |
+------------------------+
3 rows in set (0.00 sec)
```

## Extracting Character

To extract character, use

```
SUBSTRING
```

(

```
SUBSTR
```

for some products).

## Removing Space in the front and back

To remove space in the front and back of a character, use

```
TRIM
```

. This will not remove space between the character.

By setting parameters, you can remove other character instead of space.

## Length of Character

To return length of character, use `CHARACTER_LENGTH`(or `CHAR_LENGTH`).

`OCTET_LENGTH` will return the character length in byte unit. The byte length is not always same as the length of character, according to the character set.

> For Korean, ‘EUC-KR’ and ‘UTF-8’ are common encoding methods. In ‘EUC-KR’, ASCII is 1 byte, and Korean is 2 byte. In ‘UTF-8’, ASCII is 1 byte, and Korean is 3 byte.
> 

*All images, except those with separate source indications, are excerpted from lecture materials.*
