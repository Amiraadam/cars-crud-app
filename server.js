import express from'express';
import bodyParser from'body-parser';
import cors from'cors';

const app = express();
app.use(bodyParser.json());
app.use(cors());

let cars = [
  { color: "orange", make: "Ford", model: "Fiesta", reg_number: "CL 77790" },
  { color: "blue", make: "Nissan", model: "Micra", reg_number: "CK 12345" },
  { color: "blue", make: "Nissan", model: "Juke", reg_number: "CK 54321" }
];

app.post('/cars', (req, res) => {
    const car = req.body;
    cars.push(car);
    res.status(201).send(car);
});

app.get('/cars', (req, res) => {
    res.send(cars);
});

app.put('/cars/:reg_number', (req, res) => {
    const { reg_number } = req.params;
    const car = cars.find(c => c.reg_number === reg_number);
    if (car) {
        Object.assign(car, req.body);
        res.send(car);
    } else {
        res.status(404).send({ message: 'car not found'});
    }
});

app.delete('/cars/:reg_number', (req, res) => {
    const { reg_number } = req.params;
    cars = cars.filter(c => c.reg_number !== reg_number);
    res.status(204).send();
});

// Function: Nissan Count from Malmesbury (nissansFromCK)
app.get('/nissansFromCK', (req, res) => {
    const nissansFromCK = cars.filter(car => car.make === 'Nissan' && car.reg_number.startsWith('CK')).length;
    res.send({ count: nissansFromCK });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Server is running on port ${PORT}');
});