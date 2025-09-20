const API_URL = 'http://localhost:8000/v1';

async function httpGetPlanets() {
  // TODO: Once API is ready.
  // Load planets and return as JSON.
  const response = await fetch(`${API_URL}/planets`);
  const data = await response.json();

  return data;
}

async function httpGetLaunches() {
  // TODO: Once API is ready.
  // Load launches, sort by flight number, and return as JSON.
  const response = await fetch(`${API_URL}/launches`);
  console.log(response)
  const data = await response.json();
  const sortedData = data.sort((a, b) => a.flightNumber - b.flightNumber)
  return sortedData;
}

async function httpSubmitLaunch(launch) {
  // TODO: Once API is ready.
  // Submit given launch data to launch system.
  const response = await fetch(`${API_URL}/launches`, {
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(launch)
  });
  const data = await response.json();
  return data;
}

async function httpAbortLaunch(id) {
  // TODO: Once API is ready.
  // Delete launch with given ID.
  try {
    return await fetch(`${API_URL}/launches/${id}`, {
      method: "delete",
    })
  } catch (error) {
    console.log(error);
    return {
      ok: false
    }
  }

}

export {
  httpGetPlanets,
  httpGetLaunches,
  httpSubmitLaunch,
  httpAbortLaunch,
};