---
title: "[SQL First Step] 6. Specifying Conditions"
description: "SELECT is used to speicfy columns. Use as follows."
date: 2025-02-05
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

## `SELECT` is used to Specify Columns.

`SELECT` is used to speicfy columns. Use as follows.

```sql
SELECT col1, col2 FROM table_name
```

```sql
mysql> SELECT no, name FROM sample21;
+------+-----------+
| no   | name      |
+------+-----------+
|    1 | 박준용    |
|    2 | 김재진    |
|    3 | 홍길동    |
+------+-----------+
```

There is no need to write columns in order exactly same as database. Write down in order you want. Repeating the same columns also works fine.

## `WHERE` is used to Specify Rows.

To search desired rows, use `WHERE` to set a condition.

```sql
SELECT col1, col2 FROM table_name WHERE condition
```

Unlike `SELECT` and `FROM`, `WHERE` is not a essential phrase. However, the format and order above must be obeyed.

The followings are examples of `WHERE`.

```sql
mysql> SELECT * FROM sample21 WHERE no=2;
+------+-----------+----------+------------------------+
| no   | name      | birthday | address                |
+------+-----------+----------+------------------------+
|    2 | 김재진    | NULL     | 대구광역시 동구        |
+------+-----------+----------+------------------------+
1 row in set (0.00 sec)

mysql> SELECT * FROM sample21 WHERE no<>2;
+------+-----------+------------+---------------------------+
| no   | name      | birthday   | address                   |
+------+-----------+------------+---------------------------+
|    1 | 박준용    | 1976-10-18 | 대구광역시 수성구         |
|    3 | 홍길동    | NULL       | 서울특별시 마포구         |
+------+-----------+------------+---------------------------+
2 rows in set (0.00 sec)

mysql> SELECT * FROM sample21 WHERE name='박준용';
+------+-----------+------------+---------------------------+
| no   | name      | birthday   | address                   |
+------+-----------+------------+---------------------------+
|    1 | 박준용    | 1976-10-18 | 대구광역시 수성구         |
+------+-----------+------------+---------------------------+
1 row in set (0.00 sec)

mysql> SELECT * FROM sample21 WHERE birthday IS NULL;
+------+-----------+----------+---------------------------+
| no   | name      | birthday | address                   |
+------+-----------+----------+---------------------------+
|    2 | 김재진    | NULL     | 대구광역시 동구           |
|    3 | 홍길동    | NULL     | 서울특별시 마포구         |
+------+-----------+----------+---------------------------+
2 rows in set (0.00 sec)
```

There are several operators in SQL.

| Operators | Meanings |
| --- | --- |
| `=` | True if the left and right side are the same. |
| `<>` | True if the left and right side are not the same. |
| `>` | True if the left is greater than the right side. |
| `<` | True if the left is less than the right side. |
| `>=` | True if the left side is greater than or equal to the right side. |
| `<=` | True if the left side is less than or equal to the right side. |

There are also a few key points.

- Use ’’ for character type, date type and time type.
- For NULL, use `IS NULL` or `IS NOT NULL`. `=` and `<>` will not work.

*All images, except those with separate source indications, are excerpted from lecture materials.*
