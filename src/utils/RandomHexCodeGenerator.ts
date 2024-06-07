export const generateRandomHexCode = (length: number) => {
  const hexCharacters = '0123456789ABCDEF';
  const HexCodeArray = [];

  for (let i = 0; i < length; i++) {
    let hexCode = '#';
    for (let i = 0; i < 6; i++) {
      hexCode += hexCharacters[Math.floor(Math.random() * 16)];
    }
    HexCodeArray.push(hexCode);
  }
  return HexCodeArray;
};
