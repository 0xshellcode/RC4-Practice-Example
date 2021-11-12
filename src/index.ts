const plainText: any = 'mazacuata';
const key: any = '12190415';

// let cipherText = new ArrayBuffer(plainText.length);

const cipherText = (plainText: any, key: any) => {
  let finalResult = [];

  // Key Scheduling Algorithm

  let s_vector = [];
  let expanded_key: any = [];

  for (let i = 0; i <= 256; i++) {
    expanded_key.push(key[i % key.length]);
    s_vector.push(i);
  }

  let j = 0;
  for (let i = 0; i <= 256; i++) {
    j = j + s_vector[i] + (expanded_key[i] % 256);
    [s_vector[i], s_vector[j]] = [s_vector[j], s_vector[i]];
  }

  // Pseudo Random Generation Algorithm

  let i = 0;
  j = 0;

  let byte: any = 0;
  for (byte in plainText) {
    i = (i + 1) % 256;
    j = (j + s_vector[i]) % 256;
    s_vector[i], (s_vector[j] = s_vector[j]), s_vector[i];
    let t = (s_vector[i] + s_vector[j]) % 256;
    let k = s_vector[t];
    finalResult.push(byte ^ k);
  }
  return finalResult;
};

console.log(cipherText(plainText, key));
