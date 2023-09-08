const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

const userId = 'Vishesh_19/03/2002';

app.post('/bfhl', (req, res) => {
  try {
 
    const inputData = req.body.data;

    const status = true;
    const collegeEmail = 'vu4241@srmist.edu.in';
    const collegeRollNumber = 'RA2011003020528';
    const numbersArray = inputData.filter(item => !isNaN(item)); 
    const alphabetsArray = inputData.filter(item => typeof item === 'string' && /^[A-Za-z]$/.test(item)); 
    const highestAlphabet = findHighestAlphabet(alphabetsArray);

    const response = {
      is_success: status,
      user_id: userId,
      email: collegeEmail,
      roll_number: collegeRollNumber,
      numbers: numbersArray,
      alphabets: alphabetsArray,
      highest_alphabet: highestAlphabet,
    };


    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.get('/bfhl', (req, res) => {

  const getResponse = { operation_code: 1 };
  res.status(200).json(getResponse);
});


function findHighestAlphabet(alphabetsArray) {
  if (alphabetsArray.length === 0) {
    return [];
  }

  alphabetsArray.sort((a, b) => b.localeCompare(a, undefined, { sensitivity: 'base' }));


  const highestAlphabet = [alphabetsArray[0]]; 

  
  for (let i = 1; i < alphabetsArray.length; i++) {
    if (alphabetsArray[i].localeCompare(alphabetsArray[0], undefined, { sensitivity: 'base' }) === 0) {
      highestAlphabet.push(alphabetsArray[i]);
    } else {
      break; 
    }
  }

  return highestAlphabet;
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

