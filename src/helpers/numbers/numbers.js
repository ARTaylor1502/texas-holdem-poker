export function mapSequentialNumbers(array) {
  const sortedArray = array.sort((a, b) => {
    return a - b;
  });

  let sequentialNumbers = [];

  for (let i = 0; i < sortedArray.length; i++) {
    const currentNumber = sortedArray[i];

    if (i === 0) {
      sequentialNumbers.push([currentNumber]);
    } else {
      let isSequential = false;

      for (let i = 0; i < sequentialNumbers.length; i++) {
        if (
          currentNumber -
            sequentialNumbers[i][sequentialNumbers[i].length - 1] ===
          1
        ) {
          sequentialNumbers[i].push(currentNumber);
          isSequential = true;
          break;
        }
      }

      if (!isSequential) {
        sequentialNumbers.push([currentNumber]);
      }
    }
  }

  return sequentialNumbers;
}
