const plainText: any = 'mazacuata';
const key: any = '12190415';

const encoder = new TextEncoder();

const encodedKey = encoder.encode(key);
const encodedplainText = encoder.encode(plainText);

console.log(`Encoded Key: ${encodedKey}`);
console.log(`Encoded PlainText: ${encodedplainText}`);

const rc4Algorithm = (plainText: any, key: any) => {
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
  return finalResult;
};

console.log(rc4Algorithm(plainText, key));
const encryptedMessage = rc4Algorithm(plainText, key);

encryptedMessage.forEach((value) => {
  console.log(value.toString(16));
});

const hex2Ascii = (hexx: string) => {
  let hex = hexx.toString(); //force conversion
  let str = '';
  for (let i = 0; i < hex.length; i += 2)
    str += String.fromCharCode(parseInt(hex.substring(i, 2), 16));
  return str;
};

console.log(hex2Ascii('81d4d216af11da'));
