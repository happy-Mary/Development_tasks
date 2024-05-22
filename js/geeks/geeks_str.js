function extractMaximum(S){
  let maxNum = -1;
  let currNumS = '';
  for (let i = 0; i < S.length; i++) {
      const char = S[i]
      
      if(!isNaN(char)) currNumS+=char;
      else {
          maxNum = parseInt(currNumS) > maxNum ? parseInt(currNumS) : maxNum;
          currNumS = '';
      }
  }
  return (parseInt(currNumS) > maxNum ) ? parseInt(currNumS) : maxNum;
}

console.log('\nextractMaximum: ', extractMaximum('100klh564abc365bg'));
console.log('extractMaximum: ', extractMaximum('1000000'))
console.log('extractMaximum: ', extractMaximum('jui9lhr0ssbu1klounxfw8ztwsuylrp6lwaxpsrbepkumd6othfuqnfm905'))

function areRotations(s1, s2) {
  let concatenated = s1.repeat(2);
  console.log(concatenated)
  return concatenated.includes(s2)
}

console.log('\nareRotations: ', areRotations('geeksforgeeks', 'forgeeksgeeks'))
console.log('areRotations: ', areRotations('mightandmagic', 'andmagicmigth'))