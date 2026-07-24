## Sprint 3 - development notes

#### Dina Kor | for 2026-07-06 (lazy coders team)

* **What was done:**
* summarized everything I implemented during sprint 3 from the required list:
- custom Pipe (`@Pipe`) - implemented in the About-Us feature to truncate long biography text;
- reactive forms - implemented multiple Reactive Forms on the Profile page using `FormGroup`, `FormControl`, `FormArray` (profile information, password change, and delivery addresses);
- validation - used built-in validators (`required`, `email`, `minLength`, `pattern`) and a custom `passwordMatchValidator`; validation errors are displayed below the corresponding form fields;
- functional forms - are connected to the backend API and perform real actions: updating the user profile, changing the password and creating, editing, deleting, setting default delivery addresses;
- OnPush change detection - I used Angular 22, where standalone components use OnPush change detection by default, soooo maybe this is enough;
InjectionToken/Custom Provider - not implemented.

* **Problems:**
- a lot of small "to do" parts of the project/components that I still need to finish;
- our project doesn't build now after the team lead made changes to his file - it throws TS2739 error;
- the Profile page component logic is heavy and not optimal;
- I haven't connected everything with my teammates' parts of the app yet;
- I'd like to have a bit more team communication. I'm happy to have a team (especially since my previous team decided to skip the Angular course), but I think regular weekly calls to discuss plans, solutions and best practices would help us collaborate more efficiently. at the moment, we mostly communicate in Discord, usually when a specific issue comes up, very rare;
- I didn't have the mentor's contact information for the sprint 2 interview, so I expected the mentor would reach out to us. When the interview deadline passed and our team still had no scores while other students had already received theirs, it created some uncertainty.

* **Solutions:**
- set aside more time this week to work on the project - as much as I can;
- I wrote comments on the PR where the error occurs and left a comment on my team lead's code explaining the problem - the product objects passed to `app-product-card` don't satisfy the current `Product` interface because `id`, `title`, `slug` are missing;
- try to rebuild my Profile page form in a different way - rewrite the logic based on mentor Yury's advice;
- test all parts of my implementation for compatibility with my teammates' parts (fingers crossed);
- I suggested having regular team calls in our Discord chat and initiated a few discussions. we managed to have one team call and later I had several calls with my teammate Askhat to discuss the project. although we didn't establish regular team meetings, I was glad we had at least one live collaboration;
- I found the mentor's contact information, reached out and completed the interview. after that, I shared the contact details with my teammates and explained how the mentor-interview system works in this course and where to find the necessary information for future sprints.

* **What I learned:**
- I feel that I'm going much more deeper into some theoretical topics thanks to the mentor interviews and by practicing those concepts at the same time;
- sometimes it's important to accept that every team has its own communication style. even if it doesn't fully match my expectations, I can still contribute, communicate proactively and focus on what I can influence.

* **AI usage:**
- checked development notes for typos;
- still use AI for styling.

* **Plans:**
- try to rewrite the Profile form page with the new logic;
- check my whole part of the app for anything I forgot or anything that doesn't work correctly;
- connect my implementation with the parts of the project developed by my teammates;
- dive deeper into sprint 4 theory.
