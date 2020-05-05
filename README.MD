<h1>This is the repo for DB-GUI Lab Spring 2020 - Foogle</h1>

<h2>How to run this project:</h2>
<ul>
  <li>Clone repository -> <i>git close &lt url &gt</i></li>
  <li>Navigate to repository via terminal/console</li>
  <li>
    Build Docker containers -> <i>docker-compose build</i>
    <ul><li>Make sure you have mysql v.5.7 otherwise authentication for the database may not work </li></ul>
  </li>
  <li>
    Start up containers -> <i>docker-compose up</i>
    <ul><li>You can combine the last two steps by usingv -> <i>docker-compose up --build</i> </li></ul>
  </li>
</ul>

<h3>How-to for the website can be found by clicking "About" and then "Get Started"</h3>
<h3>Admin login for access to add/remove from food database:</h3>
<ul>
  <li>email: theboss@gmail.com </li>
  <li>password: password </li>
</ul>

<h3>Problems that might occur on container spin-up</h3>
<ul>
  <li>
    If the terminal log says that the backend-api fails to connect to the database, this may be beacuse the api started up faster than the database container was created
    <ul>
      <li>
        To Fix:
        <ul>
          <li><i>docker-compose down</i> -> <i>docker-compose up</i> <b>OR</b></li>
          <li>Access the file <i>server.js</i> in the directory <i>./backend</i> from the base project folder and save the file to      reload the backend api</li>
        </ul>
      </li>
    </ul>
  </li>
   <li>
      Connection to the database might fail due to an error relating to "access not granted" or "ER_NOT_SUPPORTED_AUTH_MODE"
    <ul>
      <li>
        To Fix:
        <ul>
          <li>Ensure your docker image for mysql is v.5.7, you may need to configure to use this version since its not the latest version of mysql</li>
        </ul>
      </li>
    </ul>
  </li>
</ul>
