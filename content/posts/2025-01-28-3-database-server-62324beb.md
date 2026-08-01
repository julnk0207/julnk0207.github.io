---
title: "[SQL First Step] 3. Database Server"
description: "If the webpage is only composed of static HTML, a web server is enough. However, to generate HTML dynamically, we need control program. In web server, there is an extension for…"
date: 2025-01-28
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

## Structure of Web Application

If the webpage is only composed of static HTML, a web server is enough. However, to generate HTML dynamically, we need control program. In web server, there is an extension for dynamic contents called CGI. The following is a structure of using CGI in web.

In database field, CGI becomes a client for database. Focus on the right part of the image below. After authorization to access, CGI delivers SQL requests to DB and DB returns responses to CGI.

## MySQL

In MySQL, a client and a server runs in the same computer. As we still need network connection, client pass through network and access to server, which is called ‘loop back’ access.

*All images, except those with separate source indications, are excerpted from lecture materials.*
