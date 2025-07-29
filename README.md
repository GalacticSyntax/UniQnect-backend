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
GET:    /advisors
<!-- department, session, semester search, teacher name -->

POST:   /advisor

payload: {
    departmentCode: string;
    session: string; fall-year
    semester: number;
    teacherId: string; <!-- objectId -->
    offeredCourses: [ObjectId] <!-- default [] no need to change when creating advisor -->
}
<!-- must can't have multiple advisor with same teacher id and sessions -->

PATCH:   /advisor/:id

payload: {
    departmentCode: string;
    session: string; fall-year
    semester: number;
    teacherId: string;
    offeredCourses: [ObjectId] <!-- default [] no need to change when creating advisor -->
}

DELETE:   /advisor/:id

=====================
```

## offered coures

```
GET:    /offered
<!-- must add a field where show which course that student can't take so that I can disable them -->

POST:   /offered

payload: {
    coures: [course_code]  <!-- but must need to change into ObjectId -->
}

PATCH:   /offered/:id <!-- advisor id -->

payload: {
    coures: [course_code]  <!-- but must need to change into ObjectId -->
}

=====================
```

## registered courses

```
GET:    /registered
<!-- here check user role if user is student only can see his registered coureses else everyones -->
This feature will be only for non students
<!-- search by studentId, student name, course id, coruse name, semester -->
GET:    /registered/:studentId

POST:   /registered/:studentId

payload: {
    coures: [course_code]  <!-- but must need to change into ObjectId -->
}

PATCH:   /offered/:id <!-- advisor id -->

payload: {
    studentId: string; <!-- must change into ObjectId -->
    coures: [course_code]  <!-- but must need to change into ObjectId -->
}

=====================
```
