# RichardScott-bookmarks-app

I completed the assignment and spent a lot of time on this. Unforunately, the passed few hours I could not resolve a webpack bundling error.
I do not know what to do. I've uninstalled node and webpack and reinstalled them. It will not bundle images and it doesn't recognize simple jaavscript modules now.
It was working completely fine up to a few hours ago. I'm at a huge loss as the project was near perfect.

I've uploaded the files but since it will not bundle I cannot present a live link.
I will also upload screenshots of the errors I've received.

I completed all of the necessary user stories below:

1. I can add bookmarks to my bookmark list. Bookmarks contain:

title
url link
description
rating (1-5)

2. I can see a list of my bookmarks when I first open the app

3. All bookmarks in the list default to a "condensed" view showing only title and rating
I can click on a bookmark to display the "detailed" view

4. Detailed view expands to additionally display description and a "Visit Site" link
I can remove bookmarks from my bookmark list

5. I receive appropriate feedback when I cannot submit a bookmark

6. Check all validations in the API documentation (e.g. title and url field required)
I can select from a dropdown (a <select> element) a "minimum rating" to filter the list by all bookmarks rated at or above the chosen selection

(Extension feature - optional) I can edit the rating and description of a bookmark in my list

!#### UPDATE ####!

So after a wild night of confusion, I saw my error today was in the file path of the imported images. I included /src/ in the path. I tried the path without src, but did not include the ./ before so I moved on. I also did not know this would consequently break all of the other modules and cause nothing to work. I wrongly assumed it was from webpack not deploying correctly and spent about 4 hours trouble shooting that. 

I managed to upload the bundle to gh-pages as requested, and I updated the master branch to include the unbundled files.
Whew.
Cheers
##########################
