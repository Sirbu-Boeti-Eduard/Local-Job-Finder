# Local-Job-Finder

## Project Description

  LocalJobFinder is a web application designed to easily search job listings using our interactive map.
  
  ### Actual Functionality: User -> User(handyman/tutor etc.)
  
  * Need a tutor, handyman, someone to do something for you?
    * Search for them and start chatting.
  * Want to sell your services?
    * Post a job listing and wait.
  
  ### Potential Functionality
  
  #### Case 1: User(handyman/tutor etc.) -> User
   * Need a handyman/tutor etc.?
     * Post a job listing and wait.
   * Want to find someone who needs your sevice?
     * Search and start chatting with them.
  
  #### Case 2: User -> Company
  * Need a job?
    * Search for it and start chatting.
  * Need to hire an employee?
    * Post a job listing and wait.
  
  #### Case 3: Company -> User
  * Are you open to work?
    * Post your job listing with the desired job and wait.
  * Need to hire an employee?
    * Search for potential employees and start chatting.


## Key Features

  * User Authentication: LocalJobFinder offers a secure login and logout system.

  * Job Listings with Interactive Map: The application integrates an interactive map powered by Leaflet, which displays markers representing job postings. Users can browse the map to visualize job locations and quickly identify relevant job postings in the area.

  * Marker Details: When a user clicks on a marker, detailed information related to the job posting is displayed. This includes the title, name, and description of the job.

  * Integrated Chat: LocalJobFinder facilitates seamless communication between job seekers and employers by incorporating a built-in chat feature. Users can engage in real-time conversations to inquire about job postings, schedule interviews, and exchange necessary information.

## Technologies

  * Front-End
    * HTML + Handlebars
    * CSS
    * Javascript
    * Bootstrap (CSS)
  * Back-End
    * Node.JS
    * Express (+ Express-Session)
  * Node.JS Used Libraries
    * Dotenv (read .env)
    * Path (.env path & publicDir path)
    * FS (read about.html)
    * BcryptJS (password hashing)
    * Socket.IO (real-time chat)
    * HTTP (needed for Socket.IO)
  * Misc.
    * Docker Container (MySQL + phpMyadmin)
    * Leaflet API (interactive map w/ clickable markers)
    * JSON files (used for fetch requests)
