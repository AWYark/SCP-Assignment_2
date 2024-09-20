let currentSpeech = null;

function loadNavMenu(){
    fetch("SCP.json")
    .then(response => response.json())
    .then(
        data => {
            const navmenu = document.getElementById('navMenu')

            data.forEach(SCP => {
                const link = document.createElement('a');
                link.href = `#${SCP.Item}`;
                link.textContent = SCP.Item;

                const img = document.createElement('img');
                img.src = "Images/n3aqi1pg-removebg-preview.png"; 
                img.alt = SCP.Item;
                img.style.width = "20px";
                img.style.marginRight = "5px"; 
                link.prepend(img); 

                link.onclick = function(event){
                    event.preventDefault();
                    loadSCP(SCP)
                };
                navmenu.appendChild(link);
            });
        }
    )
    .catch(error => console.error("Error Loading Data: ", error))
}

function loadSCP(SCP){
    const displayDiv = document.getElementById('displayContent');

    const content = `
    <h2><strong>Item#: </strong>${SCP.Item}</h2>
    <p><strong>Object Class: </strong>${SCP.Class}</p><br>
    <p><img src="${SCP.Image}" alt="SCP Image"></p><br>
    <button id="pause-Speech">Pause Speech</button><button id="resume-Speech">Resume Speech</button><br>
    <p><strong>Special Containment Procedures: </strong>${SCP.Containment}</p>
    <button id="read-Procedures">Read Containment Procedures</button><br>
    <p><strong>Description: </strong>${SCP.Description}</p>
    <button id="read-Description">Read Description</button><br>
    <p>${SCP.Content}</p>
    <button id="read-Content">Read Content</button>
    `;

    displayDiv.innerHTML = content;

    document.getElementById("read-Procedures").onclick = function(){
        readProcedures(SCP.Item,SCP.Class,SCP.Containment);
    }

    document.getElementById("read-Description").onclick = function(){
        readDescription(SCP.Item,SCP.Class,SCP.Description);
    }

    document.getElementById("read-Content").onclick = function(){
        readContent(SCP.Item,SCP.Class,SCP.Content);
    }

    document.getElementById("pause-Speech").onclick = function() {
        if (currentSpeech) {
            speechSynthesis.pause();
        }
    }

    document.getElementById("resume-Speech").onclick = function() {
        if (speechSynthesis.paused) {
            speechSynthesis.resume();
        }
    }
}

function readProcedures(Item,Class,Containment){
    stopCurrentSpeech();
    const speech = new SpeechSynthesisUtterance;
    speech.text = `${Item}: object class: ${Class}; special containment procedures: ${Containment}`
    speech.voice = speechSynthesis.getVoices()[0];
    speech.onstart = () => { currentSpeech = speech; }
    speechSynthesis.speak(speech);
}

function readDescription(Item,Class,Description){
    stopCurrentSpeech();
    const speech = new SpeechSynthesisUtterance;
    speech.text = `${Item}: object class: ${Class}; description: ${Description}`
    speech.voice = speechSynthesis.getVoices()[0];
    speech.onstart = () => { currentSpeech = speech; }
    speechSynthesis.speak(speech);
}

function readContent(Item,Class,Content){
    stopCurrentSpeech();
    const speech = new SpeechSynthesisUtterance;
    speech.text = `${Item}: object class: ${Class}; additonal content: ${Content}`
    speech.voice = speechSynthesis.getVoices()[0];
    speech.onstart = () => { currentSpeech = speech; }
    speechSynthesis.speak(speech);
}

function stopCurrentSpeech(){
    if (currentSpeech) {
        speechSynthesis.cancel();
        currentSpeech = null
    }
}


window.onload = () => (loadNavMenu())