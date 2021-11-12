const plainText: any = 'mazacuata';
const key: any = '12190415';

const encoder = new TextEncoder();

function hexToBytes(hex: any) {
  for (var bytes = [], c = 0; c < hex.length; c += 2)
    bytes.push(parseInt(hex.substr(c, 2), 16));
  return bytes;
}

const hex2Bytes = (hex: any) => {
  for (var bytes = [], c = 0; c < hex.length; c += 2)
    bytes.push(parseInt(hex.substr(c, 2), 16));
  return bytes;
};

const hex2Ascii = (hexx: string) => {
  let hex = hexx.toString();
  let str = '';
  for (let i = 0; i < hex.length; i += 2)
    str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
  return str;
};

const ascii2Hex = (ascii: string) => {
  let arr1 = [];
  for (let n = 0, l = ascii.length; n < l; n++) {
    let hex = Number(ascii.charCodeAt(n)).toString(16);
    arr1.push(hex);
  }
  return arr1.join('');
};

const rc4Algorithm = (encodedplainText: any, key: any) => {
  const encodedKey = encoder.encode(key);

  let finalResult = [];

  // Key Scheduling Algorithm

  let s_vector = [];
  let expanded_key: any = [];

  for (let i = 0; i < 256; i++) {
    expanded_key.push(encodedKey[i % encodedKey.length]);
    s_vector.push(i);
  }

  let j = 0;
  for (let i = 0; i < 256; i++) {
    j = (j + s_vector[i] + expanded_key[i]) % 256;
    [s_vector[i], s_vector[j]] = [s_vector[j], s_vector[i]];
  }

  // Pseudo Random Generation Algorithm

  let i = 0;
  j = 0;

  for (let byte of encodedplainText) {
    i = (i + 1) % 256;
    j = (j + s_vector[i]) % 256;
    [s_vector[i], s_vector[j]] = [s_vector[j], s_vector[i]];
    let t = (s_vector[i] + s_vector[j]) % 256;
    let k = s_vector[t];
    finalResult.push(byte ^ k);
  }

  const encryptedMessageInHex = finalResult.map((value) => {
    return value.toString(16);
  });

  let joinedHex = encryptedMessageInHex.join('');
  let finalAscii = hex2Ascii(joinedHex);

  return finalAscii;
};

console.log(`Original Plain Text: ${plainText}`);

const encryptedMessage = rc4Algorithm(encoder.encode(plainText), key);
console.log(`Encrypted Message: ${encryptedMessage}`);

const dencryptedMessage = rc4Algorithm(
  hexToBytes(ascii2Hex(encryptedMessage)),
  key
);
console.log(`Decrypted Message: ${dencryptedMessage}`);
