A smart attendance system. 

Suppose there are 60 students and only one or two are absent—like ID 26 or 36 the teacher has to carefully scan the entire list to find who’s missing. This becomes even more difficult if the absent student’s name is somewhere in the middle of the list. On the other hand, in a nearly empty classroom with just a few students present, the teacher still has to go through the full list to mark absentees.Now we measurement the time we can see that it take 10 minutes to take attendance and then starting to prepare the study it also take time so we can say taking attendance is taking lot of time. So I have create a smart way to avoid this problem. 
 
Solution: 
by default every checklist is false mean unchecked so when all student is present I can press checkall button and all check listed and then I will put the id in the absent textbox and submit and the database is updated. The teacher can save up to 10 minutes if the system by default come checked or unchecked depending on present of the student it may saves 2-5 minutes time but The teacher can focus on studying and the teacher's attention will not be lost.

Bugs: When name and id is given input and we take attendance then we edit the name or ID. the status is wipe out from the database but the name and ID stays same.

Explaination: 
We take the name and ID from the user so that it remain hassle free for the developer & don't need developer all the time to update data all time. After the data is submitted the data is fetch to attendance list so that I can take the attendance. Since the table is unchecked I can press the checked button and  press the submit button and the work will be done.

limitation: 
If there are 3-4 missing ID then it will take 1 minutes to do it because it can take only one number for finding absent and present student

Language & Framework: HTML, CSS, Javascript & NodeJS
Database: Postgresql
OS: Fedora 42 Workstation
