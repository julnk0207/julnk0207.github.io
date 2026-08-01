---
title: "[SQL First Step] 11. Limit the Returning Rows - LIMI"
description: "Use LIMIT to limit the number of returning rows."
date: 2025-02-07
category: "Book"
subcategory: "SQL First Step"
tags:
  - "SQL First Step"
  - "SQL"
  - "Python"
  - "Statistics"
linkedin:
  status: draft
  summary: ""
  postId: ""
x:
  status: draft
  summary: ""
  postId: ""
---

## Limit the Number of Returning Rows

Use `LIMIT` to limit the number of returning rows.

```sql
SELECT col FROM table_name LIMIT number [OFFSET staring_row];
```

`LIMIT` is not a standard SQL, only available at MySQL and PostgreSQL.

> For SQL Server, use TOP (e.g. SELECT Top 3 * FROM sample33;). For Oracle, set ROWNUM in WHERE phrase (e.g. SELECT * FROM sample33 WHERE ROWNUM <= 3;). As it is in the WHERE phrase, it works differently from LIMIT.
> 

See the following examples.

```sql
mysql> SELECT * FROM sample33;
+------+
| no   |
+------+
|    1 |
|    2 |
|    3 |
|    4 |
|    5 |
|    6 |
|    7 |
+------+
7 rows in set (0.00 sec)

mysql> SELECT * FROM sample33 LIMIT 3;
+------+
| no   |
+------+
|    1 |
|    2 |
|    3 |
+------+
3 rows in set (0.00 sec)

mysql> SELECT * FROM sample33 ORDER BY no DESC LIMIT 3;
+------+
| no   |
+------+
|    7 |
|    6 |
|    5 |
+------+
3 rows in set (0.00 sec)
```

> Although you can get the same result when using LIMIT or WHERE, they have totally different functions. LIMIT limits the number of returning rows, which is processed finally after processing WHERE.
> 

By setting `OFFSET`, you can choose which row to start. Indexing is similar to python, which stats at 0.

```sql
mysql> SELECT * FROM sample33 LIMIT 3 OFFSET 0;
+------+
| no   |
+------+
|    1 |
|    2 |
|    3 |
+------+
3 rows in set (0.00 sec)

mysql> SELECT * FROM sample33 LIMIT 3 OFFSET 3;
+------+
| no   |
+------+
|    4 |
|    5 |
|    6 |
+------+
3 rows in set (0.00 sec)
```

*All images, except those with separate source indications, are excerpted from lecture materials.*
