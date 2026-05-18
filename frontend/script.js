const analyzeBtn = document.getElementById("analyzeBtn");

analyzeBtn.addEventListener("click", async () => {

  const caseText =
    document.getElementById("caseText").value;

  const resultDiv =
    document.getElementById("result");

  resultDiv.innerHTML = "Analyzing...";

  try {

    const response = await fetch(
      "http://localhost:5000/api/analyze",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          caseText: caseText
        })
      }
    );

    let data = await response.json();

    console.log(data);

    if (typeof data === "string") {
      data = JSON.parse(data);
    }

    // BACKEND DIRECT OBJECT RETURN KAR RAHA HAI
    const analysis = data;

    resultDiv.innerHTML = `

      <h2>Summary</h2>

      <p>
        ${analysis.summary || "No summary found"}
      </p>

      <h2>Overall IPC Analysis</h2>

      ${
        analysis.overall_ipc_analysis?.map(
          (ipc) => `

            <div
              style="
                border:1px solid #ccc;
                padding:10px;
                margin-bottom:10px;
                border-radius:8px;
              "
            >

              <p>
                <strong>
                  ${ipc.ipc_section}
                </strong>
              </p>

              <p>
                Probability:
                ${ipc.probability}
              </p>

              <p>
                ${ipc.reason}
              </p>

            </div>

          `
        ).join("")
        || "<p>No IPC analysis found</p>"
      }

      <h2>Sub Incidents</h2>

      ${
        analysis.sub_incidents?.map(
          (incident) => `

            <div
              style="
                border:1px solid #999;
                padding:10px;
                margin-bottom:15px;
                border-radius:8px;
              "
            >

              <h3>
                ${incident.incident}
              </h3>

              ${
                incident.possible_ipc_sections?.map(
                  (section) => `

                    <div
                      style="
                        margin-left:15px;
                        margin-bottom:10px;
                        padding:8px;
                        border-left:3px solid #555;
                      "
                    >

                      <p>
                        <strong>
                          ${section.ipc_section}
                        </strong>
                      </p>

                      <p>
                        Probability:
                        ${section.probability}
                      </p>

                      <p>
                        ${section.reason}
                      </p>

                    </div>

                  `
                ).join("")
                || "<p>No IPC sections found</p>"
              }

            </div>

          `
        ).join("")
        || "<p>No sub incidents found</p>"
      }

      <h2>Final Observation</h2>

      <p>
        ${
          analysis.final_observation
          || "No final observation found"
        }
      </p>

    `;

  } catch (error) {

    console.log(error);

    resultDiv.innerHTML = `
      <p>Something went wrong</p>
    `;
  }

});