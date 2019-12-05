# 5x5game - 5-letter words game

Try to guess random 5-letter word - you have 5 chances (that's why it is called 5x5) and no information about category of word.

## How it works

* Getting random target word for game from array with words
* 5 rows with 5 inputs (each for one letter) - after typing one letter it automatically skips to next input
* After reaching last letter in row the whole word is checked in following way:
  1. Letters that are in target word and are on proper position (same as in target word) in typed word are marked as *proper*
  2. Letters that are in target word but are on wrong position in typed word are marked as *misplaced*
  3. Proper letters are passed to next row and are present in next row inputs
* If typed letters (and their position) are the same as in target word then - **you win**
* If you reached and filled last (fifth) row and you haven't guessed the word - **you lose**

## Developing using
* ReactJS
* JavaScript (ES6)
* SCSS
* BEM
* HTML

## Project status
Developing

## To do
- [x] Passing HTML collection of empty inputs in row (excluding proper letters) - needed to navigate to next empty input in row
- [ ] Disabling every input except the one which is active (preventing from clicking on other input)
- [ ] Handle input blur problem - for example when sb goes to other browser tab and returns, then active input should be with focus automatically
- [ ] Preparing welcome screen
- [ ] Preparing game result screen
- [ ] Styling app, adding animations