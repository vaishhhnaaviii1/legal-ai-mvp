const analyzeBtn = document.getElementById("analyzeBtn");

analyzeBtn.addEventListener("click", async () => {

  const caseText = document.getElementById("caseText").value;

  const resultDiv = document.getElementById("result");

  resultDiv.innerHTML = "Analyzing...";

  try {

    const response = await fetch("http://localhost:5000/api/analyze", {
      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        caseText: caseText
      })
    });

    let data = await response.json();

console.log(data);

if (typeof data === "string") {
  data = JSON.parse(data);
}

    console.log(data);

    resultDiv.innerHTML = `
      <h2>Summary</h2>
      <p>${data.summary || "No summary found"}</p>

      <h2>IPC Sections</h2>
      <p>
        ${
          Array.isArray(data.ipc_sections)
            ? data.ipc_sections.join(", ")
            : "No IPC sections found"
        }
      </p>

      <h2>Reasoning</h2>
      <p>${data.reasoning || "No reasoning found"}</p>
    `;

  } catch (error) {

    console.log(error);

    resultDiv.innerHTML = `
      <p>Something went wrong</p>
    `;
  }

});