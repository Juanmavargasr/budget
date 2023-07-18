// Define la URL base para las peticiones a tu servidor
const API_BASE_URL = "http://127.0.0.1:3008"; // Por ejemplo: http://localhost:3000

// Function to set the Authorization token in Axios headers
const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

// User Creation Form Submission
const createUserForm = document.getElementById("create-user-form");
createUserForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const userData = Object.fromEntries(formData.entries());
  createUser(userData);
});

// Source Creation Form Submission
const createSourceForm = document.getElementById("create-source-form");
createSourceForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const sourceData = Object.fromEntries(formData.entries());
  createSource(sourceData);
});

// Login Form Submission
const loginForm = document.getElementById("login-form");
loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const loginData = Object.fromEntries(formData.entries());
  login(loginData);
});

// Function to display data in the page
const displayData = (container, data) => {
  container.innerHTML = "";

  if (data.length === 0) {
    container.innerHTML = "<p>No data available.</p>";
    return;
  }

  const list = document.createElement("ul");

  data.forEach((item) => {
    const listItem = document.createElement("li");
    listItem.textContent = JSON.stringify(item);
    list.appendChild(listItem);
  });

  container.appendChild(list);
};

// User Creation Function
const createUser = (userData) => {
  axios
    .post(`${API_BASE_URL}/users`, userData)
    .then((response) => {
      console.log(response.data);
      getUsers(); // Refresh user list after creation
      createUserForm.reset();
    })
    .catch((error) => {
      logError(error); // Log and handle the error
    });
};

// Get Users Function
const getUsers = () => {
  axios
    .get(`${API_BASE_URL}/users`)
    .then((response) => {
      displayData(usersContainer, response.data);
    })
    .catch((error) => {
      console.error("Error fetching users:", error);
    });
};

// Source Creation Function
const createSource = (sourceData) => {
  axios
    .post(`${API_BASE_URL}/sources`, sourceData)
    .then((response) => {
      console.log(response.data);
      getSources(); // Refresh sources list after creation
      createSourceForm.reset();
    })
    .catch((error) => {
      console.error("Error creating source:", error);
    });
};

// Get Sources Function
const getSources = () => {
  axios
    .get(`${API_BASE_URL}/sources`)
    .then((response) => {
      displayData(sourcesContainer, response.data);
    })
    .catch((error) => {
      console.error("Error fetching sources:", error);
    });
};

// Login Function
const login = (loginData) => {
  axios
    .post(`${API_BASE_URL}/users/login`, loginData)
    .then((response) => {
      console.log(response.data);
      const { token } = response.data;
      if (token) {
        setAuthToken(token); // Set the token in Axios headers
      }
      alert("Login successful!");
      loginForm.reset();
      // Fetch data after login to get user-specific information
      getUsers();
      getSources();
    })
    .catch((error) => {
      logError(error); // Log and handle the error
    });
};

// Initial Data Fetch
const usersContainer = document.getElementById("users-container");
const sourcesContainer = document.getElementById("sources-container");
getUsers();
getSources();
