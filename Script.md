# Intro
Hello, everyone!

I'm Murphy Randle, a Web engineer at Space Monkey. We make super cool devices for storing data in a peer-to-peer style manner, instead of a data-center style manner.

# The Story

I maintain and develop Space Monkey's Web-based client. A month or two back I was adding a couple of buttons to the settings page. This seems like a very simple task. Buttons have two states, on and off.

However, adding API conventions, and async requests into the mix makes the situation a little more complicated.

## The Problem

A button may need some data to be loaded before it can do its thing (say, a device ID for example). Once a button is clicked, it is in a funny limbo state between disabled and enabled. It remains in that state until the request comes back. Only then do we know whether the request failed and the button should remain disabled, or the request succeeded and the button should be enabled.

What about if the request fails? We need a way to communicate to the user that a problem occurred, and suggest a course of action for them to take next.

All of a sudden two button states have turned into four button states. And with two new buttons there are then eight new states to keep track of.

All of this state tracking can be accomplished through variables set on the $scope object of a controller. But stuffing all of those state variables in the controller can make the logic flow difficult to follow, and the controller code difficult to read. Not to mention that with every new button that comes in the future at least three new scope variables will be added. This strategy, though quick for getting-things-done, leads to complex and highly duplicated code.

## A Solution

Angular offers a better way through custom directives. On the project I mentioned earlier I implemented two directives: A promise box, and a promise button. Both of these directives accept as attributes functions that return promises. 

### The Button

The button directive will call a function on its parent scope when it is clicked, render a 'pending' message while the promise returned from the function is pending, render an error below the button if the promise is rejected, or toggle its state if the promise is accepted.

Using that element not only removes button state tracking from the controller, but cleans up the dom considerably. We can replace a tangle of ng-if's and interpolations with one nice little element.

### The Box

The box was meant as a way to make sure variables are set on the parent scope before any child elements requiring that variable are rendered.

Similar functionality to this already exists in Angular's default router. An attribute called 'resolve' can be set on a route that will keep the view from rendering until a promise is resolved. However, blocking the view rendering while a server request completes creates a bad user experience.

I wanted an element that would not load its content until a promise was resolved, and also show the user an informative loading state. As a bonus, I wanted this box to handle errors also, so that if the promise is rejected, the box will inform the user of an error instead of rendering content.

Now instead of keeping track of data fetching for every element needing that data, and thinking of proper error states for each one, we have one wrapping element that takes care of it.

Also, these elements are easily reusable. There can be multiple on a page. They can even be nested inside one another. And each time only one new element needs to be added to the template.

# Today

Today we're going to implement a simple promise box. I'm going to try live-coding it, but just in case I mess everything up, I've got a pre-baked version stored in a different branch.

Here goes!

-- LIVE WOOHOO --