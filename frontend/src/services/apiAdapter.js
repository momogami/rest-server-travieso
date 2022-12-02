import axios from "axios";

const apiCall = async (method = "post", url, data) => {
  const response = await axios({
    method,
    url: `http://localhost:4000/${url}`,
    data,
  });

  return { data: response.data, status: response.status };
};

export default apiCall;
