const express = require('express');
const router = express.Router();
const Media = require('./mediaModel');


// SHOW ROUTE
router.get('/', async (req, res) => {
    try {
        const foundAllMedia = await Media.find();
        res.json({
            status: 200,
            data: foundAllMedia
        });
        res.render('show.ejs', {
            media: foundAllMedia
        })
    } catch (err) {
        console.log(`get route hit`)
    }
});

// NEW ROUTE
router.get('/new', (req, res) => {
    console.log('new page');
    res.render('new.ejs')
})

// CREATE ROUTE
router.post('/', async (req, res) => {
    try {
        if (req.body.approved === 'on') {
            req.body.approved  = true;
        } else {
            req.body.approved  = false;
        }
        const newMedia = await Media.create(req.body);

        console.log(newMedia);

        res.redirect('/secret');
    } catch(err){
        console.log(err)
    }
});

// EDIT ROUTE
router.get('/:id/edit', async (req,res) => {
    try {
        const editMedia = await Media.findById(req.params.id);
        res.render('edit.ejs', {
            media: editMedia
        });
    } catch (err) {
        console.log(err)
    }
});

// UPDATE ROUTE
router.put('/:id', async (req, res) => {
  try {
    if (req.body.approved === 'on') {
        req.body.approved  = true;
    } else {
        req.body.approved  = false;
    }
    const mediaToEdit = await Media.findByIdAndUpdate(req.params.id, req.body, {new: true});
   
    mediaToEdit.save();



    console.log(mediaToEdit, "UPDATED!");
    res.redirect('/secret');
  } catch (err) {
      console.log(err)
  }
});

// DELETE ROUTE
router.delete('/:id', async (req, res) => {
    try {
        console.log(req.params.id);
        const mediaToDelete = await Media.findByIdAndRemove(req.params.id);
        console.log(mediaToDelete);
        res.redirect('/secret');
    } catch(err) {
        console.log(err)
    }
});

module.exports = router;