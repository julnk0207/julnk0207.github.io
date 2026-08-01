---
title: "[SQL First Step] 31. Set Operations"
description: "In SQL, one row is considered as one element of set."
date: 2025-02-20
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

## SQL and Set

In SQL, one row is considered as one element of set.

## `UNION`

To implement union of sets in SQL, use `UNION` between multiple `SELECT` commands.

```sql
mysql> SELECT * FROM sample71_a;
+------+
| a    |
+------+
|    1 |
|    2 |
|    3 |
+------+
3 rows in set (0.00 sec)

mysql> SELECT * FROM sample71_b;
+------+
| b    |
+------+
|    2 |
|   10 |
|   11 |
+------+
3 rows in set (0.00 sec)

-- Union
mysql> SELECT * FROM sample71_a
    -> UNION
    -> SELECT * FROm sample71_b;
+------+
| a    |
+------+
|    1 |
|    2 |
|    3 |
|   10 |
|   11 |
+------+
5 rows in set (0.00 sec)
```

You can also sort the result of union. In this case, set nickname of column in advance. If the name of column doesn’t match, error occurs.

```sql
mysql> SELECT a AS c FROM sample71_a
    -> UNION
    -> SELECT b AS c FROM sample71_b ORDER BY c;
+------+
| c    |
+------+
|    1 |
|    2 |
|    3 |
|   10 |
|   11 |
+------+
5 rows in set (0.00 sec)
```

To show all elements without deleting duplicated ones, use `UNION ALL` instead of `UNION`.

```sql
mysql> SELECT * FROM sample71_a
    -> UNION ALL
    -> SELECT * FROm sample71_b;
+------+
| a    |
+------+
|    1 |
|    2 |
|    3 |
|    2 |
|   10 |
|   11 |
+------+
6 rows in set (0.00 sec)
```

> There are also intersection and difference functions in other products, but not supported in MySQL.
> 

*All images, except those with separate source indications, are excerpted from lecture materials.*
