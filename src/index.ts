const plainText: any = 'mazacuata';
const key: any = '12190415';

const encoder = new TextEncoder();

const hex2Ascii = (hexx: string) => {
  let hex = hexx.toString();
  let str = '';
  for (let i = 0; i < hex.length; i += 2)
    str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
  return str;
};

const rc4Algorithm = (plainText: any, key: any) => {
  const encodedKey = encoder.encode(key);
  const encodedplainText = encoder.encode(plainText);

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

const encryptedMessage = rc4Algorithm(plainText, key);
console.log(`Encrypted Message: ${encryptedMessage}`);

const decryptedPlainText = rc4Algorithm(encryptedMessage, key);
console.log(`Descrypted Message: ${decryptedPlainText}`);
