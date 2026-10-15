
//  Google URL aur Key hatakar local backend route set kiya
const backendUrl = '/api/ask-gemini'; 

// Spread operator merge karna or copy karna 
const baseHeaders = { "Content-Type": "application/json" };
const requestHeaders = { ...baseHeaders }; 


// 2. ALL DOM SELECTORS 
const askInput = document.getElementById("askInput");
const summaryInput = document.getElementById("summaryInput");
const ideaInput = document.getElementById("ideaInput");

const askBtn = document.getElementById("askBtn");
const summarizeBtn = document.getElementById("summarizeBtn");
const ideaBtn = document.getElementById("ideaBtn");

const askOutput = document.getElementById("askOutput");
const summaryOutput = document.getElementById("summaryOutput");
const ideaOutput = document.getElementById("ideaOutput");


// 3. ASYNC API FUNCTION Phase 5 Full-Stack Handshake
const getAIResponse = async (promptText, outputBox) => {
  if (promptText.trim() === "") {
    alert("Write Something On Box!");
    return;
  }

  outputBox.innerText = "Loading... ⏳";

  try {
    const response = await fetch(backendUrl, {
      method: "POST", 
      headers: requestHeaders,
      body: JSON.stringify({ prompt: promptText }) 
    });

    const data = await response.json();

    // Backend se aaye clean data ko Object Destructuring se pakadna
    const { success, answer, error } = data;

    // Safely dynamic AI response screen par print kiya!
    if (success) {
        outputBox.innerText = answer; 
    } else {
        outputBox.innerText = "Error: " + error;
    }

  } catch (error) {
    outputBox.innerText = "Network Error!.";
  }
};


// 4. ADD EVENT LISTENERS arrow Functions
askBtn.addEventListener("click", () => {
  if (askInput.value.trim() === "") {
    alert("Write Something On Box!");
    return;
  }
  const prompt = `Answer in 2-3 short sentences only: ${askInput.value}`;
  getAIResponse(prompt, askOutput);
});

summarizeBtn.addEventListener("click", () => {
  if (summaryInput.value.trim() === "") {
    alert("Write Something On Box!");
    return;
  }
  const prompt = `Summarize in maximum 3 short bullet points:\n${summaryInput.value}`;
  getAIResponse(prompt, summaryOutput);
});

ideaBtn.addEventListener("click", () => {
  if (ideaInput.value.trim() === "") {
    alert("Write Something On Box!");
    return;
  }
  const prompt = `Give me 5 very short 1-line ideas for: ${ideaInput.value}`;
  getAIResponse(prompt, ideaOutput);
});


// 5. TABS LOGIC Array methods forEach
const switchTab = (tabId) => {
  document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));

  document.getElementById(tabId).classList.add('active');
  if (window.event) window.event.currentTarget.classList.add('active');
};
