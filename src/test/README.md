### Testing

The tests are located within each package.

This has the following advantages, as opposed to a src
and a test folder:

- You don't have to layout the same folder structure twice
- It's clear what has test test coverage and where it's missing
- If you delete a unit, you also delete the tests for it right away.

In this `test` folder here, there are only some helper functions,
that are reused in all of the tests.
