// these comments are to explain the process, and would not usually be present in code

// this const could be extracted into a separate file, which would mean that the test data could inject fake data for its test to really get at exactly the process.  but this way is fine too!
const ponies = [
  'Applejack',
  'Fluttershy',
  'Pinkie Pie',
  'Rainbow Dash',
  'Rarity',
  'Twilight Sparkle',
];

// this is a good example of a pure function that simply takes some inputs and returns some output.  for a description of what any code does, you can look to the unit tests!
function normalizePony(pony) {
  if (!pony) {
    return null;
  }

  return ponies.find((x) => (
    x === pony ||
      x.toLowerCase().replace(/ /g, '') === pony.toLowerCase().replace(/ /g, '')
  ));
}

export default normalizePony;
