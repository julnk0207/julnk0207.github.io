---
title: "[SQL First Step] 12. Numerical Operations"
description: "In SQL, basic operations such as +, -, , /, %(remainder) are supported. Priority is same as general operations."
date: 2025-02-08
category: "Book"
subcategory: "SQL First Step"
tags:
  - "SQL First Step"
  - "Database"
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

## Numerical Operations in SQL

In SQL, basic operations such as +, -, *, /, %(remainder) are supported. Priority is same as general operations.

To apply numeric operation to column, include the formula in `SELECT` phrase.

```sql
SELECT formula_1, formula_2, ... FROM table_name;
```

The following is an example of calculating total amount from price and quantity.

```sql
mysql> SELECT * FROM sample34;
+------+-------+----------+
| no   | price | quantity |
+------+-------+----------+
|    1 |   100 |       10 |
|    2 |   230 |       24 |
|    3 |  1980 |        1 |
+------+-------+----------+
3 rows in set (0.00 sec)

mysql> SELECT *, price * quantity FROM sample34;
+------+-------+----------+------------------+
| no   | price | quantity | price * quantity |
+------+-------+----------+------------------+
|    1 |   100 |       10 |             1000 |
|    2 |   230 |       24 |             5520 |
|    3 |  1980 |        1 |             1980 |
+------+-------+----------+------------------+
3 rows in set (0.00 sec)
```

To avoid long column name, use `AS` to set nickname(alias) of column (you can omit `AS`). If you use double quote(““), you can set the nickname with various languages including Korean, number, and even reserved words(e.g. SELECT).

> In SQL, single quote(’’) and double quote(““) have different meaning. Single quote is used for text type constant, and double quote is used for name of database object.
> 

```sql
mysql> SELECT *, price * quantity AS amount FROM sample34;
+------+-------+----------+--------+
| no   | price | quantity | amount |
+------+-------+----------+--------+
|    1 |   100 |       10 |   1000 |
|    2 |   230 |       24 |   5520 |
|    3 |  1980 |        1 |   1980 |
+------+-------+----------+--------+
3 rows in set (0.00 sec)
```

## Use Operation in Condition and Sorting

You can also use operations in condition phrase `WHERE`. The following example is conditioning amount more than 2000.

```sql
mysql> SELECT *, price * quantity AS amount FROM sample34
    -> WHERE price * quantity >= 2000;
+------+-------+----------+--------+
| no   | price | quantity | amount |
+------+-------+----------+--------+
|    2 |   230 |       24 |   5520 |
+------+-------+----------+--------+
1 row in set (0.00 sec)
```

You might wonder the reason that

```
WHERE
```

phrase doen not use nickname ‘amount’. It is because of the processing order. The order of processing in SQL is as a folloing image.

Therefore, nickname ‘amount’ does not exist at the moment of processsing `WHERE`.

Then, how about `ORDER BY`? As the processing order of `ORDER BY` is later than `SELECT`, it will work fine.

```sql
mysql> SELECT *, price * quantity AS amount FROM sample34 ORDER BY amount DESC;
+------+-------+----------+--------+
| no   | price | quantity | amount |
+------+-------+----------+--------+
|    2 |   230 |       24 |   5520 |
|    3 |  1980 |        1 |   1980 |
|    1 |   100 |       10 |   1000 |
+------+-------+----------+--------+
3 rows in set (0.00 sec)
```

## NULL in Operation

What will happen if NULL is contained in operation? In SQL, any operation with NULL will always result in NULL, no matter what the operation is.

## Using Functions

You can use functions instead of operators. One of the most popular functions in SQL is `ROUND`. It is used for rounding. You can specify the place to round also.

```sql
mysql> SELECT amount, ROUND(amount) FROM sample341;
+---------+---------------+
| amount  | ROUND(amount) |
+---------+---------------+
| 5961.60 |          5962 |
| 2138.40 |          2138 |
| 1080.00 |          1080 |
+---------+---------------+
3 rows in set (0.00 sec)

-- Leave only one decimal place
mysql> SELECT amount, ROUND(amount, 1) FROM sample341;
+---------+------------------+
| amount  | ROUND(amount, 1) |
+---------+------------------+
| 5961.60 |           5961.6 |
| 2138.40 |           2138.4 |
| 1080.00 |           1080.0 |
+---------+------------------+
3 rows in set (0.00 sec)

-- Round at tens digit
mysql> SELECT amount, ROUND(amount, -2) FROM sample341;
+---------+-------------------+
| amount  | ROUND(amount, -2) |
+---------+-------------------+
| 5961.60 |              6000 |
| 2138.40 |              2100 |
| 1080.00 |              1100 |
+---------+-------------------+
3 rows in set (0.00 sec)
```

*All images, except those with separate source indications, are excerpted from lecture materials.*
