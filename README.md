# UniQnect-backend

## courses

```
GET     /courses 
get all courses

GET     /courses/:id
GET     /courses/:course_code
GET     /coures/:depart
======================

<!-- can be single or multiple courses. so must check array or object  -->

POST    /course
payload: {
    name,
    code,
    credit,
    depart,
    prerequisiteCourse: [cours_code, cours_code, cours_code]
}
database-data: {
    name,
    code,
    credit,
    depart,
    prerequisiteCourse: [_id, _id, _id]
}

POST    /courses
payload: [{
    name,
    code,
    credit,
    depart,
    prerequisiteCourse: [cours_code, cours_code, cours_code]
}]
database-data: [{
    name,
    code,
    credit,
    depart,
    prerequisiteCourse: [_id, _id, _id]
}]
========================
PATCH    /course/:id
payload: {
    name,
    code,
    credit,
    depart,
    prerequisiteCourse: [cours_code, cours_code, cours_code]
}
========================
```

## courses advisor

```

```