# OA-Robotics-Safety-Test
This is a repository for an updated version of the OA Robotics Safety Test available.

FULLY LICENSED UNDER THE MIT LICENSE - SEE LICENSE FILE FOR DETAILS - Erick Tran 2022

THIS VERSION OF THE SAFETY TEST IS READY FOR USE.

---RELEASE 5.4--- 

(Personal Repository Version with all the latest updates at: https://github.com/nerdyprojectslol/safetytest)


General Rule of Thumb for Making Questions or adding responses to Questions:
There should be at least 4-5 extra questions more than the provided amount of questions (If 16 was the max, 20-21 questions would suffice)
For every question, there should at least be 5-6 answers.


Hi all, Lil Gamer Playz (Erick) here. If you are seeing this, this is a repository for the OA Robotics Safety Test I made.

This is a really complex project I had to work on and spend a lot of man-hours working on, so please don't distribute this unless it is to remake the test


Realistically, I don't have more to say other than that, but a Q&A will be available below.




      Q: What are the functions of this safety test?
      
A: The answer of that is complication, but it is split between three groups of files:
The actual safety test (as well as an older version of the safety test)
The administrator panel, for editting as well as changing the questions on the test, as well as the test itself
In the middle are the libraries which communicate with both the admin panel and the safety test.

The safety test acts like the safety test you can find here: https://tests.frc4079.org/SafetyTest/test.php

The adminstrator panel (at the moment, is not secure, however I am planning on adding functionality on that soon,) is a place where you can edit, rework,
or even create new safety tests. They have the power to see the scores of everyone (I'm planning on adding that eventually), as well as being able to
make different types of safety tests compared to the standard ones found at the link above. Basically, the adminstration for that can do basically anything.



        Q: How many hours did it actually take you to do this?
        
A: It started as a fun project. I was bored one day so I couldn't help myself not to do something productive, as well as to advance my HTML skills.
It was only when I showed it to the rest of cabinet and the leads that I thought that this might have been a real thing that we could have done.
I believe, so far on the day that I am making this (10/6/22), this took a cumulative 8 days of time, spread over about 6 weeks. It was mainly because I was bored,
but it did become a real thing that did happen.



      Q: How does this work?

A: Good question. The safety test is a set of questions stored in a JSON file (If I gave you access, you should be able to see it). These questions also hold answer values. This gets transfered over securely to a JS file which will be randomized and printed onto the page as HTML. It takes a while to even think of this, let alone code so I appreciate it if you are reading this at all. After the test is submitted, the test (Uncharted, but what my hope is.) takes the keys from local storage about the name submitted in the index/home page and the team name and puts them on a google sheet. It also takes the score (out of 16) and puts it on a sheet next to them. There's more, but thats the simplest version I can give without this being too long and wasting my time. I need to go to sleep.


Anyway, that's it for me. I need to go code now. If you are reading this. I hope you have a great day (evening? morning? whatever). :))
