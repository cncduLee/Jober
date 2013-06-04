Jober
=====


abstract:
---
NODE.JS-based application,built for college students to find job
^^just for learning node.js and functional programming.

requirements
------------
	* Node.js
	* MongoDB
	* express mvc freamwork
	* bootstrap ui
	* some others freamwork

about
----
this is the second project for my study node.js		 
and have a extension in the android plantform		


interface
---
	* app.get('/rest/user/login',rest_user.restLogin);
	* app.get('/rest/jobs',rest_job.getJobsByType);
	* app.get('/rest/jobsearch',rest_job.searchJobs);
	* app.get('/rest/job/:id',rest_job.getDetail);
	* app.get('/rest/jobs/provide/:uid',rest_job.getSelfJobs);
	* app.get('/rest/jobs/ask/:uid',rest_job.getAskJobs);
	* app.get('/rest/msgs/:uid',rest_msg.msglist);
	* app.get('/rest/resume/:uid',rest_resume.getResume);	


