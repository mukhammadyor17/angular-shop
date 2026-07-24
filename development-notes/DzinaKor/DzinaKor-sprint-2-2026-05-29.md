## Sprint 2 - development notes

#### Dina Kor | for 2026-05-29 (lazy coders team)

- **What was done:** 
- implemented responsive About Us page with reusable team card components and carousel slider. The carousel slider isn't part of this task for the page, but I'd like to try implementing it anyway;
- added route configuration with lazy loading via loadComponent;
- used Angular input() and output() for parent-child component communication;
- generated team cards dynamically through template loop;
- implemented property binding, event binding, and interpolation;
- styled the page;
- resolved merge conflicts in GitHub.
- team and mentor meetups, plus communication in chat. Communication is open and clear and everyone values each other's input and manages to stay highly productive without unnecessary meetings.
- correct typos in previous development-notes

- **Problems:** 
* the dots below the carousel slider are not working;
* created a pull request from feature/guard to main instead of develop. 

- **Solutions:** 
* after researching how the carousel dots should work and inspecting the code, I found that the issue was caused by a simple typo. My code was: this.currentSlide - index; instead of this.currentSlide = index;
* aborted the merge using git merge --abort, cleaned the local branch state with git reset --hard HEAD, and synchronized the remote feature/guard branch with a force push. Then recreated the pull request with the correct flow: feature/guard → develop. Phew...  I almost had a heart attack.

- **What I learned:** 
* implementing a basic carousel slider and debugging its behavior by inspecting component logic;
* dynamically generating elements using template loops;
* how to resolve merge conflicts and recover from an incorrect pull request using git merge --abort, git reset --hard, and force push where necessary;
* why it's important to double-check the target branch before opening a pull request;
* inspect the code more carefully for typos.

- **AI usage:**
* exploring different approaches to carousel implementation;
* check the development note for typos.

- **Plans:** 
* implement a custom pipe for the about-us page.
* write final development note for the Sprint 2