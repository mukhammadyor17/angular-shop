## Sprint 3 - development notes

#### Dina Kor | for 2026-06-15 (lazy coders team)

- **What was done:** 
- set up the backend for the project on my local laptop;
- had a call with my team member (Askhat) to explain my code from Sprint 2 and Sprint 3 out loud, line by line, to practice code explanation skills and listen to his feedback;
- implemented: reactive forms (FormBuilder), built-in validations (Validators: required, email, minLength), structural directives (ProfileCard) and a custom pipe (shortText pipe, pure).

- **Problems:** 
* the server configuration file (postgresql.conf) was generated in a broken state and failed validation. As a result, PostgreSQL could not start, so NestJS couldn’t connect to localhost;
* started working with API endpoints but couldn’t find some of them, because we switched from commercetools to a custom backend, and some required endpoints were not yet implemented.

- **Solutions:** 
* reinstall PostgreSQL cleanly (preferably a stable version like 17) or use a managed Postgres solution like Neon/Supabase (in progress, solution suggested by AI);
* wrote to the mentor explaining the backend mismatch. he confirmed he will handle it.

- **What I learned:** 
* explaining code out loud helps identify gaps in understanding and improves technical interview skills;
* working with Angular forms is very comfortable and enjoyable.

- **AI usage:**
* asked for help analyzing server setup issues on my local laptop;
* generated SCSS for the profile page;
* checked development notes for typos.

- **Plans:** 
* finish the Profile page and connect it to the backend - finally;
* complete the about-us page;
* finalize wishlist (possibly migrate from localStorage to backend?) and connect it to cart logic.

