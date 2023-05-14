## Summary ✨
A clone of the popular website, Reddit. Users can create posts, comment on posts, and upvote/downvote posts and comments.
As a part of BCIT's Web Development course, this project was built to practice using `Express.js`, `Node.js`, and `EJS`.

## Details 🔎
Building this web app, the data are all stored in-memory. I chose to use `Bootstrap` as my CSS library. I also implemented
the nested-comments feature of this app similar to how Reddit handles it, which gave me insight on how to structure the
`HTML` and `CSS` to make it work.

## Challenges 🥵
The hardest challenge was to implement the nested-comments feature. The trick was to pass a JavaScript function to the EJS
template that would fetch the child comments of a parent comment.

## Takeaway 📖
Although the solution for nested-comments is not practical in a production setting, it was a good learning experience as
to how to structure the `HTML` and `CSS` to replicate the same UI as Reddit's nested-comments.

I learned more about `Experss.js`, `Node.js`, and `EJS` since this was mainly a practice project for those three technologies.
Also, learned a lot about in-memory objects and array in a JavaScript environment.
