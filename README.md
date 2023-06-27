#Client:

The Client application provides a quick and user-friendly interface for viewing and editing data. Developed in the React environment, the source code can be found here:

https://github.com/GregorD1A1/Locations-client

To launch the client application, first, download the container by typing the following command in the console:

***docker pull gregord1/locations_client***

Next, run the command:

***docker run -p 3000:3000 gregord1/locations_client***

By typing "localhost:3000" in the browser window, the application will load. Initially, a login window will be displayed:

![Image](images/login.png)

If you do not have a user account, click the "SignUp" button to switch to the registration window:

![Image](images/signup.png)

To create a new user, enter a login and password. Then, click the "Login" button to return to the login window and sign in using the newly registered credentials. Once logged in, the main window of the program will appear, displaying the location data stored in the database.

![Image](images/main_window.png)

To add a new location to the list, enter its IP address in the "New location:" field at the bottom and click the "Add" button. Note: as the number of queries in the free version of ipstack is limited, please use this function sparingly.

You can delete records by clicking on the trash icon to the right of the record. Additionally, records can be sorted by different parameters using the checkmark on the top bar of the page, next to the chosen parameter.

When your session is over, log out using the "LogOut" button.
