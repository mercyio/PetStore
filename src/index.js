const str = 'beautiful.jpeg'
const Filename = str.split('.')[0]
const FileExt = str.split('.')[1]

// const randomString = 'fhj789nsjwnwjk862m'
const requiredLength = 6;
const randomArr=[];
for( let i=0; i< requiredLength; i++){
  const random = (Math.floor(Math.random() *16).toString(16));
  randomArr.push(random);
}
const string = randomArr.join('');
console.log(`${Filename}-${string}.${FileExt}`)


// let your code return => beautiful-randomString.jpeg 