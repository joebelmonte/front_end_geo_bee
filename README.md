# Geography Bee
Title: Geography Bee

Premise: Build an online game that will test a user’s knowledge of U.S. geography.  The user will be prompted with an unlabeled may and a state name and will then have to click that state on the map.  The game will track the number of correct vs. incorrect guesses and score the game accordingly.  The user can specify difficulty level (meaning the number of incorrect guesses allowed before the game is “lost”).

As a user, I want to be able to:
•	For each game,
  o	See my progress versus the total number of states I have left
  o	See how many correct versus incorrect guesses I have made
  o	Have the ability to toggle on “process of elimination mode”
  o	Chose different difficulty levels (i.e., how many incorrect guesses before I have lost the game)
•	See how many games I have played and what my record is (wins versus losses).
  o	I should be able to see my score for each game.
•	Save an unfinished game and come back later to finish it.
•	Delete a game from my record.
•	Play other geographic locations (other continents)

A user will have many games.  Each game will have the following attributes:

•	user
•	id
•	date started
•	number of correct guesses
•	number of incorrect guesses
•	correct guess percentage
•	difficultly level
•	complete/incomplete (Boolean)
•	won/lost (Boolean)
•	geography
