import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import Pusher from 'pusher';
import dbModel from './dbModel.js';

// app config 
const app = express();
const port = process.env.PORT || 8080;

const pusher = new Pusher({
  appId: '1089078',
  key: '00cdf3a7e277efe2f288',
  secret: 'd7906f8545824402cde6',
  cluster: 'eu',
  usetls: true
});

// middlewares 
app.use(express.json());
app.use(cors());


// DB config 
const connection_url = 'mongodb+srv://admin:vtni5Zh2MmehSRYv@cluster0.2qoch.mongodb.net/instaDB?retryWrites=true&w=majority'
mongoose.connect(connection_url, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.once('open', ()=>{
    console.log('DB Connected');

    const changeStream = mongoose.connection.collection('posts').watch();

    changeStream.on('change', (change) => {
        console.log('Change triggered on pusher');
        console.log(change);
        console.log('end of change');

        if(change.operationType === 'insert') {
            console.log('Trigger push ***IMG UPLOAD***');

            const postDetails = change.fullDocument;
            pusher.trigger('posts', 'inserted', {
               user: postDetails.user,
               caption: postDetails.caption,
               image: postDetails.image 
            });
        } else {
            console.log('Unknown trigger from Pusher');
        }
        
    });
});

// api routes 
app.get('/', (req, res) => res.status(200).send('Hello world123'));

app.post('/upload', (req,res) => {
    const body = req.body;
    dbModel.create(body, (err, data) => {
        if(err) {
            req.status(500).send(err);
        } else {
            res.status(201).send(data);
        }
    });
});

app.get('/sync', (req, res) => {
    dbModel.find((err, data) => {
        if(err) {
            req.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
    })
});

// listen
app.listen(port, () => console.log(`listening on localhost:${port}`));

