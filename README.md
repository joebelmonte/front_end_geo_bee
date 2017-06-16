# Read Me for Geography Bee
## Joe Belmonte - June 16, 2017
## WDI-017

## Links

-   [Front End - Deployed](https://joebelmonte.github.io/front_end_geo_bee/)
-   [Front End - Repo](https://github.com/joebelmonte/front_end_geo_bee)
-   [Back End - Deployed](https://serene-temple-28493.herokuapp.com)
-   [Back End - Repo](https://github.com/joebelmonte/back_end_geo_bee)

## Screen Shot of the app

![Screen Shot](/geo_bee_screen_shot.png "Geo Bee Screen Shot")

## Technologies Used

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


## General Approach

## Wireframes and User Stories

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

* id
* date started
* number of correct guesses
* number of incorrect guesses
* correct guess percentage
* difficultly level
* complete/incomplete (Boolean)
* won/lost (Boolean)
* geography

## Major Hurdles/Unsolved Problems
