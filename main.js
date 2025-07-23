// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

function pAequorFactory(specimenNum, dna){
  return{
    specimenNum,
    dna,
    mutate(){
      const randomIndex = Math.floor(Math.random() * this.dna.length);
      const currentBase = this.dna[randomIndex];
      let newBase = returnRandBase();
      while (newBase === currentBase) newBase = returnRandBase();
      this.dna[randomIndex] = newBase;
      return this.dna;
    },
    compareDNA(pAequor){
      let identicalBases = 0;
      let identicalPositions = [];
      
      for(let i = 0; i < this.dna.length; i++){
        if(this.dna[i] === pAequor.dna[i]) {
          identicalBases++;
          identicalPositions.push(i);
        }
      }

      let percentage = (identicalBases / this.dna.length) * 100;
      console.log(`specimen ${this.specimenNum} and specimen ${pAequor.specimenNum} have ${percentage}% DNA in common`);
    },
    willLikelySurvive(){
      let cont = 0;
      this.dna.forEach(element => {
        if(element === 'C' || element === 'G') cont++;
      });

      let percentage = (cont / this.dna.length) * 100;
      return (percentage >= 60.0);
    },
    complementStrand(){
      const newDna = this.dna.map(element => {
        switch(element){
          case 'A': element = 'T'; break;
          case 'T': element = 'A'; break;
          case 'C': element = 'G'; break;
          case 'G': element = 'C'; break;
        }
        return element;
      })
      return newDna;
    }
  }
}

//test 1
const object = pAequorFactory('12222', mockUpStrand());
console.log(object);
console.log(object.mutate());

//test 2
const ex1 = pAequorFactory('ex1', ['A', 'C', 'T', 'G']);
const ex2 = pAequorFactory('ex1', ['C', 'A', 'T', 'T']);

ex1.compareDNA(ex2);

//test 3
const arrayInstances = [];
let i = 0;

while(i < 30){
  let variable = pAequorFactory(`Specimen ${i + 1}`, mockUpStrand());
  if(variable.willLikelySurvive()){
    arrayInstances.push(variable);
    i++;
  }
}

console.log(arrayInstances);

//test optional
const objectOptional = pAequorFactory('objectOptional', [ 'T', 'A', 'C', 'A', 'G', 'A', 'T', 'A', 'C', 'G', 'A', 'C', 'G', 'A', 'T' ]);
console.log(objectOptional);

const complementDna = objectOptional.complementStrand();
const objComplement = pAequorFactory('ComplementObject', complementDna);

objectOptional.compareDNA(objComplement);
