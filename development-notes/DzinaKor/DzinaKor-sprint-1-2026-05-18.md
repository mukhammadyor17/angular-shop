## Sprint 1 - development notes

#### Dina Kor | for 2026-05-18 

- **What was done:** I joined an existing team right after my previous teammates decided tto leave the course project. Introduced myself to the new team, read the documentation, got familiar with the project architecture and recieved the task from team lead - to create the not-founf-page component. Use AI to help me understand in super quick way styling of the whole page that already exist - spent at this part 3 minutes instead of 1 hour (without AI) - happy about it.
- **Problems:** testing the not-found-page routing. the route didn't work when opening the localhost link where the page was supposed to appear.
- **Solutions:** found the routing lines where redirectTo:'' automatically redirected users to the home page. cause of this Angular never opened my hot-found-page component, so I couldn't test it. I commented out these lines to check whether the component worked and it did.
- **What I learned:** in cases like this, checking the routes should be one of the first debugging steps I think :'/
- **Plans:** in sprint 2 make research the Figma mockup in more detail, implement the wishlist component, dive depper into the project (cause during the sprint 1 I only had half of the day to explore the project), communicate more with teammates and decide which additional parts of the project task I can implement