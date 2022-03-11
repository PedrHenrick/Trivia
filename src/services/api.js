export const fetchToken = async () => {
  try {
    const data = await fetch('https://opentdb.com/api_token.php?command=request');
    const response = await data.json();
    return response;
  } catch (err) {
    console.error(err.message);
  }
};

export const fetchQuestions = async (token) => {
  try {
    const data = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const response = await data.json();
    return response;
  } catch (err) {
    console.error(err.message);
  }
};
