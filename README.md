# Advent of Code

This is my respository for the results of the [Advent of Code](https://adventofcode.com/) puzzles in TypeScript.

You are free to use it yourself, and you find a complete setup to develop and run AoC puzzles. All you need to do is:

    git clone https://github.com/jschirrmacher/aoc
    npm install
    npm start

After that, a folder will be created, containing all the boilerplate for implementing your solutions. It is named like the current year, and it contains another folder for the current day (ideally 1st of december, the day you start the puzzles).
This folder contains four files:

- testdata.txt - copy the test data from the puzzle in there
- input.txt - copy the actual puzzle data here
- part1.ts - the template for your solution of part1
- part2.ts - the template for your solution of part2

While you write your code, the shell where you started the program (`npm start`) shows the results after each change.

If you use MS Visual Code, you could also accept the recommended plugins, which will help formatting of your code easier (prettier).

There are also some utility functions in [utils.ts](./utils.ts) which I need on a regular basis when solving such puzzles. Feel free to use them too!

I copied my solutions of year 2021 to the respective folder. You can run these (and this will work for newer puzzles as well) by using an environment variable `DAY` like this:

    DAY=2021-12-01 npx ts-node .

As you can see, I solved only up to puzzle 15 in 2021. This time I will improve and will at least reach day 20!
