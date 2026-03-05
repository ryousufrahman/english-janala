 const createExample =(arr)=>{
  const spanElement = arr.map((el) => `<span class="btn bg-sky-200">${el}</span>`)
  return spanElement.join(' ')
 }

  function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}

 const manageSpinner =(status)=>{
  if(status==true){
    document.getElementById('spinnar').classList.remove('hidden')
    document.getElementById('word-container').classList.add('hidden')
  }
  else{
     document.getElementById('word-container').classList.remove('hidden')
    document.getElementById('spinnar').classList.add('hidden')
  }
 }


const loadLessons = ()=>{
    fetch('https://openapi.programming-hero.com/api/levels/all')
    .then(res => res.json())
    .then(json=> displayLessons(json.data));
};

  const removeActive =()=>{
      const lessonbutton =document.querySelectorAll('.lesson-btn')
     lessonbutton.forEach(btn=> btn.classList.remove('active'))

  }

 const loadLevelWord =(id)=>{
     manageSpinner(true);
    const url = `
        https://openapi.programming-hero.com/api/level/${id}
    `
    fetch(url)
    .then(res=> res.json())
    
    .then((data) => {
      removeActive()
       const activeButton =document.getElementById(`click-button-${id}`);
      activeButton.classList.add('active')
     
       
      displayLevelWord(data.data)
       
     }) 
  }

  const loadWordDetail= async(id)=>{
    const url = `https://openapi.programming-hero.com/api/word/${id}`
    const res =await fetch(url)
    const detail =await res.json();
    displaywordDetail(detail.data)  
  }
  const displaywordDetail =(word)=> {
    console.log(word);
    const detailBox = document.getElementById('details-box')
    detailBox.innerHTML=`
              
         <div class="">
          <h2 class="text-2xl font-bold"> ${word.word} (<i class="fa-solid fa-microphone-lines"></i> : ${word.pronunciation} )</h2>
          <h2 class="text-1xl font-bold">Meaning</h2>
          <p>${word.meaning}</p>
        </div>
        <div>
          <h2 class="text-2xl font-bold">Example</h2>
          <p>${word.sentence}</p>
        </div>
        <div>
          <h2 class="text-2xl font-bold mb-2">Synonyms</h2>
            <div>${ createExample(word.synonyms)}</div>
        
        </div>
        
        <div class="modal-action">
      <form method="dialog">
        
        <button class="btn">Close</button>
      </form>
    </div>
    
    `
    document.getElementById('my_modal_5').showModal()
    

  }

 displayLevelWord =(words)=>{
     const wordContainer =document.getElementById('word-container')
     wordContainer.innerHTML =''

      if (words.length==0) {
        
      wordContainer.innerHTML =`
          
       <div class="text-center  col-span-full rounded-xl py-10 space-y-6">
          <img src="assets/alert-error.png" alt="" class ="mx-auto">
          
         <p class="font-bangla text-gray-400">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
         <h2 class="font-bold text-4xl font-bangla">নেক্সট Lesson এ যান</h2>
    </div>
      
      `
      manageSpinner(false)
     return;   
      }

     words.forEach(word => {
      const card =document.createElement('div')

      card.innerHTML=`
            <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4">
          <h2 class="font-bold text-2xl">${word.word ? word.word : ' word not found'}</h2>
        <p class="font-semibold">Meaning /Pronounciation</p>
         <div class=" font-medium font-bangla"> "${word.meaning ? word.meaning : 'meaning not found'} / ${word.pronunciation ? word.pronunciation :  'pronounciation not found'} "</div>
         <div class="flex justify-between items-center">
          <button onclick="loadWordDetail(${word.id})"  class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80] "><i class="fa-solid fa-circle-info"></i></button>
          <button  onclick="pronounceWord('${word.word}')" class="text-black btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high"></i></button>
         </div>
       </div>

      `
       
      wordContainer.append(card)
      
        
     });
     manageSpinner(false)
     
 }


const displayLessons =(lessons)=>{
  const levelContainer =document.getElementById('level-container')
  levelContainer.innerHTML ='';

  for(let lesson of lessons){
    const btnDiv = document.createElement('div');
    btnDiv.innerHTML=`
     <button  id="click-button-${lesson.level_no}" onclick ="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn"><i class="fa-solid fa-book-open"></i>Lesson - ${lesson.level_no}</button>
    
    `
    levelContainer.append(btnDiv)
  }

}
loadLessons()

document.getElementById('search-btn').addEventListener('click', ()=>{
   removeActive()
 const searcharea =document.getElementById('search-bar')
 const input =searcharea.value.trim().toLowerCase();
  fetch('https://openapi.programming-hero.com/api/words/all')
  .then(res=>res.json())
  .then((data)=>{
    console.log(data)
    const allwords = data.data;
    console.log(allwords)
    const filterWords =allwords.filter(word=>word.word.toLowerCase().includes(input))
    displayLevelWord(filterWords);
    
    

  }
  )

  

})
