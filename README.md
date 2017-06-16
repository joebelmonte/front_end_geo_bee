# Read Me for Geography Bee
## Joe Belmonte - June 16, 2017
## WDI-017

### Links

-   [Front End - Deployed](https://joebelmonte.github.io/front_end_geo_bee/)
-   [Front End - Repo](https://github.com/joebelmonte/front_end_geo_bee)
-   [Back End - Deployed](https://serene-temple-28493.herokuapp.com)
-   [Back End - Repo](https://github.com/joebelmonte/back_end_geo_bee)

### Screen Shot of the app

![Screen Shot](/geo_bee_screen_shot.png "Geo Bee Screen Shot")

### Technologies Used

- HTML for website content and structure
- CSS for website style, using Bootstrap for modals
- Handlebars to dynamically render HTML
- JavaScript for website actions
- jQuery for event handling and DOM manipulation
- JSON for communication with API
- CURL for testing of API GET, PATCH, and POST requests
- RAILs API for database
- Grunt for test environment and testing
- Atom text editor
- GitHub for version control
- Chrome for browser testing

### General Approach

During project 3, I worked on a bucket list app that divided up bucket list items
by U.S. state.  For this, we used [JVQMap](https://jqvmap.com) which I thought was
really cool and wanted to use again.  So, I decided to make an app that tested
geography knowledge, starting with US States and State Capitals.

In terms of technologies used, I decided to go with the browser template for the
front end and the Rails API template for the back end.  I have used both of those
successfully in the past and felt comfortable using them.  I was also confident
they would be able to fullfill my needs on the project.

As usual, I spend a few hours at the beginning organizing my thoughts on what this
game would be and how a user would interact with it.  I want to make the interface
user-friendly and very simple so that the user could focus on playing the game.

I included several options that I thought were interesting, like the ability to play
in easy, hard, or sudden-death mode which would allow different numbers of incorrect
answers before a game is "lost."  I also really like how process of elimination mode
turned out.  Finally, I spent a good deal of time making sure that a user can
save a game and return to it later, with all game state data intact.

### User Stories

Premise: Build an online game that will test a user’s knowledge of U.S. geography.  The user will be prompted with an unlabeled map and a state name (or state capital) and will then have to click that state on the map.  The game will track the number of correct vs. incorrect guesses and score the game accordingly.  The user can specify difficulty level (meaning the number of incorrect guesses allowed before the game is “lost”).

As a user, I want to be able to:
* For each game,
  * See my progress versus the total number of states I have left
  * See how many correct versus incorrect guesses I have made
  * Have the ability to toggle on “process of elimination mode”
  * Chose different difficulty levels (i.e., how many incorrect guesses before I have lost the game)
* See how many games I have played and what my record is (wins versus losses).
  *	I should be able to see my score for each game.
* Save an unfinished game and come back later to finish it.
* Delete a game from my record.
* Play other geographic locations (other continents)

A user will have many games.  Each game will have the following attributes:

* Total Guesses
* Correct guesses
* Incorrect Guesses
* Difficultly Level
* Complete/Incomplete (Boolean)
* Result: won/lost (Boolean)
* Geography
* Process of elimination mode (Boolean)
* Items correctly guessed
* Items remaining to be guessed

### Wireframes

-   [Wireframes](https://github.com/joebelmonte/front_end_geo_bee/blob/working/Geography%20Bee%20Wireframes.pdf)

### Major Hurdles/Unsolved Problems

I didn't have any major problems on the front end portion of the app.  It was mostly a
series of steady but slow progress working through small to medium glitches/bugs.  I
tried to really apply the lessons I learned on my first 3 projects in terms of
structuring code, making it modular, keeping it organized, and focusing on naming
conventions, and I think that really helped.

I don't believe my current app has any bugs or is missing any features that are
necessary for meeting requirements.  However, there are a few features I would
have liked to add if I had more time.  For example:

* Better overall aesthetic/prettier in general.
* Allow the user to sort/filter games in the All Games table view.
* I really wanted to add a few features that involved a timer.
  * For example, it would be fun to have "hard" mode add a 2 minute time limit or something like that.
  * Or, the time could count up and you could try to set personal best records for faster time with 0 mistakes.
* I would have liked to add some additional maps, like European countries, or African countries, etc.
* I would have added badges for certain accomplishments, like completing a certain number or maps.
