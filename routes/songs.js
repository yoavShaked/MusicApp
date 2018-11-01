const express = require('express');
const router = express.Router();
const auth = require('../midleware/auth');
const {validateSong, Song} = require('../models/song');
const {User} = require('../models/user');
const _ = require('lodash');

router.get('/', auth, async (req, res) => {
    const user = await User.findById(req.user);
    res.send(user.songs);
});

router.get('/:id', auth, async (req, res) => {
    const user = await User.findById(req.user);
    const song = user.songs.find(s => parseInt(s._id) === parseInt(req.params.id));
    if(!song) return res.status(400).send('Song with given id was not found.');
    res.send(song);
});

router.delete('/:id', auth, async (req, res) => {

    const user = await User.findById(req.user);
    if(!user) return res.send('user not definde');
    const {songs} = user;
    const song = songs.find(s => parseInt(s._id) === parseInt(req.params.id));
    if(!song) return res.status(400).send('Song with given id was not found.');
    const index = songs.indexOf(song);
    songs.splice(index,1);
    await user.save();
    res.send(songs);
});

router.post('/', auth, async (req, res) => {
    const {error} = validateSong(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const song = new Song(_.pick(req.body, ['name', 'url', 'artist']));

    const user = await User.findById(req.user);
    user.songs.push(song);
    await user.save();
    res.send(user.songs);
});

router.put('/:id', auth, async (req, res) => {
    const {error} = validateSong(_.pick(req.body, ['name', 'url', 'artist', 'isTop10']));
    if(error) return res.status(400).send(error.details[0].message);
    
    const user = await User.findById(req.user);
    if(!user) return res.send('user not found')
    const {songs} = user;
    const index = songs.findIndex(s => parseInt(s._id) === parseInt(req.params.id));
    songs[index].isTop10 = req.body.isTop10;
    await user.save();
    res.send(user.songs);
});

module.exports = router;