Duck Hunt
=========

Let's make a Duck Hunt clone.

INSTALL
=======

Make a fork and clone as per usual. Open up the index.html file in your browser.

TODO
====

* Figure out how the code is working so far. We'll go over this in the lesson.
* Add code to the Duck's draw method. Follow the comments so that the Duck
flies across the screen.
* Now let's figure out how to shoot them down again. Add a mousemove event to
the #game element to move the crosshair along with the mouse. Is it centered
properly?
* Add code to the Duck's die event so that you can shoot a Duck. Follow the
comments provided.
* Now that the basics are in, let's add some extensions:

1. Add a pop-up modal on document ready so prompt the user for a difficulty
setting. Pass an appropriate string to the Game object.
2. Add some markup / CSS with absolute positioning to display the running score.
3. Add code so that you only have three shots per round; after firing three times
prevent the user from killing a Duck. Bonus points if you can add markup to the
game with some CSS absolute positioning to display the remaining shells on the
screen.
4. Add the hunter's dog and animate it so that it walks towards the center of
the screen and then pounces on the unsuspecting Ducks. Take a look at the Duck
object and its flap method, and attempt something similar for a Dog.
5. Make any over amendments you see fit. Blood mode, sound FX. You name it.